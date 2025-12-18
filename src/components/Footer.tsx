import { motion } from "motion/react";

export function Footer() {
  return (
    <footer className="relative py-12 px-6 border-t border-primary/20">
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] to-transparent" />
      
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-2xl text-primary"
          >
            Farib Mojahir Jonak
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-muted-foreground text-sm"
          >
            © 2026 Farib Mojahir Jonak. All rights reserved.
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
