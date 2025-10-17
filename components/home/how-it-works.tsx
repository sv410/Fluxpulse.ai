"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function HowItWorks() {
  return (
    <section className="container mx-auto px-6 py-14 md:py-20">
      <div className="mx-auto max-w-3xl text-center">
        <h3 className="text-pretty text-3xl font-semibold md:text-4xl">How it works</h3>
        <p className="mt-3 text-muted-foreground">
          From raw telemetry to actionable foresight: Data → AI Model → Prediction → Insights.
        </p>
      </div>

      <div className="mt-10 grid items-stretch gap-8 md:grid-cols-2">
        {/* Left: descriptive steps, now sleeker with subtle motion */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="rounded-2xl border border-white/10 bg-card/40 p-6 backdrop-blur transition-all duration-300 hover:border-white/20 hover:shadow-[0_0_40px_-8px_rgba(99,102,241,0.35)]"
        >
          <ol className="space-y-4 text-sm leading-relaxed text-muted-foreground">
            <li className="group rounded-xl p-3 transition-all duration-300 hover:bg-white/5">
              <span className="font-semibold text-foreground">Data ingestion</span> via agents streams CPU, memory,
              network, and disk signals in real time.
            </li>
            <li className="group rounded-xl p-3 transition-all duration-300 hover:bg-white/5">
              <span className="font-semibold text-foreground">AI modeling</span> learns time-series patterns,
              seasonality, and anomalies across your workloads.
            </li>
            <li className="group rounded-xl p-3 transition-all duration-300 hover:bg-white/5">
              <span className="font-semibold text-foreground">Predictions</span> estimate near‑term risk and expected
              spikes before they impact users.
            </li>
            <li className="group rounded-xl p-3 transition-all duration-300 hover:bg-white/5">
              <span className="font-semibold text-foreground">Insights</span> turn signals into clear actions to fix,
              scale, or optimize.
            </li>
          </ol>

          <div className="mt-6 flex items-center justify-between gap-3">
            <div className="text-xs text-muted-foreground">
              Live updates with simulated WebSocket + AI trend overlays.
            </div>
            <Button
              asChild
              className="btn-primary-glow rounded-full px-5 transition-all duration-300 hover:scale-[1.02]"
            >
              <Link href="/dashboard">
                <span className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(120px_60px_at_50%_0%,rgba(99,102,241,0.35),transparent)]" />
                View Dashboard
              </Link>
            </Button>
          </div>
        </motion.div>

        {/* Right: Animated neon flow replacing the image */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
          className="relative rounded-2xl border border-white/10 bg-card/40 p-6 backdrop-blur"
        >
          <div className="absolute -inset-6 -z-10 rounded-3xl bg-hero-glow opacity-70 blur-2xl" aria-hidden />

          <div className="space-y-4">
            {[
              { title: "Data", desc: "Metrics stream from agents in real time." },
              { title: "AI Model", desc: "Time-series learning detects patterns & drift." },
              { title: "Prediction", desc: "Short‑horizon forecasts highlight spikes & risk." },
              { title: "Insights", desc: "Clear, prioritized actions to optimize." },
            ].map((step, idx) => (
              <motion.div
                key={step.title}
                whileHover={{ y: -2, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="group relative overflow-hidden rounded-xl border border-white/10 bg-black/30 p-4 transition-all duration-300 hover:border-white/20"
              >
                <div className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="absolute inset-0 bg-[radial-gradient(80px_40px_at_10%_0%,rgba(99,102,241,0.25),transparent),radial-gradient(120px_60px_at_90%_100%,rgba(14,165,233,0.25),transparent)]" />
                </div>

                <div className="flex items-center gap-3">
                  <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/5 text-xs font-medium text-foreground ring-1 ring-white/10">
                    {idx + 1}
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-base font-semibold">{step.title}</h4>
                      <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] uppercase tracking-wide text-foreground/80">
                        live
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">{step.desc}</p>
                  </div>
                </div>

                {idx < 3 && (
                  <div
                    aria-hidden
                    className="mt-4 h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  />
                )}
              </motion.div>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-end">
            <Button
              asChild
              variant="secondary"
              className="glass rounded-full transition-all duration-300 hover:scale-105"
            >
              <Link href="/about">Learn the stack</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
