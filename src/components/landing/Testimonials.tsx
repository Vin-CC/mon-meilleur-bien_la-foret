import { ArrowDown } from "lucide-react";

export function Testimonials() {
    return (
        <section id="avis" className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-blue-dark mb-4">
                        Ils nous font confiance
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Plus de 10 000 propriétaires ont déjà estimé leur bien avec notre
                        plateforme
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    <div className="rounded-lg text-card-foreground p-6 bg-white shadow-lg hover:shadow-xl transition-shadow animate-fade-in">
                        <div className="flex items-center mb-4">
                            <img
                                src="/images/avatar_marie_1764075003105.png"
                                alt="Marie Dubois"
                                className="w-12 h-12 rounded-full mr-4"
                            />
                            <div>
                                <h4 className="font-semibold">Marie Dubois</h4>
                                <p className="text-sm text-gray-500">Paris 16ème</p>
                            </div>
                        </div>
                        <div className="flex mb-3">
                            <span className="text-yellow-400">⭐</span>
                            <span className="text-yellow-400">⭐</span>
                            <span className="text-yellow-400">⭐</span>
                            <span className="text-yellow-400">⭐</span>
                            <span className="text-yellow-400">⭐</span>
                        </div>
                        <p className="text-gray-700 italic">
                            "Estimation très précise ! J'ai vendu exactement dans la fourchette
                            annoncée. Service professionnel et réactif."
                        </p>
                    </div>
                    <div className="rounded-lg text-card-foreground p-6 bg-white shadow-lg hover:shadow-xl transition-shadow animate-fade-in">
                        <div className="flex items-center mb-4">
                            <img
                                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
                                alt="Pierre Martin"
                                className="w-12 h-12 rounded-full mr-4"
                            />
                            <div>
                                <h4 className="font-semibold">Pierre Martin</h4>
                                <p className="text-sm text-gray-500">Lyon 6ème</p>
                            </div>
                        </div>
                        <div className="flex mb-3">
                            <span className="text-yellow-400">⭐</span>
                            <span className="text-yellow-400">⭐</span>
                            <span className="text-yellow-400">⭐</span>
                            <span className="text-yellow-400">⭐</span>
                            <span className="text-yellow-400">⭐</span>
                        </div>
                        <p className="text-gray-700 italic">
                            "Interface simple et résultat instantané. L'expert m'a ensuite
                            accompagné jusqu'à la vente. Je recommande !"
                        </p>
                    </div>
                    <div className="rounded-lg text-card-foreground p-6 bg-white shadow-lg hover:shadow-xl transition-shadow animate-fade-in">
                        <div className="flex items-center mb-4">
                            <img
                                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
                                alt="Sophie Bernard"
                                className="w-12 h-12 rounded-full mr-4"
                            />
                            <div>
                                <h4 className="font-semibold">Sophie Bernard</h4>
                                <p className="text-sm text-gray-500">Marseille 8ème</p>
                            </div>
                        </div>
                        <div className="flex mb-3">
                            <span className="text-yellow-400">⭐</span>
                            <span className="text-yellow-400">⭐</span>
                            <span className="text-yellow-400">⭐</span>
                            <span className="text-yellow-400">⭐</span>
                            <span className="text-yellow-400">⭐</span>
                        </div>
                        <p className="text-gray-700 italic">
                            "Estimation gratuite très proche de la réalité. Équipe
                            professionnelle et de bon conseil."
                        </p>
                    </div>
                </div>
                <div className="mt-12 text-center">
                    <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8">
                        <div className="flex items-center">
                            <span className="text-2xl mr-2">⭐</span>
                            <div>
                                <div className="font-bold text-lg">4.8/5</div>
                                <div className="text-sm text-gray-600">Note moyenne</div>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <span className="text-2xl mr-2">🏆</span>
                            <div>
                                <div className="font-bold text-lg">10 000+</div>
                                <div className="text-sm text-gray-600">Biens estimés</div>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <span className="text-2xl mr-2">💯</span>
                            <div>
                                <div className="font-bold text-lg">95%</div>
                                <div className="text-sm text-gray-600">Clients satisfaits</div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-8">
                        <button className="justify-center whitespace-nowrap ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-10 bg-brand-green hover:bg-brand-green/90 text-white py-4 text-lg font-semibold rounded-xl transition-all duration-200 hover:scale-105 shadow-lg flex items-center gap-2 mx-auto px-[20px]">
                            Rejoignez nos clients satisfaits
                            <ArrowDown className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
