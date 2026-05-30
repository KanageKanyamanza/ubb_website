// src/pages/Jobs.tsx
import { motion } from "motion/react";
import { ArrowRight, Briefcase, Globe, Award, ChevronRight, ExternalLink } from "lucide-react";
import AnimatedSection from "../components/ui/AnimatedSection";
import GoldDivider from "../components/ui/GoldDivider";
import { useSEO } from "../hooks/useSEO";
import { useLanguage } from "../context/LanguageContext";
import { RefreshCw } from "lucide-react";

export default function Jobs() {
  const { t } = useLanguage();

  useSEO({
    title: t("jobs.seoTitle"),
    description: t("jobs.seoDesc"),
    keywords: "partenaire local ubb, carrieres ubb, recrutement afrique, developpement commercial, dakar jobs, cote d'ivoire jobs",
    ogImage: "https://d1yei2z3i6k35z.cloudfront.net/10694324/692da5faacfcd_41809.jpg"
  });

  return (
    <div className="flex flex-col w-full bg-bg-primary overflow-hidden">
      
      {/* â”€â”€ Hero Section â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section className="relative pt-48 pb-32 overflow-hidden border-b border-border-subtle min-h-[70vh] flex items-center">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center grayscale-[30%] scale-105"
          style={{ backgroundImage: "url('https://d1yei2z3i6k35z.cloudfront.net/10694324/692da5faacfcd_41809.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-bg-primary/95 via-bg-primary/80 to-bg-primary" />
        
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-gold/10 blur-[140px] rounded-full -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        
        {/* Animated Grain Overlay */}
        <div
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />

        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
          <AnimatedSection className="text-center">
            <span className="text-gold text-[11px] uppercase tracking-[0.5em] font-bold block mb-8">{t("jobs.hero.tag")}</span>
            <h1 className="text-6xl md:text-8xl font-serif text-text-primary mb-10 italic leading-[1.1]">
              {t("jobs.hero.titleLine1")} <br />
              <span className="text-gold-gradient not-italic">{t("jobs.hero.titleLine2")}</span>
            </h1>
            <p className="text-text-secondary text-xl md:text-2xl font-serif italic max-w-3xl mx-auto mb-12 leading-relaxed">
              {t("jobs.hero.desc")}
            </p>
            <div className="flex justify-center">
              <GoldDivider />
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* â”€â”€ Main Proposition â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <AnimatedSection>
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-gold/5 border border-gold/20 rounded-full mb-8">
                <Globe className="w-4 h-4 text-gold" />
                <span className="text-[10px] uppercase tracking-widest text-gold font-bold">{t("jobs.proposition.tag")}</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-serif italic text-text-primary mb-8 leading-tight">
                {t("jobs.proposition.title")}
              </h2>
              
              <div className="space-y-6 text-text-secondary text-lg leading-relaxed font-light mb-12">
                <p>
                  {t("jobs.proposition.p1")}
                </p>
                <p>
                  {t("jobs.proposition.p2")}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-6">
                <a
                  href="/postuler"
                  className="px-10 py-5 bg-gold-gradient text-bg-primary font-bold uppercase tracking-widest text-xs hover:shadow-[0_0_25px_rgba(184,115,51,0.4)] transition-all flex items-center justify-center gap-3 rounded-sm group"
                >
                  {t("jobs.proposition.ctaPrimary")}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  href="/postuler"
                  className="px-10 py-5 bg-bg-primary border border-gold/40 text-gold font-bold uppercase tracking-widest text-xs hover:bg-gold/10 hover:border-gold transition-all flex items-center justify-center gap-3 rounded-sm"
                >
                  {t("jobs.proposition.ctaSecondary")}
                  <ChevronRight className="w-4 h-4" />
                </a>
              </div>
            </AnimatedSection>
            
            <AnimatedSection delay={0.2}>
              <div className="relative group">
                {/* Decorative Frame */}
                <div className="absolute -inset-4 border border-gold/10 group-hover:border-gold/20 transition-all duration-700 pointer-events-none" />
                <div className="absolute top-0 right-0 w-24 h-24 border-t-2 border-r-2 border-gold/40 -translate-y-2 translate-x-2 z-20 pointer-events-none" />
                
                <div className="relative overflow-hidden rounded-sm shadow-2xl z-10 aspect-[4/5] lg:aspect-auto">
                  <img 
                    src="https://d1yei2z3i6k35z.cloudfront.net/10694324/692dd47212f80_1202.jpg" 
                    alt="OpportunitÃ© UBB" 
                    className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                  />
                  {/* Subtle Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/80 via-transparent to-transparent opacity-60" />
                  
                  <div className="absolute bottom-8 left-8 right-8 p-6 bg-bg-card/40 backdrop-blur-md border border-white/10 rounded-sm">
                    <p className="text-white font-serif italic text-lg">{t("jobs.proposition.quote")}</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* â”€â”€ Key Benefits â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section className="py-32 bg-bg-secondary relative overflow-hidden">
        {/* Geometric Background */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
          style={{ backgroundImage: "radial-gradient(circle, #B87333 1px, transparent 1px)", backgroundSize: "60px 60px" }}
        />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-serif italic text-text-primary mb-6">{t("jobs.benefits.title")}</h2>
            <GoldDivider className="mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                icon: <Briefcase className="w-8 h-8 text-gold" />,
                title: t("jobs.benefits.card1Title"),
                desc: t("jobs.benefits.card1Desc")
              },
              {
                icon: <Award className="w-8 h-8 text-gold" />,
                title: t("jobs.benefits.card2Title"),
                desc: t("jobs.benefits.card2Desc")
              },
              {
                icon: <RefreshCw className="w-8 h-8 text-gold" />,
                title: t("jobs.benefits.card3Title"),
                desc: t("jobs.benefits.card3Desc")
              }
            ].map((benefit, idx) => (
              <AnimatedSection key={idx} delay={idx * 0.1}>
                <div className="p-10 bg-bg-card border border-border-subtle rounded-sm hover:border-gold/30 transition-all group h-full">
                  <div className="mb-8 p-4 bg-bg-primary border border-border-subtle inline-block group-hover:border-gold/50 transition-colors">
                    {benefit.icon}
                  </div>
                  <h3 className="text-2xl font-serif italic text-text-primary mb-4">{benefit.title}</h3>
                  <p className="text-text-secondary leading-relaxed">{benefit.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* â”€â”€ Compensation Section â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section className="py-32 bg-bg-primary relative">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <AnimatedSection>
            <h3 className="text-4xl md:text-5xl font-serif italic text-gold mb-8 italic">{t("jobs.compensation.title")}</h3>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto mb-16">
              {t("jobs.compensation.desc")}
            </p>
            
            <div className="relative group rounded-sm overflow-hidden border border-border-subtle shadow-[0_30px_100px_rgba(0,0,0,0.5)]">
              <div className="absolute inset-0 bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none" />
              <img 
                src="https://d1yei2z3i6k35z.cloudfront.net/10694324/692f0c65e74dd_1831.jpg" 
                alt="ModÃ¨le de RÃ©munÃ©ration UBB" 
                className="w-full h-auto transition-transform duration-1000 group-hover:scale-105" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/60 via-transparent to-transparent" />
              
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 w-full px-8">
                <a 
                  href="/postuler" 
                  className="inline-flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-bold uppercase tracking-widest hover:bg-white/20 transition-all"
                >
                  {t("jobs.compensation.cta")}
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* â”€â”€ Final Call to Action â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section className="py-32 border-t border-border-subtle relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gold/5 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <AnimatedSection>
            <h2 className="text-4xl md:text-6xl font-serif italic text-text-primary mb-8">{t("jobs.cta.title")}</h2>
            <p className="text-text-secondary text-lg mb-12">
              {t("jobs.cta.desc")}
            </p>
            <a
              href="/postuler"
              className="inline-flex items-center gap-4 px-12 py-6 bg-gold-gradient text-bg-primary font-bold uppercase tracking-widest text-sm hover:shadow-[0_0_30px_rgba(184,115,51,0.5)] transition-all rounded-sm group"
            >
              {t("jobs.cta.cta")}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </a>
          </AnimatedSection>
        </div>
      </section>

    </div>
  );
}



