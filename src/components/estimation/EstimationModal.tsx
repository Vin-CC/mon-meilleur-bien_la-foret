"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Building2, Check, Home, MapPin, Warehouse } from "lucide-react";
import { useState, useEffect } from "react";
import { useAddressAutocomplete } from "@/hooks/useAddressAutocomplete";

interface EstimationModalProps {
    children: React.ReactNode;
    defaultAddress?: string;
}

type PropertyType = "appartement" | "maison" | "terrain" | "autre" | null;
type ProjectType = "vente" | "location" | "curiosite" | null;
type Condition = "refait-a-neuf" | "bon-etat" | "rafraichissement" | "renovation" | null;
type Exterior = "balcon" | "terrasse" | "jardin" | "pas-d-exterieur" | null;
type Ownership = "proprietaire" | "locataire" | null;
type ProjectTimeline = "immediat" | "3-mois" | "6-mois" | "indefini" | null;

interface FormData {
    propertyType: PropertyType;
    address: string;
    surface: string;
    rooms: number | null;
    bedrooms: number | null;
    condition: Condition;
    floor: number | null;
    exterior: Exterior;
    constructionYear: string;
    isOwner: Ownership;
    projectTimeline: ProjectTimeline;
    contact: {
        name: string;
        email: string;
        phone: string;
    };
}



export function EstimationModal({ children, defaultAddress = "" }: EstimationModalProps) {
    const [open, setOpen] = useState(false);
    const [step, setStep] = useState(1);

    const {
        address,
        setAddress,
        suggestions,
        showSuggestions,
        setShowSuggestions,
        handleAddressChange,
        handleSelectAddress,
    } = useAddressAutocomplete(defaultAddress);

    const [formData, setFormData] = useState<FormData>({
        propertyType: null,
        address: defaultAddress,
        surface: "",
        rooms: null,
        bedrooms: null,
        condition: null,
        floor: null,
        exterior: null,
        constructionYear: "",
        isOwner: null,
        projectTimeline: null,
        contact: {
            name: "",
            email: "",
            phone: "",
        },
    });

    // Sync address from hook to formData
    useEffect(() => {
        setFormData(prev => ({ ...prev, address }));
    }, [address]);

    // Update address if defaultAddress changes
    useEffect(() => {
        if (defaultAddress) {
            setAddress(defaultAddress);
            // If we have a valid address and we're on step 2, skip to step 3
            if (defaultAddress.length > 5 && step === 2) {
                setStep(3);
            }
        }
    }, [defaultAddress, step, setAddress]);

    // Calculate total steps dynamically based on property type
    const isApartment = formData.propertyType === "appartement";
    const TOTAL_STEPS = isApartment ? 13 : 12;

    const progress = (step / TOTAL_STEPS) * 100;

    const handleNext = () => {
        if (step < TOTAL_STEPS) {
            setStep(step + 1);
        } else {
            // Submit form
            console.log("Form submitted:", formData);
            setOpen(false);
            // Reset form after a delay
            setTimeout(() => {
                setStep(1);
                setFormData({
                    propertyType: null,
                    address: "",
                    surface: "",
                    rooms: null,
                    bedrooms: null,
                    condition: null,
                    floor: null,
                    exterior: null,
                    constructionYear: "",
                    isOwner: null,
                    projectTimeline: null,
                    contact: { name: "", email: "", phone: "" },
                });
            }, 500);
        }
    };

    const handleBack = () => {
        if (step > 1) {
            setStep(step - 1);
        }
    };

    const updateFormData = (key: keyof FormData, value: any) => {
        setFormData((prev) => ({ ...prev, [key]: value }));
    };

    const updateContact = (key: keyof FormData["contact"], value: string) => {
        setFormData((prev) => ({
            ...prev,
            contact: { ...prev.contact, [key]: value },
        }));
    };

    // Helper to determine current step index considering conditional steps
    // Step mapping:
    // 1: Type
    // 2: Address
    // 3: Surface
    // 4: Rooms
    // 5: Bedrooms
    // 6: Condition
    // 7: Floor (Only if Apartment) -> If not apartment, this step index is skipped in logic but UI needs to handle it
    // To simplify, we'll just render based on current step number and adjust the content dynamically

    // Actually, it's easier to keep a linear step counter and render content based on a list of steps
    // But since I'm using a simple number, I need to handle the conditional jump.

    // Let's refactor the render logic to be more robust.
    // We will define the sequence of steps.

    const getStepContent = () => {
        // Base steps that are always present
        // 1. Type
        // 2. Address
        // 3. Surface
        // 4. Rooms
        // 5. Bedrooms
        // 6. Condition
        // 7. Floor (Conditional)
        // 8. Exterior
        // 9. Construction Year
        // 10. Ownership
        // 11. Project Timeline
        // 12. Contact

        // If not apartment, we skip Floor. So:
        // Apt: 1, 2, 3, 4, 5, 6, 7(Floor), 8, 9, 10, 11, 12 (Total 12)
        // House: 1, 2, 3, 4, 5, 6, 7(Exterior), 8(Year), 9(Owner), 10(Project), 11(Contact) (Total 11)

        // This means step 7 is Floor for Apt, but Exterior for House.

        if (isApartment) {
            switch (step) {
                case 1: return renderStep1_Type();
                case 2: return renderStep2_Address();
                case 3: return renderStep3_Surface();
                case 4: return renderStep4_Rooms();
                case 5: return renderStep5_Bedrooms();
                case 6: return renderStep6_Condition();
                case 7: return renderStep7_Floor();
                case 8: return renderStep8_Exterior();
                case 9: return renderStep9_Year();
                case 10: return renderStep10_Ownership();
                case 11: return renderStep11_Project();
                case 12: return renderStep12_Contact();
                case 13: return renderStep13_Phone();
                default: return null;
            }
        } else {
            switch (step) {
                case 1: return renderStep1_Type();
                case 2: return renderStep2_Address();
                case 3: return renderStep3_Surface();
                case 4: return renderStep4_Rooms();
                case 5: return renderStep5_Bedrooms();
                case 6: return renderStep6_Condition();
                case 7: return renderStep8_Exterior(); // Skip Floor
                case 8: return renderStep9_Year();
                case 9: return renderStep10_Ownership();
                case 10: return renderStep11_Project();
                case 11: return renderStep12_Contact();
                case 12: return renderStep13_Phone();
                default: return null;
            }
        }
    };

    const isStepValid = () => {
        if (isApartment) {
            switch (step) {
                case 1: return !!formData.propertyType;
                case 2: return formData.address.length > 5;
                case 3: return formData.surface.length > 0 && !isNaN(Number(formData.surface));
                case 4: return formData.rooms !== null;
                case 5: return formData.bedrooms !== null;
                case 6: return !!formData.condition;
                case 7: return formData.floor !== null;
                case 8: return !!formData.exterior;
                case 9: return formData.constructionYear.length === 4 && !isNaN(Number(formData.constructionYear));
                case 10: return !!formData.isOwner;
                case 11: return !!formData.projectTimeline;
                case 12: return formData.contact.name.length > 2 && formData.contact.email.includes("@");
                case 13: return formData.contact.phone.length > 8;
                default: return false;
            }
        } else {
            switch (step) {
                case 1: return !!formData.propertyType;
                case 2: return formData.address.length > 5;
                case 3: return formData.surface.length > 0 && !isNaN(Number(formData.surface));
                case 4: return formData.rooms !== null;
                case 5: return formData.bedrooms !== null;
                case 6: return !!formData.condition;
                case 7: return !!formData.exterior;
                case 8: return formData.constructionYear.length === 4 && !isNaN(Number(formData.constructionYear));
                case 9: return !!formData.isOwner;
                case 10: return !!formData.projectTimeline;
                case 11: return formData.contact.name.length > 2 && formData.contact.email.includes("@");
                case 12: return formData.contact.phone.length > 8;
                default: return false;
            }
        }
    };

    // Render functions for steps
    const renderStep1_Type = () => (
        <div className="space-y-6">
            <h3 className="text-xl font-semibold text-center text-blue-dark">
                Quel type de bien souhaitez-vous estimer ?
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                    { id: "appartement", icon: Building2, label: "Appartement", sub: "Logement en copropriété" },
                    { id: "maison", icon: Home, label: "Maison", sub: "Maison individuelle" },
                    { id: "terrain", icon: MapPin, label: "Terrain", sub: "Terrain à bâtir" },
                    { id: "autre", icon: Warehouse, label: "Autre", sub: "Local, parking, etc." },
                ].map((item) => (
                    <button
                        key={item.id}
                        onClick={() => {
                            updateFormData("propertyType", item.id);
                            // If address is already filled, skip to step 3
                            const hasValidAddress = formData.address.length > 5;
                            setFormData(prev => ({ ...prev, propertyType: item.id as PropertyType }));
                            setTimeout(() => setStep(hasValidAddress ? 3 : 2), 0);
                        }}
                        className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all hover:border-brand-green hover:bg-brand-green/5 text-left group ${formData.propertyType === item.id ? "border-brand-green bg-brand-green/10" : "border-gray-100"}`}
                    >
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${formData.propertyType === item.id ? "bg-brand-green text-white" : "bg-gray-100 text-gray-500 group-hover:bg-brand-green group-hover:text-white"}`}>
                            <item.icon className="w-6 h-6" />
                        </div>
                        <div>
                            <span className="block font-semibold text-gray-900">{item.label}</span>
                            <span className="text-sm text-gray-500">{item.sub}</span>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );

    const renderStep2_Address = () => (
        <div className="space-y-6">
            <h3 className="text-xl font-semibold text-center text-blue-dark">
                Où se situe le bien ?
            </h3>
            <div className="max-w-md mx-auto relative">
                <Input
                    placeholder="Entrez l'adresse complète"
                    value={formData.address}
                    onChange={handleAddressChange}
                    className="h-12 text-lg"
                    autoFocus
                    onBlur={() => {
                        // Delay hiding suggestions to allow clicking on them
                        setTimeout(() => setShowSuggestions(false), 200);
                    }}
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
                <p className="text-sm text-muted-foreground mt-2 text-center">
                    Nous avons besoin de l'adresse exacte pour une estimation précise.
                </p>
            </div>
        </div>
    );

    const renderStep3_Surface = () => (
        <div className="space-y-6">
            <h3 className="text-xl font-semibold text-center text-blue-dark">
                Quelle est la surface habitable ?
            </h3>
            <div className="max-w-xs mx-auto relative">
                <Input
                    type="number"
                    placeholder="0"
                    value={formData.surface}
                    onChange={(e) => updateFormData("surface", e.target.value)}
                    className="h-16 text-3xl text-center pr-12"
                    autoFocus
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xl text-gray-500 font-medium">
                    m²
                </span>
            </div>
        </div>
    );

    const renderStep4_Rooms = () => (
        <div className="space-y-6">
            <h3 className="text-xl font-semibold text-center text-blue-dark">
                Combien de pièces principales ?
            </h3>
            <div className="grid grid-cols-4 gap-3">
                {[
                    { num: 1, label: "pièce" },
                    { num: 2, label: "pièces" },
                    { num: 3, label: "pièces" },
                    { num: 4, label: "pièces" },
                    { num: 5, label: "pièces" },
                    { num: 6, label: "pièces" },
                    { num: 7, label: "pièces" },
                    { num: 8, label: "pièces", suffix: "+" },
                ].map((item) => (
                    <button
                        key={item.num}
                        onClick={() => {
                            updateFormData("rooms", item.num);
                            handleNext();
                        }}
                        className={`h-20 rounded-xl border-2 transition-all hover:border-brand-green hover:bg-brand-green/5 flex flex-col items-center justify-center ${formData.rooms === item.num ? "bg-brand-green text-white border-brand-green" : "border-gray-200 text-gray-700 bg-white"}`}
                    >
                        <span className="text-2xl font-bold">{item.num}{item.suffix || ""}</span>
                        <span className="text-xs">{item.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );

    const renderStep5_Bedrooms = () => (
        <div className="space-y-6">
            <h3 className="text-xl font-semibold text-center text-blue-dark">
                Combien de chambres ?
            </h3>
            <div className="grid grid-cols-4 gap-3">
                {[
                    { num: 0, label: "chambre" },
                    { num: 1, label: "chambre" },
                    { num: 2, label: "chambres" },
                    { num: 3, label: "chambres" },
                    { num: 4, label: "chambres" },
                    { num: 5, label: "chambres", suffix: "+" },
                ].map((item) => (
                    <button
                        key={item.num}
                        onClick={() => {
                            updateFormData("bedrooms", item.num);
                            handleNext();
                        }}
                        className={`h-20 rounded-xl border-2 transition-all hover:border-brand-green hover:bg-brand-green/5 flex flex-col items-center justify-center ${formData.bedrooms === item.num ? "bg-brand-green text-white border-brand-green" : "border-gray-200 text-gray-700 bg-white"}`}
                    >
                        <span className="text-2xl font-bold">{item.num}{item.suffix || ""}</span>
                        <span className="text-xs">{item.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );

    const renderStep6_Condition = () => (
        <div className="space-y-6">
            <h3 className="text-xl font-semibold text-center text-blue-dark">
                Quel est l'état général du bien ?
            </h3>
            <div className="grid grid-cols-1 gap-4 max-w-md mx-auto">
                {[
                    { id: "refait-a-neuf", label: "Refait à neuf", sub: "Aucun travaux à prévoir" },
                    { id: "bon-etat", label: "Bon état", sub: "Quelques petits travaux de décoration" },
                    { id: "rafraichissement", label: "À rafraîchir", sub: "Travaux de peinture, sols..." },
                    { id: "renovation", label: "À rénover", sub: "Gros travaux à prévoir" },
                ].map((item) => (
                    <button
                        key={item.id}
                        onClick={() => {
                            updateFormData("condition", item.id);
                            handleNext();
                        }}
                        className={`p-4 rounded-xl border-2 transition-all hover:border-brand-green hover:bg-brand-green/5 text-left ${formData.condition === item.id ? "border-brand-green bg-brand-green/10" : "border-gray-100"}`}
                    >
                        <span className="block font-semibold text-gray-900 text-lg">{item.label}</span>
                        <span className="text-sm text-gray-500">{item.sub}</span>
                    </button>
                ))}
            </div>
        </div>
    );

    const renderStep7_Floor = () => (
        <div className="space-y-6">
            <h3 className="text-xl font-semibold text-center text-blue-dark">
                À quel étage se situe le bien ?
            </h3>
            <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto">
                {[
                    { val: 0, label: "RDC" },
                    { val: 1, label: "1er" },
                    { val: 2, label: "2ème" },
                    { val: 3, label: "3ème" },
                    { val: 4, label: "4ème" },
                    { val: 5, label: "5ème+" },
                ].map((item) => (
                    <button
                        key={item.val}
                        onClick={() => {
                            updateFormData("floor", item.val);
                            handleNext();
                        }}
                        className={`h-16 rounded-xl border-2 text-lg font-semibold transition-all hover:border-brand-green hover:bg-brand-green/5 hover:text-brand-green ${formData.floor === item.val ? "bg-brand-green text-white border-brand-green" : "border-gray-200 text-gray-700 bg-white"}`}
                    >
                        {item.label}
                    </button>
                ))}
            </div>
        </div>
    );

    const renderStep8_Exterior = () => (
        <div className="space-y-6">
            <h3 className="text-xl font-semibold text-center text-blue-dark">
                Le bien dispose-t-il d'un extérieur ?
            </h3>
            <div className="grid grid-cols-1 gap-3">
                {[
                    { id: "balcon", label: "Balcon" },
                    { id: "terrasse", label: "Terrasse" },
                    { id: "jardin", label: "Jardin" },
                    { id: "pas-d-exterieur", label: "Pas d'extérieur" },
                ].map((item) => (
                    <button
                        key={item.id}
                        onClick={() => {
                            updateFormData("exterior", item.id);
                            handleNext();
                        }}
                        className={`p-4 rounded-xl border-2 transition-all hover:border-brand-green hover:bg-brand-green/5 text-center ${formData.exterior === item.id ? "border-brand-green bg-brand-green/10" : "border-gray-100"}`}
                    >
                        <span className="block font-semibold text-gray-900 text-lg">{item.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );

    const renderStep9_Year = () => (
        <div className="space-y-6">
            <h3 className="text-xl font-semibold text-center text-blue-dark">
                En quelle année a été construit le bien ?
            </h3>
            <div className="max-w-xs mx-auto">
                <Input
                    type="number"
                    placeholder="Ex: 1990"
                    value={formData.constructionYear}
                    onChange={(e) => updateFormData("constructionYear", e.target.value)}
                    className="h-16 text-3xl text-center"
                    autoFocus
                />
            </div>
        </div>
    );

    const renderStep10_Ownership = () => (
        <div className="space-y-6">
            <h3 className="text-xl font-semibold text-center text-blue-dark">
                Êtes-vous propriétaire du bien ?
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto">
                <button
                    onClick={() => {
                        updateFormData("isOwner", "proprietaire");
                        handleNext();
                    }}
                    className={`p-6 rounded-xl border-2 transition-all hover:border-brand-green hover:bg-brand-green/5 text-center ${formData.isOwner === "proprietaire" ? "border-brand-green bg-brand-green/10" : "border-gray-100"}`}
                >
                    <span className="block font-semibold text-gray-900 text-xl">Oui</span>
                    <span className="text-sm text-gray-500">Je suis propriétaire</span>
                </button>
                <button
                    onClick={() => {
                        updateFormData("isOwner", "locataire");
                        handleNext();
                    }}
                    className={`p-6 rounded-xl border-2 transition-all hover:border-brand-green hover:bg-brand-green/5 text-center ${formData.isOwner === "locataire" ? "border-brand-green bg-brand-green/10" : "border-gray-100"}`}
                >
                    <span className="block font-semibold text-gray-900 text-xl">Non</span>
                    <span className="text-sm text-gray-500">Je suis locataire / Autre</span>
                </button>
            </div>
        </div>
    );

    const renderStep11_Project = () => (
        <div className="space-y-6">
            <h3 className="text-xl font-semibold text-center text-blue-dark">
                Avez-vous un projet de vente ?
            </h3>
            <div className="grid grid-cols-1 gap-3">
                {[
                    { id: "3-mois", label: "De 3 Mois" },
                    { id: "3-6-mois", label: "Entre 3 et 6 Mois" },
                    { id: "6-12-mois", label: "Entre 6 et 12 Mois" },
                    { id: "curiosite", label: "Juste Curiosité" },
                ].map((item) => (
                    <button
                        key={item.id}
                        onClick={() => {
                            updateFormData("projectTimeline", item.id);
                            handleNext();
                        }}
                        className={`p-4 rounded-xl border-2 transition-all hover:border-brand-green hover:bg-brand-green/5 text-center ${formData.projectTimeline === item.id ? "border-brand-green bg-brand-green/10" : "border-gray-100 bg-white"}`}
                    >
                        <span className="block font-semibold text-gray-900 text-base">{item.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );

    const renderStep12_Contact = () => (
        <div className="space-y-6">
            <h3 className="text-xl font-semibold text-center text-blue-dark">
                Vos informations
            </h3>
            <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <Input
                        placeholder="Prénom"
                        value={formData.contact.name.split(' ')[0] || ''}
                        onChange={(e) => {
                            const lastName = formData.contact.name.split(' ').slice(1).join(' ');
                            updateContact("name", `${e.target.value} ${lastName}`.trim());
                        }}
                        className="h-12"
                    />
                    <Input
                        placeholder="Nom"
                        value={formData.contact.name.split(' ').slice(1).join(' ') || ''}
                        onChange={(e) => {
                            const firstName = formData.contact.name.split(' ')[0] || '';
                            updateContact("name", `${firstName} ${e.target.value}`.trim());
                        }}
                        className="h-12"
                    />
                </div>
                <Input
                    type="email"
                    placeholder="Adresse email"
                    value={formData.contact.email}
                    onChange={(e) => updateContact("email", e.target.value)}
                    className="h-12"
                />
            </div>
        </div>
    );

    const renderStep13_Phone = () => (
        <div className="space-y-6">
            <h3 className="text-xl font-semibold text-blue-dark">
                Numéro de téléphone
            </h3>
            <p className="text-gray-600 text-sm">
                Pour recevoir votre code de validation par SMS
            </p>
            <div className="space-y-3">
                <Input
                    type="tel"
                    placeholder="07 77 77 77 77"
                    value={formData.contact.phone}
                    onChange={(e) => updateContact("phone", e.target.value)}
                    className="h-14 text-lg"
                    autoFocus
                />
                <p className="text-xs text-gray-500">
                    Format accepté : 0612345678 (sera automatiquement converti en +33612345678)
                </p>
            </div>
        </div>
    );

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] p-0 gap-0 overflow-hidden">
                <div className="p-6 space-y-6">
                    <DialogHeader className="space-y-4">
                        <div className="flex items-center justify-between relative">
                            <DialogTitle className="text-xl font-bold text-center w-full">
                                Estimation gratuite
                            </DialogTitle>
                        </div>
                        <div className="space-y-2">
                            <Progress value={progress} className="h-2 [&>[data-slot=progress-indicator]]:bg-brand-green" />
                            <p className="text-xs text-muted-foreground text-right">{Math.round(progress)}% terminé</p>
                        </div>
                    </DialogHeader>

                    <div className="py-2 min-h-[300px]">
                        {getStepContent()}
                    </div>

                    <div className="flex justify-between items-center pt-4 border-t border-gray-50">
                        {step > 1 ? (
                            <Button
                                onClick={handleBack}
                                variant="outline"
                                className="gap-2"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                Précédent
                            </Button>
                        ) : (
                            <div></div>
                        )}
                        <Button
                            onClick={handleNext}
                            className="bg-brand-green hover:bg-brand-green/90 text-white px-8 py-2 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={!isStepValid()}
                        >
                            {step === TOTAL_STEPS ? "Envoyer le code SMS" : "Suivant"}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
