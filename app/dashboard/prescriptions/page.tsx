"use client";

import { useState, useEffect } from "react";
import { File, Download } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

interface Prescription {
  _id: string;
  name: string;
  url: string;
  createdAt: string;
  size: number;
}

export default function PrescriptionsPage() {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const response = await fetch('/api/prescriptions');
        if (response.ok) {
          const data = await response.json();
          setPrescriptions(data);
        }
      } catch (error) {
        console.error('Erreur lors du chargement des ordonnances:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPrescriptions();
  }, []);

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  if (isLoading) {
    return (
      <div className="p-8 text-center text-gray-500">
        Chargement des ordonnances...
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Ordonnances</h1>
        <p className="mt-2 text-gray-600">
          Consultez vos ordonnances médicales
        </p>
      </div>

      {prescriptions.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <File className="w-12 h-12 mx-auto text-gray-400" />
          <p className="mt-2 text-gray-600">Aucune ordonnance disponible</p>
        </div>
      ) : (
        <div className="space-y-4">
          {prescriptions.map((prescription) => (
            <div
              key={prescription._id}
              className="flex items-center justify-between p-4 bg-white rounded-lg border hover:shadow-sm transition-shadow"
            >
              <div className="flex items-center space-x-4">
                <File className="w-8 h-8 text-gray-400" />
                <div>
                  <h3 className="font-medium text-gray-900">{prescription.name}</h3>
                  <p className="text-sm text-gray-500">
                    {formatFileSize(prescription.size)} • {format(new Date(prescription.createdAt), "d MMMM yyyy", { locale: fr })}
                  </p>
                </div>
              </div>
              
              <button
                onClick={() => window.open(prescription.url, '_blank')}
                className="p-2 text-gray-600 hover:text-gray-900"
                title="Télécharger"
              >
                <Download className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}