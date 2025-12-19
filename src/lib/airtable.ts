import Airtable from 'airtable';

/**
 * Initialize and return the Airtable base instance
 * Uses environment variables for authentication
 */
export function getAirtableBase(): Airtable.Base {
    const apiKey = process.env.AIRTABLE_API_KEY;
    const baseId = process.env.AIRTABLE_BASE_ID;

    if (!apiKey) {
        throw new Error('AIRTABLE_API_KEY environment variable is not set');
    }

    if (!baseId) {
        throw new Error('AIRTABLE_BASE_ID environment variable is not set');
    }

    const airtable = new Airtable({
        apiKey,
        requestTimeout: 60000 // Increase timeout to 60 seconds
    });
    return airtable.base(baseId);
}

type HookRequest = {
    [key: string]: any;
};

/**
 * Send a JSON payload to the hook endpoint defined by HOOK_URL.
 * This replaces the previous Airtable SDK usage.
 */
export async function sendHookRequest<T = any>(payload: HookRequest): Promise<T> {
    const hookUrl = process.env.HOOK_URL;

    if (!hookUrl) {
        throw new Error('HOOK_URL environment variable is not set');
    }

    console.log("sendHookRequest payload:", payload);

    const response = await fetch(hookUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
        cache: 'no-store',
    });

    if (!response.ok) {
        const message = await response.text().catch(() => response.statusText);
        throw new Error(`Hook request failed (${response.status}): ${message}`);
    }

    if (response.headers.get('content-type')?.includes('application/json')) {
        return response.json() as Promise<T>;
    }

    // Empty or non-JSON response
    return {} as T;
}

/**
 * Get the name of the OTP table from environment variables
 */
export function getOtpTableName(): string {
    return process.env.AIRTABLE_TABLE_OTP || '';
}

/**
 * Get the name of the Leads table from environment variables
 */
export function getLeadsTableName(): string {
    return process.env.AIRTABLE_TABLE_LEADS || '';
}

/**
 * Get the name of the RDV table from environment variables
 */
export function getRdvTableName(): string {
    return process.env.AIRTABLE_TABLE_RDV || '';
}

/**
 * Get the name of the Questions table from environment variables
 */
export function getQuestionTableName(): string {
    return process.env.AIRTABLE_TABLE_QUESTION || '';
}
