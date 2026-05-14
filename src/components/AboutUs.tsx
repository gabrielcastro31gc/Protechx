import { motion } from "framer-motion";
import foundersImg from "@/assets/quem-somos-foto.webp";
import { useSectionContent } from "@/hooks/useSectionContent";

const AboutUs = () => {
  const { content: c, loading } = useSectionContent("about");
  const credentials: string[] = c.credentials || [];

  if (loading) {
    return (
      <section className="py-24 md:py-32 bg-surface-elevated" id="sobre">
        <div className="container px-6">
          <div className="max-w-4xl mx-auto animate-pulse">
            <div className="h-8 bg-muted rounded w-1/3 mb-4" />
            <div className="h-6 bg-muted rounded w-2/3 mb-8" />
            <div className="h-40 bg-muted rounded" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 md:py-32 bg-surface-elevated" id="sobre">
      <div className="container px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <p className="text-xs font-medium tracking-[0.3em] uppercase text-primary mb-4">
              {c.label}
            </p>
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-6">
              {c.title} <span className="text-gradient-gold">{c.titleHighlight}</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid md:grid-cols-[1fr_auto] gap-10 items-center"
          >
            <div>
              <h3 className="font-display text-xl md:text-2xl font-bold text-foreground mb-6 leading-tight">
                Do Adversidade ao Sucesso: A História Inspiradora da Nossa Empresa no Pós-Pandemia
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8 font-subtitle italic">
                "A nossa empresa emergiu em meio ao desafio do pós-pandemia, enfrentando obstáculos e celebrando triunfos. Do aprendizado à transformação, assumimos a missão de apoiar outras empresas a prosperarem. Hoje, oferecemos a expertise que nos guiou para que alcancem também o seu sucesso com solidez, clareza e organização financeira."
              </p>
              <div className="space-y-3 mb-10">
                {credentials.map((cr, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.1, duration: 0.6 }}
                    className="flex items-start gap-3"
                  >
                    <svg className="w-4 h-4 text-primary mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <p className="text-foreground font-medium">{cr}</p>
                  </motion.div>
                ))}
              </div>
              <div className="p-6 rounded border border-border bg-card">
                <p className="text-sm text-muted-foreground leading-relaxed">{c.methodologyText}</p>
              </div>
            </div>
            <motion.img
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              src={c.imageUrl || foundersImg}
              alt="Telma e Alexandre — Fundadores ProtechX"
              className="rounded border border-border object-contain w-full md:w-72 h-auto md:max-h-[500px]"
              loading="lazy"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
