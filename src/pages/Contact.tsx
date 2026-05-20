// src/pages/Contact.tsx
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, CheckCircle, Phone, Mail, MapPin, Clock, MessageSquare } from "lucide-react";
import AnimatedSection from "../components/ui/AnimatedSection";
import GoldDivider from "../components/ui/GoldDivider";
import { useSEO } from "../hooks/useSEO";

export default function Contact() {
  useSEO({
    title: "Nous Contacter — Parler à l'Équipe UBB | Ubuntu Business Builders",
    description: "Contactez l'équipe Ubuntu Business Builders. Diagnostic d'entreprise, conseil stratégique, partenariat — notre équipe vous répond sous 48h.",
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

  const sujets = [
    "Diagnostic d'entreprise (vitalCHECK)",
    "Conseil stratégique & accompagnement",
    "HARVESTS 2.0 — Suite logicielle",
    "Partenariat local UBB",
    "Workbook & ressources gratuites",
    "Autre question",
  ];

  const contactInfo = [
    { icon: <Phone className="w-5 h-5 text-gold" />, label: "Téléphone", lines: ["+221 77 197 07 13", "+221 77 453 67 04"] },
    { icon: <Mail className="w-5 h-5 text-gold" />, label: "Email", lines: ["info@growthubb.space"] },
    { icon: <MapPin className="w-5 h-5 text-gold" />, label: "Bureau", lines: ["Dakar, Sénégal", "Afrique francophone"] },
    { icon: <Clock className="w-5 h-5 text-gold" />, label: "Disponibilité", lines: ["Lun – Ven : 8h – 18h", "Réponse sous 48h"] },
  ];

  return (
    <div className="flex flex-col w-full min-h-screen bg-bg-primary">

      {/* ── HERO ──────────────────────────────────────────── */}
      <section className="relative pt-40 pb-20 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gold/6 blur-[120px] rounded-full pointer-events-none" />
        <div className="max-w-3xl mx-auto px-6 relative z-10 text-center">
          <AnimatedSection>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold/40 bg-gold/10 text-gold text-[11px] font-bold uppercase tracking-[0.3em] mb-8">
              <MessageSquare className="w-3 h-3" /> Parlons de votre entreprise
            </span>
            <h1 className="text-5xl md:text-7xl font-serif text-text-primary leading-[1.1] mb-6">
              Nous<br />
              <span className="italic text-gold">Contacter</span>
            </h1>
            <p className="text-xl font-serif italic text-text-secondary max-w-xl mx-auto mb-8">
              Notre équipe est là pour répondre à toutes vos questions et vous accompagner vers la croissance.
            </p>
            <GoldDivider className="mx-auto" />
          </AnimatedSection>
        </div>
      </section>

      {/* ── MAIN CONTENT ──────────────────────────────────── */}
      <section className="pb-32">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">

            {/* Left — Contact Info */}
            <AnimatedSection className="lg:col-span-2 lg:sticky lg:top-32">
              <div className="space-y-6">
                {contactInfo.map((info, i) => (
                  <div key={i} className="bg-bg-card border border-border-subtle rounded-xl p-6 flex items-start gap-4 hover:border-gold/30 transition-colors">
                    <div className="w-10 h-10 rounded-xl bg-bg-secondary border border-border-subtle flex items-center justify-center flex-shrink-0">
                      {info.icon}
                    </div>
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-widest text-text-muted mb-1">{info.label}</p>
                      {info.lines.map((line, j) => (
                        info.label === "Email" ? (
                          <a key={j} href={`mailto:${line}`} className="block text-text-primary text-sm hover:text-gold transition-colors">{line}</a>
                        ) : info.label === "Téléphone" ? (
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
                  <p className="text-text-secondary text-sm mb-4 font-serif italic">Envie d'un diagnostic rapide ?</p>
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

            {/* Right — Form */}
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
                    <h3 className="text-2xl font-serif text-text-primary mb-2">Envoyez-nous un message</h3>
                    <p className="text-text-secondary text-sm mb-8">Nous vous répondons dans les 48 heures ouvrées.</p>

                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-2 md:col-span-1">
                          <label className="block text-[11px] font-bold uppercase tracking-widest text-text-muted mb-2">Nom complet *</label>
                          <input type="text" name="nom" required value={form.nom} onChange={handleChange} placeholder="Jean Koné"
                            className="w-full bg-bg-secondary border border-border-subtle rounded-xl px-4 py-3 text-text-primary text-sm placeholder-text-muted focus:outline-none focus:border-gold/60 transition-colors" />
                        </div>
                        <div className="col-span-2 md:col-span-1">
                          <label className="block text-[11px] font-bold uppercase tracking-widest text-text-muted mb-2">Email *</label>
                          <input type="email" name="email" required value={form.email} onChange={handleChange} placeholder="vous@exemple.com"
                            className="w-full bg-bg-secondary border border-border-subtle rounded-xl px-4 py-3 text-text-primary text-sm placeholder-text-muted focus:outline-none focus:border-gold/60 transition-colors" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-widest text-text-muted mb-2">Téléphone / WhatsApp</label>
                        <input type="tel" name="telephone" value={form.telephone} onChange={handleChange} placeholder="+221 77 000 00 00"
                          className="w-full bg-bg-secondary border border-border-subtle rounded-xl px-4 py-3 text-text-primary text-sm placeholder-text-muted focus:outline-none focus:border-gold/60 transition-colors" />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-widest text-text-muted mb-2">Sujet *</label>
                        <select name="sujet" required value={form.sujet} onChange={handleChange}
                          className="w-full bg-bg-secondary border border-border-subtle rounded-xl px-4 py-3 text-text-primary text-sm focus:outline-none focus:border-gold/60 transition-colors appearance-none">
                          <option value="">Sélectionnez un sujet</option>
                          {sujets.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-widest text-text-muted mb-2">Message *</label>
                        <textarea name="message" required value={form.message} onChange={handleChange}
                          rows={5} placeholder="Décrivez votre entreprise, vos défis actuels et ce que vous attendez de notre collaboration..."
                          className="w-full bg-bg-secondary border border-border-subtle rounded-xl px-4 py-3 text-text-primary text-sm placeholder-text-muted focus:outline-none focus:border-gold/60 transition-colors resize-none" />
                      </div>

                      <button type="submit" disabled={loading}
                        className="w-full py-4 bg-gold text-bg-primary font-bold uppercase tracking-widest text-sm rounded-full hover:bg-gold-light transition-all hover:scale-105 active:scale-95 hover:shadow-[0_0_30px_rgba(201,151,58,0.4)] disabled:opacity-70 disabled:cursor-wait flex items-center justify-center gap-2">
                        {loading ? (
                          <><div className="w-4 h-4 border-2 border-bg-primary/40 border-t-bg-primary rounded-full animate-spin" /> Envoi...</>
                        ) : (
                          <>Envoyer mon message <ArrowRight className="w-4 h-4" /></>
                        )}
                      </button>
                      <p className="text-text-muted text-[11px] text-center">🔒 Vos informations restent confidentielles.</p>
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
                      <h3 className="text-3xl font-serif text-text-primary mb-4">Message envoyé !</h3>
                      <p className="text-text-secondary text-lg leading-relaxed mb-8">
                        Merci <span className="text-gold font-semibold">{form.nom.split(" ")[0]}</span>. Notre équipe vous répondra à <span className="text-gold">{form.email}</span> dans les 48h.
                      </p>
                      <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <a href="https://www.checkmyenterprise.com/pricing" target="_blank" rel="noreferrer"
                          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gold text-bg-primary font-bold uppercase tracking-widest text-xs rounded-full hover:bg-gold-light transition-all">
                          Faire mon diagnostic <ArrowRight className="w-3.5 h-3.5" />
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
