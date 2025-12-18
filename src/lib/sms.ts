import twilio from 'twilio';
import type { VerificationInstance } from 'twilio/lib/rest/verify/v2/service/verification';
import type { VerificationCheckInstance } from 'twilio/lib/rest/verify/v2/service/verificationCheck';

/**
 * Send an SMS message using Twilio
 * @param to - Phone number in international format (e.g., +33612345678)
 * @param body - Message content (ignored for Verify, kept for signature parity)
 * @returns Verification instance on success
 * @throws Error if SMS fails to send
 */
export async function sendSms(to: string, _body: string): Promise<VerificationInstance> {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const verifyServiceSid =
        process.env.TWILIO_VERIFY_SERVICE_SID ?? process.env.TWILIO_MESSAGE_SERVICE_SID;

    if (!accountSid) {
        throw new Error('TWILIO_ACCOUNT_SID environment variable is not set');
    }
    if (!authToken) {
        throw new Error('TWILIO_AUTH_TOKEN environment variable is not set');
    }

    if (!verifyServiceSid) {
        throw new Error('TWILIO_VERIFY_SERVICE_SID environment variable is not set');
    }

    try {
        const client = twilio(accountSid, authToken);

        const verification = await client.verify.v2.services(verifyServiceSid).verifications.create({
            to,
            channel: 'sms',
        });

        console.log(`SMS sent successfully to ${to}, SID: ${verification.sid}`);
        return verification;
    } catch (error) {
        console.error('Error sending SMS:', error);

        if (error instanceof Error) {
            throw new Error(`Failed to send SMS: ${error.message}`);
        }

        throw new Error('Failed to send SMS: Unknown error');
    }
}

/**
 * Check a verification code with Twilio Verify.
 */
export async function checkVerificationCode(
    to: string,
    code: string
): Promise<VerificationCheckInstance> {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const verifyServiceSid =
        process.env.TWILIO_VERIFY_SERVICE_SID ?? process.env.TWILIO_MESSAGE_SERVICE_SID;

    if (!accountSid) {
        throw new Error('TWILIO_ACCOUNT_SID environment variable is not set');
    }
    if (!authToken) {
        throw new Error('TWILIO_AUTH_TOKEN environment variable is not set');
    }
    if (!verifyServiceSid) {
        throw new Error('TWILIO_VERIFY_SERVICE_SID environment variable is not set');
    }

    const client = twilio(accountSid, authToken);

    return client.verify.v2.services(verifyServiceSid).verificationChecks.create({
        to,
        code,
    });
}
