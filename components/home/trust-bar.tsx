"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface SystemMetric {
  label: string
  value: string
  unit?: string
  trend?: "up" | "down" | "stable"
}

export function TrustBar() {
  const [metrics, setMetrics] = useState<SystemMetric[]>([
    { label: "Global Uptime", value: "99.98", unit: "%", trend: "stable" },
    { label: "Avg Response Time", value: "42", unit: "ms", trend: "down" },
    { label: "Active Monitoring", value: "2.4K", trend: "up" },
  ])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const res = await fetch("/api/status")
        if (res.ok) {
          const data = await res.json()
          setMetrics(data.metrics || metrics)
        }
      } catch (err) {
        console.error("[v0] Failed to fetch metrics:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchMetrics()
    const interval = setInterval(fetchMetrics, 30000) // Refresh every 30s
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="container mx-auto px-6 py-10 md:py-14">
      <div className="rounded-2xl border border-white/10 bg-card/40 p-6 backdrop-blur">
        <p className="text-center text-sm text-muted-foreground">Real-Time System Health & Performance Metrics</p>
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          {metrics.map((metric, idx) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.4 }}
              className="rounded-xl border border-white/10 bg-card/40 p-4 text-center backdrop-blur-sm transition-all hover:border-white/20 hover:bg-card/50"
            >
              <div className="text-xs text-muted-foreground">{metric.label}</div>
              <div className="mt-2 flex items-baseline justify-center gap-1">
                <div className="text-2xl font-semibold">{metric.value}</div>
                {metric.unit && <div className="text-xs text-muted-foreground">{metric.unit}</div>}
              </div>
              {metric.trend && (
                <div className="mt-2 text-xs">
                  {metric.trend === "up" && <span className="text-green-400">↑ Improving</span>}
                  {metric.trend === "down" && <span className="text-blue-400">↓ Optimizing</span>}
                  {metric.trend === "stable" && <span className="text-yellow-400">→ Stable</span>}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
