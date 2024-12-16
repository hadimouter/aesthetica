// @ts-nocheck
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import connectDB from "@/lib/mongodb/connection";
import Appointment from "@/lib/models/Appointment";
import Document from "@/lib/models/Document";
import Activity from "@/lib/models/Activity";
import MedicalRecord from "@/lib/models/MedicalRecord";

// Types pour les modèles
interface UserSession {
  user: {
    id: string;
    name?: string | null;
    email?: string | null;
  };
}

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions) as UserSession | null;
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Non autorisé" }, 
        { status: 401 }
      );
    }

    await connectDB();
    const userId = session.user.id;

    const [
      appointments,
      documents,
      medicalRecords,
      activities
    ] = await Promise.all([
      Appointment.find({ userId }).sort({ date: 1 }).limit(5),
      Document.find({ userId }).sort({ createdAt: -1 }).limit(5),
      MedicalRecord.find({ userId }).countDocuments(),
      Activity.find({ userId }).sort({ createdAt: -1 }).limit(7)
    ]);

    return NextResponse.json({
      stats: {
        appointmentsCount: appointments.length,
        nextAppointment: appointments[0] || null,
        documentsCount: documents.length,
        lastDocument: documents[0] || null,
        medicalRecordsCount: medicalRecords,
        recentActivities: activities.length
      },
      appointments,
      documents
    });

  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération des données" },
      { status: 500 }
    );
  }
}