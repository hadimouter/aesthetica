// app/layout.tsx
import { Inter } from 'next/font/google';
import { Toaster } from "@/components/ui/toaster";
import AuthProvider from "@/providers/AuthProvider";
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
 children,
}: {
 children: React.ReactNode;
}) {
 return (
   <html lang="fr">
     <body className={inter.className}>
       <AuthProvider>
         {children}
         <Toaster />
       </AuthProvider>
     </body>
   </html>
 );
}