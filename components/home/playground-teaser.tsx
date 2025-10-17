"use client"

import { motion } from "framer-motion"

export default function PlaygroundTeaser() {
  return (
    <section className="relative py-20 md:py-24 bg-background text-foreground">
      <div className="absolute inset-0 pointer-events-none [mask-image:radial-gradient(60%_60%_at_50%_20%,#000_40%,transparent_100%)]">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-80 w-[70rem] rounded-full blur-[72px] opacity-40 brand-glow" />
      </div>
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-5xl font-semibold text-balance">
              Try the Playground and see predictions instantly
            </h2>
            <p className="mt-4 text-muted-foreground">
              Drag sliders to simulate load and watch AI forecast spikes, risk, and time-to-impact in real time.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a className="btn-primary" href="/playground" aria-label="Open Playground">
                Open Playground
              </a>
              <a className="btn-ghost" href="/about" aria-label="Learn about our models">
                Learn more
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="glass rounded-2xl p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-muted-foreground">Predicted CPU Spike</div>
                <div className="text-2xl font-semibold">+14% in 10m</div>
              </div>
              <div className="inline-flex items-center gap-2 text-[color:var(--color-brand)]">
                <span className="w-2 h-2 rounded-full animate-pulse bg-[color:var(--color-brand)]" />
                Live
              </div>
            </div>
            <div className="mt-6 h-24 rounded-lg bg-[color:var(--color-surface-2)]/60 ring-1 ring-[color:var(--color-surface-2)]/60 flex items-center justify-center text-muted-foreground">
              {"Minimal preview area — charts render in Playground"}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
