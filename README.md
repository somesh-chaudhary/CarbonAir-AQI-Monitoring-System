# 🌍 CarbonAir – Real‑Time Air Quality Monitoring Dashboard

CarbonAir is a modern AI‑ready Air Quality Index (AQI) monitoring system built using **React + TypeScript + Tailwind CSS**.  
It fetches live air quality and pollutant data using the **Open‑Meteo API** and visualizes it through a responsive dashboard with charts, city comparison, global rankings and alert system.

---

## 🚀 Features
- Real‑time AQI monitoring  
- Pollutant breakdown (PM2.5, PM10, NO₂, SO₂, CO, O₃)  
- 7‑Day forecast visualization with Recharts  
- Global city ranking + comparison view  
- AQI alerts & notification system  
- Fast & responsive UI for mobile & desktop  
- Modern UI styled with Tailwind + Shadcn  
- Modular code structure for scalability  

---

## 🏗 Tech Stack

| Area | Technology |
|------|------------|
| Frontend | React 18 + TypeScript + Vite |
| Styling | Tailwind CSS + Shadcn UI |
| Charts | Recharts |
| API | Open‑Meteo Air Quality API |
| Notifications | Sonner |
| Icons | Lucide React |

---

## 📂 Folder Structure

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

## 🛠 Installation & Setup

```bash
git clone https://github.com/YOUR-USERNAME/CarbonAir.git
cd CarbonAir
npm install
npm run dev
```

Open in browser 👉 **http://localhost:5173/**

---

## 🔄 How It Works
1. User selects or searches a city  
2. `api.ts` fetches AQI & pollutant data from Open‑Meteo  
3. Dashboard updates instantly with components  
4. ForecastChart shows next 7‑day AQI trend  
5. Rankings list cities based on pollution  
6. Alerts notify when AQI crosses a limit  

---

## 📸 Screenshots (Add When Ready)
```
/screenshots/dashboard.png
/screenshots/aqi-overview.png
/screenshots/forecast.png
/screenshots/rankings.png
```

---

## 🔥 Future Enhancements
- AI based AQI prediction model (LSTM / Random Forest)  
- Health recommendation system  
- Login + cloud database storage  
- Export PDF / CSV reports  
- Global heatmap + pollution hotspots  

---

## 🤝 Contributing
Contributions are welcome!  
Fork this repo & submit a PR 🚀  

---

## 📄 License
MIT License — free for open use  

---

## 👤 Developer
**Somesh Chaudhary**  
CarbonAir — *Breathe Smarter, Live Better* 🌿
