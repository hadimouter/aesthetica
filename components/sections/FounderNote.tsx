"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Quote } from "lucide-react";
import Image from "next/image";
import { ConsultationModal } from "@/components/modals/ConsultationModal";

export function FounderNote() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleConsultation = () => {
    setIsModalOpen(true);
  };

  const defaultMotionProps = {
    initial: { opacity: 0, x: 20 },
    whileInView: { opacity: 1, x: 0 },
    viewport: { once: true },
  };

  return (
    <section className="py-32 bg-surface">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            {...defaultMotionProps}
            initial={{ opacity: 0, x: -20 }}
            className="relative aspect-[3/4] overflow-hidden hidden sm:block"
          >
            <div className="absolute inset-0 border border-accent/10" />
            <Image
              src="/images/fondn.jpg"
              alt="Dr. Sophie Martin - Fondatrice"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              style={{ objectPosition: "center 0%" }}
            />
          </motion.div>

          <motion.div {...defaultMotionProps} className="relative">
            <Quote className="absolute -top-10 left-0 w-20 h-20 text-primary/5" />
            <h2 className="text-3xl font-light text-foreground mb-8">
              Message de la Fondatrice
            </h2>
            <div className="space-y-6 text-muted-foreground font-light leading-relaxed">
              <p>
                &quot;L&apos;art de la chirurgie esthétique repose sur un équilibre subtil entre expertise médicale et sensibilité artistique. Depuis plus de quinze ans, je m&apos;attache à perfectionner cette alliance pour offrir des résultats d&apos;exception.&quot;
              </p>
              <p>
                &quot;Notre approche unique combine l&apos;excellence des techniques chirurgicales les plus avancées avec une compréhension profonde des aspirations de chaque patient. Nous ne créons pas simplement de la beauté, nous révélons celle qui existe déjà.&quot;
              </p>
              <p>
                &quot;Dans notre établissement, chaque détail est pensé pour vous offrir une expérience d&apos;exception, de la première consultation jusqu&apos;au suivi post-opératoire. Votre confiance est notre plus précieuse récompense.&quot;
              </p>
            </div>

            <div className="mt-12 space-y-6">
              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16 border border-accent/10">
                  <Image
                    src="/images/fondn.jpg"
                    alt="Dr. Sophie Martin"
                    fill
                    className="object-cover"
                    style={{ objectPosition: "center 0%" }}
                  />
                </div>
                <div>
                  <h3 className="text-foreground font-light">Dr. Sophie Martin</h3>
                  <p className="text-sm text-muted-foreground">Chirurgienne Esthétique</p>
                  <p className="text-sm text-muted-foreground">Fondatrice</p>
                </div>
              </div>

              <Button
                size="lg"
                className="bg-primary text-white hover:bg-primary/90 px-8 h-12 rounded-none group"
                onClick={handleConsultation}
              >
                Prendre rendez-vous
              </Button>
            </div>
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
