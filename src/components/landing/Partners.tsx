const partners = [
    {
        name: "Orpi",
        image: "/partners/orpi.png",
    },
    {
        name: "La foret",
        image: "/partners/laforet.webp",
    },
    {
        name: "Century 21",
        image: "/partners/century21.png",
    },
    {
        name: "Era",
        image: "/partners/era.png",
    },
    {
        name: "Sixieme Avenue",
        image: "/partners/sixiemeavenue.svg",
    },
    {
        name: "Artech",
        image: "/partners/artech.png",
    },
]

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
                        {[...partners, ...partners].map((partner, id) => (
                            <div key={id} className="flex-shrink-0 w-48 text-center p-4 hover:bg-gray-50 rounded-lg transition-colors mx-4">
                                <div className="h-16 mb-4 flex items-center justify-center">
                                    <img
                                        src={partner.image}
                                        alt={partner.name}
                                        className="max-h-full max-w-full object-contain"
                                    />
                                </div>
                                <div className="text-xs text-gray-600 font-medium">
                                    {partner.name}
                                </div>
                            </div>
                        ))}
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
