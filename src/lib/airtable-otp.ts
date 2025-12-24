import { sendHookRequest } from './airtable';
import { extractCityFromAddress } from './address';

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
        city?: string;
        surface?: string;
        rooms?: number;
        bedrooms?: number;
        condition?: string;
        floor?: number;
        exterior?: string[];
        constructionYear?: string;
        isOwner?: string;
        estimationReason?: string;
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
// Lead Operations
// ============================================================================

/**
 * Create or update a lead in Airtable
 */
export async function createOrUpdateLead(data: LeadData): Promise<void> {
    try {
        const phone = normalizePhone(data.phone);

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
                if (!data.estimationData.city) {
                    const city = extractCityFromAddress(data.estimationData.address);
                    if (city) fields['Ville'] = city;
                }
            }
            if (data.estimationData.city) {
                fields['Ville'] = data.estimationData.city;
            }
            if (data.estimationData.surface) {
                fields['Superficie'] = data.estimationData.surface;
            }
            if (typeof data.estimationData.rooms === 'number') {
                fields['Nombre de pièces'] = data.estimationData.rooms;
            }
            if (typeof data.estimationData.bedrooms === 'number') {
                fields['Nombre de chambres'] = data.estimationData.bedrooms;
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
            if (typeof data.estimationData.floor === 'number') {
                fields['Étage'] = data.estimationData.floor;
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
            if (data.estimationData.constructionYear) {
                fields['Année de construction'] = data.estimationData.constructionYear;
            }
            if (data.estimationData.estimationReason) {
                const reasonMap: Record<string, string> = {
                    'vente': 'Vente',
                    'curiosite': 'Curiosité',
                };
                fields['Motif estimation'] =
                    reasonMap[data.estimationData.estimationReason] || data.estimationData.estimationReason;
            }
            if (data.estimationData.projectTimeline) {
                // Map timeline
                const timelineMap: Record<string, string> = {
                    '3-mois': 'Moins de 3 Mois',
                    '3-6-mois': 'Entre 3 et 6 Mois',
                    '6-12-mois': 'Entre 6 et 12 Mois',
                    '+12-mois': 'Plus de 12 Mois'
                };
                fields['Délai de vente'] = timelineMap[data.estimationData.projectTimeline] || data.estimationData.projectTimeline;
            }
        }

        const createFields: Record<string, any> = {
            ...fields,
            "Date d'arrivée": new Date().toISOString().split('T')[0],
        };

        await sendHookRequest(createFields);
    } catch (error) {
        console.error('Error creating/updating lead:', error);
        throw new Error('Failed to create or update lead');
    }
}
