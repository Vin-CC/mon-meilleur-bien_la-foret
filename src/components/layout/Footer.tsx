import { Mail } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-gradient-to-r from-brand-blue to-brand-dark text-white py-12">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <div className="flex items-center mb-4">
                            <img
                                src="/logo texte fond bleu.png"
                                alt="MonMeilleurBien.fr"
                                className="h-12"
                            />
                        </div>
                        <p className="text-gray-300 mb-4">
                            L'expertise immobilière de confiance pour estimer et vendre votre
                            bien au meilleur prix.
                        </p>
                        <div className="flex items-center">
                            <Mail className="w-4 h-4 mr-2" />
                            <span>contact@monmeilleurbien.fr</span>
                        </div>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4">Services</h4>
                        <ul className="space-y-2 text-gray-300">
                            <li>
                                <a href="#" className="hover:text-white transition-colors">
                                    Estimation gratuite
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-white transition-colors">
                                    Vente immobilière
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-white transition-colors">
                                    Expertise en ligne
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-white transition-colors">
                                    Accompagnement personnalisé
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4">Informations légales</h4>
                        <ul className="space-y-2 text-gray-300">
                            <li>
                                <a
                                    href="/mentions-legales"
                                    className="hover:text-white transition-colors"
                                >
                                    Mentions légales
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/politique-de-confidentialite"
                                    className="hover:text-white transition-colors"
                                >
                                    Politique de confidentialité
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/rgpd"
                                    className="hover:text-white transition-colors"
                                >
                                    RGPD
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/cgu"
                                    className="hover:text-white transition-colors"
                                >
                                    CGU
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4">Contact</h4>
                        <div className="text-gray-300 space-y-2">
                            <p>contact@monmeilleurbien.fr</p>
                        </div>
                    </div>
                </div>
                <div className="border-t border-gray-600 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-gray-400 text-sm">
                        © 2024 MonMeilleurBien.fr. Tous droits réservés.
                    </p>
                    <div className="flex space-x-4 mt-4 md:mt-0">
                        <span className="text-gray-400 text-sm">
                            Développé par{" "}
                            <a
                                href="https://www.artech-group.fr"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-white transition-colors"
                            >
                                Artech
                            </a>
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
