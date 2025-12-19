import { NextRequest, NextResponse } from "next/server";
import { sendHookRequest } from "@/lib/airtable";
import { extractCityFromAddress } from "@/lib/address";

interface QuestionPayload {
    nom: string;
    prenom: string;
    email: string;
    telephone: string;
    message: string;
    address?: string;
    adresse?: string;
}

export async function POST(request: NextRequest) {
    try {
        const body: QuestionPayload = await request.json();
        const { nom, prenom, email, telephone, message, address, adresse } = body;

        if (!nom || !prenom || !email || !telephone || !message) {
            return NextResponse.json(
                { error: "Tous les champs sont requis." },
                { status: 400 }
            );
        }

        const fields: Record<string, any> = {
            "Nom & Prénom": `${nom} ${prenom}`,
            Email: email,
            Tel: telephone,
            "Les Besoins": message,
            Source: "Formulaire",
        };

        const city = extractCityFromAddress(address || adresse);
        if (city) fields["Ville"] = city;

        await sendHookRequest(fields);

        return NextResponse.json({ ok: true });
    } catch (error) {
        console.error("Error creating question via hook:", error);
        return NextResponse.json(
            { error: "Impossible d'envoyer votre question pour le moment." },
            { status: 500 }
        );
    }
}
