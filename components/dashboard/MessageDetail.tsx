import { Mail, Phone } from "lucide-react";
import { format } from 'date-fns';
import { fr } from 'date-fns/locale'; 
interface MessageDetailProps {
    message: {
      name: string;
      email: string;
      phone: string;
      object: string;
      message: string;
      createdAt: string;
    } | null;
  }
  
  export function MessageDetail({ message }: MessageDetailProps) {
    if (!message) {
      return (
        <div className="p-8 text-center text-gray-500">
          Sélectionnez un message pour voir les détails
        </div>
      );
    }
  
    return (
      <div className="p-6 space-y-6">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            {message.object}
          </h2>
          <div className="text-sm text-gray-500">
            De {message.name} • {format(new Date(message.createdAt), "d MMMM yyyy 'à' HH:mm", { locale: fr })}
          </div>
        </div>
  
        <div className="flex flex-col gap-2 text-sm">
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-gray-400" />
            <a href={`mailto:${message.email}`} className="text-primary hover:underline">
              {message.email}
            </a>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-gray-400" />
            <a href={`tel:${message.phone}`} className="text-primary hover:underline">
              {message.phone}
            </a>
          </div>
        </div>
  
        <div className="prose max-w-none">
          <p className="whitespace-pre-wrap text-gray-600">
            {message.message}
          </p>
        </div>
      </div>
    );
  }