import { NextResponse } from "next/server"

const start = Date.now()

export async function GET() {
  const uptimeMs = Date.now() - start
  const uptimeMin = Math.floor(uptimeMs / 60000)
  const status = "operational" as const
  return NextResponse.json({ status, uptime: `${uptimeMin}m` })
}
