import { useState } from "react";

interface AddressSuggestion {
    label: string;
    score: number;
    id: string;
    type: string;
    name: string;
    postcode: string;
    citycode: string;
    city: string;
    context: string;
    importance: number;
    street: string;
}

export function useAddressAutocomplete(initialAddress: string = "") {
    const [address, setAddress] = useState(initialAddress);
    const [city, setCity] = useState("");
    const [suggestions, setSuggestions] = useState<AddressSuggestion[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    const fetchAddressSuggestions = async (query: string) => {
        if (query.length < 3) {
            setSuggestions([]);
            return;
        }

        try {
            const response = await fetch(`https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(query)}&limit=5`);
            const data = await response.json();
            setSuggestions(data.features.map((f: any) => ({
                ...f.properties,
                id: f.properties.id || Math.random().toString()
            })));
            setShowSuggestions(true);
        } catch (error) {
            console.error("Error fetching address suggestions:", error);
            setSuggestions([]);
        }
    };

    const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setAddress(value);
        setCity("");
        fetchAddressSuggestions(value);
    };

    const handleSelectAddress = (suggestion: AddressSuggestion) => {
        setAddress(suggestion.label);
        setCity(suggestion.city || "");
        setSuggestions([]);
        setShowSuggestions(false);
    };

    return {
        address,
        setAddress,
        city,
        setCity,
        suggestions,
        showSuggestions,
        setShowSuggestions,
        handleAddressChange,
        handleSelectAddress,
    };
}
