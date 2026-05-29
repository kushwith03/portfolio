import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/motion/SmoothScroll";
import Scene from "@/components/3d/Scene";
import CustomCursor from "@/components/motion/CustomCursor";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "R Khushwith Kumar | Software Engineer & AI Builder",
  description: "Architecting intelligent systems, scalable full-stack products, and production-ready software. Portfolio of R Khushwith Kumar, a CSE (Data Science) specialist.",
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
