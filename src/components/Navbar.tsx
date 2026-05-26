import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import logo from "@/assets/logo-protechx-sem-fundo.png";

const sectionLinks = [
  { label: "Serviços", hash: "servicos" },
  { label: "Quem Atendemos", href: "/quem-atendemos" },
  { label: "Onde Atuamos", hash: "atuacao" },
  { label: "Quem Somos", hash: "sobre" },
  { label: "Blog", href: "/blog" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const getSectionHref = (hash: string) => (isHome ? `#${hash}` : `/#${hash}`);

  const hasDarkHero = !isHome;
  const textClass = !scrolled && hasDarkHero
    ? "text-white/80 hover:text-white"
    : "text-foreground/80 hover:text-foreground";
  const hamburgerClass = !scrolled && hasDarkHero ? "bg-white" : "bg-foreground";

  const getLinkHref = (link: typeof sectionLinks[0]) => {
    if ('href' in link && link.href) return link.href;
    return getSectionHref(link.hash!);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/95 backdrop-blur-md shadow-sm border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="container px-6 flex items-center justify-between h-16 md:h-20">
        <Link to="/" className="flex-shrink-0">
          <img src={logo} alt="ProtechX" className="h-10 md:h-12 object-contain" />
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {sectionLinks.map((link) => {
            const href = getLinkHref(link);
            const isInternal = href.startsWith("/") && !href.startsWith("/#");
            return isInternal ? (
              <Link
                key={link.label}
                to={href}
                className={`text-sm font-medium ${textClass} transition-colors tracking-wide`}
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.label}
                href={href}
                className={`text-sm font-medium ${textClass} transition-colors tracking-wide`}
              >
                {link.label}
              </a>
            );
          })}
          <Link
            to="/planos"
            className={`text-sm font-medium ${textClass} transition-colors tracking-wide`}
          >
            Planos
          </Link>
          <a
            href="https://wa.me/5511934529229?text=Olá!%20Gostaria%20de%20falar%20com%20um%20especialista."
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 bg-accent text-accent-foreground text-xs font-semibold uppercase tracking-wider rounded hover:opacity-90 transition-all"
          >
            Atendimento Humano
          </a>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Menu"
        >
          <span className={`block w-6 h-0.5 ${hamburgerClass} transition-transform ${mobileOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-6 h-0.5 ${hamburgerClass} transition-opacity ${mobileOpen ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-0.5 ${hamburgerClass} transition-transform ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-b border-border overflow-hidden"
          >
            <div className="container px-6 py-6 flex flex-col gap-4">
              {sectionLinks.map((link) => {
                const href = getLinkHref(link);
                const isInternal = href.startsWith("/") && !href.startsWith("/#");
                return isInternal ? (
                  <Link
                    key={link.label}
                    to={href}
                    onClick={() => setMobileOpen(false)}
                    className="text-sm font-medium text-foreground/80 hover:text-foreground py-2"
                  >
                    {link.label}
                  </Link>
                ) : (
                  <a
                    key={link.label}
                    href={href}
                    onClick={() => setMobileOpen(false)}
                    className="text-sm font-medium text-foreground/80 hover:text-foreground py-2"
                  >
                    {link.label}
                  </a>
                );
              })}
              <Link
                to="/planos"
                onClick={() => setMobileOpen(false)}
                className="text-sm font-medium text-foreground/80 hover:text-foreground py-2"
              >
                Planos
              </Link>
              <a
                href="https://wa.me/5511934529229?text=Olá!%20Gostaria%20de%20falar%20com%20um%20especialista."
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileOpen(false)}
                className="mt-2 text-center px-5 py-3 bg-accent text-accent-foreground text-xs font-semibold uppercase tracking-wider rounded"
              >
                Atendimento Humano
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
