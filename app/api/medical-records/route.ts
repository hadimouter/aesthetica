// @ts-nocheck
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import connectDB from "@/lib/mongodb/connection";
import MedicalRecord from "@/lib/models/MedicalRecord";

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
    
    const records = await MedicalRecord.find({
      userId: session.user.id
    })
    .populate('documents')
    .sort({ date: -1 });

    return NextResponse.json(records);

  } catch (error) {
    console.error("Error fetching medical records:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération des données" },
      { status: 500 }
    );
  }
}