import { motion } from "framer-motion";
import { useSectionContent } from "@/hooks/useSectionContent";

const HowItWorks = () => {
  const { content: c } = useSectionContent("how_it_works");
  const steps: any[] = c.steps || [];

  return (
    <section className="py-24 md:py-32 bg-surface-elevated" id="como-funciona">
      <div className="container px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-xs font-medium tracking-[0.3em] uppercase text-primary mb-4">
            {c.label}
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-bold">
            {c.title}{" "}
            <span className="text-gradient-gold">{c.titleHighlight}</span>
          </h2>
        </motion.div>

        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8">
          {steps.map((step: any, i: number) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              className="relative p-8 rounded border border-border bg-card hover:border-primary/30 transition-all text-center"
            >
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-display font-bold text-primary">
                  {step.number}
                </span>
              </div>
              <h3 className="font-display text-lg font-bold text-foreground mb-3">
                {step.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {step.description}
              </p>
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-px bg-primary/30" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
