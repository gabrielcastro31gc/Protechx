import { lazy, Suspense } from "react";
import { PreviewProvider } from "@/hooks/useSectionContent";

const Hero = lazy(() => import("@/components/Hero"));
const ImpactBlock = lazy(() => import("@/components/ImpactBlock"));
const Positioning = lazy(() => import("@/components/Positioning"));
const Services = lazy(() => import("@/components/Services"));
const HowItWorks = lazy(() => import("@/components/HowItWorks"));
const Differentials = lazy(() => import("@/components/Differentials"));
const Diagnostic = lazy(() => import("@/components/Diagnostic"));
const Geography = lazy(() => import("@/components/Geography"));
const AboutUs = lazy(() => import("@/components/AboutUs"));
const WorkWithUs = lazy(() => import("@/components/WorkWithUs"));
const FinalCTA = lazy(() => import("@/components/FinalCTA"));
const Footer = lazy(() => import("@/components/Footer"));

const SECTION_COMPONENTS: Record<string, React.ComponentType> = {
  hero: Hero,
  impact: ImpactBlock,
  positioning: Positioning,
  services: Services,
  how_it_works: HowItWorks,
  differentials: Differentials,
  diagnostic: Diagnostic,
  geography: Geography,
  about: AboutUs,
  work_with_us: WorkWithUs,
  final_cta: FinalCTA,
  footer: Footer,
};

interface SectionPreviewProps {
  sectionKey: string;
  content: Record<string, any>;
}

export default function SectionPreview({ sectionKey, content }: SectionPreviewProps) {
  const Component = SECTION_COMPONENTS[sectionKey];

  if (!Component) {
    return (
      <div className="p-8 text-center text-muted-foreground text-sm">
        Preview não disponível para esta seção.
      </div>
    );
  }

  return (
    <PreviewProvider value={{ sectionKey, content }}>
      <Suspense fallback={<div className="p-8 text-center text-muted-foreground">Carregando preview...</div>}>
        <div className="origin-top-left scale-[0.45] w-[222%]" style={{ transformOrigin: "top left" }}>
          <Component />
        </div>
      </Suspense>
    </PreviewProvider>
  );
}
