
import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb/connection";
import Contact from "@/lib/models/contact";
import { sendcontactConfirmation } from "@/lib/mail";

export async function POST(request: Request) {
  try {
    await connectDB();

    const body = await request.json();
    
    // Créer le rendez-vous
    const contact = await Contact.create(body);

    // Envoyer les emails
    await sendcontactConfirmation(contact);

    return NextResponse.json(
      { message: "Message envoyé avec succès", contact },
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