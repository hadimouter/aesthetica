"use client";

import { Button } from "@/components/ui/button";
import { useSession, signOut } from "next-auth/react";
import { LogOut, Bell, Settings } from "lucide-react";

export function DashboardNav() {
  const { data: session } = useSession();

  return (
    <header className="h-16 border-b border-primary/10 bg-white">
      <div className="h-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="text-xl font-light text-primary">AESTHETICA</div>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon">
            <Bell className="w-5 h-5 text-primary/70" />
          </Button>
          <Button variant="ghost" size="icon">
            <Settings className="w-5 h-5 text-primary/70" />
          </Button>
          <div className="h-6 w-px bg-primary/10" />
          <div className="text-sm text-primary">
            {session?.user?.name}
          </div>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => signOut()}
          >
            <LogOut className="w-5 h-5 text-primary/70" />
          </Button>
        </div>
      </div>
    </header>
  );
}