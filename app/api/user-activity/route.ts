const userActivities = [
  {
    id: "1",
    user: "You",
    action: "Accessed Dashboard",
    timestamp: new Date(Date.now() - 5 * 60000).toISOString(),
    type: "access",
  },
  {
    id: "2",
    user: "System",
    action: "CPU spike detected - 92% usage",
    timestamp: new Date(Date.now() - 15 * 60000).toISOString(),
    type: "alert",
  },
  {
    id: "3",
    user: "You",
    action: "Enabled Prediction View",
    timestamp: new Date(Date.now() - 25 * 60000).toISOString(),
    type: "action",
  },
  {
    id: "4",
    user: "System",
    action: "Memory optimization completed",
    timestamp: new Date(Date.now() - 45 * 60000).toISOString(),
    type: "update",
  },
  {
    id: "5",
    user: "You",
    action: "Viewed System Health Report",
    timestamp: new Date(Date.now() - 60 * 60000).toISOString(),
    type: "access",
  },
]

export async function GET() {
  return Response.json({ activities: userActivities })
}
