import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSectionContent } from "@/hooks/useSectionContent";
import { supabase } from "@/integrations/supabase/client";

type Track = null | "essencial" | "diagnostico";

const faixasFaturamento = [
  "Até R$ 10.000", "R$ 10.001 a R$ 30.000", "R$ 30.001 a R$ 80.000",
  "R$ 80.001 a R$ 200.000", "Acima de R$ 200.000",
];

const Diagnostic = () => {
  const { content: c } = useSectionContent("diagnostic");
  const [track, setTrack] = useState<Track>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data: Record<string, string> = {};
    formData.forEach((value, key) => { if (typeof value === "string") data[key] = value; });

    await supabase.from("form_submissions").insert({
      form_type: track === "essencial" ? "triagem_essencial" : "triagem_diagnostico",
      data,
      user_agent: navigator.userAgent,
    });

    setSubmitted(true);
  };

  return (
    <section className="py-24 md:py-32 bg-accent relative" id="diagnostico">
      <div className="container px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center mb-12">
            <p className="text-xs font-medium tracking-[0.3em] uppercase text-primary mb-4">{c.label}</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 text-accent-foreground">
              {c.title}{" "}<span className="text-gradient-gold">{c.titleHighlight}</span>
            </h2>
            <p className="text-accent-foreground/70 leading-relaxed max-w-2xl mx-auto">{c.subtitle}</p>
          </motion.div>

          <AnimatePresence mode="wait">
            {!track && !submitted && (
              <motion.div key="selector" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="max-w-2xl mx-auto">
                <p className="text-center text-accent-foreground font-semibold mb-6">Qual cenário melhor descreve sua empresa?</p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <button onClick={() => setTrack("essencial")} className="p-6 rounded border border-primary/30 bg-card text-left hover:border-primary/60 transition-all">
                    <span className="text-xs font-semibold tracking-widest uppercase text-primary block mb-2">{c.option1Title}</span>
                    <p className="text-sm text-foreground font-medium">{c.option1Desc}</p>
                  </button>
                  <button onClick={() => setTrack("diagnostico")} className="p-6 rounded border border-primary/30 bg-card text-left hover:border-primary/60 transition-all">
                    <span className="text-xs font-semibold tracking-widest uppercase text-primary block mb-2">{c.option2Title}</span>
                    <p className="text-sm text-foreground font-medium">{c.option2Desc}</p>
                  </button>
                </div>
              </motion.div>
            )}

            {track === "essencial" && !submitted && (
              <motion.div key="essencial" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="max-w-2xl mx-auto">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-display text-xl font-bold text-accent-foreground">Plano Essencial — Triagem</h3>
                  <button onClick={() => setTrack(null)} className="text-xs text-primary underline">Voltar</button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4 bg-card p-8 rounded border border-border">
                  <FormInput label="Nome completo" name="nome" required />
                  <FormInput label="CNPJ" name="cnpj" required />
                  <div className="grid sm:grid-cols-2 gap-4"><FormInput label="Cidade" name="cidade" required /><FormInput label="Estado" name="estado" required /></div>
                  <FormInput label="WhatsApp" name="whatsapp" required />
                  <div><label className="block text-sm font-medium text-foreground mb-1">Faturamento médio mensal</label><select name="faturamento" required className="w-full rounded border border-input bg-background px-3 py-2 text-sm text-foreground"><option value="">Selecione</option>{faixasFaturamento.map(f => <option key={f} value={f}>{f}</option>)}</select></div>
                  <div><label className="block text-sm font-medium text-foreground mb-1">Quantidade média de lançamentos financeiros por mês</label><p className="text-xs text-muted-foreground mb-2 italic">Considere a soma de todos os lançamentos que aparecem nos extratos de todas as contas bancárias da empresa, incluindo entradas e saídas.</p><input type="number" name="lancamentos" required className="w-full rounded border border-input bg-background px-3 py-2 text-sm text-foreground" /></div>
                  <FormInput label="Quantas notas fiscais emite por mês?" name="nfs" type="number" required />
                  <FormInput label="Qual a principal necessidade hoje?" name="necessidade" required />
                  <SoftwareQuestion />
                  <button type="submit" className="w-full px-6 py-3.5 bg-accent text-accent-foreground font-semibold text-sm tracking-wide uppercase rounded hover:opacity-90 transition-all mt-4">Enviar Triagem</button>
                </form>
              </motion.div>
            )}

            {track === "diagnostico" && !submitted && (
              <motion.div key="diagnostico" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="max-w-2xl mx-auto">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-display text-xl font-bold text-accent-foreground">Diagnóstico Estratégico — Triagem</h3>
                  <button onClick={() => setTrack(null)} className="text-xs text-primary underline">Voltar</button>
                </div>
                <div className="p-6 rounded border border-primary/30 bg-card mb-6">
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-3xl font-display font-bold text-gradient-gold">{c.diagnosticPrice}</span>
                    <span className="text-sm text-muted-foreground">{c.diagnosticPriceNote}</span>
                  </div>
                  <p className="text-sm font-semibold text-primary">{c.diagnosticDiscount}</p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4 bg-card p-8 rounded border border-border">
                  <FormInput label="Nome completo" name="nome" required />
                  <FormInput label="CNPJ" name="cnpj" required />
                  <FormInput label="Segmento de atuação" name="segmento" required />
                  <div className="grid sm:grid-cols-2 gap-4"><FormInput label="Cidade" name="cidade" required /><FormInput label="Estado" name="estado" required /></div>
                  <FormInput label="WhatsApp" name="whatsapp" required />
                  <div><label className="block text-sm font-medium text-foreground mb-1">Faturamento médio mensal</label><select name="faturamento" required className="w-full rounded border border-input bg-background px-3 py-2 text-sm text-foreground"><option value="">Selecione</option>{faixasFaturamento.map(f => <option key={f} value={f}>{f}</option>)}</select></div>
                  <div><label className="block text-sm font-medium text-foreground mb-1">Quantidade média de lançamentos financeiros por mês</label><p className="text-xs text-muted-foreground mb-2 italic">Considere a soma de todos os lançamentos que aparecem nos extratos de todas as contas bancárias da empresa, incluindo entradas e saídas.</p><input type="number" name="lancamentos" required className="w-full rounded border border-input bg-background px-3 py-2 text-sm text-foreground" /></div>
                  <RadioField label="Possui software de gestão financeira e emissão de notas?" name="software" />
                  <RadioField label="Separa PF e PJ?" name="separacao" />
                  <RadioField label="Possui responsável financeiro interno?" name="responsavel" />
                  <div><label className="block text-sm font-medium text-foreground mb-1">Principal desafio hoje</label><textarea name="desafio" required rows={3} className="w-full rounded border border-input bg-background px-3 py-2 text-sm text-foreground resize-none" /></div>
                  <button type="submit" className="w-full px-6 py-3.5 bg-accent text-accent-foreground font-semibold text-sm tracking-wide uppercase rounded hover:opacity-90 transition-all mt-4">Enviar Triagem</button>
                </form>
              </motion.div>
            )}

            {submitted && (
              <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-2xl mx-auto text-center bg-card p-10 rounded border border-primary/30">
                <svg className="w-12 h-12 text-primary mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                {track === "essencial" ? (
                  <>
                    <h3 className="font-display text-2xl font-bold text-foreground mb-3">Triagem enviada!</h3>
                    <p className="text-muted-foreground">Nossa equipe fará a validação inicial para confirmar aderência ao Plano Essencial. Entraremos em contato pelo WhatsApp informado.</p>
                  </>
                ) : (
                  <>
                    <h3 className="font-display text-2xl font-bold text-foreground mb-3">Triagem recebida!</h3>
                    <p className="text-muted-foreground mb-6">Com base nas informações enviadas, você pode avançar para o Diagnóstico Estratégico (1 hora). O investimento é de R$ 250,00 e será abatido na contratação de implantação ou assinatura.</p>
                    <a href="#" className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground font-semibold text-sm tracking-wide uppercase rounded hover:brightness-110 transition-all shadow-gold">Quero avançar para o Diagnóstico Estratégico</a>
                    <p className="text-xs text-muted-foreground mt-4 italic">Agenda liberada somente após pagamento.</p>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

const FormInput = ({ label, name, type = "text", required = false }: { label: string; name: string; type?: string; required?: boolean }) => (
  <div>
    <label className="block text-sm font-medium text-foreground mb-1">{label}</label>
    <input type={type} name={name} required={required} className="w-full rounded border border-input bg-background px-3 py-2 text-sm text-foreground" />
  </div>
);

const RadioField = ({ label, name }: { label: string; name: string }) => (
  <div>
    <label className="block text-sm font-medium text-foreground mb-1">{label}</label>
    <div className="flex gap-4 mt-1">
      <label className="flex items-center gap-2 text-sm text-foreground"><input type="radio" name={name} value="sim" required /> Sim</label>
      <label className="flex items-center gap-2 text-sm text-foreground"><input type="radio" name={name} value="nao" required /> Não</label>
    </div>
  </div>
);

const SoftwareQuestion = () => {
  const [usaSoftware, setUsaSoftware] = useState<string | null>(null);
  return (
    <>
      <div>
        <label className="block text-sm font-medium text-foreground mb-1">Você utiliza software para emissão de nota fiscal e controle financeiro?</label>
        <div className="flex gap-4 mt-1">
          <label className="flex items-center gap-2 text-sm text-foreground"><input type="radio" name="software" value="sim" required onChange={() => setUsaSoftware("sim")} /> Sim</label>
          <label className="flex items-center gap-2 text-sm text-foreground"><input type="radio" name="software" value="nao" required onChange={() => setUsaSoftware("nao")} /> Não</label>
        </div>
      </div>
      {usaSoftware === "nao" && (
        <div className="p-4 rounded border border-primary/20 bg-primary/5">
          <label className="block text-sm font-medium text-foreground mb-1">Tem interesse em conhecer uma solução de gestão integrada?</label>
          <div className="flex gap-4 mt-1">
            <label className="flex items-center gap-2 text-sm text-foreground"><input type="radio" name="interesse_software" value="sim" required /> Sim</label>
            <label className="flex items-center gap-2 text-sm text-foreground"><input type="radio" name="interesse_software" value="nao" required /> Não</label>
          </div>
        </div>
      )}
    </>
  );
};

export default Diagnostic;
