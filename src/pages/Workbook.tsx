// src/pages/Workbook.tsx
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, CheckCircle, BookOpen, TrendingUp, Clock, Star } from "lucide-react";
import AnimatedSection from "../components/ui/AnimatedSection";
import GoldDivider from "../components/ui/GoldDivider";
import { useSEO } from "../hooks/useSEO";

export default function Workbook() {
  useSEO({
    title: "Workbook Gratuit — Augmentez vos ventes de 30% en 90 jours | UBB",
    description: "Recevez gratuitement le workbook UBB : 'Comment augmenter de 30% vos ventes mensuelles en 90 jours'. Méthode éprouvée pour les entreprises africaines.",
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
    // Simulate submission
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  };

  const pays = [
    "Sénégal", "Côte d'Ivoire", "Cameroun", "Mali", "Burkina Faso",
    "RDC", "Congo", "Togo", "Bénin", "Guinée", "Niger", "Mauritanie",
    "Gabon", "Tchad", "Madagascar", "Autre pays africain", "Autre"
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
              <Star className="w-3 h-3 fill-gold" /> 100% Gratuit
            </span>
            <h1 className="text-5xl md:text-7xl font-serif text-text-primary leading-[1.1] mb-6">
              Augmentez vos ventes<br />
              <span className="italic text-gold">de 30% en 90 jours.</span>
            </h1>
            <p className="text-xl md:text-2xl font-serif italic text-text-secondary max-w-2xl mx-auto mb-8">
              Le workbook opérationnel conçu pour les entreprises africaines qui veulent croître rapidement.
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
                    <h2 className="text-xl font-serif text-text-primary font-bold">Workbook UBB</h2>
                    <p className="text-text-muted text-sm">Guide opérationnel · PDF Premium</p>
                  </div>
                </div>

                <p className="text-text-secondary leading-relaxed mb-10">
                  Ce workbook concentre les méthodes qu'Ambrose Nzeyimana et son équipe utilisent pour aider des entreprises africaines à battre leurs propres records de ventes en seulement 90 jours.
                </p>

                <div className="space-y-5 mb-10">
                  {[
                    { icon: <TrendingUp className="w-5 h-5 text-gold" />, title: "La méthode des 90 jours", desc: "Un cadre structuré, semaine par semaine, pour générer des résultats mesurables." },
                    { icon: <CheckCircle className="w-5 h-5 text-gold" />, title: "Exercices pratiques", desc: "Des templates et check-lists directement applicables à votre contexte africain." },
                    { icon: <Clock className="w-5 h-5 text-gold" />, title: "Applicable immédiatement", desc: "Pas de théorie creuse. Des actions concrètes que vous pouvez commencer dès aujourd'hui." },
                  ].map((item, i) => (
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
                      <p className="text-text-muted text-xs uppercase tracking-widest font-bold">Valeur réelle</p>
                      <p className="text-gold font-serif text-2xl font-bold">£20</p>
                      <p className="text-text-secondary text-xs mt-1">Offert gratuitement aujourd'hui</p>
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

                    <h3 className="text-2xl font-serif text-text-primary mb-2">Recevez votre workbook</h3>
                    <p className="text-text-secondary text-sm mb-8">Remplissez le formulaire ci-dessous. Vous recevrez le PDF par email sous 24h.</p>

                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[11px] font-bold uppercase tracking-widest text-text-muted mb-2">Prénom *</label>
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
                          <label className="block text-[11px] font-bold uppercase tracking-widest text-text-muted mb-2">Nom *</label>
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
                        <label className="block text-[11px] font-bold uppercase tracking-widest text-text-muted mb-2">Email *</label>
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
                        <label className="block text-[11px] font-bold uppercase tracking-widest text-text-muted mb-2">WhatsApp / Téléphone</label>
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
                        <label className="block text-[11px] font-bold uppercase tracking-widest text-text-muted mb-2">Pays *</label>
                        <select
                          name="pays"
                          required
                          value={form.pays}
                          onChange={handleChange}
                          className="w-full bg-bg-secondary border border-border-subtle rounded-xl px-4 py-3 text-text-primary text-sm focus:outline-none focus:border-gold/60 transition-colors appearance-none"
                        >
                          <option value="">Sélectionnez votre pays</option>
                          {pays.map(p => <option key={p} value={p}>{p}</option>)}
                        </select>
                      </div>

                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-4 bg-gold text-bg-primary font-bold uppercase tracking-widest text-sm rounded-full hover:bg-gold-light transition-all hover:scale-105 active:scale-95 hover:shadow-[0_0_30px_rgba(201,151,58,0.4)] disabled:opacity-70 disabled:cursor-wait flex items-center justify-center gap-2"
                      >
                        {loading ? (
                          <>
                            <div className="w-4 h-4 border-2 border-bg-primary/40 border-t-bg-primary rounded-full animate-spin" />
                            Envoi en cours...
                          </>
                        ) : (
                          <>Recevoir le Workbook Gratuit <ArrowRight className="w-4 h-4" /></>
                        )}
                      </button>

                      <p className="text-text-muted text-[11px] text-center">
                        🔒 Vos données sont confidentielles. Aucun spam.
                      </p>
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
                      <h3 className="text-3xl font-serif text-text-primary mb-4">Félicitations, {form.prenom} !</h3>
                      <p className="text-text-secondary text-lg leading-relaxed mb-8">
                        Votre workbook est en route. Vous le recevrez à <span className="text-gold font-semibold">{form.email}</span> dans les prochaines 24 heures.
                      </p>
                      <p className="text-text-muted text-sm mb-8">
                        En attendant, prenez 15 minutes pour faire votre diagnostic vitalCHECK — c'est gratuit.
                      </p>
                      <a
                        href="https://www.checkmyenterprise.com/pricing"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-gold text-bg-primary font-bold uppercase tracking-widest text-sm rounded-full hover:bg-gold-light transition-all hover:scale-105"
                      >
                        Faire mon diagnostic <ArrowRight className="w-4 h-4" />
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
