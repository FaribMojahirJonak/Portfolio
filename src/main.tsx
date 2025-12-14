import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Defer Vercel Analytics so it does not block first paint
const scheduleAnalytics = () => {
  import("@vercel/analytics")
    .then(({ inject }) => inject())
    .catch(() => {});
};

if (import.meta.env.PROD) {
  if ("requestIdleCallback" in window) {
    requestIdleCallback(() => scheduleAnalytics());
  } else {
    setTimeout(scheduleAnalytics, 0);
  }
}

// Performance monitoring for Web Vitals
if ("PerformanceObserver" in window) {
  // Log performance metrics
  const observer = new PerformanceObserver((list) => {
    list.getEntries().forEach((entry) => {
      // Log metrics to console in development
      if (import.meta.env.DEV) {
        console.log(`${entry.name}: ${entry.duration}ms`);
      }
    });
  });

  observer.observe({ entryTypes: ["navigation", "paint", "resource"] });
}

createRoot(document.getElementById("root")!).render(<App />);
