import type { Metadata } from "next";
import { Fredoka } from "next/font/google";
import Footer from "@/components/Footer";
import AppHeader from "@/components/AppHeader";
import "./globals.css";

const fredoka = Fredoka({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-fredoka",
});

export const metadata: Metadata = {
  title: "MyRetroKit.in",
  description: "Smart Home Retrofitting",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={fredoka.variable}>
      {/*
        Body bg matches the warm midtone of BG_Cropped.png so even if
        a browser has a 1-px rounding gap it is invisible.
      */}
      <body className="font-fredoka text-black m-0 bg-[#B8A68A] min-h-screen overflow-x-hidden">

        {/* ─── FIXED FULL-VIEWPORT BACKGROUND ──────────────────────────
            position:fixed + inset-0 means it NEVER moves, even on scroll.
            The img uses object-fit:cover to fill 100% × 100% exactly.
            Using transform: scale(1.08) zooms the image 8% to crop out the white/black frame
            that Canva baked into the exported PNG file's pixels.
        ──────────────────────────────────────────────────────────────── */}
        <div
          className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
          aria-hidden="true"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/BG_Cropped.png"
            alt=""
            style={{
              display: "block",
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center center",
              opacity: 0.42,
              mixBlendMode: "multiply",
              transform: "scale(1.15)",
              transformOrigin: "center center",
            }}
          />
        </div>

        {/* ─── PAGE SHELL (scrolls over the fixed background) ─────────── */}
        <div className="relative z-10 flex flex-col min-h-screen w-full">
          <main className="flex-grow flex flex-col w-full">
            <AppHeader />
            <div className="flex-grow flex flex-col">
              {children}
            </div>
          </main>

          {/* Footer */}
          <div className="w-full bg-white/95">
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}