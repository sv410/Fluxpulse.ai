import { NextResponse } from "next/server"

const subscribers: string[] = []

export async function POST(req: Request) {
  const { email } = await req.json().catch(() => ({}))
  if (!email || typeof email !== "string") {
    return NextResponse.json({ ok: false, error: "Invalid email" }, { status: 400 })
  }
  subscribers.push(email)
  console.log("[subscribe] status updates subscriber:", email)
  return NextResponse.json({ ok: true })
}
