"use client"

import { useMemo, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Cpu, Gauge, Network, Activity } from "lucide-react"
import { CPUChart } from "@/components/charts/cpu-chart"
import { MemoryChart } from "@/components/charts/memory-chart"
import { NetworkChart } from "@/components/charts/network-chart"
import { SystemHealthGauge } from "@/components/system-health-gauge"
import { PredictionCards } from "@/components/prediction-cards"
import { AIInsightsSidebar } from "@/components/ai-insights-sidebar"
import { AIVAChat } from "@/components/aiva-chat"
import { useMetricsStream } from "@/lib/mock-ws"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export default function DashboardPage() {
  const { data, healthScore } = useMetricsStream()
  const [predictionView, setPredictionView] = useState(false)
  const uptime = useMemo(() => "126 days 04:17:53", [])
  const processes = useMemo(() => 213 + Math.floor((data.cpu % 1) * 8), [data.cpu])

  return (
    <div className="container mx-auto px-6 py-10 md:py-12">
      <div className="mb-6 flex flex-col items-start justify-between gap-4 md:mb-8 md:flex-row md:items-center">
        <h2 className="text-2xl font-semibold">Live System Overview</h2>
        <div className="flex items-center gap-3">
          <Label htmlFor="view-toggle" className="text-muted-foreground">
            {predictionView ? "Prediction View" : "System View"}
          </Label>
          <Switch id="view-toggle" checked={predictionView} onCheckedChange={setPredictionView} />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        <Card className="glass">
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Cpu className="h-5 w-5 text-primary" /> CPU
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-2">
            <CPUChart data={data.history} showPrediction={predictionView} />
          </CardContent>
        </Card>

        <Card className="glass">
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" /> Memory
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-2">
            <MemoryChart data={data.history} showPrediction={predictionView} />
          </CardContent>
        </Card>

        <Card className="glass">
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Network className="h-5 w-5 text-primary" /> Network
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-2">
            <NetworkChart data={data.history} showPrediction={predictionView} />
          </CardContent>
        </Card>

        <Card className="glass xl:col-span-2">
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Gauge className="h-5 w-5 text-primary" /> System Health Score
            </CardTitle>
            <Button size="sm" variant="secondary" className="glass">
              Recalculate
            </Button>
          </CardHeader>
          <CardContent className="pt-2">
            <SystemHealthGauge score={healthScore} />
          </CardContent>
        </Card>

        <Card className="glass">
          <CardHeader>
            <CardTitle>Live Widgets</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <Widget label="Current Uptime" value={uptime} />
            <Widget label="Processes" value={String(processes)} />
            <Widget label="Disk I/O" value={`${(data.diskIO * 100).toFixed(0)} ops/s`} />
            <Widget label="Net Latency" value={`${(data.latency * 1000).toFixed(0)} ms`} />
          </CardContent>
        </Card>

        <PredictionCards className="xl:col-span-3" data={data.history} />
      </div>

      <AIInsightsSidebar data={data} />
      <AIVAChat data={data} />
    </div>
  )
}

function Widget({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-card/40 p-4 backdrop-blur">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="mt-1 text-xl font-semibold">{value}</div>
    </div>
  )
}
