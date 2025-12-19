import { NextRequest, NextResponse } from "next/server";
import { sendHookRequest } from "@/lib/airtable";
import { extractCityFromAddress } from "@/lib/address";

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

        // Normalize date to YYYY-MM-DD for Airtable
        const dateValue = new Date(appointmentDate);
        const formattedDate = Number.isNaN(dateValue.getTime())
            ? undefined
            : dateValue.toISOString().split("T")[0];


        const dateHeure = `${formattedDate} ${appointmentTime}`;

        const fields: Record<string, any> = {
            "Adresse complète du Bien": address,
            "Date RDV Estimation": dateHeure,
            "Nom & Prénom": `${contact.firstName} ${contact.name}`,
            Email: contact.email,
            Tel: contact.phone,
            // Source: "Prise de RDV en ligne",
            // Détails: JSON.stringify(body),
            Source: "RDV",
        };

        const city = extractCityFromAddress(address);
        if (city) fields["Ville"] = city;

        // Remove undefined to avoid Airtable errors
        Object.keys(fields).forEach((key) => {
            if (fields[key] === undefined || fields[key] === null) {
                delete fields[key];
            }
        });

        await sendHookRequest(fields);

        return NextResponse.json({ ok: true });
    } catch (error) {
        console.error("Error creating appointment via hook:", error);
        return NextResponse.json(
            { error: "Impossible de créer le rendez-vous. Veuillez réessayer." },
            { status: 500 }
        );
    }
}
