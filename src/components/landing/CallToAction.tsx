import { ArrowDown } from "lucide-react";

export function CallToAction() {
    return (
        <div className="text-center mt-16 bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Prêt à connaître la valeur de votre bien ?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Rejoignez les milliers de propriétaires qui ont déjà fait confiance à
                notre expertise
            </p>
            <div className="w-full flex justify-center px-4">
                <button className="bg-brand-green hover:bg-brand-green/90 text-white font-semibold rounded-xl transition-all duration-200 hover:scale-105 shadow-lg px-6 text-base flex items-center gap-2 w-full max-w-sm py-[8px]">
                    <span className="flex-1 text-center">
                        Commencer mon estimation gratuite
                    </span>
                    <ArrowDown className="w-4 h-4 flex-shrink-0" />
                </button>
            </div>
        </div>
    );
}
