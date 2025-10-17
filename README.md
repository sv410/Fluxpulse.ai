# FluxPulse AI — Real-Time System Monitoring with AI Predictions

Motto: Track, Predict, and Optimize your systems with AI precision.

FluxPulse AI is a modern, futuristic, dark-themed platform for monitoring system performance (CPU, Memory, Network, Disk) in real-time while surfacing AI-driven predictions for trends, anomalies, and overload risks. It’s built to feel trustworthy and delightful: sleek glass panels, neon accents, smooth motion, and a practical dashboard experience.

What you can do:
- Real-time Monitoring: Live metrics with glowing indicators and animated charts.
- AI Predictions: Trend analysis and anomaly detection previewed on cards and sidebars.
- System Health Score: A single, dynamic score that reflects system well-being.
- AIVA Insights: Bite-sized, actionable insights written for humans.
- Playground: Simulate workload to see predicted impact—hands-on and educational.
- Trust Center + Changelog: Understand our reliability posture and what’s shipping next.

Tech Stack:
- Frontend: Next.js App Router, React, Tailwind v4 (shadcn styles), Framer Motion.
- Charts: Recharts (dashboard) and native CSS visuals where lightweight.
- Live Data: Mock WebSocket stream (lib/mock-ws.ts) to simulate activity.
- Backend (mocked): Next.js Route Handlers for predictions (/api/predict), insights (/api/insights), and status (/api/status).

How to Use:
- Home: Learn the value quickly; jump to the Dashboard or Playground.
- Dashboard: Observe live metrics, toggle System View vs. Prediction View, scan insights.
- Playground: Adjust sliders to simulate CPU/Memory loads and get instant AI predictions.
- Trust Center: Review status, security, and data handling summaries.
- Changelog: Track recent features and improvements.

Why FluxPulse AI?
- Practical insight first: Predictions you can act on, not just pretty charts.
- Confidence through clarity: Trust Center and transparent Changelog.
- Hands-on learning: Playground puts users in control to explore outcomes safely.
