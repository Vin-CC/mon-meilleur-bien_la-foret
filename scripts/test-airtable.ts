import { getTableRecords, listTables } from '../src/lib/airtable-admin';
import * as fs from 'fs';
import * as path from 'path';

// Manual .env parsing
const envPath = path.resolve(process.cwd(), '.env');
if (fs.existsSync(envPath)) {
    const envConfig = fs.readFileSync(envPath, 'utf8');
    envConfig.split('\n').forEach(line => {
        const match = line.match(/^([^=]+)=(.*)$/);
        if (match) {
            const key = match[1].trim();
            const value = match[2].trim().replace(/^["'](.*)["']$/, '$1');
            process.env[key] = value;
        }
    });
}

async function main() {
    console.log('Testing Airtable connection...');

    try {
        console.log('Listing tables...');
        const tables = await listTables();
        console.log('Tables found:', tables.map(t => t.name));

        const formulaireTable = tables.find(t => t.name === 'Formulaire');
        if (formulaireTable) {
            console.log('Found table "Formulaire". Attempting to fetch records...');
            try {
                const records = await getTableRecords('Formulaire');
                console.log(`Successfully fetched ${records.length} records from Formulaire.`);
            } catch (error) {
                console.error('Error fetching records from Formulaire:', error);
            }
        } else {
            console.log('Table "Formulaire" not found in the list.');
        }

    } catch (error) {
        console.error('Error in main:', error);
    }
}

main();
