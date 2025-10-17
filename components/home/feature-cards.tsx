"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Cpu, Activity, Network, BrainCircuit } from "lucide-react"

const features = [
  {
    icon: Cpu,
    title: "Real-Time CPU",
    desc: "Sub-second visibility into core loads with anomaly highlighting.",
  },
  {
    icon: Activity,
    title: "Memory Insights",
    desc: "Understand allocation trends and pre-empt saturation.",
  },
  {
    icon: Network,
    title: "Network Pulse",
    desc: "Live throughput, latency, and burst detection.",
  },
  {
    icon: BrainCircuit,
    title: "AI Predictions",
    desc: "Forecast spikes and risks with rolling trend models.",
  },
]

export function Features() {
  return (
    <section className="container mx-auto px-6 py-14 md:py-20">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-pretty text-3xl font-semibold md:text-4xl">Built for speed, clarity, and foresight</h2>
        <p className="mt-3 text-muted-foreground">
          FluxPulse AI surfaces live metrics and predicts what happens next—so you can act before incidents.
        </p>
      </div>
      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {features.map((f) => (
          <Card
            key={f.title}
            className="glass rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_40px_-8px_rgba(99,102,241,0.35)] hover:border-white/20"
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <f.icon className="h-5 w-5 text-primary" />
                {f.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
