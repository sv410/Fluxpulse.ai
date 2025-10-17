"use client"

import { useMetricsStream } from "@/lib/mock-ws"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CPUChart } from "@/components/charts/cpu-chart"
import { MemoryChart } from "@/components/charts/memory-chart"
import { NetworkChart } from "@/components/charts/network-chart"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { useState } from "react"

export function LivePreview() {
  const { data } = useMetricsStream()
  const [pred, setPred] = useState(true)

  return (
    <section className="container mx-auto px-6 pb-8 md:pb-14">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-2xl font-semibold">Live Preview</h3>
        <div className="flex items-center gap-2">
          <Label htmlFor="lp-pred" className="text-muted-foreground">
            {pred ? "Prediction On" : "Prediction Off"}
          </Label>
          <Switch id="lp-pred" checked={pred} onCheckedChange={setPred} />
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="glass">
          <CardHeader>
            <CardTitle>CPU</CardTitle>
          </CardHeader>
          <CardContent className="pt-2">
            <CPUChart data={data.history} showPrediction={pred} />
          </CardContent>
        </Card>
        <Card className="glass">
          <CardHeader>
            <CardTitle>Memory</CardTitle>
          </CardHeader>
          <CardContent className="pt-2">
            <MemoryChart data={data.history} showPrediction={pred} />
          </CardContent>
        </Card>
        <Card className="glass">
          <CardHeader>
            <CardTitle>Network</CardTitle>
          </CardHeader>
          <CardContent className="pt-2">
            <NetworkChart data={data.history} showPrediction={pred} />
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
