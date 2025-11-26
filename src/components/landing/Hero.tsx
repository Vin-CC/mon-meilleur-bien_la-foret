import { ArrowDown } from "lucide-react";

export function Hero() {
    return (
        <section className="relative bg-gradient-to-r from-brand-blue to-brand-dark text-white min-h-screen flex items-center overflow-hidden border-0">
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-0 right-0 w-2/3 h-full">
                    <div className="relative w-full h-full">
                        <div className="absolute inset-0 opacity-20">
                            <svg viewBox="0 0 800 600" className="w-full h-full">
                                <defs>
                                    <linearGradient id="flow1" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor="#18cd75"></stop>
                                        <stop offset="50%" stopColor="#022b60"></stop>
                                        <stop offset="100%" stopColor="#022b60"></stop>
                                    </linearGradient>
                                    <linearGradient id="flow2" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor="#18cd75"></stop>
                                        <stop offset="100%" stopColor="#18cd75"></stop>
                                    </linearGradient>
                                </defs>
                                <path
                                    d="M200,100 Q400,50 600,150 Q700,200 800,100 L800,300 Q600,250 400,350 Q200,300 0,400 Z"
                                    fill="url(#flow1)"
                                ></path>
                                <path
                                    d="M100,200 Q300,150 500,250 Q700,300 800,200 L800,450 Q500,400 300,500 Q100,450 0,550 Z"
                                    fill="url(#flow2)"
                                ></path>
                            </svg>
                        </div>
                        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-gradient-to-br from-brand-green/30 to-brand-blue/30 rounded-full blur-3xl animate-pulse"></div>
                        <div
                            className="absolute bottom-1/3 right-1/3 w-48 h-48 bg-gradient-to-br from-white/20 to-brand-green/20 rounded-full blur-2xl animate-pulse"
                            style={{ animationDelay: "1s" }}
                        ></div>
                    </div>
                </div>
            </div>
            <div className="relative z-10 container mx-auto px-4 py-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-8">
                        <div className="space-y-6">
                            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                                Estimez la valeur de votre bien{" "}
                                <span className="text-brand-green">en 2 minutes</span>
                            </h1>
                            <p className="text-xl text-blue-100 leading-relaxed max-w-2xl">
                                Recevez une estimation fiable en ligne basée sur les ventes
                                réelles dans votre quartier. Notre technologie analyse plus de
                                1000 critères pour une évaluation précise.
                            </p>
                        </div>
                        <div className="space-y-6">
                            <button className="justify-center whitespace-nowrap ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-10 bg-brand-green hover:bg-brand-green/90 text-white px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-200 hover:scale-105 shadow-lg flex items-center gap-2">
                                Commencer mon estimation
                                <ArrowDown className="w-5 h-5" />
                            </button>
                            <div className="flex flex-wrap gap-6 text-sm">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-brand-green rounded-full"></div>
                                    <span className="text-blue-100">100% Gratuit</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-brand-green rounded-full"></div>
                                    <span className="text-blue-100">2 minutes chrono</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-brand-green rounded-full"></div>
                                    <span className="text-blue-100">Données fiables</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="relative lg:block hidden">
                        <div className="relative w-full h-96 rounded-2xl overflow-hidden bg-white/10 p-4 animate-fade-in">
                            <img
                                src="/images/hero_illustration_1764074855155.png"
                                alt="Estimation immobilière avec carte interactive"
                                className="w-full h-full object-contain rounded-xl animate-float"
                                loading="eager"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
