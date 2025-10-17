"use client"

import useSWR from "swr"
import { motion } from "framer-motion"
import { Zap, AlertTriangle, CheckCircle2, Info } from "lucide-react"

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export default function InsightsSidebar() {
  const { data, isLoading } = useSWR("/api/insights", fetcher, {
    refreshInterval: 5000, // Reduced from 10s to 5s for faster updates
    revalidateOnFocus: false,
  })

  const items = data?.insights ?? []

  const getIcon = (severity: string) => {
    switch (severity) {
      case "alert":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      case "warn":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      case "success":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />
      default:
        return <Info className="h-4 w-4 text-blue-500" />
    }
  }

  return (
    <aside className="w-full lg:w-80 glass rounded-2xl p-5 mt-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-[color:var(--color-brand)]" />
          <h3 className="text-base font-semibold">AI Insights</h3>
        </div>
        <span className="inline-flex items-center gap-2 text-[color:var(--color-brand)] text-xs">
          <span className="w-2 h-2 rounded-full bg-[color:var(--color-brand)] animate-pulse" />
          Live
        </span>
      </div>

      <ul className="mt-4 space-y-3">
        {isLoading ? (
          <li className="text-xs text-muted-foreground animate-pulse">Loading insights...</li>
        ) : items.length === 0 ? (
          <li className="text-xs text-muted-foreground">No insights available</li>
        ) : (
          items.map((it: any, idx: number) => (
            <motion.li
              key={it.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.3 }}
              className="rounded-lg ring-1 ring-[color:var(--color-surface-2)]/60 p-3 bg-[color:var(--color-surface-2)]/50 hover:bg-[color:var(--color-surface-2)]/70 transition-colors"
            >
              <div className="flex items-start gap-2">
                {getIcon(it.severity)}
                <div className="flex-1">
                  <div className="text-xs uppercase tracking-wide text-muted-foreground font-medium">{it.severity}</div>
                  <div className="text-sm mt-1 leading-snug">{it.text}</div>
                  {it.action && (
                    <button className="mt-2 text-xs font-medium text-[color:var(--color-brand)] hover:underline">
                      {it.action} →
                    </button>
                  )}
                </div>
              </div>
            </motion.li>
          ))
        )}
      </ul>
    </aside>
  )
}
