import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

// Preview context: when set, overrides DB content for a specific section
interface PreviewOverride {
	sectionKey: string;
	content: Record<string, any>;
}

const PreviewContext = createContext<PreviewOverride | null>(null);

export const PreviewProvider = PreviewContext.Provider;

// Default content for each section - used as fallback when DB is empty
export const DEFAULT_CONTENT: Record<string, Record<string, any>> = {
	hero: {
		title: "Estruture seu administrativo e financeiro com",
		titleHighlight: "método, sistema e previsibilidade.",
		subtitle:
      "Implantação online e gestão recorrente para empresas que querem crescer com controle. Presencial opcional para projetos específicos.",
    ctaPrimary: "Solicitar Avaliação de Estrutura Financeira",
    ctaSecondary: "Ver Planos",
    badges: [
      "Implantação online",
      "Software obrigatório na estrutura completa",
      "Presencial opcional para projetos específicos",
    ],
    logoUrl: "",
  },
  impact: {
    line1: "Se você fatura e mesmo assim",
    line1Bold: "vive no escuro,",
    line1End: "o problema não é esforço.",
    line2: "É falta de estrutura.",
    line3: "Sem rotina, sistema e padrão, o crescimento vira risco.",
  },
  positioning: {
    label: "O que fazemos",
    description:
      "Estruturamos o departamento administrativo e financeiro para você sair do improviso e operar com previsibilidade. Quando necessário, implantamos do zero. Quando já existe, organizamos e mantemos com método.",
    items: [
      "Implantamos quando não existe.",
      "Organizamos quando está confuso.",
      "Mantemos com método para sustentar o crescimento.",
    ],
  },
  services: {
    label: "Serviços",
    title: "Soluções sob",
    titleHighlight: "medida",
    services: [
      {
        tag: "Plano Essencial",
        title: "Suporte Administrativo",
        imageUrl: "",
        items: [
          "Emissão de notas fiscais",
          "Agendamento de pagamentos",
          "Preenchimento de invoices",
          "Gestão de contratos de baixa a média complexidade",
          "Organização administrativa básica",
          "Validação manual antes do fechamento",
        ],
        description:
          "Para operações simplificadas que precisam de execução com padrão e sem improviso.",
        price: "A partir de R$ 399,00",
        note: "",
      },
      {
        tag: "Implantação",
        title: "Departamento Administrativo e Financeiro",
        imageUrl: "",
        items: [
          "Parametrização e organização do sistema",
          "Organização do fluxo financeiro e plano de contas",
          "Definição de rotinas e responsabilidades",
          "Treinamento dos envolvidos (Vendas, Contas a Pagar/Receber, Estoque)",
          "Integração estruturada com a contabilidade",
        ],
        description:
          "Para empresas que ainda não têm controle e precisam construir estrutura do zero com método.",
        price: "",
        note: "",
      },
      {
        tag: "Gestão Recorrente",
        title: "Assinatura Mensal",
        imageUrl: "",
        items: [
          "Rotina financeira com padrão (contas a pagar e receber, conciliação)",
          "Organização e cadência de fechamento",
          "Relatórios de acompanhamento (conforme plano)",
          "Integração com contabilidade",
        ],
        description:
          "Para manter a estrutura funcionando e evoluir com previsibilidade.",
        price: "",
        note: "",
      },
      {
        tag: "Licença de Software",
        title: "Gestão Integrada",
        imageUrl: "",
        items: [
          "Emissão de nota fiscal de produto e serviço",
          "Emissão de boletos",
          "Contas a pagar e contas a receber",
          "Controle de estoque",
          "Integração bancária e conta digital integrada",
        ],
        description:
          "Licença de uso de software com planos de R$ 249,90 a R$ 399,00, conforme funcionalidades e volume.",
        price: "",
        note: "Não é obrigatório contratar a licença conosco. É obrigatório operar com sistema.",
      },
    ],
    triggers: [
      "Sem sistema, sem controle.",
      "Empresas que crescem usam tecnologia.",
      "Planilha não escala.",
      "Automatize antes que o caos chegue.",
    ],
  },
  diagnostic: {
    label: "Avaliação de Estrutura Financeira",
    title: "Antes de qualquer implantação ou assinatura,",
    titleHighlight: "fazemos uma avaliação objetiva.",
    subtitle:
      "Para empresas com maior complexidade, o Diagnóstico Estratégico (1 hora) garante direcionamento correto e acelera sua decisão.",
    option1Title: "Opção 1",
    option1Desc:
      "Profissional autônomo ou operação simplificada, com até 5 notas fiscais por mês.",
    option2Title: "Opção 2",
    option2Desc:
      "Empresa com movimentação financeira recorrente e necessidade de estrutura (implantação e gestão).",
    diagnosticPrice: "R$ 250",
    diagnosticPriceNote: "/ sessão de 1 hora",
    diagnosticDiscount: "100% abatido na contratação",
  },
  technology: {
    label: "Tecnologia como base",
    title: "Crescimento exige",
    titleHighlight: "sistema.",
    description:
      "Para garantir controle, segurança e integração com a contabilidade, trabalhamos com software de gestão. Se você ainda não utiliza um sistema adequado, oferecemos licença de uso com planos acessíveis.",
    quote:
      "Não trabalhamos com planilha como ferramenta principal. Estrutura completa exige software.",
    solutionTitle: "Solução integrada de gestão",
    benefits: [
      "Emissão de nota fiscal de produto e serviço",
      "Emissão de boletos",
      "Contas a pagar e contas a receber",
      "Controle de estoque",
      "Integração bancária e conta digital integrada",
    ],
    pricing: "Planos de R$ 249,90 a R$ 399,00",
    pricingNote:
      "Não é obrigatório contratar a licença conosco. É obrigatório operar com sistema.",
    imageUrl: "",
    triggers: [
      "Sem sistema, sem controle.",
      "Empresas que crescem usam tecnologia.",
      "Planilha não escala.",
      "Automatize antes que o caos chegue.",
    ],
  },
  geography: {
    label: "Onde Atuamos",
    title: "Presença",
    titleHighlight: "estratégica",
    description:
      "Sede operacional estrategicamente posicionada na região de São Paulo, próxima ao Aeroporto Internacional de Viracopos, com base jurídica em Minas Gerais e atuação em nível nacional.",
    imageUrl: "",
    locations: [
      {
        label: "São Paulo",
        desc: "Sede operacional próxima ao Aeroporto Internacional de Viracopos",
      },
      { label: "Minas Gerais", desc: "Base jurídica" },
      {
        label: "Nacional",
        desc: "Atuação em MG, SP, DF, GO e atendimento estruturado em nível nacional",
      },
    ],
    serviceTypes: [
      "Implantação 100% online (padrão)",
      "Presencial no escritório (opcional)",
      "In loco sob orçamento (premium)",
    ],
  },
  about: {
    label: "Sobre",
    title: "Quem",
    titleHighlight: "somos",
    description:
      "A ProtechX Soluções Inteligentes é uma empresa de estruturação administrativa e financeira, com atuação nacional. A liderança técnica é conduzida por Telma Vargas, profissional com experiência prática em implantação e organização de departamentos financeiros e atuação nacional na formação de novos BPOs.",
    credentials: [
      "Foco em estrutura, método e previsibilidade",
      "Equipe preparada para conduzir diagnósticos e implantações",
      "Atuação nacional com base logística estratégica",
    ],
    methodologyText:
      "Metodologia aplicada em projetos nacionais de estruturação financeira. Equipe com experiência em implantação e rotina — do diagnóstico à operação contínua.",
    imageUrl: "",
  },
  work_with_us: {
    label: "Trabalhe Conosco",
    title: "Faça parte do",
    titleHighlight: "time",
    subtitle:
      "Se você gosta de processos, método e rotina com padrão, envie seu currículo.",
    successTitle: "Currículo enviado!",
    successMessage:
      "Obrigado pelo interesse. Analisaremos seu perfil e entraremos em contato caso haja uma oportunidade compatível.",
  },
  final_cta: {
    title: "Pronto para sair do improviso\ne operar com método?",
    subtitle:
      "Solicite sua Avaliação de Estrutura Financeira e veja qual caminho é o certo para sua empresa.",
    ctaText: "Solicitar Avaliação de Estrutura Financeira",
    footnote:
      "Sem agenda liberada sem triagem. Não fazemos consultoria gratuita.",
  },
  footer: {
    tagline:
      "Estruturação administrativa e financeira com método, sistema e previsibilidade.",
    whatsappUrl:
      "https://wa.me/5511934529229?text=Ol%C3%A1%2C%20vim%20do%20site%20e%20gostaria%20de%20tirar%20algumas%20d%C3%BAvidas!",
    email: "protechx@protechx.com.br",
    links: [
      { label: "Serviços", href: "#servicos" },
      { label: "Quem Atendemos", href: "/quem-atendemos" },
      { label: "Onde Atuamos", href: "#atuacao" },
      { label: "Quem Somos", href: "#sobre" },
      { label: "Trabalhe Conosco", href: "#trabalhe-conosco" },
    ],
  },
  global_settings: {
    whatsappNumber: "5511934529229",
    whatsappMessage: "Olá, vim do site e gostaria de tirar algumas dúvidas!",
    email: "protechx@protechx.com.br",
    phone: "",
  },
  how_it_works: {
    label: "Como funciona",
    title: "Veja como é simples estruturar o seu financeiro com a",
    titleHighlight: "ProtechX",
    steps: [
      {
        number: "01",
        title: "Envie as informações da sua empresa",
        description:
          "Você identifica os lançamentos financeiros ou utilizamos integração com o sistema para organizar as informações.",
      },
      {
        number: "02",
        title: "Organização e execução das rotinas financeiras",
        description:
          "Realizamos as rotinas operacionais do setor financeiro com base nas informações enviadas e nas autorizações da empresa.",
      },
      {
        number: "03",
        title: "Informações organizadas para acompanhamento",
        description:
          "Você recebe dados atualizados e relatórios claros para acompanhar a realidade financeira da sua empresa e apoiar suas decisões.",
      },
    ],
  },
  differentials: {
    title: "SUA EMPRESA É ÚNICA, E RESPEITAMOS SUAS",
    titleHighlight: "NECESSIDADES.",
    subtitle:
      "A particularidade faz total diferença na organização do financeiro.",
    cards: [
      {
        title: "EQUIPE REAL, ATENDIMENTO DE VERDADE",
        description:
          "Nossa equipe é formada por pessoas reais. Elas conhecem sua operação e organizam as rotinas financeiras com método, clareza e responsabilidade operacional.",
      },
      {
        title: "ATENDENTE DE REFERÊNCIA",
        description:
          "Um profissional dedicado. Para acompanhar as demandas do seu financeiro, organizar informações e manter os processos alinhados.",
      },
      {
        title: "ZERO FIDELIDADE",
        description:
          "Nossos planos não possuem fidelidade. Permanecemos ao seu lado pela qualidade da entrega e pela organização que geramos no seu financeiro.",
      },
    ],
  },
};

export function useSectionContent(sectionKey: string) {
  const preview = useContext(PreviewContext);
  const [content, setContent] = useState<Record<string, any>>(
    DEFAULT_CONTENT[sectionKey] || {},
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // If preview context matches this section, use preview content
    if (preview && preview.sectionKey === sectionKey) {
      setContent({ ...DEFAULT_CONTENT[sectionKey], ...preview.content });
      setLoading(false);
      return;
    }

    const fetchContent = async () => {
      try {
        const { data } = await supabase
          .from("site_content")
          .select("content")
          .eq("section_key", sectionKey)
          .maybeSingle();

        if (data?.content && Object.keys(data.content as object).length > 0) {
          setContent({
            ...DEFAULT_CONTENT[sectionKey],
            ...(data.content as Record<string, any>),
          });
        }
      } catch (error) {
        console.error(
          `Error fetching content for section "${sectionKey}":`,
          error,
        
			{
				number: "03",
				title: "Informações organizadas para acompanhamento",
				description:
					"Você recebe dados atualizados e relatórios claros para acompanhar a realidade financeira da sua empresa e apoiar suas decisões.",
			},
		],
	},
	differentials: {
		title: "SUA EMPRESA É ÚNICA, E RESPEITAMOS SUAS",
		titleHighlight: "NECESSIDADES.",
		subtitle:
			"A particularidade faz total diferença na organização do financeiro.",
		cards: [
			{
				title: "EQUIPE REAL, ATENDIMENTO DE VERDADE",
				description:
					"Nossa equipe é formada por pessoas reais. Elas conhecem sua operação e organizam as rotinas financeiras com método, clareza e responsabilidade operacional.",
			},
			{
				title: "ATENDENTE DE REFERÊNCIA",
				description:
					"Um profissional dedicado. Para acompanhar as demandas do seu financeiro, organizar informações e manter os processos alinhados.",
			},
			{
				title: "ZERO FIDELIDADE",
				description:
					"Nossos planos não possuem fidelidade. Permanecemos ao seu lado pela qualidade da entrega e pela organização que geramos no seu financeiro.",
			},
		],
	},
};

export function useSectionContent(sectionKey: string) {
	const preview = useContext(PreviewContext);
	const [content, setContent] = useState<Record<string, any>>(
		DEFAULT_CONTENT[sectionKey] || {},
	);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		// If preview context matches this section, use preview content
		if (preview && preview.sectionKey === sectionKey) {
			setContent({ ...DEFAULT_CONTENT[sectionKey], ...preview.content });
			setLoading(false);
			return;
		}

		const fetchContent = async () => {
			try {
				const { data } = await supabase
					.from("site_content")
					.select("content")
					.eq("section_key", sectionKey)
					.maybeSingle();

				if (data?.content && Object.keys(data.content as object).length > 0) {
					setContent({
						...DEFAULT_CONTENT[sectionKey],
						...(data.content as Record<string, any>),
					});
				}
			} catch (error) {
				console.error(
					`Error fetching content for section "${sectionKey}":`,
					error,
				);
			} finally {
				setLoading(false);
			}
		};
		fetchContent();
	}, [sectionKey, preview]);

	return { content, loading };
}
