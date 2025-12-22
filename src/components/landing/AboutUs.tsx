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
                                    <h2 className="text-[28px] font-extrabold sm:text-4xl text-brand-blue">
                                        Découvrez notre agence immobilière Laforêt à Sucy-en-Brie
                                    </h2>
                                </div>
                                <p className="whitespace-pre-wrap leading-7 text-gray-700">
                                    <strong>Véritable EXPERT des villes de SUCY EN BRIE et NOISEAU !</strong>
                                    <br /><br />
                                    Toute l'équipe de votre agence LAFORÊT Sucy en Brie est à votre disposition pour vous renseigner, que ce soit pour vendre, pour acheter, pour louer ou pour gérer un appartement ou une maison à Sucy en Brie, Boissy Saint Leger ou Noiseau. Rappelez-vous que nous sommes le spécialiste immobilier de votre quartier et de votre ville. Grâce à nous, bénéficiez d'une vraie expérience et d'une parfaite connaissance du marché local. Enfin, chez Laforêt Immobilier, l'effet de réseau national joue à plein. Avec des agences immobilières réparties dans toute la France, Laforêt peut vous proposer les meilleures offres tant en termes de qualité que de prix.
                                    {/* Découvrez tout l'immobilier à{" "}
                                    <a href="http://www.laforet.com/ville/immobilier-sucy-en-brie">Sucy en Brie</a>,{" "}
                                    <a href="http://www.laforet.com/ville/immobilier-boissy-saint-leger">Boissy Saint Leger</a>{" "}
                                    et{" "}
                                    <a href="http://www.laforet.com/ville/immobilier-noiseau">Noiseau</a>. */}
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
