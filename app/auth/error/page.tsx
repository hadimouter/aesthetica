import { Metadata } from "next";
import { AlertTriangle } from "lucide-react";

export const metadata: Metadata = {
  title: "Erreur | Aesthetica",
  description: "Une erreur est survenue",
};

export default function AuthErrorPage() {
  return (
    <div className="min-h-screen bg-[#FAF9F7] flex items-center justify-center p-4">
      <div className="w-full max-w-md text-center space-y-6">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-50">
          <AlertTriangle className="w-8 h-8 text-red-500" />
        </div>

        <h1 className="text-2xl font-light text-primary">
          Une erreur est survenue
        </h1>

        <p className="text-muted-foreground font-light">
          Impossible de vous authentifier. Veuillez réessayer.
        </p>

        <div className="pt-4">
          <a 
            href="/auth/login"
            className="text-primary hover:underline"
          >
            Retourner à la connexion
          </a>
        </div>
      </div>
    </div>
  );
}