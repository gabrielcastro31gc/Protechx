import { useEffect, useState, useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import { Eye, Clock, Users, Monitor, Smartphone, Tablet, RefreshCw, Calendar, Download, MousePointerClick, TrendingDown } from "lucide-react";

interface PageView {
  page_path: string;
  created_at: string;
  duration_seconds: number | null;
  referrer: string | null;
  screen_width: number | null;
  session_id: string | null;
  user_agent: string | null;
}

const COLORS = [
  "hsl(201, 98%, 16%)",
  "hsl(43, 67%, 44%)",
  "hsl(201, 60%, 40%)",
  "hsl(43, 80%, 60%)",
  "hsl(201, 40%, 60%)",
  "hsl(0, 0%, 50%)",
];

type DateRange = "7d" | "30d" | "90d" | "all";

function getDeviceType(width: number | null): string {
  if (!width) return "Desconhecido";
  if (width < 768) return "Mobile";
  if (width < 1024) return "Tablet";
  return "Desktop";
}

function getRefererDomain(referrer: string | null): string {
  if (!referrer) return "Direto";
  try {
    const url = new URL(referrer);
    return url.hostname.replace("www.", "");
  } catch {
    return "Outro";
  }
}

interface CTAClick {
  cta_name: string;
  created_at: string;
}

const CTA_LABELS: Record<string, string> = {
  hero_cta_primary: "Hero – Botão Principal",
  hero_cta_secondary: "Hero – Botão Secundário",
  final_cta_button: "CTA Final",
  whatsapp_button: "WhatsApp",
};

export default function AnalyticsPage() {
  const [views, setViews] = useState<PageView[]>([]);
  const [ctaClicks, setCtaClicks] = useState<CTAClick[]>([]);
  const [formCount, setFormCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [range, setRange] = useState<DateRange>("30d");

  const fetchAnalytics = async () => {
    setLoading(true);

    const since = range !== "all" ? (() => {
      const d = new Date();
      d.setDate(d.getDate() - (range === "7d" ? 7 : range === "30d" ? 30 : 90));
      return d.toISOString();
    })() : null;

    let viewsQuery = supabase.from("page_views").select("*").order("created_at", { ascending: false });
    let ctaQuery = supabase.from("cta_clicks").select("cta_name, created_at").order("created_at", { ascending: false });
    let formsQuery = supabase.from("form_submissions").select("id", { count: "exact", head: true });

    if (since) {
      viewsQuery = viewsQuery.gte("created_at", since);
      ctaQuery = ctaQuery.gte("created_at", since);
      formsQuery = formsQuery.gte("created_at", since);
    }

    const [viewsRes, ctaRes, formsRes] = await Promise.all([
      viewsQuery.limit(1000),
      ctaQuery.limit(1000),
      formsQuery,
    ]);

    setViews((viewsRes.data as PageView[]) || []);
    setCtaClicks((ctaRes.data as CTAClick[]) || []);
    setFormCount(formsRes.count ?? 0);
    setLoading(false);
  };

  useEffect(() => { fetchAnalytics(); }, [range]);

  const stats = useMemo(() => {
    const uniqueSessions = new Set(views.map((v) => v.session_id).filter(Boolean));
    const totalViews = views.length;
    const durations = views.map((v) => v.duration_seconds || 0).filter((d) => d > 0);
    const avgDuration = durations.length > 0 ? Math.round(durations.reduce((a, b) => a + b, 0) / durations.length) : 0;

    // Views by page
    const pageMap: Record<string, number> = {};
    views.forEach((v) => { pageMap[v.page_path] = (pageMap[v.page_path] || 0) + 1; });
    const viewsByPage = Object.entries(pageMap)
      .map(([page, count]) => ({ page, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    // Views by day
    const dayMap: Record<string, number> = {};
    views.forEach((v) => {
      const day = new Date(v.created_at).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" });
      dayMap[day] = (dayMap[day] || 0) + 1;
    });
    const viewsByDay = Object.entries(dayMap)
      .map(([date, count]) => ({ date, count }))
      .reverse();

    // Device breakdown
    const deviceMap: Record<string, number> = {};
    views.forEach((v) => {
      const device = getDeviceType(v.screen_width);
      deviceMap[device] = (deviceMap[device] || 0) + 1;
    });
    const deviceData = Object.entries(deviceMap).map(([name, value]) => ({ name, value }));

    // Referrer breakdown
    const refMap: Record<string, number> = {};
    views.forEach((v) => {
      const ref = getRefererDomain(v.referrer);
      refMap[ref] = (refMap[ref] || 0) + 1;
    });
    const referrerData = Object.entries(refMap)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 6);

    // CTA clicks breakdown
    const ctaMap: Record<string, number> = {};
    ctaClicks.forEach((c) => {
      ctaMap[c.cta_name] = (ctaMap[c.cta_name] || 0) + 1;
    });
    const ctaData = Object.entries(ctaMap)
      .map(([name, value]) => ({ name: CTA_LABELS[name] || name, value }))
      .sort((a, b) => b.value - a.value);

    return { totalViews, uniqueSessions: uniqueSessions.size, avgDuration, viewsByPage, viewsByDay, deviceData, referrerData, ctaData, totalClicks: ctaClicks.length };
  }, [views, ctaClicks]);

  const formatDuration = (seconds: number) => {
    if (seconds < 60) return `${seconds}s`;
    return `${Math.floor(seconds / 60)}m ${seconds % 60}s`;
  };

  const exportCSV = () => {
    if (views.length === 0) return;
    const headers = ["Página", "Data/Hora", "Duração (s)", "Dispositivo", "Origem", "Sessão"];
    const rows = views.map((v) => [
      v.page_path,
      new Date(v.created_at).toLocaleString("pt-BR"),
      String(v.duration_seconds ?? 0),
      getDeviceType(v.screen_width),
      getRefererDomain(v.referrer),
      v.session_id ?? "",
    ]);
    const csv = [headers, ...rows].map((r) => r.map((c) => `"${c.replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `analytics-${range}-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const DeviceIcon = ({ type }: { type: string }) => {
    if (type === "Mobile") return <Smartphone className="h-4 w-4" />;
    if (type === "Tablet") return <Tablet className="h-4 w-4" />;
    return <Monitor className="h-4 w-4" />;
  };

  return (
    <div className="space-y-6 min-w-0">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <h2 className="text-2xl font-display text-foreground">Analytics</h2>
        <div className="flex flex-wrap items-center gap-2">
          {(["7d", "30d", "90d", "all"] as DateRange[]).map((r) => (
            <Button
              key={r}
              variant={range === r ? "default" : "outline"}
              size="sm"
              onClick={() => setRange(r)}
              className="text-xs px-2 sm:px-3"
            >
              <Calendar className="h-3.5 w-3.5 mr-1 hidden sm:inline-block" />
              {r === "7d" ? "7d" : r === "30d" ? "30d" : r === "90d" ? "90d" : "Tudo"}
            </Button>
          ))}
          <Button variant="outline" size="sm" onClick={fetchAnalytics} disabled={loading} className="text-xs px-2 sm:px-3">
            <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
          </Button>
          <Button variant="outline" size="sm" onClick={exportCSV} disabled={views.length === 0} className="text-xs px-2 sm:px-3">
            <Download className="h-3.5 w-3.5 sm:mr-1" />
            <span className="hidden sm:inline">CSV</span>
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Eye className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-display font-bold text-foreground">{stats.totalViews}</p>
                <p className="text-xs text-muted-foreground font-subtitle">Visualizações</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-display font-bold text-foreground">{stats.uniqueSessions}</p>
                <p className="text-xs text-muted-foreground font-subtitle">Sessões únicas</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Clock className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-display font-bold text-foreground">{formatDuration(stats.avgDuration)}</p>
                <p className="text-xs text-muted-foreground font-subtitle">Tempo médio</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-display text-lg">Visitas por Dia</CardTitle>
          </CardHeader>
          <CardContent>
            {stats.viewsByDay.length > 0 ? (
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={stats.viewsByDay}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="date" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: 8,
                      fontSize: 12,
                    }}
                  />
                  <Line type="monotone" dataKey="count" name="Visitas" stroke="hsl(43, 67%, 44%)" strokeWidth={2} dot={{ r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-center text-muted-foreground font-subtitle py-8">Sem dados no período</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-display text-lg">Páginas mais visitadas</CardTitle>
          </CardHeader>
          <CardContent>
            {stats.viewsByPage.length > 0 ? (
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={stats.viewsByPage} layout="vertical" margin={{ left: 0, right: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis type="number" stroke="hsl(var(--muted-foreground))" />
                  <YAxis dataKey="page" type="category" width={80} tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: 8,
                      fontSize: 12,
                    }}
                  />
                  <Bar dataKey="count" name="Visitas" fill="hsl(201, 98%, 16%)" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-center text-muted-foreground font-subtitle py-8">Sem dados no período</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-display text-lg">Dispositivos</CardTitle>
          </CardHeader>
          <CardContent>
            {stats.deviceData.length > 0 ? (
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <ResponsiveContainer width="100%" height={180} className="sm:max-w-[50%]">
                  <PieChart>
                    <Pie
                      data={stats.deviceData}
                      cx="50%"
                      cy="50%"
                      innerRadius={35}
                      outerRadius={70}
                      dataKey="value"
                      nameKey="name"
                    >
                      {stats.deviceData.map((_, i) => (
                        <Cell key={i} fill={COLORS[i % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="space-y-2">
                  {stats.deviceData.map((d, i) => (
                    <div key={d.name} className="flex items-center gap-2 text-sm">
                      <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                      <DeviceIcon type={d.name} />
                      <span className="font-subtitle text-foreground">{d.name}</span>
                      <span className="text-muted-foreground">({d.value})</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-center text-muted-foreground font-subtitle py-8">Sem dados no período</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-display text-lg">Origem do tráfego</CardTitle>
          </CardHeader>
          <CardContent>
            {stats.referrerData.length > 0 ? (
              <div className="space-y-3">
                {stats.referrerData.map((r) => {
                  const pct = stats.totalViews > 0 ? Math.round((r.value / stats.totalViews) * 100) : 0;
                  return (
                    <div key={r.name} className="space-y-1">
                      <div className="flex justify-between text-sm font-subtitle">
                        <span className="text-foreground">{r.name}</span>
                        <span className="text-muted-foreground">{r.value} ({pct}%)</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full transition-all"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-center text-muted-foreground font-subtitle py-8">Sem dados no período</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* CTA Conversion */}
      <Card>
        <CardHeader>
          <CardTitle className="font-display text-lg flex items-center gap-2">
            <MousePointerClick className="h-5 w-5 text-primary" />
            Cliques em CTAs ({stats.totalClicks} total)
          </CardTitle>
        </CardHeader>
        <CardContent>
          {stats.ctaData.length > 0 ? (
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={stats.ctaData} margin={{ left: 0, right: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="name" tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" interval={0} angle={-20} textAnchor="end" height={50} />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                />
                <Bar dataKey="value" name="Cliques" fill="hsl(43, 67%, 44%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-center text-muted-foreground font-subtitle py-8">Nenhum clique registrado no período</p>
          )}
        </CardContent>
      </Card>

      {/* Conversion Funnel */}
      <Card>
        <CardHeader>
          <CardTitle className="font-display text-lg flex items-center gap-2">
            <TrendingDown className="h-5 w-5 text-primary" />
            Funil de Conversão
          </CardTitle>
        </CardHeader>
        <CardContent>
          <FunnelChart
            steps={[
              { label: "Visitantes", value: stats.uniqueSessions, color: "hsl(201, 98%, 16%)" },
              { label: "Cliques em CTA", value: stats.totalClicks, color: "hsl(43, 67%, 44%)" },
              { label: "Formulários Enviados", value: formCount, color: "hsl(142, 70%, 45%)" },
            ]}
          />
        </CardContent>
      </Card>
    </div>
  );
}

function FunnelChart({ steps }: { steps: { label: string; value: number; color: string }[] }) {
  const maxValue = Math.max(...steps.map((s) => s.value), 1);

  return (
    <div className="space-y-4 py-4">
      {steps.map((step, i) => {
        const widthPct = Math.max((step.value / maxValue) * 100, 8);
        const conversionRate = i > 0 && steps[i - 1].value > 0
          ? ((step.value / steps[i - 1].value) * 100).toFixed(1)
          : null;

        return (
          <div key={step.label} className="space-y-1.5">
            <div className="flex items-center justify-between text-sm font-subtitle">
              <span className="text-foreground font-medium">{step.label}</span>
              <div className="flex items-center gap-2">
                <span className="font-display font-bold text-foreground text-lg">{step.value}</span>
                {conversionRate && (
                  <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                    {conversionRate}%
                  </span>
                )}
              </div>
            </div>
            <div className="relative h-10 bg-muted/50 rounded-lg overflow-hidden">
              <div
                className="h-full rounded-lg transition-all duration-700 ease-out flex items-center justify-center"
                style={{
                  width: `${widthPct}%`,
                  backgroundColor: step.color,
                  minWidth: 40,
                }}
              >
                {widthPct > 20 && (
                  <span className="text-xs font-semibold text-white drop-shadow">
                    {step.value}
                  </span>
                )}
              </div>
            </div>
            {i < steps.length - 1 && (
              <div className="flex justify-center">
                <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}