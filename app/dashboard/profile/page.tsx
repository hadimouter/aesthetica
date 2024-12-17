"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "react-hot-toast";
import {
  User,
  Phone,
  MapPin,
  Calendar,
  FileText,
  MessageSquare,
  ClipboardList,
  Activity,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { ProfileForm } from "@/components/dashboard/ProfileForm";

interface Profile {
  dateOfBirth?: string;
  gender?: "male" | "female" | "other";
  phone?: string;
  address?: {
    street?: string;
    city?: string;
    postalCode?: string;
    country?: string;
  };
  medicalHistory?: {
    allergies?: string[];
    medications?: string[];
    previousSurgeries?: string[];
    conditions?: string[];
  };
}

interface Summary {
  documents: { total: number; recent: any[] };
  records: { total: number; recent: any[] };
  messages: { total: number; recent: any[] };
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [summary, setSummary] = useState<Summary | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      const response = await fetch("/api/profile");
      if (!response.ok) throw new Error("Erreur de chargement");
      const data = await response.json();
      setProfile(data.profile);
      setSummary(data.summary);
    } catch (error) {
      toast.error("Erreur lors du chargement du profil");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div className="p-8 text-center">Chargement...</div>;
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Informations personnelles */}
        <Card className="md:col-span-1">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Informations personnelles
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-500" />
              <span>
                {profile?.dateOfBirth
                  ? format(new Date(profile.dateOfBirth), "d MMMM yyyy", {
                    locale: fr,
                  })
                  : "Non renseigné"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-gray-500" />
              <span>{profile?.phone || "Non renseigné"}</span>
            </div>
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-gray-500 mt-1" />
              <div>
                <p>{profile?.address?.street || "Adresse non renseignée"}</p>
                <p>
                  {profile?.address?.postalCode} {profile?.address?.city}
                </p>
                <p>{profile?.address?.country}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <div className="flex justify-end text-white">
          {profile ? (
            <ProfileForm profile={profile} onUpdate={fetchProfileData} />
          ) : (
            <Button onClick={fetchProfileData}>Créer un profil</Button>
          )}
        </div>
        {/* Résumé des activités */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Résumé des activités
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link href="/documents">
                <div className="p-4 border rounded-lg hover:shadow-sm transition-shadow">
                  <div className="flex items-center justify-between mb-2">
                    <FileText className="w-5 h-5 text-primary" />
                    <span className="text-2xl font-semibold">
                      {summary?.documents.total || 0}
                    </span>
                  </div>
                  <h3 className="font-medium">Documents</h3>
                  <p className="text-sm text-gray-500">Documents téléchargés</p>
                </div>
              </Link>

              <Link href="/medical-records">
                <div className="p-4 border rounded-lg hover:shadow-sm transition-shadow">
                  <div className="flex items-center justify-between mb-2">
                    <ClipboardList className="w-5 h-5 text-primary" />
                    <span className="text-2xl font-semibold">
                      {summary?.records.total || 0}
                    </span>
                  </div>
                  <h3 className="font-medium">Dossiers médicaux</h3>
                  <p className="text-sm text-gray-500">
                    Consultations et suivis
                  </p>
                </div>
              </Link>

              <Link href="/messages">
                <div className="p-4 border rounded-lg hover:shadow-sm transition-shadow">
                  <div className="flex items-center justify-between mb-2">
                    <MessageSquare className="w-5 h-5 text-primary" />
                    <span className="text-2xl font-semibold">
                      {summary?.messages.total || 0}
                    </span>
                  </div>
                  <h3 className="font-medium">Messages</h3>
                  <p className="text-sm text-gray-500">Communications</p>
                </div>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Historique médical */}
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Historique médical</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="allergies">
              <TabsList className="flex flex-wrap gap-2 mb-4">
                <TabsTrigger value="allergies">Allergies</TabsTrigger>
                <TabsTrigger value="medications">Médicaments</TabsTrigger>
                <TabsTrigger value="surgeries">Chirurgies</TabsTrigger>
                <TabsTrigger value="conditions">Conditions</TabsTrigger>
              </TabsList>

              <TabsContent value="allergies" className="mt-12">
                <ul className="list-disc pl-5 space-y-2">
                  {profile?.medicalHistory?.allergies?.length ? (
                    profile.medicalHistory.allergies.map((allergy, index) => (
                      <li key={index}>{allergy}</li>
                    ))
                  ) : (
                    <li className="text-gray-500">Aucune allergie renseignée</li>
                  )}
                </ul>
              </TabsContent>

              <TabsContent value="medications" className="mt-12">
                <ul className="list-disc pl-5 space-y-2">
                  {profile?.medicalHistory?.medications?.length ? (
                    profile.medicalHistory.medications.map(
                      (medication, index) => <li key={index}>{medication}</li>
                    )
                  ) : (
                    <li className="text-gray-500">Aucun médicament renseigné</li>
                  )}
                </ul>
              </TabsContent>

              <TabsContent value="surgeries" className="mt-12">
                <ul className="list-disc pl-5 space-y-2">
                  {profile?.medicalHistory?.previousSurgeries?.length ? (
                    profile.medicalHistory.previousSurgeries.map(
                      (surgery, index) => <li key={index}>{surgery}</li>
                    )
                  ) : (
                    <li className="text-gray-500">Aucune chirurgie renseignée</li>
                  )}
                </ul>
              </TabsContent>

              <TabsContent value="conditions" className="mt-12">
                <ul className="list-disc pl-5 space-y-2">
                  {profile?.medicalHistory?.conditions?.length ? (
                    profile.medicalHistory.conditions.map((condition, index) => (
                      <li key={index}>{condition}</li>
                    ))
                  ) : (
                    <li className="text-gray-500">
                      Aucune condition médicale renseignée
                    </li>
                  )}
                </ul>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Activités récentes */}
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Activités récentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {summary?.documents.recent?.length ? (
                summary.documents.recent.map((doc: any) => (
                  <div
                    key={doc._id}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="font-medium">{doc.name}</p>
                        <p className="text-sm text-gray-500">
                          {format(new Date(doc.createdAt), "d MMMM yyyy", {
                            locale: fr,
                          })}
                        </p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-500">
                  Aucune activité récente
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}