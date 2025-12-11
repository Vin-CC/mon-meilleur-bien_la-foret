import { NextRequest, NextResponse } from 'next/server';
import {
    findActiveOtpByPhone,
    markOtpAsUsed,
    markPhoneAsVerified,
} from '@/lib/airtable-otp';

interface VerifyOtpRequest {
    phone: string;
    code: string;
}

export async function POST(request: NextRequest) {
    try {
        const body: VerifyOtpRequest = await request.json();
        const { phone, code } = body;

        // Validate required fields
        if (!phone || !code) {
            return NextResponse.json(
                { error: 'Numéro de téléphone et code requis.' },
                { status: 400 }
            );
        }

        // Validate code format (6 digits)
        if (!/^\d{6}$/.test(code)) {
            return NextResponse.json(
                { error: 'Le code doit contenir 6 chiffres.' },
                { status: 400 }
            );
        }

        // Find active OTP for this phone
        const otpRecord = await findActiveOtpByPhone(phone);

        if (!otpRecord) {
            return NextResponse.json(
                { error: 'Code expiré ou inexistant.' },
                { status: 400 }
            );
        }

        // Check if OTP is expired
        const now = new Date();
        const expiresAt = new Date(otpRecord.expiresAt);

        if (now > expiresAt) {
            // Mark as expired
            try {
                await markOtpAsUsed(otpRecord.id); // We can reuse this to mark as expired
            } catch (error) {
                console.error('Error marking OTP as expired:', error);
            }

            return NextResponse.json(
                { error: 'Ce code a expiré. Veuillez en demander un nouveau.' },
                { status: 400 }
            );
        }

        // Verify code matches
        if (otpRecord.code !== code) {
            return NextResponse.json(
                { error: 'Code incorrect. Veuillez réessayer.' },
                { status: 401 }
            );
        }

        // Mark OTP as used
        try {
            await markOtpAsUsed(otpRecord.id);
        } catch (error) {
            console.error('Error marking OTP as used:', error);
            return NextResponse.json(
                { error: 'Erreur lors de la validation. Veuillez réessayer.' },
                { status: 500 }
            );
        }

        // Mark phone as verified in Lead
        try {
            await markPhoneAsVerified(phone);
        } catch (error) {
            console.error('Error marking phone as verified:', error);
            // Don't fail the request - the OTP was valid
        }

        return NextResponse.json({ ok: true });
    } catch (error) {
        console.error('Error in verify-otp:', error);
        return NextResponse.json(
            { error: 'Une erreur est survenue. Veuillez réessayer.' },
            { status: 500 }
        );
    }
}
