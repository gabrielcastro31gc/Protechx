import { motion } from "framer-motion";
import { ArrowRight, Calendar, Search, Tag } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import WhatsAppButton from "@/components/WhatsAppButton";
import { supabase } from "@/integrations/supabase/client";
import { WHATSAPP_URL } from "@/lib/whatsapp";

interface BlogPost {
	id: string;
	title: string;
	slug: string;
	excerpt: string;
	cover_image: string | null;
	category: string;
	published_at: string | null;
	tags: string[];
}

const CATEGORY_LABELS: Record<string, string> = {
	gestao: "Gestão Financeira",
	contabilidade: "Contabilidade",
	tecnologia: "Tecnologia",
	negocios: "Negócios",
	dicas: "Dicas Práticas",
};

const ALL_CATEGORIES = [
  "todos",
  "gestao",
  "contabilidade",
  "tecnologia",
  "negocios",
  "dicas",
];

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [filter, setFilter] = useState("todos");
  const [search, setSearch] = useState("");

  useEffect(() => {
    document.title =
      "Blog | ProtechX - Gestão Financeira e Tecnologia para Empresas";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute(
        "content",
        "Artigos sobre gestão financeira, contabilidade, tecnologia e dicas práticas para empresas. Aprenda a organizar as finanças e crescer com previsibilidade.",
      );
    }
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      let query = supabase
        .from("blog_posts")
        .select(
          "id, title, slug, excerpt, cover_image, category, published_at, tags",
        )
        .eq("is_published", true)
        .order("published_at", { ascending: false });

      if (filter !== "todos") {
        query = query.eq("category", filter);
      }

      const { data } = await query;
      if (data) setPosts(data);
    };
    fetchPosts();
  }, [filter]);

  const filtered = search
    ? posts.filter(
        (p) =>
          p.title.toLowerCase().includes(search.toLowerCase()) ||
          p.excerpt.toLowerCase().includes(search.toLowerCase()),
      )
    : posts;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-28 pb-16 bg-accent text-accent-foreground">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-4xl md:text-6xl font-bold mb-4"
          >
            Blog <span className="text-primary">ProtechX</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-accent-foreground/80 max-w-2xl mx-auto mb-8"
          >
            Conteúdos práticos sobre gestão financeira, tecnologia e crescimento
            empresarial para você tomar decisões com mais clareza.
          </motion.p>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="relative max-w-md mx-auto"
          >
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar artigos..."
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-background text-foreground border border-border focus:ring-2 focus:ring-primary outline-none"
            />
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <div className="border-b border-border bg-card sticky top-16 z-30">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex gap-1 overflow-x-auto py-3 scrollbar-hide">
            {ALL_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  filter === cat
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted"
                }`}
              >
                {cat === "todos" ? "Todos" : CATEGORY_LABELS[cat] || cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Posts Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg">
                Nenhum artigo encontrado.
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Em breve teremos novos conteúdos! Enquanto isso, fale conosco:
              </p>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-4 bg-[hsl(142,70%,40%)] text-white font-semibold px-6 py-3 rounded-lg hover:brightness-110 transition-all"
              >
                Falar pelo WhatsApp
              </a>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((post, i) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                >
                  <Link
                    to={`/blog/${post.slug}`}
                    className="group block bg-card rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-border hover:border-primary/30 h-full"
                  >
                    {post.cover_image && (
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={post.cover_image}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary bg-primary/10 px-2.5 py-1 rounded-full">
                          <Tag className="w-3 h-3" />
                          {CATEGORY_LABELS[post.category] || post.category}
                        </span>
                        {post.published_at && (
                          <span className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Calendar className="w-3 h-3" />
                            {new Date(post.published_at).toLocaleDateString(
                              "pt-BR",
                            )}
                          </span>
                        )}
                      </div>
                      <h2 className="font-display text-lg font-bold text-accent group-hover:text-primary transition-colors mb-2 line-clamp-2">
                        {post.title}
                      </h2>
                      <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                        {post.excerpt}
                      </p>
                      <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary group-hover:gap-2 transition-all">
                        Ler artigo completo <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA WhatsApp */}
      <section className="py-16 bg-accent text-accent-foreground">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h2 className="font-display text-2xl md:text-4xl font-bold mb-4">
            Quer aplicar essas estratégias na{" "}
            <span className="text-primary">sua empresa?</span>
          </h2>
          <p className="text-accent-foreground/80 mb-8 text-lg">
            Converse com nosso time e descubra como a ProtechX pode organizar
            sua gestão financeira em semanas.
          </p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-[hsl(142,70%,40%)] text-white font-bold px-8 py-4 rounded-xl text-lg hover:brightness-110 transition-all shadow-lg"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Quero um diagnóstico gratuito
          </a>
        </div>
      </section>

      <WhatsAppButton />

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            name: "Blog ProtechX",
            description:
             
						<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
							<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
						</svg>
						Quero um diagnóstico gratuito
					</a>
				</div>
			</section>

			<WhatsAppButton />

			{/* JSON-LD */}
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify({
						"@context": "https://schema.org",
						"@type": "Blog",
						name: "Blog ProtechX",
						description:
							"Artigos sobre gestão financeira, contabilidade e tecnologia para empresas",
						url: "https://cuddle-joy-maker.lovable.app/blog",
						publisher: {
							"@type": "Organization",
							name: "ProtechX",
							url: "https://cuddle-joy-maker.lovable.app",
						},
					}),
				}}
			/>
		</div>
	);
};

export default Blog;
