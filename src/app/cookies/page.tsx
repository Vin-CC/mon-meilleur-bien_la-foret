export default function CookiesPage() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <h1 className="text-3xl font-bold mb-8 text-brand-blue">Cookies</h1>

            <div className="space-y-8 text-gray-700">
                <section className="space-y-3">
                    <h2 className="text-xl font-semibold text-gray-900">Microsoft Clarity</h2>
                    <p>
                        Nous améliorons nos produits et nos publicités en utilisant Microsoft Clarity pour analyser votre utilisation de
                        notre site web. En utilisant notre site, vous acceptez que nous et Microsoft puissions collecter et utiliser ces
                        données. Notre déclaration de confidentialité contient plus de détails dans la page
                        <a href="/donnees-personnelles" className="ml-1 underline">
                            Données personnelles
                        </a>.
                    </p>
                </section>

                <section className="space-y-3">
                    <h2 className="text-xl font-semibold text-gray-900">Qu’est-ce qu’un cookie ?</h2>
                    <p>
                        Les cookies sont des fichiers déposés par un serveur web dans le navigateur de l’internaute lors notamment de la
                        consultation d’un site internet.
                    </p>
                    <p>
                        Laforêt France utilise des cookies sur Laforêt.com afin d’optimiser l’expérience des internautes et d’analyser la
                        fréquentation sur son site.
                    </p>
                    <p>
                        Il ressort de la règlementation que nous ne pouvons stocker des cookies sur votre appareil que s’ils sont
                        strictement nécessaires au fonctionnement de ce site. Pour tous les autres types de cookies, nous avons besoin de
                        votre consentement.
                    </p>
                </section>

                <section className="space-y-3">
                    <h2 className="text-xl font-semibold text-gray-900">Comment paramétrer mes cookies ?</h2>
                    <p>
                        Le recueil de votre consentement aux cookies autres que strictement nécessaires au fonctionnement de ce site se fait
                        au moyen du « bandeau cookies » qui apparaît lors de votre première visite.
                    </p>
                    <p>
                        Les cookies sont conservés pour une durée maximale de treize mois à compter de leur dépôt sur votre terminal. À
                        l’expiration de ce délai (ou si vous avez supprimé manuellement vos cookies), votre consentement pour le dépôt et/ou
                        la lecture de cookies sera à nouveau requis.
                    </p>
                    <p>
                        À tout moment, vous pouvez modifier ou retirer votre consentement dès la déclaration relative aux cookies sur notre
                        site web.
                    </p>
                </section>
            </div>
        </div>
    );
}
