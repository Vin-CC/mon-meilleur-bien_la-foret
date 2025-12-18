import { NextRequest, NextResponse } from "next/server";
import { getAirtableBase, getQuestionTableName } from "@/lib/airtable";

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

        const base = getAirtableBase();
        const tableName = getQuestionTableName();

        const fields: Record<string, any> = {
            Nom: nom,
            Prénom: prenom,
            Email: email,
            Tel: telephone,
            "Les Besoins": message,
            // Source: "Formulaire Une question spécifique",
        };

        await base(tableName).create([{ fields }]);

        return NextResponse.json({ ok: true });
    } catch (error) {
        console.error("Error creating question in Airtable:", error);
        return NextResponse.json(
            { error: "Impossible d'envoyer votre question pour le moment." },
            { status: 500 }
        );
    }
}
