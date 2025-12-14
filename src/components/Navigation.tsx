import { motion } from "motion/react";
import { useEffect, useState } from "react";

export function Navigation() {
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

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: prefersReducedMotion ? 0.01 : 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/30 border-b border-primary/20"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <motion.div
          whileHover={!prefersReducedMotion ? { scale: 1.05 } : {}}
          className="text-2xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent will-change-transform"
        >
          Farib Mojahir Jonak
        </motion.div>
        
        <div className="hidden md:flex gap-8">
          {['Home', 'Portfolio', 'About', 'Skills', 'Contact'].map((item) => (
            <motion.button
              key={item}
              onClick={() => scrollToSection(item === 'Home' ? 'hero' : item.toLowerCase())}
              whileHover={!prefersReducedMotion ? { scale: 1.1, color: '#00d4ff' } : {}}
              whileTap={!prefersReducedMotion ? { scale: 0.95 } : {}}
              className="relative transition-colors duration-300 hover:text-primary will-change-transform"
            >
              {item}
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-secondary"
                initial={{ scaleX: 0 }}
                whileHover={!prefersReducedMotion ? { scaleX: 1 } : {}}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          ))}
        </div>
      </div>
    </motion.nav>
  );
}
