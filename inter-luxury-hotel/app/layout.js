import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { DataProvider } from "@/context/DataContext";
import { CartProvider } from "@/context/CartContext";
import { UIProvider } from "@/context/UIContext";

export const metadata = {
  title: "Inter Luxury Hotel & Restaurant — Addis Ababa",
  description:
    "A 5-star hotel management experience in Addis Ababa. Book rooms, order from our restaurant menu, and manage your stay — Ethiopian heritage meets world-class hospitality.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,300;0,400;0,500;0,600;0,700;0,900;1,400;1,500&family=Manrope:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-ink text-cream font-body">
        <AuthProvider>
          <DataProvider>
            <CartProvider>
              <UIProvider>{children}</UIProvider>
            </CartProvider>
          </DataProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
