import { motion } from "framer-motion";
import geoImg from "@/assets/geography-section-new.jpg";
import { useSectionContent } from "@/hooks/useSectionContent";

const Geography = () => {
  const { content: c } = useSectionContent("geography");
  const locations: { label: string; desc: string }[] = c.locations || [];
  const serviceTypes: string[] = c.serviceTypes || [];

  return (
    <section className="py-24 md:py-32 bg-surface-elevated" id="atuacao">
      <div className="container px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center mb-12">
            <p className="text-xs font-medium tracking-[0.3em] uppercase text-primary mb-4">{c.label}</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">{c.title} <span className="text-gradient-gold">{c.titleHighlight}</span></h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">{c.description}</p>
            <img src={c.imageUrl || geoImg} alt="Atuação nacional" className="mt-8 w-full max-w-2xl mx-auto rounded border border-border object-cover h-56" loading="lazy" />
          </motion.div>

          <div className="grid sm:grid-cols-3 gap-6">
            {locations.map((loc, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15, duration: 0.6 }} className="p-6 rounded border border-border bg-card text-center">
                <div className="w-10 h-10 rounded-full border-2 border-primary flex items-center justify-center mx-auto mb-4">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                </div>
                <h3 className="font-display text-lg font-bold text-foreground mb-1">{loc.label}</h3>
                <p className="text-sm text-muted-foreground">{loc.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.5, duration: 0.6 }} className="mt-10 text-center">
            <div className="inline-flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
              {serviceTypes.map((st, i) => <span key={i} className="px-4 py-2 rounded border border-border bg-card">{st}</span>)}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Geography;
