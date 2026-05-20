// src/pages/Actualites.tsx
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useNews } from "../context/NewsContext";
import { CATEGORIES } from "../data/news";
import AnimatedSection from "../components/ui/AnimatedSection";
import GoldDivider from "../components/ui/GoldDivider";
import { Search, X, ChevronLeft, ChevronRight, Camera, ArrowRight, Activity, Database } from "lucide-react";
import { useSEO } from "../hooks/useSEO";
import { useLanguage } from "../context/LanguageContext";

export default function Actualites() {
  const { t } = useLanguage();

  useSEO({
    title: t("actualites.seoTitle"),
    description: t("actualites.seoDesc"),
    keywords: "actualites ubb, photos ubb, evenements afrique, formation entrepreneuriat, dakar, burkina faso",
    ogImage: "https://d1yei2z3i6k35z.cloudfront.net/10694324/6943262fb4eee_WhatsAppImage2025-11-20at15.08.2711.jpeg"
  });

  const { newsGallery } = useNews();
  const [activeCategory, setActiveCategory] = useState("Tous");
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const visibleNews = newsGallery.filter(item => item.visible);
  const filteredNews = activeCategory === "Tous"
    ? visibleNews
    : visibleNews.filter(item => item.category === activeCategory);

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('fr-FR', {
      day: 'numeric', month: 'long', year: 'numeric'
    });
  };

  // Keyboard navigation for modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImageIndex === null) return;
      if (e.key === "Escape") setSelectedImageIndex(null);
      if (e.key === "ArrowLeft") {
        setSelectedImageIndex(prev => prev! > 0 ? prev! - 1 : filteredNews.length - 1);
      }
      if (e.key === "ArrowRight") {
        setSelectedImageIndex(prev => prev! < filteredNews.length - 1 ? prev! + 1 : 0);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImageIndex, filteredNews.length]);

  return (
    <div className="flex flex-col w-full min-h-screen">

      {/* ── SECTION 1 — HERO ──────────────────────────────────────── */}
      <section className="bg-bg-primary pt-40 pb-20 text-center relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gold/5 blur-[100px] rounded-full pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <AnimatedSection>
            <h1 className="text-5xl md:text-7xl font-serif italic text-text-primary mb-6">
              {t("actualites.hero.title")}
            </h1>
            <p className="text-xl md:text-2xl font-serif italic text-gold mb-8">
              {t("actualites.hero.subtitle")}
            </p>
            <GoldDivider className="mx-auto mb-8" />
            <span className="inline-block px-4 py-1.5 bg-bg-card border border-border-subtle rounded-full text-[11px] font-bold uppercase tracking-widest text-text-muted">
              {visibleNews.length} {t("actualites.hero.tag")}
            </span>
          </AnimatedSection>
        </div>
      </section>

      {/* ── SECTION 2 — FILTRES CATÉGORIE ───────────────────────────── */}
      <section className="bg-bg-secondary border-b border-border-subtle py-4 sticky top-0 z-40 shadow-md">
        <div className="max-w-7xl mx-auto px-6 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-2 min-w-max md:justify-center">
            {CATEGORIES.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                  activeCategory === category
                    ? "bg-gold text-bg-primary shadow-[0_0_15px_rgba(201,151,58,0.4)]"
                    : "border border-border-subtle text-text-muted hover:border-gold hover:text-gold bg-bg-primary"
                }`}
              >
                {category === "Tous" ? t("actualites.filter.all") : category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 3 — GALERIE ENRICHIE ────────────────────────────── */}
      <section className="bg-bg-primary py-16 min-h-[500px]">
        <div className="max-w-7xl mx-auto px-6">

          {filteredNews.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredNews.map((item, index) => (
                <AnimatedSection key={item.id} delay={index * 0.05}>
                  <div
                    className="group cursor-pointer bg-[#1A1A1A] border border-border-subtle rounded-2xl overflow-hidden hover:border-gold/30 transition-all duration-300 shadow-lg hover:shadow-gold/5 flex flex-col h-full"
                    onClick={() => setSelectedImageIndex(index)}
                  >
                    {/* Image Box */}
                    <div className="relative aspect-square overflow-hidden bg-bg-secondary">
                      <img
                        src={item.url}
                        alt={item.caption}
                        className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-colors duration-300 flex items-center justify-center">
                        <Search className="w-10 h-10 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform scale-50 group-hover:scale-100" />
                      </div>
                    </div>

                    {/* Details Box */}
                    <div className="p-4 flex flex-col flex-grow">
                      <span className="text-gold text-[10px] font-bold uppercase tracking-widest mb-2">
                        {item.category}
                      </span>
                      <h3 className="text-text-primary text-[13px] font-medium leading-relaxed mb-3 line-clamp-2">
                        {item.caption}
                      </h3>
                      <span className="text-text-muted text-[11px] mt-auto">
                        {formatDate(item.date)}
                      </span>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          ) : (
            <AnimatedSection>
              <div className="flex flex-col items-center justify-center py-32 text-center border border-dashed border-border-subtle rounded-2xl bg-bg-card/50">
                <Camera className="w-16 h-16 text-border-subtle mb-6" />
                <h3 className="text-xl font-serif text-text-primary mb-2">{t("actualites.noPubs.title")}</h3>
                <p className="text-text-secondary text-sm mb-8">{t("actualites.noPubs.desc")}</p>
                <button
                  onClick={() => setActiveCategory("Tous")}
                  className="px-6 py-2.5 border border-gold text-gold font-bold uppercase tracking-wider text-xs rounded-full hover:bg-gold/10 transition-colors"
                >
                  {t("actualites.noPubs.cta")} <ArrowRight className="inline w-3 h-3 ml-1" />
                </button>
              </div>
            </AnimatedSection>
          )}

        </div>
      </section>

      {/* ── MODAL D'AGRANDISSEMENT ──────────────────────────────────── */}
      <AnimatePresence>
        {selectedImageIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col items-center justify-center p-4 md:p-8"
            onClick={() => setSelectedImageIndex(null)}
          >
            <button
              className="absolute top-6 right-6 z-50 text-gold hover:text-gold-light bg-white/5 hover:bg-white/10 p-2 rounded-full transition-colors"
              onClick={(e) => { e.stopPropagation(); setSelectedImageIndex(null); }}
            >
              <X className="w-6 h-6" />
            </button>

            {filteredNews.length > 1 && (
              <>
                <button
                  className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 z-50 text-white/50 hover:text-white bg-black/50 hover:bg-black/80 p-3 rounded-full transition-all"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedImageIndex(prev => prev! > 0 ? prev! - 1 : filteredNews.length - 1);
                  }}
                >
                  <ChevronLeft className="w-8 h-8" />
                </button>
                <button
                  className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 z-50 text-white/50 hover:text-white bg-black/50 hover:bg-black/80 p-3 rounded-full transition-all"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedImageIndex(prev => prev! < filteredNews.length - 1 ? prev! + 1 : 0);
                  }}
                >
                  <ChevronRight className="w-8 h-8" />
                </button>
              </>
            )}

            <div
              className="relative max-w-5xl w-full max-h-[85vh] flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={filteredNews[selectedImageIndex].url}
                alt={filteredNews[selectedImageIndex].caption}
                className="max-w-full max-h-[75vh] object-contain rounded-lg shadow-2xl"
              />
              <div className="mt-6 text-center w-full max-w-2xl px-4">
                <span className="inline-block px-3 py-1 bg-gold/20 text-gold text-[10px] font-bold uppercase tracking-widest rounded-full mb-3">
                  {filteredNews[selectedImageIndex].category}
                </span>
                <h3 className="text-xl md:text-2xl text-white font-serif mb-2">
                  {filteredNews[selectedImageIndex].caption}
                </h3>
                <p className="text-white/50 text-sm">
                  {formatDate(filteredNews[selectedImageIndex].date)}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── SECTION 4 — PROJETS STRATÉGIQUES ────────────────────────── */}
      <section className="bg-bg-secondary py-24 border-t border-border-subtle">
        <div className="max-w-6xl mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif text-text-primary mb-4">{t("actualites.tools.title")}</h2>
            <p className="text-text-secondary text-lg">{t("actualites.tools.subtitle")}</p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <AnimatedSection delay={0.1}>
              <div className="bg-bg-primary border border-border-subtle rounded-2xl p-10 h-full flex flex-col relative overflow-hidden group hover:border-gold/30 transition-colors">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 blur-3xl rounded-full" />
                <span className="inline-flex items-center gap-2 px-3 py-1 bg-gold/10 text-gold border border-gold/20 text-[10px] font-bold uppercase tracking-widest rounded-full self-start mb-8">
                  {t("actualites.tools.vitalcheck.badge")}
                </span>
                <Database className="w-12 h-12 text-gold mb-6" />
                <h3 className="text-3xl font-serif text-text-primary mb-4">vitalCHECK</h3>
                <p className="text-text-secondary leading-relaxed mb-8 flex-grow">
                  {t("actualites.tools.vitalcheck.desc")}
                </p>
                <div className="w-full h-px bg-gradient-to-r from-gold/50 to-transparent mb-6" />
                <p className="text-text-primary font-medium text-sm mb-8 flex items-center gap-2">
                  {t("actualites.tools.vitalcheck.speed")}
                </p>
                <a
                  href="https://www.checkmyenterprise.com/pricing"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-gold font-bold uppercase tracking-widest text-xs hover:text-gold-light transition-colors group-hover:translate-x-2 duration-300"
                >
                  {t("actualites.tools.vitalcheck.cta")} <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="bg-[#131313] border border-gold/30 rounded-2xl p-10 h-full flex flex-col relative overflow-hidden group hover:border-gold/50 transition-colors shadow-[0_0_30px_rgba(201,151,58,0.05)]">
                <div className="absolute top-0 left-0 w-32 h-32 bg-gold/10 blur-3xl rounded-full" />
                <span className="inline-flex items-center gap-2 px-3 py-1 bg-gold text-bg-primary text-[10px] font-bold uppercase tracking-widest rounded-full self-start mb-8">
                  {t("actualites.tools.harvests.badge")}
                </span>
                <Activity className="w-12 h-12 text-gold mb-6" />
                <h3 className="text-3xl font-serif text-text-primary mb-4">HARVESTS 2.0</h3>
                <p className="text-text-secondary leading-relaxed mb-8 flex-grow">
                  {t("actualites.tools.harvests.desc")}
                </p>
                <div className="w-full h-px bg-gradient-to-r from-gold/50 to-transparent mb-6" />
                <p className="text-text-primary font-medium text-sm mb-8 flex items-center gap-2">
                  {t("actualites.tools.harvests.tag")}
                </p>
                <a
                  href="https://harvests.site/pricing/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-gold font-bold uppercase tracking-widest text-xs hover:text-gold-light transition-colors group-hover:translate-x-2 duration-300"
                >
                  {t("actualites.tools.harvests.cta")} <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── SECTION 5 — CTA NEWSLETTER ──────────────────────────────── */}
      <section className="bg-bg-primary py-20 border-t border-border-subtle text-center">
        <div className="max-w-2xl mx-auto px-6">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-serif text-text-primary mb-6">{t("actualites.ctaNewsletter.title")}</h2>
            <p className="text-text-secondary text-lg mb-10 leading-relaxed">{t("actualites.ctaNewsletter.desc")}</p>
            <a
              href="/workbook"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gold text-bg-primary font-bold uppercase tracking-widest text-sm rounded-full hover:bg-gold-light transition-all hover:scale-105"
            >
              {t("actualites.ctaNewsletter.cta")} <ArrowRight className="w-4 h-4" />
            </a>
          </AnimatedSection>
        </div>
      </section>

    </div>
  );
}
