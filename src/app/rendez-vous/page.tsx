import { AppointmentWizard } from "@/components/estimation/AppointmentWizard";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Progress } from "@/components/ui/progress";
import {
    ArrowRight,
    ArrowLeft,
    Loader2,
    CheckCircle2,
    Calendar as CalendarIcon,
    Clock,
    MapPin,
    User
} from "lucide-react";

export default function AppointmentPage() {
    return (
        <div className="min-h-screen bg-white flex flex-col">
            {/* Progress Bar */}
            <div className="w-full h-1 bg-gray-200">
                <div className="h-full bg-gradient-to-r from-green-600 to-green-400" style={{ width: '33%' }}></div>
            </div>

            <Header />

            <main className="flex-1 w-full">
                <div className="max-w-[1200px] mx-auto px-6 py-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
                        {/* Left Column - Persistent Information */}
                        <div className="space-y-6">
                            <h1 className="text-[28px] lg:text-[32px] font-bold text-gray-900 leading-tight">
                                Prenez rendez-vous pour une estimation sur place gratuite avec notre expert de votre quartier
                            </h1>

                            <div className="space-y-4 mt-8">
                                <div className="flex items-start gap-3">
                                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center mt-0.5">
                                        <CheckCircle2 className="w-4 h-4 text-white" />
                                    </div>
                                    <p className="text-gray-700 text-[15px]">
                                        Étude détaillée des caractéristiques de votre bien
                                    </p>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center mt-0.5">
                                        <CheckCircle2 className="w-4 h-4 text-white" />
                                    </div>
                                    <p className="text-gray-700 text-[15px]">
                                        Positionnement de votre bien dans le marché local
                                    </p>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center mt-0.5">
                                        <CheckCircle2 className="w-4 h-4 text-white" />
                                    </div>
                                    <p className="text-gray-700 text-[15px]">
                                        Conseils concernant votre projet de vente (délais, fiscalité, etc.)
                                    </p>
                                </div>
                            </div>

                            <p className="text-gray-600 text-sm mt-6">
                                Notre responsable vous recontacte pour vous conseiller sur votre projet de location vous accompagner dans vos démarches.
                            </p>
                        </div>

                        {/* Right Column - Wizard Content */}
                        <div className="w-full">
                            <AppointmentWizard />
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
