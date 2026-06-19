// src/pages/Contact.tsx
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, CheckCircle, Phone, Mail, MapPin, Clock, MessageSquare } from "lucide-react";
import AnimatedSection from "../components/ui/AnimatedSection";
import GoldDivider from "../components/ui/GoldDivider";
import { useSEO } from "../hooks/useSEO";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../translations";

export default function Contact() {
  const { t, language } = useLanguage();

  useSEO({
    title: t("contact.seoTitle"),
    description: t("contact.seoDesc"),
    keywords: "contacter ubb, contact ubuntu business builders, diagnostic entreprise, conseil afrique",
  });

  const [form, setForm] = useState({ nom: "", email: "", telephone: "", sujet: "", message: "" });
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
    }, 1200);
  };

  const tr = translations[language].contact;
  const sujets: string[] = tr.form.subjects;

  const contactInfo = [
    {
      icon: <Phone className="w-5 h-5 text-gold" />,
      labelKey: "contact.info.phone",
      lines: ["+221 77 197 07 13", "+221 77 453 67 04"],
      type: "phone"
    },
    {
      icon: <Mail className="w-5 h-5 text-gold" />,
      labelKey: "contact.info.email",
      lines: ["contact@ubbuntu.com"],
      type: "email"
    },
    {
      icon: <MapPin className="w-5 h-5 text-gold" />,
      labelKey: "contact.info.office",
      lines: tr.info.officeLines,
      type: "text"
    },
    {
      icon: <Clock className="w-5 h-5 text-gold" />,
      labelKey: "contact.info.availability",
      lines: tr.info.availabilityLines,
      type: "text"
    },
  ];

  return (
    <div className="flex flex-col w-full min-h-screen bg-bg-primary">

      {/* â”€â”€ HERO â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section className="relative pt-40 pb-20 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gold/6 blur-[120px] rounded-full pointer-events-none" />
        <div className="max-w-3xl mx-auto px-6 relative z-10 text-center">
          <AnimatedSection>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold/40 bg-gold/10 text-gold text-[11px] font-bold uppercase tracking-[0.3em] mb-8">
              <MessageSquare className="w-3 h-3" /> {t("contact.hero.tag")}
            </span>
            <h1 className="text-5xl md:text-7xl font-serif text-text-primary leading-[1.1] mb-6">
              {t("contact.hero.titleLine1")}<br />
              <span className="italic text-gold">{t("contact.hero.titleLine2")}</span>
            </h1>
            <p className="text-xl font-serif italic text-text-secondary max-w-xl mx-auto mb-8">
              {t("contact.hero.desc")}
            </p>
            <GoldDivider className="mx-auto" />
          </AnimatedSection>
        </div>
      </section>

      {/* â”€â”€ MAIN CONTENT â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section className="pb-32">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">

            {/* Left â€” Contact Info */}
            <AnimatedSection className="lg:col-span-2 lg:sticky lg:top-32">
              <div className="space-y-6">
                {contactInfo.map((info, i) => (
                  <div key={i} className="bg-bg-card border border-border-subtle rounded-xl p-6 flex items-start gap-4 hover:border-gold/30 transition-colors">
                    <div className="w-10 h-10 rounded-xl bg-bg-secondary border border-border-subtle flex items-center justify-center flex-shrink-0">
                      {info.icon}
                    </div>
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-widest text-text-muted mb-1">{t(info.labelKey)}</p>
                      {(info.lines as string[]).map((line, j) => (
                        info.type === "email" ? (
                          <a key={j} href={`mailto:${line}`} className="block text-text-primary text-sm hover:text-gold transition-colors">{line}</a>
                        ) : info.type === "phone" ? (
                          <a key={j} href={`tel:${line.replace(/\s/g, "")}`} className="block text-text-primary text-sm hover:text-gold transition-colors">{line}</a>
                        ) : (
                          <p key={j} className="text-text-primary text-sm">{line}</p>
                        )
                      ))}
                    </div>
                  </div>
                ))}

                {/* Quick CTA */}
                <div className="bg-gold/5 border border-gold/20 rounded-xl p-6 text-center">
                  <p className="text-text-secondary text-sm mb-4 font-serif italic">{t("contact.info.quickDiagnostic")}</p>
                  <a
                    href="https://www.checkmyenterprise.com/pricing"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gold text-bg-primary font-bold uppercase tracking-widest text-xs rounded-full hover:bg-gold-light transition-all hover:scale-105"
                  >
                    vitalCHECK <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </AnimatedSection>

            {/* Right â€” Form */}
            <AnimatedSection delay={0.2} className="lg:col-span-3">
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
                    <h3 className="text-2xl font-serif text-text-primary mb-2">{t("contact.form.title")}</h3>
                    <p className="text-text-secondary text-sm mb-8">{t("contact.form.subtitle")}</p>

                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-2 md:col-span-1">
                          <label className="block text-[11px] font-bold uppercase tracking-widest text-text-muted mb-2">{t("contact.form.fullName")}</label>
                          <input type="text" name="nom" required value={form.nom} onChange={handleChange}
                            placeholder={t("contact.form.fullNamePlaceholder")}
                            className="w-full bg-bg-secondary border border-border-subtle rounded-xl px-4 py-3 text-text-primary text-sm placeholder-text-muted focus:outline-none focus:border-gold/60 transition-colors" />
                        </div>
                        <div className="col-span-2 md:col-span-1">
                          <label className="block text-[11px] font-bold uppercase tracking-widest text-text-muted mb-2">{t("contact.form.email")}</label>
                          <input type="email" name="email" required value={form.email} onChange={handleChange}
                            placeholder={t("contact.form.emailPlaceholder")}
                            className="w-full bg-bg-secondary border border-border-subtle rounded-xl px-4 py-3 text-text-primary text-sm placeholder-text-muted focus:outline-none focus:border-gold/60 transition-colors" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-widest text-text-muted mb-2">{t("contact.form.phone")}</label>
                        <input type="tel" name="telephone" value={form.telephone} onChange={handleChange}
                          placeholder={t("contact.form.phonePlaceholder")}
                          className="w-full bg-bg-secondary border border-border-subtle rounded-xl px-4 py-3 text-text-primary text-sm placeholder-text-muted focus:outline-none focus:border-gold/60 transition-colors" />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-widest text-text-muted mb-2">{t("contact.form.subject")}</label>
                        <select name="sujet" required value={form.sujet} onChange={handleChange}
                          className="w-full bg-bg-secondary border border-border-subtle rounded-xl px-4 py-3 text-text-primary text-sm focus:outline-none focus:border-gold/60 transition-colors appearance-none">
                          <option value="">{t("contact.form.subjectPlaceholder")}</option>
                          {Array.isArray(sujets) && sujets.map((s: string) => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-widest text-text-muted mb-2">{t("contact.form.message")}</label>
                        <textarea name="message" required value={form.message} onChange={handleChange}
                          rows={5} placeholder={t("contact.form.messagePlaceholder")}
                          className="w-full bg-bg-secondary border border-border-subtle rounded-xl px-4 py-3 text-text-primary text-sm placeholder-text-muted focus:outline-none focus:border-gold/60 transition-colors resize-none" />
                      </div>

                      <button type="submit" disabled={loading}
                        className="w-full py-4 bg-gold text-bg-primary font-bold uppercase tracking-widest text-sm rounded-full hover:bg-gold-light transition-all hover:scale-105 active:scale-95 hover:shadow-[0_0_30px_rgba(184,115,51,0.4)] disabled:opacity-70 disabled:cursor-wait flex items-center justify-center gap-2">
                        {loading ? (
                          <><div className="w-4 h-4 border-2 border-bg-primary/40 border-t-bg-primary rounded-full animate-spin" /> {t("contact.form.submitting")}</>
                        ) : (
                          <>{t("contact.form.submit")} <ArrowRight className="w-4 h-4" /></>
                        )}
                      </button>
                      <p className="text-text-muted text-[11px] text-center">{t("contact.form.security")}</p>
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
                      <h3 className="text-3xl font-serif text-text-primary mb-4">{t("contact.success.title")}</h3>
                      <p className="text-text-secondary text-lg leading-relaxed mb-8">
                        {t("contact.success.desc")
                          .replace("{name}", form.nom.split(" ")[0])
                          .replace("{email}", form.email)}
                      </p>
                      <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <a href="https://www.checkmyenterprise.com/pricing" target="_blank" rel="noreferrer"
                          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gold text-bg-primary font-bold uppercase tracking-widest text-xs rounded-full hover:bg-gold-light transition-all">
                          {t("contact.success.cta")} <ArrowRight className="w-3.5 h-3.5" />
                        </a>
                      </div>
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

