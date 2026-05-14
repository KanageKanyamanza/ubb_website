import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import AnimatedSection from "../components/ui/AnimatedSection";
import GoldDivider from "../components/ui/GoldDivider";

const backgroundImages = [
  "/images/register-1.png",
  "/images/register-2.png",
  "/images/register-3.png"
];

export default function Register() {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % backgroundImages.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="pt-32 flex flex-col w-full min-h-screen items-center justify-center bg-bg-primary relative overflow-hidden">
      
      {/* ── Background Slideshow (Sliding effect) ─────────────────── */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-bg-primary">
        {/* Fallback static background */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{ backgroundImage: `url(${backgroundImages[0]})` }}
        />

        <AnimatePresence initial={false}>
          {backgroundImages.length > 0 && (
            <motion.div
              key={currentImage}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${backgroundImages[currentImage % backgroundImages.length]})` }}
            />
          )}
        </AnimatePresence>
        
        {/* Multi-layer overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-bg-primary/90 via-bg-primary/70 to-bg-primary/95" />
        <div className="absolute inset-0 bg-gold/5 mix-blend-overlay" />
        <div className="absolute inset-0 gold-glow opacity-30" />
      </div>
      
      <div className="max-w-4xl w-full px-6 py-20 relative z-10">
        <AnimatedSection className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-gold text-[10px] uppercase tracking-[0.4em] font-bold mb-4 block"
          >
            Opportunité de Croissance
          </motion.span>
          <h1 className="text-5xl md:text-7xl font-serif text-text-primary mb-6 italic">Rejoindre la Communauté</h1>
          <p className="text-gold font-serif italic text-lg uppercase tracking-widest">Ubuntu Business Builders</p>
          <GoldDivider className="mx-auto mt-8" />
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <div className="bg-bg-secondary/80 backdrop-blur-xl border border-gold/20 p-8 md:p-14 shadow-2xl rounded-2xl relative overflow-hidden group">
            {/* Subtle inner glow */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-gold/10 rounded-full blur-3xl group-hover:bg-gold/20 transition-colors duration-500" />
            
            <form className="space-y-10 relative z-10">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="flex flex-col gap-3">
                    <label className="text-gold text-[10px] uppercase font-bold tracking-[0.2em] ml-1">Prénom</label>
                    <input 
                      type="text" 
                      className="bg-transparent border-b border-border-subtle py-3 text-text-primary outline-none focus:border-gold transition-all duration-300 placeholder:text-text-muted/50" 
                      placeholder="Jean-Paul"
                    />
                  </div>
                  <div className="flex flex-col gap-3">
                    <label className="text-gold text-[10px] uppercase font-bold tracking-[0.2em] ml-1">Nom</label>
                    <input 
                      type="text" 
                      className="bg-transparent border-b border-border-subtle py-3 text-text-primary outline-none focus:border-gold transition-all duration-300 placeholder:text-text-muted/50" 
                      placeholder="Ndiaye"
                    />
                  </div>
               </div>

               <div className="flex flex-col gap-3">
                  <label className="text-gold text-[10px] uppercase font-bold tracking-[0.2em] ml-1">Email Professionnel</label>
                  <input 
                    type="email" 
                    className="bg-transparent border-b border-border-subtle py-3 text-text-primary outline-none focus:border-gold transition-all duration-300 placeholder:text-text-muted/50" 
                    placeholder="contact@entreprise-africaine.com"
                  />
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="flex flex-col gap-3">
                    <label className="text-gold text-[10px] uppercase font-bold tracking-[0.2em] ml-1">Nom de l'Entreprise</label>
                    <input 
                      type="text" 
                      className="bg-transparent border-b border-border-subtle py-3 text-text-primary outline-none focus:border-gold transition-all duration-300 placeholder:text-text-muted/50" 
                      placeholder="Ex: Sahel Tech Solution"
                    />
                  </div>
                  <div className="flex flex-col gap-3">
                    <label className="text-gold text-[10px] uppercase font-bold tracking-[0.2em] ml-1">Secteur d'Activité</label>
                    <div className="relative">
                      <select className="w-full bg-transparent border-b border-border-subtle py-3 text-text-primary outline-none focus:border-gold transition-all duration-300 appearance-none cursor-pointer">
                        <option className="bg-bg-secondary text-text-primary">Agriculture & Agroalimentaire</option>
                        <option className="bg-bg-secondary text-text-primary">Technologie & Digital</option>
                        <option className="bg-bg-secondary text-text-primary">Construction & Immobilier</option>
                        <option className="bg-bg-secondary text-text-primary">Services Financiers</option>
                        <option className="bg-bg-secondary text-text-primary">Autre</option>
                      </select>
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none">
                        <svg className="w-4 h-4 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>
               </div>

               <div className="pt-8 text-center">
                  <motion.button 
                    whileHover={{ scale: 1.05, shadow: "0 0 30px rgba(201, 151, 58, 0.4)" }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full md:w-auto px-12 py-5 bg-gold text-bg-primary font-bold uppercase tracking-[0.2em] text-sm hover:bg-gold-light transition-all rounded-full shadow-2xl relative group overflow-hidden"
                  >
                    <span className="relative z-10">Rejoindre la communauté UBB</span>
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  </motion.button>
               </div>
            </form>
            
            <p className="mt-12 text-center text-text-muted text-[10px] italic leading-loose">
              En nous rejoignant, vous acceptez de recevoir nos communications stratégiques et nos offres exclusives destinées à la croissance des PME africaines.
            </p>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}

