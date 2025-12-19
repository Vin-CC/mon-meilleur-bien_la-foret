"use client";

import { ArrowDown, Building2, ChevronLeft, ChevronRight, Home, MapPin, Maximize } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

const ESTIMATIONS = [
    {
        city: "Reims",
        zip: "51100",
        price: "3 750",
        type: "Appartement",
        area: 60,
        time: "il y a 5 minutes",
        image: "https://images.avest.fr/maps-static-images/65802abe19e9d0d13612f55c/6580408c19e9d0d13612f5d7/1707955657044.webp",
    },
    {
        city: "Reims",
        zip: "51100",
        price: "3 967",
        type: "Appartement",
        area: 30,
        time: "il y a 10 minutes",
        image: "https://images.avest.fr/maps-static-images/65802abe19e9d0d13612f55c/6580408c19e9d0d13612f5d7/1707955657013.webp",
    },
    {
        city: "Reims",
        zip: "51100",
        price: "3 503",
        type: "Appartement",
        area: 151,
        time: "il y a 15 minutes",
        image: "https://images.avest.fr/maps-static-images/65802abe19e9d0d13612f55c/6580408c19e9d0d13612f5d7/1707955656930.webp",
    },
    {
        city: "Reims",
        zip: "51100",
        price: "3 595",
        type: "Appartement",
        area: 42,
        time: "il y a 17 minutes",
        image: "https://images.avest.fr/maps-static-images/65802abe19e9d0d13612f55c/6580408c19e9d0d13612f5d7/1707955656837.webp",
    },
    {
        city: "Reims",
        zip: "51100",
        price: "3 220",
        type: "Appartement",
        area: 50,
        time: "il y a 24 minutes",
        image: "https://images.avest.fr/maps-static-images/65802abe19e9d0d13612f55c/6580408c19e9d0d13612f5d7/1707955656814.webp",
    },
    {
        city: "Reims",
        zip: "51100",
        price: "3 621",
        type: "Appartement",
        area: 87,
        time: "il y a 28 minutes",
        image: "https://images.avest.fr/maps-static-images/65802abe19e9d0d13612f55c/6580408c19e9d0d13612f5d7/1707955656776.webp",
    },
    {
        city: "Reims",
        zip: "51100",
        price: "3 500",
        type: "Appartement",
        area: 90,
        time: "il y a 31 minutes",
        image: "https://images.avest.fr/maps-static-images/65802abe19e9d0d13612f55c/6580408c19e9d0d13612f5d7/1707955656817.webp",
    },
    {
        city: "Reims",
        zip: "51100",
        price: "4 079",
        type: "Maison",
        area: 89,
        time: "il y a 35 minutes",
        image: "https://images.avest.fr/maps-static-images/65802abe19e9d0d13612f55c/6580408c19e9d0d13612f5d7/1707955656755.webp",
    },
    {
        city: "Reims",
        zip: "51100",
        price: "3 368",
        type: "Appartement",
        area: 76,
        time: "il y a 42 minutes",
        image: "https://images.avest.fr/maps-static-images/65802abe19e9d0d13612f55c/6580408c19e9d0d13612f5d7/1707955656773.webp",
    },
    {
        city: "Reims",
        zip: "51100",
        price: "3 440",
        type: "Appartement",
        area: 150,
        time: "il y a 49 minutes",
        image: "https://images.avest.fr/maps-static-images/65802abe19e9d0d13612f55c/6580408c19e9d0d13612f5d7/1707955656739.webp",
    },
    {
        city: "Reims",
        zip: "51100",
        price: "3 785",
        type: "Appartement",
        area: 65,
        time: "il y a 51 minutes",
        image: "https://images.avest.fr/maps-static-images/65802abe19e9d0d13612f55c/6580408c19e9d0d13612f5d7/1707955656703.webp",
    },
    {
        city: "Reims",
        zip: "51100",
        price: "3 881",
        type: "Appartement",
        area: 134,
        time: "il y a 57 minutes",
        image: "https://images.avest.fr/maps-static-images/65802abe19e9d0d13612f55c/6580408c19e9d0d13612f5d7/1707955656706.webp",
    },
];

export function Features() {
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: "left" | "right") => {
        if (scrollContainerRef.current) {
            const scrollAmount = 300;
            scrollContainerRef.current.scrollBy({
                left: direction === "left" ? -scrollAmount : scrollAmount,
                behavior: "smooth",
            });
        }
    };

    return (
        <section className="py-16 bg-white border-0">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-blue-dark mb-4">
                        Nos estimations récentes
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Découvrez quelques exemples de biens que nous avons récemment estimés
                        avec précision
                    </p>
                </div>
                <div className="flex max-w-full flex-col items-stretch gap-2 lg:flex-row">
                    <div className="flex w-auto flex-1 space-x-4 overflow-hidden relative group">
                        <div className="absolute hidden h-[70%] w-full flex-1 items-center justify-between px-3 lg:flex pointer-events-none">
                            <button
                                onClick={() => scroll("left")}
                                className="pointer-events-auto hover:bg-foreground/80 text-primary-foreground bg-foreground/30 z-10 flex h-10 w-10 items-center justify-center rounded-full p-0 opacity-0 transition-all duration-300 ease-in-out disabled:!opacity-0 group-hover:enabled:opacity-100"
                            >
                                <ChevronLeft className="h-6 w-6" />
                                <span className="sr-only">Prev</span>
                            </button>
                            <button
                                onClick={() => scroll("right")}
                                className="pointer-events-auto hover:bg-foreground/80 text-primary-foreground bg-foreground/30 z-10 flex h-10 w-10 items-center justify-center rounded-full p-0 opacity-0 transition-all duration-300 ease-in-out disabled:!opacity-0 group-hover:enabled:opacity-100"
                            >
                                <ChevronRight className="h-6 w-6" />
                                <span className="sr-only">Next</span>
                            </button>
                        </div>
                        <div
                            ref={scrollContainerRef}
                            className="carousel-container relative z-0 flex w-full touch-pan-x snap-x snap-mandatory gap-2 overflow-x-scroll scroll-smooth py-4 lg:overflow-x-hidden no-scrollbar"
                        >
                            {ESTIMATIONS.map((est, index) => (
                                <Link
                                    key={index}
                                    href="/estimation"
                                    className="contents"
                                >
                                    <div className="bg-card text-card-foreground border shadow w-full min-w-[calc(85%-4px)] snap-start rounded sm:min-w-[calc(65%-4px)] md:min-w-[calc(45%-4px)] lg:min-w-[calc(55%-4px)] xl:min-w-[calc(33%-4px)] hover:shadow-lg transition-shadow">
                                        <div className="overflow-hidden p-0">
                                            <div className="relative h-40 w-full overflow-hidden rounded-t">
                                                <div className="focus:ring-ring inline-flex items-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 text-foreground bg-background border-primary border shadow select-none px-3 py-0.5 text-[13px] absolute right-2 top-2 z-20">
                                                    {est.time}
                                                </div>
                                                <Image
                                                    alt={`Estimation ${est.type} ${est.city}`}
                                                    src={est.image}
                                                    fill
                                                    className="object-contain"
                                                    sizes="(max-width: 640px) 75vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw"
                                                />
                                                <div className="bg-primary/20 border-primary/50 absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full border"></div>
                                            </div>
                                            <div className="flex flex-col p-3">
                                                <div className="text-muted-foreground flex items-center gap-1 text-base">
                                                    <MapPin className="h-3 w-3" />
                                                    <span>{est.city} ({est.zip})</span>
                                                </div>
                                                <div className="text-[22px] font-bold">
                                                    {est.price}&nbsp;€/m²
                                                </div>
                                                <div className="text-muted-foreground flex items-center gap-1">
                                                    <div className="flex items-center gap-1 text-base">
                                                        {est.type === "Maison" ? (
                                                            <Home className="h-3 w-3" />
                                                        ) : (
                                                            <Building2 className="h-3 w-3" />
                                                        )}
                                                        {est.type}
                                                    </div>
                                                    <span className="text-base">-</span>
                                                    <div className="flex items-center gap-1 text-base">
                                                        <span>{est.area} m²</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                    <div className="max-w-auto relative mx-auto w-fit shrink-0 lg:w-full lg:max-w-[330px] lg:py-4">
                        <div className="text-card-foreground border shadow bg-primary/10 border-primary/20 h-full w-full rounded">
                            <div className="flex h-full flex-col items-center justify-center gap-5 rounded p-4 text-center lg:gap-8">
                                <span className="text-primary text-xl font-bold">
                                    Notre outil d'estimation utilise les données de ventes réelles
                                </span>
                                <Link
                                    href="/estimation"
                                    className="focus:outline-primary focus-visible:outline-primary inline-flex items-center justify-center gap-3 rounded-md transition-all hover:brightness-95 focus:outline-dashed focus:outline-2 focus:outline-offset-2 focus-visible:outline-dashed focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow h-12 px-8 whitespace-nowrap text-lg font-bold"
                                >
                                    <ArrowDown className="h-4 w-4" />
                                    Estimer en ligne
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="text-center mt-12">
                    <div className="inline-flex items-center bg-blue-dark/5 rounded-full px-6 py-3 mb-6">
                        <span className="text-blue-dark font-medium">
                            + de 10 000 biens estimés chaque mois
                        </span>
                    </div>
                    <div className="mt-8">
                        <button className="justify-center whitespace-nowrap ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-10 bg-brand-green hover:bg-brand-green/90 text-white px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-200 hover:scale-105 shadow-lg flex items-center gap-2 mx-auto">
                            Estimer mon bien maintenant
                            <ArrowDown className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
