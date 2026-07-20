import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import AnimatedSection from "../components/ui/AnimatedSection";
import GoldDivider from "../components/ui/GoldDivider";
import { ImageAutoSlider } from "../components/ui/image-auto-slider";
import { PACK_CONTENTS } from "../data/ebooks";
import { PACK_PRICE } from "../utils/currency";

// Checkout Components
import { useCheckoutForm } from "../hooks/useCheckoutForm";
import { OrderForm } from "../components/checkout/OrderForm";
import { OrderSummary } from "../components/checkout/OrderSummary";
import { CheckoutSuccess } from "../components/checkout/CheckoutSuccess";
import { useSEO } from "../hooks/useSEO";
import { useLanguage } from "../context/LanguageContext";
import { useResources } from "../context/ResourcesContext";

export default function Ebooks() {
  const { t } = useLanguage();
  const { resources } = useResources();
  const visibleResources = resources.filter((r) => r.visible);

  useSEO({
    title: t("ebooks.seoTitle"),
    description: t("ebooks.seoDesc"),
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

  const scrollToCheckout = () => {
    document.getElementById('commander')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
              {t("ebooks.hero.tag")}
            </span>
            
            <h1 className="text-5xl md:text-7xl font-serif text-text-primary mb-6 italic leading-tight">
              {t("ebooks.hero.titleLine1")}<br />
              <span className="not-italic">{t("ebooks.hero.titleLine2")}</span>
            </h1>
            
            <p className="text-text-secondary text-lg md:text-xl font-serif max-w-2xl mx-auto mb-12 leading-relaxed">
              {t("ebooks.hero.desc")}
            </p>
            
            <div className="max-w-md mx-auto bg-bg-card border border-gold/30 rounded-xl p-8 shadow-[0_0_40px_rgba(184,115,51,0.1)] mb-10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 blur-2xl rounded-full" />
              <span className="text-text-primary font-bold uppercase tracking-widest text-sm block mb-4 relative z-10">
                {t("ebooks.hero.packTitle")}
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
              {t("ebooks.hero.cta")} <ArrowRight className="w-4 h-4" />
            </a>
          </AnimatedSection>
        </div>
      </section>

      {/* SECTION AUDIO / VIDEO */}
      <section className={'py-20 bg-bg-primary border-b border-border-subtle'}>
        <div className={'max-w-4xl mx-auto px-6'}>
          <AnimatedSection className={'text-center mb-10'}>
            <span className={'text-gold text-xs uppercase tracking-widest font-bold block mb-3'}>
              {t("ebooks.webinar.tag")}
            </span>
            <h2 className={'text-3xl md:text-4xl font-serif text-text-primary mb-4'}>
              {t("ebooks.webinar.title")}
            </h2>
            <p className={'text-text-secondary text-lg'}>
              {t("ebooks.webinar.desc")}
            </p>
          </AnimatedSection>

          <AnimatedSection>
            <div className={'rounded-2xl overflow-hidden border border-gold/30 bg-bg-card'}>
              <video
                className={'w-full aspect-video'}
                controls
                preload={'metadata'}
              >
                <source src={'/images/vebinaire.mp4'} type={'video/mp4'} />
                {t("ebooks.webinar.fallback")}
              </video>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── SECTION 2 — HIÉRARCHIE UBB ───────────────────────────── */}
      <section className="py-24 bg-bg-secondary border-b border-border-subtle">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif text-text-primary mb-4">{t("ebooks.journey.title")}</h2>
            <p className="text-text-secondary text-lg">{t("ebooks.journey.subtitle")}</p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-1/2 left-1/6 right-1/6 h-px bg-gold/30 -translate-y-1/2" />
            
            {/* Etape 1 */}
            <AnimatedSection delay={0.1}>
              <div className="bg-bg-primary border-2 border-gold/50 rounded-2xl p-8 relative h-full flex flex-col items-center text-center shadow-[0_0_20px_rgba(184,115,51,0.15)]">
                <span className="absolute -top-3 px-4 py-1 bg-gold text-bg-primary text-[10px] font-bold uppercase tracking-widest rounded-full">
                  {t("ebooks.journey.step1Tag")}
                </span>
                <img src="https://images.unsplash.com/photo-1456324504439-367cee3b3c32?auto=format&fit=crop&q=80&w=200" alt="Ressources" className="w-16 h-16 rounded-full object-cover mb-4 mt-2 border-2 border-gold/30 shadow-lg" />
                <h3 className="text-2xl font-serif text-text-primary mb-1">{t("ebooks.journey.step1Title")}</h3>
                <h4 className="text-gold text-xs uppercase tracking-widest font-bold mb-4">{t("ebooks.journey.step1Subtitle")}</h4>
                <p className="text-text-secondary text-sm mb-6 flex-grow">
                  {t("ebooks.journey.step1Desc")}
                </p>
                <span className="text-text-primary font-bold">{PACK_PRICE.display}</span>
              </div>
            </AnimatedSection>

            {/* Etape 2 */}
            <AnimatedSection delay={0.2}>
              <div className="bg-bg-card border border-border-subtle rounded-2xl p-8 h-full flex flex-col items-center text-center opacity-80 hover:opacity-100 transition-opacity">
                <img src="https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=200" alt="vitalCHECK" className="w-16 h-16 rounded-full object-cover mb-6 border-2 border-border-subtle shadow-lg" />
                <h3 className="text-2xl font-serif text-text-primary mb-1">{t("ebooks.journey.step2Title")}</h3>
                <h4 className="text-gold text-xs uppercase tracking-widest font-bold mb-4">{t("ebooks.journey.step2Subtitle")}</h4>
                <p className="text-text-secondary text-sm mb-6 flex-grow">
                  {t("ebooks.journey.step2Desc")}
                </p>
                <a href="https://www.checkmyenterprise.com/pricing" target="_blank" rel="noreferrer" className="text-gold text-xs font-bold uppercase tracking-widest hover:text-gold-light inline-flex items-center gap-1">
                  {t("ebooks.journey.step2Cta")} <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            </AnimatedSection>

            {/* Etape 3 */}
            <AnimatedSection delay={0.3}>
              <div className="bg-bg-card border border-border-subtle rounded-2xl p-8 h-full flex flex-col items-center text-center opacity-80 hover:opacity-100 transition-opacity">
                <img src="https://images.unsplash.com/photo-1552581234-26160f608093?auto=format&fit=crop&q=80&w=200" alt="Conseil UBB" className="w-16 h-16 rounded-full object-cover mb-6 border-2 border-border-subtle shadow-lg" />
                <h3 className="text-2xl font-serif text-text-primary mb-1">{t("ebooks.journey.step3Title")}</h3>
                <h4 className="text-gold text-xs uppercase tracking-widest font-bold mb-4">{t("ebooks.journey.step3Subtitle")}</h4>
                <p className="text-text-secondary text-sm mb-6 flex-grow">
                  {t("ebooks.journey.step3Desc")}
                </p>
                <a href="tel:+221771970713" className="text-gold text-xs font-bold uppercase tracking-widest hover:text-gold-light inline-flex items-center gap-1">
                  {t("ebooks.journey.step3Cta")} <ArrowRight className="w-3 h-3" />
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
            <h2 className="text-3xl md:text-5xl font-serif text-text-primary mb-4">{t("ebooks.content.title")}</h2>
            <p className="text-gold text-lg italic">{t("ebooks.content.subtitle")}</p>
          </AnimatedSection>

          <AnimatedSection className="flex flex-col md:flex-row justify-center gap-8 mb-16">
            <img src="https://d1yei2z3i6k35z.cloudfront.net/10694324/6899720e2dc39_COV2.png" alt="E-book" className="w-48 h-auto rounded shadow-2xl -rotate-6 border border-white/10" />
            <img src="https://d1yei2z3i6k35z.cloudfront.net/10694324/689972c2536ee_COV1.png" alt="E-book" className="w-48 h-auto rounded shadow-2xl rotate-3 border border-white/10 z-10 -ml-12 md:ml-0 mt-12 md:mt-0" />
          </AnimatedSection>

          <div className="grid grid-cols-1 gap-6 mb-12">
            {PACK_CONTENTS.map((item, index) => (
              <AnimatedSection key={index} delay={index * 0.1}>
                <div
                  onClick={scrollToCheckout}
                  className="bg-bg-card border border-border-subtle rounded-xl p-6 hover:border-gold/40 hover:shadow-[0_0_20px_rgba(184,115,51,0.1)] transition-all cursor-pointer flex flex-col sm:flex-row gap-6 items-start sm:items-center group"
                >
                  <img src={item.image} alt={t(`ebooks.items.item${index + 1}Title`)} className="w-20 h-20 object-cover rounded-lg border border-white/5 shadow-lg flex-shrink-0" />
                  <div className="flex-1">
                    <span className="inline-block px-3 py-1 bg-gold/10 text-gold text-[10px] font-bold uppercase tracking-widest rounded-full mb-3">
                      {item.type}
                    </span>
                    <h3 className="text-xl font-serif text-text-primary mb-2 flex items-center justify-between">
                      {t(`ebooks.items.item${index + 1}Title`)}
                      <span className="hidden sm:inline-flex items-center text-[10px] font-sans text-green-400 font-bold uppercase tracking-widest">
                        ✓ {t("ebooks.content.badge")}
                      </span>
                    </h3>
                    <p className="text-text-secondary text-sm leading-relaxed">
                      {t(`ebooks.items.item${index + 1}Desc`)}
                    </p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gold opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection>
            <div className="text-center py-6 border-t border-border-subtle text-text-muted text-sm uppercase tracking-widest font-bold">
              {t("ebooks.content.footer")}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── SECTION 3B — RESSOURCES COMPLÉMENTAIRES (gérées depuis l'admin) ── */}
      {visibleResources.length > 0 && (
        <section className="py-24 bg-bg-secondary border-t border-b border-border-subtle overflow-hidden">
          <AnimatedSection className="text-center mb-16 px-6">
            <h2 className="text-3xl md:text-5xl font-serif text-text-primary mb-4">{t("ebooks.additional.title")}</h2>
            <p className="text-gold text-lg italic">{t("ebooks.additional.subtitle")}</p>
          </AnimatedSection>

          <ImageAutoSlider items={visibleResources} />
        </section>
      )}

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
                {t("ebooks.checkout.errorMsg")}
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
              <h2 className="text-3xl md:text-5xl font-serif text-text-primary mb-6 relative z-10">{t("ebooks.upsell.title")}</h2>
              <p className="text-text-secondary text-lg mb-10 leading-relaxed max-w-2xl mx-auto relative z-10">
                {t("ebooks.upsell.desc")}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
                <a 
                  href="https://www.checkmyenterprise.com/pricing" 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-gold text-bg-primary font-bold uppercase tracking-widest text-xs rounded-full hover:bg-gold-light transition-all"
                >
                  {t("ebooks.upsell.ctaPrimary")} <ArrowRight className="w-4 h-4" />
                </a>
                <a 
                  href="tel:+221771970713" 
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 border border-border-subtle text-text-secondary hover:text-gold hover:border-gold font-bold uppercase tracking-widest text-xs rounded-full transition-all"
                >
                  {t("ebooks.upsell.ctaSecondary")}
                </a>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

    </div>
  );
}

