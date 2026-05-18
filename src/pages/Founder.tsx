import { motion } from "motion/react";
import { Link } from "react-router-dom";
import AnimatedSection from "../components/ui/AnimatedSection";
import GoldDivider from "../components/ui/GoldDivider";
import { useSEO } from "../hooks/useSEO";
import { MapPin, Globe, Linkedin, Target, Wrench, TrendingUp, ArrowRight } from "lucide-react";

export default function Founder() {
  useSEO({
    title: "Ambrose Nzeyimana - Fondateur & Visionnaire UBB",
    description: "Découvrez le parcours d'Ambrose Nzeyimana, fondateur d'Ubuntu Business Builders (UBB). Expert en structuration d'affaires, auteur et conférencier, il a orchestré plus de 20 diagnostics stratégiques et propulsé la croissance de dizaines d'entreprises en Afrique francophone.",
    keywords: "ambrose nzeyimana, fondateur ubb, ubuntu business builders, structuration d'affaires, investissement afrique, cormorant garamond",
    ogImage: "https://d1yei2z3i6k35z.cloudfront.net/10694324/69f9d5444cd729.29932403_ambroseimage.jpeg"
  });
  return (
    <div className="flex flex-col w-full min-h-screen">
      
      {/* ── SECTION 1 — HERO FONDATEUR ────────────────────────────────── */}
      <section className="bg-bg-primary pt-32 pb-24 border-b border-border-subtle relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/5 blur-3xl rounded-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <AnimatedSection className="lg:col-span-7">
              <span className="text-gold uppercase tracking-widest text-[11px] font-bold block mb-4">
                Fondateur & Directeur Exécutif · UBB
              </span>
              <h1 className="text-6xl md:text-[72px] font-serif italic text-text-primary mb-2 leading-tight">
                Ambrose Nzeyimana
              </h1>
              <h2 className="text-2xl md:text-[28px] font-serif italic text-text-secondary mb-6 leading-snug">
                "Transformer les entreprises africaines de l'intérieur."
              </h2>
              
              <div className="w-16 h-[3px] bg-gold mb-8" />
              
              <p className="text-text-secondary text-lg leading-relaxed mb-10 max-w-xl">
                Ambrose Nzeyimana a fondé Ubuntu Business Builders avec une conviction simple : les entreprises africaines ont tout ce qu'il faut pour croître — elles ont besoin d'un système, pas d'un miracle.
              </p>

              <div className="flex flex-wrap gap-4 mb-10">
                <span className="flex items-center gap-2 px-4 py-2 bg-bg-card border border-border-subtle rounded-full text-xs font-bold uppercase tracking-widest text-text-primary">
                  <MapPin className="w-4 h-4 text-gold" /> Dakar, Sénégal
                </span>
                <span className="flex items-center gap-2 px-4 py-2 bg-bg-card border border-border-subtle rounded-full text-xs font-bold uppercase tracking-widest text-text-primary">
                  <Globe className="w-4 h-4 text-gold" /> Afrique francophone
                </span>
              </div>

              <a href="http://www.linkedin.com/in/ubuntu-business-builders-113223363/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-gold hover:text-gold-light text-sm font-bold uppercase tracking-widest transition-colors">
                <Linkedin className="w-4 h-4" /> Voir le profil LinkedIn <ArrowRight className="w-4 h-4 ml-1" />
              </a>
            </AnimatedSection>
            
            <AnimatedSection delay={0.2} className="lg:col-span-5 h-full">
              <div className="relative rounded-2xl overflow-hidden aspect-[3/4] border border-border-subtle h-full shadow-[0_0_40px_rgba(201,151,58,0.1)]">
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

      {/* ── SECTION 2 — BANDE DE CHIFFRES CLÉS ────────────────────────── */}
      <section className="py-12 border-b border-border-subtle" style={{ backgroundColor: "#131313" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 md:divide-x divide-border-subtle">
            <div className="flex flex-col items-center text-center px-4">
              <span className="font-serif text-3xl md:text-4xl text-gold mb-2 italic">15 jours</span>
              <span className="font-sans text-[11px] uppercase tracking-wide text-text-muted">Pour un diagnostic complet</span>
            </div>
            <div className="flex flex-col items-center text-center px-4">
              <span className="font-serif text-3xl md:text-4xl text-gold mb-2 italic">90 jours</span>
              <span className="font-sans text-[11px] uppercase tracking-wide text-text-muted">Pour des résultats mesurables</span>
            </div>
            <div className="flex flex-col items-center text-center px-4">
              <span className="font-serif text-3xl md:text-4xl text-gold mb-2 italic">11 ans</span>
              <span className="font-sans text-[11px] uppercase tracking-wide text-text-muted">De record battu en 3 mois</span>
            </div>
            <div className="flex flex-col items-center text-center px-4">
              <span className="font-serif text-3xl md:text-4xl text-gold mb-2 italic">Ubuntu</span>
              <span className="font-sans text-[11px] uppercase tracking-wide text-text-muted">Au cœur de chaque mission</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 3 — EXPERTISE ─────────────────────────────────────── */}
      <section className="py-24 bg-bg-primary">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif text-text-primary mb-6">Domaines d'expertise</h2>
            <GoldDivider className="mx-auto" />
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <AnimatedSection delay={0.1}>
              <div className="bg-bg-card border border-border-subtle p-8 rounded-2xl h-full hover:border-gold/30 transition-colors">
                <Target className="w-10 h-10 text-gold mb-6" />
                <h3 className="text-2xl font-serif text-text-primary mb-4">Diagnostic Stratégique</h3>
                <p className="text-text-secondary leading-relaxed text-sm">
                  Analyse approfondie des opérations, finances et processus commerciaux. Ambrose identifie les blocages invisibles que les équipes internes ne voient plus.
                </p>
              </div>
            </AnimatedSection>
            
            <AnimatedSection delay={0.2}>
              <div className="bg-bg-card border border-border-subtle p-8 rounded-2xl h-full hover:border-gold/30 transition-colors">
                <Wrench className="w-10 h-10 text-gold mb-6" />
                <h3 className="text-2xl font-serif text-text-primary mb-4">Transformation Opérationnelle</h3>
                <p className="text-text-secondary leading-relaxed text-sm">
                  Mise en place de systèmes de gestion, réunions structurées et indicateurs de performance adaptés aux réalités africaines.
                </p>
              </div>
            </AnimatedSection>
            
            <AnimatedSection delay={0.3}>
              <div className="bg-bg-card border border-border-subtle p-8 rounded-2xl h-full hover:border-gold/30 transition-colors">
                <TrendingUp className="w-10 h-10 text-gold mb-6" />
                <h3 className="text-2xl font-serif text-text-primary mb-4">Croissance des Revenus</h3>
                <p className="text-text-secondary leading-relaxed text-sm">
                  Plan d'action orienté résultats commerciaux. Méthode prouvée : +30% de ventes en 90 jours dans des secteurs variés.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── SECTION 4 — PARCOURS (TIMELINE) ──────────────────────────── */}
      <section className="py-24 bg-bg-secondary border-t border-border-subtle relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6">
          <AnimatedSection className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-serif text-text-primary mb-4">Parcours</h2>
            <p className="text-xl font-serif italic text-gold">De la conviction à l'impact.</p>
          </AnimatedSection>

          <div className="relative border-l border-gold/30 ml-4 md:ml-8 space-y-16 pb-8">
            
            {/* Item 1 */}
            <AnimatedSection className="relative pl-8 md:pl-12">
              <div className="absolute top-0 -left-1.5 w-3 h-3 bg-gold rounded-full shadow-[0_0_10px_#C9973A]" />
              <div className="text-gold text-sm font-bold uppercase tracking-widest mb-2">Leadership & Analyse</div>
              <h3 className="text-2xl font-serif text-text-primary mb-4">Parcours Académique & Conférences</h3>
              <p className="text-text-secondary leading-relaxed mb-4">
                Formé en sciences politiques, économie et systèmes d'information, Ambrose s'est spécialisé dans la géopolitique de la région des Grands Lacs et la transformation des organisations. Son expertise l'a amené à intervenir en tant que conférencier et analyste auprès d'institutions prestigieuses telles que la London School of Economics (LSE) et l'Université de Cambridge, abordant les enjeux de développement durable et d'autonomie des économies africaines.
              </p>
            </AnimatedSection>

            {/* Item 2 */}
            <AnimatedSection className="relative pl-8 md:pl-12">
              <div className="absolute top-0 -left-1.5 w-3 h-3 bg-gold rounded-full shadow-[0_0_10px_#C9973A]" />
              <div className="text-gold text-sm font-bold uppercase tracking-widest mb-2">Conseil International</div>
              <h3 className="text-2xl font-serif text-text-primary mb-4">Direction de Cabinets & Accompagnement</h3>
              <p className="text-text-secondary leading-relaxed mb-4">
                Fort d'une solide expérience de conseil à l'international, Ambrose a dirigé des cabinets et initiatives spécialisés dans la transformation opérationnelle et l'implémentation du leadership I-BUNTU. En tant que coordinateur de mouvements panafricains et expert-conseil, il a accompagné de nombreux dirigeants à structurer leurs chaînes de valeur et à développer des modèles managériaux hautement performants fondés sur la collaboration collective.
              </p>
            </AnimatedSection>

            {/* Item 3 */}
            <AnimatedSection className="relative pl-8 md:pl-12">
              <div className="absolute top-0 -left-1.5 w-3 h-3 bg-gold rounded-full shadow-[0_0_10px_#C9973A]" />
              <div className="text-gold text-sm font-bold uppercase tracking-widest mb-2">2025-2026</div>
              <h3 className="text-2xl font-serif text-text-primary mb-4">Fondation d'Ubuntu Business Builders</h3>
              <p className="text-text-secondary leading-relaxed">
                Création d'UBB au Sénégal avec une vision claire : devenir le partenaire de croissance de référence des entreprises africaines établies. <br/>
                <span className="text-xs uppercase tracking-widest text-text-muted mt-2 block">Enregistrement : SARL · RCCM SN.DKR.2026.B.1650</span>
              </p>
            </AnimatedSection>

            {/* Item 4 */}
            <AnimatedSection className="relative pl-8 md:pl-12">
              <div className="absolute top-0 -left-1.5 w-3 h-3 bg-gold rounded-full shadow-[0_0_10px_#C9973A]" />
              <div className="text-gold text-sm font-bold uppercase tracking-widest mb-2">2026</div>
              <h3 className="text-2xl font-serif text-text-primary mb-4">Première mission documentée — Secteur Hygiène</h3>
              <p className="text-text-secondary leading-relaxed">
                Intervention dans une entreprise manufacturière de produits d'hygiène en Afrique. Diagnostic en 15 jours, mise en place des réunions quotidiennes, records de ventes atteints en 90 jours — un exploit inédit en 11 ans d'existence.
              </p>
            </AnimatedSection>

          </div>
        </div>
      </section>

      {/* ── SECTION 5 — PHILOSOPHIE UBUNTU ────────────────────────────── */}
      <section className="py-32 bg-bg-primary text-center">
        <div className="max-w-3xl mx-auto px-6">
          <AnimatedSection>
            <h2 className="text-4xl md:text-[36px] font-serif italic text-gold mb-10 leading-relaxed">
              "Je suis parce que nous sommes."
            </h2>
            <p className="text-text-secondary text-lg leading-relaxed mb-16">
              La philosophie Ubuntu guide chaque mission d'Ambrose. Il ne s'agit pas de transformer une entreprise de l'extérieur — il s'agit de travailler avec les équipes, de l'intérieur, jusqu'à ce que le changement devienne naturel et durable.
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

      {/* ── SECTION 6 — MESSAGE DU CEO (ÉTUDE DE CAS) ─────────────────── */}
      <section className="py-24 bg-bg-secondary border-t border-border-subtle relative">
        <div className="max-w-4xl mx-auto px-6">
          <AnimatedSection>
            <div className="flex justify-center mb-10">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-gold/10 text-gold border border-gold/30 text-xs font-bold uppercase tracking-widest rounded-full">
                📋 Étude de cas · Message du Fondateur
              </span>
            </div>
            
            <h3 className="text-3xl md:text-4xl font-serif text-text-primary mb-8 leading-tight italic text-center">
              La Force Transformatrice de la Rigueur et de la Discipline: Une Expérience Réelle
            </h3>
            
            <GoldDivider className="mx-auto mb-12" />
            
            <div className="space-y-6 text-text-secondary leading-relaxed font-light text-lg">
              <p className="italic text-text-primary">
                Il y a quelques années, j'ai eu l'opportunité d'aider une entreprise manufacturière en difficulté en Afrique, spécialisée dans les produits d'hygiène. Mon expertise en conseil d'affaires a été sollicitée par un ami qui connaissait les difficultés de cette entreprise.
              </p>

              <h4 className="text-gold font-serif text-xl italic pt-4">Un Diagnostic Précis, une Prescription Efficace</h4>
              <p>
                J'ai passé quinze jours à analyser en profondeur l'entreprise: chiffres, stratégies, et entretiens avec les équipes. L'objectif était d'identifier les obstacles et les leviers de croissance. Un rapport détaillé avec un plan d'action précis a été remis aux dirigeants, qui m'ont confié sa mise en œuvre.
              </p>

              <h4 className="text-gold font-serif text-xl italic pt-4">La Magie des Réunions Quotidiennes</h4>
              <p>
                La transformation a débuté avec des réunions quotidiennes à 10 heures, impliquant tous les managers. Ces réunions de trente minutes étaient axées sur la transparence, la collaboration et l'anticipation. Chaque manager présentait les avancées de la veille, exprimait ses besoins pour faciliter la coordination, et présentait les plans d'action pour la journée à venir.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                <div className="p-6 border border-gold/20 bg-gold/5 rounded-xl">
                  <h4 className="text-gold font-serif text-lg italic mb-2">Résultats Concrets</h4>
                  <p className="text-sm">En trois mois, l'entreprise a atteint des records de ventes, un exploit inédit en onze ans d'existence.</p>
                </div>
                <div className="p-6 border border-gold/20 bg-gold/5 rounded-xl">
                  <h4 className="text-gold font-serif text-lg italic mb-2">Un Modèle Exportable</h4>
                  <p className="text-sm">Cette expérience a démontré la puissance de la rigueur et de la discipline. Ce modèle peut être appliqué à toute entreprise africaine souhaitant se transformer.</p>
                </div>
              </div>

              <h4 className="text-gold font-serif text-xl italic pt-4">Pourquoi l'Afrique?</h4>
              <p>
                L'Afrique possède un potentiel immense et chaque entreprise mérite d'atteindre son plein potentiel. Mon équipe et moi sommes prêts à relever ce défi avec vous.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── SECTION 7 — CTA FINAL ─────────────────────────────────────── */}
      <section className="py-24 bg-[#0A0A0A] border-t border-border-subtle text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/10 blur-[100px] rounded-full pointer-events-none" />
        
        <div className="max-w-3xl mx-auto px-6 relative z-10">
          <AnimatedSection>
            <h2 className="text-4xl md:text-5xl font-serif text-text-primary mb-6">
              Travailler avec Ambrose
            </h2>
            <p className="text-text-secondary text-lg mb-10">
              Chaque mission commence par un diagnostic. Parlons de votre entreprise.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a 
                href="https://www.checkmyenterprise.com/pricing" 
                target="_blank" 
                rel="noreferrer" 
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-gold text-bg-primary font-bold uppercase tracking-widest text-sm rounded-full hover:bg-gold-light transition-all hover:scale-105"
              >
                Démarrer mon diagnostic <ArrowRight className="w-4 h-4" />
              </a>
              <Link 
                to="/team" 
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 border border-border-subtle text-text-secondary hover:border-gold hover:text-gold font-bold uppercase tracking-widest text-sm rounded-full transition-all"
              >
                ← Retour à l'équipe
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

    </div>
  );
}
