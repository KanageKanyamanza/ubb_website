import { motion } from "motion/react";
import { Link } from "react-router-dom";
import AnimatedSection from "../components/ui/AnimatedSection";
import GoldDivider from "../components/ui/GoldDivider";
import { useSEO } from "../hooks/useSEO";
import { MapPin, Globe, Linkedin, Target, Wrench, TrendingUp, ArrowRight } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export default function Founder() {
  const { t } = useLanguage();

  useSEO({
    title: t("founder.seoTitle"),
    description: t("founder.seoDesc"),
    keywords: "ambrose nzeyimana, fondateur ubb, ubuntu business builders, structuration d'affaires, investissement afrique, cormorant garamond",
    ogImage: "https://d1yei2z3i6k35z.cloudfront.net/10694324/69f9d5444cd729.29932403_ambroseimage.jpeg"
  });

  return (
    <div className="flex flex-col w-full min-h-screen">
      
      {/* â”€â”€ SECTION 1 â€” HERO FONDATEUR â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section className="bg-bg-primary pt-32 pb-24 border-b border-border-subtle relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/5 blur-3xl rounded-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <AnimatedSection className="lg:col-span-7">
              <span className="text-gold uppercase tracking-widest text-[11px] font-bold block mb-4">
                {t("founder.hero.founderTitle")}
              </span>
              <h1 className="text-6xl md:text-[72px] font-serif italic text-text-primary mb-2 leading-tight">
                Ambrose Nzeyimana
              </h1>
              <h2 className="text-2xl md:text-[28px] font-serif italic text-text-secondary mb-6 leading-snug">
                {t("founder.hero.quote")}
              </h2>
              
              <div className="w-16 h-[3px] bg-gold mb-8" />
              
              <p className="text-text-secondary text-lg leading-relaxed mb-10 max-w-xl">
                {t("founder.hero.desc")}
              </p>

              <div className="flex flex-wrap gap-4 mb-10">
                <span className="flex items-center gap-2 px-4 py-2 bg-bg-card border border-border-subtle rounded-full text-xs font-bold uppercase tracking-widest text-text-primary">
                  <MapPin className="w-4 h-4 text-gold" /> {t("founder.hero.location")}
                </span>
                <span className="flex items-center gap-2 px-4 py-2 bg-bg-card border border-border-subtle rounded-full text-xs font-bold uppercase tracking-widest text-text-primary">
                  <Globe className="w-4 h-4 text-gold" /> {t("founder.hero.scope")}
                </span>
              </div>

              <a href="http://www.linkedin.com/in/ubuntu-business-builders-113223363/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-gold hover:text-gold-light text-sm font-bold uppercase tracking-widest transition-colors">
                <Linkedin className="w-4 h-4" /> {t("founder.hero.linkedin")} <ArrowRight className="w-4 h-4 ml-1" />
              </a>
            </AnimatedSection>
            
            <AnimatedSection delay={0.2} className="lg:col-span-5 h-full">
              <div className="relative rounded-2xl overflow-hidden aspect-[3/4] border border-border-subtle h-full shadow-[0_0_40px_rgba(184,115,51,0.1)]">
                <img 
                  src="https://d1yei2z3i6k35z.cloudfront.net/10694324/69f9d5444cd729.29932403_ambroseimage.jpeg" 
                  alt="Ambrose Nzeyimana" 
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-bg-primary to-transparent" />
              </div>
            </AnimatedSection>
            
          </div>
        </div>
      </section>

      {/* â”€â”€ SECTION 2 â€” BANDE DE CHIFFRES CLÃ‰S â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section className="py-12 border-b border-border-subtle bg-bg-secondary">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 md:divide-x divide-border-subtle">
            <div className="flex flex-col items-center text-center px-4">
              <span className="font-serif text-3xl md:text-4xl text-gold mb-2 italic">{t("founder.stats.val1")}</span>
              <span className="font-sans text-[11px] uppercase tracking-wide text-text-muted">{t("founder.stats.lbl1")}</span>
            </div>
            <div className="flex flex-col items-center text-center px-4">
              <span className="font-serif text-3xl md:text-4xl text-gold mb-2 italic">{t("founder.stats.val2")}</span>
              <span className="font-sans text-[11px] uppercase tracking-wide text-text-muted">{t("founder.stats.lbl2")}</span>
            </div>
            <div className="flex flex-col items-center text-center px-4">
              <span className="font-serif text-3xl md:text-4xl text-gold mb-2 italic">{t("founder.stats.val3")}</span>
              <span className="font-sans text-[11px] uppercase tracking-wide text-text-muted">{t("founder.stats.lbl3")}</span>
            </div>
            <div className="flex flex-col items-center text-center px-4">
              <span className="font-serif text-3xl md:text-4xl text-gold mb-2 italic">{t("founder.stats.val4")}</span>
              <span className="font-sans text-[11px] uppercase tracking-wide text-text-muted">{t("founder.stats.lbl4")}</span>
            </div>
          </div>
        </div>
      </section>

      {/* â”€â”€ SECTION 3 â€” EXPERTISE â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section className="py-24 bg-bg-primary">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif text-text-primary mb-6">{t("founder.expertise.title")}</h2>
            <GoldDivider className="mx-auto" />
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <AnimatedSection delay={0.1}>
              <div className="bg-bg-card border border-border-subtle p-8 rounded-2xl h-full hover:border-gold/30 transition-colors">
                <Target className="w-10 h-10 text-gold mb-6" />
                <h3 className="text-2xl font-serif text-text-primary mb-4">{t("founder.expertise.card1Title")}</h3>
                <p className="text-text-secondary leading-relaxed text-sm">
                  {t("founder.expertise.card1Desc")}
                </p>
              </div>
            </AnimatedSection>
            
            <AnimatedSection delay={0.2}>
              <div className="bg-bg-card border border-border-subtle p-8 rounded-2xl h-full hover:border-gold/30 transition-colors">
                <Wrench className="w-10 h-10 text-gold mb-6" />
                <h3 className="text-2xl font-serif text-text-primary mb-4">{t("founder.expertise.card2Title")}</h3>
                <p className="text-text-secondary leading-relaxed text-sm">
                  {t("founder.expertise.card2Desc")}
                </p>
              </div>
            </AnimatedSection>
            
            <AnimatedSection delay={0.3}>
              <div className="bg-bg-card border border-border-subtle p-8 rounded-2xl h-full hover:border-gold/30 transition-colors">
                <TrendingUp className="w-10 h-10 text-gold mb-6" />
                <h3 className="text-2xl font-serif text-text-primary mb-4">{t("founder.expertise.card3Title")}</h3>
                <p className="text-text-secondary leading-relaxed text-sm">
                  {t("founder.expertise.card3Desc")}
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* â”€â”€ SECTION 4 â€” PARCOURS (TIMELINE) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section className="py-24 bg-bg-secondary border-t border-border-subtle relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6">
          <AnimatedSection className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-serif text-text-primary mb-4">{t("founder.timeline.title")}</h2>
            <p className="text-xl font-serif italic text-gold">{t("founder.timeline.subtitle")}</p>
          </AnimatedSection>

          <div className="relative border-l border-gold/30 ml-4 md:ml-8 space-y-16 pb-8">
            
            {/* Item 1 */}
            <AnimatedSection className="relative pl-8 md:pl-12">
              <div className="absolute top-0 -left-1.5 w-3 h-3 bg-gold rounded-full shadow-[0_0_10px_#B87333]" />
              <div className="text-gold text-sm font-bold uppercase tracking-widest mb-2">{t("founder.timeline.item1Tag")}</div>
              <h3 className="text-2xl font-serif text-text-primary mb-4">{t("founder.timeline.item1Title")}</h3>
              <p className="text-text-secondary leading-relaxed mb-4">
                {t("founder.timeline.item1Desc")}
              </p>
            </AnimatedSection>

            {/* Item 2 */}
            <AnimatedSection className="relative pl-8 md:pl-12">
              <div className="absolute top-0 -left-1.5 w-3 h-3 bg-gold rounded-full shadow-[0_0_10px_#B87333]" />
              <div className="text-gold text-sm font-bold uppercase tracking-widest mb-2">{t("founder.timeline.item2Tag")}</div>
              <h3 className="text-2xl font-serif text-text-primary mb-4">{t("founder.timeline.item2Title")}</h3>
              <p className="text-text-secondary leading-relaxed mb-4">
                {t("founder.timeline.item2Desc")}
              </p>
            </AnimatedSection>

            {/* Item 3 */}
            <AnimatedSection className="relative pl-8 md:pl-12">
              <div className="absolute top-0 -left-1.5 w-3 h-3 bg-gold rounded-full shadow-[0_0_10px_#B87333]" />
              <div className="text-gold text-sm font-bold uppercase tracking-widest mb-2">{t("founder.timeline.item3Tag")}</div>
              <h3 className="text-2xl font-serif text-text-primary mb-4">{t("founder.timeline.item3Title")}</h3>
              <p className="text-text-secondary leading-relaxed">
                {t("founder.timeline.item3Desc")}
              </p>
            </AnimatedSection>

            {/* Item 4 */}
            <AnimatedSection className="relative pl-8 md:pl-12">
              <div className="absolute top-0 -left-1.5 w-3 h-3 bg-gold rounded-full shadow-[0_0_10px_#B87333]" />
              <div className="text-gold text-sm font-bold uppercase tracking-widest mb-2">{t("founder.timeline.item4Tag")}</div>
              <h3 className="text-2xl font-serif text-text-primary mb-4">{t("founder.timeline.item4Title")}</h3>
              <p className="text-text-secondary leading-relaxed">
                {t("founder.timeline.item4Desc")}
              </p>
            </AnimatedSection>

          </div>
        </div>
      </section>

      {/* â”€â”€ SECTION 5 â€” PHILOSOPHIE UBUNTU â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section className="py-32 bg-bg-primary text-center">
        <div className="max-w-3xl mx-auto px-6">
          <AnimatedSection>
            <h2 className="text-4xl md:text-[36px] font-serif italic text-gold mb-10 leading-relaxed">
              {t("founder.philosophy.title")}
            </h2>
            <p className="text-text-secondary text-lg leading-relaxed mb-16">
              {t("founder.philosophy.desc")}
            </p>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-video max-w-2xl mx-auto border border-border-subtle">
              <img 
                src="https://d1yei2z3i6k35z.cloudfront.net/10694324/692106ab93242_WhatsAppImage2025-11-20at15.08.28.jpeg" 
                alt="Ubuntu Philosophy" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gold/10 mix-blend-overlay" />
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* â”€â”€ SECTION 6 â€” MESSAGE DU CEO (Ã‰TUDE DE CAS) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section className="py-24 bg-bg-secondary border-t border-border-subtle relative">
        <div className="max-w-4xl mx-auto px-6">
          <AnimatedSection>
            <div className="flex justify-center mb-10">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-gold/10 text-gold border border-gold/30 text-xs font-bold uppercase tracking-widest rounded-full">
                {t("founder.essay.tag")}
              </span>
            </div>
            
            <h3 className="text-3xl md:text-4xl font-serif text-text-primary mb-8 leading-tight italic text-center">
              {t("founder.essay.title")}
            </h3>
            
            <GoldDivider className="mx-auto mb-12" />
            
            <div className="space-y-6 text-text-secondary leading-relaxed font-light text-lg">
              <p className="italic text-text-primary">
                {t("founder.essay.p1")}
              </p>

              <h4 className="text-gold font-serif text-xl italic pt-4">{t("founder.essay.h1")}</h4>
              <p>
                {t("founder.essay.p2")}
              </p>

              <h4 className="text-gold font-serif text-xl italic pt-4">{t("founder.essay.h2")}</h4>
              <p>
                {t("founder.essay.p3")}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                <div className="p-6 border border-gold/20 bg-gold/5 rounded-xl">
                  <h4 className="text-gold font-serif text-lg italic mb-2">{t("founder.essay.resultTitle")}</h4>
                  <p className="text-sm">{t("founder.essay.resultText")}</p>
                </div>
                <div className="p-6 border border-gold/20 bg-gold/5 rounded-xl">
                  <h4 className="text-gold font-serif text-lg italic mb-2">{t("founder.essay.modelTitle")}</h4>
                  <p className="text-sm">{t("founder.essay.modelText")}</p>
                </div>
              </div>

              <h4 className="text-gold font-serif text-xl italic pt-4">{t("founder.essay.h3")}</h4>
              <p>
                {t("founder.essay.p4")}
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-24 bg-bg-secondary border-t border-border-subtle text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/10 blur-[100px] rounded-full pointer-events-none" />
        
        <div className="max-w-3xl mx-auto px-6 relative z-10">
          <AnimatedSection>
            <h2 className="text-4xl md:text-5xl font-serif text-text-primary mb-6">
              {t("founder.cta.title")}
            </h2>
            <p className="text-text-secondary text-lg mb-10">
              {t("founder.cta.desc")}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a 
                href="https://www.checkmyenterprise.com/pricing" 
                target="_blank" 
                rel="noreferrer" 
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-gold text-bg-primary font-bold uppercase tracking-widest text-sm rounded-full hover:bg-gold-light transition-all hover:scale-105"
              >
                {t("founder.cta.ctaPrimary")} <ArrowRight className="w-4 h-4" />
              </a>
              <Link 
                to="/team" 
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 border border-border-subtle text-text-secondary hover:border-gold hover:text-gold font-bold uppercase tracking-widest text-sm rounded-full transition-all"
              >
                {t("founder.cta.ctaSecondary")}
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}

