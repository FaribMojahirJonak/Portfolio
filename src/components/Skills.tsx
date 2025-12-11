import { motion } from "motion/react";
import { Search, LayoutGrid, Handshake, SplinePointer, FolderTree, FlaskConical } from "lucide-react";

const skills = [
  {
    name: "User Research",
    icon: Search,
    description: "Understanding user goals, behaviors, and pain points to guide meaningful design decisions.",
    color: "from-[#00d4ff] to-[#0099cc]",
    glow: "rgba(0, 212, 255, 0.5)",
    borderColor: "#00d4ff",
    iconColor: "#00d4ff",
  },
  {
    name: "Interaction Design",
    icon: SplinePointer,
    description: "Designing how elements behave, respond, and guide users through smooth, intuitive actions.",
    color: "from-[#ff6b35] to-[#cc5429]",
    glow: "rgba(255, 107, 53, 0.5)",
    borderColor: "#ff6b35",
    iconColor: "#ff6b35",
  },
  {
    name: "Information Architecture",
    icon: FolderTree,
    description: "Organizing content so users can find what they need without friction or confusion.",
    color: "from-[#a855f7] to-[#8b3fd9]",
    glow: "rgba(168, 85, 247, 0.5)",
    borderColor: "#a855f7",
    iconColor: "#a855f7",
  },
  {
    name: "Design Systems",
    icon: LayoutGrid,
    description: "Building consistent UI components and rules that keep products scalable and unified.",
    color: "from-[#ff00ff] to-[#cc00cc]",
    glow: "rgba(255, 0, 255, 0.5)",
    borderColor: "#ff00ff",
    iconColor: "#ff00ff",
  },
  {
    name: "Usability Testing",
    icon: FlaskConical,
    description: "Observing real users to uncover confusion, validate ideas, and refine the experience.",
    color: "from-[#00ff88] to-[#00cc6a]",
    glow: "rgba(0, 255, 136, 0.5)",
    borderColor: "#00ff88",
    iconColor: "#00ff88",
  },
  {
    name: "Collaboration & Handoff",
    icon: Handshake,
    description: "Communicating design intent clearly with developers and teams to bring ideas to life smoothly.",
    color: "from-[#31a8ff] to-[#2686cc]",
    glow: "rgba(49, 168, 255, 0.5)",
    borderColor: "#31a8ff",
    iconColor: "#31a8ff",
  },
];

export function Skills() {
  return (
    <section id="skills" className="relative py-32 px-6">

      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-[#0f1a2e] to-background" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(168,85,247,0.1),transparent_50%)]" />

      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            SKILLS & TOOLS
          </h2>
          <p className="text-lg text-muted-foreground">
            Industry-standard software and expertise
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {skills.map((skill, index) => {
            const Icon = skill.icon;
            return (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >

                {/* OUTER WRAPPER (fixes corner bleed) */}
                <motion.div
                  whileHover={{
                    scale: 1.05,
                    boxShadow: `0 0 40px ${skill.glow}`,
                  }}
                  transition={{ duration: 0.3 }}
                  className="relative group h-full rounded-xl overflow-hidden"
                >

                  {/* CARD */}
                  <div
                    className="relative p-8 rounded-xl backdrop-blur-md bg-white/5 border border-transparent shadow-xl 
                               transition-all duration-300 h-full flex flex-col 
                               group-hover:border-[var(--borderColor)]"
                    style={{
                      "--borderColor": skill.borderColor,
                      borderColor: "transparent",
                    }}
                  >

                    {/* Gradient overlay on hover */}
                    <motion.div
                      className={`absolute inset-0 rounded-xl bg-gradient-to-br ${skill.color} 
                                 opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none`}
                    />

                    {/* Icon */}
                    <div className="relative mb-6">
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                        className={`w-16 h-16 rounded-lg bg-gradient-to-br ${skill.color} p-0.5 mx-auto`}
                      >
                        <div className="w-full h-full rounded-lg bg-background flex items-center justify-center">
                          <Icon className="w-8 h-8" style={{ color: skill.iconColor }} />
                        </div>
                      </motion.div>

                      {/* Glow */}
                      <motion.div
                        className={`absolute inset-0 rounded-lg bg-gradient-to-br ${skill.color} blur-xl opacity-0 
                                    group-hover:opacity-50`}
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0.3, 0.6, 0.3],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                    </div>

                    {/* Text */}
                    <h3 className="text-xl text-center mb-2 group-hover:text-primary transition-colors duration-300">
                      {skill.name}
                    </h3>
                    <p className="text-sm text-muted-foreground text-center">
                      {skill.description}
                    </p>

                    {/* CORNER ACCENTS — invisible default, colored on hover */}
                    <div
                      className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 
                                 border-transparent opacity-0 
                                 group-hover:opacity-100 group-hover:border-[var(--borderColor)]
                                 transition-all duration-300 rounded-tl-xl"
                      style={{ "--borderColor": skill.borderColor }}
                    />

                    <div
                      className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 
                                 border-transparent opacity-0 
                                 group-hover:opacity-100 group-hover:border-[var(--borderColor)]
                                 transition-all duration-300 rounded-br-xl"
                      style={{ "--borderColor": skill.borderColor }}
                    />

                  </div>
                </motion.div>
              </motion.div>
            );
          })}

        </div>
      </div>
    </section>
  );
}
