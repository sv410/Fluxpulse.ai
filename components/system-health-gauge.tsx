"use client"

import { RadialBar, RadialBarChart, ResponsiveContainer, PolarAngleAxis } from "recharts"

export function SystemHealthGauge({ score }: { score: number }) {
  const value = Math.max(0, Math.min(100, score))
  const data = [{ name: "health", value, fill: "hsl(var(--primary))" }]
  return (
    <div className="h-[240px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart innerRadius="70%" outerRadius="100%" startAngle={220} endAngle={-40} data={data}>
          <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
          <RadialBar dataKey="value" cornerRadius={10} background={{ fill: "hsl(var(--muted))", opacity: 0.2 }} />
        </RadialBarChart>
      </ResponsiveContainer>
      <div className="pointer-events-none -mt-32 text-center">
        <div className="text-4xl font-semibold">{value}%</div>
        <div className="text-xs text-muted-foreground">Overall health</div>
      </div>
    </div>
  )
}
