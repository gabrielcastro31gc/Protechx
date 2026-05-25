import { motion } from "framer-motion";
import { useSectionContent } from "@/hooks/useSectionContent";
import { useTrackCTA } from "@/hooks/useTrackCTA";
import { WHATSAPP_URL } from "@/lib/whatsapp";

const FinalCTA = () => {
  const { content: c } = useSectionContent("final_cta");
  const trackCTA = useTrackCTA();

  return (
    <section className="py-24 md:py-32 bg-accent relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 50%, hsl(43,55%,50%), transparent 60%)",
        }}
      />
      <div className="container px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="font-display text-3xl md:text-5xl font-bold leading-tight mb-6 text-accent-foreground whitespace-pre-line">
            {c.title}
          </h2>
          <p className="text-lg md:text-xl text-accent-foreground/70 mb-10 max-w-2xl mx-auto">
            {c.subtitle}
          </p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackCTA("final_cta_button")}
            className="inline-flex items-center gap-3 px-10 py-5 bg-primary text-primary-foreground font-semibold text-sm tracking-wide uppercase rounded hover:brightness-110 transition-all shadow-gold"
          >
            {c.ctaText}
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
          <p className="text-xs text-accent-foreground/50 mt-6">{c.footnote}</p>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTA;
