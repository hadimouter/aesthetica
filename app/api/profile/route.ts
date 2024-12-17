// @ts-nocheck
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import connectDB from "@/lib/mongodb/connection";
import Patient from "@/lib/models/Patient";
import Document from "@/lib/models/Document";
import MedicalRecord from "@/lib/models/MedicalRecord";
import Contact from "@/lib/models/contact";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Non autorisé" }, 
        { status: 401 }
      );
    }

    await connectDB();

    // Récupérer toutes les données en parallèle
    const [
      patientData,
      recentDocuments,
      recentRecords,
      recentMessages,
      documentsCount,
      recordsCount,
      messagesCount
    ] = await Promise.all([
      Patient.findOne({ userId: session.user.id }),
      Document.find({ userId: session.user.id }).sort({ createdAt: -1 }).limit(3),
      MedicalRecord.find({ userId: session.user.id }).sort({ date: -1 }).limit(3),
      Contact.find({ email: session.user.email }).sort({ createdAt: -1 }).limit(3),
      Document.countDocuments({ userId: session.user.id }),
      MedicalRecord.countDocuments({ userId: session.user.id }),
      Contact.countDocuments({ email: session.user.email })
    ]);

    return NextResponse.json({
      profile: patientData,
      summary: {
        documents: {
          total: documentsCount,
          recent: recentDocuments
        },
        records: {
          total: recordsCount,
          recent: recentRecords
        },
        messages: {
          total: messagesCount,
          recent: recentMessages
        }
      }
    });

  } catch (error) {
    console.error("Error fetching profile:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération du profil" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
    try {
      const session = await getServerSession(authOptions);
      if (!session?.user?.id) {
        return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
      }
  
      const data = await request.json();
      await connectDB();
  
      let patient = await Patient.findOne({ userId: session.user.id });
  
      if (patient) {
        // Mettre à jour le patient existant
        patient = await Patient.findOneAndUpdate(
          { userId: session.user.id },
          data,
          { new: true }
        );
      } else {
        // Créer un nouveau patient
        patient = await Patient.create({
          userId: session.user.id,
          ...data
        });
      }
  
      return NextResponse.json(patient);
  
    } catch (error) {
      console.error("Error updating profile:", error);
      return NextResponse.json(
        { error: "Erreur lors de la mise à jour du profil" },
        { status: 500 }
      );
    }
  }