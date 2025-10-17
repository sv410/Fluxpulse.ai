"use client"

import useSWR from "swr"

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export default function StatusBanner() {
  const { data } = useSWR("/api/status", fetcher, { refreshInterval: 5000 })
  const status = data?.status ?? "loading"
  const color =
    status === "operational" ? "bg-emerald-500/80" : status === "degraded" ? "bg-amber-500/80" : "bg-rose-500/80"

  return (
    <div className="w-full">
      <div className={`mx-auto max-w-7xl px-4 py-2 rounded-b-xl glass flex items-center justify-center gap-3`}>
        <span className={`inline-block w-2 h-2 rounded-full ${color}`} />
        <span className="text-sm text-muted-foreground">
          {"Status: "}
          {status}
          {" · Uptime: "}
          {data?.uptime ?? "—"}
        </span>
      </div>
    </div>
  )
}
