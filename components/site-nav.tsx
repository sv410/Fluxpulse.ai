"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"

const links = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/playground", label: "Playground" }, // added Playground link
  { href: "/about", label: "About" },
  { href: "/trust", label: "Trust Center" },
  { href: "/changelog", label: "Changelog" },
]

export function SiteNav() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  return (
    <header className="sticky top-4 z-40 mx-auto w-full max-w-6xl px-4">
      <div className="rounded-2xl border border-white/10 bg-background/60 backdrop-blur supports-[backdrop-filter]:glass transition-all duration-300 hover:border-white/20">
        <div className="flex h-14 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-primary shadow-[0_0_14px] shadow-primary/60" aria-hidden />
            <span className="font-semibold tracking-tight">FluxPulse AI</span>
          </Link>

          <nav className="hidden items-center gap-6 md:flex">
            {links.map((l) => (
              <Link
                key={l.href}
                className={cn(
                  "text-sm transition-colors",
                  pathname === l.href ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                )}
                href={l.href}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button asChild size="sm" className="btn-primary-glow hidden md:inline-flex">
              <Link href="/dashboard">Open Dashboard</Link>
            </Button>

            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="secondary" size="icon" className="glass md:hidden" aria-label="Open Menu">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="glass">
                <div className="mt-8 flex flex-col gap-4">
                  {links.map((l) => (
                    <Link
                      key={l.href}
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "rounded-lg px-3 py-2 text-sm transition-colors",
                        pathname === l.href
                          ? "bg-primary/10 text-foreground"
                          : "text-muted-foreground hover:text-foreground",
                      )}
                    >
                      {l.label}
                    </Link>
                  ))}
                  <Button asChild className="btn-primary-glow mt-2">
                    <Link href="/dashboard" onClick={() => setOpen(false)}>
                      Open Dashboard
                    </Link>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
