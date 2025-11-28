import { EstimationModal } from "@/components/estimation/EstimationModal";
import Image from "next/image";
import Link from "next/link";

export function Header() {
    return (
        <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <Image
                            src="/logo.png"
                            alt="MonMeilleurBien.fr"
                            className="h-10"
                            width={100}
                            height={100}
                        />
                    </div>
                    <div className="flex items-center space-x-4">
                        <EstimationModal>
                            <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary hover:bg-primary/90 h-10 bg-gradient-to-r from-brand-blue to-brand-green hover:from-brand-blue/90 hover:to-brand-green/90 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-200 hover:scale-105">
                                Estimer mon bien
                            </button>
                        </EstimationModal>
                    </div>
                </div>
            </div>
        </header>
    );
}
