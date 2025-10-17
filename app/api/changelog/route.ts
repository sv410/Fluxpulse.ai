export async function GET() {
  const changelog = [
    {
      v: "v0.4.0",
      date: "2025-10-10",
      notes: [
        "Prediction View toggle on Homepage Live Preview",
        "Added Trust Center & Status subscriptions",
        "New font & nav redesign",
      ],
    },
    {
      v: "v0.3.0",
      date: "2025-10-02",
      notes: ["AIVA assistant hints in dashboard", "System Health Score gauge"],
    },
    {
      v: "v0.2.0",
      date: "2025-09-26",
      notes: ["Initial dashboard charts and widgets", "Landing hero with shader gradient"],
    },
  ]

  return Response.json({ items: changelog })
}
