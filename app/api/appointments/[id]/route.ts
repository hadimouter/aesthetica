// @ts-nocheck
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import connectDB from "@/lib/mongodb/connection";
import Appointment from "@/lib/models/Appointment";
import { sendAppointmentModification } from "@/lib/mail";
import { sendAppointmentCancellation } from "@/lib/mail";

// Gestionnaire DELETE
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    await connectDB();

    const appointment = await Appointment.findById(params.id);

    if (!appointment) {
      return NextResponse.json({ error: "Rendez-vous non trouvé" }, { status: 404 });
    }

    // Vérifier que l'email de l'utilisateur correspond à celui du rendez-vous
    if (appointment.email !== session.user.email) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 403 });
    }

    await Appointment.findByIdAndDelete(params.id);
    // Envoyer les emails
    await sendAppointmentCancellation(appointment);
    return NextResponse.json({ message: "Rendez-vous supprimé avec succès" }, { status: 200 });

  } catch (error) {
    console.error("Error deleting appointment:", error);
    return NextResponse.json({ error: "Erreur lors de la suppression du rendez-vous" }, { status: 500 });
  }
}

// Gestionnaire PUT
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    await connectDB();

    const appointment = await Appointment.findById(params.id);

    if (!appointment) {
      return NextResponse.json({ error: "Rendez-vous non trouvé" }, { status: 404 });
    }

    // Vérifier que l'email de l'utilisateur correspond à celui du rendez-vous
    if (appointment.email !== session.user.email) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 403 });
    }

    const body = await request.json();

    const updatedAppointment = await Appointment.findByIdAndUpdate(
      params.id,
      { ...body },
      { new: true }
    );
    // Envoyer les emails
    await sendAppointmentModification(updatedAppointment);
    return NextResponse.json(updatedAppointment, { status: 200 });

  } catch (error) {
    console.error("Error updating appointment:", error);
    return NextResponse.json({ error: "Erreur lors de la modification du rendez-vous" }, { status: 500 });
  }
}
