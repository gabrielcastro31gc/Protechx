import { lazy, Suspense, useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import WhatsAppButton from "@/components/WhatsAppButton";
import { supabase } from "@/integrations/supabase/client";

const PlansPreview = lazy(() => import("@/components/PlansPreview"));
const BlogPreview = lazy(() => import("@/components/BlogPreview"));

const SECTION_COMPONENTS: Record<string, React.LazyExoticComponent<React.ComponentType>> = {
  hero: lazy(() => import("@/components/Hero")),
  impact: lazy(() => import("@/components/ImpactBlock")),
  positioning: lazy(() => import("@/components/Positioning")),
  services: lazy(() => import("@/components/Services")),
  how_it_works: lazy(() => import("@/components/HowItWorks")),
  differentials: lazy(() => import("@/components/Differentials")),
  diagnostic: lazy(() => import("@/components/Diagnostic")),
  technology: lazy(() => import("@/components/Technology")),
  geography: lazy(() => import("@/components/Geography")),
  about: lazy(() => import("@/components/AboutUs")),
  work_with_us: lazy(() => import("@/components/WorkWithUs")),
  final_cta: lazy(() => import("@/components/FinalCTA")),
  footer: lazy(() => import("@/components/Footer")),
};

const DEFAULT_ORDER = [
  "hero", "impact", "positioning", "services", "how_it_works", "differentials",
  "diagnostic", "geography", "about", "work_with_us", "final_cta", "footer",
];

const Index = () => {
  const [orderedKeys, setOrderedKeys] = useState<string[]>(DEFAULT_ORDER);

  useEffect(() => {
    const fetchOrder = async () => {
      const { data } = await supabase
        .from("site_content")
        .select("section_key, sort_order")
        .gte("sort_order", 0)
        .order("sort_order");
      if (data && data.length > 0) {
        // Merge: DB order first, then any new keys not in DB
        const dbKeys = data.map((d: any) => d.section_key);
        const merged = [...dbKeys, ...DEFAULT_ORDER.filter(k => !dbKeys.includes(k))];
        setOrderedKeys(merged);
      }
    };
    fetchOrder();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      {orderedKeys.map((key) => {
        const Component = SECTION_COMPONENTS[key];
        if (!Component) return null;
        return (
          <Suspense key={key} fallback={null}>
            {key === "final_cta" && (
              <>
                <BlogPreview />
                <PlansPreview />
              </>
            )}
            <Component />
          </Suspense>
        );
      })}
      <WhatsAppButton />
    </div>
  );
};

export default Index;
