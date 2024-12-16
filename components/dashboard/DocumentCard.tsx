"use client";

import { motion } from "framer-motion";
import { FileText } from "lucide-react";

interface DocumentCardProps {
 count: number;
 lastDocument?: {
   type: string;
 } | null;
}

export function DocumentCard({ count, lastDocument }: DocumentCardProps) {
 return (
   <motion.div 
     whileHover={{ y: -2 }}
     className="bg-white p-6 border border-primary/10"
   >
     <div className="flex items-center justify-between mb-4">
       <FileText className="w-5 h-5 text-primary/70" />
       <div className="text-sm text-primary/60">Documents</div>
     </div>
     
     <div className="space-y-2">
       <div className="text-2xl font-light text-primary">{count}</div>
       <div className="text-sm text-muted-foreground">Documents disponibles</div>
     </div>

     <div className="mt-4 pt-4 border-t border-primary/10">
       <div className="text-sm text-primary/60">
         Dernier ajout: {lastDocument?.type || 'Aucun document'}
       </div>
     </div>
   </motion.div>
 );
}