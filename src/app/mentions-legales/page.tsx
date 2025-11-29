export default function MentionsLegales() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <h1 className="text-3xl font-bold mb-8 text-brand-blue">Mentions Légales</h1>

            <div className="space-y-6 text-gray-700">
                <section>
                    <h2 className="text-xl font-semibold mb-3 text-gray-900">Éditeur du site</h2>
                    <p>
                        Le présent site est édité par la société ARTECH, SASU au capital social de 1 000 €, immatriculée au RCS de Chartres sous le numéro 933 408 379.
                    </p>
                    <p>
                        Siège social : 4 Chemin de l’Épine du Grés, 28210 Saint-Lucien
                    </p>
                    <p>
                        Responsable de la publication : Maxime Moisson
                    </p>
                    <p>
                        Contact : contact@artech-group.fr – Tél. : 06 25 12 63 46
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-3 text-gray-900">Hébergement</h2>
                    <p>
                        Le site est hébergé par : 1&1 IONOS 7 Place de la Gare, 57200 Sarreguemines
                    </p>
                </section>
            </div>
        </div>
    );
}
