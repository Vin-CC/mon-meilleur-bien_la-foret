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
                                    Située au cœur du centre ville de REIMS, votre Agence ORPI REIMS, forte de son appartenance au réseau immobilier N°1 ORPI, vous propose les métiers de la transaction, de la location, de la gestion et de l'immobilier d’entreprise dans la ville de Reims et ses alentours.
                                    <br /><br />
                                    Profitez également de nos services dans les zones de Fismes, Cormicy, Cormontreuil et Tinqueux, grâce à nos conseillers spécialement dédiés à ces secteurs.
                                </p>
                            </div>
                            <a
                                className="focus:outline-primary focus-visible:outline-primary inline-flex items-center justify-center gap-3 rounded-md text-sm font-medium transition-all hover:brightness-95 focus:outline-dashed focus:outline-2 focus:outline-offset-2 focus-visible:outline-dashed focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-50 px-0 py-0 relative mx-4 h-full max-w-lg flex-1 md:mx-0"
                                role="link"
                                id="agency-picture"
                                href="#"
                            >
                                <div className="bg-card text-card-foreground rounded-md border shadow relative z-10 overflow-hidden border-none">
                                    <div className="p-0">
                                        <img
                                            alt="Photo de l'équipe de l'agence"
                                            loading="lazy"
                                            width="700"
                                            height="500"
                                            className="object-cover object-center"
                                            src="https://images.avest.fr/orpi-reims.data-immo.com/1718116924914-20240604-portraits-corporate-nomade-photo-reims-2%20(6).webp"
                                        />
                                    </div>
                                </div>
                                <div className="bg-brand-blue/60 absolute -bottom-2 -right-2 -z-0 h-40 w-40 rounded-md shadow sm:-bottom-3 sm:-right-3"></div>
                            </a>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
