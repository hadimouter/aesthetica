
import { RegisterForm } from "@/components/auth/RegisterForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inscription | Aesthetica",
  description: "Créez votre compte personnel",
};

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-[#FAF9F7] flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-2xl font-light text-primary mb-2">
            Créer un compte
          </h1>
          <p className="text-muted-foreground font-light">
            Rejoignez-nous pour bénéficier d'un suivi personnalisé
          </p>
        </div>

        <div className="bg-white p-8 shadow-sm border border-primary/10">
          <RegisterForm />
        </div>

        <p className="text-center text-sm text-muted-foreground">
          Déjà un compte ?{" "}
          <a href="/auth/login" className="text-primary hover:underline">
            Se connecter
          </a>
        </p>
      </div>
    </div>
  );
}