import twilio from 'twilio';

/**
 * Send an SMS message using Twilio
 * @param to - Phone number in international format (e.g., +33612345678)
 * @param body - Message content
 * @returns Message SID on success
 * @throws Error if SMS fails to send
 */
export async function sendSms(to: string, body: string): Promise<string> {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const fromNumber = process.env.TWILIO_PHONE_NUMBER;

    if (!accountSid) {
        throw new Error('TWILIO_ACCOUNT_SID environment variable is not set');
    }

    if (!authToken) {
        throw new Error('TWILIO_AUTH_TOKEN environment variable is not set');
    }

    if (!fromNumber) {
        throw new Error('TWILIO_PHONE_NUMBER environment variable is not set');
    }

    try {
        const client = twilio(accountSid, authToken);

        const message = await client.messages.create({
            body,
            from: fromNumber,
            to,
        });

        console.log(`SMS sent successfully to ${to}, SID: ${message.sid}`);
        return message.sid;
    } catch (error) {
        console.error('Error sending SMS:', error);

        if (error instanceof Error) {
            throw new Error(`Failed to send SMS: ${error.message}`);
        }

        throw new Error('Failed to send SMS: Unknown error');
    }
}
