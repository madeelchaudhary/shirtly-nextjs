import Footer from "@/components/Footer";
import "./globals.css";
import { Montserrat, Inter } from "next/font/google";
import Navbar from "@/components/nav/navbar";
import StoreProvider from "./StoreProvider";
import AuthProvider from "./AuthProvider";
import ToastContainerClient from "./ToastContainerClient";

const montserrat = Montserrat({
  subsets: ["latin"],
});
const inter = Inter({
  subsets: ["latin"],
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const fontVariables: any = {
    "--font-montserrat": montserrat.style.fontFamily,
    "--font-inter": inter.style.fontFamily,
  };
  return (
    <html lang="en">
      <StoreProvider>
        <AuthProvider>
          <body style={fontVariables}>
            <ToastContainerClient />
            <Navbar />
            {children}
            <Footer />
          </body>
        </AuthProvider>
      </StoreProvider>
    </html>
  );
}
