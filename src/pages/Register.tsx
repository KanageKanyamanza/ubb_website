import { motion } from "motion/react";
import AnimatedSection from "../components/ui/AnimatedSection";
import GoldDivider from "../components/ui/GoldDivider";

export default function Register() {
  return (
    <div className="pt-32 flex flex-col w-full min-h-screen items-center justify-center bg-bg-primary relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[60vh] gold-glow opacity-30" />
      
      <div className="max-w-4xl w-full px-6 py-20 relative z-10">
        <AnimatedSection className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-serif text-text-primary mb-6 italic">Rejoindre la Communauté</h1>
          <p className="text-gold font-serif italic text-lg uppercase tracking-widest">Ubuntu Business Builders</p>
          <GoldDivider className="mx-auto mt-8" />
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <div className="bg-bg-secondary border border-border-subtle p-8 md:p-14 shadow-2xl rounded-xs">
            <form className="space-y-10">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="flex flex-col gap-3">
                    <label className="text-gold text-[10px] uppercase font-bold tracking-[0.2em] ml-1">Prénom</label>
                    <input 
                      type="text" 
                      className="bg-transparent border-b border-border-subtle py-3 text-text-primary outline-none focus:border-gold transition-colors placeholder:text-text-muted" 
                      placeholder="Jean-Paul"
                    />
                  </div>
                  <div className="flex flex-col gap-3">
                    <label className="text-gold text-[10px] uppercase font-bold tracking-[0.2em] ml-1">Nom</label>
                    <input 
                      type="text" 
                      className="bg-transparent border-b border-border-subtle py-3 text-text-primary outline-none focus:border-gold transition-colors placeholder:text-text-muted" 
                      placeholder="Ndiaye"
                    />
                  </div>
               </div>

               <div className="flex flex-col gap-3">
                  <label className="text-gold text-[10px] uppercase font-bold tracking-[0.2em] ml-1">Email Professionnel</label>
                  <input 
                    type="email" 
                    className="bg-transparent border-b border-border-subtle py-3 text-text-primary outline-none focus:border-gold transition-colors placeholder:text-text-muted" 
                    placeholder="contact@entreprise-africaine.com"
                  />
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="flex flex-col gap-3">
                    <label className="text-gold text-[10px] uppercase font-bold tracking-[0.2em] ml-1">Nom de l'Entreprise</label>
                    <input 
                      type="text" 
                      className="bg-transparent border-b border-border-subtle py-3 text-text-primary outline-none focus:border-gold transition-colors placeholder:text-text-muted" 
                      placeholder="Ex: Sahel Tech Solution"
                    />
                  </div>
                  <div className="flex flex-col gap-3">
                    <label className="text-gold text-[10px] uppercase font-bold tracking-[0.2em] ml-1">Secteur d'Activité</label>
                    <select className="bg-transparent border-b border-border-subtle py-3 text-text-primary outline-none focus:border-gold transition-colors appearance-none">
                      <option className="bg-bg-secondary text-text-primary">Agriculture & Agroalimentaire</option>
                      <option className="bg-bg-secondary text-text-primary">Technologie & Digital</option>
                      <option className="bg-bg-secondary text-text-primary">Construction & Immobilier</option>
                      <option className="bg-bg-secondary text-text-primary">Services Financiers</option>
                      <option className="bg-bg-secondary text-text-primary">Autre</option>
                    </select>
                  </div>
               </div>

               <div className="pt-8">
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-5 bg-gold text-bg-primary font-bold uppercase tracking-[0.2em] text-sm hover:bg-gold-light transition-all shadow-xl"
                  >
                    Rejoindre la communauté UBB
                  </motion.button>
               </div>
            </form>
            
            <p className="mt-12 text-center text-text-muted text-xs italic leading-loose">
              En nous rejoignant, vous acceptez de recevoir nos communications stratégiques et nos offres exclusives destinées à la croissance des PME africaines.
            </p>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
