"use client"

import { Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Area } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

type Point = { t: number; cpu: number; cpu_pred?: number }

export function CPUChart({ data, showPrediction }: { data: Point[]; showPrediction: boolean }) {
  return (
    <ChartContainer
      config={{
        cpu: { label: "CPU", color: "hsl(var(--chart-1))" },
        cpu_pred: { label: "CPU (Pred)", color: "hsl(var(--chart-4))" },
      }}
      className="h-[220px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 8, right: 12, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" opacity={0.25} />
          <XAxis dataKey="t" tickLine={false} axisLine={false} />
          <YAxis domain={[0, 100]} tickLine={false} axisLine={false} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Area type="monotone" dataKey="cpu" stroke="var(--color-cpu)" fill="var(--color-cpu)" fillOpacity={0.12} />
          <Line type="monotone" dataKey="cpu" stroke="var(--color-cpu)" strokeWidth={2} dot={false} />
          {showPrediction && (
            <Line
              type="monotone"
              dataKey="cpu_pred"
              stroke="var(--color-cpu_pred)"
              strokeDasharray="5 5"
              strokeWidth={2}
              dot={false}
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
