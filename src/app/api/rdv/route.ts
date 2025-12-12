import { NextRequest, NextResponse } from "next/server";
import { getAirtableBase, getRdvTableName } from "@/lib/airtable";

interface AppointmentPayload {
    address: string;
    contact: {
        firstName?: string;
        name: string;
        email: string;
        phone: string;
    };
    appointmentDate: string | Date | null;
    appointmentTime: string | null;
}

export async function POST(request: NextRequest) {
    try {
        const body: AppointmentPayload = await request.json();
        const { address, contact, appointmentDate, appointmentTime } = body;

        if (!address || !contact?.name || !contact?.email || !contact?.phone || !appointmentDate || !appointmentTime) {
            return NextResponse.json(
                { error: "Champs manquants pour créer le rendez-vous." },
                { status: 400 }
            );
        }

        const base = getAirtableBase();
        const tableName = getRdvTableName();

        // Normalize date to YYYY-MM-DD for Airtable
        const dateValue = new Date(appointmentDate);
        const formattedDate = Number.isNaN(dateValue.getTime())
            ? undefined
            : dateValue.toISOString().split("T")[0];

        const fields: Record<string, any> = {
            "Adresse du Bien": address,
            "Date RDV": formattedDate,
            "Heure RDV": appointmentTime,
            "Prénom": contact.firstName || "",
            "Nom": contact.name,
            Email: contact.email,
            Tel: contact.phone,
            Source: "Prise de RDV en ligne",
            Détails: JSON.stringify(body),
        };

        // Remove undefined to avoid Airtable errors
        Object.keys(fields).forEach((key) => {
            if (fields[key] === undefined || fields[key] === null) {
                delete fields[key];
            }
        });

        await base(tableName).create([{ fields }]);

        return NextResponse.json({ ok: true });
    } catch (error) {
        console.error("Error creating appointment in Airtable:", error);
        return NextResponse.json(
            { error: "Impossible de créer le rendez-vous. Veuillez réessayer." },
            { status: 500 }
        );
    }
}
