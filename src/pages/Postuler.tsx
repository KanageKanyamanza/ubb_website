// src/pages/Postuler.tsx
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, CheckCircle, Globe, Award, Users, Briefcase, ChevronDown } from "lucide-react";
import AnimatedSection from "../components/ui/AnimatedSection";
import GoldDivider from "../components/ui/GoldDivider";
import { useSEO } from "../hooks/useSEO";
import { useLanguage } from "../context/LanguageContext";

export default function Postuler() {
  const { t } = useLanguage();

  useSEO({
    title: t("postuler.seoTitle"),
    description: t("postuler.seoDesc"),
    keywords: "partenaire local ubb, postuler, partenariat afrique, ubuntu business builders",
  });

  const [form, setForm] = useState({
    prenom: "", nom: "", email: "", telephone: "", pays: "", linkedin: "", motivation: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
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

  const pays = [
    { value: "Sénégal", label: t("countries.senegal") },
    { value: "Côte d'Ivoire", label: t("countries.cote_divoire") },
    { value: "Cameroun", label: t("countries.cameroun") },
    { value: "Mali", label: t("countries.mali") },
    { value: "Burkina Faso", label: t("countries.burkina_faso") },
    { value: "RDC", label: t("countries.rdc") },
    { value: "Congo", label: t("countries.congo") },
    { value: "Togo", label: t("countries.togo") },
    { value: "Bénin", label: t("countries.benin") },
    { value: "Guinée", label: t("countries.guinee") },
    { value: "Niger", label: t("countries.niger") },
    { value: "Mauritanie", label: t("countries.mauritanie") },
    { value: "Gabon", label: t("countries.gabon") },
    { value: "Tchad", label: t("countries.tchad") },
    { value: "Madagascar", label: t("countries.madagascar") },
    { value: "Autre pays africain", label: t("countries.autre") }
  ];

  const benefits = [
    { icon: <Globe className="w-6 h-6 text-gold" />, title: t("postuler.benefits.card1Title"), desc: t("postuler.benefits.card1Desc") },
    { icon: <Award className="w-6 h-6 text-gold" />, title: t("postuler.benefits.card2Title"), desc: t("postuler.benefits.card2Desc") },
    { icon: <Users className="w-6 h-6 text-gold" />, title: t("postuler.benefits.card3Title"), desc: t("postuler.benefits.card3Desc") },
    { icon: <Briefcase className="w-6 h-6 text-gold" />, title: t("postuler.benefits.card4Title"), desc: t("postuler.benefits.card4Desc") },
  ];

  const faqs = [
    { q: t("postuler.faq.q1"), a: t("postuler.faq.a1") },
    { q: t("postuler.faq.q2"), a: t("postuler.faq.a2") },
    { q: t("postuler.faq.q3"), a: t("postuler.faq.a3") },
    { q: t("postuler.faq.q4"), a: t("postuler.faq.a4") },
  ];

  return (
    <div className="flex flex-col w-full min-h-screen bg-bg-primary">

      {/* ── HERO ──────────────────────────────────────────── */}
      <section className="relative pt-48 pb-24 overflow-hidden border-b border-border-subtle">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-15"
          style={{ backgroundImage: "url('https://d1yei2z3i6k35z.cloudfront.net/10694324/692da5faacfcd_41809.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-bg-primary/95 via-bg-primary/80 to-bg-primary" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gold/10 blur-[140px] rounded-full pointer-events-none" />

        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <AnimatedSection>
            <span className="text-gold text-[11px] uppercase tracking-[0.5em] font-bold block mb-8">{t("postuler.hero.tag")}</span>
            <h1 className="text-6xl md:text-8xl font-serif text-text-primary mb-8 italic leading-[1.1]">
              {t("postuler.hero.titleLine1")}<br />
              <span className="text-gold-gradient not-italic">{t("postuler.hero.titleLine2")}</span>
            </h1>
            <p className="text-text-secondary text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
              {t("postuler.hero.desc")}
            </p>
            <GoldDivider className="mx-auto" />
          </AnimatedSection>
        </div>
      </section>

      {/* ── BENEFITS ──────────────────────────────────────── */}
      <section className="py-20 bg-bg-secondary border-b border-border-subtle">
        <div className="max-w-6xl mx-auto px-6">
          <AnimatedSection className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-serif italic text-text-primary mb-4">{t("postuler.benefits.title")}</h2>
            <p className="text-text-secondary">{t("postuler.benefits.desc")}</p>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((b, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="bg-bg-card border border-border-subtle rounded-2xl p-8 h-full hover:border-gold/30 transition-all hover:shadow-[0_8px_30px_rgba(201,151,58,0.08)] group">
                  <div className="w-12 h-12 rounded-xl bg-bg-secondary border border-border-subtle flex items-center justify-center mb-6 group-hover:border-gold/40 transition-colors">
                    {b.icon}
                  </div>
                  <h3 className="text-lg font-serif text-text-primary mb-3">{b.title}</h3>
                  <p className="text-text-muted text-sm leading-relaxed">{b.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── FORM + FAQ ────────────────────────────────────── */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

            {/* Form */}
            <AnimatedSection>
              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="bg-bg-card border border-border-subtle rounded-2xl p-10 relative overflow-hidden"
                  >
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
                    <h3 className="text-2xl font-serif text-text-primary mb-2">{t("postuler.form.title")}</h3>
                    <p className="text-text-secondary text-sm mb-8">{t("postuler.form.subtitle")}</p>

                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[11px] font-bold uppercase tracking-widest text-text-muted mb-2">{t("postuler.form.prenom")}</label>
                          <input type="text" name="prenom" required value={form.prenom} onChange={handleChange} placeholder="Jean"
                            className="w-full bg-bg-secondary border border-border-subtle rounded-xl px-4 py-3 text-text-primary text-sm placeholder-text-muted focus:outline-none focus:border-gold/60 transition-colors" />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold uppercase tracking-widest text-text-muted mb-2">{t("postuler.form.nom")}</label>
                          <input type="text" name="nom" required value={form.nom} onChange={handleChange} placeholder="Koné"
                            className="w-full bg-bg-secondary border border-border-subtle rounded-xl px-4 py-3 text-text-primary text-sm placeholder-text-muted focus:outline-none focus:border-gold/60 transition-colors" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-widest text-text-muted mb-2">{t("postuler.form.email")}</label>
                        <input type="email" name="email" required value={form.email} onChange={handleChange} placeholder="vous@exemple.com"
                          className="w-full bg-bg-secondary border border-border-subtle rounded-xl px-4 py-3 text-text-primary text-sm placeholder-text-muted focus:outline-none focus:border-gold/60 transition-colors" />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[11px] font-bold uppercase tracking-widest text-text-muted mb-2">{t("postuler.form.telephone")}</label>
                          <input type="tel" name="telephone" required value={form.telephone} onChange={handleChange} placeholder="+225 00 00 00 00"
                            className="w-full bg-bg-secondary border border-border-subtle rounded-xl px-4 py-3 text-text-primary text-sm placeholder-text-muted focus:outline-none focus:border-gold/60 transition-colors" />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold uppercase tracking-widest text-text-muted mb-2">{t("postuler.form.pays")}</label>
                          <select name="pays" required value={form.pays} onChange={handleChange}
                            className="w-full bg-bg-secondary border border-border-subtle rounded-xl px-4 py-3 text-text-primary text-sm focus:outline-none focus:border-gold/60 transition-colors appearance-none">
                            <option value="">{t("postuler.form.paysPlaceholder")}</option>
                            {pays.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-widest text-text-muted mb-2">{t("postuler.form.linkedin")}</label>
                        <input type="url" name="linkedin" value={form.linkedin} onChange={handleChange} placeholder="https://linkedin.com/in/votre-profil"
                          className="w-full bg-bg-secondary border border-border-subtle rounded-xl px-4 py-3 text-text-primary text-sm placeholder-text-muted focus:outline-none focus:border-gold/60 transition-colors" />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-widest text-text-muted mb-2">{t("postuler.form.motivation")}</label>
                        <textarea name="motivation" required value={form.motivation} onChange={handleChange}
                          rows={4} placeholder={t("postuler.form.motivationPlaceholder")}
                          className="w-full bg-bg-secondary border border-border-subtle rounded-xl px-4 py-3 text-text-primary text-sm placeholder-text-muted focus:outline-none focus:border-gold/60 transition-colors resize-none" />
                      </div>

                      <button type="submit" disabled={loading}
                        className="w-full py-4 bg-gold text-bg-primary font-bold uppercase tracking-widest text-sm rounded-full hover:bg-gold-light transition-all hover:scale-105 active:scale-95 hover:shadow-[0_0_30px_rgba(201,151,58,0.4)] disabled:opacity-70 disabled:cursor-wait flex items-center justify-center gap-2">
                        {loading ? (
                          <><div className="w-4 h-4 border-2 border-bg-primary/40 border-t-bg-primary rounded-full animate-spin" /> {t("postuler.form.submitting")}</>
                        ) : (
                          <>{t("postuler.form.submit")} <ArrowRight className="w-4 h-4" /></>
                        )}
                      </button>
                      <p className="text-text-muted text-[11px] text-center">{t("postuler.form.security")}</p>
                    </form>
                  </motion.div>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-bg-card border border-gold/30 rounded-2xl p-12 text-center relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gold/5" />
                    <div className="relative z-10">
                      <div className="w-20 h-20 rounded-full bg-gold/10 border-2 border-gold flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="w-10 h-10 text-gold" />
                      </div>
                      <h3 className="text-3xl font-serif text-text-primary mb-4">{t("postuler.form.successTitle")}</h3>
                      <p className="text-text-secondary text-lg leading-relaxed mb-4">
                        {t("postuler.form.successDesc").replace("{prenom}", form.prenom)}
                      </p>
                      <p className="text-text-muted text-sm">{t("postuler.form.successSpam")}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </AnimatedSection>

            {/* FAQ */}
            <AnimatedSection delay={0.2} className="lg:sticky lg:top-32">
              <h3 className="text-2xl font-serif italic text-text-primary mb-8">{t("postuler.faq.title")}</h3>
              <div className="space-y-3">
                {faqs.map((faq, i) => (
                  <div key={i} className="bg-bg-card border border-border-subtle rounded-xl overflow-hidden">
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-bg-secondary transition-colors"
                    >
                      <span className="font-serif text-text-primary text-sm">{faq.q}</span>
                      <ChevronDown className={`w-4 h-4 text-gold flex-shrink-0 ml-4 transition-transform duration-300 ${openFaq === i ? "rotate-180" : ""}`} />
                    </button>
                    <AnimatePresence>
                      {openFaq === i && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <p className="px-6 pb-5 text-text-secondary text-sm leading-relaxed border-t border-border-subtle pt-4">{faq.a}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>

              <div className="mt-10 p-6 bg-gold/5 border border-gold/20 rounded-xl">
                <p className="text-text-secondary text-sm leading-relaxed">
                  <span className="text-gold font-semibold">{t("postuler.faq.helpTitle")}</span><br />
                  {t("postuler.faq.helpContact")}<br />
                  <a href="tel:+221771970713" className="text-gold hover:text-gold-light transition-colors">+221 77 197 07 13</a>
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  );
}
