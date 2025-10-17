import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-6 py-12">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-semibold">How FluxPulse AI Works</h2>
        <p className="mt-3 text-muted-foreground">
          We analyze high-frequency telemetry to identify behavioral patterns, forecast short‑term trends, and surface
          actionable insights before incidents occur.
        </p>
      </div>

      <div className="mx-auto mt-10 max-w-5xl rounded-2xl border border-white/10 bg-card/40 p-6 backdrop-blur">
        <FlowChart />
      </div>

      <div className="mx-auto mt-12 grid max-w-4xl gap-6 md:grid-cols-3">
        <TechCard title="Node.js">Ingest metrics and serve live updates over WebSocket.</TechCard>
        <TechCard title="Python">Train and evaluate forecasting models for trend and anomaly detection.</TechCard>
        <TechCard title="WebSocket">
          Reliable, low-latency channel carrying metrics and AI predictions to the dashboard.
        </TechCard>
      </div>
    </div>
  )
}

function TechCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Card className="glass">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground">{children}</CardContent>
    </Card>
  )
}

function FlowChart() {
  return (
    <div className="grid items-center gap-6 md:grid-cols-4">
      <Step title="Data" desc="CPU, memory, network, disk" />
      <Arrow />
      <Step title="AI Model" desc="Forecast + anomaly scoring" />
      <Arrow />
      <Step title="Prediction" desc="Short‑term spikes & risks" />
      <Arrow />
      <Step title="Insights" desc="Actions & recommendations" />
    </div>
  )
}

function Step({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-card/50 p-4 text-center backdrop-blur">
      <div className="text-sm text-primary">{title}</div>
      <div className="mt-1 text-xs text-muted-foreground">{desc}</div>
    </div>
  )
}

function Arrow() {
  return (
    <div className="flex items-center justify-center">
      <span
        aria-hidden
        className="inline-block h-1 w-10 rounded-full bg-primary/60 shadow-[0_0_12px] shadow-primary/40"
      />
    </div>
  )
}
