"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface ScoreData {
  overall: number
  cpu: number
  memory: number
  network: number
  disk: number
}

export function RadialScore({ score = 87 }: { score?: number }) {
  const [data, setData] = useState<ScoreData>({
    overall: score,
    cpu: 78,
    memory: 82,
    network: 91,
    disk: 85,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchScore = async () => {
      try {
        const res = await fetch("/api/health-score")
        if (res.ok) {
          const scoreData = await res.json()
          setData(scoreData)
        }
      } catch (err) {
        console.error("[v0] Failed to fetch health score:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchScore()
    const interval = setInterval(fetchScore, 3000)
    return () => clearInterval(interval)
  }, [])

  const circumference = 2 * Math.PI * 45
  const offset = circumference - (data.overall / 100) * circumference

  const getColor = (value: number) => {
    if (value >= 85) return "#10b981"
    if (value >= 70) return "#f59e0b"
    return "#ef4444"
  }

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="relative h-48 w-48">
        <svg className="h-full w-full" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r="45" fill="none" stroke="oklch(0.25 0 0)" strokeWidth="8" />
          <motion.circle
            cx="60"
            cy="60"
            r="45"
            fill="none"
            stroke={getColor(data.overall)}
            strokeWidth="8"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            strokeLinecap="round"
            style={{ filter: `drop-shadow(0 0 8px ${getColor(data.overall)})` }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="text-center"
          >
            <div className="text-4xl font-bold">{data.overall}</div>
            <div className="text-xs text-muted-foreground">Health Score</div>
          </motion.div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 w-full">
        {[
          { label: "CPU", value: data.cpu },
          { label: "Memory", value: data.memory },
          { label: "Network", value: data.network },
          { label: "Disk", value: data.disk },
        ].map((metric, idx) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + idx * 0.05, duration: 0.3 }}
            className="rounded-lg border border-white/10 bg-card/40 p-3 text-center backdrop-blur-sm hover:border-white/20 transition-colors"
          >
            <div className="text-xs text-muted-foreground">{metric.label}</div>
            <div className="mt-1 text-lg font-semibold" style={{ color: getColor(metric.value) }}>
              {metric.value}%
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
