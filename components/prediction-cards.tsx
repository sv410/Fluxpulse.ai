import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

type Point = { t: number; cpu: number; mem: number; net: number }
export function PredictionCards({ className, data }: { className?: string; data: Point[] }) {
  const last = data.at(-1) ?? { cpu: 40, mem: 60, net: 30 }
  const predictions = [
    {
      title: "CPU usage",
      text: `Expected to spike by 12–18% in next 10 mins`,
      score: last.cpu + 15,
    },
    {
      title: "Memory utilization",
      text: `Above normal thresholds; consider scaling memory-bound services`,
      score: last.mem + 8,
    },
    {
      title: "Network throughput",
      text: `Burst likely due to scheduled jobs; monitor egress`,
      score: last.net + 10,
    },
  ]

  return (
    <div className={cn("grid gap-6 md:grid-cols-3", className)}>
      {predictions.map((p, i) => (
        <Card key={i} className="glass border-white/10">
          <CardHeader>
            <CardTitle>{p.title}</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            <div className="mb-2 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-primary shadow-[0_0_10px] shadow-primary/60" />
              Trend: {p.score.toFixed(0)}%
            </div>
            <p>{p.text}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
