import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import { Toaster } from "sonner";
import Script from "next/script";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const lexend = Lexend({
  subsets: ["latin"],
  variable: "--font-lexend",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Agence immobilière Sucy-en-Brie Val-de-Marne | Laforêt Sucy-en-Brie ⇔ Laforêt Immobilier",
  description:
    "L'agence immobilière Laforêt Sucy-en-Brie vous accompagne pour trouver le bien immobilier en Achat, Vente, Location sur Sucy-en-Brie. Estimation gratuite ✅",
  authors: [{ name: "Expertise Immobilier Premium" }],
  openGraph: {
    title: "Estimation Immobilière Gratuite en 2 minutes",
    description:
      "Recevez une estimation précise et fiable de votre maison ou appartement",
    type: "website",
    images: [
      "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/d9aeeb05-7cd8-48b5-97f9-8a3bfeb56a6d/id-preview-faf166be--f70e9dfb-dd13-44d0-ae5a-2b4d2ccbd78f.lovable.app-1757641196414.png",
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@lovable_dev",
    images: [
      "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/d9aeeb05-7cd8-48b5-97f9-8a3bfeb56a6d/id-preview-faf166be--f70e9dfb-dd13-44d0-ae5a-2b4d2ccbd78f.lovable.app-1757641196414.png",
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        {/* Google Tag Manager */}
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-PJ3RJKHC');`}
        </Script>
        <Script
          src="https://monmeilleurbien.lovable.app/~flock.js"
          data-proxy-url="https://monmeilleurbien.lovable.app/~api/analytics"
          strategy="lazyOnload"
        />
      </head>
      <body className={`${lexend.variable} font-sans antialiased`}>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-PJ3RJKHC"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        <div className="min-h-screen bg-white flex flex-col font-inter">
          <Header />
          {children}
          <Footer />

          {/* Floating Phone Button */}
          {/* <div className="fixed bottom-6 right-6 z-40">
        <button className="gap-2 whitespace-nowrap text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary hover:bg-primary/90 px-4 py-2 bg-gradient-to-r from-brand-blue to-brand-green hover:from-brand-blue/90 hover:to-brand-green/90 text-white shadow-lg rounded-full w-14 h-14 flex items-center justify-center transition-all duration-300 hover:scale-110">
          <div className="relative">
            <Phone className="w-6 h-6" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-brand-green rounded-full animate-pulse"></div>
          </div>
        </button>
      </div> */}
        </div>
        <Toaster />
      </body>
    </html>
  );
}
