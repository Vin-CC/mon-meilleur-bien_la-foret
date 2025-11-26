import { ArrowDown } from "lucide-react";

export function Features() {
    return (
        <section className="py-16 bg-white border-0">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-blue-dark mb-4">
                        Nos estimations récentes
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Découvrez quelques exemples de biens que nous avons récemment estimés
                        avec précision
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="border bg-card text-card-foreground group overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer">
                        <div className="relative">
                            <img
                                src="/images/feature_house_modern_1764074869355.png"
                                alt="Maison moderne avec jardin"
                                className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                        </div>
                        <div className="p-6 bg-white">
                            <h3 className="text-xl font-semibold text-blue-dark mb-2 group-hover:text-gold transition-colors">
                                Maison moderne
                            </h3>
                            <p className="text-gray-600 flex items-center">
                                <span className="w-2 h-2 bg-gold rounded-full mr-2"></span>
                                Banlieue parisienne
                            </p>
                        </div>
                    </div>
                    <div className="border bg-card text-card-foreground group overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer">
                        <div className="relative">
                            <img
                                src="/images/feature_house_character_1764074898803.png"
                                alt="Maison de caractère"
                                className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                        </div>
                        <div className="p-6 bg-white">
                            <h3 className="text-xl font-semibold text-blue-dark mb-2 group-hover:text-gold transition-colors">
                                Maison de caractère
                            </h3>
                            <p className="text-gray-600 flex items-center">
                                <span className="w-2 h-2 bg-gold rounded-full mr-2"></span>
                                Région parisienne
                            </p>
                        </div>
                    </div>
                    <div className="border bg-card text-card-foreground group overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer">
                        <div className="relative">
                            <img
                                src="/images/feature_apartment_1764074928235.png"
                                alt="Appartement moderne avec salon lumineux"
                                className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                        </div>
                        <div className="p-6 bg-white">
                            <h3 className="text-xl font-semibold text-blue-dark mb-2 group-hover:text-gold transition-colors">
                                Appartement contemporain
                            </h3>
                            <p className="text-gray-600 flex items-center">
                                <span className="w-2 h-2 bg-gold rounded-full mr-2"></span>
                                Île-de-France
                            </p>
                        </div>
                    </div>
                    <div className="border bg-card text-card-foreground group overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer">
                        <div className="relative">
                            <img
                                src="/images/feature_land_1764074959141.png"
                                alt="Terrain avec potentiel de construction"
                                className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                        </div>
                        <div className="p-6 bg-white">
                            <h3 className="text-xl font-semibold text-blue-dark mb-2 group-hover:text-gold transition-colors">
                                Terrain constructible
                            </h3>
                            <p className="text-gray-600 flex items-center">
                                <span className="w-2 h-2 bg-gold rounded-full mr-2"></span>
                                Proche Paris
                            </p>
                        </div>
                    </div>
                </div>
                <div className="text-center mt-12">
                    <div className="inline-flex items-center bg-blue-dark/5 rounded-full px-6 py-3 mb-6">
                        <span className="text-blue-dark font-medium">
                            + de 10 000 biens estimés chaque mois
                        </span>
                    </div>
                    <div className="mt-8">
                        <button className="justify-center whitespace-nowrap ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-10 bg-brand-green hover:bg-brand-green/90 text-white px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-200 hover:scale-105 shadow-lg flex items-center gap-2 mx-auto">
                            Estimer mon bien maintenant
                            <ArrowDown className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
