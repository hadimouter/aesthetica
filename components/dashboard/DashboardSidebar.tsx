// components/dashboard/DashboardSidebar.tsx
"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Calendar,
  FileText,
  MessageSquare,
  ScrollText,
  ClipboardList,
  User
} from "lucide-react";

const sidebarItems = [
  {
    title: "Tableau de bord",
    href: "/dashboard",
    icon: LayoutDashboard
  },
  {
    title: "Rendez-vous",
    href: "/dashboard/appointments",
    icon: Calendar
  },
  {
    title: "Documents",
    href: "/dashboard/documents",
    icon: FileText
  },
  {
    title: "Messages",
    href: "/dashboard/messages",
    icon: MessageSquare
  },
  {
    title: "Ordonnances",
    href: "/dashboard/prescriptions",
    icon: ScrollText
  },
  {
    title: "Suivi médical",
    href: "/dashboard/medical-records",
    icon: ClipboardList
  },
  {
    title: "Mon profil",
    href: "/dashboard/profile",
    icon: User
  }
];

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r border-primary/10 bg-white min-h-[calc(100vh-4rem)]">
      <nav className="p-4 space-y-2">
        {sidebarItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
                isActive 
                  ? "bg-primary/5 text-primary font-medium" 
                  : "text-primary/60 hover:text-primary hover:bg-primary/5"
              )}
            >
              <item.icon className="w-5 h-5" />
              {item.title}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}