import Image from "next/image";

export function AboutUs() {
    return (
        <div className="lg:py-6 bg-gradient-to-tr from-brand-blue/10 from-[40%] to-white">
            <div className="mx-auto w-full max-w-7xl px-4">
                <section>
                    <div className="flex w-full flex-col items-center py-6 lg:py-20">
                        <div className="flex h-auto flex-col items-center justify-center gap-8 lg:flex-row lg:gap-24">
                            <div className="flex-1 space-y-2 sm:space-y-6">
                                <div>
                                    <h2 className="font-serif text-[28px] font-extrabold sm:text-4xl text-brand-blue">
                                        Qui sommes-nous ?
                                    </h2>
                                </div>
                                <p className="whitespace-pre-wrap leading-7 text-gray-700">
                                    Mon Meilleur Bien est un service en ligne innovant conçu pour accompagner tous les propriétaires dans leur projet de vente immobilière. Grâce à notre estimateur intelligent et à notre comparateur d’agences immobilières, nous analysons les performances des professionnels de votre secteur afin d’identifier l’agence la plus qualifiée pour vendre votre bien rapidement et au meilleur prix.
                                    <br /><br />
                                    Notre mission : vous offrir une vision claire, fiable et objective du marché local, tout en vous orientant vers les partenaires les plus performants pour maximiser la réussite de votre vente.
                                    <br /><br />
                                    En quelques clics, profitez d'une estimation précise, comparez les agences autour de vous, et laissez-nous vous guider vers la meilleure stratégie de vente selon vos besoins et votre localisation.
                                </p>
                            </div>
                            <div className="inline-flex items-center justify-center gap-3 rounded-md text-sm font-medium px-0 py-0 relative mx-4 h-full max-w-lg flex-1 md:mx-0">
                                <div className="bg-card text-card-foreground rounded-md border shadow relative z-10 overflow-hidden border-none">
                                    <div className="p-0">
                                        <img
                                            alt="Photo de l'équipe de l'agence"
                                            loading="lazy"
                                            width="700"
                                            height="500"
                                            className="object-cover object-center"
                                            src="/images/generated-about-us.png"
                                        />
                                    </div>
                                </div>
                                <div className="bg-brand-blue/60 absolute -bottom-2 -right-2 -z-0 h-40 w-40 rounded-md shadow sm:-bottom-3 sm:-right-3"></div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
