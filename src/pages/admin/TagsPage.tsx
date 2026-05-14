import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2 } from "lucide-react";

interface TrackingTag {
  id: string;
  platform: string;
  tag_id: string;
  script_content: string | null;
  is_active: boolean;
}

const PLATFORMS = ["Google Analytics", "Meta Pixel", "Google Tag Manager", "TikTok Pixel", "LinkedIn Insight", "Outro"];

export default function TagsPage() {
  const [tags, setTags] = useState<TrackingTag[]>([]);
  const [newPlatform, setNewPlatform] = useState(PLATFORMS[0]);
  const [newTagId, setNewTagId] = useState("");
  const [newScript, setNewScript] = useState("");
  const { toast } = useToast();

  const fetchTags = async () => {
    const { data } = await supabase.from("tracking_tags").select("*").order("created_at");
    setTags((data as TrackingTag[]) || []);
  };

  useEffect(() => {
    fetchTags();
  }, []);

  const addTag = async () => {
    if (!newTagId.trim()) return;
    const { error } = await supabase.from("tracking_tags").insert({
      platform: newPlatform,
      tag_id: newTagId.trim(),
      script_content: newScript.trim() || null,
    });
    if (error) {
      toast({ title: "Erro", description: error.message, variant: "destructive" });
    } else {
      setNewTagId("");
      setNewScript("");
      fetchTags();
      toast({ title: "Tag adicionada!" });
    }
  };

  const toggleTag = async (id: string, active: boolean) => {
    await supabase.from("tracking_tags").update({ is_active: active }).eq("id", id);
    fetchTags();
  };

  const deleteTag = async (id: string) => {
    await supabase.from("tracking_tags").delete().eq("id", id);
    fetchTags();
    toast({ title: "Tag removida" });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-display text-foreground">Tags & Pixels</h2>

      <Card>
        <CardHeader>
          <CardTitle className="font-display text-lg">Adicionar Nova Tag</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <select
              value={newPlatform}
              onChange={(e) => setNewPlatform(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm font-subtitle"
            >
              {PLATFORMS.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
            <Input
              placeholder="ID da Tag (ex: G-XXXXXXX)"
              value={newTagId}
              onChange={(e) => setNewTagId(e.target.value)}
              className="font-subtitle"
            />
            <Button onClick={addTag}>
              <Plus className="h-4 w-4 mr-1" /> Adicionar
            </Button>
          </div>
          <Input
            placeholder="Script personalizado (opcional)"
            value={newScript}
            onChange={(e) => setNewScript(e.target.value)}
            className="font-subtitle"
          />
        </CardContent>
      </Card>

      <div className="space-y-3">
        {tags.map((tag) => (
          <Card key={tag.id}>
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="font-subtitle font-semibold text-sm text-foreground">{tag.platform}</p>
                <p className="text-xs text-muted-foreground font-mono">{tag.tag_id}</p>
              </div>
              <div className="flex items-center gap-3">
                <Switch checked={tag.is_active} onCheckedChange={(v) => toggleTag(tag.id, v)} />
                <Button variant="ghost" size="icon" onClick={() => deleteTag(tag.id)}>
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
        {tags.length === 0 && (
          <p className="text-center text-muted-foreground font-subtitle py-4">Nenhuma tag configurada</p>
        )}
      </div>
    </div>
  );
}
