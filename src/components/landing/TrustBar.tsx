import { Clock, ShieldCheck, MapPin, Euro } from "lucide-react";

export function TrustBar() {
    const benefits = [
        {
            icon: Clock,
            title: "Estimation en 2 min",
            description: "Rapide et sans engagement"
        },
        {
            icon: ShieldCheck,
            title: "Gratuit & Confidentiel",
            description: "Vos données sont protégées"
        },
        {
            icon: MapPin,
            title: "Expert local",
            description: "Connaissance parfaite du marché"
        },
        {
            icon: Euro,
            title: "Prix du marché",
            description: "Basé sur les ventes réelles"
        }
    ];

    return (
        <section className="bg-white border-b border-gray-100 relative z-20 -mt-8 mx-4 md:mx-0 rounded-xl md:rounded-none shadow-lg md:shadow-none">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-gray-100">
                    {benefits.map((benefit, index) => (
                        <div key={index} className="flex items-center p-6 justify-center md:justify-start group hover:bg-gray-50 transition-colors">
                            <div className="mr-4 p-3 bg-brand-blue/5 rounded-full group-hover:bg-brand-blue/10 transition-colors">
                                <benefit.icon className="w-6 h-6 text-brand-blue" />
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900 text-sm">{benefit.title}</h3>
                                <p className="text-gray-500 text-xs">{benefit.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
