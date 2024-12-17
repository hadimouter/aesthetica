"use client";

import { useState, useEffect } from "react";
import { AppointmentList } from '@/components/dashboard/AppointmentList';
import { ConsultationModal } from "../../../components/modals/ConsultationModal";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";
import { useDashboardData } from '@/hooks/useDashboardData';


export default function AppointmentsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, isLoading, error } = useDashboardData();

 if (error) {
  return (
    <div className="p-4 bg-red-50 text-red-600 rounded-lg">
      {error}
    </div>
  );
}

if (!data && !isLoading) {
  return (
    <div className="p-4 bg-gray-50 text-gray-600 rounded-lg">
      Aucune donnée disponible
    </div>
  );
}
  // Ajouter un nouveau rendez-vous
  const handleConsultation = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-primary">Rendez-vous</h1>
        <Button className="inline-flex items-center px-4 py-2 rounded-md bg-primary text-white cursor-pointer" onClick={handleConsultation}>Créer un rendez-vous</Button>
      </div>
      <div className="space-y-4">
        <h2 className="text-lg font-medium text-primary">
          Prochains rendez-vous
        </h2>
        <AppointmentList
          appointments={data?.appointments || []}
        />
      </div>
      {isModalOpen && (
       <ConsultationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
}
