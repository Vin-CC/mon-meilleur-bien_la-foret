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
