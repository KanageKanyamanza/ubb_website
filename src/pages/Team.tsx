import { motion } from "motion/react";
import { Link } from "react-router-dom";
import AnimatedSection from "../components/ui/AnimatedSection";
import GoldDivider from "../components/ui/GoldDivider";
import { CheckCircle, Target, Laptop, Megaphone, ArrowRight, Linkedin } from "lucide-react";
import { useTeam } from "../context/TeamContext";
import { useSEO } from "../hooks/useSEO";

export default function Team() {
  useSEO({
    title: "Notre Équipe d'Experts & Partenaires Locaux",
    description: "Découvrez l'équipe d'Ubuntu Business Builders (UBB) : experts en conseil stratégique, ingénierie produit/technologie, marketing de croissance et partenaires locaux sur le terrain en Afrique (Sénégal, Burkina Faso, etc.).",
    keywords: "equipe ubb, experts agronomie, developpeurs web, community managers, ambroise nzeyimana, cedric bonzi, nadinga raoul, burkina faso, sénégal",
    ogImage: "https://d1yei2z3i6k35z.cloudfront.net/10694324/69f9d5444cd729.29932403_ambroseimage.jpeg"
  });

  const { team } = useTeam();

  const directionMembers = team.filter((m) => m.category === "direction" && m.visible);
  const techMembers = team.filter((m) => m.category === "tech" && m.visible);
  const growthMembers = team.filter((m) => m.category === "growth" && m.visible);
  const partnerMembers = team.filter((m) => m.category === "partners" && m.visible);

  return (
    <div className="flex flex-col w-full min-h-screen">
      
      {/* ── SECTION 1 — HERO PAGE ──────────────────────────────────────── */}
      <section className="bg-bg-primary border-b border-border-subtle py-24 px-6">
        <div className="max-w-4xl mx-auto text-center mt-16">
          <AnimatedSection>
            <span className="text-gold uppercase tracking-wide text-[11px] font-bold block mb-4">
              Ubuntu Business Builders · L'équipe
            </span>
            <h1 className="text-4xl md:text-[64px] font-serif italic text-text-primary mb-6 leading-tight">
              Des experts engagés <br className="hidden md:block" />
              dans votre réussite.
            </h1>
            <p className="text-text-secondary text-[15px] max-w-xl mx-auto leading-relaxed mb-8">
              Conseil stratégique, technologie et marketing — trois disciplines réunies pour accompagner les entreprises africaines vers une croissance structurée et durable.
            </p>
            
            <GoldDivider className="mx-auto mb-10" />
            
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-bold uppercase tracking-widest text-text-muted">
              <span className="flex items-center gap-2 px-4 py-2 bg-bg-card border border-border-subtle rounded-full">
                <Target className="w-4 h-4 text-gold" /> Conseil stratégique
              </span>
              <span className="flex items-center gap-2 px-4 py-2 bg-bg-card border border-border-subtle rounded-full">
                <Laptop className="w-4 h-4 text-gold" /> Produit & Technologie
              </span>
              <span className="flex items-center gap-2 px-4 py-2 bg-bg-card border border-border-subtle rounded-full">
                <Megaphone className="w-4 h-4 text-gold" /> Croissance & Visibilité
              </span>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── SECTION 2 — STRATE 1 : DIRECTION & CONSEIL ───────────────── */}
      <section className="bg-bg-primary py-24 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="mb-16 text-center">
            <span className="flex items-center justify-center gap-3 text-gold uppercase text-[11px] font-bold tracking-widest mb-6">
              <span className="w-8 h-px bg-gold/50"></span>
              Direction & Conseil Stratégique
              <span className="w-8 h-px bg-gold/50"></span>
            </span>
            <p className="text-text-secondary italic font-serif text-xl max-w-2xl mx-auto">
              Le cœur stratégique d'UBB. Ambrose pilote chaque mission de conseil avec son équipe de direction.
            </p>
          </AnimatedSection>

          {directionMembers.map((member, idx) => {
            if (member.id === "ambrose") {
              return (
                <AnimatedSection key={member.id} delay={0.1} className="mb-20">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-bg-card border border-border-subtle rounded-2xl p-8 lg:p-12">
                    <div className="lg:col-span-7 order-2 lg:order-1">
                      <span className="inline-flex items-center gap-2 px-3 py-1 bg-gold/10 text-gold border border-gold/30 text-[10px] font-bold uppercase tracking-widest rounded-full mb-6">
                        ⭐ Fondateur & Directeur Exécutif
                      </span>
                      <h2 className="text-5xl font-serif text-text-primary mb-2">{member.name}</h2>
                      <h3 className="text-gold uppercase tracking-wide text-sm font-bold mb-6">{member.title}</h3>
                      <div className="w-[60px] h-[3px] bg-gold mb-6" />
                      
                      <p className="text-text-secondary text-[15px] leading-relaxed mb-8">
                        {member.bio}
                      </p>

                      <ul className="space-y-3 mb-8">
                        <li className="flex items-start gap-3 text-text-secondary text-sm">
                          <CheckCircle className="w-5 h-5 text-gold flex-shrink-0" />
                          <span>Entreprise manufacturière : record de ventes en 90 jours</span>
                        </li>
                        <li className="flex items-start gap-3 text-text-secondary text-sm">
                          <CheckCircle className="w-5 h-5 text-gold flex-shrink-0" />
                          <span>Diagnostic complet en 15 jours, plan d'action précis</span>
                        </li>
                        <li className="flex items-start gap-3 text-text-secondary text-sm">
                          <CheckCircle className="w-5 h-5 text-gold flex-shrink-0" />
                          <span>Méthode des réunions quotidiennes — résultats en 3 mois</span>
                        </li>
                      </ul>

                      <div className="flex flex-wrap gap-2 mb-8">
                        {member.chips.map((chip) => (
                          <span key={chip} className="px-3 py-1.5 bg-bg-primary border border-border-subtle text-text-muted text-[10px] uppercase tracking-wider rounded-full">
                            {chip}
                          </span>
                        ))}
                      </div>

                      <div className="flex flex-col sm:flex-row items-start gap-6">
                        <a href="http://www.linkedin.com/in/ubuntu-business-builders-113223363/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-gold hover:text-gold-light text-sm font-bold uppercase tracking-widest transition-colors">
                          <Linkedin className="w-4 h-4" /> Voir profil LinkedIn
                        </a>
                        <Link to="/founder" className="inline-flex items-center gap-2 text-gold text-sm font-bold uppercase tracking-widest hover:text-gold-light transition-colors">
                          Voir le profil complet →
                        </Link>
                      </div>
                    </div>
                    
                    <div className="lg:col-span-5 order-1 lg:order-2">
                      <div className="relative rounded-xl overflow-hidden aspect-[3/4] border border-gold/20 group">
                        <img 
                          src={member.img} 
                          alt={member.name} 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gold/0 group-hover:bg-gold/10 transition-colors duration-500" />
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              );
            }

            return (
              <AnimatedSection key={member.id} delay={0.2} className="mb-12 last:mb-0">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-bg-card border border-border-subtle rounded-2xl p-8 lg:p-12">
                  <div className="lg:col-span-5">
                    <div className="relative rounded-xl overflow-hidden aspect-[4/5] border border-border-subtle">
                      <img 
                        src={member.img} 
                        alt={member.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  
                  <div className="lg:col-span-7">
                    <h2 className="text-4xl font-serif text-text-primary mb-2">{member.name}</h2>
                    <h3 className="text-gold uppercase tracking-wide text-sm font-bold mb-6">{member.title}</h3>
                    <div className="w-[60px] h-[3px] bg-gold/50 mb-6" />
                    
                    <p className="text-text-secondary text-[15px] leading-relaxed mb-8">
                      {member.bio}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {member.chips.map((chip) => (
                        <span key={chip} className="px-3 py-1.5 bg-bg-primary border border-border-subtle text-text-muted text-[10px] uppercase tracking-wider rounded-full">
                          {chip}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </section>

      {/* ── SECTION 3 — STRATE 2 : ÉQUIPE PRODUIT & TECHNOLOGIE ──────── */}
      <section className="bg-bg-secondary py-24 px-6 border-t border-border-subtle">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="mb-16 text-center">
            <span className="flex items-center justify-center gap-3 text-gold uppercase text-[11px] font-bold tracking-widest mb-6">
              <span className="w-8 h-px bg-gold/50"></span>
              Équipe Produit & Technologie
              <span className="w-8 h-px bg-gold/50"></span>
            </span>
            <p className="text-text-secondary italic font-serif text-xl max-w-2xl mx-auto">
              L'équipe qui conçoit et maintient les outils SaaS d'UBB — vitalCHECK, HARVESTS 2.0 et le site de la plateforme.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {techMembers.map((member, i) => (
              <AnimatedSection key={member.id} delay={i * 0.1}>
                <div className="bg-bg-card border border-border-subtle rounded-2xl overflow-hidden group relative flex flex-col h-full hover:border-gold/30 transition-colors">
                  <div className="relative aspect-square overflow-hidden bg-bg-secondary">
                    <img src={member.img} alt={member.name} className="w-full h-full object-cover object-top" />
                    <div className="absolute inset-0 bg-gradient-to-t from-bg-card to-transparent opacity-90" />
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gold scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
                  </div>
                  <div className="p-8 flex-1 flex flex-col -mt-20 relative z-10">
                    <h3 className="font-serif text-3xl text-text-primary mb-1">{member.name}</h3>
                    <p className="text-gold uppercase tracking-widest text-[11px] font-bold mb-4">{member.title}</p>
                    <p className="text-text-secondary text-sm leading-relaxed mb-6 flex-1 line-clamp-3">
                      {member.bio}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {member.chips.map((chip) => (
                        <span key={chip} className="px-3 py-1 bg-bg-primary border border-border-subtle text-text-muted text-[10px] uppercase tracking-wider rounded-full">
                          {chip}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 4 — STRATE 3 : ÉQUIPE CROISSANCE & VISIBILITÉ ─────── */}
      <section className="bg-bg-primary py-24 px-6 border-t border-border-subtle">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="mb-16 text-center">
            <span className="flex items-center justify-center gap-3 text-gold uppercase text-[11px] font-bold tracking-widest mb-6">
              <span className="w-8 h-px bg-gold/50"></span>
              Équipe Croissance & Visibilité
              <span className="w-8 h-px bg-gold/50"></span>
            </span>
            <p className="text-text-secondary italic font-serif text-xl max-w-2xl mx-auto">
              L'équipe qui amplifie la présence d'UBB et de ses clients sur les marchés africains — contenus, réseaux sociaux et stratégie d'acquisition.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {growthMembers.map((member, i) => (
              <AnimatedSection key={member.id} delay={i * 0.1}>
                <div className="bg-bg-card border border-border-subtle rounded-2xl overflow-hidden group relative flex flex-col h-full hover:border-gold/30 transition-colors">
                  <div className="relative aspect-square overflow-hidden bg-bg-secondary">
                    <img src={member.img} alt={member.name} className="w-full h-full object-cover object-top" />
                    <div className="absolute inset-0 bg-gradient-to-t from-bg-card to-transparent opacity-90" />
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gold scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
                  </div>
                  <div className="p-8 flex-1 flex flex-col -mt-20 relative z-10">
                    <h3 className="font-serif text-3xl text-text-primary mb-1">{member.name}</h3>
                    <p className="text-gold uppercase tracking-widest text-[11px] font-bold mb-4">{member.title}</p>
                    <p className="text-text-secondary text-sm leading-relaxed mb-6 flex-1 line-clamp-3">
                      {member.bio}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {member.chips.map((chip) => (
                        <span key={chip} className="px-3 py-1 bg-bg-primary border border-border-subtle text-text-muted text-[10px] uppercase tracking-wider rounded-full">
                          {chip}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 5 — STRATE 4 : PARTENAIRES LOCAUX & EXPERTS TERRAIN ── */}
      <section className="bg-bg-secondary py-24 px-6 border-t border-border-subtle">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="mb-16 text-center">
            <span className="flex items-center justify-center gap-3 text-gold uppercase text-[11px] font-bold tracking-widest mb-6">
              <span className="w-8 h-px bg-gold/50"></span>
              Partenaires Locaux & Experts Terrain
              <span className="w-8 h-px bg-gold/50"></span>
            </span>
            <p className="text-text-secondary italic font-serif text-xl max-w-2xl mx-auto">
              Nos ambassadeurs et experts locaux engagés sur le terrain pour conseiller et transformer les entreprises locales.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
            {partnerMembers.map((member, i) => (
              <AnimatedSection key={member.id} delay={i * 0.1} className="mx-auto w-full max-w-sm">
                <div className="bg-bg-card border border-border-subtle rounded-2xl overflow-hidden group relative flex flex-col h-full hover:border-gold/30 transition-colors shadow-lg">
                  <div className="relative aspect-square overflow-hidden bg-bg-secondary">
                    <img src={member.img} alt={member.name} className="w-full h-full object-cover object-top" />
                    <div className="absolute inset-0 bg-gradient-to-t from-bg-card to-transparent opacity-90" />
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gold scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
                  </div>
                  <div className="p-8 flex-1 flex flex-col -mt-20 relative z-10">
                    <h3 className="font-serif text-3xl text-text-primary mb-1">{member.name}</h3>
                    <p className="text-gold uppercase tracking-widest text-[11px] font-bold mb-4">{member.title}</p>
                    <p className="text-text-secondary text-sm leading-relaxed mb-6 flex-1">
                      {member.bio}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {member.chips.map((chip) => (
                        <span key={chip} className="px-3 py-1 bg-bg-primary border border-border-subtle text-text-muted text-[10px] uppercase tracking-wider rounded-full">
                          {chip}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 6 — REJOINDRE L'ÉQUIPE ───────────────────────────── */}
      <section className="bg-bg-primary border-t border-border-subtle py-20 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <AnimatedSection>
            <h2 className="text-4xl md:text-5xl font-serif text-text-primary mb-6">
              Vous souhaitez rejoindre l'aventure UBB ?
            </h2>
            <p className="text-text-secondary text-lg mb-10 max-w-xl mx-auto leading-relaxed">
              UBB recrute des Partenaires Locaux dans toute l'Afrique francophone pour accompagner les entreprises locales.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link 
                to="/jobs" 
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-gold text-bg-primary font-bold uppercase tracking-widest text-sm rounded-full hover:bg-gold-light transition-all hover:scale-105"
              >
                Voir les opportunités <ArrowRight className="w-4 h-4" />
              </Link>
              <a 
                href="tel:+221771970713" 
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 border border-border-subtle text-text-secondary hover:border-gold hover:text-gold font-bold uppercase tracking-widest text-sm rounded-full transition-all"
              >
                Nous contacter
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>

    </div>
  );
}
