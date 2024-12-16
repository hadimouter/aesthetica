"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Gem, Star, Crown, Sparkles, Clock, Badge } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ConsultationModal } from "@/components/modals/ConsultationModal";
const services = [
  {
    icon: Gem,
    title: "Chirurgie du Visage",
    description: "Une approche raffinée pour sublimer vos traits naturels avec précision.",
    procedures: [
      { name: "Lifting cervico-facial", duration: "2-3h", prestige: "Premium" },
      { name: "Rhinoplastie", duration: "1-2h", prestige: "Signature" },
      { name: "Blépharoplastie", duration: "1h", prestige: "Classic" },
    ],
  },
  {
    icon: Star,
    title: "Médecine Esthétique",
    description: "Des soins non-chirurgicaux innovants pour une beauté préservée.",
    procedures: [
      { name: "Injections de luxe", duration: "30min", prestige: "Premium" },
      { name: "Skincare avancé", duration: "45min", prestige: "Signature" },
      { name: "Rajeunissement", duration: "1h", prestige: "Premium" },
    ],
  },
  {
    icon: Crown,
    title: "Chirurgie du Corps",
    description: "Une transformation harmonieuse pour révéler votre silhouette idéale.",
    procedures: [
      { name: "Liposculpture", duration: "2-3h", prestige: "Premium" },
      { name: "Body contouring", duration: "3h", prestige: "Signature" },
      { name: "Lifting corporel", duration: "4h", prestige: "Premium" },
    ],
  },
  {
    icon: Sparkles,
    title: "Soins Exclusifs",
    description: "Des protocoles sur-mesure associant différentes techniques d'exception.",
    procedures: [
      { name: "Luxury full face", duration: "2h", prestige: "Signature" },
      { name: "Body perfection", duration: "3h", prestige: "Premium" },
      { name: "Total harmony", duration: "4h", prestige: "Signature" },
    ],
  },
];

export function Services() {

  const [isModalOpen, setIsModalOpen] = useState(false);

 const handleConsultation = () => {
    setIsModalOpen(true);
  };

  return (
    <section id="services" className="py-32 bg-surface relative">
      <div className="absolute inset-0" style={{ 
        backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(168, 162, 158, 0.1) 1px, transparent 0)',
        backgroundSize: '40px 40px'
      }} />

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-light text-primary mb-4">Nos Prestations</h2>
          <p className="text-primary/60 max-w-2xl mx-auto font-light">
            Une gamme exclusive de soins d&apos;exception, personnalisés selon vos attentes.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 mb-24">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="p-8 border border-accent/10 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-full bg-primary/5">
                    <service.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-medium text-foreground">{service.title}</h3>
                </div>

                <p className="text-muted-foreground mb-8 font-light">{service.description}</p>

                <div className="space-y-4">
                  {service.procedures.map((procedure, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-4 bg-primary/5 rounded-md group-hover:bg-primary/10 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-2 h-2 rounded-full bg-primary/40" />
                        <span className="text-foreground font-medium">{procedure.name}</span>
                      </div>
                      <div className="flex items-center gap-6 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {procedure.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          <Badge className="w-4 h-4" />
                          {procedure.prestige}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Button
            size="lg"
            className="bg-primary text-white hover:bg-primary/90 px-8 h-12 rounded-none group"
            onClick={handleConsultation}
          >
            Réserver une consultation
          </Button>
        </motion.div>
      </div>
      <ConsultationModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </section>
  );
}
