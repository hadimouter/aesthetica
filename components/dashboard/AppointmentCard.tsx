"use client";

import { motion } from "framer-motion";
import { Calendar } from "lucide-react";

interface AppointmentCardProps {
  count: number;
  nextAppointment?: {
    date: string;
    time: string;
  } | null;
}

export function AppointmentCard({ count, nextAppointment }: AppointmentCardProps) {
  return (
    <motion.div 
      whileHover={{ y: -2 }}
      className="bg-white p-6 border border-primary/10"
    >
      <div className="flex items-center justify-between mb-4">
        <Calendar className="w-5 h-5 text-primary/70" />
        <div className="text-sm text-primary/60">Ce mois</div>
      </div>
      
      <div className="space-y-2">
        <div className="text-2xl font-light text-primary">{count}</div>
        <div className="text-sm text-muted-foreground">Rendez-vous prévus</div>
      </div>

      <div className="mt-4 pt-4 border-t border-primary/10">
        <div className="text-sm text-primary/60">
          Prochain RDV: {nextAppointment?.date || 'Aucun'}
        </div>
      </div>
    </motion.div>
  );
}