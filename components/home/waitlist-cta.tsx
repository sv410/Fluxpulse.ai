"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function WaitlistCTA() {
  const [pending, setPending] = useState(false)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setPending(true)
    const email = new FormData(e.currentTarget).get("email")
    await fetch("/api/waitlist", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email }),
    })
    setPending(false)
    e.currentTarget.reset()
    alert("You’re on the list! We’ll reach out soon.")
  }

  return (
    <section className="container mx-auto px-6 pb-16 md:pb-24">
      <div className="mx-auto max-w-2xl rounded-2xl border border-white/10 bg-card/40 p-6 text-center backdrop-blur">
        <h3 className="text-2xl font-semibold">Get early access</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Join the beta to try prediction view, AIVA insights, and custom alerts.
        </p>
        <form onSubmit={onSubmit} className="mt-6 flex items-center gap-2">
          <Input
            required
            name="email"
            type="email"
            placeholder="you@company.com"
            className="glass flex-1"
            aria-label="Email address"
          />
          <Button type="submit" className="btn-primary-glow" disabled={pending}>
            {pending ? "Joining…" : "Join Beta"}
          </Button>
        </form>
      </div>
    </section>
  )
}
