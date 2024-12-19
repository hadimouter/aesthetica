"use client";

import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { BeforeAfter } from "@/components/sections/BeforeAfter";
import { Testimonials } from "@/components/sections/Testimonials";
import { Contact } from "@/components/sections/Contact";
import { SocialProof } from "@/components/sections/SocialProof";
import { FAQ } from "@/components/sections/FAQ";
import Footer from "@/components/sections/Footer";
import { FounderNote } from "@/components/sections/FounderNote";
import { ToastProvider } from "@/components/ui/toast";
import ChatButton from "@/components/sections/ChatButton";

export default function Home() {
  return (
    <>
      <head>
        <title>Aesthetica - Votre Centre d&apos;Excellence en Chirurgie et Médecine Esthétique à Paris</title>
        <meta
          name="description"
          content="Découvrez Aesthetica, le centre de référence en chirurgie et médecine esthétique à Paris. Des soins sur mesure pour révéler votre beauté naturelle dans un cadre luxueux et professionnel."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
        <meta charSet="UTF-8" />
        <meta property="og:title" content="Aesthetica - Votre Centre d'Excellence en Chirurgie et Médecine Esthétique à Paris" />
        <meta
          property="og:description"
          content="Découvrez Aesthetica, le centre de référence en chirurgie et médecine esthétique à Paris. Des soins sur mesure pour révéler votre beauté naturelle dans un cadre luxueux et professionnel."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://votre-site-aesthetica.com" />
        <meta property="og:image" content="https://res.cloudinary.com/dkvzjzjox/image/upload/v1734430175/aesthetica-og-simple_wgj1km.svg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Aesthetica - Votre Centre d'Excellence en Chirurgie et Médecine Esthétique à Paris" />
        <meta
          name="twitter:description"
          content="Découvrez Aesthetica, le centre de référence en chirurgie et médecine esthétique à Paris. Des soins sur mesure pour révéler votre beauté naturelle dans un cadre luxueux et professionnel."
        />
        <meta name="twitter:image" content="https://votre-site-aesthetica.com/og-image.jpg" />
        <link rel="canonical" href="https://votre-site-aesthetica.com" />
        <link rel="icon" href="https://res.cloudinary.com/dkvzjzjox/image/upload/v1734430175/aesthetica-logo-compact_xeskeg.svg" />
      </head>
      <ToastProvider>
        <Navbar />
        <main className="overflow-hidden">
          <Hero />
          <SocialProof />
          <Services />
          <FounderNote />
          <BeforeAfter />
          <Testimonials />
          <FAQ />
          <Contact />
        </main>
        <ChatButton />
        <Footer />
      </ToastProvider>
    </>
  );
}

