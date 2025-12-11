import { NextRequest, NextResponse } from 'next/server';
import { parsePhoneNumber, isValidPhoneNumber } from 'libphonenumber-js';
import {
    createOtpRecord,
    expireOldOtpsForPhone,
    findActiveOtpByPhone,
    createOrUpdateLead,
    type LeadData,
} from '@/lib/airtable-otp';
import { sendSms } from '@/lib/sms';

// Configuration from environment variables
const OTP_EXPIRATION_MINUTES = parseInt(
    process.env.OTP_EXPIRATION_MINUTES || '10',
    10
);
const OTP_RESEND_COOLDOWN_SECONDS = parseInt(
    process.env.OTP_RESEND_COOLDOWN_SECONDS || '45',
    10
);

interface SendOtpRequest {
    phone: string;
    firstName: string;
    lastName: string;
    email: string;
    estimationData?: LeadData['estimationData'];
    sourceMedia?: string;
    sourceUtm?: string;
}

export async function POST(request: NextRequest) {
    try {
        const body: SendOtpRequest = await request.json();
        const { phone, firstName, lastName, email, estimationData, sourceMedia, sourceUtm } = body;

        // Validate required fields
        if (!phone || !firstName || !lastName || !email) {
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

        // Check for cooldown - find active OTP
        // const existingOtp = await findActiveOtpByPhone(formattedPhone);

        // if (existingOtp && existingOtp.createdAt) {
        //     const createdAt = new Date(existingOtp.createdAt);
        //     const now = new Date();
        //     const secondsSinceCreation = (now.getTime() - createdAt.getTime()) / 1000;

        //     if (secondsSinceCreation < OTP_RESEND_COOLDOWN_SECONDS) {
        //         const waitSeconds = Math.ceil(
        //             OTP_RESEND_COOLDOWN_SECONDS - secondsSinceCreation
        //         );
        //         return NextResponse.json(
        //             {
        //                 error: `Trop de tentatives. Veuillez patienter ${waitSeconds} seconde${waitSeconds > 1 ? 's' : ''} avant de renvoyer un code.`,
        //             },
        //             { status: 429 }
        //         );
        //     }
        // }

        // Generate 6-digit OTP code
        const code = Math.floor(100000 + Math.random() * 900000).toString();

        // Calculate expiration time
        const expiresAt = new Date();
        expiresAt.setMinutes(expiresAt.getMinutes() + OTP_EXPIRATION_MINUTES);

        // Expire old OTPs for this phone
        // await expireOldOtpsForPhone(formattedPhone);

        // Create new OTP record
        // await createOtpRecord({
        //     phone: formattedPhone,
        //     code,
        //     expiresAt: expiresAt.toISOString(),
        // });

        // Send SMS
        const smsBody = `MonMeilleurBien.fr - Votre code de vérification est : ${code}. Ce code est valide pendant ${OTP_EXPIRATION_MINUTES} minutes.`;

        try {
            //await sendSms(formattedPhone, smsBody);
        } catch (smsError) {
            console.error('Error sending SMS:', smsError);
            return NextResponse.json(
                { error: "Impossible d'envoyer le SMS. Veuillez réessayer." },
                { status: 500 }
            );
        }

        // Create or update lead in Airtable
        try {
            await createOrUpdateLead({
                firstName,
                lastName,
                email,
                phone: formattedPhone,
                phoneVerified: false,
                estimationData,
                sourceMedia,
                sourceUtm,
            });
        } catch (leadError) {
            console.error('Error creating/updating lead:', leadError);
            // Don't fail the request if lead creation fails
            // The OTP was sent successfully
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
