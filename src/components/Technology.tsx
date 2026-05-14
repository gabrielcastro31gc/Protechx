import { motion } from "framer-motion";
import techImg from "@/assets/technology-section-new.jpg";
import { useSectionContent } from "@/hooks/useSectionContent";

const Technology = () => {
  const { content: c } = useSectionContent("technology");
  const benefits: string[] = c.benefits || [];
  const triggers: string[] = c.triggers || [];

  return (
    <section className="relative py-24 md:py-32 bg-surface-elevated overflow-hidden" id="tecnologia">
      <div className="absolute bottom-0 left-0 right-0 h-14 pointer-events-none z-20">
        <div className="absolute bottom-0 left-0 w-[200%] bg-gradient-to-r from-primary/90 via-primary to-primary/80 py-3 md:py-4">
          <motion.div initial={{ x: "-50%" }} animate={{ x: "0%" }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="flex gap-12 md:gap-16 whitespace-nowrap">
            {[...triggers, ...triggers, ...triggers, ...triggers].map((t, i) => (
              <span key={i} className="text-xs md:text-sm font-display font-bold uppercase tracking-[0.2em] text-primary-foreground">⚡ {t}</span>
            ))}
          </motion.div>
        </div>
      </div>

      <div className="container px-6 relative z-10 pt-12">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-xs font-medium tracking-[0.3em] uppercase text-primary mb-4">{c.label}</p>
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">{c.title}{" "}<span className="text-gradient-gold">{c.titleHighlight}</span></h2>
              <p className="text-muted-foreground leading-relaxed mb-6">{c.description}</p>
              <p className="text-sm font-medium text-foreground italic border-l-2 border-primary pl-4">{c.quote}</p>
            </div>
            <div className="space-y-6">
              <img src={c.imageUrl || techImg} alt="Software de gestão financeira" className="w-full rounded border border-border object-cover h-48" loading="lazy" />
              <div className="p-8 rounded border border-border bg-card">
                <h3 className="font-display text-lg font-bold text-foreground mb-4">{c.solutionTitle}</h3>
                <ul className="space-y-3 mb-6">
                  {benefits.map((b, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <svg className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                      {b}
                    </li>
                  ))}
                </ul>
                <p className="text-sm text-gradient-gold font-semibold">{c.pricing}</p>
                <p className="text-xs text-muted-foreground mt-2 italic">{c.pricingNote}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Technology;
