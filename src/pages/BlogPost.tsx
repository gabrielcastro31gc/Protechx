import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import WhatsAppButton from "@/components/WhatsAppButton";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock, Tag, Share2 } from "lucide-react";

interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image: string | null;
  category: string;
  tags: string[];
  meta_title: string | null;
  meta_description: string | null;
  published_at: string | null;
  author_name: string;
}

const CATEGORY_LABELS: Record<string, string> = {
  gestao: "Gestão Financeira",
  contabilidade: "Contabilidade",
  tecnologia: "Tecnologia",
  negocios: "Negócios",
  dicas: "Dicas Práticas",
};

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [related, setRelated] = useState<{ id: string; title: string; slug: string; excerpt: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) return;
      setLoading(true);
      const { data } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("slug", slug)
        .eq("is_published", true)
        .maybeSingle();

      if (data) {
        setPost(data);
        document.title = data.meta_title || `${data.title} | Blog ProtechX`;
        const meta = document.querySelector('meta[name="description"]');
        if (meta) meta.setAttribute("content", data.meta_description || data.excerpt);

        // Fetch related
        const { data: rel } = await supabase
          .from("blog_posts")
          .select("id, title, slug, excerpt")
          .eq("is_published", true)
          .eq("category", data.category)
          .neq("id", data.id)
          .limit(3);
        if (rel) setRelated(rel);
      }
      setLoading(false);
    };
    fetchPost();
  }, [slug]);

  const readingTime = post ? Math.max(1, Math.ceil(post.content.split(/\s+/).length / 200)) : 0;

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-28 pb-16 container mx-auto px-4 max-w-3xl">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-muted rounded w-3/4" />
            <div className="h-4 bg-muted rounded w-1/2" />
            <div className="h-64 bg-muted rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-28 pb-16 container mx-auto px-4 max-w-3xl text-center">
          <h1 className="text-3xl font-bold text-accent mb-4">Artigo não encontrado</h1>
          <Link to="/blog" className="text-primary hover:underline">
            ← Voltar ao blog
          </Link>
        </div>
      </div>
    );
  }

  const shareUrl = window.location.href;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <article className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-3xl">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-8"
          >
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Voltar ao blog
            </Link>
          </motion.div>

          {/* Header */}
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary bg-primary/10 px-3 py-1.5 rounded-full">
                <Tag className="w-3 h-3" />
                {CATEGORY_LABELS[post.category] || post.category}
              </span>
              {post.published_at && (
                <span className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  {new Date(post.published_at).toLocaleDateString("pt-BR", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              )}
              <span className="flex items-center gap-1 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                {readingTime} min de leitura
              </span>
            </div>

            <h1 className="font-display text-3xl md:text-5xl font-bold text-accent leading-tight mb-4">
              {post.title}
            </h1>
            <p className="text-lg text-muted-foreground">{post.excerpt}</p>

            <div className="flex items-center justify-between mt-6 pt-6 border-t border-border">
              <span className="text-sm text-muted-foreground">
                Por <strong className="text-foreground">{post.author_name}</strong>
              </span>
              <button
                onClick={() => navigator.share?.({ title: post.title, url: shareUrl }) || navigator.clipboard.writeText(shareUrl)}
                className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Share2 className="w-4 h-4" /> Compartilhar
              </button>
            </div>
          </motion.header>

          {/* Cover */}
          {post.cover_image && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-10 rounded-xl overflow-hidden shadow-lg"
            >
              <img
                src={post.cover_image}
                alt={post.title}
                className="w-full aspect-video object-cover"
              />
            </motion.div>
          )}

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="prose prose-lg max-w-none
              prose-headings:font-display prose-headings:text-accent prose-headings:font-bold
              prose-a:text-primary prose-a:no-underline hover:prose-a:underline
              prose-strong:text-foreground
              prose-p:text-muted-foreground prose-p:leading-relaxed
              prose-li:text-muted-foreground
              prose-img:rounded-xl"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* CTA WhatsApp inline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-12 p-8 rounded-2xl bg-accent text-accent-foreground text-center"
          >
            <h3 className="font-display text-2xl font-bold mb-3">
              Gostou do conteúdo? <span className="text-primary">Vamos conversar!</span>
            </h3>
            <p className="text-accent-foreground/80 mb-6">
              Receba um diagnóstico gratuito da gestão financeira da sua empresa.
            </p>
            <a
              href="https://api.whatsapp.com/send/?phone=5511934529229&text=Olá%2C+vim+do+site+e+gostaria+de+tirar+algumas+dúvidas%21&type=phone_number&app_absent=0"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-[hsl(142,70%,40%)] text-white font-bold px-8 py-4 rounded-xl text-lg hover:brightness-110 transition-all shadow-lg"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Falar com especialista
            </a>
          </motion.div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs bg-muted text-muted-foreground px-3 py-1.5 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </article>

      {/* Related Posts */}
      {related.length > 0 && (
        <section className="py-16 bg-muted/30 border-t border-border">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="font-display text-2xl font-bold text-accent mb-8">
              Artigos relacionados
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {related.map((r) => (
                <Link
                  key={r.id}
                  to={`/blog/${r.slug}`}
                  className="group block bg-card rounded-xl p-6 shadow-sm hover:shadow-md border border-border hover:border-primary/30 transition-all"
                >
                  <h3 className="font-display font-bold text-accent group-hover:text-primary transition-colors mb-2 line-clamp-2">
                    {r.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">{r.excerpt}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <WhatsAppButton />

      {/* JSON-LD Article */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: post.meta_description || post.excerpt,
            image: post.cover_image,
            author: { "@type": "Person", name: post.author_name },
            publisher: {
              "@type": "Organization",
              name: "ProtechX",
              url: "https://cuddle-joy-maker.lovable.app",
            },
            datePublished: post.published_at,
            mainEntityOfPage: shareUrl,
          }),
        }}
      />
    </div>
  );
};

export default BlogPost;
