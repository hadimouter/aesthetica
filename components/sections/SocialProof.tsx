"use client";

import { motion } from "framer-motion";
import { Award, Shield, Users, Medal, BadgeCheck, Star } from "lucide-react";

const stats = [
  {
    icon: Award,
    value: "12,000+",
    label: "Clients Satisfaits",
    description: "Une confiance renouvelée",
  },
  {
    icon: Medal,
    value: "15+",
    label: "Années d'Excellence",
    description: "Expertise reconnue",
  },
  {
    icon: Shield,
    value: "100%",
    label: "Taux de Satisfaction",
    description: "Service d'exception",
  },
  {
    icon: Star,
    value: "5,000+",
    label: "Procédures",
    description: "Interventions réussies",
  },
];

const certifications = [
  {
    icon: BadgeCheck,
    name: "Certification Elite",
    description: "Excellence internationale",
  },
  {
    icon: Shield,
    name: "ISO 9001:2015",
    description: "Standards de qualité",
  },
  {
    icon: Award,
    name: "SOFCEP",
    description: "Expertise spécialisée",
  },
];

export function SocialProof() {
  return (
    <section className="relative py-32 bg-surface">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle at 2px 2px, rgba(168, 162, 158, 0.1) 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête de section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-light text-primary mb-4">
            L&apos;Excellence au Service de Votre Beauté
          </h2>
          <p className="text-primary/60 max-w-2xl mx-auto font-light">
            Notre expertise et nos accréditations témoignent de notre engagement
            envers l&apos;excellence et votre satisfaction.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-24"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="p-6">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/5 mb-6">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="text-3xl font-light text-foreground mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-foreground mb-1">{stat.label}</div>
                <div className="text-sm text-muted-foreground">
                  {stat.description}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h3 className="text-2xl font-light text-foreground mb-12">
            Accréditations & Certifications
          </h3>
          <div className="flex flex-wrap justify-center gap-12">
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col items-center"
              >
                <div className="w-16 h-16 flex items-center justify-center bg-primary/5 mb-4">
                  <cert.icon className="w-8 h-8 text-primary" />
                </div>
                <div className="text-foreground font-light">{cert.name}</div>
                <div className="text-sm text-muted-foreground">
                  {cert.description}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
