'use client';

import { Suspense } from 'react';
import { AppointmentCard } from '@/components/dashboard/AppointmentCard';
import { DocumentCard } from '@/components/dashboard/DocumentCard';
import { MedicalSummaryCard } from '@/components/dashboard/MedicalSummaryCard';
import { RecentActivityCard } from '@/components/dashboard/RecentActivityCard';
import { AppointmentList } from '@/components/dashboard/AppointmentList';
import { RecentDocuments } from '@/components/dashboard/RecentDocuments';
import { DashboardSkeleton } from '@/components/dashboard/DashboardSkeleton';
import { useDashboardData } from '@/hooks/useDashboardData';

export default function DashboardPage() {
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

 const content = (
   <div className="space-y-8">
     <div className="flex justify-between items-center">
       <h1 className="text-2xl font-light text-primary">
         Tableau de bord
       </h1>
       <div className="text-sm text-muted-foreground">
         Dernier accès: {new Date().toLocaleDateString('fr-FR')}
       </div>
     </div>

     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
       <AppointmentCard
         count={data?.stats.appointmentsCount || 0}
         nextAppointment={data?.stats.nextAppointment}
       />
       <DocumentCard
         count={data?.stats.documentsCount || 0}
         lastDocument={data?.stats.lastDocument}
       />
       <MedicalSummaryCard
         count={data?.stats.medicalRecordsCount || 0}
       />
       <RecentActivityCard
         count={data?.stats.recentActivities || 0}
       />
     </div>

     <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
       <div className="space-y-4">
         <h2 className="text-lg font-medium text-primary">
           Prochains rendez-vous
         </h2>
         <AppointmentList
           appointments={data?.appointments || []}
         />
       </div>

       <div className="space-y-4">
         <h2 className="text-lg font-medium text-primary">
           Documents récents
         </h2>
         <RecentDocuments
           documents={data?.documents || []}
         />
       </div>
     </div>
   </div>
 );

 return (
   <Suspense fallback={<DashboardSkeleton />}>
     {content}
   </Suspense>
 );
}