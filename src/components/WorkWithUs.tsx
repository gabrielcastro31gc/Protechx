import { useState } from "react";
import { motion } from "framer-motion";
import { useSectionContent } from "@/hooks/useSectionContent";
import { supabase } from "@/integrations/supabase/client";

const WorkWithUs = () => {
  const { content: c } = useSectionContent("work_with_us");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data: Record<string, string> = {};
    formData.forEach((value, key) => { if (typeof value === "string") data[key] = value; });

    await supabase.from("form_submissions").insert({
      form_type: "trabalhe_conosco",
      data,
      user_agent: navigator.userAgent,
    });

    setSubmitted(true);
  };

  return (
    <section className="py-24 md:py-32 bg-surface-elevated" id="trabalhe-conosco">
      <div className="container px-6">
        <div className="max-w-2xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center mb-10">
            <p className="text-xs font-medium tracking-[0.3em] uppercase text-primary mb-4">{c.label}</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">{c.title} <span className="text-gradient-gold">{c.titleHighlight}</span></h2>
            <p className="text-muted-foreground">{c.subtitle}</p>
          </motion.div>

          {!submitted ? (
            <motion.form onSubmit={handleSubmit} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2, duration: 0.6 }} className="space-y-4 bg-card p-8 rounded border border-border">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Nome completo</label>
                <input type="text" name="nome" required className="w-full rounded border border-input bg-background px-3 py-2 text-sm text-foreground" />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium text-foreground mb-1">WhatsApp</label><input type="tel" name="whatsapp" required className="w-full rounded border border-input bg-background px-3 py-2 text-sm text-foreground" /></div>
                <div><label className="block text-sm font-medium text-foreground mb-1">E-mail</label><input type="email" name="email" required className="w-full rounded border border-input bg-background px-3 py-2 text-sm text-foreground" /></div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium text-foreground mb-1">Cidade</label><input type="text" name="cidade" required className="w-full rounded border border-input bg-background px-3 py-2 text-sm text-foreground" /></div>
                <div><label className="block text-sm font-medium text-foreground mb-1">UF</label><input type="text" name="uf" required maxLength={2} className="w-full rounded border border-input bg-background px-3 py-2 text-sm text-foreground uppercase" /></div>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Área de interesse</label>
                <select name="area" required className="w-full rounded border border-input bg-background px-3 py-2 text-sm text-foreground">
                  <option value="">Selecione</option>
                  <option value="financeiro">Financeiro</option>
                  <option value="administrativo">Administrativo</option>
                  <option value="comercial">Comercial</option>
                  <option value="tecnologia">Tecnologia</option>
                  <option value="outro">Outro</option>
                </select>
              </div>
              <div><label className="block text-sm font-medium text-foreground mb-1">Link do LinkedIn (opcional)</label><input type="url" name="linkedin" placeholder="https://linkedin.com/in/..." className="w-full rounded border border-input bg-background px-3 py-2 text-sm text-foreground" /></div>
              <div><label className="block text-sm font-medium text-foreground mb-1">Anexar currículo (PDF)</label><input type="file" name="curriculo" accept=".pdf,.doc,.docx" className="w-full rounded border border-input bg-background px-3 py-2 text-sm text-foreground file:mr-3 file:border-0 file:bg-primary/10 file:text-primary file:text-xs file:font-semibold file:px-3 file:py-1 file:rounded" /></div>
              <button type="submit" className="w-full px-6 py-3.5 bg-accent text-accent-foreground font-semibold text-sm tracking-wide uppercase rounded hover:opacity-90 transition-all mt-4">Enviar currículo</button>
            </motion.form>
          ) : (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center bg-card p-10 rounded border border-primary/30">
              <svg className="w-12 h-12 text-primary mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              <h3 className="font-display text-2xl font-bold text-foreground mb-3">{c.successTitle}</h3>
              <p className="text-muted-foreground">{c.successMessage}</p>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default WorkWithUs;
