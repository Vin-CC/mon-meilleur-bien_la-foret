export function Partners() {
    return (
        <section className="py-12 bg-white border-t border-gray-100">
            <div className="container mx-auto px-4">
                <div className="text-center mb-8">
                    <h3 className="text-lg font-semibold text-gray-600 mb-6">
                        Nos partenaires de confiance
                    </h3>
                </div>
                <div className="relative overflow-hidden">
                    <div className="flex animate-scroll-partners hover:[animation-play-state:paused]">
                        <div className="flex-shrink-0 w-48 text-center p-4 hover:bg-gray-50 rounded-lg transition-colors mx-4">
                            <div className="h-16 mb-4 flex items-center justify-center">
                                <img
                                    src="/partners/partner1.png"
                                    alt="Notaires de France"
                                    className="max-h-full max-w-full object-contain"
                                />
                            </div>
                            <div className="text-xs text-gray-600 font-medium">
                                Notaires de France
                            </div>
                        </div>
                        <div className="flex-shrink-0 w-48 text-center p-4 hover:bg-gray-50 rounded-lg transition-colors mx-4">
                            <div className="h-16 mb-4 flex items-center justify-center">
                                <img
                                    src="/partners/partner2.png"
                                    alt="FNAIM"
                                    className="max-h-full max-w-full object-contain"
                                />
                            </div>
                            <div className="text-xs text-gray-600 font-medium">FNAIM</div>
                        </div>
                        <div className="flex-shrink-0 w-48 text-center p-4 hover:bg-gray-50 rounded-lg transition-colors mx-4">
                            <div className="h-16 mb-4 flex items-center justify-center">
                                <img
                                    src="/partners/partner3.png"
                                    alt="Crédit Agricole"
                                    className="max-h-full max-w-full object-contain"
                                />
                            </div>
                            <div className="text-xs text-gray-600 font-medium">
                                Crédit Agricole
                            </div>
                        </div>
                        <div className="flex-shrink-0 w-48 text-center p-4 hover:bg-gray-50 rounded-lg transition-colors mx-4">
                            <div className="h-16 mb-4 flex items-center justify-center">
                                <img
                                    src="/partners/partner4.png"
                                    alt="Société Générale"
                                    className="max-h-full max-w-full object-contain"
                                />
                            </div>
                            <div className="text-xs text-gray-600 font-medium">
                                Société Générale
                            </div>
                        </div>
                        <div className="flex-shrink-0 w-48 text-center p-4 hover:bg-gray-50 rounded-lg transition-colors mx-4">
                            <div className="h-16 mb-4 flex items-center justify-center">
                                <img
                                    src="/partners/partner5.png"
                                    alt="BNP Paribas"
                                    className="max-h-full max-w-full object-contain"
                                />
                            </div>
                            <div className="text-xs text-gray-600 font-medium">
                                BNP Paribas
                            </div>
                        </div>
                        {/* Duplicated for infinite scroll effect */}
                        <div className="flex-shrink-0 w-48 text-center p-4 hover:bg-gray-50 rounded-lg transition-colors mx-4">
                            <div className="h-16 mb-4 flex items-center justify-center">
                                <img
                                    src="/partners/partner1.png"
                                    alt="Notaires de France"
                                    className="max-h-full max-w-full object-contain"
                                />
                            </div>
                            <div className="text-xs text-gray-600 font-medium">
                                Notaires de France
                            </div>
                        </div>
                        <div className="flex-shrink-0 w-48 text-center p-4 hover:bg-gray-50 rounded-lg transition-colors mx-4">
                            <div className="h-16 mb-4 flex items-center justify-center">
                                <img
                                    src="/partners/partner2.png"
                                    alt="FNAIM"
                                    className="max-h-full max-w-full object-contain"
                                />
                            </div>
                            <div className="text-xs text-gray-600 font-medium">FNAIM</div>
                        </div>
                        <div className="flex-shrink-0 w-48 text-center p-4 hover:bg-gray-50 rounded-lg transition-colors mx-4">
                            <div className="h-16 mb-4 flex items-center justify-center">
                                <img
                                    src="/partners/partner3.png"
                                    alt="Crédit Agricole"
                                    className="max-h-full max-w-full object-contain"
                                />
                            </div>
                            <div className="text-xs text-gray-600 font-medium">
                                Crédit Agricole
                            </div>
                        </div>
                        <div className="flex-shrink-0 w-48 text-center p-4 hover:bg-gray-50 rounded-lg transition-colors mx-4">
                            <div className="h-16 mb-4 flex items-center justify-center">
                                <img
                                    src="/partners/partner4.png"
                                    alt="Société Générale"
                                    className="max-h-full max-w-full object-contain"
                                />
                            </div>
                            <div className="text-xs text-gray-600 font-medium">
                                Société Générale
                            </div>
                        </div>
                        <div className="flex-shrink-0 w-48 text-center p-4 hover:bg-gray-50 rounded-lg transition-colors mx-4">
                            <div className="h-16 mb-4 flex items-center justify-center">
                                <img
                                    src="/partners/partner5.png"
                                    alt="BNP Paribas"
                                    className="max-h-full max-w-full object-contain"
                                />
                            </div>
                            <div className="text-xs text-gray-600 font-medium">
                                BNP Paribas
                            </div>
                        </div>
                    </div>
                </div>
                <div className="text-center mt-8">
                    <p className="text-sm text-gray-500">
                        Données certifiées • Expertise reconnue • Partenaires agréés
                    </p>
                </div>
            </div>
        </section>
    );
}
