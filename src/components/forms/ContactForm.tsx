"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "../ui/button";

export function ContactForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        const formData = new FormData(e.currentTarget);
        const payload = {
            nom: (formData.get("nom") as string || "").trim(),
            prenom: (formData.get("prenom") as string || "").trim(),
            email: (formData.get("email") as string || "").trim(),
            telephone: (formData.get("telephone") as string || "").trim(),
            message: (formData.get("message") as string || "").trim(),
        };

        try {
            const response = await fetch("/api/questions", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Envoi impossible pour le moment.");
            }

            toast.success("Votre demande a bien été envoyée !");
            (e.target as HTMLFormElement).reset();
        } catch (error: any) {
            console.error("Error submitting question:", error);
            toast.error(error.message || "Erreur lors de l'envoi. Réessayez.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 bg-gray-50 p-6 rounded-lg text-gray-900">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="nom">
                        Nom *
                    </Label>
                    <Input
                        type="text"
                        id="nom"
                        name="nom"
                        required
                        className="mt-1 bg-white"
                    />
                </div>
                <div>
                    <Label htmlFor="prenom">
                        Prénom *
                    </Label>
                    <Input
                        type="text"
                        id="prenom"
                        name="prenom"
                        required
                        className="mt-1 bg-white"
                    />
                </div>
            </div>
            <div>
                <Label htmlFor="email">
                    Email *
                </Label>
                <Input
                    type="email"
                    id="email"
                    name="email"
                    required
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                    title="Veuillez entrer une adresse email valide"
                    className="mt-1 bg-white"
                />
            </div>
            <div>
                <Label htmlFor="telephone">
                    Téléphone *
                </Label>
                <Input
                    type="tel"
                    id="telephone"
                    name="telephone"
                    required
                    pattern="[0-9\s\-\(\)\+]{10,}"
                    title="Veuillez entrer un numéro de téléphone valide (minimum 10 chiffres)"
                    placeholder="Ex: 01 23 45 67 89"
                    className="mt-1 bg-white"
                />
            </div>
            <div>
                <Label htmlFor="message">
                    Votre besoin *
                </Label>
                <Textarea
                    id="message"
                    name="message"
                    required
                    placeholder="Décrivez-nous votre projet ou votre question..."
                    className="mt-1 min-h-[100px] bg-white"
                />
            </div>
            <Button
                // className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-10 px-4 w-full text-white py-3 font-semibold bg-brand-green hover:bg-brand-green/90"
                className="w-full"
                type="submit"
                disabled={isSubmitting}
            >
                {isSubmitting ? "Envoi en cours..." : "Envoyer ma demande"}
            </Button>
        </form>
    );
}
