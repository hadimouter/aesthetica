"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

const contactInfo = [
  {
    icon: Phone,
    label: "Téléphone",
    value: "+33 1 23 45 67 89",
    subtext: "9h-19h, Lun-Ven",
  },
  {
    icon: Mail,
    label: "Email",
    value: "contact@aesthetica.fr",
    subtext: "Réponse sous 24h",
  },
  {
    icon: MapPin,
    label: "Adresse",
    value: "15 rue de la Paix, Paris",
    subtext: "Proche Opéra",
  },
  {
    icon: Clock,
    label: "Horaires",
    value: "Lun-Sam: 9h-19h",
    subtext: "Sur rendez-vous",
  },
];

export function Contact() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    object: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Une erreur est survenue.");
      }

      const data = await response.json();
      toast({
        title: "Demande envoyée avec succès",
        description: "Notre équipe vous contactera dans les 24h.",
      });
      setFormData({ name: "", email: "", phone: "", object: "", message: "" });
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-32">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-light text-primary mb-4">
            Commencez Votre Transformation
          </h2>
          <p className="text-primary/60 max-w-2xl mx-auto font-light">
            Prenez rendez-vous pour une consultation personnalisée dans notre clinique parisienne
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-16">
          <div className="lg:col-span-2 space-y-12">
            {contactInfo.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                    <item.icon className="w-5 h-5 text-primary/70" />
                  </div>
                  <div>
                    <div className="text-sm text-primary/60 font-light mb-1">
                      {item.label}
                    </div>
                    <div className="text-primary font-medium">{item.value}</div>
                    <div className="text-sm text-primary/60 font-light">
                      {item.subtext}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid sm:grid-cols-2 gap-6">
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Votre nom"
                  required
                  className="h-12 bg-primary/5 border-0 focus:ring-1 focus:ring-primary/20"
                />
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Votre email"
                  required
                  className="h-12 bg-primary/5 border-0 focus:ring-1 focus:ring-primary/20"
                />
              </div>

              <Input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Votre téléphone"
                required
                className="h-12 bg-primary/5 border-0 focus:ring-1 focus:ring-primary/20"
              />

              <Input
                type="text"
                name="object"
                value={formData.object}
                onChange={handleChange}
                placeholder="Sujet"
                required
                className="h-12 bg-primary/5 border-0 focus:ring-1 focus:ring-primary/20"
              />

              <Textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Votre message (facultatif)"
                className="min-h-[120px] bg-primary/5 border-0 focus:ring-1 focus:ring-primary/20 resize-none"
              />

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 bg-primary hover:bg-primary/90 text-white transition-colors"
              >
                {isSubmitting ? "Envoi en cours..." : "Demander une consultation"}
              </Button>

              <p className="text-xs text-center text-primary/40 font-light">
                En soumettant ce formulaire, vous acceptez notre politique de confidentialité
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}