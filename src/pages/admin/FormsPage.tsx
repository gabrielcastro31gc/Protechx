import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Mail, MailOpen, Eye } from "lucide-react";

interface FormSubmission {
  id: string;
  form_type: string;
  data: Record<string, any>;
  is_read: boolean;
  created_at: string;
}

export default function FormsPage() {
  const [submissions, setSubmissions] = useState<FormSubmission[]>([]);
  const [selected, setSelected] = useState<FormSubmission | null>(null);
  const [filter, setFilter] = useState<string>("all");

  const fetchSubmissions = async () => {
    let query = supabase.from("form_submissions").select("*").order("created_at", { ascending: false });
    if (filter !== "all") query = query.eq("form_type", filter);
    const { data } = await query;
    setSubmissions((data as FormSubmission[]) || []);
  };

  useEffect(() => {
    fetchSubmissions();
  }, [filter]);

  const markAsRead = async (id: string) => {
    await supabase.from("form_submissions").update({ is_read: true }).eq("id", id);
    fetchSubmissions();
  };

  const viewSubmission = (sub: FormSubmission) => {
    setSelected(sub);
    if (!sub.is_read) markAsRead(sub.id);
  };

  const formTypes = [...new Set(submissions.map((s) => s.form_type))];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-display text-foreground">Formulários Recebidos</h2>

      <div className="flex gap-2 flex-wrap">
        <Button variant={filter === "all" ? "default" : "outline"} size="sm" onClick={() => setFilter("all")}>
          Todos
        </Button>
        {formTypes.map((type) => (
          <Button key={type} variant={filter === type ? "default" : "outline"} size="sm" onClick={() => setFilter(type)}>
            {type}
          </Button>
        ))}
      </div>

      {submissions.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground font-subtitle">
            Nenhum formulário recebido ainda
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {submissions.map((sub) => (
            <Card key={sub.id} className={`cursor-pointer transition-colors hover:border-primary/50 ${!sub.is_read ? "border-l-4 border-l-primary" : ""}`}>
              <CardContent className="p-4 flex items-center justify-between" onClick={() => viewSubmission(sub)}>
                <div className="flex items-center gap-3">
                  {sub.is_read ? <MailOpen className="h-5 w-5 text-muted-foreground" /> : <Mail className="h-5 w-5 text-primary" />}
                  <div>
                    <p className="font-subtitle font-medium text-sm text-foreground">
                      {sub.data?.name || sub.data?.nome || "Sem nome"}
                    </p>
                    <p className="text-xs text-muted-foreground font-subtitle">
                      {new Date(sub.created_at).toLocaleString("pt-BR")}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="font-subtitle">{sub.form_type}</Badge>
                  <Eye className="h-4 w-4 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-display">Detalhes do Formulário</DialogTitle>
          </DialogHeader>
          {selected && (
            <div className="space-y-3">
              <Badge className="font-subtitle">{selected.form_type}</Badge>
              <p className="text-xs text-muted-foreground font-subtitle">
                Enviado em: {new Date(selected.created_at).toLocaleString("pt-BR")}
              </p>
              <div className="bg-muted rounded-lg p-4 space-y-2">
                {Object.entries(selected.data).map(([key, value]) => (
                  <div key={key}>
                    <span className="text-xs font-semibold text-muted-foreground font-subtitle uppercase">{key}</span>
                    <p className="text-sm text-foreground font-subtitle">{String(value)}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
