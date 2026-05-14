import { motion } from "framer-motion";
import logo from "@/assets/logo-protechx-sem-fundo.png";
import heroBg from "@/assets/hero-bg-office.jpg";
import { FloatingPaths } from "@/components/ui/background-paths";
import { useSectionContent } from "@/hooks/useSectionContent";
import { useTrackCTA } from "@/hooks/useTrackCTA";

const Hero = () => {
  const { content: c } = useSectionContent("hero");
  const trackCTA = useTrackCTA();
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-accent">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img src={heroBg} alt="" className="w-full h-full object-cover" fetchPriority="high" decoding="async" />
        <div className="absolute inset-0 bg-background/60" />
      </div>

      <FloatingPaths position={1} />
      <FloatingPaths position={-1} />

      <div className="container relative z-10 px-6 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="mb-8"
            >
              <img src={c.logoUrl || logo} alt="ProtechX Soluções Inteligentes" className="h-20 md:h-28 mx-auto object-contain" />
            </motion.div>

            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.15] mb-6 tracking-tight text-foreground drop-shadow-lg">
              {c.title}{" "}
              <span className="text-gradient-gold font-extrabold">{c.titleHighlight}</span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="font-subtitle text-lg md:text-xl text-foreground/90 max-w-xl mx-auto mb-10 leading-relaxed drop-shadow-md"
            >
              {c.subtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="mb-6"
            >
              <a
                href="https://wa.me/5511934529229?text=Olá!%20Gostaria%20de%20solicitar%20uma%20avaliação%20de%20estrutura%20financeira."
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackCTA("hero_cta_primary")}
                className="inline-flex items-center gap-3 px-8 py-4 bg-accent text-accent-foreground font-semibold text-sm tracking-wide uppercase rounded hover:opacity-90 transition-all shadow-lg"
              >
                Solicitar Avaliação de Estrutura Financeira
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="font-subtitle flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-foreground/60 tracking-wide"
            >
              {(c.badges || []).map((badge: string, i: number) => (
                <span key={i}>
                  {i > 0 && <span className="text-primary mr-6">•</span>}
                  {badge}
                </span>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Light glow effect */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[60%] h-60 bg-[#01354f]/30 rounded-full blur-[120px] pointer-events-none z-[1]" />

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-[1]" />
    </section>
  );
};

export default Hero;
