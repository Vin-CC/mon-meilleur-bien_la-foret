import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import Script from "next/script";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Estimation Immobilière Gratuite | Expertise Immobilier Premium",
  description:
    "Estimez gratuitement votre bien immobilier en 2 minutes. Expertise fiable et précise par nos experts certifiés.",
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
      <body className={`${inter.variable} font-sans antialiased`}>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-PJ3RJKHC"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
