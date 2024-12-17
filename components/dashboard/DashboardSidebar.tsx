"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Calendar,
  FileText,
  MessageSquare,
  ScrollText,
  ClipboardList,
  User,
  Menu,
  X,
  LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavigationItem {
  title: string;
  href: string;
  icon: LucideIcon;
  description: string;
}

interface NavigationItemProps {
  item: NavigationItem;
  isActive: boolean;
  isMobile: boolean;
  onClick?: () => void;
}

const navigationItems = [
  {
    title: "Tableau de bord",
    href: "/dashboard",
    icon: LayoutDashboard,
    description: "Vue d'ensemble de votre compte",
  },
  {
    title: "Rendez-vous",
    href: "/dashboard/appointments",
    icon: Calendar,
    description: "Gérer vos rendez-vous",
  },
  {
    title: "Documents",
    href: "/dashboard/documents",
    icon: FileText,
    description: "Accéder à vos documents",
  },
  {
    title: "Messages",
    href: "/dashboard/messages",
    icon: MessageSquare,
    description: "Centre de messagerie",
  },
  {
    title: "Ordonnances",
    href: "/dashboard/prescriptions",
    icon: ScrollText,
    description: "Vos ordonnances médicales",
  },
  {
    title: "Suivi médical",
    href: "/dashboard/medical-records",
    icon: ClipboardList,
    description: "Historique médical",
  },
  {
    title: "Mon profil",
    href: "/dashboard/profile",
    icon: User,
    description: "Gérer votre profil",
  },
];

// Composant NavigationItem
const NavigationItem = ({ item, isActive, isMobile, onClick }: NavigationItemProps) => (
  <Link
    href={item.href}
    onClick={onClick} // Gestion du clic pour fermer le menu mobile
    className={cn(
      "flex items-center gap-3 rounded-lg transition-colors",
      isMobile ? "p-4" : "px-3 py-2",
      isActive
        ? "bg-primary/10 text-primary font-medium"
        : "text-primary/60 hover:text-primary hover:bg-primary/5"
    )}
  >
    <item.icon className="w-5 h-5 shrink-0" />
    <div className="flex flex-col">
      <span className={cn("text-sm", isMobile && "font-medium")}>{item.title}</span>
      {isMobile && (
        <span className="text-xs text-muted-foreground">{item.description}</span>
      )}
    </div>
  </Link>
);

// Sidebar responsive
export function DashboardSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Version mobile
  const MobileNav = () => (
    <div className="lg:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 right-4 z-50 p-2 bg-white rounded-lg shadow-md"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>
  
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-white flex flex-col">
          {/* Navigation */}
          <nav className="pt-16 p-4 space-y-2 h-full overflow-y-auto flex-grow">
            {navigationItems.map((item) => (
              <NavigationItem
                key={item.href}
                item={item}
                isActive={pathname === item.href}
                isMobile={true}
                onClick={() => setIsOpen(false)} // Ferme le menu après clic
              />
            ))}
          </nav>
  
          {/* Bouton de déconnexion */}
          <div className="p-4 border-t border-primary/10">
            <Button
              variant="ghost"
              size="icon"
              className="w-full justify-center"
              onClick={() => {
                setIsOpen(false); // Ferme le menu
                signOut(); // Déconnexion
              }}
            >
              <LogOut className="w-5 h-5 text-primary/70" />
              <span className="ml-2">Déconnexion</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );

  // Version desktop
  const DesktopNav = () => (
    <div className="hidden lg:flex flex-col w-64 border-r border-primary/10 bg-white min-h-screen">
      {/* Navigation */}
      <nav className="p-4 space-y-2 ">
        {navigationItems.map((item) => (
          <NavigationItem
            key={item.href}
            item={item}
            isActive={pathname === item.href}
            isMobile={false}
          />
        ))}
      </nav>
  
      {/* Bouton de déconnexion */}
      <div className="p-4 border-t border-primary/10">
        <Button
          variant="ghost"
          size="icon"
          className="w-full justify-center"
          onClick={() => signOut()}
        >
          <LogOut className="w-5 h-5 text-primary/70" />
          <span className="ml-2">Déconnexion</span>
        </Button>
      </div>
    </div>
  );

  return (
    <>
      <MobileNav />
      <DesktopNav />
    </>
  );
}