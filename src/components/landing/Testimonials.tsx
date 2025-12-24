import { ArrowRight } from "lucide-react";
import { EstimationModal } from "@/components/estimation/EstimationModal";

interface ITestimonial {
    name: string;
    avatar?: React.ReactNode;
    img?: string;
    comment: string;
}

const testimonials: ITestimonial[] = [
    {
        name: "Ruth Moi",
        // img: "https://lh3.googleusercontent.com/a/ACg8ocJHeusIGW1Wsk_M4FE_171tx0dA_rcUWBr00CprAx_i_u3vHA=s64-c-rp-mo-br100",
        avatar: <span className="flex justify-center items-center w-12 h-12 bg-green-500 rounded-full text-2xl text-white">R</span>,
        comment: "Un grand merci à Mme Farnault directrice de l’agence Laforêt à Sucy-en-Brie pour l’investissement et l’efficacité dont elle a fait preuve lors de la vente de notre maison. Grâce à son professionnalisme sans faille et son excellente connaissance du marché, la transaction a été menée à bien rapidement. Nous avons particulièrement apprécié la communication régulière, l’accompagnement et le suivi de chaque étape. Une agence dirigée par une professionnelle Mme Farnault digne de confiance."
    },
    {
        name: "Denya NGB",
        // img: "https://lh3.googleusercontent.com/a/ACg8ocJHeusIGW1Wsk_M4FE_171tx0dA_rcUWBr00CprAx_i_u3vHA=s64-c-rp-mo-br100",
        avatar: <span className="flex justify-center items-center w-12 h-12 bg-blue-500 rounded-full text-2xl text-white">D</span>,
        comment: `Merci à Christelle et Mme Farnault Laetitia pour leur sympathie, leur efficacité et leur rapidité ! Elles ont fait loué ma maison en moins de 2 mois et , au prix que je souhaitais. Je n’ai eu à m’occuper de rien puisque l’agence s’occupe de la gestion . C’était très confortable et mené d’une main de maître !
Je vous recommande chaleureusement l’agence,
Merci encore ,
Et bonne continuation`
    },
    {
        name: "Adeline Gouraud",
        // img: "https://lh3.googleusercontent.com/a/ACg8ocIYw67IJ1SZNGl1m-9QgTuH4mdiqfQ4NTwkbEMjABt_qMv3rg=s64-c-rp-mo-br100",
        avatar: <span className="flex justify-center items-center w-12 h-12 bg-purple-800 rounded-full text-2xl text-white">A</span>,
        comment: `
        J'ai contacté l'agence pour un avis de valeur locatif et échangé avec M. Farnault que je remercie pour sa réactivité et son professionnalisme.`
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
                                <div className="flex items-center mb-4 gap-4">
                                    {t.img ? <img
                                        src={t.img}
                                        alt={t.name}
                                        className="w-12 h-12 rounded-full"
                                    /> : t.avatar}
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
