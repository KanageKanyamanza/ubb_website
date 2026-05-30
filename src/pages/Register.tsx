import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import AnimatedSection from "../components/ui/AnimatedSection";
import GoldDivider from "../components/ui/GoldDivider";
import { useSEO } from "../hooks/useSEO";
import { useLanguage } from "../context/LanguageContext";

const backgroundImages = [
  "/images/register-1.png",
  "/images/register-2.png",
  "/images/register-3.png"
];

export default function Register() {
  const { t } = useLanguage();

  useSEO({
    title: t("register.seoTitle"),
    description: t("register.seoDesc"),
    keywords: "inscription ubb, rejoindre ubuntu, vitalcheck gratuit, harvests crm, acceleration croissance afrique",
    ogImage: "https://d1yei2z3i6k35z.cloudfront.net/10694324/6943262fb4eee_WhatsAppImage2025-11-20at15.08.2711.jpeg"
  });

  const [currentImage, setCurrentImage] = useState(0);
  const [form, setForm] = useState({
    prenom: "", nom: "", email: "", entreprise: "", secteur: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % backgroundImages.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1400);
  };

  return (
    <div className="pt-32 flex flex-col w-full min-h-screen items-center justify-center bg-bg-primary relative overflow-hidden">
      
      {/* â”€â”€ Background Slideshow (Sliding effect) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
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
            {t("register.hero.tag")}
          </motion.span>
          <h1 className="text-5xl md:text-7xl font-serif text-text-primary mb-6 italic">{t("register.hero.title")}</h1>
          <p className="text-gold font-serif italic text-lg uppercase tracking-widest">{t("register.hero.desc")}</p>
          <GoldDivider className="mx-auto mt-8" />
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <div className="bg-bg-secondary/80 backdrop-blur-xl border border-gold/20 p-8 md:p-14 shadow-2xl rounded-2xl relative overflow-hidden group">
            {/* Subtle inner glow */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-gold/10 rounded-full blur-3xl group-hover:bg-gold/20 transition-colors duration-500" />
            
            <AnimatePresence mode="wait">
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-10 relative z-10">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      <div className="flex flex-col gap-3">
                        <label className="text-gold text-[10px] uppercase font-bold tracking-[0.2em] ml-1">{t("register.form.firstName")}</label>
                        <input 
                          type="text" 
                          name="prenom"
                          required
                          value={form.prenom}
                          onChange={handleChange}
                          className="bg-transparent border-b border-border-subtle py-3 text-text-primary outline-none focus:border-gold transition-all duration-300 placeholder:text-text-muted/50" 
                          placeholder="Jean-Paul"
                        />
                      </div>
                      <div className="flex flex-col gap-3">
                        <label className="text-gold text-[10px] uppercase font-bold tracking-[0.2em] ml-1">{t("register.form.lastName")}</label>
                        <input 
                          type="text" 
                          name="nom"
                          required
                          value={form.nom}
                          onChange={handleChange}
                          className="bg-transparent border-b border-border-subtle py-3 text-text-primary outline-none focus:border-gold transition-all duration-300 placeholder:text-text-muted/50" 
                          placeholder="Ndiaye"
                        />
                      </div>
                   </div>

                   <div className="flex flex-col gap-3">
                      <label className="text-gold text-[10px] uppercase font-bold tracking-[0.2em] ml-1">{t("register.form.email")}</label>
                      <input 
                        type="email" 
                        name="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        className="bg-transparent border-b border-border-subtle py-3 text-text-primary outline-none focus:border-gold transition-all duration-300 placeholder:text-text-muted/50" 
                        placeholder="contact@entreprise-africaine.com"
                      />
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      <div className="flex flex-col gap-3">
                        <label className="text-gold text-[10px] uppercase font-bold tracking-[0.2em] ml-1">{t("register.form.company")}</label>
                        <input 
                          type="text" 
                          name="entreprise"
                          required
                          value={form.entreprise}
                          onChange={handleChange}
                          className="bg-transparent border-b border-border-subtle py-3 text-text-primary outline-none focus:border-gold transition-all duration-300 placeholder:text-text-muted/50" 
                          placeholder="Ex: Sahel Tech Solution"
                        />
                      </div>
                      <div className="flex flex-col gap-3">
                        <label className="text-gold text-[10px] uppercase font-bold tracking-[0.2em] ml-1">{t("register.form.industry")}</label>
                        <div className="relative">
                          <select 
                            name="secteur"
                            required
                            value={form.secteur}
                            onChange={handleChange}
                            className="w-full bg-transparent border-b border-border-subtle py-3 text-text-primary outline-none focus:border-gold transition-all duration-300 appearance-none cursor-pointer"
                          >
                            <option className="bg-bg-secondary text-text-primary" value="">{t("register.form.industryPlaceholder")}</option>
                            <option className="bg-bg-secondary text-text-primary" value="Agro">{t("register.form.industry1")}</option>
                            <option className="bg-bg-secondary text-text-primary" value="Tech">{t("register.form.industry2")}</option>
                            <option className="bg-bg-secondary text-text-primary" value="Construction">{t("register.form.industry3")}</option>
                            <option className="bg-bg-secondary text-text-primary" value="Finance">{t("register.form.industry4")}</option>
                            <option className="bg-bg-secondary text-text-primary" value="Other">{t("register.form.industry5")}</option>
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
                        whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(184,115,51, 0.4)" }}
                        whileTap={{ scale: 0.98 }}
                        disabled={loading}
                        type="submit"
                        className="w-full md:w-auto px-12 py-5 bg-gold text-bg-primary font-bold uppercase tracking-[0.2em] text-sm hover:bg-gold-light transition-all rounded-full shadow-2xl relative group overflow-hidden disabled:opacity-75 disabled:cursor-wait"
                      >
                        <span className="relative z-10">
                          {loading ? t("postuler.form.submitting") : t("register.form.submit")}
                        </span>
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                      </motion.button>
                   </div>
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-10 relative z-10"
                >
                  <div className="w-20 h-20 rounded-full bg-gold/10 border-2 border-gold flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-3xl font-serif text-text-primary mb-4">{t("register.form.successTitle")}</h3>
                  <p className="text-text-secondary text-lg leading-relaxed mb-8 max-w-xl mx-auto">
                    {t("register.form.successDesc")}
                  </p>
                  <a
                    href="/ebooks"
                    className="px-10 py-4 bg-gold text-bg-primary font-bold uppercase tracking-widest text-xs rounded-full hover:bg-gold-light transition-all hover:scale-105 active:scale-95 hover:shadow-[0_0_30px_rgba(184,115,51,0.4)]"
                  >
                    {t("register.form.successCta")}
                  </a>
                </motion.div>
              )}
            </AnimatePresence>
            
            <p className="mt-12 text-center text-text-muted text-[10px] italic leading-loose">
              {t("register.form.disclaimer")}
            </p>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}

