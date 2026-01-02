import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Professional Portfolio",
  description: "Interactive Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                function getInitialTheme() {
                  try {
                    const theme = localStorage.getItem('theme');
                    if (theme) return theme;
                    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                  } catch (e) {
                    return 'light';
                  }
                }
                const theme = getInitialTheme();
                if (theme === 'dark') {
                  document.documentElement.classList.add('dark');
                }
              })()
            `,
          }}
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}