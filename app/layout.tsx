import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/motion/SmoothScroll";
import Scene from "@/components/3d/Scene";

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
        {/* Cinematic Grain Overlay */}
        <div className="fixed inset-0 pointer-events-none z-[999] opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-100 contrast-150" />
        
        <SmoothScroll>
          <Scene />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
