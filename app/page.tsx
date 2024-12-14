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

export default function Home() {
  return (
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
      <Footer />
    </ToastProvider>
  );
}

