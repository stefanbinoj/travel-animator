"use client";
import "./globals.css";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/animator/app-sidebar";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "@/components/animator/navbar";
import { useEffect, useState } from "react";
import MobileScreen from "@/components/animator/modals/mobileModal";

const MOBILE_MAX_WIDTH = 768;

const metadata: Metadata = {
  title: "Travel Animator",
  description: "Showcase you journey with Travel Animator",
  icons: {
    icon: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [viewportWidth, setViewportWidth] = useState<number | undefined>(
    undefined
  );
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    function handleResize() {
      const currentWidth = window.innerWidth;
      setViewportWidth(currentWidth);
      setIsMobile(currentWidth <= MOBILE_MAX_WIDTH);
    }

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isMobile) {
    return (
      <html>
        <body>
          <MobileScreen />;
        </body>
      </html>
    );
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <div className="relative flex min-h-screen flex-col">
            <Navbar />
            <SidebarProvider>
              <div className="flex flex-1 overflow-hidden">
                <AppSidebar />
                <main className="flex-1 overflow-y-auto rounded-4xl">
                  {children}
                </main>
                <Toaster />
              </div>
            </SidebarProvider>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
