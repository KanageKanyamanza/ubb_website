import AnimatedSection from "../components/ui/AnimatedSection";
import GoldDivider from "../components/ui/GoldDivider";
import { newsGallery } from "../data/news";

export default function Actualites() {
  return (
    <div className="pt-32 flex flex-col w-full">
      <section className="py-20 bg-bg-primary border-b border-border-subtle">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <AnimatedSection>
            <h1 className="text-5xl md:text-7xl font-serif text-text-primary mb-6 italic">Actualités UBB</h1>
            <p className="text-gold text-xl italic font-serif mb-8">Restez informé de nos activités et opportunités</p>
            <GoldDivider className="mx-auto" />
          </AnimatedSection>
        </div>
      </section>

      <section className="py-24 bg-bg-primary">
        <div className="max-w-7xl mx-auto px-6">
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {newsGallery.map((img, idx) => (
                <AnimatedSection key={idx} delay={idx * 0.1}>
                  <div className="group relative aspect-square overflow-hidden border border-border-subtle bg-bg-card cursor-pointer">
                    <img 
                      src={img} 
                      alt={`Actualité ${idx + 1}`} 
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110" 
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gold/20 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                       <span className="px-6 py-2 border border-text-primary text-text-primary text-xs uppercase tracking-widest font-bold bg-bg-primary/40 backdrop-blur-sm">
                          Agrandir
                       </span>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
           </div>
        </div>
      </section>

      <section className="py-24 bg-bg-secondary">
        <div className="max-w-4xl mx-auto px-6 text-center">
           <AnimatedSection>
              <h2 className="text-3xl font-serif text-gold italic mb-10 leading-tight tracking-wide uppercase">Derniers Projets Strategiques</h2>
              <div className="space-y-12">
                 <div className="p-10 border border-border-subtle bg-bg-card hover:border-gold/30 transition-all text-left">
                    <h3 className="text-2xl font-serif text-text-primary mb-4 italic">VitalCHECK</h3>
                    <p className="text-text-secondary italic mb-8 leading-relaxed">
                      Découvrez notre outil de diagnostic révolutionnaire pour les PME. VitalCHECK permet d'identifier en quelques minutes les goulots d'étranglement de votre croissance.
                    </p>
                    <a href="https://www.checkmyenterprise.com/pricing" target="_blank" rel="noreferrer" className="text-gold text-sm font-bold uppercase tracking-widest hover:text-gold-light">En savoir plus →</a>
                 </div>
                 
                 <div className="p-10 border border-border-subtle bg-bg-card hover:border-gold/30 transition-all text-left">
                    <h3 className="text-2xl font-serif text-text-primary mb-4 italic">HARVESTS 2.0</h3>
                    <p className="text-text-secondary italic mb-8 leading-relaxed">
                      Le futur de la gestion commerciale en Afrique est arrivé. HARVESTS 2.0 propose une suite logicielle adaptée aux réalités du marché local.
                    </p>
                    <a href="https://harvests.site/pricing/" target="_blank" rel="noreferrer" className="text-gold text-sm font-bold uppercase tracking-widest hover:text-gold-light">En savoir plus →</a>
                 </div>
              </div>
           </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
