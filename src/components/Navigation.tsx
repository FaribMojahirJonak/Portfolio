import { motion } from "motion/react";

export function Navigation() {
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
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/30 border-b border-primary/20"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="text-2xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent"
        >
          Farib Mojahir Jonak
        </motion.div>
        
        <div className="hidden md:flex gap-8">
          {['Hero', 'Portfolio', 'About', 'Skills', 'Contact'].map((item) => (
            <motion.button
              key={item}
              onClick={() => scrollToSection(item.toLowerCase())}
              whileHover={{ scale: 1.1, color: '#00d4ff' }}
              whileTap={{ scale: 0.95 }}
              className="relative transition-colors duration-300 hover:text-primary"
            >
              {item}
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-secondary"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          ))}
        </div>
      </div>
    </motion.nav>
  );
}
