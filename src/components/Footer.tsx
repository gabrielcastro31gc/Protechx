import logo from "@/assets/logo-protechx.jpeg";
import { useSectionContent } from "@/hooks/useSectionContent";
import { WHATSAPP_URL } from "@/lib/whatsapp";

const Footer = () => {
  const { content: c } = useSectionContent("footer");
  const { content: settings } = useSectionContent("global_settings");
  const links: { label: string; href: string }[] = c.links || [];
  const email = settings.email || c.email || "protechx@protechx.com.br";

  return (
    <footer className="py-16 border-t border-border bg-background">
      <div className="container px-6">
        <div className="grid md:grid-cols-3 gap-10 mb-10">
          <div>
            <img
              src={logo}
              alt="ProtechX"
              className="h-12 object-contain mb-4"
            />
            <p className="text-sm text-muted-foreground leading-relaxed">
              {c.tagline}
            </p>
          </div>
          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-foreground mb-4">
              Navegação
            </h4>
            <ul className="space-y-2">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-foreground mb-4">
              Contato
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors"
                >
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${email}`}
                  className="hover:text-foreground transition-colors"
                >
                  {email}
                </a>
              </li>
              {settings.phone && (
                <li>
                  <a
                    href={`tel:${settings.phone}`}
                    className="hover:text-foreground transition-colors"
                  >
                    {settings.phone}
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>
        <div className="border-t border-border pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} ProtechX Soluções Inteligentes. Todos
            os direitos reservados.
          </p>
          <div className="flex gap-4 text-xs text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">
              Política de Privacidade
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Termos de Uso
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
