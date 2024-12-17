import { useState, useEffect } from 'react';

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

export interface Document {
  _id: string;
  name: string;
  type: string;
  date: string;
  size: string;
}

interface DashboardData {
  stats: {
    appointmentsCount: number;
    nextAppointment: Appointment | null;
    documentsCount: number;
    lastDocument: Document | null;
    medicalRecordsCount: number;
    recentActivities: number;
  };
  appointments: Appointment[];
  documents: Document[];
}

export function useDashboardData() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/stats');
      if (!response.ok) throw new Error('Erreur lors de la récupération des données');
      const result = await response.json();
      setData(result);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const refetch = () => {
    fetchDashboardData();
  };

  return { data, isLoading, error, refetch };
}