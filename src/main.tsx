import { createRoot } from "react-dom/client";
import { inject } from "@vercel/analytics";
import App from "./App.tsx";
import "./index.css";

// Inject Vercel Analytics
inject();

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
