
import { LoginForm } from "@/components/auth/LoginForm";
import { Metadata } from "next";

export const metadata: Metadata = {
 title: "Connexion | Aesthetica",
 description: "Connectez-vous à votre espace personnel",
};

export default function LoginPage() {
 return (
   <div className="min-h-screen bg-[#FAF9F7] flex items-center justify-center p-4">
     <div className="w-full max-w-md space-y-8">
       <div className="text-center">
         <h1 className="text-2xl font-light text-primary mb-2">
           Bienvenue
         </h1>
         <p className="text-muted-foreground font-light">
           Connectez-vous à votre espace personnel
         </p>
       </div>

       <div className="bg-white p-8 shadow-sm border border-primary/10">
         <LoginForm />
       </div>

       <p className="text-center text-sm text-muted-foreground">
         Pas encore de compte ?{" "}
         <a href="/auth/register" className="text-primary hover:underline">
           Créer un compte
         </a>
       </p>
     </div>
   </div>
 );
}