// src/pages/Ebooks.tsx
import React, { useState } from "react";
import { BookOpen, Download, ShieldCheck, ArrowRight, Library } from "lucide-react";
import AnimatedSection from "../components/ui/AnimatedSection";
import GoldDivider from "../components/ui/GoldDivider";

// Checkout Components
import { useCheckoutForm } from "../hooks/useCheckoutForm";
import { OrderForm } from "../components/checkout/OrderForm";
import { OrderSummary } from "../components/checkout/OrderSummary";
import { CheckoutSuccess } from "../components/checkout/CheckoutSuccess";

export default function Ebooks() {
  // Checkout State
  const { formData, errors, touched, handleChange, handleBlur, isValid, countries } = useCheckoutForm();
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState<any>(null);
  const [paymentError, setPaymentError] = useState(false);

  const handlePayPalSuccess = (details: any) => {
    setPaymentDetails(details);
    setPaymentSuccess(true);
    // Optionnel : envoyer les données vers un webhook / email
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
    <div className="flex flex-col w-full bg-bg-primary overflow-hidden">
      
      {/* ── Hero Section ─────────────────────────────────────────── */}
      <section className="relative pt-48 pb-32 overflow-hidden border-b border-border-subtle min-h-[70vh] flex items-center">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center grayscale-[20%] scale-105"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&q=80&w=2000')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-bg-primary/95 via-bg-primary/80 to-bg-primary" />
        
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-gold/10 blur-[140px] rounded-full -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        
        {/* Animated Grain Overlay */}
        <div
          className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />

        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full text-center">
          <AnimatedSection>
            <div className="mb-10 inline-block">
                <img 
                  src="https://d1yei2z3i6k35z.cloudfront.net/10694324/691e68ac86ecf_ubb.jpg" 
                  alt="UBB Logo" 
                  className="h-24 md:h-32 mx-auto rounded-xs shadow-[0_20px_50px_rgba(0,0,0,0.5)] brightness-110 border border-white/10"
                />
            </div>
            <span className="text-gold text-[11px] uppercase tracking-[0.5em] font-bold block mb-8">Connaissances & Stratégies</span>
            <h1 className="text-6xl md:text-8xl font-serif text-text-primary mb-8 italic leading-tight">
              Bibliothèque <span className="text-gold-gradient not-italic">Digitale</span>
            </h1>
            <p className="text-text-secondary text-xl md:text-2xl font-serif italic max-w-3xl mx-auto mb-10 leading-relaxed">
              Des ressources exclusives pour transformer votre vision en exécution opérationnelle.
            </p>
            <div className="flex justify-center mb-12">
              <GoldDivider />
            </div>
            <a 
              href="#commander" 
              className="inline-flex items-center gap-4 px-12 py-6 bg-gold-gradient text-bg-primary font-bold uppercase tracking-widest text-sm hover:shadow-[0_0_30px_rgba(201,151,58,0.5)] transition-all rounded-sm group"
            >
              Commander le Pack
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </a>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Library Showcase ─────────────────────────────────────── */}
      <section className="py-32 bg-bg-secondary relative">
        <div className="max-w-7xl mx-auto px-6">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <AnimatedSection className="grid grid-cols-2 gap-6 relative">
                 <div className="absolute inset-0 bg-gold/5 blur-[100px] pointer-events-none" />
                 
                 <div className="relative transform hover:-translate-y-4 transition-all duration-700 shadow-2xl group">
                    <div className="absolute inset-0 bg-gold/20 opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none" />
                    <img src="https://d1yei2z3i6k35z.cloudfront.net/10694324/6899720e2dc39_COV2.png" alt="Ebook Finance" className="w-full h-auto rounded-sm border border-white/5" />
                 </div>
                 <div className="relative transform translate-y-12 hover:-translate-y-4 transition-all duration-700 shadow-2xl group">
                    <div className="absolute inset-0 bg-gold/20 opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none" />
                    <img src="https://d1yei2z3i6k35z.cloudfront.net/10694324/689972c2536ee_COV1.png" alt="Ebook Marketing" className="w-full h-auto rounded-sm border border-white/5" />
                 </div>
              </AnimatedSection>

              <AnimatedSection delay={0.3}>
                 <div className="flex items-center gap-4 mb-8">
                    <Library className="w-6 h-6 text-gold" />
                    <h2 className="text-4xl font-serif text-text-primary italic leading-tight">Ressources Stratégiques</h2>
                 </div>
                 
                 <div className="space-y-8 text-text-secondary text-lg leading-relaxed font-light">
                    <p className="border-l-2 border-gold/30 pl-8 italic">
                      Découvrez nos guides stratégiques, podcasts immersifs et cours vidéos conçus spécialement pour les PME africaines en quête de croissance exponentielle.
                    </p>
                    
                    <ul className="space-y-6">
                      {[
                        { icon: <BookOpen className="w-5 h-5" />, text: "E-books sur la finance et la structuration" },
                        { icon: <Download className="w-5 h-5" />, text: "Workbooks d'exécution opérationnelle" },
                        { icon: <ShieldCheck className="w-5 h-5" />, text: "Séries exclusives de podcasts Leadership" }
                      ].map((item, i) => (
                        <li key={i} className="flex gap-5 items-center group">
                          <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center border border-gold/20 group-hover:border-gold/50 transition-all">
                            <span className="text-gold">{item.icon}</span>
                          </div>
                          <span className="group-hover:text-gold transition-colors">{item.text}</span>
                        </li>
                      ))}
                    </ul>
                 </div>
              </AnimatedSection>
           </div>
        </div>
      </section>

      {/* ── Integrated Checkout Flow ─────────────────────────────── */}
      <section id="commander" className="py-32 bg-bg-primary relative overflow-hidden border-t border-border-subtle">
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold/5 blur-[150px] rounded-full pointer-events-none" />
        
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-serif italic text-gold mb-6">Commander le Pack Complet</h2>
              <p className="text-text-secondary max-w-xl mx-auto text-lg italic">
                Accédez immédiatement à tous nos e-books, podcasts et supports de formation pour booster votre PME.
              </p>
            </div>

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

            {/* Message d'erreur PayPal global */}
            {paymentError && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-12 p-6 border border-red-500/30 bg-red-500/5 text-red-400 text-sm text-center rounded-sm max-w-2xl mx-auto"
              >
                Une erreur est survenue lors du paiement. Veuillez réessayer ou contacter le support UBB.
              </motion.div>
            )}
          </AnimatedSection>
        </div>
      </section>

      {/* ── Business Diagnostic ──────────────────────────────────── */}
      <section className="py-32 bg-bg-secondary relative">
        <div className="max-w-7xl mx-auto px-6">
           <AnimatedSection className="text-center">
              <h3 className="text-4xl font-serif italic text-text-primary mb-6">Diagnostic d'Entreprise</h3>
              <GoldDivider className="mx-auto" />
              <p className="mt-8 text-text-secondary max-w-2xl mx-auto text-lg mb-16 font-light italic">
                Identifiez instantanément les leviers de performance inexploités de votre organisation.
              </p>
              
              <div className="relative group max-w-5xl mx-auto rounded-sm overflow-hidden border border-border-subtle shadow-2xl">
                 <div className="absolute inset-0 bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-10" />
                 <img 
                   src="https://d1yei2z3i6k35z.cloudfront.net/10694324/6942dc625f7ac_691dc15f6f652_grille-Recupere1.png" 
                   alt="Grille de Diagnostic UBB" 
                   className="w-full h-auto relative z-10 transition-transform duration-1000 group-hover:scale-[1.02]" 
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/40 to-transparent" />
              </div>
           </AnimatedSection>
        </div>
      </section>

    </div>
  );
}
