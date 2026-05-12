import { motion } from "motion/react";
import { ArrowRight, CheckCircle, Database, Layout, TrendingUp } from "lucide-react";
import AnimatedSection from "../components/ui/AnimatedSection";
import GoldDivider from "../components/ui/GoldDivider";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-[20s] scale-110 motion-safe:animate-[pulse_10s_ease-in-out_infinite]"
          style={{ backgroundImage: "url('https://d1yei2z3i6k35z.cloudfront.net/10694324/6943262fb4eee_WhatsAppImage2025-11-20at15.08.2711.jpeg')" }}
        />
        <div className="absolute inset-0 bg-bg-primary/80" />
        <div className="absolute inset-0 gold-glow opacity-60" />
        
        <div className="relative max-w-5xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-6xl md:text-8xl font-serif font-bold text-text-primary mb-6 leading-tight">
              Ubuntu Business <br /> Builders
            </h1>
            <p className="text-gold text-xl md:text-2xl italic font-serif mb-8 mb-12">
              Partenaire pour la croissance des PME Africaines
            </p>
            <div className="max-w-3xl mx-auto">
              <p className="text-text-secondary md:text-lg leading-relaxed mb-10">
                Cabinet de conseil panafricain aidant les PME africaines établies à croître durablement en mettant en œuvre des systèmes de croissance sur mesure, en transformant les mentalités de leadership et en bâtissant des cultures d'entreprise résiliantes enracinées dans la philosophie Ubuntu.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-6">
              <button className="px-8 py-4 bg-gold text-bg-primary font-bold uppercase tracking-widest hover:bg-gold-light transition-all flex items-center gap-2 group">
                Découvrir nos services
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        </div>

        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-muted text-[10px] uppercase tracking-[0.3em]">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-gold to-transparent" />
        </motion.div>
      </section>

      {/* Vision & Mission */}
      <section className="py-24 bg-bg-secondary relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <AnimatedSection>
              <div className="relative aspect-4/5 overflow-hidden rounded-sm border border-border-subtle group">
                <img 
                  src="https://d1yei2z3i6k35z.cloudfront.net/10694324/692304542b118_photo2.jpg" 
                  alt="Ubuntu Vision" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gold/10 mix-blend-overlay" />
              </div>
            </AnimatedSection>

            <div className="space-y-16">
              <AnimatedSection delay={0.2}>
                <h2 className="text-4xl md:text-5xl font-serif mb-6 text-text-primary italic">Notre Vision</h2>
                <GoldDivider className="mb-8" />
                <p className="text-xl text-text-secondary leading-relaxed font-light italic">
                  "Devenir le conseiller et partenaire de confiance des PME africaines, en les accompagnant vers une réussite entrepreneuriale durable et significative."
                </p>
              </AnimatedSection>

              <AnimatedSection delay={0.4}>
                <h2 className="text-4xl md:text-5xl font-serif mb-6 text-text-primary italic">Notre Mission</h2>
                <GoldDivider className="mb-8" />
                <p className="text-xl text-text-secondary leading-relaxed font-light italic">
                  "Soutenir durablement les PME africaines pour un succès et un impact durables."
                </p>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* Nos Offres */}
      <section className="py-24 bg-bg-primary">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <AnimatedSection>
              <h2 className="text-5xl font-serif italic text-text-primary mb-4">Nos Offres</h2>
              <GoldDivider className="mx-auto" />
            </AnimatedSection>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             {[
               {
                 title: "Diagnostic complet",
                 desc: "Évaluation de votre marketing, de vos processus internes, de votre gestion financière et de vos opportunités de croissance.",
                 image: "https://d1yei2z3i6k35z.cloudfront.net/6359213/6758345179a83_Gemini_Generated_Image_tj4ogetj4ogetj4o.jpeg"
               },
               {
                 title: "Conseils personnalisés",
                 desc: "Nos analyses nous aident à élaborer un plan d'action sur mesure.",
                 image: "https://d1yei2z3i6k35z.cloudfront.net/6359213/67579180c9f8a_Screenshot_20241210_003614_Gallery.jpg"
               },
               {
                 title: "Exécution",
                 desc: "Nous vous accompagnons dans la mise en œuvre de notre plan d'action et du suivi de son impact.",
                 image: "https://d1yei2z3i6k35z.cloudfront.net/6359213/6757919f2c880_Screenshot_20241210_003225_Gallery.jpg"
               }
             ].map((offres, idx) => (
               <AnimatedSection key={idx} delay={idx * 0.1} className="h-full">
                 <div className="group bg-bg-card border border-border-subtle h-full flex flex-col hover:border-gold/50 transition-all duration-500 overflow-hidden">
                    <div className="aspect-video overflow-hidden">
                      <img src={offres.image} alt={offres.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
                    </div>
                    <div className="p-8">
                      <h3 className="text-2xl font-serif text-gold mb-4 italic">{offres.title}</h3>
                      <p className="text-text-secondary leading-relaxed">{offres.desc}</p>
                    </div>
                 </div>
               </AnimatedSection>
             ))}
          </div>
        </div>
      </section>

      {/* Critères PME */}
      <section className="py-24 bg-bg-secondary">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <AnimatedSection>
              <h2 className="text-5xl font-serif italic text-text-primary mb-4">Un Service Destiné aux PME en Afrique</h2>
              <GoldDivider className="mx-auto" />
            </AnimatedSection>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                text: "Opérationnelles depuis au moins 3 ans et implantées dans des centres urbains.",
                image: "https://d1yei2z3i6k35z.cloudfront.net/6359213/6757964ae55ac_Screenshot_20241210_003012_Gallery.jpg"
              },
              {
                text: "Répertoriées dans les registres commerciaux et fiscaux de leur pays.",
                image: "https://d1yei2z3i6k35z.cloudfront.net/6359213/675834c0d05b8_Screenshot_20241210_003140_Gallery.jpg"
              },
              {
                text: "Confrontées à des difficultés majeures dans tous les départements.",
                image: "https://d1yei2z3i6k35z.cloudfront.net/6359213/675819bfabf56_Screenshot_20241210_003851_Gallery.jpg"
              }
            ].map((critere, idx) => (
              <AnimatedSection key={idx} delay={idx * 0.2} className="text-center">
                <div className="w-24 h-24 mx-auto mb-8 rounded-full overflow-hidden border border-gold hover:scale-110 transition-transform">
                  <img src={critere.image} alt="Critère" className="w-full h-full object-cover" />
                </div>
                <p className="text-text-secondary leading-relaxed px-4 italic">{critere.text}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Méthodologie */}
      <section className="py-24 bg-bg-primary overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="order-2 lg:order-1">
              <AnimatedSection>
                <h2 className="text-5xl font-serif italic text-text-primary mb-12">Notre Méthodologie</h2>
              </AnimatedSection>
              
              <div className="space-y-8">
                {[
                  { icon: <Database />, title: "Analyse de la donnée", sub: "Étude approfondie de vos documents internes." },
                  { icon: <CheckCircle />, title: "Entretiens", sub: "Échanges avec vos équipes dirigeantes pour mieux comprendre vos enjeux." },
                  { icon: <Layout />, title: "Reporting", sub: "Production de rapports clairs et concis présentant nos analyses et recommandations." },
                  { icon: <TrendingUp />, title: "Accompagnement opérationnel", sub: "Suivre l'avancement des actions à travers des réunions régulières." }
                ].map((step, idx) => (
                  <AnimatedSection key={idx} delay={idx * 0.1}>
                    <div className="flex gap-6 group">
                      <div className="w-12 h-12 flex-shrink-0 bg-gold-dim border border-gold/30 rounded-xs flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-bg-primary transition-all duration-300">
                        {step.icon}
                      </div>
                      <div>
                        <h4 className="text-xl font-serif text-text-primary mb-1 group-hover:text-gold transition-colors">{idx + 1}. {step.title}</h4>
                        <p className="text-text-secondary italic">{step.sub}</p>
                      </div>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </div>

            <AnimatedSection className="order-1 lg:order-2">
              <div className="relative">
                <div className="absolute -inset-4 border border-gold/20 motion-safe:animate-pulse" />
                <div className="relative aspect-square overflow-hidden rounded-xs border border-border-subtle">
                  <img src="https://d1yei2z3i6k35z.cloudfront.net/10694324/692106ab93242_WhatsAppImage2025-11-20at15.08.28.jpeg" alt="Methodologie" className="w-full h-full object-cover" />
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Message du CEO */}
      <section className="py-24 bg-bg-secondary border-y border-border-subtle">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-center">
            <div className="lg:col-span-3">
              <AnimatedSection>
                <span className="text-gold uppercase tracking-[0.4em] text-[10px] mb-4 block">Manifeste</span>
                <h2 className="text-4xl md:text-6xl font-serif text-text-primary mb-10 leading-tight italic">
                  La Force Transformatrice de la Rigueur et de la Discipline
                </h2>
                <div className="space-y-6 text-text-secondary leading-relaxed font-light italic">
                  <p>
                    À Ubuntu Business Builders (UBB), nous croyons que pour transformer durablement une entreprise, il faut d'abord en transformer la structure et le fonctionnement. Nous aidons les PME africaines à bâtir une culture d'excellence où chaque processus est optimisé, chaque ressource maximisée et chaque vision réalisée.
                  </p>
                  <p>
                    Notre approche est ancrée dans l'esprit Ubuntu, car nous savons que la croissance individuelle d'une entreprise nourrit la prospérité collective de notre continent.
                  </p>
                </div>
                <div className="mt-12">
                  <p className="font-serif text-2xl text-gold italic">Ambrose Nzeyimana</p>
                  <p className="text-text-muted uppercase tracking-widest text-xs mt-1">CEO & Fondateur</p>
                </div>
              </AnimatedSection>
            </div>
            <div className="lg:col-span-2">
              <AnimatedSection delay={0.3}>
                <div className="relative p-4 border border-border-subtle bg-bg-card group">
                   <div className="absolute inset-0 bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                   <img src="https://d1yei2z3i6k35z.cloudfront.net/10694324/69f9d5444cd729.29932403_ambroseimage.jpeg" alt="Ambrose Nzeyimana" className="w-full object-cover relative z-10 grayscale hover:grayscale-0 transition-all duration-700" />
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* Ubuntu Section & CTA */}
      <section className="py-24 bg-bg-primary">
        <div className="max-w-7xl mx-auto px-6">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <AnimatedSection>
                <div className="rounded-sm overflow-hidden border border-border-subtle shadow-2xl">
                  <img src="https://d1yei2z3i6k35z.cloudfront.net/6359213/675883ce8eb04_Screenshot_20241210_180201_Chrome.jpg" alt="Ubuntu Approach" className="w-full h-auto" />
                </div>
              </AnimatedSection>

              <AnimatedSection delay={0.2}>
                <h2 className="text-4xl font-serif text-text-primary mb-8 italic">L'esprit d'Ubuntu au cœur de notre approche</h2>
                <p className="text-text-secondary leading-relaxed mb-10 italic">
                  Nous plaçons l'esprit d'Ubuntu au cœur de notre démarche. En intégrant des systèmes de croissance robustes et une éthique de leadership transformative, nous créons des environnements où l'humain et la performance s'épanouissent de concert.
                </p>
                
                <div className="relative p-8 border-2 border-gold bg-gold-dim group overflow-hidden">
                   <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-gold/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000" />
                   <h4 className="text-lg font-bold text-gold uppercase tracking-tighter mb-4">Offre Exclusive</h4>
                   <p className="text-text-primary font-bold text-xl mb-6">
                     RECEVEZ UN WORKBOOK GRATUIT INDIQUANT : <br />
                     <span className="text-gold-light">COMMENT AUGMENTER DE 30% VOS VENTES MENSUELLES EN 90 JOURS.</span>
                   </p>
                   <button className="px-6 py-3 bg-gold text-bg-primary font-bold uppercase tracking-widest hover:bg-gold-light transition-all flex items-center gap-2">
                     Obtenir le workbook
                   </button>
                </div>
              </AnimatedSection>
           </div>
        </div>
      </section>
    </div>
  );
}
