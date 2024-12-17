"use client";
import { useState, useEffect } from "react";
import { Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ConsultationModal } from "../modals/ConsultationModal";
import { toast } from "react-hot-toast";

interface Appointment {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  message?: string;
  status: 'confirmed' | 'pending';
  createdAt?: string;
  updatedAt?: string;
}

interface AppointmentListProps {
  appointments: Appointment[];
}

export function AppointmentList({ appointments }: AppointmentListProps) {
  const [currentAppointments, setAppointments] = useState<Appointment[]>(appointments);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  // Synchroniser l'état avec les props
  useEffect(() => {
    if (appointments) {
      setAppointments(appointments);
      console.log("Données reçues :", appointments);
    }
  }, [appointments]);
  const handleDelete = async (appointmentId: string) => {
    if (!confirm("Êtes-vous sûr de vouloir annuler ce rendez-vous ?")) {
      return;
    }

    try {
      const response = await fetch(`/api/appointments/${appointmentId}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error("Erreur lors de l'annulation");

      setAppointments(currentAppointments.filter(apt => apt._id !== appointmentId));
      toast.success("Rendez-vous annulé avec succès");
    } catch (error) {
      toast.error("Erreur lors de l'annulation du rendez-vous");
    }
  };

  const handleAppointmentUpdated = (updatedAppointment: Appointment) => {
    setAppointments(currentAppointments.map(apt =>
      apt._id === updatedAppointment._id ? updatedAppointment : apt
    ));
  };

  return (
    <div className="space-y-4">
      {currentAppointments.length === 0 ? (
        <div className="p-4 bg-gray-50 text-gray-600 rounded-lg text-center">
          Aucun rendez-vous prévu
        </div>
      ) : (
        currentAppointments.map((appointment) => (
          <div
            key={appointment._id}
            className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:border-primary/20 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-medium text-primary">
                  {appointment.service}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  {appointment.firstName} {appointment.lastName}
                </p>
              </div>
              <div className={`px-2 py-1 text-xs rounded ${appointment.status === 'confirmed'
                  ? 'bg-green-50 text-green-600'
                  : 'bg-yellow-50 text-yellow-600'
                }`}>
                {appointment.status === 'confirmed' ? 'Confirmé' : 'En attente'}
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {new Date(appointment.date).toLocaleDateString('fr-FR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {appointment.time}
              </div>
            </div>

            <div className="mt-4 flex gap-2">
              {appointment.status === 'pending' && (
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs"
                  onClick={() => {
                    setSelectedAppointment(appointment);
                    setIsModalOpen(true);
                  }}
                >
                  Modifier
                </Button>
              )}
              <Button
                variant="outline"
                size="sm"
                className="text-xs text-red-600 hover:text-red-700"
                onClick={() => handleDelete(appointment._id)}
              >
                Annuler
              </Button>
            </div>
          </div>
        ))
      )}

      {isModalOpen && (
        <ConsultationModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedAppointment(null);
          }}
          appointment={selectedAppointment}
          onSuccess={(updatedAppointment) => {
            handleAppointmentUpdated(updatedAppointment);
            setIsModalOpen(false);
            setSelectedAppointment(null);
          }}
        />
      )}
    </div>
  );
}
