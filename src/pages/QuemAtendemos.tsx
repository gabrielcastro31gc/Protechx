import { motion } from "framer-motion";
import { useState } from "react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import WhatsAppButton from "@/components/WhatsAppButton";
import { WHATSAPP_URL } from "@/lib/whatsapp";

const segments = [
	{
		title: "Administrativo e Apoio Operacional",
		intro:
      "Empresas que precisam estruturar rotinas administrativas e financeiras sem aumentar o quadro interno.",
    extra:
      "Cobertura de férias no setor administrativo e financeiro — Atendemos empresas que precisam de continuidade operacional durante férias ou ausência temporária do colaborador do administrativo ou financeiro. Essa cobertura evita interrupções e elimina a necessidade de contratação temporária. Não há geração de vínculo trabalhista.",
    items: [],
  },
  {
    title: "Automotivo e Serviços Técnicos",
    intro: "",
    extra: "",
    items: [
      "Auto centers",
      "Centros automotivos",
      "Empresas de manutenção técnica",
      "Empresas de serviços técnicos",
      "Estética automotiva",
      "Funilarias",
      "Oficinas mecânicas",
    ],
  },
  {
    title: "Comércio Especializado",
    intro: "",
    extra: "",
    items: [
      "Lojas de piscinas",
      "Lojas de produtos químicos",
      "Lojas de materiais de construção",
      "Lojas de equipamentos técnicos",
      "Lojas especializadas",
      "Pequenos comércios estruturados",
    ],
  },
  {
    title: "Construção Civil e Projetos Técnicos",
    intro: "",
    extra: "",
    items: [
      "Arquitetos",
      "Construtoras de pequeno porte",
      "Design de interiores",
      "Empresas de climatização",
      "Empresas de energia solar",
      "Empresas de instalação elétrica",
      "Empresas de instalação hidráulica",
      "Empresas de manutenção predial",
      "Empresas de reformas",
      "Engenharia civil",
      "Engenharia elétrica",
      "Engenharia estrutural",
      "Engenharia de produção",
      "Escritórios de arquitetura",
      "Escritórios de engenharia",
      "Marcenarias",
      "Serralharias",
      "Vidraçarias",
    ],
  },
  {
    title: "Criadores de Conteúdo e Economia Digital",
    intro: "",
    extra: "",
    items: [
      "Criadores de conteúdo",
      "Influenciadores digitais",
      "Mentores digitais",
    ],
  },
  {
    title: "Educação e Treinamentos",
    intro: "",
    extra: "",
    items: [
      "Cursos livres",
      "Cursos profissionalizantes",
      "Escolas de idiomas",
      "Instrutores independentes",
      "Treinamentos corporativos",
    ],
  },
  {
    title: "Igrejas e Terceiro Setor",
    intro:
      "Também apoiamos instituições que precisam estruturar o financeiro e organizar informações para prestação de contas junto a órgãos públicos e instituições financiadoras.",
    extra: "",
    items: [
      "Associações",
      "Entidades religiosas",
      "Fundações",
      "Instituições de terceiro setor",
      "Organizações sociais",
      "Organizações sem fins lucrativos",
    ],
  },
  {
    title: "Marketing e Tecnologia",
    intro: "",
    extra: "",
    items: [
      "Agências de marketing",
      "Agências digitais",
      "Empresas de desenvolvimento web",
      "Empresas de software",
      "Especialistas em marketing digital",
      "Gestores de tráfego",
      "Produtores de conteúdo",
      "Startups",
    ],
  },
  {
    title: "Prestadores de Serviços Profissionais",
    intro: "",
    extra: "",
    items: [
      "Advogados",
      "Consultores empresariais",
      "Consultores financeiros",
      "Consultores de marketing",
      "Consultores de vendas",
      "Profissionais de recursos humanos",
      "Representantes comerciais",
    ],
  },
  {
    title: "Saúde, Clínicas e Profissionais Liberais",
    intro: "",
    extra: "",
    items: [
      "Clínicas de estética",
      "Clínicas de fisioterapia",
      "Clínicas médicas",
      "Clínicas odontológicas",
      "Fisioterapeutas",
      "Fonoaudiólogos",
      "Nutricionistas",
      "Psicólogos",
      "Profissionais da área terapêutica",
    ],
  },
  {
    title: "Parcerias Estratégicas",
    intro:
      "A ProtechX também atua em parceria com empresas e profissionais que desejam ampliar a estrutura de atendimento sem precisar montar equipe interna. Essas parcerias permitem que o operacional seja estruturado junto ao cliente, mantendo informações confidenciais para análises periódicas e acompanhamento estratégico.",
    extra: "",
    items: [
      "Consultores empresariais",
      "Consultores financeiros",
      "Escritórios de advocacia",
      "Escritórios de contabilidade",
    ],
  },
];

const glossary = [
  {
    term: "Empresa para organizar financeiro",
    text: "Empresários buscam uma empresa para organizar financeiro quando precisam estruturar rotinas, centralizar informações e manter continuidade operacional no financeiro e no administrativo.",
  },
  {
    term: "Empresa para cuidar do financeiro",
    text: "Essa busca normalmente aparece quando o empresário precisa garantir execução constante das rotinas financeiras e quer parar de depender de improviso e urgência.",
  },
  {
    term: "Organizar financeiro da empresa",
    text: "Organizar financeiro da empresa significa estruturar processos para acompanhar entradas, saídas, pagamentos e recebimentos com clareza e previsibilidade.",
  },
  {
    term: "Terceirizar financeiro da empresa",
    text: "Terceirizar o financeiro significa contar com apoio especializado para executar rotinas operacionais e organizar as informações financeiras da empresa.",
  },
];

const faqs = [
  {
    q: "Como terceirizar o financeiro da empresa com segurança?",
    a: "Terceirizar o financeiro significa contratar apoio especializado para organizar e executar rotinas como contas a pagar, contas a receber, conciliações e relatórios. A decisão continua com o empresário. O benefício é ter continuidade e informação organizada.",
  },
  {
    q: "Existe empresa para organizar o financeiro e manter a rotina em dia?",
    a: "Sim. Uma empresa para organizar financeiro atua estruturando processos e garantindo execução constante das rotinas financeiras. Isso reduz improviso e aumenta previsibilidade.",
  },
  {
    q: "O que uma empresa para cuidar do financeiro faz exatamente?",
    a: "Ela executa rotinas operacionais e organiza informações financeiras para acompanhamento. Isso pode incluir contas a pagar, contas a receber, conciliação e relatórios operacionais.",
  },
  {
    q: "Como organizar o financeiro da empresa quando está tudo disperso?",
    a: "O caminho mais eficiente é centralizar informações e criar rotina: estruturar contas a pagar e receber, conciliar movimentações e acompanhar fluxo de caixa com regularidade.",
  },
  {
    q: "Como fazer controle financeiro para empresa sem depender de uma única pessoa?",
    a: "O controle melhora quando existe processo e repetição. Rotinas estruturadas reduzem dependência, aumentam continuidade e diminuem risco em férias, feriados e trocas de equipe.",
  },
  {
    q: "Terceirizar financeiro substitui a contabilidade?",
    a: "Não. A contabilidade cuida das obrigações fiscais e contábeis. O financeiro organiza o operacional do dia a dia. Quando o financeiro está organizado, ele fortalece o trabalho contábil. O financeiro é a pré-contabilidade.",
  },
  {
    q: "A ProtechX atende meu segmento mesmo se ele não estiver listado?",
    a: "Na maioria dos casos, sim. O que define o atendimento é a necessidade de organizar rotinas financeiras e administrativas. Se você não encontrou seu ramo, nossa equipe avalia sua operação e direciona o modelo mais adequado.",
  },
];

const signs = [
  "Pagamentos feitos sem rotina",
  "Contas a receber sem previsibilidade",
  "Fluxo de caixa sem clareza",
  "Informações financeiras espalhadas entre banco, planilhas e mensagens",
  "Dependência de uma única pessoa no administrativo ou no financeiro",
];

const QuemAtendemos = () => {
  const [openSegment, setOpenSegment] = useState<number | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-20 bg-accent">
        <div className="container px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center"
          >
            <p className="text-xs font-medium tracking-[0.3em] uppercase text-primary mb-4">
              Quem atendemos
            </p>
            <h1 className="font-display text-3xl md:text-5xl font-bold text-accent-foreground mb-6">
              Empresas que precisam organizar o financeiro com{" "}
              <span className="text-gradient-gold">estrutura e clareza</span>
            </h1>
            <p className="text-lg text-accent-foreground/70 leading-relaxed">
              Se você está buscando organizar o financeiro da empresa,
              estruturar rotinas administrativas ou encontrar uma empresa para
              cuidar do financeiro, você está no lugar certo.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search terms */}
      <section className="py-16">
        <div className="container px-6">
          <div className="max-w-3xl mx-auto">
            <p className="text-muted-foreground mb-6 text-center">
              Muitos empresários chegam até a ProtechX pesquisando no Google
              termos como:
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                "terceirizar financeiro da empresa",
                "empresa para organizar financeiro",
                "empresa para cuidar do financeiro",
                "organizar financeiro da empresa",
                "controle financeiro para empresa",
              ].map((term) => (
                <span
                  key={term}
                  className="px-4 py-2 rounded border border-border bg-card text-sm font-medium text-foreground"
                >
                  {term}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Authority */}
      <section className="py-16 bg-surface-elevated">
        <div className="container px-6">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="font-display text-2xl md:text-3xl font-bold mb-6">
                Autoridade <span className="text-gradient-gold">ProtechX</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                A ProtechX é liderada por Telma Vargas, especialista nacional em
                BPO financeiro, mentora de profissionais da área e referência em
                estruturação de rotinas financeiras e administrativas para
                empresas.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                A metodologia aplicada combina processos, tecnologia e
                acompanhamento humano para transformar improviso em estrutura.
                Isso permite que empresas de diferentes setores organizem o
                financeiro com continuidade e clareza.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Signs */}
      <section className="py-16">
        <div className="container px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
              Como o empresário percebe que chegou a hora de{" "}
              <span className="text-gradient-gold">organizar o financeiro</span>
            </h2>
            <p className="text-muted-foreground mb-8">
              Normalmente a empresa busca apoio quando começa a conviver com
              sinais como:
            </p>
            <div className="space-y-3 mb-6">
              {signs.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  className="flex items-start gap-3"
                >
                  <svg
                    className="w-4 h-4 text-primary mt-1 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <p className="text-foreground">{s}</p>
                </motion.div>
              ))}
            </div>
            <p className="text-lg font-semibold text-primary italic">
              Quando isso acontece, não falta esforço. Falta método.
            </p>
          </div>
        </div>
      </section>

      {/* Segments */}
      <section className="py-16 bg-surface-elevated">
        <div className="container px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-10 text-center">
              Segmentos que{" "}
              <span className="text-gradient-gold">atendemos</span>
            </h2>
            <div className="space-y-3">
              {segments.map((seg, i) => (
                <div
                  key={i}
                  className="rounded border border-border bg-card overflow-hidden"
                >
                  <button
                    onClick={() => setOpenSegment(openSegment === i ? null : i)}
                    className="w-full flex items-center justify-between p-5 text-left hover:bg-muted/30 transition-colors"
                  >
                    <h3 className="font-display text-lg font-bold text-foreground">
                      {seg.title}
                    </h3>
                    <svg
                      className={`w-5 h-5 text-primary transition-transform ${openSegment === i ? "rotate-180" : ""}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  {openSegment === i && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="px-5 pb-5"
                    >
                      {seg.intro && (
                        <p className="text-muted-foreground leading-relaxed mb-4">
                          {seg.intro}
                        </p>
                      )}
                      {seg.extra && (
                        <p className="text-sm text-muted-foreground leading-relaxed mb-4 p-4 rounded bg-muted/30 border border-border">
                          {seg.extra}
                        </p>
                      )}
                      {seg.items.length > 0 && (
                        <div className="grid sm:grid-cols-2 gap-2">
                          {seg.items.map((item, j) => (
                            <div
                              key={j}
                              className="flex items-center gap-2 text-sm text-foreground"
                            >
                              <svg
                                className="w-3 h-3 text-primary flex-shrink-0"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                              {item}
                            </div>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Glossary */}
      <section className="py-16">
        <div className="container px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-10 text-center">
              Glossário de <span className="text-gradient-gold">buscas</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {glossary.map((g, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="p-6 rounded border border-border bg-card"
                >
                  <h3 className="font-display text-base font-bold text-foreground mb-2">
                    {g.term}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {g.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-surface-elevated">
        <div className="container px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-10 text-center">
              Perguntas <span className="text-gradient-gold">frequentes</span>
            </h2>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  className="rounded border border-border bg-card overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between p-5 text-left hover:bg-muted/30 transition-colors"
                  >
                    <h3 className="font-display text-sm md:text-base font-bold text-foreground pr-4">
                      {faq.q}
                    </h3>
                    <svg
                      className={`w-5 h-5 text-primary flex-shrink-0 transition-transform ${openFaq === i ? "rotate-180" : ""}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  {openFaq === i && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="px-5 pb-5"
                    >
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 bg-accent">
        <div className="container px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-2xl md:text-4xl font-bold text-accent-foreground mb-6">
              Se você está buscando uma empresa para organizar financeiro, o
              próximo passo é{" "}
              <span className="text-gradient-gold">avaliar sua operação.</span>
            </h2>
            <p className="text-accent-foreground/70 mb-10">
              Entenda qual modelo faz mais sentido para o seu momento.
            </p>
            <div className="grid sm:grid-cols-2 gap-4 max-w-xl mx-auto">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-4 bg-primary text-primary-foreground font-semibold text-sm tracking-wide uppercase rounded hover:brightness-110 transition-all text-center"
              >
                Treinar minha equipe do administrativo
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-4 bg-primary text-primary-foreground font-semibold text-sm tracking-wide uppercase rounded hover:brightness-110 transition-all text-center"
              >
                Treinar minha equipe do financeiro
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-4 border border-primary/30 text-accent-foreground font-semibold text-sm tracking-wide uppercase rounded hover:bg-primary/10 transition-all text-center"
              >
                Não encontrei meu ramo aqui
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-4 border border-primary/30 text-accent-foreground font-semibold text-sm tracking-wide uppercase rounded hover:bg-primary/10 transition-all text-center"
              
								A metodologia aplicada combina processos, tecnologia e
								acompanhamento humano para transformar improviso em estrutura.
								Isso permite que empresas de diferentes setores organizem o
								financeiro com continuidade e clareza.
							</p>
						</motion.div>
					</div>
				</div>
			</section>

			{/* Signs */}
			<section className="py-16">
				<div className="container px-6">
					<div className="max-w-3xl mx-auto">
						<h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
							Como o empresário percebe que chegou a hora de{" "}
							<span className="text-gradient-gold">organizar o financeiro</span>
						</h2>
						<p className="text-muted-foreground mb-8">
							Normalmente a empresa busca apoio quando começa a conviver com
							sinais como:
						</p>
						<div className="space-y-3 mb-6">
							{signs.map((s, i) => (
								<motion.div
									key={i}
									initial={{ opacity: 0, x: -20 }}
									whileInView={{ opacity: 1, x: 0 }}
									viewport={{ once: true }}
									transition={{ delay: i * 0.08, duration: 0.5 }}
									className="flex items-start gap-3"
								>
									<svg
										className="w-4 h-4 text-primary mt-1 flex-shrink-0"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
										/>
									</svg>
									<p className="text-foreground">{s}</p>
								</motion.div>
							))}
						</div>
						<p className="text-lg font-semibold text-primary italic">
							Quando isso acontece, não falta esforço. Falta método.
						</p>
					</div>
				</div>
			</section>

			{/* Segments */}
			<section className="py-16 bg-surface-elevated">
				<div className="container px-6">
					<div className="max-w-3xl mx-auto">
						<h2 className="font-display text-2xl md:text-3xl font-bold mb-10 text-center">
							Segmentos que{" "}
							<span className="text-gradient-gold">atendemos</span>
						</h2>
						<div className="space-y-3">
							{segments.map((seg, i) => (
								<div
									key={i}
									className="rounded border border-border bg-card overflow-hidden"
								>
									<button
										onClick={() => setOpenSegment(openSegment === i ? null : i)}
										className="w-full flex items-center justify-between p-5 text-left hover:bg-muted/30 transition-colors"
									>
										<h3 className="font-display text-lg font-bold text-foreground">
											{seg.title}
										</h3>
										<svg
											className={`w-5 h-5 text-primary transition-transform ${openSegment === i ? "rotate-180" : ""}`}
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M19 9l-7 7-7-7"
											/>
										</svg>
									</button>
									{openSegment === i && (
										<motion.div
											initial={{ opacity: 0, height: 0 }}
											animate={{ opacity: 1, height: "auto" }}
											className="px-5 pb-5"
										>
											{seg.intro && (
												<p className="text-muted-foreground leading-relaxed mb-4">
													{seg.intro}
												</p>
											)}
											{seg.extra && (
												<p className="text-sm text-muted-foreground leading-relaxed mb-4 p-4 rounded bg-muted/30 border border-border">
													{seg.extra}
												</p>
											)}
											{seg.items.length > 0 && (
												<div className="grid sm:grid-cols-2 gap-2">
													{seg.items.map((item, j) => (
														<div
															key={j}
															className="flex items-center gap-2 text-sm text-foreground"
														>
															<svg
																className="w-3 h-3 text-primary flex-shrink-0"
																fill="none"
																stroke="currentColor"
																viewBox="0 0 24 24"
															>
																<path
																	strokeLinecap="round"
																	strokeLinejoin="round"
																	strokeWidth={2}
																	d="M5 13l4 4L19 7"
																/>
															</svg>
															{item}
														</div>
													))}
												</div>
											)}
										</motion.div>
									)}
								</div>
							))}
						</div>
					</div>
				</div>
			</section>

			{/* Glossary */}
			<section className="py-16">
				<div className="container px-6">
					<div className="max-w-3xl mx-auto">
						<h2 className="font-display text-2xl md:text-3xl font-bold mb-10 text-center">
							Glossário de <span className="text-gradient-gold">buscas</span>
						</h2>
						<div className="grid md:grid-cols-2 gap-6">
							{glossary.map((g, i) => (
								<motion.div
									key={i}
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true }}
									transition={{ delay: i * 0.1, duration: 0.5 }}
									className="p-6 rounded border border-border bg-card"
								>
									<h3 className="font-display text-base font-bold text-foreground mb-2">
										{g.term}
									</h3>
									<p className="text-sm text-muted-foreground leading-relaxed">
										{g.text}
									</p>
								</motion.div>
							))}
						</div>
					</div>
				</div>
			</section>

			{/* FAQ */}
			<section className="py-16 bg-surface-elevated">
				<div className="container px-6">
					<div className="max-w-3xl mx-auto">
						<h2 className="font-display text-2xl md:text-3xl font-bold mb-10 text-center">
							Perguntas <span className="text-gradient-gold">frequentes</span>
						</h2>
						<div className="space-y-3">
							{faqs.map((faq, i) => (
								<div
									key={i}
									className="rounded border border-border bg-card overflow-hidden"
								>
									<button
										onClick={() => setOpenFaq(openFaq === i ? null : i)}
										className="w-full flex items-center justify-between p-5 text-left hover:bg-muted/30 transition-colors"
									>
										<h3 className="font-display text-sm md:text-base font-bold text-foreground pr-4">
											{faq.q}
										</h3>
										<svg
											className={`w-5 h-5 text-primary flex-shrink-0 transition-transform ${openFaq === i ? "rotate-180" : ""}`}
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M19 9l-7 7-7-7"
											/>
										</svg>
									</button>
									{openFaq === i && (
										<motion.div
											initial={{ opacity: 0 }}
											animate={{ opacity: 1 }}
											className="px-5 pb-5"
										>
											<p className="text-sm text-muted-foreground leading-relaxed">
												{faq.a}
											</p>
										</motion.div>
									)}
								</div>
							))}
						</div>
					</div>
				</div>
			</section>

			{/* CTA Final */}
			<section className="py-20 bg-accent">
				<div className="container px-6">
					<div className="max-w-3xl mx-auto text-center">
						<h2 className="font-display text-2xl md:text-4xl font-bold text-accent-foreground mb-6">
							Se você está buscando uma empresa para organizar financeiro, o
							próximo passo é{" "}
							<span className="text-gradient-gold">avaliar sua operação.</span>
						</h2>
						<p className="text-accent-foreground/70 mb-10">
							Entenda qual modelo faz mais sentido para o seu momento.
						</p>
						<div className="grid sm:grid-cols-2 gap-4 max-w-xl mx-auto">
							<a
								href={WHATSAPP_URL}
								target="_blank"
								rel="noopener noreferrer"
								className="px-6 py-4 bg-primary text-primary-foreground font-semibold text-sm tracking-wide uppercase rounded hover:brightness-110 transition-all text-center"
							>
								Treinar minha equipe do administrativo
							</a>
							<a
								href={WHATSAPP_URL}
								target="_blank"
								rel="noopener noreferrer"
								className="px-6 py-4 bg-primary text-primary-foreground font-semibold text-sm tracking-wide uppercase rounded hover:brightness-110 transition-all text-center"
							>
								Treinar minha equipe do financeiro
							</a>
							<a
								href={WHATSAPP_URL}
								target="_blank"
								rel="noopener noreferrer"
								className="px-6 py-4 border border-primary/30 text-accent-foreground font-semibold text-sm tracking-wide uppercase rounded hover:bg-primary/10 transition-all text-center"
							>
								Não encontrei meu ramo aqui
							</a>
							<a
								href={WHATSAPP_URL}
								target="_blank"
								rel="noopener noreferrer"
								className="px-6 py-4 border border-primary/30 text-accent-foreground font-semibold text-sm tracking-wide uppercase rounded hover:bg-primary/10 transition-all text-center"
							>
								Falar com um especialista
							</a>
						</div>
					</div>
				</div>
			</section>

			<Footer />
			<WhatsAppButton />
		</div>
	);
};

export default QuemAtendemos;
