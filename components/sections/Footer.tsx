"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Instagram, Facebook, Twitter, Linkedin, ArrowUp } from "lucide-react";
import Link from "next/link";

const footerLinks = {
  services: [
    { label: "Chirurgie du visage", href: "#" },
    { label: "Médecine esthétique", href: "#" },
    { label: "Chirurgie du corps", href: "#" },
    { label: "Soins sur mesure", href: "#" }
  ],
  informations: [
    { label: "À propos", href: "#" },
    { label: "Notre équipe", href: "#" },
    { label: "Blog", href: "#" }, 
    { label: "FAQ", href: "#" }
  ],
  legal: [
    { label: "Mentions légales", href: "#" },
    { label: "Politique de confidentialité", href: "#" },
    { label: "CGV", href: "#" }
  ]
};

const socialLinks = [
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Linkedin, href: "#", label: "LinkedIn" }
];

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#FAF9F7] pt-20 pb-12">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-12 border-b border-primary/10">
          <div className="lg:col-span-1">
            <h3 className="text-2xl font-light text-primary mb-4">AESTHETICA</h3>
            <p className="text-primary/60 font-light mb-6 max-w-sm">
              Votre centre d'excellence en chirurgie et médecine esthétique à Paris.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center hover:bg-primary/10 transition-colors"
                >
                  <social.icon className="w-5 h-5 text-primary/70" />
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-primary font-medium mb-4">Nos services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <Link 
                    href={link.href} 
                    className="text-primary/60 hover:text-primary font-light text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-primary font-medium mb-4">Informations</h4>
            <ul className="space-y-3">
              {footerLinks.informations.map((link) => (
                <li key={link.label}>
                  <Link 
                    href={link.href} 
                    className="text-primary/60 hover:text-primary font-light text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-primary font-medium mb-4">Contact</h4>
            <div className="space-y-3 text-sm font-light">
              <p className="text-primary/60">15 rue de la Paix</p>
              <p className="text-primary/60">75002 Paris, France</p>
              <p className="text-primary/60">+33 1 23 45 67 89</p>
              <p className="text-primary/60">contact@aesthetica.fr</p>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
            <span className="text-primary/40 text-sm font-light">
              © 2024 Aesthetica. Tous droits réservés.
            </span>
            <div className="flex space-x-8">
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-primary/40 hover:text-primary/60 text-sm font-light transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <Button
            size="icon"
            variant="ghost"
            onClick={scrollToTop}
            className="w-10 h-10 rounded-xl bg-primary/5 hover:bg-primary/10"
          >
            <ArrowUp className="w-5 h-5 text-primary/70" />
          </Button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;