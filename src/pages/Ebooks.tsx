import AnimatedSection from "../components/ui/AnimatedSection";
import GoldDivider from "../components/ui/GoldDivider";

export default function Ebooks() {
  return (
    <div className="pt-32 flex flex-col w-full">
      <section className="py-20 bg-bg-primary">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <AnimatedSection>
            <img 
              src="https://d1yei2z3i6k35z.cloudfront.net/10694324/691e68ac86ecf_ubb.jpg" 
              alt="UBB Logo" 
              className="h-32 mx-auto mb-10 transition-all rounded-xs shadow-2xl brightness-110"
            />
            <h1 className="text-4xl md:text-6xl font-serif text-text-primary mb-6 italic">UBUNTU BUSINESS BUILDERS</h1>
            <p className="text-gold text-2xl italic font-serif mb-8 tracking-widest uppercase">Ressources Digitales</p>
            <GoldDivider className="mx-auto" />
          </AnimatedSection>
        </div>
      </section>

      <section className="py-24 bg-bg-secondary">
        <div className="max-w-7xl mx-auto px-6">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <AnimatedSection className="grid grid-cols-2 gap-4">
                 <div className="transform hover:-translate-y-4 transition-all duration-500 shadow-2xl">
                    <img src="https://d1yei2z3i6k35z.cloudfront.net/10694324/6899720e2dc39_COV2.png" alt="Library Ebook 1" className="w-full h-auto" />
                 </div>
                 <div className="transform translate-y-8 hover:-translate-y-4 transition-all duration-500 shadow-2xl">
                    <img src="https://d1yei2z3i6k35z.cloudfront.net/10694324/689972c2536ee_COV1.png" alt="Library Ebook 2" className="w-full h-auto" />
                 </div>
              </AnimatedSection>

              <AnimatedSection delay={0.3}>
                 <h2 className="text-3xl font-serif text-text-primary italic mb-10 leading-tight">Accédez à notre bibliothèque de ressources exclusives</h2>
                 <div className="space-y-6 text-text-secondary leading-relaxed italic border-l-2 border-gold/30 pl-8">
                    <p>Découvrez nos guides stratégiques, podcasts immersifs, cours vidéos détaillés et supports complémentaires conçus spécialement pour les PME africaines en quête de croissance.</p>
                    <ul className="space-y-4 font-light">
                      <li className="flex gap-4 items-start">
                        <span className="text-gold mt-1">✦</span>
                        <span>E-books stratégiques sur la finance et le marketing</span>
                      </li>
                      <li className="flex gap-4 items-start">
                        <span className="text-gold mt-1">✦</span>
                        <span>Séries de podcasts "Leadership Ubuntu"</span>
                      </li>
                      <li className="flex gap-4 items-start">
                        <span className="text-gold mt-1">✦</span>
                        <span>Workbooks d'exécution opérationnelle</span>
                      </li>
                    </ul>
                 </div>
              </AnimatedSection>
           </div>
        </div>
      </section>

      <section className="py-24 bg-bg-primary">
        <div className="max-w-4xl mx-auto px-6">
           <AnimatedSection className="bg-bg-card border border-border-subtle p-10 md:p-16 shadow-2xl relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-gold" />
              <h2 className="text-3xl font-serif text-gold italic mb-10 text-center">Formulaire de Commande</h2>
              <form className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="flex flex-col gap-2">
                    <label className="text-text-muted text-xs uppercase tracking-widest pl-1">Prénom</label>
                    <input type="text" className="bg-bg-primary border border-border-subtle p-4 text-text-primary focus:border-gold outline-none transition-all focus:bg-gold-dim" placeholder="Ex: Jean" />
                 </div>
                 <div className="flex flex-col gap-2">
                    <label className="text-text-muted text-xs uppercase tracking-widest pl-1">Nom</label>
                    <input type="text" className="bg-bg-primary border border-border-subtle p-4 text-text-primary focus:border-gold outline-none transition-all focus:bg-gold-dim" placeholder="Ex: Diop" />
                 </div>
                 <div className="flex flex-col gap-2 md:col-span-2">
                    <label className="text-text-muted text-xs uppercase tracking-widest pl-1">Email professionnel</label>
                    <input type="email" className="bg-bg-primary border border-border-subtle p-4 text-text-primary focus:border-gold outline-none transition-all focus:bg-gold-dim" placeholder="jean.diop@entreprise.com" />
                 </div>
                 <div className="flex flex-col gap-2">
                    <label className="text-text-muted text-xs uppercase tracking-widest pl-1">Ville</label>
                    <input type="text" className="bg-bg-primary border border-border-subtle p-4 text-text-primary focus:border-gold outline-none transition-all focus:bg-gold-dim" placeholder="Ex: Dakar" />
                 </div>
                 <div className="flex flex-col gap-2">
                    <label className="text-text-muted text-xs uppercase tracking-widest pl-1">Code postal</label>
                    <input type="text" className="bg-bg-primary border border-border-subtle p-4 text-text-primary focus:border-gold outline-none transition-all focus:bg-gold-dim" placeholder="Ex: 10000" />
                 </div>
                 <button className="md:col-span-2 mt-4 px-10 py-5 bg-gold text-bg-primary font-bold uppercase tracking-widest hover:bg-gold-light transition-all shadow-2xl">
                    Soumettre la commande
                 </button>
              </form>
           </AnimatedSection>
        </div>
      </section>

      <section className="py-24 bg-bg-secondary">
        <div className="max-w-7xl mx-auto px-6">
           <AnimatedSection className="text-center">
              <h3 className="text-3xl font-serif italic text-text-primary mb-12">Diagnostic d'Entreprise</h3>
              <div className="relative group max-w-5xl mx-auto">
                 <div className="absolute inset-0 bg-gold/5 blur-3xl rounded-full" />
                 <img 
                   src="https://d1yei2z3i6k35z.cloudfront.net/10694324/6942dc625f7ac_691dc15f6f652_grille-Recupere1.png" 
                   alt="Grille Diagnostic" 
                   className="w-full h-auto relative z-10 border border-border-subtle shadow-2xl group-hover:scale-[1.01] transition-transform duration-500" 
                 />
              </div>
           </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
