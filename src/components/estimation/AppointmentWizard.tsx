"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    ArrowLeft,
    Mail,
    Phone
} from "lucide-react";
import { useAddressAutocomplete } from "@/hooks/useAddressAutocomplete";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { CustomCalendar } from "@/components/ui/custom-calendar";
import { fr } from "date-fns/locale";
import { format } from "date-fns";

interface AppointmentFormData {
    address: string;
    contact: {
        firstName: string;
        name: string;
        email: string;
        phone: string;
    };
    appointmentDate: Date | undefined;
    appointmentTime: string | null;
}

const getInitialFormData = (): AppointmentFormData => ({
    address: "",
    contact: {
        firstName: "",
        name: "",
        email: "",
        phone: "",
    },
    appointmentDate: undefined,
    appointmentTime: null,
});

export function AppointmentWizard() {
    const [step, setStep] = useState(1);
    const TOTAL_STEPS = 5; // Date, Time, Address, Contact, Confirmation

    const {
        address,
        setAddress,
        suggestions,
        showSuggestions,
        setShowSuggestions,
        handleAddressChange,
        handleSelectAddress,
    } = useAddressAutocomplete("");

    const [formData, setFormData] = useState<AppointmentFormData>(getInitialFormData);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    // Sync address from hook to formData
    useEffect(() => {
        setFormData(prev => ({ ...prev, address }));
    }, [address]);

    useEffect(() => {
        if (step === TOTAL_STEPS && !hasSubmitted) {
            setHasSubmitted(true);
            console.log("Appointment soumis:", formData);
        }
    }, [step, TOTAL_STEPS, hasSubmitted, formData]);

    const handleNext = () => {
        if (step < TOTAL_STEPS) {
            setStep(step + 1);
        } else {
            // Submit form
            console.log("Appointment submitted:", formData);
            toast.success("Rendez-vous confirmé !");
            // Here you would typically redirect to a success page
        }
    };

    const handleBack = () => {
        if (step > 1) {
            setStep(step - 1);
        }
    };

    const updateFormData = (key: keyof AppointmentFormData, value: any) => {
        setFormData((prev) => ({ ...prev, [key]: value }));
    };

    const updateContact = (key: keyof AppointmentFormData["contact"], value: string) => {
        setFormData((prev) => ({
            ...prev,
            contact: { ...prev.contact, [key]: value },
        }));
    };

    const isStepValid = () => {
        switch (step) {
            case 1: return !!formData.appointmentDate;
            case 2: return !!formData.appointmentTime;
            case 3: return formData.address.length > 5;
            case 4: return formData.contact.name.length > 2 && formData.contact.email.includes("@");
            case 5: return true;
            default: return false;
        }
    };

    const resetWizard = () => {
        setFormData(getInitialFormData());
        setStep(1);
        setAddress("");
        setHasSubmitted(false);
    };

    const handleCreateAppointment = async () => {
        if (submitting) return;
        setSubmitting(true);
        try {
            const response = await fetch("/api/rdv", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    appointmentDate: formData.appointmentDate?.toISOString() ?? null,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Impossible de créer le rendez-vous.");
            }

            toast.success("Rendez-vous enregistré !");
            setStep((prev) => prev + 1);
        } catch (error: any) {
            console.error("Error creating appointment:", error);
            toast.error(error.message || "Erreur lors de la création du rendez-vous.");
        } finally {
            setSubmitting(false);
        }
    };

    const renderStep_AppointmentDate = () => (
        <div className="border border-gray-200 rounded-lg bg-white shadow-sm overflow-hidden">
            {/* Title with bottom border */}
            <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 text-center">
                    Choisissez une date
                </h3>
            </div>

            {/* Calendar */}
            <div className="p-6 flex justify-center">
                <CustomCalendar
                    selected={formData.appointmentDate}
                    onSelect={(date) => {
                        updateFormData("appointmentDate", date);
                        if (date) handleNext();
                    }}
                    locale={fr}
                    className="border-0"
                    disabled={(date) => {
                        const today = new Date();
                        const minDate = new Date(today);
                        minDate.setDate(today.getDate() + 3);
                        minDate.setHours(0, 0, 0, 0);
                        return date < minDate || date.getDay() === 0;
                    }}
                />
            </div>
        </div>
    );

    const renderStep_AppointmentTime = () => {
        const timeSlots = [
            "09:00", "09:30", "10:00", "10:30",
            "11:00", "11:30", "12:00", "12:30",
            "14:00", "14:30", "15:00", "15:30",
            "16:00", "16:30", "17:00", "17:30",
            "18:00"
        ];

        return (
            <div className="border border-gray-200 rounded-lg bg-white shadow-sm overflow-hidden">
                {/* Header with back button and date */}
                <div className="px-6 py-4 border-b border-gray-200 flex items-center">
                    <button
                        onClick={handleBack}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-600 -ml-2"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <h3 className="flex-1 text-lg font-bold text-gray-900 text-center -ml-9">
                        {formData.appointmentDate &&
                            format(formData.appointmentDate, "EEEE d MMMM", { locale: fr })
                        }
                    </h3>
                </div>

                {/* Time slots */}
                <div className="p-6 space-y-3">
                    <h4 className="text-base font-semibold text-gray-900 mb-4">
                        Choisissez une heure
                    </h4>
                    <div className="space-y-2 max-h-[500px] overflow-y-auto">
                        {timeSlots.map((time) => (
                            <button
                                key={time}
                                onClick={() => {
                                    updateFormData("appointmentTime", time);
                                    handleNext();
                                }}
                                className={`w-full p-4 rounded-lg transition-all text-center font-medium ${formData.appointmentTime === time
                                    ? "bg-brand-green/20 text-brand-green border border-brand-green"
                                    : "bg-green-50 text-green-600 hover:bg-green-100 border border-transparent"
                                    }`}
                            >
                                {time}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        );
    };

    const renderStep_Address = () => (
        <div className="border border-gray-200 rounded-lg bg-white shadow-sm overflow-visible">
            {/* Header with back button, date and time */}
            <div className="px-6 py-4 border-b border-gray-200 flex items-center">
                <button
                    onClick={handleBack}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-600 -ml-2"
                >
                    <ArrowLeft className="w-5 h-5" />
                </button>
                <div className="flex-1 text-center -ml-9">
                    <h3 className="text-lg font-bold text-gray-900">
                        {formData.appointmentDate &&
                            format(formData.appointmentDate, "EEEE d MMMM", { locale: fr })
                        }
                    </h3>
                    <p className="text-sm font-semibold text-gray-900">
                        {formData.appointmentTime}
                    </p>
                </div>
            </div>

            {/* Address input */}
            <div className="p-6 space-y-6">
                <h4 className="text-base font-semibold text-gray-900">
                    Quelle est l'adresse du bien à estimer ?
                </h4>

                <div className="relative">
                    <Input
                        placeholder=""
                        value={formData.address}
                        onChange={handleAddressChange}
                        className="h-12 text-base"
                        autoFocus
                        onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                        onFocus={() => {
                            if (formData.address.length >= 3) {
                                setShowSuggestions(true);
                            }
                        }}
                    />
                    {showSuggestions && suggestions.length > 0 && (
                        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto">
                            {suggestions.map((suggestion) => (
                                <button
                                    key={suggestion.id}
                                    className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0"
                                    onClick={() => handleSelectAddress(suggestion)}
                                >
                                    <p className="font-medium text-gray-900">{suggestion.label}</p>
                                    <p className="text-xs text-gray-500">{suggestion.context}</p>
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                <div className="flex justify-center pt-4">
                    <Button
                        onClick={handleNext}
                        disabled={!formData.address}
                        className="bg-green-400 hover:bg-green-500 text-white px-16 h-12 text-base rounded-lg"
                    >
                        Valider
                    </Button>
                </div>
            </div>
        </div>
    );

    const renderStep_Contact = () => (
        <div className="border border-gray-200 rounded-lg bg-white shadow-sm">
            {/* Header with back button, date and time */}
            <div className="px-6 py-4 border-b border-gray-200 flex items-center">
                <button
                    onClick={handleBack}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-600 -ml-2"
                >
                    <ArrowLeft className="w-5 h-5" />
                </button>
                <div className="flex-1 text-center -ml-9">
                    <h3 className="text-lg font-bold text-gray-900">
                        {formData.appointmentDate &&
                            format(formData.appointmentDate, "EEEE d MMMM", { locale: fr })
                        }
                    </h3>
                    <p className="text-sm font-semibold text-gray-900">
                        {formData.appointmentTime}
                    </p>
                </div>
            </div>

            {/* Contact form */}
            <div className="p-6 space-y-4">
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-900">Prénom</label>
                    <Input
                        placeholder="Entrez votre prénom"
                        value={formData.contact.firstName}
                        onChange={(e) => updateContact("firstName", e.target.value)}
                        className="h-12 text-base"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-900">Nom</label>
                    <Input
                        placeholder="Entrez votre nom"
                        value={formData.contact.name}
                        onChange={(e) => updateContact("name", e.target.value)}
                        className="h-12 text-base"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-900">Email</label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Input
                            type="email"
                            placeholder="Entrez votre adresse email"
                            value={formData.contact.email}
                            onChange={(e) => updateContact("email", e.target.value)}
                            className="h-12 text-base pl-11"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-900">Numéro de téléphone</label>
                    <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Input
                            type="tel"
                            placeholder="Entrez votre numéro"
                            value={formData.contact.phone}
                            onChange={(e) => updateContact("phone", e.target.value)}
                            className="h-12 text-base pl-11"
                        />
                    </div>
                </div>

                <div className="flex justify-center gap-4 pt-4">
                    <Button
                        onClick={handleBack}
                        variant="outline"
                        className="px-8 h-12 text-base"
                    >
                        Retour
                    </Button>
                    <Button
                        onClick={handleCreateAppointment}
                        disabled={!formData.contact.name || !formData.contact.email || !formData.contact.phone || submitting}
                        className="bg-brand-green hover:bg-brand-green/90 text-white px-12 h-12 text-base"
                    >
                        {submitting ? "Création..." : "Valider"}
                    </Button>
                </div>
            </div>
        </div>
    );

    const renderStep_Confirmation = () => {
        const formattedDate = formData.appointmentDate
            ? format(formData.appointmentDate, "EEEE d MMMM yyyy", { locale: fr })
            : "";

        return (
            <div className="border border-gray-200 rounded-lg bg-white shadow-sm overflow-hidden p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                    Confirmation de votre rendez-vous
                </h3>

                <div className="space-y-6 text-gray-900">
                    <p>
                        Votre demande de rendez-vous d'estimation a bien été prise en compte.
                    </p>

                    <div className="space-y-2">
                        <p>
                            <span className="font-bold">Date :</span> Le {formattedDate} à {formData.appointmentTime}
                        </p>
                        <p>
                            <span className="font-bold">Adresse :</span> {formData.address}
                        </p>
                        <p>
                            <span className="font-bold">Numéro de téléphone :</span> {formData.contact.phone}
                        </p>
                    </div>

                    <p>
                        Nous allons vous contacter dans les meilleurs délais pour confirmer ce rendez-vous.
                    </p>
                </div>
            </div>
        );
    };

    const getStepContent = () => {
        switch (step) {
            case 1: return renderStep_AppointmentDate();
            case 2: return renderStep_AppointmentTime();
            case 3: return renderStep_Address();
            case 4: return renderStep_Contact();
            case 5: return renderStep_Confirmation();
            default: return null;
        }
    };

    return (
        <div className="w-full">
            <AnimatePresence mode="wait">
                <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                >
                    {getStepContent()}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
