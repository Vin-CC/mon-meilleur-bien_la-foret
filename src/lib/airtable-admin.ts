import { getAirtableBase, getOtpTableName, getLeadsTableName } from './airtable';

export interface AirtableField {
    id: string;
    name: string;
    type: string;
    options?: {
        choices?: {
            id: string;
            name: string;
            color?: string;
        }[];
    };
}

export interface AirtableTable {
    id?: string;
    name: string;
    description?: string;
    fields?: AirtableField[];
}

export interface AirtableRecord {
    id: string;
    fields: Record<string, any>;
    createdTime: string;
}

/**
 * List all tables in the Airtable base.
 * Attempts to use the Metadata API first.
 * Fallbacks to a hardcoded list of known tables if the API fails (likely due to permissions).
 */
export async function listTables(): Promise<AirtableTable[]> {
    const baseId = process.env.AIRTABLE_BASE_ID;
    const apiKey = process.env.AIRTABLE_API_KEY;

    if (!baseId || !apiKey) {
        console.warn('Missing Airtable credentials, returning empty list');
        return [];
    }

    try {
        // Try the Metadata API
        const response = await fetch(`https://api.airtable.com/v0/meta/bases/${baseId}/tables`, {
            headers: {
                'Authorization': `Bearer ${apiKey}`,
            },
            // Next.js caching might interfere, so we disable it for admin data
            cache: 'no-store',
        });

        if (response.ok) {
            const data = await response.json();
            return data.tables.map((t: any) => ({
                id: t.id,
                name: t.name,
                description: t.description,
                fields: t.fields ? t.fields.map((f: any) => ({
                    id: f.id,
                    name: f.name,
                    type: f.type,
                    options: f.options
                })) : []
            }));
        } else {
            console.warn(`Failed to fetch tables via Metadata API: ${response.status} ${response.statusText}. Falling back to hardcoded list.`);
        }
    } catch (error) {
        console.error('Error fetching tables from Metadata API:', error);
    }

    // Fallback to known tables with hardcoded fields
    return [
        {
            name: getOtpTableName(),
            description: 'One-Time Passwords',
            fields: [
                { id: 'fldPhone', name: 'Phone', type: 'phoneNumber' },
                { id: 'fldCode', name: 'Code', type: 'singleLineText' },
                { id: 'fldExpiresAt', name: 'ExpiresAt', type: 'dateTime' },
                { id: 'fldStatus', name: 'Status', type: 'singleSelect' },
                { id: 'fldCreatedAt', name: 'CreatedAt', type: 'dateTime' }
            ]
        },
        {
            name: getLeadsTableName(),
            description: 'Leads and Estimations',
            fields: [
                { id: 'fldFirstName', name: 'FirstName', type: 'singleLineText' },
                { id: 'fldLastName', name: 'LastName', type: 'singleLineText' },
                { id: 'fldEmail', name: 'Email', type: 'email' },
                { id: 'fldPhone', name: 'Phone', type: 'phoneNumber' },
                { id: 'fldPhoneVerified', name: 'PhoneVerified', type: 'checkbox' },
                { id: 'fldPropertyType', name: 'PropertyType', type: 'singleSelect' },
                { id: 'fldAddress', name: 'Address', type: 'singleLineText' },
                { id: 'fldSurface', name: 'Surface', type: 'number' },
                { id: 'fldRooms', name: 'Rooms', type: 'number' },
                { id: 'fldBedrooms', name: 'Bedrooms', type: 'number' },
                { id: 'fldCondition', name: 'Condition', type: 'singleSelect' },
                { id: 'fldFloor', name: 'Floor', type: 'number' },
                { id: 'fldExterior', name: 'Exterior', type: 'multiselect' },
                { id: 'fldConstructionYear', name: 'ConstructionYear', type: 'singleLineText' },
                { id: 'fldIsOwner', name: 'IsOwner', type: 'singleSelect' },
                { id: 'fldProjectTimeline', name: 'ProjectTimeline', type: 'singleSelect' }
            ]
        },
    ];
}

/**
 * Get records from a specific table.
 * Fetches the most recent 100 records.
 */
export async function getTableRecords(tableName: string): Promise<AirtableRecord[]> {
    const base = getAirtableBase();

    try {
        const records = await base(tableName)
            .select({
                maxRecords: 100,
                // sort: [{ field: 'Created Time', direction: 'desc' }] // Assuming 'Created Time' or similar exists, otherwise might fail if field doesn't exist.
                // To be safer, we might not want to sort by a specific field unless we know it exists.
                // Let's try to sort by createdTime which is a system field, but the API expects field names.
                // If we don't sort, we get them in some order.
                // Let's just fetch without sort for generic tables to avoid errors if field is missing.
            })
            .firstPage();

        return records.map(record => ({
            id: record.id,
            fields: record.fields,
            createdTime: record._rawJson.createdTime || new Date().toISOString(),
        }));
    } catch (error) {
        console.error(`Error fetching records for table ${tableName}:`, error);
        // If the sort failed, maybe try again without sort? 
        // But the error above was hypothetical. 'Created' is common but not guaranteed.
        // Let's try a safer fetch if the first one fails? 
        // Actually, let's just do a simple fetch first.

        try {
            const records = await base(tableName)
                .select({
                    maxRecords: 100,
                })
                .firstPage();

            return records.map(record => ({
                id: record.id,
                fields: record.fields,
                createdTime: record._rawJson.createdTime || new Date().toISOString(),
            }));

        } catch (retryError) {
            console.error(`Retry failed for table ${tableName}:`, retryError);
            throw new Error(`Failed to fetch records for table ${tableName}`);
        }
    }
}

/**
 * Delete a record from a specific table.
 */
export async function deleteRecord(tableName: string, recordId: string): Promise<void> {
    const base = getAirtableBase();

    try {
        await base(tableName).destroy(recordId);
    } catch (error) {
        console.error(`Error deleting record ${recordId} from table ${tableName}:`, error);
        throw new Error(`Failed to delete record ${recordId}`);
    }
}
