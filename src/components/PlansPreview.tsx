import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";

const plans = [
  {
    name: "PX1",
    description: "Baixo volume de movimentação financeira.",
    price: "R$ 399,00",
  },
  {
    name: "PX2",
    description: "Volume intermediário de movimentação financeira.",
    price: "R$ 999,00",
    highlight: true,
  },
  {
    name: "PX3",
    description: "Maior volume operacional.",
    price: "R$ 1.599,00",
  },
];

const included = [
  "Contas a Pagar e Receber",
  "Conciliação Bancária",
  "Emissão de Boletos e Notas Fiscais",
  "Relatórios Financeiros",
  "Gerente Dedicado",
];

const PlansPreview = () => {
  return (
    <section className="py-24 md:py-32 bg-accent text-accent-foreground" id="planos">
      <div className="container px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-xs font-medium tracking-[0.3em] uppercase text-primary mb-4">Planos</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4 text-white">
            Planos compatíveis com o{" "}
            <span className="text-primary">estágio da sua empresa</span>
          </h2>
          <p className="text-accent-foreground/70 max-w-2xl mx-auto font-montserrat">
            Todos os nossos planos contemplam estrutura completa para organização financeira
          </p>
        </motion.div>

        {/* Included features */}
        <div className="flex flex-wrap justify-center gap-3 mb-14 max-w-3xl mx-auto">
          {included.map((item, i) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.4 }}
              className="flex items-center gap-2 bg-accent-foreground/10 border border-accent-foreground/10 rounded-full px-4 py-2"
            >
              <Check className="w-3.5 h-3.5 text-primary" />
              <span className="text-xs font-medium text-accent-foreground/80">{item}</span>
            </motion.div>
          ))}
        </div>

        {/* Plan cards */}
        <div className="grid md:grid-cols-3 gap-5 max-w-4xl mx-auto mb-12">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className={`rounded-2xl p-6 text-center border ${
                plan.highlight
                  ? "border-primary bg-primary/10 shadow-lg shadow-primary/10"
                  : "border-accent-foreground/10 bg-accent-foreground/5"
              }`}
            >
              <h3 className="font-rajdhani text-3xl font-extrabold mb-2 tracking-wide text-white drop-shadow-sm">{plan.name}</h3>
              <p className="text-sm text-accent-foreground/60 mb-6">{plan.description}</p>
              <p className="text-xs uppercase tracking-wider text-accent-foreground/50 mb-1">A partir de</p>
              <p className="text-2xl font-bold font-rajdhani">{plan.price}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-center"
        >
          <a
            href="/planos"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition-all shadow-lg"
          >
            Saiba mais sobre nossos planos
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default PlansPreview;
