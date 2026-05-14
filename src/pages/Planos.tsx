import { motion } from "framer-motion";
import { Check, ArrowRight, CreditCard, Receipt, Building2, FileText, Shield, BarChart3, Monitor, Users } from "lucide-react";
import { FloatingPaths } from "@/components/ui/background-paths";
import Navbar from "@/components/Navbar";
import WhatsAppButton from "@/components/WhatsAppButton";
import Footer from "@/components/Footer";
import planosHeroBg from "@/assets/planos-hero-bg.jpg";

const WHATSAPP_LINK = "https://wa.me/5511934529229?text=Olá!%20Gostaria%20de%20analisar%20meu%20caso.";

const features = [
  { icon: CreditCard, label: "Contas a Pagar" },
  { icon: Receipt, label: "Contas a Receber" },
  { icon: Building2, label: "Conciliação Bancária" },
  { icon: FileText, label: "Emissão de Boletos" },
  { icon: Shield, label: "Emissão de Notas Fiscais" },
  { icon: BarChart3, label: "Gestão de Faturamento" },
  { icon: Monitor, label: "Relatórios Financeiros" },
  { icon: Users, label: "Gerente Dedicado" },
];

const services = [
  "Registro e classificação de contas a receber",
  "Registro e classificação de contas a pagar",
  "Conciliação de movimentações bancárias",
  "Conferência de faturas de cartão de crédito",
  "Conciliação de recebimentos via plataformas digitais como PagSeguro, Asaas e PayPal",
  "Emissão de notas fiscais de serviços",
  "Geração e envio de boletos bancários",
  "Organização do processo de faturamento",
  "Relatório de fluxo de caixa atualizado",
  "Demonstrativo de Resultados do Exercício (DRE) gerencial",
  "Preparação de pagamentos para execução após aprovação da empresa",
  "Suporte técnico especializado na plataforma Conta Azul",
  "Reuniões periódicas de análise financeira com especialista, conforme plano contratado",
  "Painel gerencial personalizado com indicadores financeiros",
];

const steps = [
  { number: "01", title: "Diagnóstico", description: "Analisamos a situação financeira atual da sua empresa e identificamos oportunidades de melhoria." },
  { number: "02", title: "Implantação", description: "Configuramos as ferramentas e processos adequados para a organização financeira." },
  { number: "03", title: "Gestão Contínua", description: "Mantemos o financeiro organizado com acompanhamento profissional dedicado." },
];

const plans = [
  {
    name: "PX1",
    badge: "Essencial",
    description: "Indicado para empresas com baixo volume de movimentação financeira.",
    items: [
      "Até 5 notas fiscais por mês",
      "Até 30 lançamentos mensais",
      "Relatório de fluxo de caixa atualizado",
      "Não inclui controle de cartão de crédito",
    ],
    price: "399",
    cents: "00",
    highlight: false,
  },
  {
    name: "PX2",
    badge: "Mais popular",
    description: "Indicado para empresas com volume intermediário de movimentação financeira.",
    items: [
      "De 31 a 60 notas fiscais por mês",
      "Até 60 lançamentos mensais",
      "Relatório de fluxo de caixa atualizado",
      "Não inclui controle de cartão de crédito",
    ],
    price: "999",
    cents: "00",
    highlight: true,
  },
  {
    name: "PX3",
    badge: "Avançado",
    description: "Indicado para empresas com maior volume operacional.",
    items: [
      "De 61 até 200 lançamentos mensais",
      "Inclusão de até 50 vendas com cartão de crédito",
      "Relatório de fluxo de caixa atualizado",
      "Até 4 relatórios financeiros detalhados",
    ],
    price: "1.599",
    cents: "00",
    highlight: false,
  },
];

const pxSistemaCategories = [
  {
    title: "Gestão de Vendas e Serviços",
    items: [
      "Emissão de ordens de serviço",
      "Criação de orçamentos para clientes",
      "Registro e acompanhamento de vendas realizadas",
    ],
  },
  {
    title: "Faturamento e Emissão de Notas",
    items: [
      "Emissão de nota fiscal de venda de produtos",
      "Emissão de nota fiscal de prestação de serviços",
      "Geração automática de nota fiscal após confirmação de venda",
      "Envio automático da nota fiscal ao cliente",
    ],
  },
  {
    title: "Cobrança e Recebimentos",
    items: [
      "Controle de contas a receber",
      "Geração automática de boletos bancários",
      "Envio automático de boletos ao cliente",
    ],
  },
  {
    title: "Controle Financeiro e Operacional",
    items: [
      "Controle de contas a pagar",
      "Conciliação das movimentações financeiras",
      "Controle de estoque de produtos",
      "Banco digital integrado ao sistema",
      "Relatórios financeiros e operacionais para acompanhamento da empresa",
    ],
  },
];

const Planos = () => {
  return (
    <div className="min-h-screen bg-background font-montserrat">
      <Navbar />

      {/* ═══════════ HERO BANNER ═══════════ */}
      <section className="relative min-h-[60vh] md:min-h-[65vh] flex items-center justify-center overflow-hidden">
        <img src={planosHeroBg} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-accent/80" />
        <div className="absolute inset-0"><FloatingPaths position={1} /><FloatingPaths position={-1} /></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/8 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />

        <div className="relative z-10 container px-6 text-center py-32 md:py-40">
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}
            className="text-primary text-xs font-semibold tracking-[0.3em] uppercase mb-5"
          >
            Nossos Planos
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
            className="font-rajdhani text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-5 max-w-5xl mx-auto leading-snug"
          >
            <span className="block text-white">Planos compatíveis com o</span>
            <span className="block text-primary">estágio da sua empresa</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base md:text-lg text-white/90 max-w-xl mx-auto"
          >
            Todos os nossos planos contemplam estrutura completa para organização financeira
          </motion.p>
        </div>
      </section>

      {/* ═══════════ FEATURES BAR ═══════════ */}
      <section className="py-10 md:py-14 bg-card border-b border-border">
        <div className="container px-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div
                  key={f.label}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.4 }}
                  className="flex items-center gap-3 p-3"
                >
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-sm font-medium text-foreground">{f.label}</span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════ SERVICES ═══════════ */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container px-6 max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold tracking-[0.3em] uppercase text-primary mb-3">Serviços</p>
            <h2 className="font-rajdhani text-2xl md:text-4xl font-bold text-foreground mb-3">
              Defina o modelo de organização financeira
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Que melhor se adapta à realidade da sua empresa
            </p>
          </div>

          <div className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm">
            <div className="grid md:grid-cols-2 gap-x-10 gap-y-4">
              {services.map((s, i) => (
                <div key={i} className="flex items-start gap-3 py-1.5">
                  <Check className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                  <span className="text-sm text-foreground/80 leading-relaxed">{s}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-14 text-center">
            <h3 className="text-xl font-bold text-foreground mb-2">
              Tenha um time especializado organizando o seu financeiro.
            </h3>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
              Você não precisa fazer tudo sozinho. Conte com uma equipe técnica cuidando da organização financeira da sua empresa.
            </p>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition-all shadow-md"
            >
              Falar com Especialista
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* ═══════════ STEPS ═══════════ */}
      <section className="py-16 md:py-24 bg-muted/40 border-y border-border">
        <div className="container px-6 max-w-5xl mx-auto text-center">
          <p className="text-xs font-semibold tracking-[0.3em] uppercase text-primary mb-3">Como funciona</p>
          <h2 className="font-rajdhani text-2xl md:text-4xl font-bold text-foreground mb-14">
            Veja como é simples
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.5 }}
                className="bg-card rounded-2xl border border-border p-8 shadow-sm text-center relative"
              >
                <span className="text-5xl font-rajdhani font-bold text-primary/15 absolute top-4 right-6">
                  {step.number}
                </span>
                <div className="w-12 h-12 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-lg font-bold font-rajdhani mx-auto mb-5">
                  {step.number}
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2 font-rajdhani">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ PRICING PLANS ═══════════ */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container px-6 max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold tracking-[0.3em] uppercase text-primary mb-3">Planos</p>
            <h2 className="font-rajdhani text-2xl md:text-4xl font-bold text-foreground mb-3">
              Escolha o plano ideal para sua empresa
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Todos os planos incluem gerente dedicado e suporte especializado
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {plans.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className={`rounded-2xl border flex flex-col overflow-hidden ${
                  plan.highlight
                    ? "border-primary shadow-lg shadow-primary/10 relative"
                    : "border-border shadow-sm"
                }`}
              >
                {/* Header */}
                <div className={`p-6 pb-4 ${plan.highlight ? "bg-accent text-accent-foreground" : "bg-card"}`}>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-rajdhani text-3xl font-extrabold tracking-wide">{plan.name}</h3>
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full ${
                      plan.highlight
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}>
                      {plan.badge}
                    </span>
                  </div>
                  <p className={`text-sm leading-relaxed ${plan.highlight ? "text-accent-foreground/70" : "text-muted-foreground"}`}>
                    {plan.description}
                  </p>
                </div>

                {/* Price */}
                <div className={`px-6 py-5 border-y ${
                  plan.highlight ? "bg-accent border-white/10" : "bg-muted/30 border-border"
                }`}>
                  <p className={`text-xs uppercase tracking-wider mb-1 ${plan.highlight ? "text-accent-foreground/50" : "text-muted-foreground"}`}>
                    A partir de
                  </p>
                  <div className="flex items-baseline gap-1">
                    <span className={`text-sm ${plan.highlight ? "text-accent-foreground/60" : "text-muted-foreground"}`}>R$</span>
                    <span className={`text-4xl font-bold font-rajdhani ${plan.highlight ? "text-accent-foreground" : "text-foreground"}`}>
                      {plan.price}
                    </span>
                    <span className={`text-sm ${plan.highlight ? "text-accent-foreground/60" : "text-muted-foreground"}`}>,{plan.cents}/mês</span>
                  </div>
                </div>

                {/* Items */}
                <div className={`p-6 flex-1 ${plan.highlight ? "bg-accent" : "bg-card"}`}>
                  <ul className="space-y-3">
                    {plan.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-2.5 text-sm">
                        <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        <span className={plan.highlight ? "text-accent-foreground/80" : "text-foreground/80"}>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <div className={`p-6 pt-0 ${plan.highlight ? "bg-accent" : "bg-card"}`}>
                  <a
                    href={WHATSAPP_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full flex items-center justify-center gap-2 py-3 rounded-lg font-semibold text-sm transition-all ${
                      plan.highlight
                        ? "bg-primary text-primary-foreground hover:opacity-90 shadow-md"
                        : "bg-accent text-accent-foreground hover:opacity-90"
                    }`}
                  >
                    Contratar
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Observations */}
          <div className="max-w-3xl mx-auto mt-12 bg-muted/50 rounded-xl border border-border p-6 text-sm text-muted-foreground space-y-2">
            <h4 className="font-semibold text-foreground text-base">Observações</h4>
            <p>
              O Demonstrativo de Resultados do Exercício (DRE) é um relatório opcional e pode ser contratado separadamente.
              Solicite orçamento caso tenha interesse na elaboração desse demonstrativo.
            </p>
            <p>
              Caso sua empresa não se enquadre nos limites apresentados, oferecemos planos personalizados, definidos conforme o volume de movimentações e a complexidade da operação financeira.
            </p>
          </div>

          {/* Main CTA */}
          <div className="text-center mt-14">
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-10 py-4 bg-primary text-primary-foreground font-bold text-base rounded-lg hover:opacity-90 transition-all shadow-lg"
            >
              Analisar meu caso
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* ═══════════ PX SISTEMA ═══════════ */}
      <section className="py-16 md:py-24 bg-accent text-accent-foreground">
        <div className="container px-6 max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold tracking-[0.3em] uppercase text-primary mb-3">Software</p>
            <h2 className="font-rajdhani text-2xl md:text-4xl font-bold mb-3">PX Sistema</h2>
            <p className="text-accent-foreground/60 max-w-2xl mx-auto">
              Sistema de gestão empresarial para organizar vendas, emissão de notas e controle financeiro da sua empresa.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {pxSistemaCategories.map((cat, i) => (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                className="bg-white/5 border border-white/10 rounded-xl p-6"
              >
                <h3 className="font-rajdhani text-base font-bold mb-4 text-accent-foreground">{cat.title}</h3>
                <ul className="space-y-2.5">
                  {cat.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-2.5 text-sm text-accent-foreground/75">
                      <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Pricing */}
          <div className="text-center mt-14 py-8 bg-white/5 border border-white/10 rounded-2xl">
            <p className="text-accent-foreground/50 text-sm mb-1">Mensalidade do sistema a partir de</p>
            <div className="flex items-baseline justify-center gap-1">
              <span className="text-accent-foreground/50 text-sm">R$</span>
              <span className="text-5xl font-bold font-rajdhani">369</span>
              <span className="text-accent-foreground/50 text-sm">,90/mês</span>
            </div>
          </div>

          {/* Obs */}
          <div className="mt-10 bg-white/5 border border-white/10 rounded-xl p-6 text-sm text-accent-foreground/60 space-y-2">
            <h4 className="font-semibold text-accent-foreground">Observações</h4>
            <p>Oferecemos implantação, configuração inicial e treinamento para utilização do sistema.</p>
            <p>
              Caso sua empresa não contrate os planos de organização financeira da ProtechX, consulte valores para implantação e treinamento da plataforma.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════ FOOTER ═══════════ */}
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Planos;
