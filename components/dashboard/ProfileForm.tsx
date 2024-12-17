"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "react-hot-toast";

interface Profile {
  dateOfBirth?: string;
  gender?: 'male' | 'female' | 'other';
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

interface ProfileFormProps {
  profile: Profile;
  onUpdate: () => void;
}
export function ProfileForm({ profile, onUpdate }: ProfileFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    dateOfBirth: profile?.dateOfBirth || '',
    gender: profile?.gender || '',
    phone: profile?.phone || '',
    address: {
      street: profile?.address?.street || '',
      city: profile?.address?.city || '',
      postalCode: profile?.address?.postalCode || '',
      country: profile?.address?.country || '',
    },
    medicalHistory: {
      allergies: profile?.medicalHistory?.allergies || [],
      medications: profile?.medicalHistory?.medications || [],
      previousSurgeries: profile?.medicalHistory?.previousSurgeries || [],
      conditions: profile?.medicalHistory?.conditions || [],
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Erreur lors de la mise à jour');

      toast.success('Profil mis à jour avec succès');
      onUpdate();
      setIsOpen(false);
    } catch (error) {
      toast.error("Erreur lors de la mise à jour du profil");
    }
  };

  const handleArrayInput = (field: string, value: string) => {
    const items = value.split(',').map(item => item.trim());
    setFormData(prev => ({
      ...prev,
      medicalHistory: {
        ...prev.medicalHistory,
        [field]: items
      }
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Modifier le profil</Button>
      </DialogTrigger>
      <DialogContent className="max-w-[90vw] w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Modifier mon profil</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Date de naissance</Label>
              <Input
                type="date"
                value={formData.dateOfBirth}
                onChange={e => setFormData(prev => ({ ...prev, dateOfBirth: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <Label>Genre</Label>
              <Select
                value={formData.gender}
                onValueChange={value => setFormData(prev => ({ ...prev, gender: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Homme</SelectItem>
                  <SelectItem value="female">Femme</SelectItem>
                  <SelectItem value="other">Autre</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Téléphone</Label>
            <Input
              value={formData.phone}
              onChange={e => setFormData(prev => ({ ...prev, phone: e.target.value }))}
            />
          </div>

          <div className="space-y-4">
            <h3 className="font-medium">Adresse</h3>
            <Input
              placeholder="Rue"
              value={formData.address.street}
              onChange={e => setFormData(prev => ({
                ...prev,
                address: { ...prev.address, street: e.target.value }
              }))}
            />
            <div className="grid grid-cols-2 gap-4">
              <Input
                placeholder="Ville"
                value={formData.address.city}
                onChange={e => setFormData(prev => ({
                  ...prev,
                  address: { ...prev.address, city: e.target.value }
                }))}
              />
              <Input
                placeholder="Code postal"
                value={formData.address.postalCode}
                onChange={e => setFormData(prev => ({
                  ...prev,
                  address: { ...prev.address, postalCode: e.target.value }
                }))}
              />
            </div>
            <Input
              placeholder="Pays"
              value={formData.address.country}
              onChange={e => setFormData(prev => ({
                ...prev,
                address: { ...prev.address, country: e.target.value }
              }))}
            />
          </div>

          <div className="space-y-4">
            <h3 className="font-medium">Historique médical</h3>
            <div className="space-y-2">
              <Label>Allergies (séparées par des virgules)</Label>
              <Input
                value={formData.medicalHistory.allergies.join(', ')}
                onChange={e => handleArrayInput('allergies', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Médicaments (séparés par des virgules)</Label>
              <Input
                value={formData.medicalHistory.medications.join(', ')}
                onChange={e => handleArrayInput('medications', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Chirurgies précédentes (séparées par des virgules)</Label>
              <Input
                value={formData.medicalHistory.previousSurgeries.join(', ')}
                onChange={e => handleArrayInput('previousSurgeries', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Conditions médicales (séparées par des virgules)</Label>
              <Input
                value={formData.medicalHistory.conditions.join(', ')}
                onChange={e => handleArrayInput('conditions', e.target.value)}
              />
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
              Annuler
            </Button>
            <Button type="submit">Enregistrer</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}