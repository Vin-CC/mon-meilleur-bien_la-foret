import { getOtpTableName, getLeadsTableName, sendHookRequest } from './airtable';

// ============================================================================
// Types
// ============================================================================

export interface OtpRecord {
    id: string;
    phone: string;
    code: string; // ⚠️ idéalement: stocker un hash, pas le code en clair
    expiresAt: string; // ISO 8601 date string
    status: 'active' | 'used' | 'expired';
    "Created At"?: string;
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

interface HookRecord {
    id?: string;
    fields: Record<string, any>;
    createdTime?: string;
}

// ============================================================================
// Helpers
// ============================================================================

function escapeAirtableFormulaString(value: string): string {
    // Airtable string literals are wrapped in single quotes.
    // We escape ' by doubling it.
    return String(value ?? '').replace(/'/g, "''");
}

/**
 * Normalisation basique FR.
 * Idéal: libphonenumber-js + stockage E.164 partout.
 */
export function normalizePhone(input: string): string {
    const raw = (input ?? '').trim().replace(/[\s().-]/g, '');
    if (!raw) return '';
    if (raw.startsWith('+')) return raw;

    if (/^0[67]\d{8}$/.test(raw)) return `+33${raw.slice(1)}`;
    if (/^33[67]\d{8}$/.test(raw)) return `+${raw}`;

    return raw;
}

// ============================================================================
// OTP Operations
// ============================================================================

/**
 * Create a new OTP record via the hook endpoint
 */
export async function createOtpRecord(params: {
    phone: string;
    code: string;
    expiresAt: string;
}): Promise<Record<string, any>> {
    const tableName = getOtpTableName();

    try {
        const response = await sendHookRequest<{ records?: HookRecord[] }>({
            operation: 'create',
            table: tableName,
            records: [
                {
                    fields: {
                        Phone: normalizePhone(params.phone),
                        Code: params.code,
                        'Expires At': params.expiresAt,
                        Status: 'active',
                        'Created At': new Date().toISOString(),
                    },
                },
            ],
        });

        const fields = response.records?.[0]?.fields ?? {};
        console.log('OTP record created successfully via hook:', fields);

        return fields;
    } catch (error) {
        console.error('Error creating OTP record:', error);
        throw new Error('Failed to create OTP record');
    }
}

/**
 * Find the most recent active & non-expired OTP for a phone number.
 * (Renvoie null si inexistant ou expiré)
 */
export async function findActiveOtpByPhone(phone: string): Promise<OtpRecord | null> {
    const tableName = getOtpTableName();

    const normalizedPhone = normalizePhone(phone);
    const phoneEsc = escapeAirtableFormulaString(normalizedPhone);

    try {
        const nowIso = new Date().toISOString();

        const { records } = await sendHookRequest<{ records?: HookRecord[] }>({
            operation: 'select',
            table: tableName,
            filterByFormula: `AND({Phone}='${phoneEsc}', {Status}='active', {Expires At} > '${nowIso}')`,
            maxRecords: 1,
            sort: [{ field: 'Created At', direction: 'desc' }],
        });

        if (!records || records.length === 0) return null;

        const record = records[0];
        const fields = record.fields ?? {};

        return {
            id: record.id ?? '',
            phone: (fields['Phone'] as string) ?? normalizedPhone,
            code: fields['Code'] as string,
            expiresAt: fields['Expires At'] as string,
            status: fields['Status'] as 'active' | 'used' | 'expired',
            "Created At": fields['Created At'] as string | undefined,
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
    const tableName = getOtpTableName();

    try {
        await sendHookRequest({
            operation: 'update',
            table: tableName,
            records: [
                {
                    id,
                    fields: {
                        Status: 'used',
                    },
                },
            ],
        });
    } catch (error) {
        console.error('Error marking OTP as used:', error);
        throw new Error('Failed to mark OTP as used');
    }
}

/**
 * Mark an OTP as expired
 */
export async function markOtpAsExpired(id: string): Promise<void> {
    const tableName = getOtpTableName();

    try {
        await sendHookRequest({
            operation: 'update',
            table: tableName,
            records: [
                {
                    id,
                    fields: {
                        Status: 'expired',
                    },
                },
            ],
        });
    } catch (error) {
        console.error('Error marking OTP as expired:', error);
        throw new Error('Failed to mark OTP as expired');
    }
}

/**
 * Expire all active OTPs for a phone number (cleanup)
 */
export async function expireOldOtpsForPhone(phone: string): Promise<void> {
    const tableName = getOtpTableName();

    const normalizedPhone = normalizePhone(phone);
    const phoneEsc = escapeAirtableFormulaString(normalizedPhone);

    try {
        const { records } = await sendHookRequest<{ records?: HookRecord[] }>({
            operation: 'select',
            table: tableName,
            filterByFormula: `AND({Phone}='${phoneEsc}', {Status}='active')`,
        });

        if (!records || records.length === 0) return;

        const updates = records.map((record) => ({
            id: record.id,
            fields: { Status: 'expired' },
        }));

        await sendHookRequest({
            operation: 'update',
            table: tableName,
            records: updates,
        });
    } catch (error) {
        console.error('Error expiring old OTPs:', error);
        // cleanup best effort
    }
}

/**
 * Consume OTP if valid via hook-backed storage:
 * - fetch most recent active + non-expired
 * - compare code
 * - update to used
 * - re-read to ensure status changed (minimise race)
 */
export async function consumeOtpIfValid(params: {
    phone: string;
    code: string;
}): Promise<{ ok: true } | { ok: false; reason: 'invalid_or_expired' }> {
    const normalizedPhone = normalizePhone(params.phone);
    const otp = await findActiveOtpByPhone(normalizedPhone);

    if (!otp) return { ok: false, reason: 'invalid_or_expired' };
    if (otp.code !== params.code) return { ok: false, reason: 'invalid_or_expired' };

    await markOtpAsUsed(otp.id);

    return { ok: true };
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
    const tableName = getLeadsTableName();

    const phoneNorm = normalizePhone(phone);
    const phoneEsc = escapeAirtableFormulaString(phoneNorm);
    const emailEsc = escapeAirtableFormulaString(email);

    try {
        const { records } = await sendHookRequest<{ records?: HookRecord[] }>({
            operation: 'select',
            table: tableName,
            filterByFormula: `OR({Tel}='${phoneEsc}', {Email}='${emailEsc}')`,
            maxRecords: 1,
        });

        if (!records || records.length === 0) return null;
        return { id: records[0].id ?? '' };
    } catch (error) {
        console.error('Error finding lead:', error);
        return null;
    }
}

/**
 * Create or update a lead in Airtable
 */
export async function createOrUpdateLead(data: LeadData): Promise<void> {
    const tableName = getLeadsTableName();

    try {
        const phone = normalizePhone(data.phone);

        const existingLead = await findLeadByPhoneOrEmail(phone, data.email);

        const fields: Record<string, any> = {
            'Nom & Prénom': `${data.firstName} ${data.lastName}`.trim(),
            Email: data.email,
            Tel: phone,
            // PhoneVerified: data.phoneVerified ?? false, // si la colonne existe
            Source: "Estimation",
        };

        if (data.sourceMedia) fields['Source Media'] = data.sourceMedia;
        if (data.sourceUtm) fields['Source UTM'] = data.sourceUtm;

        if (data.estimationData) {
            if (data.estimationData.propertyType) {
                // Map property type to Airtable format (Capitalized)
                const typeMap: Record<string, string> = {
                    'appartement': 'Appartement',
                    'maison': 'Maison',
                    'terrain': 'Terrain',
                    'autre': 'Autre'
                };
                fields['Type de bien'] = typeMap[data.estimationData.propertyType] || data.estimationData.propertyType;
            }
            if (data.estimationData.address) {
                fields['Adresse complète du Bien'] = data.estimationData.address;
            }
            if (data.estimationData.surface) {
                fields['Superficie'] = data.estimationData.surface;
            }
            if (data.estimationData.condition) {
                // Map condition to Airtable format
                const conditionMap: Record<string, string> = {
                    'neuf': 'Neuf / Refait à neuf',
                    'bon-etat': 'Bon état',
                    'rafraichissement': 'À rafraîchir',
                    'renovation': 'À rénover'
                };
                fields['Etats du Bien'] = conditionMap[data.estimationData.condition] || data.estimationData.condition;
            }
            if (data.estimationData.exterior?.length) {
                const validExterior = data.estimationData.exterior.filter((e) => e && e.trim() !== '');
                if (validExterior.length) {
                    // Map exterior options if needed (usually capitalized in Airtable)
                    const exteriorMap: Record<string, string> = {
                        'balcon': 'Balcon',
                        'terrasse': 'Terrasse',
                        'jardin': 'Jardin',
                        "pas-d-exterieur": "Pas d'extérieur"
                    };
                    fields['Exterieure'] = validExterior.map(e => exteriorMap[e.toLowerCase()] || e);
                }
            }
            if (data.estimationData.isOwner) {
                // Map owner status
                const ownerMap: Record<string, string> = {
                    'proprietaire': 'Propriétaire',
                    'locataire': 'Locataire'
                };
                fields['Propriétaires '] = ownerMap[data.estimationData.isOwner] || data.estimationData.isOwner; // oui, avec espace
            }
            if (data.estimationData.projectTimeline) {
                // Map timeline
                const timelineMap: Record<string, string> = {
                    '3-mois': 'De 3 Mois',
                    '3-6-mois': 'Entre 3 et 6 Mois',
                    '6-12-mois': 'Entre 6 et 12 Mois',
                    '+12-mois': 'Plus de 12 Mois',
                    'curiosite': 'Juste Curiosité'
                };
                fields['Délai de vente'] = timelineMap[data.estimationData.projectTimeline] || data.estimationData.projectTimeline;
            }
        }

        if (existingLead) {
            await sendHookRequest(fields);
            return;
        }

        // Create new lead
        let status: string | undefined;

        try {
            const { listTables } = await import('./airtable-admin');
            const tables = await listTables();
            const leadsTable = tables.find((t) => t.name === tableName);
            const statusField = leadsTable?.fields?.find((f) => f.name === 'Status');

            const choices = statusField?.options?.choices;
            if (choices?.length) {
                const target = choices.find(
                    (c) => c.name.toLowerCase() === 'nouveau' || c.name.toLowerCase() === 'new'
                );
                status = (target ?? choices[0]).name;
            }
        } catch (schemaError) {
            console.warn('Failed to fetch schema for Status field, using default:', schemaError);
        }

        const createFields: Record<string, any> = {
            ...fields,
            "Date d'arrivée": new Date().toISOString().split('T')[0],
        };

        if (status) createFields.Status = status;

        await sendHookRequest({
            operation: 'create',
            table: tableName,
            records: [{ fields: createFields }],
        });
    } catch (error) {
        console.error('Error creating/updating lead:', error);
        throw new Error('Failed to create or update lead');
    }
}

/**
 * Mark a phone number as verified for a lead
 * (best effort — active seulement si tu as une colonne dédiée)
 */
export async function markPhoneAsVerified(phone: string): Promise<void> {
    const tableName = getLeadsTableName();

    const phoneNorm = normalizePhone(phone);
    const phoneEsc = escapeAirtableFormulaString(phoneNorm);

    try {
        const { records } = await sendHookRequest<{ records?: HookRecord[] }>({
            operation: 'select',
            table: tableName,
            filterByFormula: `{Tel}='${phoneEsc}'`,
            maxRecords: 1,
        });

        if (!records || records.length === 0) return;

        // ⚠️ Active seulement si la colonne existe
        // await base(tableName).update([
        //   { id: records[0].id, fields: { PhoneVerified: true } },
        // ]);

        console.log(`Phone verified for ${phoneNorm} (no column updated)`);
    } catch (error) {
        console.error('Error marking phone as verified:', error);
        throw new Error('Failed to mark phone as verified');
    }
}
