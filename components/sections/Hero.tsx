"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronRight, Star } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { ConsultationModal } from "@/components/modals/ConsultationModal";

export function Hero() {
const [isModalOpen, setIsModalOpen] = useState(false);

 const handleConsultation = () => {
    setIsModalOpen(true);
  };

  return (
    <section id="accueil" className="relative min-h-[90vh] flex items-center bg-[#FAF9F7]">
      {/* Animated Background Pattern */}
      <motion.div 
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 1.5 }}
      >
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at center, rgba(44, 38, 30, 0.08) 1px, transparent 1px)`,
          backgroundSize: "48px 48px"
        }} />
      </motion.div>

      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10"
          >
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-2 mb-6"
            >
              <Star className="w-4 h-4 text-primary/40" />
              <span className="text-primary/60 text-sm tracking-[0.2em] uppercase">
                Excellence & Raffinement
              </span>
            </motion.div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-primary leading-[1.2] mb-6">
              Révélez Votre
              <span className="block font-normal text-gradient mt-2">
                Beauté Naturelle
              </span>
            </h1>

            <p className="text-muted-foreground text-lg max-w-xl mb-10 font-light leading-relaxed">
              Une approche exclusive de la chirurgie esthétique où expertise médicale et 
              élégance se rencontrent pour sublimer votre beauté authentique.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 mb-16">
              <Button
                size="lg"
                onClick={handleConsultation}
                className="bg-primary text-white hover:bg-primary/90 px-8 h-12 rounded-none group"
              >
                Consultation Privée
                <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary/20 text-primary hover:bg-primary/5 px-8 h-12 rounded-none"
                onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}
              >
                Découvrir nos Soins
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-8 border-t border-primary/10 pt-8">
              <div>
                <div className="text-2xl font-light text-primary mb-2">15+</div>
                <div className="text-sm text-muted-foreground">Années d'expertise</div>
              </div>
              <div>
                <div className="text-2xl font-light text-primary mb-2">5k+</div>
                <div className="text-sm text-muted-foreground">Patients satisfaits</div>
              </div>
              <div>
                <div className="text-2xl font-light text-primary mb-2">100%</div>
                <div className="text-sm text-muted-foreground">Confidentialité</div>
              </div>
            </div>
          </motion.div>

          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <div className="relative aspect-[80/100] overflow-hidden">
              <div className="absolute inset-0 border border-primary/10" />
              <Image
                src="/images/hero-image.jpg"
                alt="Excellence esthétique"
                width={1200}
                height={1500}
                className="object-cover"
                priority
                quality={90}
              />
              
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="absolute bottom-8 left-8 right-8 bg-white/80 backdrop-blur-sm p-6"
              >
                <p className="text-sm text-primary font-light leading-relaxed">
                  "L'art de la chirurgie esthétique réside dans la subtilité et l'harmonie des résultats."
                </p>
              </motion.div>
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-primary/5 rounded-none" />
            <div className="absolute -top-8 -left-8 w-32 h-32 bg-secondary/5 rounded-none" />
          </motion.div>
        </div>
      </div>
      <ConsultationModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </section>
  );
}