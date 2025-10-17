"use client"

import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, CartesianGrid, Area } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

type Point = { t: number; net: number; net_pred?: number }

export function NetworkChart({ data, showPrediction }: { data: Point[]; showPrediction: boolean }) {
  return (
    <ChartContainer
      config={{
        net: { label: "Network", color: "hsl(var(--chart-3))" },
        net_pred: { label: "Network (Pred)", color: "hsl(var(--chart-4))" },
      }}
      className="h-[220px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 8, right: 12, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" opacity={0.25} />
          <XAxis dataKey="t" tickLine={false} axisLine={false} />
          <YAxis domain={[0, 100]} tickLine={false} axisLine={false} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Area type="monotone" dataKey="net" stroke="var(--color-net)" fill="var(--color-net)" fillOpacity={0.12} />
          <Line type="monotone" dataKey="net" stroke="var(--color-net)" strokeWidth={2} dot={false} />
          {showPrediction && (
            <Line
              type="monotone"
              dataKey="net_pred"
              stroke="var(--color-net_pred)"
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
