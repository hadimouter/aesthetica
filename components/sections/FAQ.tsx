// components/sections/FAQ.tsx
"use client";

import { motion } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const faqs = [
 {
   question: "Comment se déroule la première consultation ?",
   answer: "La consultation initiale est un moment privilégié d'échange. Durant environ une heure, nous discutons de vos souhaits, analysons vos besoins et établissons ensemble un plan de traitement personnalisé. Une simulation virtuelle peut être réalisée pour certaines interventions."
 },
 {
   question: "Quels sont les délais de récupération ?",
   answer: "Les délais varient selon l'intervention : de quelques jours pour les procédures mini-invasives à 2-3 semaines pour les interventions plus importantes. Un protocole post-opératoire détaillé vous est remis, incluant soins spécifiques et recommandations pour une récupération optimale."
 },
 {
   question: "Comment est assurée la confidentialité ?",
   answer: "La discrétion et la confidentialité sont au cœur de nos engagements. Nous disposons d'une entrée privée et d'espaces dédiés. Vos données sont strictement protégées, et notre équipe est formée aux plus hauts standards de confidentialité."
 },
 {
   question: "Quelles sont vos méthodes de paiement ?",
   answer: "Nous proposons différentes options de paiement adaptées à vos besoins. Un devis détaillé vous est remis lors de la consultation. Nous pouvons également vous accompagner dans la mise en place d'un financement personnalisé si nécessaire."
 }
];

export function FAQ() {
 const [openIndex, setOpenIndex] = useState<number | null>(null);

 return (
   <section id="faq" className="py-32 bg-surface">
     <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8">
       <motion.div
         initial={{ opacity: 0, y: 20 }}
         whileInView={{ opacity: 1, y: 0 }}
         viewport={{ once: true }}
         className="text-center mb-16"
       >
         <h2 className="text-3xl font-light text-foreground mb-4">
           Questions Fréquentes
         </h2>
         <p className="text-muted-foreground max-w-2xl mx-auto">
           Des réponses précises et transparentes à vos interrogations.
         </p>
       </motion.div>

       <div className="space-y-4">
         {faqs.map((faq, index) => (
           <motion.div
             key={index}
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: index * 0.1 }}
             className="group"
           >
             <div className="border border-accent/10 hover:border-accent/20 transition-colors">
               <button
                 onClick={() => setOpenIndex(openIndex === index ? null : index)}
                 className="w-full p-6 text-left flex items-center justify-between"
               >
                 <span className="text-foreground font-light">{faq.question}</span>
                 <span className="ml-6">
                   {openIndex === index ? (
                     <Minus className="w-4 h-4 text-primary/60" />
                   ) : (
                     <Plus className="w-4 h-4 text-primary/60" />
                   )}
                 </span>
               </button>

               <motion.div
                 initial={false}
                 animate={{
                   height: openIndex === index ? "auto" : 0,
                   opacity: openIndex === index ? 1 : 0
                 }}
                 transition={{ duration: 0.3 }}
                 className="overflow-hidden"
               >
                 <div className="p-6 pt-0">
                   <p className="text-muted-foreground font-light">
                     {faq.answer}
                   </p>
                 </div>
               </motion.div>
             </div>
           </motion.div>
         ))}
       </div>

       <motion.div
         initial={{ opacity: 0, y: 20 }}
         whileInView={{ opacity: 1, y: 0 }}
         viewport={{ once: true }}
         className="text-center mt-12"
       >
         <p className="text-muted-foreground mb-6">
           Une autre question ?
         </p>
         <Button
           className="bg-primary text-white hover:bg-primary/90 px-8 h-12 rounded-none group"
           onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
         >
           Contactez-nous
         </Button>
       </motion.div>
     </div>
   </section>
 );
}