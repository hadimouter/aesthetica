"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Calendar, FileText, User, Download, ChevronDown, ChevronUp } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "react-hot-toast";

interface Document {
  _id: string;
  name: string;
  url: string;
  size: number;
}

interface MedicalRecord {
  _id: string;
  type: string;
  date: string;
  notes: string;
  doctor: string;
  documents: Document[];
  createdAt: string;
}

const recordTypes = {
  consultation: "Consultation",
  surgery: "Chirurgie",
  followUp: "Suivi post-opératoire",
  examination: "Examen",
  treatment: "Traitement"
};

export default function MedicalRecordsPage() {
  const [records, setRecords] = useState<MedicalRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedType, setSelectedType] = useState<string | "all">("all");

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    try {
      const response = await fetch('/api/medical-records');
      if (!response.ok) throw new Error('Erreur de chargement');
      const data = await response.json();
      setRecords(data);
    } catch (error) {
      toast.error("Erreur lors du chargement des données médicales");
    } finally {
      setIsLoading(false);
    }
  };

  const filteredRecords = selectedType === "all" 
    ? records 
    : records.filter(record => record.type === selectedType);

  if (isLoading) {
    return (
      <div className="p-8 text-center text-gray-500">
        Chargement de votre historique médical...
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Suivi médical</h1>
        <p className="mt-2 text-gray-600">
          Consultez votre historique médical complet
        </p>
      </div>

      {/* Filtres */}
      <div className="mb-6">
        <select
          className="w-full sm:w-auto px-4 py-2 border rounded-md"
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
        >
          <option value="all">Tous les types</option>
          {Object.entries(recordTypes).map(([value, label]) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
      </div>

      {filteredRecords.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <FileText className="w-12 h-12 mx-auto text-gray-400" />
          <p className="mt-2 text-gray-600">Aucun dossier médical trouvé</p>
        </div>
      ) : (
        <Accordion type="single" collapsible className="space-y-4">
          {filteredRecords.map((record) => (
            <AccordionItem
              key={record._id}
              value={record._id}
              className="border rounded-lg p-4 bg-white"
            >
              <AccordionTrigger className="hover:no-underline">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-left">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-gray-500" />
                    <span className="font-medium">
                      {format(new Date(record.date), "d MMMM yyyy", { locale: fr })}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="w-5 h-5 text-gray-500" />
                    <span className="text-gray-600">Dr. {record.doctor}</span>
                  </div>
                  <span className="px-2 py-1 text-xs bg-primary/10 text-primary rounded">
                    {recordTypes[record.type as keyof typeof recordTypes]}
                  </span>
                </div>
              </AccordionTrigger>

              <AccordionContent className="pt-4">
                <div className="space-y-4">
                  {record.notes && (
                    <div className="bg-gray-50 p-4 rounded-md">
                      <h4 className="font-medium mb-2">Notes</h4>
                      <p className="text-gray-600 whitespace-pre-wrap">{record.notes}</p>
                    </div>
                  )}

                  {record.documents && record.documents.length > 0 && (
                    <div>
                      <h4 className="font-medium mb-2">Documents</h4>
                      <div className="space-y-2">
                        {record.documents.map((doc) => (
                          <div
                            key={doc._id}
                            className="flex items-center justify-between p-3 bg-gray-50 rounded-md"
                          >
                            <span className="text-sm text-gray-600">{doc.name}</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => window.open(doc.url, '_blank')}
                            >
                              <Download className="w-4 h-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </div>
  );
}