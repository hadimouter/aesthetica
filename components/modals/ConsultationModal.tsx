"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { Calendar } from "@/components/ui/calendar";
import { fr } from "date-fns/locale";
import { useToast } from "@/components/ui/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";

const services = [
    { id: "rhinoplastie", name: "Rhinoplastie" },
    { id: "lifting", name: "Lifting Facial" },
    { id: "liposuccion", name: "Liposuccion" },
    { id: "injections", name: "Injections" }
];

const timeSlots = [
    "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    "14:00", "14:30", "15:00", "15:30", "16:00", "16:30"
];

interface Appointment {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    service: string;
    date: string;
    time: string;
    message?: string;
    status: 'confirmed' | 'pending';
}

interface ConsultationModalProps {
    isOpen: boolean;
    onClose: () => void;
    appointment?: Appointment | null;
    onSuccess?: (appointment: Appointment) => void;
}

interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    service: string;
    date: Date;
    time: string;
    message: string;
}

export function ConsultationModal({ isOpen, onClose, appointment, onSuccess }: ConsultationModalProps) {
    const { toast } = useToast();
    const [selectedDate, setSelectedDate] = useState<Date>();
    const [selectedTime, setSelectedTime] = useState<string>();
    const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm<FormData>();
    const [selectedService, setSelectedService] = useState("");

    useEffect(() => {
        if (appointment) {
            reset({
                firstName: appointment.firstName,
                lastName: appointment.lastName,
                email: appointment.email,
                phone: appointment.phone,
                service: appointment.service,
                message: appointment.message || ''
            });
            setSelectedDate(new Date(appointment.date));
            setSelectedTime(appointment.time);
            setSelectedService(appointment.service);
        }
    }, [appointment, reset]);

    const onSubmit = async (data: FormData) => {
        try {
            const url = appointment 
                ? `/api/appointments/${appointment._id}`
                : '/api/appointments';
                
            const response = await fetch(url, {
                method: appointment ? 'PUT' : 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...data,
                    date: selectedDate,
                    time: selectedTime,
                }),
            });

            if (!response.ok) {
                throw new Error(appointment ? 'Erreur lors de la modification' : 'Erreur lors de la prise de rendez-vous');
            }

            const updatedAppointment = await response.json();
            
            toast({
                title: appointment ? "Rendez-vous modifié" : "Rendez-vous confirmé",
                description: "Vous recevrez un email de confirmation sous peu.",
            });

            if (onSuccess) {
                onSuccess(updatedAppointment);
            }

            reset();
            setSelectedDate(undefined);
            setSelectedTime("");
            setSelectedService("");
            onClose();

        } catch (error) {
            toast({
                title: "Erreur",
                description: `Un problème est survenu lors de ${appointment ? 'la modification' : 'la prise'} du rendez-vous.`,
                variant: "destructive",
            });
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-[90vw] w-full sm:max-w-[600px] h-[90vh] sm:h-auto p-0">
                <ScrollArea className="h-full max-h-[90vh]">
                    <div className="p-6">
                        <DialogHeader>
                            <DialogTitle className="text-2xl font-light text-primary">
                                {appointment ? 'Modifier le rendez-vous' : 'Prendre rendez-vous'}
                            </DialogTitle>
                        </DialogHeader>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-6">

                            <div className="space-y-4">
                                <h3 className="text-sm font-medium text-primary">Informations personnelles</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <Input
                                            {...register("firstName", { required: true })}
                                            placeholder="Prénom"
                                            className="h-12"
                                        />
                                        {errors.firstName && (
                                            <span className="text-xs text-red-500 mt-1">Champ requis</span>
                                        )}
                                    </div>
                                    <div>
                                        <Input
                                            {...register("lastName", { required: true })}
                                            placeholder="Nom"
                                            className="h-12"
                                        />
                                        {errors.lastName && (
                                            <span className="text-xs text-red-500 mt-1">Champ requis</span>
                                        )}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <Input
                                            {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
                                            type="email"
                                            placeholder="Email"
                                            className="h-12"
                                        />
                                        {errors.email && (
                                            <span className="text-xs text-red-500 mt-1">Email invalide</span>
                                        )}
                                    </div>
                                    <div>
                                        <Input
                                            {...register("phone", { required: true })}
                                            type="tel"
                                            placeholder="Téléphone"
                                            className="h-12"
                                        />
                                        {errors.phone && (
                                            <span className="text-xs text-red-500 mt-1">Champ requis</span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Service */}
                            <div className="space-y-4">
                                <h3 className="text-sm font-medium text-primary">Service souhaité</h3>
                                <Select
                                    value={selectedService}
                                    onValueChange={(value) => {
                                        setSelectedService(value);
                                        setValue('service', value);
                                    }}
                                >
                                    <SelectTrigger className="h-12">
                                        <SelectValue placeholder="Choisir un service" />
                                    </SelectTrigger>
                                    <SelectContent position="popper" className="bg-white">
                                        {services.map((service) => (
                                            <SelectItem key={service.id} value={service.id}>
                                                {service.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.service && (
                                    <span className="text-xs text-red-500 mt-1">Veuillez choisir un service</span>
                                )}
                            </div>

                            {/* Date et Heure */}
                            <div className="space-y-4">
                                <h3 className="text-sm font-medium text-primary">Date et heure</h3>
                                <div className="bg-white border border-primary/10 rounded-lg p-4">
                                    <Calendar
                                        mode="single"
                                        selected={selectedDate}
                                        onSelect={setSelectedDate}
                                        locale={fr}
                                        disabled={(date) => {
                                            const day = date.getDay();
                                            return day === 0 || day === 6 || date < new Date();
                                        }}
                                        className="w-full"
                                    />
                                </div>

                                {selectedDate && (
                                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 mt-4">
                                        {timeSlots.map((time) => (
                                            <button
                                                key={time}
                                                type="button"
                                                onClick={() => {
                                                    setSelectedTime(time);
                                                    setValue('time', time);
                                                }}
                                                className={`p-2 text-sm border rounded-lg transition-colors ${selectedTime === time
                                                        ? "bg-primary text-white border-primary"
                                                        : "border-primary/10 hover:border-primary/20"
                                                    }`}
                                            >
                                                {time}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Message */}
                            <div className="space-y-4">
                                <h3 className="text-sm font-medium text-primary">Message (optionnel)</h3>
                                <textarea
                                    {...register("message")}
                                    placeholder="Informations complémentaires..."
                                    className="w-full h-24 p-4 bg-white border border-primary/10 rounded-lg resize-none focus:ring-1 focus:ring-primary/20"
                                />
                            </div>

                            {/* Actions */}
                            <div className="flex justify-end gap-4 pt-4 border-t border-primary/10">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={onClose}
                                    className="h-12 px-6"
                                >
                                    Annuler
                                </Button>
                                <Button
                                    type="submit"
                                    className="h-12 px-6"
                                >
                                    {appointment ? 'Modifier' : 'Confirmer'}
                                </Button>
                            </div>
                        </form>
                    </div>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
}