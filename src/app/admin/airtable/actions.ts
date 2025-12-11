'use server';

import { listTables, getTableRecords, deleteRecord, AirtableTable, AirtableRecord } from '@/lib/airtable-admin';

export async function fetchTablesAction(): Promise<AirtableTable[]> {
    try {
        return await listTables();
    } catch (error) {
        console.error('Failed to fetch tables:', error);
        return [];
    }
}

export async function fetchRecordsAction(tableName: string): Promise<AirtableRecord[]> {
    try {
        return await getTableRecords(tableName);
    } catch (error) {
        console.error(`Failed to fetch records for ${tableName}:`, error);
        return [];
    }
}

export async function deleteRecordAction(tableName: string, recordId: string): Promise<void> {
    try {
        await deleteRecord(tableName, recordId);
    } catch (error) {
        console.error(`Failed to delete record ${recordId} from ${tableName}:`, error);
        throw new Error('Failed to delete record');
    }
}
