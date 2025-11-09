import { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AURÉA Communication - Agence Digitale AI pour Marques de Luxe",
  description: "Transformation digitale complète avec IA et automatisation marketing. Création de sites web premium, stratégie digitale pour hôtels et marques de prestige.",
  
  keywords: [
    "agence digitale AI",
    "automatisation marketing",
    "site web luxury",
    "stratégie digitale prestige",
    "IA marketing"
  ],

  metadataBase: new URL("https://aurea-site.vercel.app"),
  
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://aurea-site.vercel.app",
    siteName: "AURÉA Communication",
    title: "AURÉA Communication - Agence Digitale AI Premium",
    description: "Transformation digitale et automatisation IA pour marques de luxe",
    images: [
      {
        url: "https://www.dropbox.com/scl/fi/1nj46m9ysa734eo9l04ds/grok-video-c31c84b2-325e-421e-aea1-710a9221f678.mp4?dl=1",
        width: 1200,
        height: 630,
        alt: "AURÉA Communication - Agence Digitale",
        type: "image/jpeg",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "AURÉA Communication - Transformation Digitale AI",
    description: "Agence spécialisée en automatisation et intelligence artificielle pour marques de prestige",
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // JSON-LD Schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "AURÉA Communication",
    "url": "https://aurea-site.vercel.app",
    "logo": "https://www.dropbox.com/scl/fi/ele5d4wemwffg6pnfuul9/unnamed-9.jpg?dl=1",
    "description": "Agence digitale spécialisée en IA et automatisation pour marques de luxe",
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Sales",
      "email": "contact@aurea-communication.fr"
    },
  };

  return (
    <html lang="fr">
      <head>
        {/* Google Analytics 4 */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
        />
        <Script
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-XXXXXXXXXX');
            `,
          }}
        />

        {/* JSON-LD Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />

        {/* Canonical */}
        <link rel="canonical" href="https://aurea-site.vercel.app" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
