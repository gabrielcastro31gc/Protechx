import { motion } from "framer-motion";
import serviceEssencial from "@/assets/service-essencial-new.jpg";
import serviceImplantacao from "@/assets/service-implantacao-new.jpg";
import serviceGestao from "@/assets/service-gestao-new.jpg";
import serviceSoftware from "@/assets/service-software-new.jpg";
import { useSectionContent } from "@/hooks/useSectionContent";

const defaultImages = [serviceEssencial, serviceImplantacao, serviceGestao, serviceSoftware];

const Services = () => {
  const { content: c } = useSectionContent("services");
  const services: any[] = c.services || [];
  const triggers: string[] = c.triggers || [];

  return (
    <section className="relative py-24 md:py-32 overflow-hidden" id="servicos">
      <div className="container px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <p className="text-xs font-medium tracking-[0.3em] uppercase text-primary mb-4">
            {c.label}
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-6">
            {c.title} <span className="text-gradient-gold">{c.titleHighlight}</span>
          </h2>
        </motion.div>

        {/* Service intro block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl mx-auto mb-16"
        >
          <div className="p-8 rounded border border-border bg-card">
            <h3 className="font-display text-xl md:text-2xl font-bold text-foreground mb-2">
              Tenha um time especializado organizando o seu financeiro
            </h3>
            <p className="text-primary font-semibold text-lg mb-4">
              Você sabe o que fazer? Nós fazemos.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Conte com uma equipe técnica cuidando da organização financeira da sua empresa com método, clareza e responsabilidade.
            </p>
            <p className="text-sm font-semibold text-foreground mb-3">
              Executamos as rotinas financeiras com precisão:
            </p>
            <ul className="space-y-2 mb-6">
              {[
                "Contas a pagar e a receber",
                "Conciliação bancária diária",
                "Fluxo de caixa",
                "Agendamento de pagamentos conforme sua autorização",
                "Emissão de relatórios",
                "Relatórios gerenciais para acompanhamento financeiro",
              ].map((item, j) => (
                <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <svg className="w-3.5 h-3.5 text-primary mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6 italic">
              Analisamos e organizamos as informações, mantemos o financeiro atualizado e fornecemos dados claros para que você tome decisões com segurança.
            </p>
            <a
              href="#diagnostico"
              className="inline-flex items-center gap-3 px-8 py-4 bg-accent text-accent-foreground font-semibold text-sm tracking-wide uppercase rounded hover:opacity-90 transition-all shadow-gold"
            >
              Falar com especialista
            </a>
          </div>
        </motion.div>

        {/* Service cards grid */}
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {services.map((service: any, i: number) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="rounded border border-border bg-card hover:border-primary/30 transition-all flex flex-col overflow-hidden"
            >
              <img
                src={service.imageUrl || defaultImages[i] || defaultImages[0]}
                alt={service.title}
                className="w-full h-40 object-cover"
                loading="lazy"
              />
              <div className="p-8 flex flex-col flex-grow">
                <span className="inline-block text-sm font-semibold tracking-widest uppercase bg-accent text-accent-foreground px-3 py-1 rounded mb-4">
                  {service.tag}
                </span>
                <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
                  {service.title}
                </h3>
                <ul className="space-y-2 mb-5 flex-grow">
                  {(service.items || []).map((item: string, j: number) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <svg className="w-3.5 h-3.5 text-primary mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{service.description}</p>
                {service.price && <p className="text-lg font-semibold text-gradient-gold mb-2">{service.price}</p>}
                {service.note && <p className="text-xs font-medium text-foreground mt-auto pt-3 border-t border-border italic">{service.note}</p>}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Ticker */}
      <div className="absolute bottom-0 left-0 right-0 h-14 pointer-events-none z-20">
        <div className="absolute bottom-0 left-0 w-[200%] bg-gradient-to-r from-primary/90 via-primary to-primary/80 py-3 md:py-4">
          <motion.div
            initial={{ x: "0%" }}
            animate={{ x: "-50%" }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="flex gap-12 md:gap-16 whitespace-nowrap"
          >
            {[...triggers, ...triggers, ...triggers, ...triggers].map((t, i) => (
              <span key={i} className="text-xs md:text-sm font-display font-bold uppercase tracking-[0.2em] text-primary-foreground">
                ⚡ {t}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Services;
