import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { ArrowRight, CheckCircle, Database, Layout, TrendingUp } from "lucide-react";
import AnimatedSection from "../components/ui/AnimatedSection";
import GoldDivider from "../components/ui/GoldDivider";
import { Link } from "react-router-dom";

const heroImages = [
  "/images/hero-1.png",
  "/images/hero-2.png",
  "/images/hero-3.png"
];

export default function Home() {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col w-full">
      {/* ── Hero Section ─────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">

        {/* Background Slideshow (Sliding effect) */}
        <div className="absolute inset-0 z-0 overflow-hidden bg-bg-primary">
          {/* Fallback static background to avoid void during transitions */}
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-40"
            style={{ backgroundImage: `url(${heroImages[0]})` }}
          />

          <AnimatePresence initial={false}>
            {heroImages.length > 0 && (
              <motion.div
                key={currentImage}
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${heroImages[currentImage % heroImages.length]})` }}
              />
            )}
          </AnimatePresence>
        </div>

        {/* Multi-layer overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-bg-primary/80 via-bg-primary/60 to-bg-primary/95" />
        <div className="absolute inset-0 bg-gradient-to-r from-bg-primary/50 via-transparent to-bg-primary/50" />

        {/* Gold radial glow */}
        <div className="absolute inset-0 gold-glow opacity-50" />

        {/* Animated grain texture */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Decorative gold lines */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />


        {/* ── Hero Content ─────────────────────────── */}
        <div className="relative max-w-5xl mx-auto px-6 text-center pt-28 pb-20">



          {/* Main title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="text-5xl sm:text-7xl md:text-8xl font-serif font-bold leading-[1.08] mb-6"
          >
            <span className="text-text-primary">Ubuntu</span>
            <br />
            <span className="text-gold-gradient">Business Builders</span>
          </motion.h1>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mx-auto mb-8"
          >
            <GoldDivider className="mx-auto" />
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-xl md:text-2xl italic font-serif mb-6"
            style={{
              color: "#F0EDE8",
              textShadow: "0 0 30px rgba(201,151,58,0.4), 0 2px 8px rgba(0,0,0,0.8)",
            }}
          >
            Partenaire pour la croissance des PME Africaines
          </motion.p>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.65 }}
            className="max-w-2xl mx-auto text-text-secondary md:text-lg leading-relaxed mb-12"
          >
            Nous aidons les PME africaines à croître durablement grâce à des systèmes sur mesure,
            un leadership transformatif et la philosophie Ubuntu.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <a
              href="#nos-offres"
              className="group relative overflow-hidden px-8 py-4 font-bold uppercase tracking-widest text-sm text-bg-primary rounded-full transition-all duration-300 hover:shadow-[0_0_28px_rgba(201,151,58,0.5)] hover:scale-105 active:scale-95 flex items-center gap-2"
              style={{ background: "linear-gradient(135deg, #E8BC6A 0%, #C9973A 60%, #A87B28 100%)" }}
            >
              Découvrir nos services
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <Link
              to="/inscription"
              className="px-8 py-4 font-bold uppercase tracking-widest text-sm text-gold border border-gold/50 rounded-full hover:bg-gold/10 hover:border-gold transition-all duration-300 hover:scale-105 active:scale-95"
            >
              Rejoindre UBB
            </Link>
          </motion.div>
        </div>



        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-text-muted text-[9px] uppercase tracking-[0.35em]">Scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-gold/60 to-transparent" />
        </motion.div>
      </section>

      {/* ── Vision & Mission ─────────────────────────────────── */}
      <section className="py-28 bg-bg-secondary relative overflow-hidden">

        {/* Decorative background blur */}
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-gold/5 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-gold/4 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6">

          {/* Section label */}
          <AnimatedSection>
            <div className="flex items-center gap-4 mb-16">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent to-gold/30" />
              <span className="text-gold text-[11px] uppercase tracking-[0.35em] font-medium">Notre Identité</span>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent to-gold/30" />
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Image col */}
            <AnimatedSection>
              <div className="relative">
                {/* Gold frame offset */}
                <div className="absolute -top-4 -left-4 w-full h-full border border-gold/25 rounded-sm pointer-events-none z-0" />

                <div className="relative z-10 overflow-hidden rounded-sm border border-border-subtle group shadow-2xl">
                  <img
                    src="https://d1yei2z3i6k35z.cloudfront.net/10694324/692304542b118_photo2.jpg"
                    alt="Ubuntu Vision"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  {/* Gold overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/60 via-transparent to-transparent" />
                  <div className="absolute inset-0 bg-gold/8 mix-blend-overlay" />

                  {/* Corner badge */}
                  <div className="absolute bottom-5 left-5 px-4 py-2 backdrop-blur-sm rounded-sm border border-gold/30"
                    style={{ background: "rgba(13,13,13,0.75)" }}
                  >
                    <p className="text-gold text-xs uppercase tracking-widest font-medium">Ubuntu Business Builders</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* Text col */}
            <div className="flex flex-col gap-10">

              {/* Vision card */}
              <AnimatedSection delay={0.2}>
                <div className="relative pl-6 border-l-2 border-gold group">
                  <div className="absolute -left-[5px] top-0 w-2 h-2 rounded-full bg-gold" />
                  <span className="text-gold text-[10px] uppercase tracking-[0.3em] font-medium block mb-3">
                    01 — Vision
                  </span>
                  <h2 className="text-3xl md:text-4xl font-serif text-text-primary italic mb-5 leading-snug">
                    Notre Vision
                  </h2>
                  <blockquote className="text-lg text-text-secondary leading-relaxed font-light italic border-none p-0 m-0"
                    style={{ textShadow: "none" }}
                  >
                    « Devenir le conseiller et partenaire de confiance des PME africaines, en les accompagnant vers une réussite entrepreneuriale durable et significative. »
                  </blockquote>
                </div>
              </AnimatedSection>

              {/* Separator */}
              <AnimatedSection delay={0.3}>
                <div className="flex items-center gap-3">
                  <div className="h-px flex-1 bg-border-subtle" />
                  <div className="w-1.5 h-1.5 rounded-full bg-gold/50" />
                  <div className="h-px flex-1 bg-border-subtle" />
                </div>
              </AnimatedSection>

              {/* Mission card */}
              <AnimatedSection delay={0.4}>
                <div className="relative pl-6 border-l-2 border-gold/50 group hover:border-gold transition-colors duration-300">
                  <div className="absolute -left-[5px] top-0 w-2 h-2 rounded-full bg-gold/50 group-hover:bg-gold transition-colors duration-300" />
                  <span className="text-gold/70 text-[10px] uppercase tracking-[0.3em] font-medium block mb-3 group-hover:text-gold transition-colors">
                    02 — Mission
                  </span>
                  <h2 className="text-3xl md:text-4xl font-serif text-text-primary italic mb-5 leading-snug">
                    Notre Mission
                  </h2>
                  <blockquote className="text-lg text-text-secondary leading-relaxed font-light italic">
                    « Soutenir durablement les PME africaines pour un succès et un impact durables en Afrique et dans le monde. »
                  </blockquote>
                </div>
              </AnimatedSection>

            </div>
          </div>
        </div>
      </section>


      {/* ── Nos Offres ──────────────────────────────────────────── */}
      <section id="nos-offres" className="py-28 bg-bg-primary relative overflow-hidden">

        {/* Background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gold/4 blur-3xl rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6">

          {/* Header */}
          <AnimatedSection>
            <div className="text-center mb-20">
              <span className="text-gold text-[11px] uppercase tracking-[0.35em] font-medium block mb-4">Ce que nous faisons</span>
              <h2 className="text-5xl md:text-6xl font-serif italic text-text-primary mb-6">Nos Offres</h2>
              <GoldDivider className="mx-auto" />
              <p className="mt-6 max-w-xl mx-auto text-text-secondary leading-relaxed">
                Un accompagnement en trois étapes pour transformer durablement votre entreprise.
              </p>
            </div>
          </AnimatedSection>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                num: "01",
                title: "Diagnostic complet",
                desc: "Évaluation de votre marketing, de vos processus internes, de votre gestion financière et de vos opportunités de croissance.",
                image: "https://d1yei2z3i6k35z.cloudfront.net/6359213/6758345179a83_Gemini_Generated_Image_tj4ogetj4ogetj4o.jpeg",
                href: "https://www.checkmyenterprise.com/pricing",
              },
              {
                num: "02",
                title: "Conseils personnalisés",
                desc: "Nos analyses nous aident à élaborer un plan d'action sur mesure adapté à vos enjeux spécifiques.",
                image: "https://d1yei2z3i6k35z.cloudfront.net/6359213/67579180c9f8a_Screenshot_20241210_003614_Gallery.jpg",
                href: "https://www.growthubb.space/cc60d593",
              },
              {
                num: "03",
                title: "Exécution",
                desc: "Nous vous accompagnons dans la mise en œuvre de notre plan d'action et assurons le suivi de son impact.",
                image: "https://d1yei2z3i6k35z.cloudfront.net/6359213/6757919f2c880_Screenshot_20241210_003225_Gallery.jpg",
                href: "https://www.growthubb.space/6705e281",
              },
            ].map((offre, idx) => (
              <AnimatedSection key={idx} delay={idx * 0.12} className="h-full">
                <div className="group relative h-full flex flex-col overflow-hidden rounded-xl border border-border-subtle bg-bg-card hover:border-gold/40 transition-all duration-500 shadow-lg hover:shadow-[0_8px_40px_rgba(201,151,58,0.12)]">

                  {/* Image */}
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={offre.image}
                      alt={offre.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      loading="lazy"
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-bg-card via-bg-card/30 to-transparent" />

                    {/* Number badge */}
                    <div className="absolute top-4 right-4 w-10 h-10 rounded-full border border-gold/40 bg-bg-primary/80 backdrop-blur-sm flex items-center justify-center">
                      <span className="text-gold font-serif font-bold text-sm">{offre.num}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col flex-1 p-7">
                    {/* Gold accent line */}
                    <div className="w-8 h-0.5 bg-gold mb-5 group-hover:w-16 transition-all duration-300" />

                    <h3 className="text-2xl font-serif text-text-primary italic mb-3 group-hover:text-gold transition-colors duration-300">
                      {offre.title}
                    </h3>
                    <p className="text-text-secondary leading-relaxed flex-1 text-sm">
                      {offre.desc}
                    </p>

                    {/* CTA */}
                    <a
                      href={offre.href}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-6 inline-flex items-center gap-2 text-sm text-gold/70 hover:text-gold transition-colors group/link font-medium"
                    >
                      En savoir plus
                      <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>


      {/* ── Critères PME ─────────────────────────────────────────── */}
      <section className="py-28 bg-bg-secondary relative overflow-hidden">

        {/* Decorative background */}
        <div className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{
            backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(201,151,58,0.5) 40px, rgba(201,151,58,0.5) 41px), repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(201,151,58,0.5) 40px, rgba(201,151,58,0.5) 41px)"
          }}
        />
        <div className="absolute -bottom-32 right-0 w-80 h-80 rounded-full bg-gold/5 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative">

          {/* Header */}
          <AnimatedSection>
            <div className="text-center mb-20">
              <span className="text-gold text-[11px] uppercase tracking-[0.35em] font-medium block mb-4">Nos Critères d'Éligibilité</span>
              <h2 className="text-5xl md:text-6xl font-serif italic text-text-primary mb-6">
                Un Service Destiné aux<br />PME en Afrique
              </h2>
              <GoldDivider className="mx-auto" />
              <p className="mt-6 max-w-xl mx-auto text-text-secondary leading-relaxed">
                Nous accompagnons les entreprises qui répondent aux critères suivants.
              </p>
            </div>
          </AnimatedSection>

          {/* Criteria cards — horizontal layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                num: "01",
                title: "Ancienneté & Localisation",
                text: "Opérationnelles depuis au moins 3 ans et implantées dans des centres urbains africains.",
                image: "https://d1yei2z3i6k35z.cloudfront.net/6359213/6757964ae55ac_Screenshot_20241210_003012_Gallery.jpg",
              },
              {
                num: "02",
                title: "Enregistrement légal",
                text: "Répertoriées dans les registres commerciaux et fiscaux de leur pays d'exercice.",
                image: "https://d1yei2z3i6k35z.cloudfront.net/6359213/675834c0d05b8_Screenshot_20241210_003140_Gallery.jpg",
              },
              {
                num: "03",
                title: "Défis structurels",
                text: "Confrontées à des difficultés majeures dans leurs différents départements et cherchant à se transformer.",
                image: "https://d1yei2z3i6k35z.cloudfront.net/6359213/675819bfabf56_Screenshot_20241210_003851_Gallery.jpg",
              },
            ].map((c, idx) => (
              <AnimatedSection key={idx} delay={idx * 0.15}>
                <div className="group relative overflow-hidden rounded-xl border border-border-subtle bg-bg-card hover:border-gold/40 transition-all duration-500 hover:shadow-[0_8px_40px_rgba(201,151,58,0.1)]">

                  {/* Image strip */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={c.image}
                      alt={c.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-bg-card via-bg-card/50 to-transparent" />

                    {/* Number */}
                    <div className="absolute bottom-4 left-5">
                      <span
                        className="font-serif font-bold text-5xl leading-none"
                        style={{
                          WebkitTextStroke: "1px rgba(201,151,58,0.6)",
                          color: "transparent",
                        }}
                      >
                        {c.num}
                      </span>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="px-6 pb-7 pt-5">
                    {/* Gold line */}
                    <div className="w-8 h-0.5 bg-gold mb-4 group-hover:w-14 transition-all duration-300" />

                    <h3 className="text-xl font-serif text-text-primary italic mb-3 group-hover:text-gold transition-colors duration-300">
                      {c.title}
                    </h3>
                    <p className="text-text-secondary text-sm leading-relaxed">
                      {c.text}
                    </p>

                    {/* Check badge */}
                    <div className="mt-5 inline-flex items-center gap-2 text-xs text-gold/70 font-medium">
                      <CheckCircle className="w-3.5 h-3.5" />
                      Critère requis
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

        </div>
      </section>


      {/* ── Méthodologie ─────────────────────────────────────────── */}
      <section className="py-28 bg-bg-primary overflow-hidden relative">

        {/* Decorative glow */}
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-gold/4 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6">

          {/* Header */}
          <AnimatedSection>
            <div className="text-center mb-20">
              <span className="text-gold text-[11px] uppercase tracking-[0.35em] font-medium block mb-4">Notre Approche</span>
              <h2 className="text-5xl md:text-6xl font-serif italic text-text-primary mb-6">Notre Méthodologie</h2>
              <GoldDivider className="mx-auto" />
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

            {/* Timeline steps */}
            <div className="order-2 lg:order-1 relative">
              {/* Vertical connector line */}
              <div className="absolute left-5 top-6 bottom-6 w-px bg-gradient-to-b from-gold/60 via-gold/30 to-transparent pointer-events-none" />

              <div className="space-y-2">
                {[
                  {
                    icon: <Database className="w-5 h-5" />,
                    title: "Analyse de la donnée",
                    sub: "Étude approfondie de vos documents internes pour comprendre la réalité de votre entreprise.",
                    num: "01",
                  },
                  {
                    icon: <CheckCircle className="w-5 h-5" />,
                    title: "Entretiens",
                    sub: "Échanges avec vos équipes dirigeantes pour mieux comprendre vos enjeux et ambitions.",
                    num: "02",
                  },
                  {
                    icon: <Layout className="w-5 h-5" />,
                    title: "Reporting",
                    sub: "Production de rapports clairs et concis présentant nos analyses et recommandations stratégiques.",
                    num: "03",
                  },
                  {
                    icon: <TrendingUp className="w-5 h-5" />,
                    title: "Accompagnement opérationnel",
                    sub: "Suivi de l'avancement des actions et ajustements à travers des réunions régulières.",
                    num: "04",
                  },
                ].map((step, idx) => (
                  <AnimatedSection key={idx} delay={idx * 0.12}>
                    <div className="flex gap-6 group relative py-5 pl-14 pr-4">
                      {/* Step number dot on timeline */}
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 flex-shrink-0 rounded-full border-2 border-gold/40 bg-bg-primary flex items-center justify-center text-gold group-hover:border-gold group-hover:bg-gold group-hover:text-bg-primary transition-all duration-300 z-10">
                        {step.icon}
                      </div>

                      {/* Card */}
                      <div className="flex-1 bg-bg-card border border-border-subtle rounded-xl p-5 group-hover:border-gold/30 group-hover:shadow-[0_4px_24px_rgba(201,151,58,0.08)] transition-all duration-300">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-gold/50 text-xs font-mono">{step.num}</span>
                          <h4 className="text-lg font-serif text-text-primary group-hover:text-gold transition-colors duration-200">
                            {step.title}
                          </h4>
                        </div>
                        <p className="text-text-secondary text-sm leading-relaxed">{step.sub}</p>
                      </div>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </div>

            {/* Image */}
            <AnimatedSection className="order-1 lg:order-2">
              <div className="relative">
                {/* Gold frame offset */}
                <div className="absolute -top-5 -right-5 w-full h-full border border-gold/25 rounded-xl pointer-events-none z-0" />

                <div className="relative z-10 overflow-hidden rounded-xl border border-border-subtle shadow-2xl group">
                  <img
                    src="https://d1yei2z3i6k35z.cloudfront.net/10694324/692106ab93242_WhatsAppImage2025-11-20at15.08.28.jpeg"
                    alt="Notre Méthodologie"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/50 via-transparent to-transparent" />
                  <div className="absolute inset-0 bg-gold/6 mix-blend-overlay" />

                  {/* Floating label */}
                  <div className="absolute bottom-6 right-6 px-4 py-2 rounded-lg border border-gold/30 backdrop-blur-sm"
                    style={{ background: "rgba(13,13,13,0.8)" }}
                  >
                    <p className="text-gold text-xs uppercase tracking-widest font-medium">4 étapes clés</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>

          </div>
        </div>
      </section>


      {/* ── Message du CEO / Manifeste ───────────────────────────── */}
      <section className="py-32 md:py-40 bg-bg-secondary relative overflow-hidden">

        {/* Background elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-gold/4 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-gold/3 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative">

          {/* Section label */}
          <AnimatedSection>
            <div className="flex items-center gap-4 mb-20">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent to-gold/30" />
              <span className="text-gold text-[11px] uppercase tracking-[0.35em] font-medium">Le Mot du Directeur</span>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent to-gold/30" />
            </div>
          </AnimatedSection>

          <div className="flex justify-center">
            <div className="max-w-4xl">
              <AnimatedSection>
                <h3 className="text-gold text-sm font-bold uppercase tracking-[0.3em] mb-4">Message de Vision</h3>
                <h2 className="text-4xl md:text-6xl font-serif text-text-primary mb-12 italic leading-tight">
                  Le Mot du <span className="text-gold-gradient not-italic">Directeur</span>
                </h2>

                {/* Giant decorative quote */}
                <div
                  className="font-serif text-[120px] leading-none text-gold/10 select-none mb-[-40px] ml-[-10px]"
                  aria-hidden="true"
                >
                  "
                </div>

                <h2 className="text-2xl md:text-4xl font-serif text-text-primary mb-6 leading-tight italic">
                  La Force Transformatrice de la Rigueur et de la Discipline: Une Expérience Réelle
                </h2>

                <GoldDivider className="mb-8" />

                <div className="space-y-8 text-text-secondary leading-relaxed font-light">
                  <p className="text-lg text-text-primary italic">
                    Il y a quelques années, j'ai eu l'opportunité d'aider une entreprise manufacturière en difficulté en Afrique, spécialisée dans les produits d'hygiène. Mon expertise en conseil d'affaires a été sollicitée par un ami qui connaissait les difficultés de cette entreprise.
                  </p>

                  <div className="space-y-3">
                    <h4 className="text-gold font-serif text-xl italic">Un Diagnostic Précis, une Prescription Efficace</h4>
                    <p>
                      J'ai passé quinze jours à analyser en profondeur l'entreprise: chiffres, stratégies, et entretiens avec les équipes. L'objectif était d'identifier les obstacles et les leviers de croissance. Un rapport détaillé avec un plan d'action précis a été remis aux dirigeants, qui m'ont confié sa mise en œuvre.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-gold font-serif text-xl italic">La Magie des Réunions Quotidiennes</h4>
                    <p>
                      La transformation a débuté avec des réunions quotidiennes à 10 heures, impliquant tous les managers. Ces réunions de trente minutes étaient axées sur la transparence, la collaboration et l'anticipation. Chaque manager présentait les avancées de la veille, exprimait ses besoins pour faciliter la coordination, et présentait les plans d'action pour la journée à venir.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                    <div className="space-y-3 p-5 border border-gold/20 bg-gold/5 rounded-sm">
                      <h4 className="text-gold font-serif text-lg italic">Résultats Concrets</h4>
                      <p className="text-sm">
                        En trois mois, l'entreprise a atteint des records de ventes, un exploit inédit en onze ans d'existence.
                      </p>
                    </div>
                    <div className="space-y-3 p-5 border border-gold/20 bg-gold/5 rounded-sm">
                      <h4 className="text-gold font-serif text-lg italic">Un Modèle Exportable</h4>
                      <p className="text-sm">
                        Cette expérience a démontré la puissance de la rigueur et de la discipline. Ce modèle peut être appliqué à toute entreprise africaine souhaitant se transformer.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-gold font-serif text-xl italic">Pourquoi l'Afrique?</h4>
                    <p>
                      L'Afrique possède un potentiel immense et chaque entreprise mérite d'atteindre son plein potentiel. Mon équipe et moi sommes prêts à relever ce défi avec vous.
                    </p>
                  </div>
                </div>

                {/* Signature */}
                <div className="mt-12 pt-8 border-t border-border-subtle">
                  <div>
                    <p className="font-serif text-2xl text-gold italic leading-none">Ambrose Nzeyimana</p>
                    <p className="text-text-muted uppercase tracking-widest text-[10px] mt-2 font-medium">CEO & Fondateur · Ubuntu Business Builders</p>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* ── Ubuntu & CTA ─────────────────────────────────────────── */}
      <section className="py-28 bg-bg-primary relative overflow-hidden">

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gold/4 blur-3xl rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Image */}
            <AnimatedSection>
              <div className="relative">
                <div className="absolute -top-5 -left-5 w-full h-full border border-gold/20 rounded-xl pointer-events-none z-0" />
                <div className="relative z-10 rounded-xl overflow-hidden border border-border-subtle shadow-2xl group">
                  <img
                    src="https://d1yei2z3i6k35z.cloudfront.net/6359213/675883ce8eb04_Screenshot_20241210_180201_Chrome.jpg"
                    alt="Ubuntu Approach"
                    className="w-full h-auto group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/40 to-transparent" />
                </div>
              </div>
            </AnimatedSection>

            {/* Text + CTA */}
            <AnimatedSection delay={0.2}>
              <span className="text-gold text-[11px] uppercase tracking-[0.35em] font-medium block mb-5">Philosophie</span>
              <h2 className="text-4xl md:text-5xl font-serif text-text-primary mb-6 italic leading-snug">
                L'esprit d'Ubuntu au cœur de notre approche
              </h2>
              <GoldDivider className="mb-7" />
              <p className="text-text-secondary leading-relaxed mb-10">
                Nous plaçons l'esprit d'Ubuntu au cœur de notre démarche. En intégrant des systèmes de croissance
                robustes et une éthique de leadership transformative, nous créons des environnements où l'humain
                et la performance s'épanouissent de concert.
              </p>

              {/* Offer card */}
              <div className="relative rounded-xl overflow-hidden border border-gold/40 p-7 group"
                style={{ background: "linear-gradient(135deg, rgba(201,151,58,0.08) 0%, rgba(13,13,13,0.95) 100%)" }}
              >
                {/* Animated glow */}
                <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-gold/15 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000 pointer-events-none" />

                <div className="relative z-10">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold/40 bg-gold/10 mb-5">
                    <span className="text-gold text-[10px] uppercase tracking-widest font-bold">Offre Exclusive</span>
                  </div>

                  <p className="text-text-primary font-serif text-xl mb-2 leading-snug">
                    Recevez un <span className="text-gold italic">Workbook gratuit</span> :
                  </p>
                  <p className="text-gold-light font-bold text-lg mb-7 leading-snug uppercase tracking-wide">
                    Comment augmenter de 30% vos ventes mensuelles en 90 jours.
                  </p>

                  <button
                    className="group/btn inline-flex items-center gap-2 px-7 py-3.5 text-sm font-bold uppercase tracking-widest text-bg-primary rounded-full transition-all duration-300 hover:shadow-[0_0_24px_rgba(201,151,58,0.4)] hover:scale-105 active:scale-95"
                    style={{ background: "linear-gradient(135deg, #E8BC6A 0%, #C9973A 60%, #A87B28 100%)" }}
                  >
                    Obtenir le workbook
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
      
    </div>
  );
}
