import {
    ChartNoAxesColumnIncreasing,
    TrendingUp,
    MapPin,
    ArrowDown,
} from "lucide-react";

export function MarketData() {
    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 mb-6">
                        Prix de l'immobilier en France
                    </h2>
                    <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                        Découvrez les prix du marché immobilier par région. Nos estimations
                        s'appuient sur ces données officielles pour vous donner la valeur la
                        plus précise de votre bien.
                    </p>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    <div className="relative">
                        <div className="bg-white rounded-2xl p-8 shadow-lg animate-float">
                            <div className="relative w-full h-96 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl overflow-hidden">
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <img
                                        src="/images/market_map_france.png"
                                        alt="Carte des prix immobiliers en France"
                                        className="w-full h-full object-contain animate-pulse"
                                    />
                                    <div className="absolute top-4 right-4 bg-brand-blue text-white px-3 py-2 rounded-lg text-sm font-semibold animate-bounce">
                                        Île-de-France
                                    </div>
                                    <div
                                        className="absolute bottom-6 left-6 bg-brand-green text-white px-3 py-2 rounded-lg text-sm font-semibold animate-bounce"
                                        style={{ animationDelay: "0.5s" }}
                                    >
                                        PACA
                                    </div>
                                    <div
                                        className="absolute top-1/2 left-1/4 bg-brand-blue text-white px-3 py-2 rounded-lg text-sm font-semibold animate-bounce"
                                        style={{ animationDelay: "1s" }}
                                    >
                                        Bretagne
                                    </div>
                                </div>
                            </div>
                            <div className="mt-6 flex justify-center space-x-8">
                                <div className="flex items-center space-x-2">
                                    <div className="w-4 h-4 bg-brand-blue rounded"></div>
                                    <span className="text-sm text-gray-600">Prix élevés</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <div className="w-4 h-4 bg-brand-green rounded"></div>
                                    <span className="text-sm text-gray-600">Prix modérés</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-4 mb-8">
                            <div className="rounded-lg text-card-foreground bg-white border-0 shadow-lg">
                                <div className="p-6 text-center">
                                    <ChartNoAxesColumnIncreasing className="w-8 h-8 text-brand-blue mx-auto mb-2" />
                                    <div className="text-sm text-gray-600 mb-1">
                                        Données du marché
                                    </div>
                                    <div className="text-2xl font-bold text-gray-900">
                                        4 851 €
                                    </div>
                                    <div className="text-xs text-gray-500">
                                        Prix max/m² appartement
                                    </div>
                                    <div className="text-xs text-gray-500">PACA</div>
                                </div>
                            </div>
                            <div className="rounded-lg text-card-foreground bg-white border-0 shadow-lg">
                                <div className="p-6 text-center">
                                    <TrendingUp className="w-8 h-8 text-brand-green mx-auto mb-2" />
                                    <div className="text-sm text-gray-600 mb-1">Prix minimum</div>
                                    <div className="text-2xl font-bold text-gray-900">
                                        1 600 €
                                    </div>
                                    <div className="text-xs text-gray-500">
                                        Prix min/m² maison
                                    </div>
                                    <div className="text-xs text-gray-500">Bourgogne-FC</div>
                                </div>
                            </div>
                        </div>
                        <div className="rounded-lg bg-card bg-gradient-to-r from-brand-blue to-brand-green text-white border-0 shadow-xl">
                            <div className="p-8">
                                <div className="flex items-center mb-4">
                                    <MapPin className="w-6 h-6 mr-3" />
                                    <h3 className="text-xl font-semibold">
                                        Estimation personnalisée
                                    </h3>
                                </div>
                                <p className="text-blue-100 mb-6 leading-relaxed">
                                    Notre algorithme prend en compte votre localisation précise, les
                                    caractéristiques de votre bien et les tendances du marché local
                                    pour vous proposer une estimation fiable.
                                </p>
                                <div className="grid grid-cols-2 gap-4 text-sm mb-6">
                                    <div className="flex items-center">
                                        <div className="w-2 h-2 bg-white rounded-full mr-2"></div>
                                        <span>Analyse en temps réel</span>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="w-2 h-2 bg-white rounded-full mr-2"></div>
                                        <span>Données certifiées</span>
                                    </div>
                                </div>
                                <button className="justify-center whitespace-nowrap text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-10 bg-white text-brand-blue hover:bg-gray-100 px-6 py-3 font-semibold rounded-lg transition-all duration-200 hover:scale-105 shadow-lg flex items-center gap-2">
                                    Obtenir mon estimation
                                    <ArrowDown className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-6 mt-8">
                            <div className="text-center">
                                <div className="text-4xl font-bold text-brand-blue mb-2">
                                    12
                                </div>
                                <div className="text-gray-600">Régions analysées</div>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl font-bold text-brand-green mb-2">
                                    95 %
                                </div>
                                <div className="text-gray-600">Précision moyenne</div>
                            </div>
                        </div>
                    </div>
                </div>
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
            </div>
        </section>
    );
}
