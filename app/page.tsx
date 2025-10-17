"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import { Features } from "@/components/home/feature-cards"
import { LivePreview } from "@/components/home/live-preview"
import { HowItWorks } from "@/components/home/how-it-works"
import { TrustBar } from "@/components/home/trust-bar"
import { WaitlistCTA } from "@/components/home/waitlist-cta"
import PlaygroundTeaser from "@/components/home/playground-teaser" // import teaser
import { RadialScore } from "@/components/home/radial-score" // Import RadialScore component

export default function HomePage() {
  return (
    <section className="relative overflow-hidden">
      {/* Decorative glow under hero to mimic reference aesthetic */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-[20%] mx-auto h-[420px] w-[900px] rounded-[40px] bg-hero-glow blur-3xl opacity-70"
      />
      <div className="container mx-auto px-6 py-20 md:py-28">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="mx-auto mb-4 inline-flex items-center rounded-full border border-white/10 bg-card/30 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-primary/80 mr-2 shadow-[0_0_10px] shadow-primary/60" />
            Beta preview — FluxPulse AI
          </div>

          <h1 className="text-pretty text-4xl font-semibold tracking-tight md:text-6xl">
            Real-Time System Monitoring with AI Predictions
          </h1>
          <p className="mt-4 text-balance text-muted-foreground md:text-lg">
            Track, Predict, and Optimize Your System’s Performance with AI Precision.
          </p>

          <div className="mt-8 flex items-center justify-center gap-3">
            <Button asChild size="lg" className="btn-primary-glow">
              <Link href="/dashboard">
                View Dashboard
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="secondary" className="glass">
              <Link href="/about">Get Started</Link>
            </Button>
          </div>

          {/* Reference-style glossy panel */}
          <div className="mt-16 rounded-2xl border border-white/10 bg-card/30 p-0.5 backdrop-blur">
            <div className="rounded-2xl bg-card/60 p-6 md:p-10">
              <div className="grid gap-6 md:grid-cols-3">
                <Stat label="Uptime" value="99.98%" />
                <Stat label="Avg CPU" value="37%" />
                <Stat label="Active Processes" value="214" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Optional: overlay the provided reference image as a subtle, low-opacity decorative asset */}
        <div className="sr-only">
          <Image
            src="/images/reference-hero.png"
            alt="Design reference mockup with sleek gradient"
            width={400}
            height={300}
          />
        </div>
      </div>

      <Features />
      <LivePreview />
      <section className="container mx-auto px-6 py-16 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl border border-white/10 bg-card/40 p-8 backdrop-blur md:p-12"
        >
          <h2 className="text-center text-2xl font-semibold md:text-3xl">System Health at a Glance</h2>
          <p className="mt-2 text-center text-muted-foreground">
            Real-time performance metrics visualized with our advanced radial scoring system.
          </p>
          <div className="mt-10 flex justify-center">
            <RadialScore score={87} />
          </div>
        </motion.div>
      </section>
      <PlaygroundTeaser />
      <HowItWorks />
      <TrustBar />
      <WaitlistCTA />
    </section>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-card/40 p-5 text-center backdrop-blur-sm">
      <div className="text-sm text-muted-foreground">{label}</div>
      <div className="mt-1 text-2xl font-semibold">{value}</div>
    </div>
  )
}
