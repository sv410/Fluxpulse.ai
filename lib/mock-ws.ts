"use client"

// Simple mocked WebSocket-like stream for metrics data
import { useEffect, useMemo, useRef, useState } from "react"

type Point = {
  t: number
  cpu: number
  mem: number
  net: number
  cpu_pred?: number
  mem_pred?: number
  net_pred?: number
}

function nextValue(prev: number, drift = 0, vol = 6) {
  const n = prev + drift + (Math.random() - 0.5) * vol
  return Math.max(0, Math.min(100, n))
}

export function useMetricsStream() {
  const [tick, setTick] = useState(0)
  const [cpu, setCpu] = useState(38)
  const [mem, setMem] = useState(56)
  const [net, setNet] = useState(30)
  const [latency, setLatency] = useState(0.08)
  const [diskIO, setDiskIO] = useState(0.35)
  const historyRef = useRef<Point[]>([])

  useEffect(() => {
    const id = setInterval(() => {
      // Baseline drifts
      setCpu((p) => nextValue(p, Math.sin(Date.now() / 30000) * 0.4))
      setMem((p) => nextValue(p, Math.cos(Date.now() / 29000) * 0.3))
      setNet((p) => nextValue(p, Math.sin(Date.now() / 18000) * 0.2))
      setLatency((p) => Math.max(0.02, Math.min(0.25, p + (Math.random() - 0.5) * 0.01)))
      setDiskIO((p) => Math.max(0.1, Math.min(1.0, p + (Math.random() - 0.5) * 0.05)))
      setTick((x) => x + 1)
    }, 1200)
    return () => clearInterval(id)
  }, [])

  const data = useMemo(() => {
    const t = historyRef.current.length ? historyRef.current.at(-1)!.t + 1 : 0
    const point: Point = {
      t,
      cpu,
      mem,
      net,
      cpu_pred: Math.min(100, cpu + 12 + Math.random() * 6 - 3),
      mem_pred: Math.min(100, mem + 8 + Math.random() * 6 - 3),
      net_pred: Math.min(100, net + 10 + Math.random() * 6 - 3),
    }
    const updated = [...historyRef.current, point].slice(-50)
    historyRef.current = updated
    return {
      cpu,
      mem,
      net,
      latency,
      diskIO,
      history: updated,
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tick])

  const healthScore = useMemo(() => {
    // Simple heuristic: lower cpu/mem/net and latency => higher health
    const raw = 100 - (cpu * 0.35 + mem * 0.3 + net * 0.2 + latency * 100 * 0.15)
    return Math.round(Math.max(0, Math.min(100, raw)))
  }, [cpu, mem, net, latency])

  return { data, healthScore }
}
