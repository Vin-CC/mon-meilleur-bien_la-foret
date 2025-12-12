import { Calendar } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

export function CallToAction() {
    return (
        <div className="text-center mt-16 bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Prenez rendez-vous avec l’un de nos agences partenaires sélectionnées !
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Rendez-vous gratuit | Dossier d'estimation détaillé OFFERT | Agent immobilier expert du quartier
            </p>
            <div className="w-full flex justify-center px-4">
                <Link href="/rendez-vous">
                    <Button>
                        <Calendar className="w-4 h-4 flex-shrink-0" />
                        <span className="flex-1 text-center">
                            Prendre rendez-vous
                        </span>
                    </Button>
                </Link>
            </div>
        </div>
    );
}
