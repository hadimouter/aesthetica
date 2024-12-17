"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigation } from "@/hooks/useNavigation";
import { cn } from "@/lib/utils";
import { ConsultationModal } from "@/components/modals/ConsultationModal";
import { useRouter } from "next/navigation";

const navItems = [
  { id: "accueil", label: "Accueil" },
  { id: "services", label: "Soins" },
  { id: "transformations", label: "Transformations" },
  { id: "temoignages", label: "Témoignages" },
  { id: "faq", label: "Questions" },
  { id: "contact", label: "Contact" }
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { activeSection, scrollToSection } = useNavigation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const handleConsultation = () => {
    router.push('/auth/login');
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fonction améliorée pour la gestion du scroll sur mobile
  const handleNavClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      // Fermer le menu mobile d'abord
      setIsOpen(false);
      
      // Petit délai pour laisser le menu se fermer
      setTimeout(() => {
        const offset = 80; // Ajuster selon la hauteur de votre header
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }, 100);
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={cn(
        "fixed w-full z-50 transition-all duration-500",
        isScrolled
          ? "bg-white/95 backdrop-blur-lg border-b border-primary/5"
          : "bg-transparent"
      )}
      role="navigation"
      aria-label="Navigation principale"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-2xl font-light tracking-wider text-primary cursor-pointer"
            onClick={() => scrollToSection('accueil')}
          >
            AESTHETICA
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map(({ id, label }) => (
              <motion.button
                key={id}
                onClick={() => scrollToSection(id)}
                className={cn(
                  "text-sm font-light tracking-wide hover:text-primary transition-all relative py-2",
                  activeSection === id ? "text-primary" : "text-primary/60"
                )}
                whileHover={{ y: -1 }}
                whileTap={{ y: 0 }}
              >
                {label}
                {activeSection === id && (
                  <motion.div
                    layoutId="activeSection"
                    className="absolute bottom-0 left-0 right-0 h-px bg-primary/30"
                    transition={{ duration: 0.3 }}
                  />
                )}
              </motion.button>
            ))}
            <Button
              variant="default"
              className="bg-primary/90 hover:bg-primary text-white rounded-full px-6 text-sm font-light tracking-wide hover-glow"
              onClick={handleConsultation}
            >
              Mon Espace Santé
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-primary/80 hover:text-primary"
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/95 backdrop-blur-md border-t border-primary/5"
          >
            <div className="px-4 pt-2 pb-3 space-y-1">
              {navItems.map(({ id, label }) => (
                <motion.button
                  key={id}
                  onClick={() => handleNavClick(id)}
                  className={cn(
                    "block w-full text-left px-4 py-3 rounded-lg transition-all",
                    activeSection === id
                      ? "bg-primary/5 text-primary"
                      : "text-primary/60 hover:text-primary hover:bg-primary/5"
                  )}
                  whileTap={{ scale: 0.98 }}
                >
                  {label}
                </motion.button>
              ))}
              <Button
                className="w-full mt-4 bg-primary/90 hover:bg-primary text-white rounded-full font-light tracking-wide hover-glow"
                onClick={handleConsultation}  // Changé ici pour utiliser handleConsultation
              >
                Mon Espace Santé
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <ConsultationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </motion.nav>
  );
}