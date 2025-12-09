import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getAQILevel = (aqi: number) => {
  if (aqi <= 50) return { label: "Good", color: "text-green-500", bg: "bg-green-500", border: "border-green-500", description: "Air quality is satisfactory, and air pollution poses little or no risk." };
  if (aqi <= 100) return { label: "Moderate", color: "text-yellow-500", bg: "bg-yellow-500", border: "border-yellow-500", description: "Air quality is acceptable. However, there may be a risk for some people, particularly those who are unusually sensitive to air pollution." };
  if (aqi <= 150) return { label: "Unhealthy for Sensitive Groups", color: "text-orange-500", bg: "bg-orange-500", border: "border-orange-500", description: "Members of sensitive groups may experience health effects. The general public is less likely to be affected." };
  if (aqi <= 200) return { label: "Unhealthy", color: "text-red-500", bg: "bg-red-500", border: "border-red-500", description: "Some members of the general public may experience health effects; members of sensitive groups may experience more serious health effects." };
  if (aqi <= 300) return { label: "Very Unhealthy", color: "text-purple-500", bg: "bg-purple-500", border: "border-purple-500", description: "Health alert: The risk of health effects is increased for everyone." };
  return { label: "Hazardous", color: "text-rose-900", bg: "bg-rose-900", border: "border-rose-900", description: "Health warning of emergency conditions: everyone is more likely to be affected." };
};

export const getPollutantStatus = (type: string, value: number) => {
  // Simplified thresholds based on WHO/EPA
  // PM2.5: 0-12 Good, 12-35 Moderate, 35+ Poor
  // PM10: 0-54 Good, 54-154 Moderate, 154+ Poor
  // etc.
  
  // Just returning basic color coding for demo
  return "text-muted-foreground"; 
};
