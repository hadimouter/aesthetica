"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

export function RegisterForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      email: formData.get("email"),
      password: formData.get("password"),
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      dateOfBirth: formData.get("dateOfBirth"),
      gender: formData.get("gender"),
      phone: formData.get("phone"),
    };

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast({
          title: "Compte créé avec succès",
          description: "Vous pouvez maintenant vous connecter",
        });
        router.push("/auth/login");
      } else {
        const error = await response.json();
        throw new Error(error.message);
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: error instanceof Error ? error.message : "Une erreur est survenue",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-md">
      <div className="grid grid-cols-2 gap-4">
        <Input
          name="firstName"
          placeholder="Prénom"
          required
          className="h-12"
        />
        <Input
          name="lastName"
          placeholder="Nom"
          required
          className="h-12"
        />
      </div>
      
      <Input
        name="email"
        type="email"
        placeholder="Email"
        required
        className="h-12"
      />
      
      <Input
        name="password"
        type="password"
        placeholder="Mot de passe"
        required
        className="h-12"
      />
      
      <Input
        name="phone"
        type="tel"
        placeholder="Téléphone"
        required
        className="h-12"
      />
      
      <Input
        name="dateOfBirth"
        type="date"
        required
        className="h-12"
      />
      
      <select 
        name="gender" 
        required
        className="w-full h-12 px-4 border border-input bg-transparent"
      >
        <option value="">Sélectionnez votre genre</option>
        <option value="male">Homme</option>
        <option value="female">Femme</option>
        <option value="other">Autre</option>
      </select>

      <Button
        type="submit"
        className="w-full h-12"
        disabled={isLoading}
      >
        {isLoading ? "Création du compte..." : "Créer un compte"}
      </Button>
    </form>
  );
}