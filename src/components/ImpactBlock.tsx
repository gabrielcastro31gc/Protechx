import { motion } from "framer-motion";
import { useSectionContent } from "@/hooks/useSectionContent";

const ImpactBlock = () => {
  const { content: c } = useSectionContent("impact");

  return (
    <section className="py-24 md:py-32 relative -mt-[10vh] z-20">
      <div className="container px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <p className="text-xl md:text-2xl text-foreground/70 leading-relaxed mb-8">
              {c.line1}{" "}
              <span className="text-foreground font-semibold">{c.line1Bold}</span>{" "}
              {c.line1End}
            </p>
            <p className="text-2xl md:text-3xl font-display font-bold text-foreground mb-2">
              {c.line2}
            </p>
            <p className="text-lg md:text-xl text-foreground/70 leading-relaxed mt-6">
              {c.line3}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ImpactBlock;
