import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AnimatedSection from "../components/ui/AnimatedSection";
import GoldDivider from "../components/ui/GoldDivider";
import { Lock, ArrowRight, CheckCircle, Database, TrendingUp, Briefcase, Activity, BookOpen } from "lucide-react";
import { useSEO } from "../hooks/useSEO";
import { useLanguage } from "../context/LanguageContext";

export default function Home() {
  const { t, language } = useLanguage();

  useSEO({
    title: t("home.seoTitle"),
    description: t("home.seoDesc"),
    keywords: "croissance entreprise, afrique francophone, vitalcheck, harvests, conseil strategique, structuration d'affaires, ubuntu business, developpement commercial",
    ogImage: "/images/imagereal2.jpeg"
  });

  const triggerChat = (e: React.MouseEvent) => {
    e.preventDefault();
    window.dispatchEvent(new CustomEvent('ubb-trigger-chat'));
  };

  return (
    <div className="flex flex-col w-full min-h-screen">

      {/* ── SECTION 1 — HERO (Slider) ─────────────────────────────────── */}
      <HeroSlider />

      {/* ── SECTION 2 — BANDE DE RÉASSURANCE ────────────────────────── */}
      <section id="stats" className="py-12 border-y border-border-subtle" style={{ backgroundColor: "#131313" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 md:divide-x divide-border-subtle">
            <div className="flex flex-col items-center text-center px-4">
              <span className="font-serif text-4xl md:text-5xl text-gold mb-2">+30%</span>
              <span className="font-sans text-[12px] uppercase tracking-wide text-text-muted">{t("home.stats.salesGrowth")}</span>
            </div>
            <div className="flex flex-col items-center text-center px-4">
              <span className="font-serif text-4xl md:text-5xl text-gold mb-2">{language === "fr" ? "2 Piliers" : "2 Pillars"}</span>
              <span className="font-sans text-[12px] uppercase tracking-wide text-text-muted">{t("home.stats.pillars")}</span>
            </div>
            <div className="flex flex-col items-center text-center px-4">
              <span className="font-serif text-4xl md:text-5xl text-gold mb-2">2 SaaS</span>
              <span className="font-sans text-[12px] uppercase tracking-wide text-text-muted">{t("home.stats.saas")}</span>
            </div>
            <div className="flex flex-col items-center text-center px-4">
              <span className="font-serif text-4xl md:text-5xl text-gold mb-2">Ubuntu</span>
              <span className="font-sans text-[12px] uppercase tracking-wide text-text-muted">{t("home.stats.philosophy")}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 3 — PROBLÈME CLIENT ───────────────────────────── */}
      <section id="probleme" className="py-24 md:py-32 bg-bg-primary relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-serif italic text-text-primary mb-6">
              {t("home.problem.title")}
            </h2>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto">
              {t("home.problem.subtitle")}
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {[
              {
                image: "/images/agriculteurs-en-afrique.jpg",
                title: t("home.problem.card1Title"),
                text: t("home.problem.card1Text")
              },
              {
                image: "/images/Reunion-Afrique-numerique.jpg",
                title: t("home.problem.card2Title"),
                text: t("home.problem.card2Text")
              },
              {
                image: "/images/vitrine.png",
                title: t("home.problem.card3Title"),
                text: t("home.problem.card3Text")
              }
            ].map((prob, idx) => (
              <AnimatedSection key={idx} delay={idx * 0.15} className="h-full">
                <div className="bg-bg-card border border-border-subtle rounded-2xl overflow-hidden text-center h-full hover:border-gold/30 transition-all duration-300 hover:shadow-[0_8px_40px_rgba(201,151,58,0.1)] flex flex-col group">
                  <div className="relative h-48 overflow-hidden w-full">
                    <img 
                      src={prob.image} 
                      alt={prob.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-bg-card via-transparent to-transparent" />
                  </div>
                  <div className="p-8 flex-grow flex flex-col items-center">
                    <h3 className="text-2xl font-serif text-gold mb-4">{prob.title}</h3>
                    <p className="text-text-secondary leading-relaxed text-sm">
                      {prob.text}
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection className="text-center">
            <GoldDivider className="mx-auto mb-6" />
            <p className="text-xl font-serif italic text-gold">
              {t("home.problem.dividerText")}
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ── SECTION 4 — SOLUTION UBB ──────────────────────────────── */}
      <section id="solution" className="py-24 md:py-32 bg-bg-secondary relative">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-gold/5 blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <AnimatedSection className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-serif text-text-primary mb-6">
              {t("home.solution.title")}
            </h2>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto">
              {t("home.solution.subtitle")}
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:items-center">
            {/* Card 1 */}
            <AnimatedSection delay={0.1}>
              <div className="bg-bg-card border border-border-subtle p-8 rounded-2xl relative hover:border-gold/40 transition-all">
                <span className="absolute top-6 right-6 text-4xl font-serif text-border-subtle opacity-50">01</span>
                <Briefcase className="w-10 h-10 text-gold mb-6" />
                <h3 className="text-2xl font-serif text-text-primary mb-4">{t("home.solution.card1Title")}</h3>
                <p className="text-text-secondary text-sm leading-relaxed mb-8">
                  {t("home.solution.card1Text")}
                </p>
                <Link to="/team" className="text-gold text-sm font-bold uppercase tracking-widest hover:text-gold-light inline-flex items-center">
                  {t("common.readMore")} <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </AnimatedSection>

            {/* Card 2 (Bigger) */}
            <AnimatedSection delay={0.2}>
              <div className="bg-bg-primary border border-gold p-10 rounded-2xl relative shadow-[0_0_40px_rgba(201,151,58,0.15)] transform lg:scale-105 z-10">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold text-bg-primary px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest whitespace-nowrap">
                  {t("common.recommended")}
                </div>
                <span className="absolute top-6 right-6 text-4xl font-serif text-gold/20">02</span>
                <Activity className="w-10 h-10 text-gold mb-6" />
                <h3 className="text-2xl font-serif text-text-primary mb-4">{t("home.solution.card2Title")}</h3>
                <p className="text-text-secondary text-sm leading-relaxed mb-8">
                  {t("home.solution.card2Text")}
                </p>
                <div className="flex flex-col gap-3">
                  <a href="https://www.checkmyenterprise.com/pricing" target="_blank" rel="noreferrer" className="w-full text-center px-4 py-3 bg-gold/10 border border-gold text-gold text-xs font-bold uppercase tracking-widest rounded-lg hover:bg-gold hover:text-bg-primary transition-all">
                    vitalCHECK <ArrowRight className="inline w-3 h-3 ml-1" />
                  </a>
                  <a href="https://harvests.site/pricing/" target="_blank" rel="noreferrer" className="w-full text-center px-4 py-3 bg-transparent border border-border-subtle text-text-secondary text-xs font-bold uppercase tracking-widest rounded-lg hover:border-gold hover:text-gold transition-all">
                    HARVESTS <ArrowRight className="inline w-3 h-3 ml-1" />
                  </a>
                </div>
              </div>
            </AnimatedSection>

            {/* Card 3 */}
            <AnimatedSection delay={0.3}>
              <div className="bg-bg-card border border-border-subtle p-8 rounded-2xl relative hover:border-gold/40 transition-all">
                <span className="absolute top-6 right-6 text-4xl font-serif text-border-subtle opacity-50">03</span>
                <BookOpen className="w-10 h-10 text-gold mb-6" />
                <h3 className="text-2xl font-serif text-text-primary mb-4">{t("home.solution.card3Title")}</h3>
                <p className="text-text-secondary text-sm leading-relaxed mb-8">
                  {t("home.solution.card3Text")}
                </p>
                <Link to="/ebooks" className="text-gold text-sm font-bold uppercase tracking-widest hover:text-gold-light inline-flex items-center">
                  {t("home.solution.card3Cta")} <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── SECTION 5 — PRODUIT VEDETTE 1 : vitalCHECK ────────────── */}
      <section id="vitalcheck" className="py-24 md:py-32 bg-bg-primary">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection>
              <div className="relative rounded-2xl overflow-hidden border border-border-subtle aspect-[4/3] shadow-2xl group">
                <img 
                  src="/images/imagereal1.jpeg" 
                  alt="vitalCHECK Diagnostic" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gold/10 mix-blend-overlay" />
              </div>
            </AnimatedSection>
            
            <AnimatedSection delay={0.2}>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold/40 bg-gold/10 text-gold text-xs font-bold uppercase tracking-widest mb-6">
                {t("home.vitalcheck.tag")}
              </span>
              <h2 className="text-4xl md:text-5xl font-serif italic text-text-primary mb-6 leading-tight">
                {t("home.vitalcheck.titleLine1")} <br className="hidden md:block"/>
                <span className="not-italic text-gold">{t("home.vitalcheck.titleLine2")}</span>
              </h2>
              <p className="text-text-secondary text-lg leading-relaxed mb-8">
                {t("home.vitalcheck.desc")}
              </p>
              
              <ul className="space-y-4 mb-10">
                {[
                  t("home.vitalcheck.bullet1"),
                  t("home.vitalcheck.bullet2"),
                  t("home.vitalcheck.bullet3")
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-text-secondary">
                    <CheckCircle className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              
              <a href="https://www.checkmyenterprise.com/pricing" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-8 py-4 bg-gold text-bg-primary font-bold uppercase tracking-widest text-sm rounded-full hover:bg-gold-light transition-all hover:scale-105 shadow-[0_4px_20px_rgba(201,151,58,0.3)]">
                {t("home.vitalcheck.cta")} <ArrowRight className="w-4 h-4" />
              </a>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── SECTION 6 — PRODUIT VEDETTE 2 : HARVESTS 2.0 ──────────── */}
      <section id="harvests" className="py-24 md:py-32 bg-bg-secondary border-t border-border-subtle">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            <AnimatedSection className="order-2 lg:order-1">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold/40 bg-gold/10 text-gold text-xs font-bold uppercase tracking-widest mb-6">
                {t("home.harvests.tag")}
              </span>
              <h2 className="text-4xl md:text-5xl font-serif italic text-text-primary mb-6 leading-tight">
                {t("home.harvests.titleLine1")} <br className="hidden md:block"/>
                <span className="not-italic text-gold">{t("home.harvests.titleLine2")}</span>
              </h2>
              <p className="text-text-secondary text-lg leading-relaxed mb-8">
                {t("home.harvests.desc")}
              </p>
              
              <ul className="space-y-4 mb-10">
                {[
                  t("home.harvests.bullet1"),
                  t("home.harvests.bullet2"),
                  t("home.harvests.bullet3")
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-text-secondary">
                    <CheckCircle className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              
              <a href="https://harvests.site/pricing/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-8 py-4 bg-gold text-bg-primary font-bold uppercase tracking-widest text-sm rounded-full hover:bg-gold-light transition-all hover:scale-105 shadow-[0_4px_20px_rgba(201,151,58,0.3)]">
                {t("home.harvests.cta")} <ArrowRight className="w-4 h-4" />
              </a>
            </AnimatedSection>

            <AnimatedSection delay={0.2} className="order-1 lg:order-2">
              <div className="relative rounded-2xl overflow-hidden border border-border-subtle aspect-[4/3] shadow-2xl group">
                <img 
                  src="/images/imagereal3.jpeg" 
                  alt="HARVESTS 2.0 Logiciel" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gold/10 mix-blend-overlay" />
              </div>
            </AnimatedSection>
            
          </div>
        </div>
      </section>

      {/* ── SECTION 7 — ÉTUDE DE CAS CEO ──────────────────────────── */}
      <section id="etude-de-cas" className="py-24 md:py-32 bg-bg-primary border-y border-border-subtle relative overflow-hidden">
        <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-gold/5 blur-3xl pointer-events-none" />
        
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <AnimatedSection className="mb-12">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold/30 bg-gold/5 text-gold text-[10px] font-bold uppercase tracking-[0.2em] mb-6">
              {t("home.caseStudy.tag")}
            </span>
            <h2 className="text-5xl md:text-7xl font-serif text-text-primary leading-[1.1] mb-12">
              {t("home.caseStudy.titleLine1")} <br/>
              <span className="italic text-gold">{t("home.caseStudy.titleLine2")}</span>
            </h2>

            {/* Results Table */}
            <div className="grid grid-cols-3 divide-x divide-gold/30 border border-gold/30 rounded-xl bg-gold/5 mb-16 max-w-3xl">
              <div className="p-6 text-center">
                <div className="text-3xl font-serif text-gold mb-1">15j</div>
                <div className="text-xs uppercase tracking-wider text-text-muted">
                  {t("home.caseStudy.metric1Title")}
                </div>
              </div>
              <div className="p-6 text-center">
                <div className="text-3xl font-serif text-gold mb-1">90j</div>
                <div className="text-xs uppercase tracking-wider text-text-muted">
                  {t("home.caseStudy.metric2Title")}
                </div>
              </div>
              <div className="p-6 text-center">
                <div className="text-3xl font-serif text-gold mb-1">11 ans</div>
                <div className="text-xs uppercase tracking-wider text-text-muted">
                  {t("home.caseStudy.metric3Title")}
                </div>
              </div>
            </div>
          </AnimatedSection>

          <div className="max-w-4xl mx-auto">
            <AnimatedSection delay={0.2}>
              <div className="bg-bg-secondary border border-gold/20 p-8 md:p-12 rounded-2xl shadow-xl mb-12 relative overflow-hidden group">
                <div className="absolute -top-12 -right-12 w-24 h-24 bg-gold/5 rounded-full blur-2xl" />
                <span className="text-4xl text-gold/20 font-serif absolute top-6 left-6">“</span>
                <p className="text-text-primary text-xl md:text-2xl font-serif italic leading-relaxed mb-8 pl-6 relative z-10">
                  {t("home.caseStudy.quote")}
                </p>
                <div className="flex items-center justify-between border-t border-border-subtle/50 pt-6">
                  <div>
                    <h4 className="font-serif text-lg text-gold font-bold">{t("home.caseStudy.quoteAuthor")}</h4>
                    <p className="text-text-muted text-xs uppercase tracking-widest font-bold">{t("home.caseStudy.quoteRole")}</p>
                  </div>
                  <Link to="/founder" className="text-gold hover:text-gold-light text-xs font-bold uppercase tracking-widest inline-flex items-center gap-1.5 transition-all hover:translate-x-1">
                    {t("home.caseStudy.quoteCta")} <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <div className="bg-bg-card border border-border-subtle p-6 rounded-xl">
                  <h4 className="text-gold font-serif text-lg italic mb-2">{t("home.caseStudy.detail1Title")}</h4>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    {t("home.caseStudy.detail1Text")}
                  </p>
                </div>
                <div className="bg-bg-card border border-border-subtle p-6 rounded-xl">
                  <h4 className="text-gold font-serif text-lg italic mb-2">{t("home.caseStudy.detail2Title")}</h4>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    {t("home.caseStudy.detail2Text")}
                  </p>
                </div>
              </div>

              <div className="bg-bg-card border border-border-subtle p-8 rounded-xl text-center">
                <p className="text-lg font-serif italic text-text-primary mb-6">
                  {t("home.caseStudy.ctaTitle")}
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <a href="/contact" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gold text-bg-primary font-bold uppercase tracking-widest text-sm rounded-full hover:bg-gold-light transition-all hover:scale-105">
                    {t("home.caseStudy.ctaPrimary")} <ArrowRight className="w-4 h-4" />
                  </a>
                  <Link to="/founder" className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-border-subtle text-text-secondary font-bold uppercase tracking-widest text-sm rounded-full hover:text-gold hover:border-gold transition-all">
                    {t("home.caseStudy.ctaSecondary")}
                  </Link>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── SECTION 8 — ÉCOSYSTÈME UBB ────────────────────────────── */}
      <section id="ecosysteme" className="py-24 bg-bg-secondary text-center">
        <div className="max-w-4xl mx-auto px-6">
          <AnimatedSection>
            <h2 className="text-4xl md:text-5xl font-serif text-text-primary mb-6">{t("home.ecosystem.title")}</h2>
            <p className="text-text-secondary text-lg mb-16">
              {t("home.ecosystem.subtitle")}
            </p>
            
            {/* Visual Ecosystem Graphic */}
            <div className="relative w-full max-w-lg mx-auto aspect-square mb-16 flex items-center justify-center">
              {/* Lines linking center to outer bubbles */}
              <svg className="absolute inset-0 w-full h-full text-gold/30" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
                <line x1="50" y1="50" x2="50" y2="15" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" />
                <line x1="50" y1="50" x2="20" y2="75" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" />
                <line x1="50" y1="50" x2="80" y2="75" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" />
              </svg>
              
              {/* Center */}
              <div className="absolute z-10 w-24 h-24 bg-bg-primary border-2 border-gold rounded-full flex flex-col items-center justify-center shadow-[0_0_30px_rgba(201,151,58,0.2)]">
                <span className="font-serif font-bold text-2xl text-gold">UBB</span>
              </div>
              
              {/* Top Bubble - vitalCHECK */}
              <div className="absolute top-[5%] z-10 w-32 h-32 bg-bg-card border border-border-subtle rounded-full flex flex-col items-center justify-center shadow-lg">
                <Database className="w-5 h-5 text-gold/80 mb-2" />
                <span className="text-text-primary font-serif text-sm font-bold">vitalCHECK</span>
                <span className="text-text-muted text-[10px] uppercase tracking-wider">{t("home.ecosystem.bubble1")}</span>
              </div>
              
              {/* Bottom Left Bubble - Conseil */}
              <div className="absolute bottom-[10%] left-[5%] z-10 w-32 h-32 bg-bg-card border border-border-subtle rounded-full flex flex-col items-center justify-center shadow-lg">
                <Briefcase className="w-5 h-5 text-gold/80 mb-2" />
                <span className="text-text-primary font-serif text-sm font-bold">{language === "fr" ? "Conseil" : "Consulting"}</span>
                <span className="text-text-muted text-[10px] uppercase tracking-wider">{t("home.ecosystem.bubble2")}</span>
              </div>
              
              {/* Bottom Right Bubble - HARVESTS */}
              <div className="absolute bottom-[10%] right-[5%] z-10 w-32 h-32 bg-bg-card border border-border-subtle rounded-full flex flex-col items-center justify-center shadow-lg">
                <Activity className="w-5 h-5 text-gold/80 mb-2" />
                <span className="text-text-primary font-serif text-sm font-bold">HARVESTS</span>
                <span className="text-text-muted text-[10px] uppercase tracking-wider">{t("home.ecosystem.bubble3")}</span>
              </div>
            </div>

            <p className="text-text-secondary italic font-serif text-xl mb-10">
              {t("home.ecosystem.summary")}
            </p>
            
            <a href="https://www.checkmyenterprise.com/pricing" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-8 py-4 bg-gold text-bg-primary font-bold uppercase tracking-widest text-sm rounded-full hover:bg-gold-light transition-all hover:scale-105">
              {t("home.ecosystem.cta")} <ArrowRight className="w-4 h-4" />
            </a>
          </AnimatedSection>
        </div>
      </section>

      {/* ── SECTION 9 — APERÇU ÉQUIPE ─────────────────────────────── */}


      {/* ── SECTION 10 — RESSOURCES & BLOG ────────────────────────── */}
      <section id="ressources" className="py-24 bg-bg-secondary border-t border-border-subtle">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif text-text-primary">{t("home.resources.title")}</h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <AnimatedSection delay={0.1}>
              <div className="bg-bg-card border border-border-subtle rounded-2xl p-8 flex flex-col md:flex-row gap-6 items-center h-full hover:border-gold/30 transition-colors">
                <img src="https://d1yei2z3i6k35z.cloudfront.net/10694324/689972c2536ee_COV1.png" alt="E-books UBB" className="w-32 h-auto rounded shadow-lg" />
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-2xl font-serif text-text-primary mb-3">{t("home.resources.packTitle")}</h3>
                  <p className="text-text-secondary text-sm mb-4">
                    {t("home.resources.packDesc")}
                  </p>
                  <p className="text-gold font-bold mb-6">{language === "fr" ? "À partir de £20" : "From £20"}</p>
                  <Link to="/ebooks" className="inline-flex items-center gap-2 px-6 py-2.5 border border-gold text-gold font-bold uppercase tracking-wider text-xs rounded-full hover:bg-gold/10 transition-colors">
                    {t("home.resources.packCta")} <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="bg-gold/10 border border-gold/30 rounded-2xl p-8 flex flex-col justify-center h-full text-center relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-gold/20 rounded-full blur-2xl" />
                <span className="inline-block px-3 py-1 bg-gold text-bg-primary text-[10px] font-bold uppercase tracking-wider rounded-full self-center mb-4">{t("common.free")}</span>
                <h3 className="text-2xl font-serif text-gold mb-4">{t("home.resources.workbookTitle")}</h3>
                <p className="text-text-secondary italic font-serif text-xl mb-8 max-w-sm mx-auto">
                  {t("home.resources.workbookDesc")}
                </p>
                <a href="/workbook" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gold text-bg-primary font-bold uppercase tracking-wider text-xs rounded-full hover:bg-gold-light transition-all self-center">
                  {t("home.resources.workbookCta")} <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── SECTION 11 — CTA FINAL ────────────────────────────────── */}
      <section id="contact" className="py-32 relative overflow-hidden bg-[#0A0A0A] border-t border-border-subtle text-center">
        {/* Background Image overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-15 mix-blend-luminosity"
          style={{ backgroundImage: `url('/images/imagereal4.jpeg')` }}
        />
        {/* Radial Gold Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold/10 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="relative z-10 max-w-3xl mx-auto px-6">
          <AnimatedSection>
            <h2 className="text-5xl md:text-7xl font-serif text-text-primary mb-6">
              {t("home.finalCta.titleLine1")} <br/>
              <span className="italic">{t("home.finalCta.titleLine2")}</span>
            </h2>
            <p className="text-2xl font-serif italic text-gold mb-8">
              {t("home.finalCta.italicText")}
            </p>
            <p className="text-text-secondary text-lg leading-relaxed mb-12 max-w-xl mx-auto">
              {t("home.finalCta.desc")}
            </p>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-10">
              <a href="https://www.checkmyenterprise.com/pricing" target="_blank" rel="noreferrer" className="w-full sm:w-auto px-8 py-4 bg-gold text-bg-primary font-bold uppercase tracking-widest text-sm hover:bg-gold-light transition-all rounded-full shadow-[0_0_30px_rgba(201,151,58,0.3)]">
                {t("home.finalCta.ctaPrimary")} <ArrowRight className="inline w-4 h-4 ml-1" />
              </a>
              <a href="tel:+221771970713" className="w-full sm:w-auto px-8 py-4 border border-border-subtle text-text-secondary hover:text-gold hover:border-gold transition-all font-bold uppercase tracking-widest text-sm rounded-full">
                {t("home.finalCta.ctaSecondary")}
              </a>
            </div>

            <div className="flex items-center justify-center gap-2 text-text-muted text-sm font-medium">
              <Lock className="w-4 h-4 text-gold/60" />
              {t("home.finalCta.disclaimer")}
            </div>
          </AnimatedSection>
        </div>
      </section>

    </div>
  );
}

// ── HeroSlider ────────────────────────────────────────────────────────────────
const HERO_IMAGES = [
  "/images/imagereal2.jpeg",
  "/images/hero3.jpg",
];

const SLIDE_DURATION = 5000; // ms entre chaque image

function HeroSlider() {
  const { t } = useLanguage();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % HERO_IMAGES.length);
    }, SLIDE_DURATION);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="hero" className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden bg-bg-primary">

      {/* Sliding backgrounds */}
      {HERO_IMAGES.map((src, i) => (
        <AnimatePresence key={src}>
          {current === i && (
            <motion.div
              key={`slide-${i}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url('${src}')` }}
            />
          )}
        </AnimatePresence>
      ))}

      {/* Overlays */}
      <div className="absolute inset-0 bg-black/70 z-[1]" />
      <div className="absolute inset-0 gold-glow opacity-25 z-[2]" />

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6 mt-16">
        <AnimatedSection>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-5xl md:text-7xl lg:text-8xl font-serif font-light text-text-primary leading-[1.1] mb-6"
          >
            {t("home.hero.titleLine1")} <br />
            <span className="text-gold-gradient italic font-normal">{t("home.hero.titleLine2")}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-xl md:text-3xl italic font-serif text-white mb-8"
          >
            {t("home.hero.subtitle")}
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.65 }}
            className="max-w-2xl mx-auto text-text-secondary md:text-[15px] font-sans leading-relaxed mb-12"
          >
            {t("home.hero.desc")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <a
              href="/contact"
              className="px-8 py-4 bg-gold text-bg-primary font-bold uppercase tracking-widest text-sm hover:bg-gold-light transition-all rounded-full hover:scale-105 active:scale-95 hover:shadow-[0_0_30px_rgba(201,151,58,0.4)]"
            >
              {t("home.hero.ctaDiagnostic")} <ArrowRight className="inline w-4 h-4 ml-1" />
            </a>
            <a
              href="https://www.checkmyenterprise.com/pricing"
              target="_blank"
              rel="noreferrer"
              className="px-8 py-4 border border-gold text-gold font-bold uppercase tracking-widest text-sm hover:bg-gold/10 transition-all rounded-full hover:scale-105 active:scale-95"
            >
              {t("home.hero.ctaVitalCheck")}
            </a>
          </motion.div>
        </AnimatedSection>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {HERO_IMAGES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-[3px] rounded-full transition-all duration-500 ${
              current === i ? "w-8 bg-gold" : "w-3 bg-white/30 hover:bg-white/50"
            }`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
      >
        <span className="text-[9px] uppercase tracking-[0.3em] text-gold/60">{t("home.hero.discover")}</span>
        <div className="w-px h-5 bg-gradient-to-b from-gold/60 to-transparent" />
      </motion.div>
    </section>
  );
}

