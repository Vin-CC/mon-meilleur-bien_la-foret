import { getAirtableBase, getOtpTableName, getLeadsTableName } from './airtable';

// ============================================================================
// Types
// ============================================================================

export interface OtpRecord {
    id: string;
    phone: string;
    code: string;
    expiresAt: string; // ISO 8601 date string
    status: 'active' | 'used' | 'expired';
    createdAt?: string;
}

export interface LeadData {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    phoneVerified?: boolean;
    sourceMedia?: string;
    sourceUtm?: string;
    estimationData?: {
        propertyType?: string;
        address?: string;
        surface?: string;
        rooms?: number;
        bedrooms?: number;
        condition?: string;
        floor?: number;
        exterior?: string[];
        constructionYear?: string;
        isOwner?: string;
        projectTimeline?: string;
    };
}

// ============================================================================
// OTP Operations
// ============================================================================

/**
 * Create a new OTP record in Airtable
 */
export async function createOtpRecord(params: {
    phone: string;
    code: string;
    expiresAt: string;
}): Promise<void> {
    const base = getAirtableBase();
    const tableName = getOtpTableName();

    try {
        await base(tableName).create([
            {
                fields: {
                    Phone: params.phone,
                    Code: params.code,
                    ExpiresAt: params.expiresAt,
                    Status: 'active',
                    CreatedAt: new Date().toISOString(),
                },
            },
        ]);
    } catch (error) {
        console.error('Error creating OTP record:', error);
        throw new Error('Failed to create OTP record');
    }
}

/**
 * Find an active OTP for a phone number
 */
export async function findActiveOtpByPhone(
    phone: string
): Promise<OtpRecord | null> {
    const base = getAirtableBase();
    const tableName = getOtpTableName();

    try {
        const records = await base(tableName)
            .select({
                filterByFormula: `AND({Phone} = '${phone}', {Status} = 'active')`,
                maxRecords: 1,
                sort: [{ field: 'CreatedAt', direction: 'desc' }],
            })
            .firstPage();

        if (records.length === 0) {
            return null;
        }

        const record = records[0];
        return {
            id: record.id,
            phone: record.get('Phone') as string,
            code: record.get('Code') as string,
            expiresAt: record.get('ExpiresAt') as string,
            status: record.get('Status') as 'active' | 'used' | 'expired',
            createdAt: record.get('CreatedAt') as string | undefined,
        };
    } catch (error) {
        console.error('Error finding active OTP:', error);
        return null;
    }
}

/**
 * Mark an OTP as used
 */
export async function markOtpAsUsed(id: string): Promise<void> {
    const base = getAirtableBase();
    const tableName = getOtpTableName();

    try {
        await base(tableName).update([
            {
                id,
                fields: {
                    Status: 'used',
                },
            },
        ]);
    } catch (error) {
        console.error('Error marking OTP as used:', error);
        throw new Error('Failed to mark OTP as used');
    }
}

/**
 * Expire all active OTPs for a phone number
 */
export async function expireOldOtpsForPhone(phone: string): Promise<void> {
    const base = getAirtableBase();
    const tableName = getOtpTableName();

    try {
        const records = await base(tableName)
            .select({
                filterByFormula: `AND({Phone} = '${phone}', {Status} = 'active')`,
            })
            .firstPage();

        if (records.length > 0) {
            const updates = records.map((record) => ({
                id: record.id,
                fields: {
                    Status: 'expired',
                },
            }));

            await base(tableName).update(updates);
        }
    } catch (error) {
        console.error('Error expiring old OTPs:', error);
        // Don't throw - this is a cleanup operation
    }
}

// ============================================================================
// Lead Operations
// ============================================================================

/**
 * Find a lead by phone or email
 */
async function findLeadByPhoneOrEmail(
    phone: string,
    email: string
): Promise<{ id: string } | null> {
    const base = getAirtableBase();
    const tableName = getLeadsTableName();

    try {
        // Use 'Tel' and 'Email' columns
        const records = await base(tableName)
            .select({
                filterByFormula: `OR({Tel} = '${phone}', {Email} = '${email}')`,
                maxRecords: 1,
            })
            .firstPage();

        if (records.length === 0) {
            return null;
        }

        return { id: records[0].id };
    } catch (error) {
        console.error('Error finding lead:', error);
        return null;
    }
}

/**
 * Create or update a lead in Airtable
 */
export async function createOrUpdateLead(data: LeadData): Promise<void> {
    const base = getAirtableBase();
    const tableName = getLeadsTableName();

    try {
        // Check if lead already exists
        const existingLead = await findLeadByPhoneOrEmail(data.phone, data.email);

        const fields: Record<string, any> = {
            'Nom & Prénom': `${data.firstName} ${data.lastName}`.trim(),
            Email: data.email,
            Tel: data.phone,
            // 'PhoneVerified': data.phoneVerified ?? false, // Column missing in provided list
        };

        if (data.sourceMedia) {
            fields['Source Media'] = data.sourceMedia;
        }
        if (data.sourceUtm) {
            fields['Source UTM'] = data.sourceUtm;
        }

        // Add estimation data if provided
        if (data.estimationData) {
            if (data.estimationData.propertyType) {
                fields['Type de bien'] = data.estimationData.propertyType;
            }
            if (data.estimationData.address) {
                fields['Adresse complète du Bien'] = data.estimationData.address;
            }
            if (data.estimationData.surface) {
                fields['Superficie'] = data.estimationData.surface;
            }
            // Rooms and Bedrooms not in the provided list explicitly but might be useful to keep or map if possible.
            // Assuming they might not be needed or mapped to something else.
            // If they are not in the list, I should probably omit them or check if they map to something.
            // The list has: ID, Date d'arrivée, Date de relance, Status, Nom & Prénom, Tel, Email, Adresse complète du Bien, Type de bien, Superficie, Propriétaires , Vendeur, Délai de vente, Etats du Bien, Exterieure, Historique , Date RDV Estimation, ⁠CA Potentiel, Date signature mandat, Date vente, CA Généré, Agent responsable , email du responsable, Source Media, Source UTM, Nurturing, Created Time
            // Rooms/Bedrooms are NOT in the list. I will comment them out for now to be safe.

            // if (data.estimationData.rooms !== undefined) {
            //     fields.Rooms = data.estimationData.rooms;
            // }
            // if (data.estimationData.bedrooms !== undefined) {
            //     fields.Bedrooms = data.estimationData.bedrooms;
            // }

            if (data.estimationData.condition) {
                fields['Etats du Bien'] = data.estimationData.condition;
            }
            // Floor not in list
            // if (data.estimationData.floor !== undefined) {
            //     fields.Floor = data.estimationData.floor;
            // }
            if (data.estimationData.exterior && data.estimationData.exterior.length > 0) {
                // Filter out any empty strings just in case
                const validExterior = data.estimationData.exterior.filter(e => e && e.trim() !== '');
                if (validExterior.length > 0) {
                    fields['Exterieure'] = validExterior;
                }
            }
            // ConstructionYear not in list
            // if (data.estimationData.constructionYear) {
            //     fields.ConstructionYear = data.estimationData.constructionYear;
            // }
            if (data.estimationData.isOwner) {
                fields['Propriétaires '] = data.estimationData.isOwner; // Note the space
            }
            if (data.estimationData.projectTimeline) {
                fields['Délai de vente'] = data.estimationData.projectTimeline;
            }
        }

        console.log('Sending fields to Airtable:', JSON.stringify(fields, null, 2));

        if (existingLead) {
            // Update existing lead
            await base(tableName).update([
                {
                    id: existingLead.id,
                    fields,
                },
            ]);
        } else {
            // Create new lead
            let status: string | undefined;

            try {
                // Dynamically fetch valid status options to avoid errors
                const { listTables } = await import('./airtable-admin');
                const tables = await listTables();
                const leadsTable = tables.find(t => t.name === tableName);
                const statusField = leadsTable?.fields?.find(f => f.name === 'Status');

                if (statusField?.options?.choices && statusField.options.choices.length > 0) {
                    // Try to find "Nouveau" or "New" case-insensitive
                    const targetStatus = statusField.options.choices.find(c =>
                        c.name.toLowerCase() === 'nouveau' ||
                        c.name.toLowerCase() === 'new'
                    );

                    if (targetStatus) {
                        status = targetStatus.name;
                    } else {
                        // If "Nouveau" not found, take the first available option (often "To Treat" or similar)
                        status = statusField.options.choices[0].name;
                    }
                }
            } catch (schemaError) {
                console.warn('Failed to fetch schema for Status field, using default:', schemaError);
            }

            const createFields: Record<string, any> = {
                ...fields,
                "Date d'arrivée": new Date().toISOString().split('T')[0], // Set arrival date
            };

            if (status) {
                createFields.Status = status;
            }

            await base(tableName).create([
                {
                    fields: createFields,
                },
            ]);
        }
    } catch (error) {
        console.error('Error creating/updating lead:', error);
        throw new Error('Failed to create or update lead');
    }
}

/**
 * Mark a phone number as verified for a lead
 */
export async function markPhoneAsVerified(phone: string): Promise<void> {
    const base = getAirtableBase();
    const tableName = getLeadsTableName();

    try {
        const records = await base(tableName)
            .select({
                filterByFormula: `{Tel} = '${phone}'`,
                maxRecords: 1,
            })
            .firstPage();

        if (records.length > 0) {
            // Column 'PhoneVerified' is missing, so we can't update it.
            // We might want to log this or maybe there's another status to update?
            // For now, I'll just comment it out to prevent errors.
            /*
            await base(tableName).update([
                {
                    id: records[0].id,
                    fields: {
                        PhoneVerified: true,
                    },
                },
            ]);
            */
            console.log(`Phone verified for ${phone} (No column to update)`);
        }
    } catch (error) {
        console.error('Error marking phone as verified:', error);
        throw new Error('Failed to mark phone as verified');
    }
}
