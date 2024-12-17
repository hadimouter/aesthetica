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
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2">
            <h3 className="font-medium text-gray-900 text-base sm:text-lg">{message.object}</h3>
            <span className="text-sm text-gray-500">
              {format(new Date(message.createdAt), "d MMMM yyyy", { locale: fr })}
            </span>
          </div>

          {/* Name */}
          <div className="mb-2 text-sm font-medium text-gray-600">{message.name}</div>

          {/* Contact details */}
          <div className="flex flex-col sm:flex-row sm:flex-wrap sm:gap-4 gap-2 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 shrink-0" />
              <span className="truncate">{message.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 shrink-0" />
              <span className="truncate">{message.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 shrink-0" />
              <span>{format(new Date(message.createdAt), "HH:mm")}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}