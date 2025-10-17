import { NextResponse } from "next/server"

const memoryStore: Array<{ email: string; t: number }> = []

export async function POST(req: Request) {
  try {
    const { email } = await req.json()
    if (!email || typeof email !== "string") {
      return NextResponse.json({ ok: false, error: "Invalid email" }, { status: 400 })
    }
    memoryStore.push({ email, t: Date.now() })
    console.log("[waitlist] added:", email)
    return NextResponse.json({ ok: true })
  } catch (e) {
    return NextResponse.json({ ok: false, error: "Bad request" }, { status: 400 })
  }
}
