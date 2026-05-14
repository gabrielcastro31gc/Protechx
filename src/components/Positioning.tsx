import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { useSectionContent } from "@/hooks/useSectionContent";

interface Ripple {
  id: number;
  x: number;
  y: number;
}

const Positioning = () => {
  const { content: c } = useSectionContent("positioning");
  const sectionRef = useRef<HTMLElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0, opacity: 0 });
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top, opacity: 1 });
    };
    const handleMouseLeave = () => setMousePos((prev) => ({ ...prev, opacity: 0 }));
    section.addEventListener("mousemove", handleMouseMove);
    section.addEventListener("mouseleave", handleMouseLeave);
    return () => { section.removeEventListener("mousemove", handleMouseMove); section.removeEventListener("mouseleave", handleMouseLeave); };
  }, []);

  const handleClick = useCallback((e: React.MouseEvent) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    const newRipple = { id: Date.now(), x: e.clientX - rect.left, y: e.clientY - rect.top };
    setRipples((prev) => [...prev, newRipple]);
    setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== newRipple.id)), 1200);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setIsInView(true); }, { threshold: 0.2 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const items: string[] = c.items || [];

  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i, left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`,
    delay: Math.random() * 4, duration: 3 + Math.random() * 3, size: 1 + Math.random() * 2,
  }));

  return (
    <section ref={sectionRef} onClick={handleClick} className="relative py-24 md:py-32 bg-surface-elevated overflow-hidden cursor-default" style={{ isolation: "isolate" }}>
      <style>{`
        @keyframes serenity-float { 0%, 100% { transform: translateY(0) translateX(0); opacity: 0.15; } 25% { transform: translateY(-12px) translateX(6px); opacity: 0.5; } 50% { transform: translateY(-6px) translateX(-4px); opacity: 0.35; } 75% { transform: translateY(-18px) translateX(8px); opacity: 0.6; } }
        @keyframes serenity-ripple { 0% { transform: translate(-50%, -50%) scale(0); opacity: 0.7; } 100% { transform: translate(-50%, -50%) scale(40); opacity: 0; } }
        @keyframes serenity-grid-draw { 0% { stroke-dashoffset: 600; opacity: 0; } 50% { opacity: 0.2; } 100% { stroke-dashoffset: 0; opacity: 0.08; } }
        @keyframes serenity-pulse { 0%, 100% { opacity: 0.05; transform: scale(1); } 50% { opacity: 0.2; transform: scale(1.15); } }
        .serenity-grid-line { stroke: hsl(var(--primary)); stroke-width: 0.5; opacity: 0; stroke-dasharray: 5 5; stroke-dashoffset: 600; animation: serenity-grid-draw 2.5s ease-out forwards; }
        .serenity-dot { fill: hsl(var(--primary)); opacity: 0; animation: serenity-pulse 3s ease-in-out infinite; }
      `}</style>

      <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        {[...Array(8)].map((_, i) => <line key={`v-${i}`} className="serenity-grid-line" x1={`${(i+1)*12.5}%`} y1="0" x2={`${(i+1)*12.5}%`} y2="100%" style={{ animationDelay: `${i*0.15}s` }} />)}
        {[...Array(6)].map((_, i) => <line key={`h-${i}`} className="serenity-grid-line" x1="0" y1={`${(i+1)*16.66}%`} x2="100%" y2={`${(i+1)*16.66}%`} style={{ animationDelay: `${0.5+i*0.15}s` }} />)}
        {[25,50,75].map(x => [33,66].map(y => <circle key={`dot-${x}-${y}`} className="serenity-dot" cx={`${x}%`} cy={`${y}%`} r="2" style={{ animationDelay: `${(x+y)*0.02}s` }} />))}
      </svg>

      {["top-4 left-4 border-t border-l","top-4 right-4 border-t border-r","bottom-4 left-4 border-b border-l","bottom-4 right-4 border-b border-r"].map((pos, i) => (
        <motion.div key={i} className={`absolute w-8 h-8 md:w-10 md:h-10 ${pos} border-primary/20 pointer-events-none`} initial={{ opacity: 0, scale: 0.5 }} animate={isInView ? { opacity: 1, scale: 1 } : {}} transition={{ delay: 0.3+i*0.15, duration: 0.8 }} />
      ))}

      {particles.map(p => <div key={p.id} className="absolute rounded-full pointer-events-none" style={{ left: p.left, top: p.top, width: `${p.size}px`, height: `${p.size}px`, background: "hsl(var(--primary))", animation: `serenity-float ${p.duration}s ease-in-out infinite`, animationDelay: `${p.delay}s`, opacity: 0.15 }} />)}

      <div className="absolute w-64 h-64 md:w-96 md:h-96 rounded-full pointer-events-none transition-opacity duration-300" style={{ left: `${mousePos.x}px`, top: `${mousePos.y}px`, transform: "translate(-50%, -50%)", opacity: mousePos.opacity, background: "radial-gradient(circle, hsl(var(--primary) / 0.08), hsl(var(--primary) / 0.03), transparent 70%)", filter: "blur(30px)" }} />

      {ripples.map(ripple => <div key={ripple.id} className="absolute w-2 h-2 rounded-full pointer-events-none" style={{ left: `${ripple.x}px`, top: `${ripple.y}px`, background: "hsl(var(--primary) / 0.4)", animation: "serenity-ripple 1.2s ease-out forwards" }} />)}

      <div className="container px-6 relative z-10">
        <div className="max-w-3xl mx-auto">
          <motion.div className="w-px h-12 mx-auto mb-8" style={{ background: "linear-gradient(to bottom, transparent, hsl(var(--primary) / 0.4), transparent)" }} initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true }} transition={{ duration: 1 }} />
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <p className="text-xs font-medium tracking-[0.3em] uppercase text-primary mb-4 text-center font-subtitle">{c.label}</p>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-10 text-center font-subtitle">{c.description}</p>
            <div className="flex items-center justify-center gap-3 mb-10">
              <div className="h-px w-12 bg-primary/20" /><div className="w-1.5 h-1.5 rounded-full bg-primary/40" /><div className="h-px w-12 bg-primary/20" />
            </div>
            <div className="space-y-5 mb-10">
              {items.map((text: string, i: number) => (
                <motion.div key={i} initial={{ opacity: 0, x: -30, filter: "blur(8px)" }} whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }} viewport={{ once: true }} transition={{ delay: 0.3+i*0.2, duration: 0.7 }} className="flex items-start gap-4 group">
                  <div className="relative mt-2.5 flex-shrink-0">
                    <div className="w-2 h-2 rounded-full bg-primary group-hover:bg-primary transition-colors duration-300" />
                    <div className="absolute inset-0 w-2 h-2 rounded-full bg-primary/40 group-hover:scale-[2.5] transition-transform duration-500" />
                  </div>
                  <p className="text-lg text-foreground font-medium group-hover:text-primary transition-colors duration-300 font-subtitle">{text}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
          <motion.div className="w-px h-12 mx-auto mt-8" style={{ background: "linear-gradient(to bottom, hsl(var(--primary) / 0.4), transparent)" }} initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.5 }} />
        </div>
      </div>
    </section>
  );
};

export default Positioning;
