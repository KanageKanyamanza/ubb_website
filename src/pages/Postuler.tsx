import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, CheckCircle, Briefcase, Users, Globe, Building2, Landmark, Cpu, Heart, Network, Banknote, BookOpen } from "lucide-react";
import AnimatedSection from "../components/ui/AnimatedSection";
import GoldDivider from "../components/ui/GoldDivider";
import { useSEO } from "../hooks/useSEO";
import { useLanguage } from "../context/LanguageContext";

export default function Postuler() {
  const { t } = useLanguage();

  useSEO({
    title: t("postuler.seoTitle"),
    description: t("postuler.seoDesc"),
    keywords: "partenaire vitalcheck, co-branding, marque blanche, ubuntu business builders",
  });

  const [form, setForm] = useState({
    prenom: "", nom: "", email: "", telephone: "", pays: "", linkedin: "", motivation: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

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

  const entityIcons = [
    <Briefcase className="w-5 h-5" />,
    <Users className="w-5 h-5" />,
    <Network className="w-5 h-5" />,
    <Globe className="w-5 h-5" />,
    <Building2 className="w-5 h-5" />,
    <Banknote className="w-5 h-5" />,
    <Landmark className="w-5 h-5" />,
    <BookOpen className="w-5 h-5" />,
    <Cpu className="w-5 h-5" />,
    <Heart className="w-5 h-5" />,
  ];

  const entities = entityIcons.map((icon, i) => ({
    icon,
    label: t(`postuler.entities.e${i + 1}`),
  }));

  const options = [
    {
      tag: t("postuler.options.opt1Tag"),
      title: t("postuler.options.opt1Title"),
      items: [
        { label: t("postuler.options.opt1Item1Label"), value: t("postuler.options.opt1Item1Value") },
        { label: t("postuler.options.opt1Item2Label"), value: t("postuler.options.opt1Item2Value") },
        { label: t("postuler.options.opt1Item3Label"), value: t("postuler.options.opt1Item3Value") },
      ],
    },
    {
      tag: t("postuler.options.opt2Tag"),
      title: t("postuler.options.opt2Title"),
      items: [
        { label: t("postuler.options.opt2Item1Label"), value: t("postuler.options.opt2Item1Value") },
        { label: t("postuler.options.opt2Item2Label"), value: t("postuler.options.opt2Item2Value") },
        { label: t("postuler.options.opt2Item3Label"), value: t("postuler.options.opt2Item3Value") },
      ],
    },
  ];

  const pays = [
    "Sénégal", "Côte d'Ivoire", "Cameroun", "Mali", "Burkina Faso",
    "RDC", "Congo", "Togo", "Bénin", "Guinée", "Niger",
    "Mauritanie", "Gabon", "Tchad", "Madagascar", "Autre pays africain",
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
            <span className="text-gold text-[11px] uppercase tracking-[0.5em] font-bold block mb-8">
              {t("postuler.hero.tag")}
            </span>
            <h1 className="text-5xl md:text-7xl font-serif text-text-primary mb-8 italic leading-[1.1]">
              {t("postuler.hero.titleLine1")}<br />
              <span className="text-gold-gradient not-italic">{t("postuler.hero.titleLine2")}</span>
            </h1>
            <p className="text-text-secondary text-xl max-w-3xl mx-auto mb-4 leading-relaxed">
              {t("postuler.hero.subtitleTool")}
            </p>
            <p className="text-text-secondary text-lg max-w-3xl mx-auto mb-10 leading-relaxed">
              {t("postuler.hero.subtitleDesc")}
            </p>
            <GoldDivider className="mx-auto" />
          </AnimatedSection>
        </div>
      </section>

      {/* ── ENTITÉS CIBLES ────────────────────────────────── */}
      <section className="py-20 bg-bg-secondary border-b border-border-subtle">
        <div className="max-w-6xl mx-auto px-6">
          <AnimatedSection className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-serif italic text-text-primary mb-4">
              {t("postuler.entities.title")}
            </h2>
            <p className="text-text-secondary">{t("postuler.entities.desc")}</p>
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {entities.map((e, i) => (
              <AnimatedSection key={i} delay={i * 0.06}>
                <div className="flex items-start gap-4 bg-bg-card border border-border-subtle rounded-xl p-5 hover:border-gold/30 transition-all group h-full">
                  <div className="w-9 h-9 rounded-lg bg-bg-secondary border border-border-subtle flex items-center justify-center flex-shrink-0 text-gold group-hover:border-gold/40 transition-colors">
                    {e.icon}
                  </div>
                  <span className="text-text-secondary text-sm leading-relaxed">{e.label}</span>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── OPTIONS ───────────────────────────────────────── */}
      <section className="py-20 border-b border-border-subtle">
        <div className="max-w-4xl mx-auto px-6">
          <AnimatedSection className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-serif italic text-text-primary mb-4">
              {t("postuler.options.title")}
            </h2>
            <p className="text-text-secondary">{t("postuler.options.desc")}</p>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {options.map((opt, i) => (
              <AnimatedSection key={i} delay={i * 0.15}>
                <div className="bg-bg-card border border-border-subtle rounded-2xl p-8 relative overflow-hidden hover:border-gold/40 transition-all hover:shadow-[0_8px_30px_rgba(184,115,51,0.10)] h-full">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-gold/70 block mb-3">
                    {opt.tag}
                  </span>
                  <h3 className="text-2xl font-serif italic text-text-primary mb-8">{opt.title}</h3>
                  <ul className="space-y-4">
                    {opt.items.map((item, j) => (
                      <li key={j} className="flex items-center justify-between border-b border-border-subtle/50 pb-4 last:border-0 last:pb-0">
                        <span className="text-text-secondary text-sm">{item.label}</span>
                        <span className="text-gold font-bold text-sm">{item.value}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── FORMULAIRE ────────────────────────────────────── */}
      <section className="py-24">
        <div className="max-w-2xl mx-auto px-6">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif italic text-text-primary mb-4">
              {t("postuler.form.title")}
            </h2>
            <p className="text-text-secondary">{t("postuler.form.subtitle")}</p>
          </AnimatedSection>

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
                        {pays.map(p => <option key={p} value={p}>{p}</option>)}
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
                    className="w-full py-4 bg-gold text-bg-primary font-bold uppercase tracking-widest text-sm rounded-full hover:bg-gold-light transition-all hover:scale-105 active:scale-95 hover:shadow-[0_0_30px_rgba(184,115,51,0.4)] disabled:opacity-70 disabled:cursor-wait flex items-center justify-center gap-2">
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
        </div>
      </section>
    </div>
  );
}
