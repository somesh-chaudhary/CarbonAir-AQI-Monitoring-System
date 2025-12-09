# 🌍 CarbonAir – Real‑Time Air Quality Monitoring Dashboard

CarbonAir is a modern **AI‑ready Air Quality Index (AQI) monitoring system** built using **React + TypeScript + Tailwind CSS**.  
It fetches real‑time environmental data from the **Open‑Meteo Air Quality API**, analyzes pollutant parameters and displays insights through an elegant dashboard with charts, city rankings, comparison, alerts & more.

---

## 🚀 Key Features

- 🌫 Real‑time AQI monitoring
- 🧪 Pollutants: PM2.5, PM10, CO, NO₂, SO₂, O₃
- 📈 7‑day AQI forecast visualization (Recharts)
- 🌍 Global city ranking + comparison
- 🔔 Alert system based on AQI threshold
- 📊 Trend visualization & analytics
- ⚡ Responsive UI (Mobile + Desktop)
- 🎨 Tailwind + Shadcn based modern interface
- 🧩 Clean modular component structure

---

## 🏗 Tech Stack

| Category | Technology |
|--------|------------|
| Frontend | **React + TypeScript + Vite** |
| UI Styling | **Tailwind CSS + Shadcn UI** |
| Charts | **Recharts** |
| API Source | **Open‑Meteo Air Quality API** |
| Notifications | **Sonner** |
| Icons | **Lucide React** |

---

## 📂 Project Structure

```
CarbonAir/
├── src/
│   ├── components/dashboard/
│   │   ├── AQIOverview.tsx
│   │   ├── PollutantsGrid.tsx
│   │   ├── ForecastChart.tsx
│   │   ├── Rankings.tsx
│   │   ├── Alerts.tsx
│   │   └── Profile.tsx
│   ├── lib/api.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── styles/
├── public/
└── package.json
```

---

## 🛠 Installation & Run

```bash
git clone https://github.com/YOUR-USERNAME/CarbonAir.git
cd CarbonAir
npm install
npm run dev        # launches development server
```

> The application will start in your browser automatically via Vite’s dev server.  
(You may deploy later to Vercel/Netlify when production build is needed.)

---

## 🔄 Application Workflow

1. User searches/selects a city  
2. API fetch retrieves AQI + pollutant data  
3. Dashboard updates dynamically  
4. ForecastChart visualizes 7‑day trend  
5. Rankings sort cities based on pollution  
6. Alerts notify when AQI crosses limit  

---

## 🔥 Future Enhancements

- AI‑based AQI prediction model (LSTM / Random Forest)
- Health impact advisory system
- Login system + cloud connected backend
- Data export as PDF / CSV
- Live Geo heatmap for pollution hotspots
- Push notifications for severe AQI alerts

---

## 🤝 Contribution

Contributions, feature ideas & PRs are welcome.  
If you like this project, ⭐ the repo — it motivates development!

---

## 📄 License

MIT License — open for modifications & usage.

---

## 👤 Developer

**Somesh Chaudhary**  
CarbonAir — *Breathe Smarter, Live Better* 🌿
