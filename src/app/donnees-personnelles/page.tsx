export default function DonneesPersonnellesPage() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <h1 className="text-3xl font-bold mb-8 text-brand-blue">Données personnelles</h1>

            <div className="space-y-8 text-gray-700">
                <p className="font-semibold">
                    Les données personnelles que vous nous confiez permettent à Laforêt de vous proposer des services adaptés et
                    personnalisés. Vos données sont confidentielles. Nous les protégeons et vous pouvez les contrôler à tout moment.
                </p>

                <section className="space-y-3">
                    <h2 className="text-xl font-semibold text-gray-900">À quoi nous servent vos données ?</h2>
                    <p>Vos données nous servent :</p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>A vous proposer un bien immobilier qui correspond à vos attentes.</li>
                        <li>A vous mettre en relation avec une agence Laforêt pour vous accompagner dans votre projet immobilier.</li>
                        <li>A vous proposer des services personnalisés en adéquation avec vos besoins.</li>
                        <li>A réaliser des statistiques et vous proposer de la publicité ciblée adaptée à vos attentes.</li>
                    </ul>
                </section>

                <section className="space-y-3">
                    <h2 className="text-xl font-semibold text-gray-900">Nous protégeons vos données</h2>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>Laforêt s’engage à assurer la sécurité et la confidentialité de vos données personnelles.</li>
                        <li>
                            Elles sont conservées sur des serveurs sécurisés afin de vous protéger en cas de cyberattaque. Laforêt s’engage à ne
                            pas vendre vos données à des tiers ni à les communiquer sans votre accord préalable.
                        </li>
                    </ul>
                </section>

                <section className="space-y-3">
                    <h2 className="text-xl font-semibold text-gray-900">Vous gardez le contrôle de vos données</h2>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>
                            À tout moment, vous pouvez accéder aux données personnelles que vous nous avez confiées, les modifier, les mettre
                            à jour, les supprimer ou demander à ce qu’elles vous soient restituées.
                        </li>
                        <li>
                            Pour exercer ces droits, <a href="/donnees-personnelles/exercer-ses-droits" className="underline">cliquez ici</a> (toute
                            autre demande ne sera pas traitée via cette adresse courriel : candidature pour stage/alternance, projet immobilier,
                            service après vente…).
                        </li>
                    </ul>
                </section>

                <section className="space-y-3">
                    <h2 className="text-xl font-semibold text-gray-900">Politique de protection des données</h2>
                    <p>Vous pouvez télécharger les documents relatifs à la politique de protection des données personnelles ici :</p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>
                            <a
                                href="https://www.laforet.com/storage/files/Juridique/Laforet_Politique_de_protection_des_donn%C3%A9es_clients_prospects_Mars%202024.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline"
                            >
                                Politique de protection des données à caractère personnel des clients et prospects
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://www.laforet.com/storage/files/Juridique/Laforet_Politique_de%20protection_des%20donn%C3%A9es_candidats_Mars%202024.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline"
                            >
                                Politique de protection des données à caractère personnel des candidats
                            </a>
                        </li>
                    </ul>
                </section>
            </div>
        </div>
    );
}
