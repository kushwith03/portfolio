import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/motion/SmoothScroll";
import Scene from "@/components/3d/Scene";
import CustomCursor from "@/components/motion/CustomCursor";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Neural Architect | R Khushwith Kumar",
  description: "Cinematic Interactive Portfolio Experience",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-[#050505] text-white antialiased overflow-x-hidden`}>
        <CustomCursor />
        <SmoothScroll>
          <Scene />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
