
// components/dashboard/RecentDocuments.tsx
"use client";

import { motion } from "framer-motion";
import { FileText, Download, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

const documents = [
  {
    id: 1,
    name: "Ordonnance_03_2024.pdf",
    type: "Ordonnance",
    date: "01 Mars 2024",
    size: "245 KB"
  },
  {
    id: 2,
    name: "Compte_rendu_consultation.pdf",
    type: "Compte rendu",
    date: "28 Février 2024",
    size: "180 KB"
  },
  {
    id: 3,
    name: "Analyses_pre_op.pdf",
    type: "Analyses",
    date: "25 Février 2024",
    size: "320 KB"
  }
];

export function RecentDocuments() {
  return (
    <div className="space-y-4">
      {documents.map((document) => (
        <motion.div
          key={document.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-white border border-primary/10 hover:border-primary/20 transition-colors"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/5 rounded flex items-center justify-center">
                <FileText className="w-5 h-5 text-primary/70" />
              </div>
              <div>
                <div className="font-medium text-primary">
                  {document.name}
                </div>
                <div className="text-sm text-muted-foreground">
                  {document.type} • {document.size}
                </div>
              </div>
            </div>
            <div className="text-sm text-primary/60">
              {document.date}
            </div>
          </div>

          <div className="mt-4 flex gap-2 justify-end">
            <Button
              variant="ghost"
              size="sm"
              className="text-xs"
            >
              <Eye className="w-4 h-4 mr-1" />
              Voir
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-xs"
            >
              <Download className="w-4 h-4 mr-1" />
              Télécharger
            </Button>
          </div>
        </motion.div>
      ))}
    </div>
  );
}