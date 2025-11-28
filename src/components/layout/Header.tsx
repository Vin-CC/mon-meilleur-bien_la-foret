import { EstimationModal } from "@/components/estimation/EstimationModal";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export function Header() {
    return (
        <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
            <div className="container mx-auto px-4 py-2">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <Link href="/">
                            <Image
                                src="/logo.png"
                                alt="MonMeilleurBien.fr"
                                className="h-14 w-auto"
                                width={180}
                                height={180}
                                priority
                            />
                        </Link>
                    </div>
                    <div className="flex items-center space-x-6">
                        <Link
                            href="/rendez-vous"
                            className="text-gray-600 hover:text-brand-blue font-medium transition-colors hidden md:block"
                        >
                            Prendre rendez-vous
                        </Link>
                        <EstimationModal>
                            <Button>
                                Estimer en ligne
                            </Button>
                        </EstimationModal>
                    </div>
                </div>
            </div>
        </header>
    );
}
