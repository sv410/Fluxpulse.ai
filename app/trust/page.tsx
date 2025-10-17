"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ShieldCheck, Lock, Activity, Server } from "lucide-react"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function TrustPage() {
  const [pending, setPending] = useState(false)

  async function onSubscribe(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setPending(true)
    const email = new FormData(e.currentTarget).get("email")
    await fetch("/api/subscribe", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email }),
    })
    setPending(false)
    e.currentTarget.reset()
    alert("Subscribed to status updates.")
  }

  return (
    <div className="container mx-auto px-6 py-12 md:py-16">
      <h1 className="text-3xl font-semibold">Trust Center</h1>
      <p className="mt-2 max-w-2xl text-muted-foreground">
        Security, privacy, reliability. Learn how FluxPulse AI protects your data and keeps your systems observable.
      </p>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <Card className="glass">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-primary" /> Security
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Encryption in transit and at rest. Strict access controls, audit logs, and least‑privilege by default.
          </CardContent>
        </Card>

        <Card className="glass">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5 text-primary" /> Privacy
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Telemetry is minimized and scoped. Sensitive payloads are redacted before leaving your environment.
          </CardContent>
        </Card>

        <Card className="glass">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" /> Reliability
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Multi‑region architecture with health checks and autoscaling. Observability built into every layer.
          </CardContent>
        </Card>

        <Card className="glass">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Server className="h-5 w-5 text-primary" /> Status & Updates
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Subscribe to real‑time status and maintenance notifications.
            </p>
            <form onSubmit={onSubscribe} className="mt-4 flex items-center gap-2">
              <Input name="email" type="email" required placeholder="you@company.com" className="glass" />
              <Button type="submit" className="btn-primary-glow" disabled={pending}>
                {pending ? "Subscribing…" : "Subscribe"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
