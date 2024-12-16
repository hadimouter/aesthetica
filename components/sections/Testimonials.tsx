"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";
import Image from "next/image";

const testimonials = [
  {
    name: "Sophie Laurent",
    age: "32 ans",
    role: "Rhinoplastie",
    content: "Une expérience exceptionnelle. L'équipe médicale m'a accompagnée tout au long du processus avec professionnalisme et bienveillance. Le résultat est exactement ce que j'espérais.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200&h=200",
    rating: 5,
    date: "il y a 2 mois"
  },
  {
    name: "Marie Dubois",
    age: "45 ans",
    role: "Lifting facial",
    content: "Le Dr et son équipe ont su me mettre en confiance dès la première consultation. Le suivi post-opératoire est remarquable. Je me sens rajeunie naturellement.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200&h=200",
    rating: 5,
    date: "il y a 3 mois"
  },
  {
    name: "Claire Martin",
    age: "28 ans",
    role: "Augmentation mammaire",
    content: "Un résultat harmonieux qui respecte parfaitement mes proportions. L'attention aux détails et le professionnalisme de l'équipe sont remarquables.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200&h=200",
    rating: 5,
    date: "il y a 1 mois"
  }
];

export function Testimonials() {
  return (
    <section id="temoignages" className="py-32 bg-surface">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-light text-foreground mb-4">
            Témoignages
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            L&apos;expression de la satisfaction de nos patients, notre plus belle récompense.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <Card className="p-8 border-accent/10 hover:border-accent/20 transition-colors">
                <Quote className="w-8 h-8 text-primary/10 mb-6" />

                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-primary/40 fill-primary/40" />
                  ))}
                </div>

                <p className="text-muted-foreground mb-6 font-light leading-relaxed">
                  &ldquo;{testimonial.content}&rdquo;
                </p>

                <div className="flex items-center gap-4">
                  <div className="relative w-12 h-12">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-full h-full object-cover rounded-full"
                      width={48}
                      height={48}
                    />
                  </div>
                  <div>
                    <div className="text-foreground font-light">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
