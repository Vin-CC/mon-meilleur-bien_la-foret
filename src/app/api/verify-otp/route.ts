import { NextRequest, NextResponse } from 'next/server';
import { findActiveOtpByPhone, markOtpAsUsed, markPhoneAsVerified } from '@/lib/airtable-otp';
import { checkVerificationCode } from '@/lib/sms';

interface VerifyOtpRequest {
    phone: string;
    code: string;
}

/**
 * Normalise grossièrement les téléphones FR.
 * Idéal: utiliser libphonenumber-js et stocker en E.164 partout.
 */
function normalizePhone(input: string): string {
    const raw = (input ?? '').trim().replace(/[\s().-]/g, '');
    if (!raw) return '';
    if (raw.startsWith('+')) return raw;
    // FR classique: 06/07xxxxxxxx -> +336/7xxxxxxxx
    if (/^0[67]\d{8}$/.test(raw)) return `+33${raw.slice(1)}`;
    // Si déjà du type 33xxxxxxxxx
    if (/^33[67]\d{8}$/.test(raw)) return `+${raw}`;
    return raw;
}

/**
 * Rate-limit basique en mémoire (par IP + phone).
 * À remplacer par Redis/Upstash en prod.
 */
const attempts = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 10 * 60 * 1000; // 10 min
const MAX_ATTEMPTS = 8;

function rateLimitKey(ip: string, phone: string) {
    return `${ip}::${phone}`;
}

function checkRateLimit(key: string) {
    const now = Date.now();
    const entry = attempts.get(key);

    if (!entry || now > entry.resetAt) {
        attempts.set(key, { count: 1, resetAt: now + WINDOW_MS });
        return { ok: true as const, remaining: MAX_ATTEMPTS - 1 };
    }

    if (entry.count >= MAX_ATTEMPTS) {
        return { ok: false as const, retryAfterSec: Math.ceil((entry.resetAt - now) / 1000) };
    }

    entry.count += 1;
    attempts.set(key, entry);
    return { ok: true as const, remaining: MAX_ATTEMPTS - entry.count };
}

export async function POST(request: NextRequest) {
    const genericError = 'Code invalide ou expiré.';

    try {
        const body = (await request.json()) as Partial<VerifyOtpRequest>;

        const phone = normalizePhone(typeof body.phone === 'string' ? body.phone : '');
        const code = typeof body.code === 'string' ? body.code.trim() : '';

        // Validate required fields
        if (!phone || !code) {
            return NextResponse.json({ error: genericError }, { status: 400 });
        }

        // Validate code format (6 digits)
        if (!/^\d{6}$/.test(code)) {
            return NextResponse.json({ error: genericError }, { status: 400 });
        }

        // Rate limit (IP + phone)
        const ip =
            request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
            request.headers.get('x-real-ip') ||
            'unknown';

        const rl = checkRateLimit(rateLimitKey(ip, phone));
        if (!rl.ok) {
            return NextResponse.json(
                { error: 'Trop de tentatives. Réessaie plus tard.' },
                {
                    status: 429,
                    headers: { 'Retry-After': String(rl.retryAfterSec) },
                }
            );
        }

        // Optionally re-read active OTP to mark it as used for audit
        const otpRecord = await findActiveOtpByPhone(phone);

        // Vérification via Twilio Verify (client.verify.v2.services)
        try {
            const verification = await checkVerificationCode(phone, code);
            const approved = verification.valid ?? verification.status === 'approved';

            if (!approved) {
                return NextResponse.json({ error: genericError }, { status: 400 });
            }

            if (otpRecord) {
                try {
                    await markOtpAsUsed(otpRecord.id);
                } catch (e) {
                    console.error('Error marking OTP as used:', e);
                }
            }
        } catch (verificationError) {
            console.error('Twilio verification failed:', verificationError);
            return NextResponse.json({ error: genericError }, { status: 400 });
        }

        // Marquer le téléphone comme vérifié (best effort)
        try {
            await markPhoneAsVerified(phone);
        } catch (e) {
            console.error('Error marking phone as verified:', e);
            // ne pas faire échouer : OTP déjà validé
        }

        return NextResponse.json({ ok: true });
    } catch (error) {
        console.error('Error in verify-otp:', error);
        return NextResponse.json({ error: 'Une erreur est survenue.' }, { status: 500 });
    }
}
