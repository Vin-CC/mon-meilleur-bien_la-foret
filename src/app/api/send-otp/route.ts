import { NextRequest, NextResponse } from 'next/server';
import { parsePhoneNumber, isValidPhoneNumber } from 'libphonenumber-js';
import { sendSms } from '@/lib/sms';

// Configuration from environment variables
const OTP_EXPIRATION_MINUTES = parseInt(
    process.env.OTP_EXPIRATION_MINUTES || '10',
    10
)

interface SendOtpRequest {
    phone: string;
}

export async function POST(request: NextRequest) {
    try {
        const body: SendOtpRequest = await request.json();
        const { phone } = body;

        // Validate required fields
        if (!phone) {
            return NextResponse.json(
                { error: 'Tous les champs sont requis.' },
                { status: 400 }
            );
        }

        // Validate phone number format
        if (!isValidPhoneNumber(phone, 'FR')) {
            return NextResponse.json(
                {
                    error:
                        'Format de numéro invalide. Veuillez utiliser un numéro français valide.',
                },
                { status: 400 }
            );
        }

        // Parse and format phone number to international format
        const phoneNumber = parsePhoneNumber(phone, 'FR');
        const formattedPhone = phoneNumber.format('E.164'); // e.g., +33612345678

        const isTestNumber = formattedPhone === '+33612345678';
        const expiresAt = new Date();
        expiresAt.setMinutes(expiresAt.getMinutes() + OTP_EXPIRATION_MINUTES);

        // Send SMS (skip for test number)
        let verificationSid: string | undefined;

        if (isTestNumber) {
            throw new Error('Numéro invalide');
        }

        try {
            const smsBody = `MonMeilleurBien.fr - Code de vérification valable ${OTP_EXPIRATION_MINUTES} minutes.`;
            const verification = await sendSms(formattedPhone, smsBody);
            verificationSid = verification?.sid;
        } catch (smsError) {
            console.error('Error sending SMS:', smsError);
            return NextResponse.json(
                { error: "Impossible d'envoyer le SMS. Veuillez réessayer." },
                { status: 500 }
            );
        }

        return NextResponse.json({ ok: true });
    } catch (error) {
        console.error('Error in send-otp:', error);
        return NextResponse.json(
            { error: 'Une erreur est survenue. Veuillez réessayer.' },
            { status: 500 }
        );
    }
}
