import AnimatedSection from "../components/ui/AnimatedSection";
import GoldDivider from "../components/ui/GoldDivider";

export default function Jobs() {
  return (
    <div className="pt-32 flex flex-col w-full">
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://d1yei2z3i6k35z.cloudfront.net/10694324/692da5faacfcd_41809.jpg')" }}
        />
        <div className="absolute inset-0 bg-bg-primary/70" />
        <div className="relative text-center px-6">
          <AnimatedSection>
            <h1 className="text-5xl md:text-7xl font-serif text-text-primary mb-6 italic">Partenaire Local UBB</h1>
            <p className="text-gold text-xl italic font-serif">Dans Votre Pays</p>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-24 bg-bg-primary">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <AnimatedSection>
              <h2 className="text-3xl font-serif italic text-text-primary mb-8 leading-tight">
                Vous souhaitez contribuer à la croissance du secteur des petites entreprises en Afrique ?
              </h2>
              <GoldDivider className="mb-10" />
              <div className="space-y-6 text-text-secondary leading-relaxed font-light italic">
                <p>
                  UBB recherche des partenaires locaux passionnés pour étendre son impact. Nous ciblons des experts et des leaders capables de porter la vision Ubuntu au sein de leurs communautés respectives.
                </p>
                <p>
                  Que vous soyez au Sénégal, au Mali, en Côte d'Ivoire, au Cameroun, en RDC ou partout ailleurs sur le continent, votre connaissance du terrain est notre plus grand atout.
                </p>
              </div>
              <div className="flex flex-wrap gap-6 mt-12">
                <a
                  href="https://www.growthubb.space/61331515"
                  target="_blank"
                  rel="noreferrer"
                  className="px-8 py-3 bg-gold text-bg-primary font-bold uppercase tracking-widest text-sm hover:translate-y-[-2px] transition-all shadow-lg"
                >
                  À propos d'UBB et rôle
                </a>
                <a
                  href="https://www.growthubb.space/b2c8b283"
                  target="_blank"
                  rel="noreferrer"
                  className="px-8 py-3 bg-bg-card border-2 border-gold text-gold font-bold uppercase tracking-widest text-sm hover:bg-gold hover:text-bg-primary transition-all"
                >
                  Apports & rémunération
                </a>
              </div>
            </AnimatedSection>
            
            <AnimatedSection delay={0.2}>
              <div className="relative group">
                <div className="absolute -inset-2 border border-gold/10 group-hover:-inset-4 transition-all" />
                <img 
                  src="https://d1yei2z3i6k35z.cloudfront.net/10694324/692dd47212f80_1202.jpg" 
                  alt="Jobs at UBB" 
                  className="w-full h-auto rounded-xs shadow-2xl relative z-10"
                />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section className="py-24 bg-bg-secondary">
        <div className="max-w-5xl mx-auto px-6 text-center">
           <AnimatedSection>
              <h3 className="text-3xl font-serif italic text-gold mb-12">Rémunération & Croissance</h3>
              <div className="relative rounded-sm overflow-hidden border border-border-subtle shadow-2xl">
                 <img src="https://d1yei2z3i6k35z.cloudfront.net/10694324/692f0c65e74dd_1831.jpg" alt="Rémunération" className="w-full h-auto" />
                 <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/40 to-transparent" />
              </div>
           </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
