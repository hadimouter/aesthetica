// components/sections/BeforeAfter.tsx
"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

const transformations = [
  {
    title: "Rhinoplastie",
    subtitle: "Harmonisation du profil",
    before: "https://images.unsplash.com/photo-1542596594-649edbc13630?auto=format&fit=crop&q=80",
    after: "https://images.unsplash.com/photo-1549351512-c5e12b11e283?auto=format&fit=crop&q=80",
    tag: "3 mois post-opératoire"
  },
  {
    title: "Lifting Facial",
    subtitle: "Rajeunissement naturel",
    before: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80",
    after: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80",
    tag: "6 mois post-opératoire"
  },
  {
    title: "Liposuccion",
    subtitle: "Redéfinition de la silhouette",
    before: "https://images.unsplash.com/photo-1600334129128-685c5582fd35?q=80&w=1000",
    after: "https://images.unsplash.com/photo-1550345332-09e3ac987658?auto=format&fit=crop&q=80",
    tag: "4 mois post-opératoire"
  }
];

export function BeforeAfter() {
 const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

 return (
   <section id="transformations" className="py-32 bg-surface">
     <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
       <motion.div
         initial={{ opacity: 0, y: 20 }}
         whileInView={{ opacity: 1, y: 0 }}
         viewport={{ once: true }}
         className="text-center mb-16"
       >
         <h2 className="text-3xl font-light text-foreground mb-4">
           Transformations
         </h2>
         <p className="text-muted-foreground max-w-2xl mx-auto">
           Des résultats d'exception, témoins de notre expertise et de notre quête de perfection.
         </p>
       </motion.div>

       <div className="grid md:grid-cols-3 gap-8">
         {transformations.map((item, index) => (
           <motion.div
             key={item.title}
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: index * 0.1 }}
             className="group cursor-pointer"
             onMouseEnter={() => setHoveredIndex(index)}
             onMouseLeave={() => setHoveredIndex(null)}
           >
             <div className="relative aspect-[3/4] overflow-hidden border border-accent/10">
               <Image
                 src={hoveredIndex === index ? item.after : item.before}
                 alt={item.title}
                 fill
                 className="object-cover transition-all duration-700"
                 sizes="(max-width: 768px) 100vw, 33vw"
               />
               
               <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0" />
               
               <div className="absolute top-4 right-4">
                 <span className="px-3 py-1 text-xs tracking-wide bg-white/90 text-primary">
                   {hoveredIndex === index ? "Après" : "Avant"}
                 </span>
               </div>

               <div className="absolute bottom-0 left-0 right-0 p-6">
                 <h3 className="text-xl font-light text-white mb-1">{item.title}</h3>
                 <p className="text-white/80 text-sm mb-1">{item.subtitle}</p>
               </div>

               <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
                 <div className="flex items-center gap-2 px-4 py-2 bg-white/90 text-primary text-sm">
                   <ArrowRight className="w-4 h-4" />
                   Voir le résultat
                 </div>
               </div>
             </div>
           </motion.div>
         ))}
       </div>
     </div>
   </section>
 );
}