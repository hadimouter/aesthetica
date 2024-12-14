
// components/dashboard/RecentActivityCard.tsx
"use client";
import { motion } from "framer-motion";
import { Activity } from "lucide-react";

export function RecentActivityCard() {
    return (
      <motion.div 
        whileHover={{ y: -2 }}
        className="bg-white p-6 border border-primary/10"
      >
        <div className="flex items-center justify-between mb-4">
          <Activity className="w-5 h-5 text-primary/70" />
          <div className="text-sm text-primary/60">Activité récente</div>
        </div>
        
        <div className="space-y-2">
          <div className="text-2xl font-light text-primary">7</div>
          <div className="text-sm text-muted-foreground">Actions cette semaine</div>
        </div>
  
        <div className="mt-4 pt-4 border-t border-primary/10">
          <div className="text-sm text-primary/60">
            Dernière action: Message reçu
          </div>
        </div>
      </motion.div>
    );
  }