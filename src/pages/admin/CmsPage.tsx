import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Save, Plus, Image, Type, List, Eye, EyeOff, ArrowUp, ArrowDown, GripVertical, Palette } from "lucide-react";
import { DEFAULT_CONTENT } from "@/hooks/useSectionContent";
import SectionPreview from "@/components/admin/SectionPreview";

interface SiteContent {
  id: string;
  section_key: string;
  section_label: string;
  content: Record<string, any>;
  updated_at: string;
  sort_order: number;
}

const SECTION_FIELDS: Record<string, { key: string; label: string; type: "text" | "textarea" | "image" | "list" | "json" | "color" | "select" }[]> = {
  hero: [
    { key: "title", label: "Título", type: "text" },
    { key: "titleHighlight", label: "Destaque do título", type: "text" },
    { key: "subtitle", label: "Subtítulo", type: "textarea" },
    { key: "ctaPrimary", label: "Botão principal", type: "text" },
    { key: "ctaSecondary", label: "Botão secundário", type: "text" },
    { key: "badges", label: "Badges (1 por linha)", type: "list" },
    { key: "logoUrl", label: "Logo", type: "image" },
  ],
  impact: [
    { key: "line1", label: "Linha 1 (início)", type: "text" },
    { key: "line1Bold", label: "Linha 1 (negrito)", type: "text" },
    { key: "line1End", label: "Linha 1 (fim)", type: "text" },
    { key: "line2", label: "Linha 2 (destaque)", type: "text" },
    { key: "line3", label: "Linha 3", type: "text" },
  ],
  positioning: [
    { key: "label", label: "Rótulo", type: "text" },
    { key: "description", label: "Descrição", type: "textarea" },
    { key: "items", label: "Itens (1 por linha)", type: "list" },
  ],
  services: [
    { key: "label", label: "Rótulo", type: "text" },
    { key: "title", label: "Título", type: "text" },
    { key: "titleHighlight", label: "Destaque do título", type: "text" },
    { key: "introTitle", label: "Título do bloco introdutório", type: "text" },
    { key: "introSubtitle", label: "Subtítulo do bloco", type: "text" },
    { key: "introDescription", label: "Descrição do bloco", type: "textarea" },
    { key: "introItems", label: "Itens do bloco (1 por linha)", type: "list" },
    { key: "introClosing", label: "Texto de fechamento", type: "textarea" },
    { key: "triggers", label: "Gatilhos da faixa (1 por linha)", type: "list" },
    { key: "services", label: "Serviços (JSON avançado)", type: "json" },
  ],
  how_it_works: [
    { key: "label", label: "Rótulo", type: "text" },
    { key: "title", label: "Título", type: "text" },
    { key: "titleHighlight", label: "Destaque", type: "text" },
    { key: "steps", label: "Etapas (JSON)", type: "json" },
  ],
  differentials: [
    { key: "title", label: "Título", type: "text" },
    { key: "titleHighlight", label: "Destaque", type: "text" },
    { key: "subtitle", label: "Subtítulo", type: "text" },
    { key: "cards", label: "Cards (JSON)", type: "json" },
  ],
  diagnostic: [
    { key: "label", label: "Rótulo", type: "text" },
    { key: "title", label: "Título", type: "text" },
    { key: "titleHighlight", label: "Destaque", type: "text" },
    { key: "subtitle", label: "Subtítulo", type: "textarea" },
    { key: "option1Title", label: "Opção 1 - Título", type: "text" },
    { key: "option1Desc", label: "Opção 1 - Descrição", type: "textarea" },
    { key: "option2Title", label: "Opção 2 - Título", type: "text" },
    { key: "option2Desc", label: "Opção 2 - Descrição", type: "textarea" },
    { key: "diagnosticPrice", label: "Preço diagnóstico", type: "text" },
    { key: "diagnosticPriceNote", label: "Nota do preço", type: "text" },
    { key: "diagnosticDiscount", label: "Desconto", type: "text" },
  ],
  geography: [
    { key: "label", label: "Rótulo", type: "text" },
    { key: "title", label: "Título", type: "text" },
    { key: "titleHighlight", label: "Destaque", type: "text" },
    { key: "description", label: "Descrição", type: "textarea" },
    { key: "imageUrl", label: "Imagem", type: "image" },
    { key: "locations", label: "Localizações (JSON)", type: "json" },
    { key: "serviceTypes", label: "Tipos de serviço (1 por linha)", type: "list" },
  ],
  about: [
    { key: "label", label: "Rótulo", type: "text" },
    { key: "title", label: "Título", type: "text" },
    { key: "titleHighlight", label: "Destaque", type: "text" },
    { key: "storyTitle", label: "Título da história", type: "text" },
    { key: "storyText", label: "Texto da história", type: "textarea" },
    { key: "credentials", label: "Credenciais (1 por linha)", type: "list" },
    { key: "methodologyText", label: "Texto de metodologia", type: "textarea" },
    { key: "imageUrl", label: "Imagem", type: "image" },
  ],
  work_with_us: [
    { key: "label", label: "Rótulo", type: "text" },
    { key: "title", label: "Título", type: "text" },
    { key: "titleHighlight", label: "Destaque", type: "text" },
    { key: "subtitle", label: "Subtítulo", type: "textarea" },
    { key: "successTitle", label: "Título de sucesso", type: "text" },
    { key: "successMessage", label: "Mensagem de sucesso", type: "textarea" },
  ],
  final_cta: [
    { key: "title", label: "Título (use \\n para quebra de linha)", type: "textarea" },
    { key: "subtitle", label: "Subtítulo", type: "textarea" },
    { key: "ctaText", label: "Texto do botão", type: "text" },
    { key: "footnote", label: "Nota de rodapé", type: "text" },
  ],
  footer: [
    { key: "tagline", label: "Tagline", type: "textarea" },
    { key: "links", label: "Links de navegação (JSON)", type: "json" },
  ],
  global_settings: [
    { key: "whatsappNumber", label: "Número do WhatsApp (com código do país)", type: "text" },
    { key: "whatsappMessage", label: "Mensagem padrão do WhatsApp", type: "textarea" },
    { key: "email", label: "E-mail de contato", type: "text" },
    { key: "phone", label: "Telefone (opcional)", type: "text" },
  ],
  theme: [
    { key: "primaryColor", label: "Cor primária (dourado)", type: "color" },
    { key: "accentColor", label: "Cor de destaque (azul marinho)", type: "color" },
    { key: "backgroundColor", label: "Cor de fundo", type: "color" },
    { key: "headingFont", label: "Fonte dos títulos", type: "select" },
    { key: "bodyFont", label: "Fonte do corpo", type: "select" },
  ],
};

const FONT_OPTIONS = [
  "Rajdhani", "Montserrat", "Inter", "Poppins", "Roboto", "Open Sans",
  "Lato", "Oswald", "Raleway", "Source Sans Pro", "Nunito",
];

const DEFAULT_SECTIONS = [
  { key: "global_settings", label: "⚙️ Configurações Globais", sort_order: -2 },
  { key: "theme", label: "🎨 Cores e Fontes", sort_order: -1 },
  { key: "hero", label: "Hero (Topo)", sort_order: 0 },
  { key: "impact", label: "Impacto", sort_order: 1 },
  { key: "positioning", label: "Posicionamento", sort_order: 2 },
  { key: "services", label: "Serviços", sort_order: 3 },
  { key: "how_it_works", label: "Como Funciona", sort_order: 4 },
  { key: "differentials", label: "Diferenciais", sort_order: 5 },
  { key: "diagnostic", label: "Diagnóstico", sort_order: 6 },
  { key: "geography", label: "Geografia", sort_order: 7 },
  { key: "about", label: "Quem Somos", sort_order: 8 },
  { key: "work_with_us", label: "Trabalhe Conosco", sort_order: 9 },
  { key: "final_cta", label: "CTA Final", sort_order: 10 },
  { key: "footer", label: "Rodapé", sort_order: 11 },
];

export default function CmsPage() {
  const [sections, setSections] = useState<SiteContent[]>([]);
  const [selected, setSelected] = useState<SiteContent | null>(null);
  const [editValues, setEditValues] = useState<Record<string, any>>({});
  const [saving, setSaving] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const { toast } = useToast();

  const fetchSections = async () => {
    const { data } = await supabase.from("site_content").select("*").order("sort_order");
    setSections((data as SiteContent[]) || []);
  };

  useEffect(() => { fetchSections(); }, []);

  const initDefaults = async () => {
    for (const sec of DEFAULT_SECTIONS) {
      const exists = sections.find((s) => s.section_key === sec.key);
      if (!exists) {
        const defaultContent = sec.key === "theme"
          ? { primaryColor: "#b8860b", accentColor: "#003153", backgroundColor: "#f7f8fa", headingFont: "Rajdhani", bodyFont: "Montserrat" }
          : (DEFAULT_CONTENT[sec.key] || {});
        await supabase.from("site_content").insert({
          section_key: sec.key,
          section_label: sec.label,
          content: defaultContent,
          sort_order: sec.sort_order,
        });
      }
    }
    await fetchSections();
    toast({ title: "Seções inicializadas com conteúdo padrão!" });
  };

  const selectSection = (section: SiteContent) => {
    setSelected(section);
    const defaults = section.section_key === "theme"
      ? { primaryColor: "#b8860b", accentColor: "#003153", backgroundColor: "#f7f8fa", headingFont: "Rajdhani", bodyFont: "Montserrat" }
      : (DEFAULT_CONTENT[section.section_key] || {});
    setEditValues({ ...defaults, ...(section.content as Record<string, any>) });
  };

  const updateField = (key: string, value: any) => {
    setEditValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    if (!selected) return;
    setSaving(true);
    const { error } = await supabase
      .from("site_content")
      .update({ content: editValues, updated_at: new Date().toISOString() })
      .eq("id", selected.id);
    if (error) {
      toast({ title: "Erro ao salvar", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Salvo com sucesso!" });
      await fetchSections();
    }
    setSaving(false);
  };

  const moveSectionOrder = async (sectionId: string, direction: "up" | "down") => {
    const orderedSections = sections
      .filter((s) => s.sort_order >= 0)
      .sort((a, b) => a.sort_order - b.sort_order);

    const idx = orderedSections.findIndex((s) => s.id === sectionId);
    if (idx === -1) return;
    if (direction === "up" && idx === 0) return;
    if (direction === "down" && idx === orderedSections.length - 1) return;

    const swapIdx = direction === "up" ? idx - 1 : idx + 1;
    const currentOrder = orderedSections[idx].sort_order;
    const swapOrder = orderedSections[swapIdx].sort_order;

    await Promise.all([
      supabase.from("site_content").update({ sort_order: swapOrder }).eq("id", orderedSections[idx].id),
      supabase.from("site_content").update({ sort_order: currentOrder }).eq("id", orderedSections[swapIdx].id),
    ]);

    await fetchSections();
    toast({ title: "Ordem atualizada!" });
  };

  const fields = selected ? (SECTION_FIELDS[selected.section_key] || []) : [];

  const handleImageUpload = async (fieldKey: string, file: File) => {
    const ext = file.name.split(".").pop() || "jpg";
    const fileName = `cms/${selected?.section_key}/${fieldKey}-${Date.now()}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from("site-assets")
      .upload(fileName, file, { contentType: file.type, upsert: true });

    if (uploadError) {
      toast({ title: "Erro no upload", description: uploadError.message, variant: "destructive" });
      return;
    }

    const { data } = supabase.storage.from("site-assets").getPublicUrl(fileName);
    updateField(fieldKey, data.publicUrl);
    toast({ title: "Imagem enviada!" });
  };

  const renderField = (field: { key: string; label: string; type: string }) => {
    const value = editValues[field.key];

    switch (field.type) {
      case "text":
        return (
          <div key={field.key} className="space-y-1">
            <label className="text-sm font-medium text-foreground font-subtitle flex items-center gap-2">
              <Type className="h-3.5 w-3.5 text-primary" />
              {field.label}
            </label>
            <Input value={value || ""} onChange={(e) => updateField(field.key, e.target.value)} className="font-subtitle" />
          </div>
        );
      case "color":
        return (
          <div key={field.key} className="space-y-1">
            <label className="text-sm font-medium text-foreground font-subtitle flex items-center gap-2">
              <Palette className="h-3.5 w-3.5 text-primary" />
              {field.label}
            </label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={value || "#000000"}
                onChange={(e) => updateField(field.key, e.target.value)}
                className="w-10 h-10 rounded border border-border cursor-pointer"
              />
              <Input
                value={value || ""}
                onChange={(e) => updateField(field.key, e.target.value)}
                className="font-mono text-sm flex-1"
                placeholder="#000000"
              />
            </div>
          </div>
        );
      case "select":
        return (
          <div key={field.key} className="space-y-1">
            <label className="text-sm font-medium text-foreground font-subtitle">{field.label}</label>
            <select
              value={value || ""}
              onChange={(e) => updateField(field.key, e.target.value)}
              className="w-full rounded border border-input bg-background px-3 py-2 text-sm text-foreground"
            >
              {FONT_OPTIONS.map((f) => (
                <option key={f} value={f}>{f}</option>
              ))}
            </select>
            <p className="text-xs text-muted-foreground" style={{ fontFamily: value || "inherit" }}>
              Exemplo: A rápida raposa marrom pula sobre o cão preguiçoso.
            </p>
          </div>
        );
      case "image":
        return (
          <div key={field.key} className="space-y-2">
            <label className="text-sm font-medium text-foreground font-subtitle flex items-center gap-2">
              <Image className="h-3.5 w-3.5 text-primary" />
              {field.label}
            </label>
            {value && (
              <img src={value} alt="Preview" className="w-full max-w-xs h-32 object-cover rounded border border-border" />
            )}
            <div className="flex gap-2 items-center">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleImageUpload(field.key, file);
                }}
                className="flex-1 text-sm file:mr-3 file:border-0 file:bg-primary/10 file:text-primary file:text-xs file:font-semibold file:px-3 file:py-1 file:rounded"
              />
            </div>
            <Input
              value={value || ""}
              onChange={(e) => updateField(field.key, e.target.value)}
              className="font-subtitle text-xs"
              placeholder="Ou cole uma URL de imagem"
            />
          </div>
        );
      case "textarea":
        return (
          <div key={field.key} className="space-y-1">
            <label className="text-sm font-medium text-foreground font-subtitle">{field.label}</label>
            <Textarea value={value || ""} onChange={(e) => updateField(field.key, e.target.value)} className="font-subtitle min-h-[80px]" />
          </div>
        );
      case "list":
        return (
          <div key={field.key} className="space-y-1">
            <label className="text-sm font-medium text-foreground font-subtitle flex items-center gap-2">
              <List className="h-3.5 w-3.5 text-primary" />
              {field.label}
            </label>
            <Textarea
              value={Array.isArray(value) ? value.join("\n") : (value || "")}
              onChange={(e) => updateField(field.key, e.target.value.split("\n").filter(Boolean))}
              className="font-subtitle min-h-[100px]"
              placeholder="Um item por linha"
            />
          </div>
        );
      case "json":
        return (
          <div key={field.key} className="space-y-1">
            <label className="text-sm font-medium text-foreground font-subtitle">{field.label}</label>
            <Textarea
              value={typeof value === "string" ? value : JSON.stringify(value, null, 2)}
              onChange={(e) => {
                try { updateField(field.key, JSON.parse(e.target.value)); } catch { updateField(field.key, e.target.value); }
              }}
              className="font-mono text-xs min-h-[150px]"
            />
          </div>
        );
      default:
        return null;
    }
  };

  const configSections = sections.filter((s) => s.sort_order < 0).sort((a, b) => a.sort_order - b.sort_order);
  const orderableSections = sections
    .filter((s) => s.sort_order >= 0)
    .sort((a, b) => a.sort_order - b.sort_order);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-display text-foreground">Gerenciar Conteúdo</h2>
        <Button onClick={initDefaults} size="sm" variant="outline">
          <Plus className="h-4 w-4 mr-1" /> Sincronizar Seções
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="space-y-2">
          {/* Config sections (global_settings, theme) */}
          {configSections.map((sec) => (
            <button
              key={sec.id}
              onClick={() => selectSection(sec)}
              className={`w-full text-left px-4 py-3 rounded-lg border transition-colors font-subtitle text-sm ${
                selected?.id === sec.id ? "bg-primary/10 border-primary text-primary" : "bg-card border-border hover:bg-muted"
              }`}
            >
              {sec.section_label}
            </button>
          ))}

          <div className="border-t border-border my-2" />
          <p className="text-xs text-muted-foreground font-subtitle px-1 flex items-center gap-1">
            <GripVertical className="h-3 w-3" /> Ordem das seções no site
          </p>

          {orderableSections.map((sec, idx) => (
            <div key={sec.id} className="flex items-center gap-1">
              <div className="flex flex-col">
                <button
                  onClick={() => moveSectionOrder(sec.id, "up")}
                  disabled={idx === 0}
                  className="p-0.5 text-muted-foreground hover:text-primary disabled:opacity-20 transition-colors"
                  title="Mover para cima"
                >
                  <ArrowUp className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={() => moveSectionOrder(sec.id, "down")}
                  disabled={idx === orderableSections.length - 1}
                  className="p-0.5 text-muted-foreground hover:text-primary disabled:opacity-20 transition-colors"
                  title="Mover para baixo"
                >
                  <ArrowDown className="h-3.5 w-3.5" />
                </button>
              </div>
              <button
                onClick={() => selectSection(sec)}
                className={`flex-1 text-left px-4 py-3 rounded-lg border transition-colors font-subtitle text-sm ${
                  selected?.id === sec.id ? "bg-primary/10 border-primary text-primary" : "bg-card border-border hover:bg-muted"
                }`}
              >
                {sec.section_label}
                <span className="block text-xs text-muted-foreground mt-1">
                  Posição: {idx + 1} · Atualizado: {new Date(sec.updated_at).toLocaleDateString("pt-BR")}
                </span>
              </button>
            </div>
          ))}
        </div>

        <div className="lg:col-span-2 space-y-4">
          {selected ? (
            <>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="font-display text-lg">{selected.section_label}</CardTitle>
                  <div className="flex gap-2">
                    {selected.sort_order >= 0 && (
                      <Button
                        onClick={() => setShowPreview(!showPreview)}
                        variant={showPreview ? "default" : "outline"}
                        size="sm"
                      >
                        {showPreview ? <EyeOff className="h-4 w-4 mr-1" /> : <Eye className="h-4 w-4 mr-1" />}
                        {showPreview ? "Ocultar Preview" : "Preview"}
                      </Button>
                    )}
                    <Button onClick={handleSave} disabled={saving} size="sm">
                      <Save className="h-4 w-4 mr-1" />
                      {saving ? "Salvando..." : "Salvar"}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4 max-h-[70vh] overflow-y-auto">
                  {fields.map(renderField)}
                </CardContent>
              </Card>

              {showPreview && selected.sort_order >= 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="font-display text-sm flex items-center gap-2">
                      <Eye className="h-4 w-4 text-primary" />
                      Preview em tempo real
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="overflow-hidden rounded-lg border border-border bg-background" style={{ minHeight: 200 }}>
                    <SectionPreview sectionKey={selected.section_key} content={editValues} />
                  </CardContent>
                </Card>
              )}
            </>
          ) : (
            <Card>
              <CardContent className="py-12 text-center text-muted-foreground font-subtitle">
                Selecione uma seção para editar
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
