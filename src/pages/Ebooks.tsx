import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import AnimatedSection from "../components/ui/AnimatedSection";
import GoldDivider from "../components/ui/GoldDivider";
import { PACK_CONTENTS } from "../data/ebooks";
import { PACK_PRICE } from "../utils/currency";

// Checkout Components
import { useCheckoutForm } from "../hooks/useCheckoutForm";
import { OrderForm } from "../components/checkout/OrderForm";
import { OrderSummary } from "../components/checkout/OrderSummary";
import { CheckoutSuccess } from "../components/checkout/CheckoutSuccess";
import { useSEO } from "../hooks/useSEO";

export default function Ebooks() {
  useSEO({
    title: "Pack E-books Stratégiques & Guides Pratiques",
    description: "Téléchargez le Pack d'E-books d'Ubuntu Business Builders (UBB). Des guides et ressources essentiels conçus spécifiquement pour structurer, financer et propulser le développement commercial de votre entreprise en Afrique francophone.",
    keywords: "ebooks business, guide strategie, structuration d'affaires, harvests, developpement commercial afrique, cfa eur gbp",
    ogImage: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80"
  });

  const { formData, errors, touched, handleChange, handleBlur, isValid, countries } = useCheckoutForm();
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState<any>(null);
  const [paymentError, setPaymentError] = useState(false);

  const handlePayPalSuccess = (details: any) => {
    setPaymentDetails(details);
    setPaymentSuccess(true);
    console.log("Paiement réussi :", details);
    window.scrollTo({ top: document.getElementById('commander')?.offsetTop ? document.getElementById('commander')!.offsetTop - 100 : 0, behavior: 'smooth' });
  };

  const handlePayPalError = (err: any) => {
    setPaymentError(true);
    setTimeout(() => setPaymentError(false), 8000);
  };

  const handleReset = () => {
    setPaymentSuccess(false);
    setPaymentDetails(null);
  };

  return (
    <div className="flex flex-col w-full bg-bg-primary overflow-hidden min-h-screen">
      
      {/* ── SECTION 1 — HERO PAGE ────────────────────────────────── */}
      <section className="relative pt-40 pb-24 overflow-hidden border-b border-border-subtle flex flex-col items-center justify-center text-center">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/5 blur-3xl rounded-full pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-6 relative z-10 w-full">
          <AnimatedSection>
            <div className="mb-10 inline-block">
              <img 
                src="https://d1yei2z3i6k35z.cloudfront.net/10694324/685425ba1829b_UBBlogo.jpg" 
                alt="UBB Logo" 
                className="h-20 md:h-24 mx-auto rounded-sm shadow-xl"
              />
            </div>
            
            <span className="text-gold text-xs uppercase tracking-widest font-bold block mb-6">
              Ressources · Ubuntu Business Builders
            </span>
            
            <h1 className="text-5xl md:text-7xl font-serif text-text-primary mb-6 italic leading-tight">
              Accélérez votre croissance.<br />
              <span className="not-italic">À votre propre rythme.</span>
            </h1>
            
            <p className="text-text-secondary text-lg md:text-xl font-serif max-w-2xl mx-auto mb-12 leading-relaxed">
              E-books, podcasts et formations vidéo conçus pour les dirigeants d'entreprises africaines qui veulent des résultats concrets, pas des théories génériques.
            </p>
            
            <div className="max-w-md mx-auto bg-bg-card border border-gold/30 rounded-xl p-8 shadow-[0_0_40px_rgba(201,151,58,0.1)] mb-10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 blur-2xl rounded-full" />
              <span className="text-text-primary font-bold uppercase tracking-widest text-sm block mb-4 relative z-10">
                Pack complet
              </span>
              <span className="text-5xl font-serif text-gold block mb-2 relative z-10">
                {PACK_PRICE.display}
              </span>
              <span className="text-text-muted text-sm block mb-6 relative z-10">
                {PACK_PRICE.displayCFA}
              </span>
              <span className="text-text-secondary text-sm block relative z-10">
                Accès immédiat · PDF + Audio
              </span>
            </div>
            
            <a 
              href="#commander" 
              className="inline-flex items-center gap-3 px-10 py-5 bg-gold text-bg-primary font-bold uppercase tracking-widest text-sm rounded-full hover:bg-gold-light transition-all hover:scale-105"
            >
              Obtenir le pack <ArrowRight className="w-4 h-4" />
            </a>
          </AnimatedSection>
        </div>
      </section>

      {/* ── SECTION 2 — HIÉRARCHIE UBB ───────────────────────────── */}
      <section className="py-24 bg-bg-secondary border-b border-border-subtle">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif text-text-primary mb-4">Votre parcours avec UBB</h2>
            <p className="text-text-secondary text-lg">Les ressources sont la première étape. Voici la suite.</p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-1/2 left-1/6 right-1/6 h-px bg-gold/30 -translate-y-1/2" />
            
            {/* Etape 1 */}
            <AnimatedSection delay={0.1}>
              <div className="bg-bg-primary border-2 border-gold/50 rounded-2xl p-8 relative h-full flex flex-col items-center text-center shadow-[0_0_20px_rgba(201,151,58,0.15)]">
                <span className="absolute -top-3 px-4 py-1 bg-gold text-bg-primary text-[10px] font-bold uppercase tracking-widest rounded-full">
                  Vous êtes ici
                </span>
                <img src="https://images.unsplash.com/photo-1456324504439-367cee3b3c32?auto=format&fit=crop&q=80&w=200" alt="Ressources" className="w-16 h-16 rounded-full object-cover mb-4 mt-2 border-2 border-gold/30 shadow-lg" />
                <h3 className="text-2xl font-serif text-text-primary mb-1">Ressources</h3>
                <h4 className="text-gold text-xs uppercase tracking-widest font-bold mb-4">E-books & formations</h4>
                <p className="text-text-secondary text-sm mb-6 flex-grow">
                  Apprenez les fondamentaux de la croissance structurée à votre rythme.
                </p>
                <span className="text-text-primary font-bold">{PACK_PRICE.display}</span>
              </div>
            </AnimatedSection>

            {/* Etape 2 */}
            <AnimatedSection delay={0.2}>
              <div className="bg-bg-card border border-border-subtle rounded-2xl p-8 h-full flex flex-col items-center text-center opacity-80 hover:opacity-100 transition-opacity">
                <img src="https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=200" alt="vitalCHECK" className="w-16 h-16 rounded-full object-cover mb-6 border-2 border-border-subtle shadow-lg" />
                <h3 className="text-2xl font-serif text-text-primary mb-1">vitalCHECK</h3>
                <h4 className="text-gold text-xs uppercase tracking-widest font-bold mb-4">Diagnostic de votre entreprise</h4>
                <p className="text-text-secondary text-sm mb-6 flex-grow">
                  Identifiez précisément les freins de votre entreprise. Rapport personnalisé.
                </p>
                <a href="https://www.checkmyenterprise.com/pricing" target="_blank" rel="noreferrer" className="text-gold text-xs font-bold uppercase tracking-widest hover:text-gold-light inline-flex items-center gap-1">
                  En savoir plus <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            </AnimatedSection>

            {/* Etape 3 */}
            <AnimatedSection delay={0.3}>
              <div className="bg-bg-card border border-border-subtle rounded-2xl p-8 h-full flex flex-col items-center text-center opacity-80 hover:opacity-100 transition-opacity">
                <img src="https://images.unsplash.com/photo-1552581234-26160f608093?auto=format&fit=crop&q=80&w=200" alt="Conseil UBB" className="w-16 h-16 rounded-full object-cover mb-6 border-2 border-border-subtle shadow-lg" />
                <h3 className="text-2xl font-serif text-text-primary mb-1">Conseil UBB</h3>
                <h4 className="text-gold text-xs uppercase tracking-widest font-bold mb-4">Accompagnement personnalisé</h4>
                <p className="text-text-secondary text-sm mb-6 flex-grow">
                  Notre équipe travaille avec vous sur le terrain pour transformer votre entreprise.
                </p>
                <a href="tel:+221771970713" className="text-gold text-xs font-bold uppercase tracking-widest hover:text-gold-light inline-flex items-center gap-1">
                  Nous contacter <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── SECTION 3 — CATALOGUE DÉTAILLÉ ───────────────────────── */}
      <section className="py-24 bg-bg-primary">
        <div className="max-w-5xl mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-serif text-text-primary mb-4">Ce que vous obtenez</h2>
            <p className="text-gold text-lg italic">Un pack complet. Tout inclus. Accès immédiat.</p>
          </AnimatedSection>

          <AnimatedSection className="flex flex-col md:flex-row justify-center gap-8 mb-16">
            <img src="https://d1yei2z3i6k35z.cloudfront.net/10694324/6899720e2dc39_COV2.png" alt="E-book" className="w-48 h-auto rounded shadow-2xl -rotate-6 border border-white/10" />
            <img src="https://d1yei2z3i6k35z.cloudfront.net/10694324/689972c2536ee_COV1.png" alt="E-book" className="w-48 h-auto rounded shadow-2xl rotate-3 border border-white/10 z-10 -ml-12 md:ml-0 mt-12 md:mt-0" />
          </AnimatedSection>

          <div className="grid grid-cols-1 gap-6 mb-12">
            {PACK_CONTENTS.map((item, index) => (
              <AnimatedSection key={index} delay={index * 0.1}>
                <div className="bg-bg-card border border-border-subtle rounded-xl p-6 hover:border-gold/30 transition-colors flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                  <img src={item.image} alt={item.title} className="w-20 h-20 object-cover rounded-lg border border-white/5 shadow-lg flex-shrink-0" />
                  <div className="flex-1">
                    <span className="inline-block px-3 py-1 bg-gold/10 text-gold text-[10px] font-bold uppercase tracking-widest rounded-full mb-3">
                      {item.type}
                    </span>
                    <h3 className="text-xl font-serif text-text-primary mb-2 flex items-center justify-between">
                      {item.title}
                      <span className="hidden sm:inline-flex items-center text-[10px] font-sans text-green-400 font-bold uppercase tracking-widest">
                        ✓ Inclus dans le pack
                      </span>
                    </h3>
                    <p className="text-text-secondary text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection>
            <div className="text-center py-6 border-t border-border-subtle text-text-muted text-sm uppercase tracking-widest font-bold">
              5 ressources · Accès immédiat après paiement · Format digital
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── SECTION 4 — GARANTIE & RÉASSURANCE ───────────────────── */}
      <section className="py-20 bg-bg-secondary border-t border-border-subtle relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <AnimatedSection delay={0.1}>
              <div className="flex flex-col items-center">
                <img src="https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&q=80&w=200" alt="Accès immédiat" className="w-20 h-20 object-cover rounded-full mb-6 border border-border-subtle shadow-lg" />
                <h3 className="text-xl font-serif text-text-primary mb-4">Accès immédiat</h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  Vous recevez vos ressources par email dès confirmation du paiement.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="flex flex-col items-center">
                <img src="https://images.unsplash.com/photo-1523805009345-7448845a9e53?auto=format&fit=crop&q=80&w=200" alt="Conçu pour l'Afrique" className="w-20 h-20 object-cover rounded-full mb-6 border border-border-subtle shadow-lg" />
                <h3 className="text-xl font-serif text-text-primary mb-4">Conçu pour l'Afrique</h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  Contenu adapté aux réalités des marchés et entreprises africains francophones.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.3}>
              <div className="flex flex-col items-center">
                <img src="https://images.unsplash.com/photo-1614064641913-6b20a70e70ab?auto=format&fit=crop&q=80&w=200" alt="Paiement sécurisé" className="w-20 h-20 object-cover rounded-full mb-6 border border-border-subtle shadow-lg" />
                <h3 className="text-xl font-serif text-text-primary mb-4">Paiement sécurisé</h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  Paiement via PayPal — protection acheteur incluse sur chaque transaction.
                </p>
              </div>
            </AnimatedSection>
          </div>

          <AnimatedSection delay={0.4}>
            <div className="mt-16 bg-bg-primary/50 border border-border-subtle rounded-lg p-6 max-w-2xl mx-auto text-center">
              <p className="text-text-muted text-xs italic leading-relaxed">
                💡 Le paiement est traité en livres sterling (GBP) via PayPal. Le montant de {PACK_PRICE.display} correspond à £{PACK_PRICE.GBP.toFixed(2)} au taux actuel. Votre banque ou PayPal effectue la conversion automatiquement.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── SECTION 5 — COMMANDE (Checkout) ──────────────────────── */}
      <section id="commander" className="py-24 bg-bg-primary border-t border-border-subtle relative">
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <AnimatedSection>
            {!paymentSuccess ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                {/* Colonne gauche : formulaire */}
                <div className="bg-bg-card border border-border-subtle p-8 rounded-sm shadow-xl">
                  <OrderForm
                    formData={formData}
                    errors={errors}
                    touched={touched}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    countries={countries}
                  />
                </div>

                {/* Colonne droite : récapitulatif + PayPal */}
                <div className="bg-bg-card border border-border-subtle p-8 rounded-sm shadow-xl sticky top-32">
                  <OrderSummary
                    formData={formData}
                    isFormValid={isValid}
                    onPayPalApprove={handlePayPalSuccess}
                    onPayPalError={handlePayPalError}
                  />
                </div>
              </div>
            ) : (
              <CheckoutSuccess
                details={paymentDetails}
                formData={formData}
                onReset={handleReset}
              />
            )}

            {paymentError && (
              <div className="mt-8 p-6 border border-red-500/30 bg-red-500/5 text-red-400 text-sm text-center rounded-sm max-w-2xl mx-auto">
                Une erreur est survenue lors du paiement. Veuillez réessayer ou contacter le support UBB.
              </div>
            )}
          </AnimatedSection>
        </div>
      </section>

      {/* ── SECTION 6 — CTA MONTÉE EN GAMME ──────────────────────── */}
      <section className="py-24 bg-bg-primary border-t border-border-subtle">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <AnimatedSection>
            <div className="border border-gold/30 bg-gold/5 rounded-2xl p-10 md:p-16 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 blur-[100px] pointer-events-none rounded-full" />
              <h2 className="text-3xl md:text-5xl font-serif text-text-primary mb-6 relative z-10">Prêt à aller plus loin ?</h2>
              <p className="text-text-secondary text-lg mb-10 leading-relaxed max-w-2xl mx-auto relative z-10">
                Les ressources donnent les bases. vitalCHECK identifie exactement ce qui freine votre entreprise. Notre équipe prend ensuite le relais pour transformer ces insights en résultats mesurables.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
                <a 
                  href="https://www.checkmyenterprise.com/pricing" 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-gold text-bg-primary font-bold uppercase tracking-widest text-xs rounded-full hover:bg-gold-light transition-all"
                >
                  Faire mon diagnostic vitalCHECK <ArrowRight className="w-4 h-4" />
                </a>
                <a 
                  href="tel:+221771970713" 
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 border border-border-subtle text-text-secondary hover:text-gold hover:border-gold font-bold uppercase tracking-widest text-xs rounded-full transition-all"
                >
                  Parler à l'équipe UBB
                </a>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

    </div>
  );
}
