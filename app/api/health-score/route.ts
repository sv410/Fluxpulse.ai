const cache = { data: null as any, timestamp: 0 }
const CACHE_TTL = 2000 // 2 seconds

export async function GET() {
  const now = Date.now()

  // Return cached data if fresh
  if (cache.data && now - cache.timestamp < CACHE_TTL) {
    return Response.json(cache.data)
  }

  const baseScore = 87
  const variation = Math.random() * 8 - 4
  const overall = Math.max(0, Math.min(100, baseScore + variation))

  const data = {
    overall: Math.round(overall),
    cpu: Math.round(78 + (Math.random() * 10 - 5)),
    memory: Math.round(82 + (Math.random() * 10 - 5)),
    network: Math.round(91 + (Math.random() * 8 - 4)),
    disk: Math.round(85 + (Math.random() * 10 - 5)),
  }

  cache.data = data
  cache.timestamp = now

  return Response.json(data)
}
