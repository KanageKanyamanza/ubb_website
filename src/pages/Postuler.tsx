// src/pages/Postuler.tsx
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, CheckCircle, Globe, Award, Users, Briefcase, ChevronDown } from "lucide-react";
import AnimatedSection from "../components/ui/AnimatedSection";
import GoldDivider from "../components/ui/GoldDivider";
import { useSEO } from "../hooks/useSEO";

export default function Postuler() {
  useSEO({
    title: "Postuler — Devenir Partenaire Local UBB | Ubuntu Business Builders",
    description: "Rejoignez l'élite panafricaine UBB en tant que Partenaire Local. Portez la vision Ubuntu dans votre pays et accélérez la croissance des entreprises africaines.",
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
    "Sénégal", "Côte d'Ivoire", "Cameroun", "Mali", "Burkina Faso",
    "RDC", "Congo", "Togo", "Bénin", "Guinée", "Niger", "Mauritanie",
    "Gabon", "Tchad", "Madagascar", "Autre pays africain"
  ];

  const benefits = [
    { icon: <Globe className="w-6 h-6 text-gold" />, title: "Impact Continental", desc: "Contribuez à la structuration de dizaines d'entreprises dans votre pays." },
    { icon: <Award className="w-6 h-6 text-gold" />, title: "Prestige & Réseau Élite", desc: "Accédez à un réseau fermé de dirigeants et experts à travers l'Afrique francophone." },
    { icon: <Users className="w-6 h-6 text-gold" />, title: "Formation & Outils UBB", desc: "Accès complet à tous les outils, méthodologies et formations internes UBB." },
    { icon: <Briefcase className="w-6 h-6 text-gold" />, title: "Rémunération Attractive", desc: "Un modèle basé sur la performance qui valorise votre engagement à long terme." },
  ];

  const faqs = [
    { q: "Quel profil recherchez-vous ?", a: "Nous recherchons des professionnels ou entrepreneurs africains passionnés par le développement des affaires, avec une connaissance approfondie de leur marché local et un réseau établi." },
    { q: "Est-ce un emploi à temps plein ?", a: "Non. Le partenariat local UBB est flexible. Vous pouvez maintenir vos activités actuelles tout en représentant UBB dans votre écosystème." },
    { q: "Quel est le processus de sélection ?", a: "Après réception de votre candidature, notre équipe vous contacte pour un entretien. Le processus complet prend 2 à 3 semaines." },
    { q: "Y a-t-il des frais pour devenir partenaire ?", a: "Non, aucun frais d'entrée. Nous investissons dans vos outils, votre formation et votre développement dès le premier jour." },
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
            <span className="text-gold text-[11px] uppercase tracking-[0.5em] font-bold block mb-8">Rejoindre l'élite UBB</span>
            <h1 className="text-6xl md:text-8xl font-serif text-text-primary mb-8 italic leading-[1.1]">
              Postuler comme<br />
              <span className="text-gold-gradient not-italic">Partenaire Local</span>
            </h1>
            <p className="text-text-secondary text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
              Représentez UBB dans votre pays et transformez l'économie africaine une entreprise à la fois.
            </p>
            <GoldDivider className="mx-auto" />
          </AnimatedSection>
        </div>
      </section>

      {/* ── BENEFITS ──────────────────────────────────────── */}
      <section className="py-20 bg-bg-secondary border-b border-border-subtle">
        <div className="max-w-6xl mx-auto px-6">
          <AnimatedSection className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-serif italic text-text-primary mb-4">Ce que vous gagnez</h2>
            <p className="text-text-secondary">En rejoignant l'écosystème UBB en tant que partenaire local.</p>
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
                    <h3 className="text-2xl font-serif text-text-primary mb-2">Votre Candidature</h3>
                    <p className="text-text-secondary text-sm mb-8">Notre équipe vous contacte sous 48h après réception.</p>

                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[11px] font-bold uppercase tracking-widest text-text-muted mb-2">Prénom *</label>
                          <input type="text" name="prenom" required value={form.prenom} onChange={handleChange} placeholder="Jean"
                            className="w-full bg-bg-secondary border border-border-subtle rounded-xl px-4 py-3 text-text-primary text-sm placeholder-text-muted focus:outline-none focus:border-gold/60 transition-colors" />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold uppercase tracking-widest text-text-muted mb-2">Nom *</label>
                          <input type="text" name="nom" required value={form.nom} onChange={handleChange} placeholder="Koné"
                            className="w-full bg-bg-secondary border border-border-subtle rounded-xl px-4 py-3 text-text-primary text-sm placeholder-text-muted focus:outline-none focus:border-gold/60 transition-colors" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-widest text-text-muted mb-2">Email *</label>
                        <input type="email" name="email" required value={form.email} onChange={handleChange} placeholder="vous@exemple.com"
                          className="w-full bg-bg-secondary border border-border-subtle rounded-xl px-4 py-3 text-text-primary text-sm placeholder-text-muted focus:outline-none focus:border-gold/60 transition-colors" />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[11px] font-bold uppercase tracking-widest text-text-muted mb-2">Téléphone *</label>
                          <input type="tel" name="telephone" required value={form.telephone} onChange={handleChange} placeholder="+225 00 00 00 00"
                            className="w-full bg-bg-secondary border border-border-subtle rounded-xl px-4 py-3 text-text-primary text-sm placeholder-text-muted focus:outline-none focus:border-gold/60 transition-colors" />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold uppercase tracking-widest text-text-muted mb-2">Pays *</label>
                          <select name="pays" required value={form.pays} onChange={handleChange}
                            className="w-full bg-bg-secondary border border-border-subtle rounded-xl px-4 py-3 text-text-primary text-sm focus:outline-none focus:border-gold/60 transition-colors appearance-none">
                            <option value="">Votre pays</option>
                            {pays.map(p => <option key={p} value={p}>{p}</option>)}
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-widest text-text-muted mb-2">Profil LinkedIn</label>
                        <input type="url" name="linkedin" value={form.linkedin} onChange={handleChange} placeholder="https://linkedin.com/in/votre-profil"
                          className="w-full bg-bg-secondary border border-border-subtle rounded-xl px-4 py-3 text-text-primary text-sm placeholder-text-muted focus:outline-none focus:border-gold/60 transition-colors" />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-widest text-text-muted mb-2">Motivation *</label>
                        <textarea name="motivation" required value={form.motivation} onChange={handleChange}
                          rows={4} placeholder="Pourquoi souhaitez-vous devenir Partenaire Local UBB ? Décrivez votre expérience et vos ambitions..."
                          className="w-full bg-bg-secondary border border-border-subtle rounded-xl px-4 py-3 text-text-primary text-sm placeholder-text-muted focus:outline-none focus:border-gold/60 transition-colors resize-none" />
                      </div>

                      <button type="submit" disabled={loading}
                        className="w-full py-4 bg-gold text-bg-primary font-bold uppercase tracking-widest text-sm rounded-full hover:bg-gold-light transition-all hover:scale-105 active:scale-95 hover:shadow-[0_0_30px_rgba(201,151,58,0.4)] disabled:opacity-70 disabled:cursor-wait flex items-center justify-center gap-2">
                        {loading ? (
                          <><div className="w-4 h-4 border-2 border-bg-primary/40 border-t-bg-primary rounded-full animate-spin" /> Envoi en cours...</>
                        ) : (
                          <>Soumettre ma candidature <ArrowRight className="w-4 h-4" /></>
                        )}
                      </button>
                      <p className="text-text-muted text-[11px] text-center">🔒 Vos informations sont strictement confidentielles.</p>
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
                      <h3 className="text-3xl font-serif text-text-primary mb-4">Candidature reçue !</h3>
                      <p className="text-text-secondary text-lg leading-relaxed mb-4">
                        Merci, <span className="text-gold font-semibold">{form.prenom}</span>. Notre équipe va examiner votre dossier et vous recontacter dans les 48 heures.
                      </p>
                      <p className="text-text-muted text-sm">Vérifiez aussi vos spams si vous ne recevez pas de réponse.</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </AnimatedSection>

            {/* FAQ */}
            <AnimatedSection delay={0.2} className="lg:sticky lg:top-32">
              <h3 className="text-2xl font-serif italic text-text-primary mb-8">Questions fréquentes</h3>
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
                  <span className="text-gold font-semibold">Une question spécifique ?</span><br />
                  Contactez-nous directement :<br />
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
