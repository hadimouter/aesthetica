// components/dashboard/AppointmentList.tsx
"use client";

import { motion } from "framer-motion";
import { Calendar, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

const appointments = [
  {
    id: 1,
    date: "15 Mars 2024",
    time: "14:30",
    type: "Consultation",
    doctor: "Dr. Sophie Martin",
    location: "Cabinet 3",
    status: "confirmed"
  },
  {
    id: 2,
    date: "22 Mars 2024",
    time: "10:00",
    type: "Suivi post-opératoire",
    doctor: "Dr. Sophie Martin",
    location: "Cabinet 2",
    status: "pending"
  }
];

export function AppointmentList() {
  return (
    <div className="space-y-4">
      {appointments.map((appointment) => (
        <motion.div
          key={appointment.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-white border border-primary/10 hover:border-primary/20 transition-colors"
        >
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <div className="font-medium text-primary">
                {appointment.type}
              </div>
              <div className="text-sm text-muted-foreground">
                avec {appointment.doctor}
              </div>
            </div>
            <div className={`px-2 py-1 text-xs rounded ${
              appointment.status === 'confirmed' 
                ? 'bg-green-50 text-green-600'
                : 'bg-yellow-50 text-yellow-600'
            }`}>
              {appointment.status === 'confirmed' ? 'Confirmé' : 'En attente'}
            </div>
          </div>

          <div className="mt-4 flex items-center gap-4 text-sm text-primary/60">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {appointment.date}
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {appointment.time}
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {appointment.location}
            </div>
          </div>

          <div className="mt-4 flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="text-xs"
            >
              Modifier
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-xs text-red-600 hover:text-red-700"
            >
              Annuler
            </Button>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
