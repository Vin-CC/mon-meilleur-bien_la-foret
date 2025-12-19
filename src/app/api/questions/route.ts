import { NextRequest, NextResponse } from "next/server";
import { sendHookRequest } from "@/lib/airtable";

interface QuestionPayload {
    nom: string;
    prenom: string;
    email: string;
    telephone: string;
    message: string;
}

export async function POST(request: NextRequest) {
    try {
        const body: QuestionPayload = await request.json();
        const { nom, prenom, email, telephone, message } = body;

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
