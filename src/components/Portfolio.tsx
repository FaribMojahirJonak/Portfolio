import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const portfolioItems = [
  {
    id: 1,
    title: "Revenue Split Fintech App",
    category: "UI/UX Design",
    image: "/images/gaming_fintech.webp",
    url: "https://dribbble.com/shots/26880380-Revenue-Split-Fintech-App",
  },
  {
    id: 2,
    title: "Legal Advocacy Pro",
    category: "UI/UX Design",
    image: "/images/legal_advocacy_pro.webp",
    url: "https://dribbble.com/shots/26880296-Legal-Advocacy-Pro-Advocacy-assessment-app",
  },
  {
    id: 3,
    title: "Dashboard Design",
    category: "UI/UX Design",
    image: "/images/dashboard.webp",
    url: "https://dribbble.com/shots/26880174-Dashboard-Design",
  },
  {
    id: 4,
    title: "Fly Far Int. - Redesign",
    category: "UI/UX Design",
    image: "/images/fly_far.webp",
    url: "https://dribbble.com/shots/26880301-Fly-Far-International-Landing-Page",
  },
  {
    id: 5,
    title: "PurrCare - Cat adoption website",
    category: "UI/UX Design",
    image: "/images/purrcare.webp",
    url: "https://dribbble.com/shots/26880162-PurrCare-Cat-foster-and-adoption-website",
  },
  {
    id: 6,
    title: "Recipe App",
    category: "UI/UX Design",
    image: "/images/recipe.webp",
  },
];

export function Portfolio() {
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
    <section id="portfolio" className="relative py-32 px-6">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-[#0f0a1a] to-background" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(168,85,247,0.1),transparent_50%)]" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: prefersReducedMotion ? 0.01 : 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            PORTFOLIO
          </h2>
          <p className="text-lg text-muted-foreground">
            Featured works and developer ready assets
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolioItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: prefersReducedMotion ? 0.01 : 0.6, delay: index * 0.1 }}
              className="group relative"
            >
              <a
                href={item.url || undefined}
                target={item.url ? "_blank" : undefined}
                rel={item.url ? "noopener noreferrer" : undefined}
                className={item.url ? "block" : undefined}
              >
                <motion.div
                  whileHover={!prefersReducedMotion ? { scale: 1.02 } : {}}
                  transition={{ duration: 0.3 }}
                  className="relative overflow-hidden rounded-xl backdrop-blur-md bg-white/5 border border-primary/20 shadow-lg shadow-primary/5"
                >
                  {/* Image Container */}
                  <div className="relative w-full aspect-video overflow-hidden">
                    <motion.div
                      whileHover={!prefersReducedMotion ? { scale: 1.1 } : {}}
                      transition={{ duration: 0.6 }}
                      className="w-full h-full will-change-transform"
                    >
                      <ImageWithFallback
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </motion.div>
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
                    
                    {/* Glow Effect on Hover */}
                    {!prefersReducedMotion && (
                      <motion.div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{
                          background: "radial-gradient(circle at center, rgba(0, 212, 255, 0.2), transparent 70%)",
                        }}
                      />
                    )}
                  </div>

                  {/* Content Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <motion.span
                      className="inline-block px-3 py-1 rounded-full bg-primary/20 backdrop-blur-sm border border-primary/30 text-xs mb-2 text-primary"
                      whileHover={!prefersReducedMotion ? { scale: 1.05 } : {}}
                    >
                      {item.category}
                    </motion.span>
                    <h3 className="text-xl group-hover:text-primary transition-colors duration-300">
                      {item.title}
                    </h3>
                  </div>

                  {/* Corner Accents */}
                  <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-primary/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-secondary/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.div>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
