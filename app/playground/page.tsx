"use client"

import { useState } from "react"
import useSWRMutation from "swr/mutation"
import { motion } from "framer-motion"

async function predictFetcher(url: string, { arg }: { arg: any }) {
  const res = await fetch(url, { method: "POST", body: JSON.stringify(arg) })
  return res.json()
}

export default function PlaygroundPage() {
  const [cpu, setCpu] = useState(45)
  const [mem, setMem] = useState(52)
  const { trigger, data, isMutating } = useSWRMutation("/api/predict", predictFetcher)

  const submit = () => trigger({ cpu, mem })

  const health = Math.max(0, 100 - Math.round((cpu + mem) / 2))
  const risk = data?.risk ?? 100 - health

  return (
    <main className="min-h-[calc(100svh-64px)] bg-background text-foreground">
      <div className="container mx-auto px-6 max-w-6xl py-10 md:py-14">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-5xl font-semibold text-balance">Playground</h1>
          <p className="mt-3 text-muted-foreground max-w-2xl">
            Simulate workload to see how AI forecasts spikes and risks. Move sliders and request a prediction.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="glass rounded-2xl p-6">
            <label className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">CPU Load</span>
              <span className="font-semibold">{cpu}%</span>
            </label>
            <input
              type="range"
              min={0}
              max={100}
              value={cpu}
              onChange={(e) => setCpu(Number(e.target.value))}
              className="w-full mt-2 accent-[color:var(--color-brand)]"
            />

            <label className="flex items-center justify-between mt-6">
              <span className="text-sm text-muted-foreground">Memory Load</span>
              <span className="font-semibold">{mem}%</span>
            </label>
            <input
              type="range"
              min={0}
              max={100}
              value={mem}
              onChange={(e) => setMem(Number(e.target.value))}
              className="w-full mt-2 accent-[color:var(--color-brand)]"
            />

            <div className="mt-6 flex gap-3">
              <button onClick={submit} className="btn-primary" disabled={isMutating}>
                {isMutating ? "Predicting..." : "Predict"}
              </button>
              <a href="/dashboard" className="btn-ghost">
                Open Dashboard
              </a>
            </div>
          </div>

          <div className="glass rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-muted-foreground">System Health Score</div>
                <div className="text-2xl font-semibold">{health}</div>
              </div>
              <div className="inline-flex items-center gap-2 text-[color:var(--color-brand)]">
                <span className="w-2 h-2 rounded-full animate-pulse bg-[color:var(--color-brand)]" />
                Live
              </div>
            </div>

            <div className="mt-6 grid md:grid-cols-2 gap-6">
              <div className="rounded-xl ring-1 ring-[color:var(--color-surface-2)]/60 p-5 bg-[color:var(--color-surface-2)]/50">
                <div className="text-sm text-muted-foreground">Predicted CPU Spike</div>
                <div className="text-xl font-semibold">{data?.cpuSpike ?? "—"}%</div>
              </div>
              <div className="rounded-xl ring-1 ring-[color:var(--color-surface-2)]/60 p-5 bg-[color:var(--color-surface-2)]/50">
                <div className="text-sm text-muted-foreground">Predicted Memory Spike</div>
                <div className="text-xl font-semibold">{data?.memSpike ?? "—"}%</div>
              </div>
              <div className="rounded-xl ring-1 ring-[color:var(--color-surface-2)]/60 p-5 bg-[color:var(--color-surface-2)]/50">
                <div className="text-sm text-muted-foreground">Risk</div>
                <div className="text-xl font-semibold">{risk}%</div>
              </div>
              <div className="rounded-xl ring-1 ring-[color:var(--color-surface-2)]/60 p-5 bg-[color:var(--color-surface-2)]/50">
                <div className="text-sm text-muted-foreground">Time to Impact</div>
                <div className="text-xl font-semibold">{data?.eta ?? "—"}</div>
              </div>
            </div>

            <div
              className="mt-8 h-40 rounded-xl ring-1 ring-[color:var(--color-surface-2)]/60 bg-[conic-gradient(from_180deg_at_50%_50%,_var(--color-brand)_0%_calc(var(--p)*1%),_transparent_calc(var(--p)*1%))] flex items-center justify-center"
              style={{ ["--p" as any]: `${100 - risk}` }}
            >
              <span className="text-muted-foreground text-sm">{"Radial score visualization"}</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
