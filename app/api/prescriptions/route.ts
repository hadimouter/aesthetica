// @ts-nocheck
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import connectDB from "@/lib/mongodb/connection";
import Document from "@/lib/models/Document";

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
    
    const prescriptions = await Document.find({
      userId: session.user.id,
      type: 'prescription'  // Filtrer uniquement les documents de type ordonnance
    }).sort({ createdAt: -1 });

    return NextResponse.json(prescriptions);

  } catch (error) {
    console.error("Error fetching prescriptions:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération des ordonnances" },
      { status: 500 }
    );
  }
}