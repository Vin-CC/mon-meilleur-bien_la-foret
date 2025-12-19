import { NextResponse } from 'next/server';
import { listTables } from '@/lib/airtable-admin';
import { getLeadsTableName } from '@/lib/airtable';

export async function GET() {
    try {
        const tables = await listTables();
        const leadsTableName = getLeadsTableName();

        // Find the Leads table
        const leadsTable = tables.find(t => t.name === leadsTableName);

        if (!leadsTable) {
            return NextResponse.json({ error: 'Leads table not found' }, { status: 404 });
        }

        return NextResponse.json(leadsTable);
    } catch (error) {
        console.error('Error fetching schema from hook:', error);
        return NextResponse.json(
            { error: 'Failed to fetch schema' },
            { status: 500 }
        );
    }
}
