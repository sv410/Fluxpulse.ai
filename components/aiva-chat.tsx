"use client"

import { useState } from "react"
import { MessageCircle } from "lucide-react"

export function AIVAChat({ data }: { data: any }) {
  const [open, setOpen] = useState(false)
  const messages = [
    { role: "assistant", text: "Hi, I’m AIVA — your AI Virtual Analyst." },
    {
      role: "assistant",
      text: data.mem > 70 ? "Memory pressure rising; consider scaling." : "Memory looks stable right now.",
    },
    { role: "assistant", text: data.cpu > 75 ? "CPU spike anticipated in ~10 mins." : "CPU headroom sufficient." },
  ]

  return (
    <>
      <button
        className="fixed bottom-4 left-4 z-30 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-card/70 text-foreground shadow-xl backdrop-blur hover:shadow-2xl"
        onClick={() => setOpen((v) => !v)}
        aria-label="Open AIVA chat"
      >
        <MessageCircle className="h-5 w-5" />
      </button>
      {open && (
        <div className="fixed bottom-20 left-4 z-30 w-72 rounded-2xl border border-white/10 bg-card/70 p-4 backdrop-blur">
          <div className="mb-2 text-sm font-medium">AIVA</div>
          <div className="space-y-2 text-sm text-muted-foreground">
            {messages.map((m, i) => (
              <div key={i} className="rounded-md border border-white/10 bg-card/50 p-2">
                {m.text}
              </div>
            ))}
          </div>
          <div className="mt-3 text-[10px] text-muted-foreground/70">Tips are simulated for demo.</div>
        </div>
      )}
    </>
  )
}
