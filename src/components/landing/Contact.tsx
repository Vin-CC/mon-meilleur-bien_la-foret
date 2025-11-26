import { ContactForm } from "@/components/forms/ContactForm";

export function Contact() {
    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
                <div className="max-w-xl mx-auto mt-12">
                    <div className="text-center mb-6">
                        <h3 className="text-2xl font-bold text-brand-blue mb-2">
                            Une question spécifique ?
                        </h3>
                        <p className="text-gray-600">Contactez-nous directement</p>
                    </div>
                    <ContactForm />
                </div>
            </div>
        </section>
    );
}
