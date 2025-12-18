"use client";

import { EstimationModal } from "@/components/estimation/EstimationModal";
import { ArrowDown, ArrowRight, MapPin, ShieldCheck } from "lucide-react";
import Link from "next/link";

import { useState } from "react";
import { Button } from "../ui/button";
import { useAddressAutocomplete } from "@/hooks/useAddressAutocomplete";

export function Hero() {
    const {
        address,
        suggestions,
        showSuggestions,
        setShowSuggestions,
        handleAddressChange,
        handleSelectAddress,
    } = useAddressAutocomplete();

    return (
        <section className="relative bg-gradient-to-r from-brand-blue to-brand-dark text-white min-h-screen flex items-center overflow-hidden border-0">
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-0 right-0 w-2/3 h-full">
                    <div className="relative w-full h-full">
                        <div className="absolute inset-0 opacity-20">
                            <svg viewBox="0 0 800 600" className="w-full h-full">
                                <defs>
                                    <linearGradient id="flow1" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor="#18cd75"></stop>
                                        <stop offset="50%" stopColor="#022b60"></stop>
                                        <stop offset="100%" stopColor="#022b60"></stop>
                                    </linearGradient>
                                    <linearGradient id="flow2" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor="#18cd75"></stop>
                                        <stop offset="100%" stopColor="#18cd75"></stop>
                                    </linearGradient>
                                </defs>
                                <path
                                    d="M200,100 Q400,50 600,150 Q700,200 800,100 L800,300 Q600,250 400,350 Q200,300 0,400 Z"
                                    fill="url(#flow1)"
                                ></path>
                                <path
                                    d="M100,200 Q300,150 500,250 Q700,300 800,200 L800,450 Q500,400 300,500 Q100,450 0,550 Z"
                                    fill="url(#flow2)"
                                ></path>
                            </svg>
                        </div>
                        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-gradient-to-br from-brand-green/30 to-brand-blue/30 rounded-full blur-3xl animate-pulse"></div>
                        <div
                            className="absolute bottom-1/3 right-1/3 w-48 h-48 bg-gradient-to-br from-white/20 to-brand-green/20 rounded-full blur-2xl animate-pulse"
                            style={{ animationDelay: "1s" }}
                        ></div>
                    </div>
                </div>
            </div>
            <div className="relative z-10 container mx-auto px-4 py-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-8">
                        <div className="space-y-6">
                            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                                Estimez la valeur de votre bien{" "}
                                <span className="text-brand-green">en 2 minutes</span>
                            </h1>
                            <p className="text-xl text-blue-100 leading-relaxed max-w-2xl">
                                Recevez une estimation fiable en ligne basée sur les ventes
                                réelles dans votre quartier. Notre technologie analyse plus de
                                1000 critères pour une évaluation précise.
                            </p>
                        </div>
                        <div className="space-y-6">
                            <div className="bg-white p-2 rounded-xl shadow-lg max-w-xl flex flex-col md:flex-row gap-2">
                                <div className="flex-1 relative flex items-center">
                                    <MapPin className="absolute left-3 text-gray-400 w-5 h-5" />
                                    <input
                                        type="text"
                                        placeholder="Entrez votre adresse..."
                                        className="w-full pl-10 pr-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none rounded-lg"
                                        value={address}
                                        name="realEstateAddress"
                                        onChange={handleAddressChange}
                                        onBlur={() => {
                                            setTimeout(() => setShowSuggestions(false), 200);
                                        }}
                                        onFocus={() => {
                                            if (address.length >= 3) {
                                                setShowSuggestions(true);
                                            }
                                        }}
                                    />
                                    {showSuggestions && suggestions.length > 0 && (
                                        <div className="absolute z-10 w-full mt-1 top-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto">
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
                                <EstimationModal defaultAddress={address}>
                                    <Button className="h-12 md:h-auto px-6 py-3 text-lg w-full md:w-auto">
                                        Estimer <ArrowRight className="w-5 h-5" />
                                    </Button>
                                </EstimationModal>
                            </div>
                            <div className="flex flex-wrap gap-6 text-sm">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-brand-green rounded-full"></div>
                                    <span className="text-blue-100">100% Gratuit</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-brand-green rounded-full"></div>
                                    <span className="text-blue-100">2 minutes chrono</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-brand-green rounded-full"></div>
                                    <span className="text-blue-100">Données fiables</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="relative lg:block hidden">
                        <div className="relative w-full h-96 rounded-2xl overflow-hidden bg-white/10 p-4 animate-fade-in">
                            <img
                                src="/images/hero-image.png"
                                alt="Estimation immobilière avec carte interactive"
                                className="w-full h-full object-contain rounded-xl animate-float"
                                loading="eager"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
