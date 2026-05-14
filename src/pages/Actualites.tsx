// src/pages/Actualites.tsx
import { motion } from "motion/react";
import { ArrowRight, Calendar, Tag, ExternalLink } from "lucide-react";
import AnimatedSection from "../components/ui/AnimatedSection";
import GoldDivider from "../components/ui/GoldDivider";
import { useNews } from "../context/NewsContext";

export default function Actualites() {
  const { newsGallery, projects } = useNews();

  // Filter visible content
  const visibleImages = newsGallery.filter(img => img.visible);
  const visibleProjects = projects.filter(p => p.visible);

  return (
    <div className="flex flex-col w-full bg-bg-primary overflow-hidden">
      
      {/* ── Hero Section ─────────────────────────────────────────── */}
      <section className="relative pt-40 pb-24 overflow-hidden border-b border-border-subtle">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gold/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/4 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gold/3 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/4 pointer-events-none" />
        
        {/* Animated Grain */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <AnimatedSection>
            <span className="text-gold text-[11px] uppercase tracking-[0.4em] font-medium block mb-6">Chroniques & Événements</span>
            <h1 className="text-6xl md:text-8xl font-serif text-text-primary mb-8 italic leading-tight">
              Actualités <span className="text-gold-gradient not-italic">UBB</span>
            </h1>
            <p className="text-text-secondary text-xl md:text-2xl font-serif italic max-w-2xl mx-auto mb-10 leading-relaxed">
              Explorez nos dernières initiatives, succès et opportunités pour les entreprises africaines.
            </p>
            <GoldDivider className="mx-auto" />
          </AnimatedSection>
        </div>
      </section>

      {/* ── Featured Gallery ─────────────────────────────────────── */}
      <section className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="mb-20">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
              <div className="max-w-2xl">
                <h2 className="text-4xl md:text-5xl font-serif italic text-text-primary mb-4">Galerie d'Impact</h2>
                <p className="text-text-secondary leading-relaxed">
                  Un aperçu visuel de nos activités récentes, webinaires et moments forts qui façonnent l'écosystème entrepreneurial.
                </p>
              </div>
              <div className="hidden md:block">
                <div className="flex items-center gap-3 text-gold/60 text-sm font-medium uppercase tracking-widest">
                  <span>Scroll pour explorer</span>
                  <div className="w-12 h-px bg-gold/30" />
                </div>
              </div>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {visibleImages.map((img, idx) => (
              <AnimatedSection key={img.id} delay={idx * 0.08}>
                <div className="group relative bg-bg-card border border-border-subtle overflow-hidden rounded-sm transition-all duration-500 hover:border-gold/40 hover:shadow-[0_20px_50px_rgba(201,151,58,0.1)]">
                  
                  {/* Image Container */}
                  <div className="aspect-[4/5] overflow-hidden relative">
                    <img 
                      src={img.url} 
                      alt={img.caption} 
                      className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 group-hover:rotate-1" 
                      loading="lazy"
                    />
                    
                    {/* Overlays */}
                    <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-transparent to-transparent opacity-60" />
                    <div className="absolute inset-0 bg-gold/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Floating Info */}
                    <div className="absolute top-5 left-5 opacity-0 group-hover:opacity-100 transition-all duration-500 transform -translate-y-2 group-hover:translate-y-0">
                      <div className="flex items-center gap-2 px-3 py-1 bg-bg-primary/80 backdrop-blur-md border border-gold/30 rounded-full">
                        <Tag className="w-3 h-3 text-gold" />
                        <span className="text-[9px] text-text-primary uppercase tracking-widest font-bold">Événement</span>
                      </div>
                    </div>
                  </div>

                  {/* Content Area */}
                  <div className="p-8">
                    <div className="flex items-center gap-3 text-gold/60 text-[10px] uppercase tracking-[0.2em] mb-4">
                      <Calendar className="w-3 h-3" />
                      <span>{img.date || "Récemment publié"}</span>
                    </div>
                    
                    <h3 className="text-xl font-serif text-text-primary italic mb-6 group-hover:text-gold transition-colors duration-300">
                      {img.caption}
                    </h3>

                    <button className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-gold/80 group-hover:text-gold transition-all duration-300">
                      <span>Voir les détails</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>

                  {/* Corner Accent */}
                  <div className="absolute bottom-0 right-0 w-0 h-0 border-b-[20px] border-r-[20px] border-b-gold/20 border-r-transparent opacity-0 group-hover:opacity-100 transition-all" />
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── Strategic Projects ───────────────────────────────────── */}
      <section className="py-32 bg-bg-secondary relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
          style={{ backgroundImage: "radial-gradient(circle, #C9973A 1px, transparent 1px)", backgroundSize: "40px 40px" }}
        />

        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <AnimatedSection className="text-center mb-24">
            <h2 className="text-4xl md:text-6xl font-serif italic text-text-primary mb-6">Écosystèmes Digitaux</h2>
            <GoldDivider className="mx-auto" />
            <p className="mt-8 text-text-secondary max-w-2xl mx-auto text-lg leading-relaxed">
              Découvrez nos plateformes technologiques conçues pour propulser les entreprises africaines dans la nouvelle économie.
            </p>
          </AnimatedSection>

          <div className="space-y-16">
            {visibleProjects.map((project, idx) => (
              <AnimatedSection key={project.id}>
                <div className="group relative overflow-hidden rounded-sm border border-border-subtle bg-bg-card p-1 md:p-12 transition-all duration-500 hover:border-gold/30">
                  {/* Subtle background glow */}
                  <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-gold/10 to-transparent blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`} />
                  
                  <div className="relative z-10 flex flex-col md:flex-row gap-10 items-center">
                    <div className="flex-1 text-left">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-px bg-gold" />
                        <span className="text-gold text-[10px] uppercase tracking-[0.3em] font-bold">{project.tagline}</span>
                      </div>
                      
                      <h3 className="text-4xl font-serif text-text-primary italic mb-6">{project.title}</h3>
                      <p className="text-text-secondary text-lg leading-relaxed mb-10 max-w-xl">
                        {project.description}
                      </p>
                      
                      <a 
                        href={project.link} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="inline-flex items-center gap-4 px-8 py-4 border border-gold/40 text-gold text-xs uppercase tracking-[0.2em] font-bold hover:bg-gold hover:text-bg-primary transition-all duration-500 group/btn"
                      >
                        {project.linkLabel}
                        <ExternalLink className="w-4 h-4 group-hover/btn:rotate-12 transition-transform" />
                      </a>
                    </div>
                    
                    <div className="w-full md:w-1/3 flex justify-center">
                       <div className="w-32 h-32 md:w-48 md:h-48 rounded-full border border-gold/10 flex items-center justify-center relative">
                          <div className="absolute inset-0 rounded-full border border-gold/5 animate-ping opacity-20" />
                          <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border border-gold/30 flex items-center justify-center bg-bg-primary shadow-[0_0_50px_rgba(201,151,58,0.1)]">
                             <span className="text-4xl font-serif text-gold italic">UBB</span>
                          </div>
                       </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── Newsletter Section ───────────────────────────────────── */}
      <section className="py-32 relative border-t border-border-subtle">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-serif italic text-text-primary mb-8">Ne manquez aucune opportunité</h2>
            <p className="text-text-secondary mb-12 text-lg">
              Inscrivez-vous pour recevoir nos analyses stratégiques et annonces exclusives directement dans votre boîte mail.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <input 
                type="email" 
                placeholder="Votre adresse email" 
                className="flex-1 bg-bg-secondary border border-border-subtle px-6 py-4 text-text-primary focus:outline-none focus:border-gold/50 transition-colors"
              />
              <button className="px-8 py-4 bg-gold-gradient text-bg-primary font-bold uppercase tracking-widest text-xs hover:shadow-[0_0_20px_rgba(201,151,58,0.3)] transition-all">
                S'abonner
              </button>
            </div>
          </AnimatedSection>
        </div>
      </section>

    </div>
  );
}
