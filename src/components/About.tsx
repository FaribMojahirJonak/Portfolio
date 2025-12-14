import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function About() {
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

  return (
    <section id="about" className="relative py-32 px-6">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-[#1a0f2e] to-background" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(0,212,255,0.1),transparent_50%)]" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: prefersReducedMotion ? 0.01 : 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            ABOUT
          </h2>
          <p className="text-lg text-muted-foreground">
            The journey behind the pixels
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-stretch">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: prefersReducedMotion ? 0.01 : 0.6 }}
            className="relative h-96"
          >
            <div className="relative h-full overflow-hidden rounded-2xl backdrop-blur-md bg-white/5 border border-primary/20 shadow-2xl shadow-primary/10">
              {/* Glowing border effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary via-secondary to-accent opacity-20 blur-xl" />
              
              <div className="relative w-full h-full rounded-xl overflow-hidden">
                <ImageWithFallback
                  src="/images/avatar.png"
                  alt="Farib Mojahir Jonak"
                  className="absolute inset-0 w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-black/10" />
              </div>

              {/* Corner Accents */}
              <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-primary" />
              <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-secondary" />
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: prefersReducedMotion ? 0.01 : 0.6, delay: 0.2 }}
            className="space-y-6 h-96"
          >
            <div className="relative p-8 rounded-xl backdrop-blur-md bg-white/5 border border-primary/20 shadow-xl">
              <h3 className="text-2xl md:text-3xl mb-4 text-primary">
                Crafting Digital Experiences
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                I design digital experiences that feel natural and effortless. My focus is always on clarity, flow, 
                and reducing friction so users can move with confidence.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                I enjoy turning abstract ideas into simple, thoughtful interfaces. Every screen is an opportunity 
                to guide, support, and create a little spark of delight. My work is driven by curiosity and a strong 
                respect for the people behind the pixels. Good design should listen first, then quietly make life easier.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                I love exploring how small design choices shape the way people think and feel. Subtle details, honest visuals,
                 and intentional interactions are what bring a product to life.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-primary/20">
                <div className="text-center">
                  <div className="text-3xl text-primary mb-1">500+</div>
                  <div className="text-sm text-muted-foreground">Components</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl text-secondary mb-1">50+</div>
                  <div className="text-sm text-muted-foreground">Projects</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl text-accent mb-1">1</div>
                  <div className="text-sm text-muted-foreground">Years Exp.</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
