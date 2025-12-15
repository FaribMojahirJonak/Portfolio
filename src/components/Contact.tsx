import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { Send, Mail, Linkedin, ExternalLink, Facebook, Dribbble } from "lucide-react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{ type: "" | "success" | "error"; message: string }>({
    type: "",
    message: "",
  });

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

  const DISCORD_WEBHOOK = import.meta.env.VITE_DISCORD_WEBHOOK;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ type: "", message: "" });

    if (!DISCORD_WEBHOOK) {
      setStatus({ type: "error", message: "Add your Discord webhook to .env as VITE_DISCORD_WEBHOOK." });
      return;
    }

    try {
      setIsSubmitting(true);
      const res = await fetch(DISCORD_WEBHOOK, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: `📩 New portfolio contact`,
          embeds: [
            {
              title: "New Contact Form Submission",
              fields: [
                {
                  name: "Name",
                  value: formData.name,
                  inline: true,
                },
                {
                  name: "Email",
                  value: formData.email,
                  inline: true,
                },
                {
                  name: "Message",
                  value: formData.message,
                },
              ],
              color: 0x5865f2,
            },
          ],
        }),
      });

      if (res.ok) {
        setStatus({ type: "success", message: "Message received. I will reply within 24-48 hours." });
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus({ type: "error", message: "Send failed. Please try again." });
      }
    } catch (error) {
      console.error(error);
      setStatus({ type: "error", message: "Network error. Please try later." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const socialLinks = [
    {
      name: "Dribbble",
      url: "https://dribbble.com/faribmojahirjonak",
      icon: Dribbble,
      color: "from-[#13aff0] to-[#0e8ac4]",
    },
    {
      name: "Behance",
      url: "https://www.behance.net/faribmojahirjonak",
      icon: ExternalLink,
      color: "from-[#1769ff] to-[#0f4fc4]",
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/faribmojahirjonak/",
      icon: Linkedin,
      color: "from-[#0077b5] to-[#005885]",
    },
    {
      name: "Email",
      url: "mailto:faribmojahirjonak@gmail.com",
      icon: Mail,
      color: "from-[#a855f7] to-[#8b3fd9]",
    },
  ];

  return (
    <section id="contact" className="relative py-32 px-6">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-[#1a0f2e] to-background" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,212,255,0.1),transparent_50%)]" />

      <div className="relative z-10 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: prefersReducedMotion ? 0.01 : 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            GET IN TOUCH
          </h2>
          <p className="text-lg text-muted-foreground">
            Let's create something extraordinary together
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: prefersReducedMotion ? 0.01 : 0.6 }}
          >
            <div className="relative p-8 rounded-xl backdrop-blur-md bg-white/5 border border-primary/20 shadow-xl">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block mb-2 text-sm text-muted-foreground">
                    Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/5 border-primary/30 focus:border-primary rounded-lg backdrop-blur-sm transition-all duration-300"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block mb-2 text-sm text-muted-foreground">
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/5 border-primary/30 focus:border-primary rounded-lg backdrop-blur-sm transition-all duration-300"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block mb-2 text-sm text-muted-foreground">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full bg-white/5 border-primary/30 focus:border-primary rounded-lg backdrop-blur-sm transition-all duration-300 resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>

                <motion.div whileHover={!prefersReducedMotion ? { scale: 1.02 } : {}} whileTap={!prefersReducedMotion ? { scale: 0.98 } : {}}>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-primary to-secondary hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </motion.div>

                {status.message && (
                  <div
                    className={`text-sm ${
                      status.type === "success"
                        ? "text-emerald-400"
                        : status.type === "error"
                        ? "text-red-400"
                        : "text-muted-foreground"
                    }`}
                  >
                    {status.message}
                  </div>
                )}
              </form>

              {/* Corner Accents */}
              <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-primary/50" />
              <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-secondary/50" />
            </div>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: prefersReducedMotion ? 0.01 : 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            <div className="relative p-8 rounded-xl backdrop-blur-md bg-white/5 border border-primary/20 shadow-xl mb-8">
              <h3 className="text-xl mb-4 text-primary">Connect With Me</h3>
              <p className="text-muted-foreground mb-6">
                Follow my work and connect on social platforms
              </p>

              <div className="space-y-3">
                {socialLinks.map((link, index) => {
                  const Icon = link.icon;
                  return (
                    <motion.a
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: prefersReducedMotion ? 0.01 : 0.4 }}
                      whileHover={!prefersReducedMotion ? {
                        scale: 1.04,
                        x: 6,
                        transition: { type: "tween", duration: 0.16, ease: "easeOut" },
                      } : {}}
                      whileTap={!prefersReducedMotion ? { scale: 0.98 } : {}}
                      className="flex items-center gap-4 p-4 rounded-lg bg-white/5 border border-primary/20 hover:border-primary/40 transition-all duration-150 group will-change-transform"
                    >
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${link.color} flex items-center justify-center group-hover:shadow-lg transition-all duration-300`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <span className="flex-1 group-hover:text-primary transition-colors duration-300">
                        {link.name}
                      </span>
                      <motion.div
                        className="text-muted-foreground group-hover:text-primary transition-colors duration-300"
                        whileHover={!prefersReducedMotion ? { x: 5 } : {}}
                      >
                        →
                      </motion.div>
                    </motion.a>
                  );
                })}
              </div>
            </div>

            {/* Info Box */}
            <div className="relative p-8 rounded-xl backdrop-blur-md bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20 shadow-xl">
              <h3 className="text-xl mb-3 text-primary">Availability</h3>
              <p className="text-muted-foreground">
                Currently available for freelance projects and contract work. 
                Response time: 24-48 hours.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
