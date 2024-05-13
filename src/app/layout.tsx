import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { RestaurantsProvider } from '@/context/RestaurantContext';
import { AuthProvider } from "@/context/AuthContext";
import "./globals.css";
import '@smastrom/react-rating/style.css';
import { StrictMode } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Restaurants",
  description: "Web app to find new restaurants",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StrictMode>
          <AuthProvider>
            <RestaurantsProvider>
              {children}
            </RestaurantsProvider>
          </AuthProvider>
        </StrictMode>
      </body>
    </html>
  );
}
