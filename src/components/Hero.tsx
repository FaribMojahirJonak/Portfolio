import { motion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

export function Hero() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check if user prefers reduced motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const scrollToPortfolio = () => {
    const element = document.getElementById('portfolio');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Reduce particles on low-end devices (detect by prefers-reduced-motion)
  const particleCount = prefersReducedMotion ? 0 : 12;

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0f] via-[#1a0f2e] to-[#0f1a2e]">
        {!prefersReducedMotion && (
          <motion.div
            className="absolute inset-0 opacity-30"
            animate={{
              background: [
                "radial-gradient(circle at 20% 50%, #00d4ff 0%, transparent 50%)",
                "radial-gradient(circle at 80% 50%, #a855f7 0%, transparent 50%)",
                "radial-gradient(circle at 50% 80%, #ff00ff 0%, transparent 50%)",
                "radial-gradient(circle at 20% 50%, #00d4ff 0%, transparent 50%)",
              ],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        )}
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,212,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,212,255,0.05)_1px,transparent_1px)] bg-[size:50px_50px]" />

      {/* Floating Particles */}
      {[...Array(particleCount)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-primary rounded-full will-change-transform"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReducedMotion ? 0.01 : 0.5, delay: 0 }}
          className="mb-6"
        >
          <span className="inline-block px-4 py-2 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-sm text-sm tracking-wider text-primary">
            UI/UX DESIGNER
          </span>
        </motion.div>

        <motion.h1
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReducedMotion ? 0.01 : 0.4, delay: 0 }}
          className="text-5xl md:text-7xl lg:text-8xl mb-6 bg-gradient-to-r from-white via-primary to-secondary bg-clip-text text-transparent"
        >
          Farib Mojahir Jonak
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReducedMotion ? 0.01 : 0.8, delay: 0.6 }}
          className="text-xl md:text-2xl lg:text-3xl text-muted-foreground mb-4"
        >
          User Research Specialist
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReducedMotion ? 0.01 : 0.8, delay: 0.8 }}
          className="text-lg md:text-xl text-muted-foreground/80 mb-12 italic"
        >
          Crafting intuitive and engaging digital experiences through user-centered design.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: prefersReducedMotion ? 0.01 : 0.6, delay: 1 }}
          className="flex gap-4 justify-center"
        >
          <motion.button
            whileHover={!prefersReducedMotion ? { scale: 1.05, boxShadow: "0 0 30px rgba(0, 212, 255, 0.5)" } : {}}
            whileTap={!prefersReducedMotion ? { scale: 0.95 } : {}}
            onClick={scrollToPortfolio}
            className="px-8 py-4 bg-gradient-to-r from-[#00d4ff] to-[#00a3cc] rounded-lg backdrop-blur-sm border border-primary/50 shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all duration-300 will-change-transform"
          >
            View Portfolio
          </motion.button>
          <motion.button
            whileHover={!prefersReducedMotion ? { scale: 1.05, boxShadow: "0 0 30px rgba(168, 85, 247, 0.5)" } : {}}
            whileTap={!prefersReducedMotion ? { scale: 0.95 } : {}}
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 bg-white/5 rounded-lg backdrop-blur-sm border border-secondary/50 shadow-lg hover:bg-white/10 transition-all duration-300 will-change-transform"
          >
            Get in Touch
          </motion.button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      {!prefersReducedMotion && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
          onClick={scrollToPortfolio}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-2 text-primary will-change-transform"
          >
            <span className="text-sm tracking-wider">SCROLL</span>
            <ChevronDown className="w-6 h-6" />
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
