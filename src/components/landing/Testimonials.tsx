import { ArrowRight } from "lucide-react";
import { EstimationModal } from "@/components/estimation/EstimationModal";

const testimonials = [
    {
        name: "Carmen Pleissinger",
        img: "https://lh3.googleusercontent.com/a/ACg8ocJHeusIGW1Wsk_M4FE_171tx0dA_rcUWBr00CprAx_i_u3vHA=s64-c-rp-mo-br100",
        comment: "Nous avons enfin trouvé l'appartement de nos rêves grace à Laetitia. Toujours souriante, à l'écoute et disponible. Un grand professionnalisme !"
    },
    {
        name: "Theo Mbala",
        img: "/images/avis3.png",
        comment: "Super accueil, dans cette Agence. J'ai été super bien reçu, on m'a bien guidé et expliqué les choses. Un grand merci à Christelle qui ne nous a pas abandonné dans notre parcours. Je vous recommande cette agence. Bonne continuation à vous !"
    },
    {
        name: "Chaimaa Emziane",
        img: "https://lh3.googleusercontent.com/a/ACg8ocIYw67IJ1SZNGl1m-9QgTuH4mdiqfQ4NTwkbEMjABt_qMv3rg=s64-c-rp-mo-br100",
        comment: `
        Je remercie Daliah pour son professionnalisme et son accompagnement exceptionnel dans la réalisation de l'estimation de mon bien immobilier. Elle a fait preuve d'une grande expertise et a su me donner des conseils clairs et pertinents tout au long du processus.
Sa disponibilité, son écoute et son souci du détail m'ont vraiment rassuré et inspiré confiance. Grâce à son travail précis, j'ai obtenu une estimation juste et en adéquation avec le marché actuel.
Je recommande vivement Daliah pour toute personne cherchant un service de qualité dans le domaine de l'immobilier. Merci encore !`
    }
]

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
                    {
                        testimonials.map(t => (
                            <div className="rounded-lg text-card-foreground p-6 bg-white shadow-lg hover:shadow-xl transition-shadow animate-fade-in">
                                <div className="flex items-center mb-4">
                                    <img
                                        src={t.img}
                                        alt={t.name}
                                        className="w-12 h-12 rounded-full mr-4"
                                    />
                                    <div>
                                        <h4 className="font-semibold">{t.name}</h4>
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
                                    "{t.comment}"
                                </p>
                            </div>
                        ))
                    }
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
                        <EstimationModal>
                            <button className="justify-center whitespace-nowrap ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-10 bg-brand-green hover:bg-brand-green/90 text-white py-4 text-lg font-semibold rounded-xl transition-all duration-200 hover:scale-105 shadow-lg flex items-center gap-2 mx-auto px-[20px]">
                                Rejoignez nos clients satisfaits
                                <ArrowRight className="w-5 h-5" />
                            </button>
                        </EstimationModal>
                    </div>
                </div>
            </div>
        </section>
    );
}
