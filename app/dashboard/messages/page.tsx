"use client";

import { useState, useEffect } from "react";
import { MessagesList } from "@/components/dashboard/MessagesList";
import { MessageDetail } from "@/components/dashboard/MessageDetail";
import { toast } from "react-hot-toast";

interface Message {
  _id: string;
  name: string;
  email: string;
  phone: string;
  object: string;
  message: string;
  createdAt: string;
}

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await fetch('/api/messages');
      if (!response.ok) throw new Error('Erreur lors du chargement');
      const data = await response.json();
      setMessages(data);
    } catch (error) {
      toast.error("Erreur lors du chargement des messages");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div className="p-8 text-center">Chargement...</div>;
  }

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      <div className="w-1/3 border-r overflow-y-auto">
        <MessagesList 
          messages={messages}
          onSelectMessage={setSelectedMessage}
        />
      </div>
      <div className="flex-1 overflow-y-auto bg-gray-50">
        <MessageDetail message={selectedMessage} />
      </div>
    </div>
  );
}