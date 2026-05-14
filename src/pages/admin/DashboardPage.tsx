import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Inbox, Eye, Clock } from "lucide-react";

export default function DashboardPage() {
  const [stats, setStats] = useState({ views: 0, submissions: 0, unread: 0, avgDuration: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      const [viewsRes, subsRes, unreadRes] = await Promise.all([
        supabase.from("page_views").select("*", { count: "exact", head: true }),
        supabase.from("form_submissions").select("*", { count: "exact", head: true }),
        supabase.from("form_submissions").select("*", { count: "exact", head: true }).eq("is_read", false),
      ]);

      const { data: durationData } = await supabase
        .from("page_views")
        .select("duration_seconds")
        .not("duration_seconds", "is", null);

      const avg = durationData?.length
        ? Math.round(durationData.reduce((s, r) => s + (r.duration_seconds || 0), 0) / durationData.length)
        : 0;

      setStats({
        views: viewsRes.count || 0,
        submissions: subsRes.count || 0,
        unread: unreadRes.count || 0,
        avgDuration: avg,
      });
    };
    fetchStats();
  }, []);

  const cards = [
    { label: "Visualizações", value: stats.views, icon: Eye, color: "text-blue-500" },
    { label: "Formulários", value: stats.submissions, icon: Inbox, color: "text-green-500" },
    { label: "Não lidos", value: stats.unread, icon: BarChart3, color: "text-orange-500" },
    { label: "Tempo Médio (s)", value: stats.avgDuration, icon: Clock, color: "text-purple-500" },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-display text-foreground">Dashboard</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card) => (
          <Card key={card.label}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-subtitle font-medium text-muted-foreground">
                {card.label}
              </CardTitle>
              <card.icon className={`h-5 w-5 ${card.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-display font-bold text-foreground">{card.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
