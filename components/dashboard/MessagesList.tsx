"use client";

import { useState } from "react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Mail, Phone, Calendar } from "lucide-react";

interface Message {
  _id: string;
  name: string;
  email: string;
  phone: string;
  object: string;
  message: string;
  createdAt: string;
}

interface MessagesListProps {
  messages: Message[];
  onSelectMessage: (message: Message) => void;
}

export function MessagesList({ messages, onSelectMessage }: MessagesListProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <div className="divide-y">
      {messages.map((message) => (
        <div
          key={message._id}
          className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
            selectedId === message._id ? "bg-gray-50" : ""
          }`}
          onClick={() => {
            setSelectedId(message._id);
            onSelectMessage(message);
          }}
        >
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-medium text-gray-900">{message.object}</h3>
            <span className="text-sm text-gray-500">
              {format(new Date(message.createdAt), "d MMMM yyyy", { locale: fr })}
            </span>
          </div>
          
          <div className="mb-2 text-sm font-medium text-gray-600">
            {message.name}
          </div>
          
          <div className="flex flex-wrap gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <Mail className="w-4 h-4" />
              {message.email}
            </div>
            <div className="flex items-center gap-1">
              <Phone className="w-4 h-4" />
              {message.phone}
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {format(new Date(message.createdAt), "HH:mm")}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}