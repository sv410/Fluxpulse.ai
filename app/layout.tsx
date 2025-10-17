import type React from "react"
import type { Metadata } from "next"
import { Space_Grotesk, JetBrains_Mono } from "next/font/google"
import "./globals.css"
import { SiteNav } from "@/components/site-nav"
import { SiteFooter } from "@/components/site-footer"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
})
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
})

export const metadata: Metadata = {
  title: "FluxPulse AI — Real-Time System Monitoring with AI Predictions",
  description: "Track, predict, and optimize your system’s performance with AI precision.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`dark ${spaceGrotesk.variable} ${jetbrainsMono.variable} antialiased`}>
      <body className="font-sans bg-background text-foreground">
        {/* Background gradient and subtle grid lines */}
        <div aria-hidden className="fixed inset-0 -z-10 bg-hero-gradient" />
        <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 bg-hero-lines" />
        <div className="min-h-dvh flex flex-col">
          <SiteNav />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </div>
        {/* Analytics */}
      </body>
    </html>
  )
}
