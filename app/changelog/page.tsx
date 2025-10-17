"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { RadialScore } from "@/components/home/radial-score"
import { Clock, AlertCircle, CheckCircle, Activity } from "lucide-react"

interface UserActivity {
  id: string
  user: string
  action: string
  timestamp: string
  type: "access" | "alert" | "action" | "update"
}

export default function ChangelogPage() {
  const [activities, setActivities] = useState<UserActivity[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const res = await fetch("/api/user-activity")
        if (res.ok) {
          const data = await res.json()
          setActivities(data.activities || [])
        }
      } catch (err) {
        console.error("[v0] Failed to fetch user activity:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchActivities()
  }, [])

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "alert":
        return <AlertCircle className="h-4 w-4 text-red-500" />
      case "update":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "action":
        return <Activity className="h-4 w-4 text-blue-500" />
      default:
        return <Clock className="h-4 w-4 text-muted-foreground" />
    }
  }

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)

    if (diffMins < 1) return "just now"
    if (diffMins < 60) return `${diffMins}m ago`
    const diffHours = Math.floor(diffMins / 60)
    if (diffHours < 24) return `${diffHours}h ago`
    return date.toLocaleDateString()
  }

  return (
    <div className="container mx-auto px-6 py-12 md:py-16">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-3xl font-semibold">User Activity & System Updates</h1>
        <p className="mt-2 text-muted-foreground">
          Track your interactions, system alerts, and real-time performance metrics.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="mt-12 rounded-2xl border border-white/10 bg-card/40 p-8 backdrop-blur"
      >
        <h2 className="mb-8 text-center text-xl font-semibold">System Health Overview</h2>
        <RadialScore score={87} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="mt-12"
      >
        <h2 className="mb-6 text-xl font-semibold">Recent Activity</h2>
        <div className="space-y-4">
          {loading ? (
            <div className="text-center text-muted-foreground">Loading activities...</div>
          ) : activities.length === 0 ? (
            <div className="text-center text-muted-foreground">No activities yet</div>
          ) : (
            activities.map((activity, idx) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + idx * 0.08, duration: 0.4 }}
              >
                <Card className="glass transition-all hover:border-white/20 hover:bg-card/50">
                  <CardContent className="flex items-start gap-4 pt-6">
                    <div className="mt-1">{getActivityIcon(activity.type)}</div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">
                            <span className="text-[color:var(--color-brand)]">{activity.user}</span> {activity.action}
                          </p>
                          <p className="mt-1 text-xs text-muted-foreground">{formatTime(activity.timestamp)}</p>
                        </div>
                        <span className="inline-flex items-center rounded-full bg-white/5 px-3 py-1 text-xs font-medium capitalize text-muted-foreground">
                          {activity.type}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          )}
        </div>
      </motion.div>
    </div>
  )
}
