import { motion } from "framer-motion";
import { Mail, Linkedin, Github, MessageCircle } from "lucide-react";

/**
 * Seção final — painel de comunicação espacial / terminal.
 * Substitua os links abaixo pelos reais.
 */
const channels = [
  {
    label: "Email",
    action: "TRANSMIT MESSAGE",
    icon: Mail,
    href: "mailto:cauabsilva990@gmail.com",
    color: "#22d3ee",
  },

  
  {
    label: "LinkedIn",
    action: "ACCESS DATA",
    icon: Linkedin,
    href: "https://br.linkedin.com/in/cauabsb",
    color: "#3b82f6",
  },
  {
    label: "GitHub",
    action: "OPEN GITHUB",
    icon: Github,
    href: "https://github.com/cauamogli",
    color: "#a855f7",
  },
  {
    label: "WhatsApp",
    action: "CONTACT ME",
    icon: MessageCircle,
    href: "https://wa.me/5561994649278",
    color: "#22ff99",
  },
];

export default function ContactSection() {
  return (
    <section id="contact" className="relative mx-auto max-w-4xl px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="glass-strong holo-border hud-corners relative overflow-hidden rounded-2xl p-8 md:p-12"
      >
        {/* Header de terminal */}
        <div className="mb-6 flex items-center gap-2 border-b border-neon-cyan/20 pb-4">
          <span className="h-3 w-3 rounded-full bg-neon-pink/80" />
          <span className="h-3 w-3 rounded-full bg-neon-cyan/80" />
          <span className="h-3 w-3 rounded-full bg-neon-green/80" />
          <span className="ml-3 font-body text-xs tracking-widest text-white/40">
            comm-link://caua.dev
          </span>
        </div>

        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-display text-3xl font-black tracking-wider text-white text-glow-cyan md:text-5xl"
        >
          TRANSMISSION
          <br />
          CHANNEL OPEN
        </motion.h2>

        <p className="mt-5 max-w-md font-body text-base text-white/70">
          Entre em contato para projetos, oportunidades ou colaboração.
          <span className="mt-1 block font-display text-[10px] tracking-[0.25em] text-neon-green/80">
            ACCESS GRANTED — AGUARDANDO SUA MENSAGEM
          </span>
        </p>

        {/* Canais */}
        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {channels.map(({ label, action, icon: Icon, href, color }, i) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ scale: 1.03, y: -2 }}
              className="group glass holo-border flex items-center gap-4 rounded-lg p-4"
              style={{ borderColor: `${color}40` }}
            >
              <span
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md border"
                style={{
                  borderColor: `${color}55`,
                  background: `${color}11`,
                  boxShadow: `0 0 14px ${color}33`,
                }}
              >
                <Icon size={18} style={{ color }} />
              </span>
              <div>
                <div className="font-display text-base font-bold text-white">
                  {label}
                </div>
                <div
                  className="font-display text-[9px] tracking-[0.2em]"
                  style={{ color }}
                >
                  {action}
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Glow de fundo */}
        <div className="pointer-events-none absolute -bottom-24 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-neon-cyan/20 blur-[80px]" />
      </motion.div>

      <p className="mt-10 text-center font-body text-[10px] tracking-[0.3em] text-white/30">
        BUILDING THE FUTURE — © 2026 Cauã // DEVELOPER ORBIT
      </p>
    </section>
  );
}
