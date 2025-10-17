"use client"

import { useState } from "react"
import { PanelRightClose, PanelRightOpen } from "lucide-react"
import { Button } from "@/components/ui/button"

export function AIInsightsSidebar({ data }: { data: any }) {
  const [open, setOpen] = useState(true)
  const hints = getHints(data)

  return (
    <aside
      className={`fixed bottom-4 right-4 z-30 w-[320px] transition-transform ${
        open ? "translate-x-0" : "translate-x-[calc(320px+1rem)]"
      }`}
      aria-label="AI Insights"
    >
      <div className="rounded-xl border border-white/10 bg-card/60 p-4 shadow-xl backdrop-blur">
        <div className="mb-3 flex items-center justify-between">
          <div className="text-sm font-medium">AI Insights</div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setOpen(false)}
            aria-label="Close insights"
            className="text-muted-foreground hover:text-foreground"
          >
            <PanelRightClose className="h-4 w-4" />
          </Button>
        </div>
        <ul className="space-y-2 text-sm text-muted-foreground">
          {hints.map((h: string, i: number) => (
            <li key={i} className="rounded-md border border-white/10 bg-card/40 p-2">
              {h}
            </li>
          ))}
        </ul>
      </div>

      {!open && (
        <button
          className="absolute -left-12 bottom-0 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-card/70 text-muted-foreground backdrop-blur hover:text-foreground"
          onClick={() => setOpen(true)}
          aria-label="Open insights"
        >
          <PanelRightOpen className="h-4 w-4" />
        </button>
      )}
    </aside>
  )
}

function getHints(data: any): string[] {
  const res: string[] = []
  if (data.mem > 70) res.push("Memory utilization is above normal thresholds.")
  if (data.cpu > 75) res.push("CPU nearing saturation; consider scaling compute.")
  if (data.latency * 1000 > 120) res.push("Network latency elevated; investigate upstream dependencies.")
  if (res.length === 0) res.push("All systems nominal. No anomalies detected.")
  return res
}
