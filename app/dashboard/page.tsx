// app/dashboard/page.tsx
import { Metadata } from "next";
import { AppointmentCard } from "@/components/dashboard/AppointmentCard";
import { DocumentCard } from "@/components/dashboard/DocumentCard";
import { MedicalSummaryCard } from "@/components/dashboard/MedicalSummaryCard";
import { RecentActivityCard } from "@/components/dashboard/RecentActivityCard";
import { AppointmentList } from "@/components/dashboard/AppointmentList";
import { RecentDocuments } from "@/components/dashboard/RecentDocuments";

export const metadata: Metadata = {
  title: "Tableau de bord | Aesthetica",
  description: "Votre espace personnel",
};

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-light text-primary">
          Tableau de bord
        </h1>
        <div className="text-sm text-muted-foreground">
          Dernier accès: {new Date().toLocaleDateString()}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <AppointmentCard />
        <DocumentCard />
        <MedicalSummaryCard />
        <RecentActivityCard />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h2 className="text-lg font-medium text-primary">
            Prochains rendez-vous
          </h2>
          <AppointmentList />
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-medium text-primary">
            Documents récents
          </h2>
          <RecentDocuments />
        </div>
      </div>
    </div>
  );
}