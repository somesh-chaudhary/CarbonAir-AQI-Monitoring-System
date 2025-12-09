# 🌍 CarbonAir – Real-Time Air Quality Monitoring Dashboard

CarbonAir is a modern web-based Air Quality Index (AQI) monitoring system built using **React + TypeScript + Tailwind**.  
It fetches real-time air quality and pollutant data via **Open-Meteo API**, visualizes it through interactive charts, and provides a clean dashboard to track air pollution city-wise.

---

## 🚀 Features

- Real-time AQI monitoring
- Pollutant breakdown (PM2.5, PM10, NO₂, SO₂, CO, O₃)
- 📈 7‑Day air quality forecast using Recharts
- 🌍 Global city ranking & comparison
- 🔔 Custom alert notification system
- ⚡ Responsive UI (Mobile + Desktop)
- Modern dark UI with Tailwind + Shadcn components

---

## 🏗 Tech Stack

| Layer | Technology |
|------|------------|
| Frontend | React 18, TypeScript, Vite |
| Styling | Tailwind CSS, Shadcn UI |
| Charts | Recharts |
| Icons | Lucide React |
| Data Source | Open‑Meteo API |
| Notifications | Sonner |

---

## 📂 Project Structure

```bash
CarbonAir/
├── src/
│   ├── components/
│   ├── lib/api.ts       # AQI API calls
│   ├── App.tsx          # Main router + layout
│   ├── assets/
│   └── styles/
├── public/
└── package.json
