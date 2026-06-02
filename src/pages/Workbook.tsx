// src/pages/Workbook.tsx
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, CheckCircle, BookOpen, TrendingUp, Clock, Star } from "lucide-react";
import AnimatedSection from "../components/ui/AnimatedSection";
import GoldDivider from "../components/ui/GoldDivider";
import { useSEO } from "../hooks/useSEO";
import { useLanguage } from "../context/LanguageContext";

export default function Workbook() {
  const { t } = useLanguage();

  useSEO({
    title: t("workbook.seoTitle"),
    description: t("workbook.seoDesc"),
    keywords: "workbook gratuit, croissance ventes, 90 jours, entreprises africaines, ubuntu business builders",
  });

  const [form, setForm] = useState({ prenom: "", nom: "", email: "", telephone: "", pays: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  };

  const pays = [
    "Botswana", "Burkina Faso", "Cameroun", "Congo Brazzaville",
    "Égypte", "Éthiopie", "Gabon", "Ghana", "Guinée Conakry",
    "Côte d'Ivoire", "Kenya", "Madagascar", "Mali",
    "Namibie", "Sénégal", "Afrique du Sud", "Zambie", "Zimbabwe"
  ];

  const benefitItems = [
    {
      icon: <TrendingUp className="w-5 h-5 text-gold" />,
      title: t("workbook.left.item1Title"),
      desc: t("workbook.left.item1Desc")
    },
    {
      icon: <CheckCircle className="w-5 h-5 text-gold" />,
      title: t("workbook.left.item2Title"),
      desc: t("workbook.left.item2Desc")
    },
    {
      icon: <Clock className="w-5 h-5 text-gold" />,
      title: t("workbook.left.item3Title"),
      desc: t("workbook.left.item3Desc")
    },
  ];

  return (
    <div className="flex flex-col w-full min-h-screen bg-bg-primary">

      {/* ── HERO ──────────────────────────────────────────── */}
      <section className="relative pt-40 pb-20 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gold/6 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute -top-10 right-0 w-[400px] h-[400px] bg-gold/4 blur-[100px] rounded-full pointer-events-none" />

        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <AnimatedSection>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold/40 bg-gold/10 text-gold text-[11px] font-bold uppercase tracking-[0.3em] mb-8">
              <Star className="w-3 h-3 fill-gold" /> {t("workbook.hero.tag")}
            </span>
            <h1 className="text-5xl md:text-7xl font-serif text-text-primary leading-[1.1] mb-6">
              {t("workbook.hero.titleLine1")}<br />
              <span className="italic text-gold">{t("workbook.hero.titleLine2")}</span>
            </h1>
            <p className="text-xl md:text-2xl font-serif italic text-text-secondary max-w-2xl mx-auto mb-8">
              {t("workbook.hero.desc")}
            </p>
            <GoldDivider className="mx-auto" />
          </AnimatedSection>
        </div>
      </section>

      {/* ── MAIN CONTENT ──────────────────────────────────── */}
      <section className="pb-32 relative">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

            {/* Left — Benefits */}
            <AnimatedSection className="lg:sticky lg:top-32">
              <div className="bg-bg-secondary border border-border-subtle rounded-2xl p-10 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-gold/5 blur-3xl rounded-full" />

                <div className="flex items-center gap-4 mb-8">
                  <div className="w-16 h-16 rounded-2xl bg-gold/10 border border-gold/30 flex items-center justify-center flex-shrink-0">
                    <BookOpen className="w-8 h-8 text-gold" />
                  </div>
                  <div>
                    <h2 className="text-xl font-serif text-text-primary font-bold">{t("workbook.left.cardTitle")}</h2>
                    <p className="text-text-muted text-sm">{t("workbook.left.cardTag")}</p>
                  </div>
                </div>

                <p className="text-text-secondary leading-relaxed mb-10">
                  {t("workbook.left.cardIntro")}
                </p>

                <div className="space-y-5 mb-10">
                  {benefitItems.map((item, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-bg-primary border border-border-subtle flex items-center justify-center flex-shrink-0">
                        {item.icon}
                      </div>
                      <div>
                        <h4 className="text-text-primary font-semibold text-sm mb-1">{item.title}</h4>
                        <p className="text-text-muted text-xs leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-border-subtle pt-8">
                  <div className="flex items-center gap-3">
                    <img
                      src="https://d1yei2z3i6k35z.cloudfront.net/10694324/689972c2536ee_COV1.png"
                      alt="Workbook UBB"
                      className="w-20 h-auto rounded-lg shadow-lg"
                    />
                    <div>
                      <p className="text-text-muted text-xs uppercase tracking-widest font-bold">{t("workbook.left.valueLabel")}</p>
                      <p className="text-gold font-serif text-2xl font-bold">{t("workbook.left.valuePrice")}</p>
                      <p className="text-text-secondary text-xs mt-1">{t("workbook.left.valuePromo")}</p>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* Right — Form */}
            <AnimatedSection delay={0.2}>
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

                    <h3 className="text-2xl font-serif text-text-primary mb-2">{t("workbook.form.title")}</h3>
                    <p className="text-text-secondary text-sm mb-8">{t("workbook.form.subtitle")}</p>

                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[11px] font-bold uppercase tracking-widest text-text-muted mb-2">{t("workbook.form.firstName")}</label>
                          <input
                            type="text"
                            name="prenom"
                            required
                            value={form.prenom}
                            onChange={handleChange}
                            placeholder="Jean"
                            className="w-full bg-bg-secondary border border-border-subtle rounded-xl px-4 py-3 text-text-primary text-sm placeholder-text-muted focus:outline-none focus:border-gold/60 focus:bg-bg-secondary transition-colors"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold uppercase tracking-widest text-text-muted mb-2">{t("workbook.form.lastName")}</label>
                          <input
                            type="text"
                            name="nom"
                            required
                            value={form.nom}
                            onChange={handleChange}
                            placeholder="Dupont"
                            className="w-full bg-bg-secondary border border-border-subtle rounded-xl px-4 py-3 text-text-primary text-sm placeholder-text-muted focus:outline-none focus:border-gold/60 focus:bg-bg-secondary transition-colors"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-widest text-text-muted mb-2">{t("workbook.form.email")}</label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={form.email}
                          onChange={handleChange}
                          placeholder="vous@entreprise.com"
                          className="w-full bg-bg-secondary border border-border-subtle rounded-xl px-4 py-3 text-text-primary text-sm placeholder-text-muted focus:outline-none focus:border-gold/60 transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-widest text-text-muted mb-2">{t("workbook.form.phone")}</label>
                        <input
                          type="tel"
                          name="telephone"
                          value={form.telephone}
                          onChange={handleChange}
                          placeholder="+221 77 000 00 00"
                          className="w-full bg-bg-secondary border border-border-subtle rounded-xl px-4 py-3 text-text-primary text-sm placeholder-text-muted focus:outline-none focus:border-gold/60 transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-widest text-text-muted mb-2">{t("workbook.form.country")}</label>
                        <select
                          name="pays"
                          required
                          value={form.pays}
                          onChange={handleChange}
                          className="w-full bg-bg-secondary border border-border-subtle rounded-xl px-4 py-3 text-text-primary text-sm focus:outline-none focus:border-gold/60 transition-colors appearance-none"
                        >
                          <option value="">{t("workbook.form.countryPlaceholder")}</option>
                          {pays.map(p => <option key={p} value={p}>{p}</option>)}
                        </select>
                      </div>

                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-4 bg-gold text-bg-primary font-bold uppercase tracking-widest text-sm rounded-full hover:bg-gold-light transition-all hover:scale-105 active:scale-95 hover:shadow-[0_0_30px_rgba(184,115,51,0.4)] disabled:opacity-70 disabled:cursor-wait flex items-center justify-center gap-2"
                      >
                        {loading ? (
                          <>
                            <div className="w-4 h-4 border-2 border-bg-primary/40 border-t-bg-primary rounded-full animate-spin" />
                            {t("workbook.form.submitting")}
                          </>
                        ) : (
                          <>{t("workbook.form.submit")} <ArrowRight className="w-4 h-4" /></>
                        )}
                      </button>

                      <p className="text-text-muted text-[11px] text-center">{t("workbook.form.security")}</p>
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
                      <h3 className="text-3xl font-serif text-text-primary mb-4">
                        {t("workbook.form.successTitle").replace("{prenom}", form.prenom)}
                      </h3>
                      <p className="text-text-secondary text-lg leading-relaxed mb-8">
                        {t("workbook.form.successDesc")
                          .replace("{prenom}", form.prenom)
                          .replace("{email}", form.email)}
                      </p>
                      <p className="text-text-muted text-sm mb-8">{t("workbook.form.successPromo")}</p>
                      <a
                        href="https://www.checkmyenterprise.com/pricing"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-gold text-bg-primary font-bold uppercase tracking-widest text-sm rounded-full hover:bg-gold-light transition-all hover:scale-105"
                      >
                        {t("workbook.form.successCta")} <ArrowRight className="w-4 h-4" />
                      </a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  );
}

