"use client";

import { motion } from "framer-motion";
import { FileText, Download, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Document } from '@/hooks/useDashboardData';

interface RecentDocumentsProps {
  documents: Document[];
}

export function RecentDocuments({ documents }: RecentDocumentsProps) {
 if (!documents.length) {
   return (
     <div className="p-4 bg-gray-50 text-gray-600 rounded-lg text-center">
       Aucun document disponible
     </div>
   );
 }

 return (
   <div className="space-y-4">
     {documents.map((document) => (
       <motion.div
         key={document._id}
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
             onClick={() => {/* Ajouter logique de visualisation */}}
           >
             <Eye className="w-4 h-4 mr-1" />
             Voir
           </Button>
           <Button
             variant="ghost"
             size="sm"
             className="text-xs"
             onClick={() => {/* Ajouter logique de téléchargement */}}
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