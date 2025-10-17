import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const body = await req.text()
  const { cpu = 50, mem = 50 } = body ? JSON.parse(body) : {}
  // simple heuristic mock
  const load = (cpu + mem) / 2
  const noise = Math.random() * 6 - 3
  const cpuSpike = Math.max(0, Math.min(40, Math.round(cpu * 0.25 + noise)))
  const memSpike = Math.max(0, Math.min(40, Math.round(mem * 0.22 + noise)))
  const risk = Math.max(0, Math.min(100, Math.round(load * 0.9 + (cpuSpike + memSpike) * 0.7)))
  const eta = risk > 70 ? "6–12 min" : risk > 40 ? "12–25 min" : "25–40 min"

  return NextResponse.json({ cpuSpike, memSpike, risk, eta }, { status: 200 })
}
