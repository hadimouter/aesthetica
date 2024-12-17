// @ts-nocheck
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import connectDB from "@/lib/mongodb/connection";
import Document from "@/lib/models/Document";
import { v2 as cloudinary } from 'cloudinary';

// Configurer Cloudinary au début du fichier
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    await connectDB();

    const document = await Document.findOne({
      _id: params.id,
      userId: session.user.id
    });

    if (!document) {
      return NextResponse.json({ error: "Document non trouvé" }, { status: 404 });
    }

    try {
      // Extraire l'ID public de Cloudinary depuis l'URL
      const urlParts = document.url.split('/');
      const publicIdWithExtension = urlParts[urlParts.length - 1];
      const publicId = `documents/${publicIdWithExtension.split('.')[0]}`;

      // Supprimer le fichier de Cloudinary
      await cloudinary.uploader.destroy(publicId);
    } catch (cloudinaryError) {
      console.error("Cloudinary deletion error:", cloudinaryError);
      // Continuer même si la suppression Cloudinary échoue
    }

    // Supprimer le document de la base de données
    await Document.deleteOne({ _id: params.id });

    return NextResponse.json({ message: "Document supprimé avec succès" });

  } catch (error) {
    console.error("Error deleting document:", error);
    return NextResponse.json(
      { error: "Erreur lors de la suppression du document" },
      { status: 500 }
    );
  }
}