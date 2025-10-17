const cache = { data: null as any, timestamp: 0 }
const CACHE_TTL = 3000 // 3 seconds

export async function GET() {
  const now = Date.now()

  // Return cached data if fresh
  if (cache.data && now - cache.timestamp < CACHE_TTL) {
    return Response.json(cache.data)
  }

  const insights = [
    {
      id: "i1",
      text: "Memory utilization trending above baseline. Recommend cache optimization.",
      severity: "warn",
      icon: "⚠️",
      action: "View Details",
    },
    {
      id: "i2",
      text: "Network latency stable. All regions performing optimally.",
      severity: "success",
      icon: "✓",
      action: null,
    },
    {
      id: "i3",
      text: "CPU spike predicted in 8 minutes. Auto-scaling recommended.",
      severity: "alert",
      icon: "🔴",
      action: "Enable Auto-Scale",
    },
    {
      id: "i4",
      text: "Disk I/O efficiency improved by 12% this hour.",
      severity: "info",
      icon: "ℹ️",
      action: null,
    },
  ]

  const response = { insights }
  cache.data = response
  cache.timestamp = now

  return Response.json(response)
}
