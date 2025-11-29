"use client";

import { useState } from "react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

export function FAQ() {
    const [openItem, setOpenItem] = useState<string | null>(null);

    const toggleItem = (value: string) => {
        setOpenItem(openItem === value ? null : value);
    };

    return (
        <section id="faq" className="py-16 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-blue-dark mb-4">
                        Questions fréquentes
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Tout ce que vous devez savoir sur notre service d'estimation
                        immobilière
                    </p>
                </div>
                <div className="max-w-3xl mx-auto">
                    <Accordion className="space-y-4">
                        <AccordionItem>
                            <AccordionTrigger
                                isOpen={openItem === "item-1"}
                                onToggle={() => toggleItem("item-1")}
                            >
                                Comment fonctionne votre estimation immobilière ?
                            </AccordionTrigger>
                            <AccordionContent isOpen={openItem === "item-1"}>
                                Notre outil d'estimation en ligne utilise un algorithme avancé
                                qui analyse les données du marché immobilier en temps réel. Il
                                prend en compte les caractéristiques de votre bien (surface,
                                nombre de pièces, état, etc.) et les compare aux ventes
                                récentes de biens similaires dans votre quartier pour vous
                                fournir une estimation précise et fiable.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem>
                            <AccordionTrigger
                                isOpen={openItem === "item-2"}
                                onToggle={() => toggleItem("item-2")}
                            >
                                L'estimation est-elle vraiment gratuite et sans engagement ?
                            </AccordionTrigger>
                            <AccordionContent isOpen={openItem === "item-2"}>
                                Oui, absolument. Notre service d'estimation en ligne est 100%
                                gratuit et ne vous engage à rien. Vous recevez votre estimation
                                immédiatement sans avoir à signer de mandat ni à payer de
                                frais. C'est un outil libre d'accès pour vous aider à connaître
                                la valeur de votre bien.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem>
                            <AccordionTrigger
                                isOpen={openItem === "item-3"}
                                onToggle={() => toggleItem("item-3")}
                            >
                                Quelle est la précision de votre estimation ?
                            </AccordionTrigger>
                            <AccordionContent isOpen={openItem === "item-3"}>
                                Notre estimation est très précise car elle se base sur les
                                données officielles des notaires et sur les annonces
                                immobilières en temps réel. Nous analysons plus de 1000
                                critères pour affiner le prix. Cependant, une estimation en
                                ligne reste indicative. Pour une précision au centime près,
                                nous vous recommandons de faire appel à l'un de nos experts
                                partenaires pour une visite sur place.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem>
                            <AccordionTrigger
                                isOpen={openItem === "item-4"}
                                onToggle={() => toggleItem("item-4")}
                            >
                                Combien de temps faut-il pour recevoir l'estimation ?
                            </AccordionTrigger>
                            <AccordionContent isOpen={openItem === "item-4"}>
                                C'est immédiat ! Une fois que vous avez rempli le formulaire
                                avec les caractéristiques de votre bien (ce qui prend environ 2
                                minutes), le résultat s'affiche instantanément à l'écran. Vous
                                recevez également un rapport détaillé par email.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem>
                            <AccordionTrigger
                                isOpen={openItem === "item-5"}
                                onToggle={() => toggleItem("item-5")}
                            >
                                Que faire après avoir reçu mon estimation ?
                            </AccordionTrigger>
                            <AccordionContent isOpen={openItem === "item-5"}>
                                Une fois votre estimation reçue, vous avez plusieurs options.
                                Vous pouvez décider de mettre votre bien en vente, de le louer,
                                ou simplement de conserver cette information pour plus tard. Si
                                vous souhaitez vendre, nous pouvons vous mettre en relation
                                avec les meilleurs agents immobiliers de votre secteur pour
                                vous accompagner.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem>
                            <AccordionTrigger
                                isOpen={openItem === "item-6"}
                                onToggle={() => toggleItem("item-6")}
                            >
                                Mes données personnelles sont-elles protégées ?
                            </AccordionTrigger>
                            <AccordionContent isOpen={openItem === "item-6"}>
                                La protection de vos données est notre priorité. Toutes les
                                informations que vous nous transmettez sont sécurisées et
                                restent confidentielles. Elles ne sont utilisées que dans le
                                cadre de votre estimation et ne sont jamais revendues à des
                                tiers sans votre accord explicite. Nous respectons
                                scrupuleusement la réglementation RGPD.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem>
                            <AccordionTrigger
                                isOpen={openItem === "item-7"}
                                onToggle={() => toggleItem("item-7")}
                            >
                                Puis-je obtenir une estimation plus précise en personne ?
                            </AccordionTrigger>
                            <AccordionContent isOpen={openItem === "item-7"}>
                                Oui, si vous souhaitez une estimation plus précise, nous vous
                                recommandons de prendre rendez-vous en cliquant sur{" "}
                                <a href="#" className="underline">
                                    ce lien
                                </a>
                                . Un agent se chargera d'effectuer une évaluation plus détaillée
                                de votre bien.
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
            </div>
        </section>
    );
}
