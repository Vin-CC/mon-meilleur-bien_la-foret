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
import {
    MapPin,
    Home,
    Building2,
    Warehouse,
    ArrowRight,
    ArrowLeft,
    Check,
    Loader2,
    CheckCircle2,
    Sparkles,
    Hammer,
    Construction,
    LucideProps
} from "lucide-react";
import { useState, useEffect, ForwardRefExoticComponent, RefAttributes } from "react";
import { useAddressAutocomplete } from "@/hooks/useAddressAutocomplete";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar } from "@/components/ui/calendar";
import { fr } from "date-fns/locale";
import { format } from "date-fns";

interface EstimationModalProps {
    children: React.ReactNode;

    defaultAddress?: string;
}

type PropertyType = "appartement" | "maison" | "terrain" | "autre" | null;
type ProjectType = "vente" | "location" | "curiosite" | null;
type Condition = "refait-a-neuf" | "bon-etat" | "rafraichissement" | "renovation" | null;
type Exterior = "balcon" | "terrasse" | "jardin" | "pas-d-exterieur";
type ExteriorSelection = Exterior[] | null;
type Ownership = "proprietaire" | "locataire" | null;
type ProjectTimeline = "immediat" | "3-mois" | "6-mois" | "indefini" | null;
type PhoneStepState = "phoneInput" | "otpInput" | "verified";

interface FormData {
    propertyType: PropertyType;
    address: string;
    surface: string;
    rooms: number | null;
    bedrooms: number | null;
    condition: Condition;
    floor: number | null;
    exterior: ExteriorSelection;
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

    // OTP verification states
    const [phoneStep, setPhoneStep] = useState<PhoneStepState>("phoneInput");
    const [otpCode, setOtpCode] = useState("");
    const [sending, setSending] = useState(false);
    const [verifying, setVerifying] = useState(false);
    const [resendCooldown, setResendCooldown] = useState(0);

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

    // Reset modal content when closed
    useEffect(() => {
        if (!open) {
            // Reset to initial state when modal is closed
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
            setAddress("");
            // Reset OTP states
            setPhoneStep("phoneInput");
            setOtpCode("");
            setResendCooldown(0);
        }
    }, [open, setAddress]);

    // Cooldown timer for OTP resend
    useEffect(() => {
        if (resendCooldown > 0) {
            const timer = setTimeout(() => {
                setResendCooldown(resendCooldown - 1);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [resendCooldown]);

    // Calculate total steps dynamically based on property type
    // Calculate total steps dynamically based on property type
    const isApartment = formData.propertyType === "appartement";
    const TOTAL_STEPS = isApartment ? 12 : 11;

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
                case 8: return !!formData.exterior && formData.exterior.length > 0;
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
                case 7: return !!formData.exterior && formData.exterior.length > 0;
                case 8: return formData.constructionYear.length === 4 && !isNaN(Number(formData.constructionYear));
                case 9: return !!formData.isOwner;
                case 10: return !!formData.projectTimeline;
                case 11: return formData.contact.name.length > 2 && formData.contact.email.includes("@");
                case 12: return formData.contact.phone.length > 8;
                default: return false;
            }
        }
    };

    // State for dynamic options
    const [exteriorOptions, setExteriorOptions] = useState<{ id: string; name: string }[]>([]);
    const [propertyTypeOptions, setPropertyTypeOptions] = useState<{ id: string; name: string }[]>([]);
    const [conditionOptions, setConditionOptions] = useState<{ id: string; name: string }[]>([]);
    const [ownerOptions, setOwnerOptions] = useState<{ id: string; name: string }[]>([]);
    const [timelineOptions, setTimelineOptions] = useState<{ id: string; name: string }[]>([]);
    const [loadingOptions, setLoadingOptions] = useState(false);

    // Fetch Airtable options on mount
    useEffect(() => {
        const fetchOptions = async () => {
            setLoadingOptions(true);
            try {
                const response = await fetch('/api/airtable/schema');
                if (response.ok) {
                    const table = await response.json();

                    // Fetch Exterior options
                    const exteriorField = table.fields?.find((f: any) => f.name === 'Exterieure' || f.name === 'Exterior');
                    if (exteriorField?.options?.choices) {
                        setExteriorOptions(exteriorField.options.choices.map((c: any) => ({
                            id: c.name,
                            name: c.name
                        })));
                    }

                    // Fetch Property Type options
                    const typeField = table.fields?.find((f: any) => f.name === 'Type de bien' || f.name === 'PropertyType');
                    if (typeField?.options?.choices) {
                        setPropertyTypeOptions(typeField.options.choices.map((c: any) => ({
                            id: c.name,
                            name: c.name
                        })));
                    }

                    // Fetch Condition options
                    const conditionField = table.fields?.find((f: any) => f.name === 'Etats du Bien' || f.name === 'Condition');
                    if (conditionField?.options?.choices) {
                        setConditionOptions(conditionField.options.choices.map((c: any) => ({
                            id: c.name,
                            name: c.name
                        })));
                    }

                    // Fetch Owner options
                    const ownerField = table.fields?.find((f: any) => f.name === 'Propriétaires ' || f.name === 'Owner'); // Note the space in 'Propriétaires '
                    if (ownerField?.options?.choices) {
                        setOwnerOptions(ownerField.options.choices.map((c: any) => ({
                            id: c.name,
                            name: c.name
                        })));
                    }

                    // Fetch Project Timeline options
                    const timelineField = table.fields?.find((f: any) => f.name === 'Délai de vente' || f.name === 'ProjectTimeline');
                    if (timelineField?.options?.choices) {
                        setTimelineOptions(timelineField.options.choices.map((c: any) => ({
                            id: c.name,
                            name: c.name
                        })));
                    }
                }
            } catch (error) {
                console.error('Failed to fetch Airtable options:', error);
            } finally {
                setLoadingOptions(false);
            }
        };

        fetchOptions();
    }, []);

    // Helper to map condition name to icon and subtext
    const getConditionDetails = (name: string) => {
        const lowerName = name.toLowerCase();
        if (lowerName.includes('neuf') || lowerName.includes('refait')) {
            return { icon: Sparkles, sub: "Aucun travaux à prévoir" };
        } else if (lowerName.includes('bon') || lowerName.includes('standard')) {
            return { icon: CheckCircle2, sub: "Quelques rafraîchissements" };
        } else if (lowerName.includes('rénover') || lowerName.includes('travaux')) {
            return { icon: Hammer, sub: "Rénovation nécessaire" };
        } else {
            return { icon: Construction, sub: "Gros travaux à prévoir" };
        }
    };

    // Helper to map property type name to icon and subtext
    const getPropertyTypeDetails = (name: string) => {
        const lowerName = name.toLowerCase();
        if (lowerName.includes('appartement')) {
            return { icon: Building2, sub: "Logement en copropriété" };
        } else if (lowerName.includes('maison')) {
            return { icon: Home, sub: "Maison individuelle" };
        } else if (lowerName.includes('terrain')) {
            return { icon: MapPin, sub: "Terrain à bâtir" };
        } else {
            return { icon: Warehouse, sub: "Local, parking, etc." };
        }
    };

    // Render functions for steps
    const renderStep1_Type = () => {
        // Use fetched options or fallback
        const optionsToRender = propertyTypeOptions.length > 0
            ? propertyTypeOptions
            : [
                { id: "appartement", name: "Appartement" },
                { id: "maison", name: "Maison" },
                { id: "terrain", name: "Terrain" },
                { id: "autre", name: "Autre" },
            ];

        return (
            <div className="space-y-6">
                <h3 className="text-xl font-semibold text-center text-blue-dark">
                    Quel type de bien souhaitez-vous estimer ?
                </h3>
                {loadingOptions ? (
                    <div className="flex justify-center py-8">
                        <Loader2 className="w-8 h-8 animate-spin text-brand-green" />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {optionsToRender.map((item) => {
                            const details = getPropertyTypeDetails(item.name);
                            const Icon = details.icon;

                            return (
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
                                        <Icon className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <span className="block font-semibold text-gray-900">{item.name}</span>
                                        <span className="text-sm text-gray-500">{details.sub}</span>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                )}
            </div>
        );
    };

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

    const renderStep6_Condition = () => {
        // Use fetched options or fallback
        const optionsToRender = conditionOptions.length > 0
            ? conditionOptions
            : [
                { id: "neuf", name: "Neuf / Refait à neuf" },
                { id: "bon-etat", name: "Bon état" },
                { id: "rafraichissement", name: "À rafraîchir" },
                { id: "renovation", name: "À rénover" },
            ];

        return (
            <div className="space-y-6">
                <h3 className="text-xl font-semibold text-center text-blue-dark">
                    Quel est l'état du bien ?
                </h3>
                {loadingOptions ? (
                    <div className="flex justify-center py-8">
                        <Loader2 className="w-8 h-8 animate-spin text-brand-green" />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {optionsToRender.map((item) => {
                            const details = getConditionDetails(item.name);
                            const Icon = details.icon;

                            return (
                                <button
                                    key={item.id}
                                    onClick={() => {
                                        updateFormData("condition", item.id);
                                        handleNext();
                                    }}
                                    className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all hover:border-brand-green hover:bg-brand-green/5 text-left group ${formData.condition === item.id ? "border-brand-green bg-brand-green/10" : "border-gray-100"}`}
                                >
                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${formData.condition === item.id ? "bg-brand-green text-white" : "bg-gray-100 text-gray-500 group-hover:bg-brand-green group-hover:text-white"}`}>
                                        <Icon className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <span className="block font-semibold text-gray-900">{item.name}</span>
                                        <span className="text-sm text-gray-500">{details.sub}</span>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                )}
            </div>
        );
    };

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

    const renderStep8_Exterior = () => {
        const handleExteriorToggle = (id: string) => {
            const currentSelection = formData.exterior || [];

            // Si "Pas d'extérieur" est sélectionné (ou équivalent), on le désélectionne et on le remplace par le nouveau choix
            // Note: We need to identify the "no exterior" option dynamically or stick to a convention.
            // For now, let's assume if the label contains "Pas d'extérieur" or similar, it's exclusive.
            const isNoneOption = id.toLowerCase().includes("pas d'extérieur") || id.toLowerCase().includes("aucun");

            if (isNoneOption) {
                // If selecting "None", clear others
                updateFormData("exterior", [id]);
            } else {
                // Check if "None" was previously selected
                const hadNone = currentSelection.some(item => item.toLowerCase().includes("pas d'extérieur") || item.toLowerCase().includes("aucun"));

                if (hadNone) {
                    // Replace "None" with new selection
                    updateFormData("exterior", [id]);
                } else if (currentSelection.includes(id as Exterior)) {
                    // Deselect
                    const newSelection = currentSelection.filter((item) => item !== id);
                    updateFormData("exterior", newSelection.length > 0 ? newSelection : null);
                } else if (currentSelection.length < 3) {
                    // Add selection
                    updateFormData("exterior", [...currentSelection, id as Exterior]);
                }
            }
        };

        const isSelected = (id: string) => {
            return formData.exterior?.includes(id as Exterior) || false;
        };

        const canSelect = (id: string) => {
            const currentSelection = formData.exterior || [];
            const isNoneOption = id.toLowerCase().includes("pas d'extérieur") || id.toLowerCase().includes("aucun");
            const hasNone = currentSelection.some(item => item.toLowerCase().includes("pas d'extérieur") || item.toLowerCase().includes("aucun"));

            if (isNoneOption) {
                return true; // Can always select "None" (it will clear others)
            }

            if (hasNone) {
                return true; // Can always select something else (it will clear "None")
            }

            return isSelected(id) || currentSelection.length < 3;
        };

        // Use fetched options or fallback
        const optionsToRender = exteriorOptions.length > 0
            ? exteriorOptions
            : [
                { id: "Balcon", name: "Balcon" },
                { id: "Terrasse", name: "Terrasse" },
                { id: "Jardin", name: "Jardin" },
                { id: "Pas d'extérieur", name: "Pas d'extérieur" },
            ];

        return (
            <div className="space-y-6">
                <h3 className="text-xl font-semibold text-center text-blue-dark">
                    Le bien dispose-t-il d'un extérieur ?
                </h3>
                {loadingOptions ? (
                    <div className="flex justify-center py-8">
                        <Loader2 className="w-8 h-8 animate-spin text-brand-green" />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-3">
                        {optionsToRender.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => handleExteriorToggle(item.id)}
                                disabled={!canSelect(item.id)}
                                className={`p-4 rounded-xl border-2 transition-all hover:border-brand-green hover:bg-brand-green/5 text-center relative ${isSelected(item.id)
                                    ? "border-brand-green bg-brand-green/10"
                                    : "border-gray-100"
                                    } ${!canSelect(item.id) ? "opacity-50 cursor-not-allowed" : ""}`}
                            >
                                <span className="block font-semibold text-gray-900 text-lg">{item.name}</span>
                                {isSelected(item.id) && (
                                    <Check className="w-5 h-5 text-brand-green absolute top-4 right-4" />
                                )}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        );
    };

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

    // Helper to map owner status to icon and subtext
    const getOwnerDetails = (name: string) => {
        const lowerName = name.toLowerCase();
        if (lowerName.includes('oui') || lowerName.includes('propriétaire')) {
            return { label: "Oui", sub: "Je suis propriétaire" };
        } else {
            return { label: "Non", sub: "Je suis locataire / Autre" };
        }
    };

    const renderStep10_Ownership = () => {
        // Use fetched options or fallback
        const optionsToRender = ownerOptions.length > 0
            ? ownerOptions
            : [
                { id: "proprietaire", name: "Propriétaire" },
                { id: "locataire", name: "Locataire" },
            ];

        return (
            <div className="space-y-6">
                <h3 className="text-xl font-semibold text-center text-blue-dark">
                    Êtes-vous propriétaire du bien ?
                </h3>
                {loadingOptions ? (
                    <div className="flex justify-center py-8">
                        <Loader2 className="w-8 h-8 animate-spin text-brand-green" />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto">
                        {optionsToRender.map((item) => {
                            const details = getOwnerDetails(item.name);

                            return (
                                <button
                                    key={item.id}
                                    onClick={() => {
                                        updateFormData("isOwner", item.id);
                                        handleNext();
                                    }}
                                    className={`p-6 rounded-xl border-2 transition-all hover:border-brand-green hover:bg-brand-green/5 text-center ${formData.isOwner === item.id ? "border-brand-green bg-brand-green/10" : "border-gray-100"}`}
                                >
                                    <span className="block font-semibold text-gray-900 text-xl">{details.label}</span>
                                    <span className="text-sm text-gray-500">{details.sub}</span>
                                </button>
                            );
                        })}
                    </div>
                )}
            </div>
        );
    };

    // Helper to map timeline options to UI labels
    const getTimelineLabel = (name: string) => {
        const lowerName = name.toLowerCase();
        if (lowerName.includes('3 mois') && !lowerName.includes('6')) {
            return "De 3 Mois";
        } else if (lowerName.includes('3') && lowerName.includes('6')) {
            return "Entre 3 et 6 Mois";
        } else if (lowerName.includes('6') && lowerName.includes('12')) {
            return "Entre 6 et 12 Mois";
        } else if (lowerName.includes('12') && (lowerName.includes('plus') || lowerName.includes('>'))) {
            return "Plus de 12 Mois";
        } else if (lowerName.includes('curiosité') || lowerName.includes('curiosite')) {
            return "Juste Curiosité";
        } else {
            return name; // Fallback to the option name itself
        }
    };

    const renderStep11_Project = () => {
        // Use fetched options or fallback
        const optionsToRender = timelineOptions.length > 0
            ? timelineOptions
            : [
                { id: "3-mois", name: "De 3 Mois" },
                { id: "3-6-mois", name: "Entre 3 et 6 Mois" },
                { id: "6-12-mois", name: "Entre 6 et 12 Mois" },
                { id: "+12-mois", name: "Plus de 12 Mois" },
                { id: "curiosite", name: "Juste Curiosité" },
            ];

        return (
            <div className="space-y-6">
                <h3 className="text-xl font-semibold text-center text-blue-dark">
                    Avez-vous un projet de vente ?
                </h3>
                {loadingOptions ? (
                    <div className="flex justify-center py-8">
                        <Loader2 className="w-8 h-8 animate-spin text-brand-green" />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-3">
                        {optionsToRender.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => {
                                    updateFormData("projectTimeline", item.id);
                                    handleNext();
                                }}
                                className={`p-4 rounded-xl border-2 transition-all hover:border-brand-green hover:bg-brand-green/5 text-center ${formData.projectTimeline === item.id ? "border-brand-green bg-brand-green/10" : "border-gray-100 bg-white"}`}
                            >
                                <span className="block font-semibold text-gray-900 text-base">{getTimelineLabel(item.name)}</span>
                            </button>
                        ))}
                    </div>
                )}
            </div>
        );
    };



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

    // OTP API handlers
    const handleSendOtp = async () => {
        setSending(true);
        try {
            const [firstName, ...lastNameParts] = formData.contact.name.split(' ');
            const lastName = lastNameParts.join(' ');

            const response = await fetch('/api/send-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    phone: formData.contact.phone,
                    firstName: firstName || '',
                    lastName: lastName || '',
                    email: formData.contact.email,
                    estimationData: {
                        propertyType: formData.propertyType,
                        address: formData.address,
                        surface: formData.surface,
                        rooms: formData.rooms,
                        bedrooms: formData.bedrooms,
                        condition: formData.condition,
                        floor: formData.floor,
                        exterior: formData.exterior,
                        constructionYear: formData.constructionYear,
                        isOwner: formData.isOwner,
                        projectTimeline: formData.projectTimeline,
                    },
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                toast.error(data.error || 'Erreur lors de l\'envoi du code');
                return;
            }

            toast.success('Code envoyé par SMS !');
            setPhoneStep('otpInput');
            setResendCooldown(45);
        } catch (error) {
            console.error('Error sending OTP:', error);
            toast.error('Erreur de connexion. Veuillez réessayer.');
        } finally {
            setSending(false);
        }
    };

    const handleVerifyOtp = async () => {
        setVerifying(true);
        try {
            const response = await fetch('/api/verify-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    phone: formData.contact.phone,
                    code: otpCode,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                toast.error(data.error || 'Code incorrect');
                return;
            }

            toast.success('Téléphone vérifié avec succès !');
            setPhoneStep('verified');

            // Auto-advance after short delay
            setTimeout(() => {
                handleFormSubmit();
            }, 1500);
        } catch (error) {
            console.error('Error verifying OTP:', error);
            toast.error('Erreur de connexion. Veuillez réessayer.');
        } finally {
            setVerifying(false);
        }
    };

    const handleFormSubmit = () => {
        console.log('Form submitted:', formData);
        setOpen(false);
        // Reset after delay
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
            setPhoneStep("phoneInput");
            setOtpCode("");
        }, 500);
    };

    const renderStep13_Phone = () => (
        <div className="space-y-6">
            <AnimatePresence mode="wait">
                {phoneStep === "phoneInput" && (
                    <motion.div
                        key="phoneInput"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-6"
                    >
                        <div>
                            <h3 className="text-xl font-semibold text-blue-dark">
                                Numéro de téléphone
                            </h3>
                            <p className="text-gray-600 text-sm mt-2">
                                Pour recevoir votre code de validation par SMS
                            </p>
                        </div>
                        <div className="space-y-3">
                            <Input
                                type="tel"
                                placeholder="06 12 34 56 78"
                                value={formData.contact.phone}
                                onChange={(e) => updateContact("phone", e.target.value)}
                                className="h-14 text-lg"
                                autoFocus
                                disabled={sending}
                            />
                            <p className="text-xs text-gray-500">
                                Format accepté : 0612345678 ou +33612345678
                            </p>
                        </div>
                        <Button
                            onClick={handleSendOtp}
                            disabled={formData.contact.phone.length < 10 || sending}
                            className="w-full h-12 bg-brand-green hover:bg-brand-green/90 text-white"
                        >
                            {sending ? (
                                <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    Envoi en cours...
                                </>
                            ) : (
                                'Recevoir un code par SMS'
                            )}
                        </Button>
                    </motion.div>
                )}

                {phoneStep === "otpInput" && (
                    <motion.div
                        key="otpInput"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-6"
                    >
                        <div>
                            <h3 className="text-xl font-semibold text-blue-dark">
                                Code de vérification
                            </h3>
                            <p className="text-gray-600 text-sm mt-2">
                                Entrez le code à 6 chiffres envoyé au <strong>{formData.contact.phone}</strong>
                            </p>
                        </div>
                        <div className="space-y-3">
                            <Input
                                type="text"
                                placeholder="000000"
                                value={otpCode}
                                onChange={(e) => {
                                    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                                    setOtpCode(value);
                                }}
                                className="h-14 text-2xl text-center tracking-widest"
                                autoFocus
                                disabled={verifying}
                                maxLength={6}
                            />
                        </div>
                        <Button
                            onClick={handleVerifyOtp}
                            disabled={otpCode.length !== 6 || verifying}
                            className="w-full h-12 bg-brand-green hover:bg-brand-green/90 text-white"
                        >
                            {verifying ? (
                                <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    Vérification...
                                </>
                            ) : (
                                'Valider le code'
                            )}
                        </Button>
                        <div className="text-center">
                            {resendCooldown > 0 ? (
                                <p className="text-sm text-gray-500">
                                    Renvoyer le code dans {resendCooldown}s
                                </p>
                            ) : (
                                <button
                                    onClick={() => {
                                        setPhoneStep('phoneInput');
                                        setOtpCode('');
                                    }}
                                    className="text-sm text-brand-green hover:underline"
                                >
                                    Renvoyer le code
                                </button>
                            )}
                        </div>
                    </motion.div>
                )}

                {phoneStep === "verified" && (
                    <motion.div
                        key="verified"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4 }}
                        className="space-y-6 flex flex-col items-center justify-center py-8"
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                        >
                            <CheckCircle2 className="w-20 h-20 text-brand-green" />
                        </motion.div>
                        <div className="text-center">
                            <h3 className="text-2xl font-semibold text-blue-dark">
                                Téléphone vérifié !
                            </h3>
                            <p className="text-gray-600 mt-2">
                                Votre demande d'estimation a été envoyée.
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
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
                        {step > 1 && step !== TOTAL_STEPS ? (
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
                        {step !== TOTAL_STEPS && (
                            <Button
                                onClick={handleNext}
                                className="bg-brand-green hover:bg-brand-green/90 text-white px-8 py-2 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={!isStepValid()}
                            >
                                Suivant
                            </Button>
                        )}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
