
import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb/connection";
import Appointment from "@/lib/models/Appointment";
import { sendAppointmentConfirmation } from "@/lib/mail";

export async function POST(request: Request) {
  try {
    await connectDB();

    const body = await request.json();
    
    // Créer le rendez-vous
    const appointment = await Appointment.create(body);

    // Envoyer les emails
    await sendAppointmentConfirmation(appointment);

    return NextResponse.json(
      { message: "Rendez-vous créé avec succès", appointment },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Erreur lors de la création du rendez-vous:", error);
    return NextResponse.json(
      { message: error.message || "Une erreur est survenue" },
      { status: 500 }
    );
  }
}