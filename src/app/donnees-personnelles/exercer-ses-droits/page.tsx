export default function ExercerSesDroitsPage() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-3xl">
            <h1 className="text-3xl font-bold mb-8 text-brand-blue">Exercer ses droits</h1>

            <div className="space-y-6 text-gray-700">
                <p>
                    Vous pouvez demander l’accès, la rectification, la portabilité ou l’effacement de vos données personnelles, ainsi que la
                    limitation ou l’opposition au traitement.
                </p>
                <p>
                    Pour exercer vos droits, merci d’envoyer votre demande à l’adresse suivante :{" "}
                    <a href="mailto:donneespersonnelles@laforet.com" className="underline">
                        donneespersonnelles@laforet.com
                    </a>.
                </p>
                <p>
                    Toute autre demande (candidature, projet immobilier, service après-vente, etc.) ne sera pas traitée via cette adresse.
                </p>
            </div>
        </div>
    );
}
