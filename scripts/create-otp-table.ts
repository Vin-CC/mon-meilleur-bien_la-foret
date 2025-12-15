
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

async function createOtpTable() {
    const baseId = process.env.AIRTABLE_BASE_ID;
    const apiKey = process.env.AIRTABLE_API_KEY;
    const otpTableName = process.env.AIRTABLE_TABLE_OTP || 'OTP';

    if (!baseId || !apiKey) {
        console.error('Missing AIRTABLE_BASE_ID or AIRTABLE_API_KEY in .env');
        process.exit(1);
    }

    console.log(`Creating table "${otpTableName}" in base ${baseId}...`);

    const tableSchema = {
        name: otpTableName,
        description: "One-Time Passwords for phone verification",
        fields: [
            { name: "Phone", type: "phoneNumber" },
            { name: "Code", type: "singleLineText" },
            {
                name: "ExpiresAt",
                type: "dateTime",
                options: {
                    dateFormat: { name: "local" },
                    timeFormat: { name: "24hour" }
                }
            },
            {
                name: "Status",
                type: "singleSelect",
                options: {
                    choices: [
                        { name: "active", color: "green" },
                        { name: "used", color: "blue" },
                        { name: "expired", color: "red" }
                    ]
                }
            },
            {
                name: "Created At",
                type: "dateTime",
                options: {
                    dateFormat: { name: "local" },
                    timeFormat: { name: "24hour" }
                }
            }
        ]
    };

    try {
        const response = await fetch(`https://api.airtable.com/v0/meta/bases/${baseId}/tables`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(tableSchema)
        });

        if (response.ok) {
            const data = await response.json();
            console.log(`Table "${otpTableName}" created successfully!`);
            console.log('Table ID:', data.id);
        } else {
            const errorData = await response.json();
            console.error('Failed to create table:', response.status, response.statusText);
            console.error('Error details:', JSON.stringify(errorData, null, 2));
        }
    } catch (error) {
        console.error('Error executing request:', error);
    }
}

createOtpTable();
