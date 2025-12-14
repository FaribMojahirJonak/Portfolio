import { SpeedInsights } from "@vercel/speed-insights/react";
import { Suspense, lazy } from "react";
import { Navigation } from "./components/Navigation";
import { Hero } from "./components/Hero";

// Lazy load non-critical sections
const Portfolio = lazy(() => import("./components/Portfolio").then(m => ({ default: m.Portfolio })));
const About = lazy(() => import("./components/About").then(m => ({ default: m.About })));
const Skills = lazy(() => import("./components/Skills").then(m => ({ default: m.Skills })));
const Contact = lazy(() => import("./components/Contact").then(m => ({ default: m.Contact })));
const Footer = lazy(() => import("./components/Footer").then(m => ({ default: m.Footer })));

export default function App() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navigation />
      <main>
        <Hero />
        <Suspense fallback={null}>
          <Portfolio />
        </Suspense>
        <Suspense fallback={null}>
          <About />
        </Suspense>
        <Suspense fallback={null}>
          <Skills />
        </Suspense>
        <Suspense fallback={null}>
          <Contact />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
      <SpeedInsights />
    </div>
  );
}
