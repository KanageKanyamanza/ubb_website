// src/components/checkout/OrderSummary.tsx
import React from "react";
import { Lock, ShieldCheck, Tag } from "lucide-react";
import { PayPalButton } from "./PayPalButton";
import { CheckoutFormData } from "../../hooks/useCheckoutForm";

interface OrderSummaryProps {
  formData: CheckoutFormData;
  isFormValid: boolean;
  onPayPalApprove: (details: any) => void;
  onPayPalError: (err: any) => void;
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({
  formData,
  isFormValid,
  onPayPalApprove,
  onPayPalError,
}) => {
  return (
    <div className="space-y-10">
      <h2 className="text-2xl font-serif text-text-primary italic">Récapitulatif de commande</h2>

      {/* Order Details Card */}
      <div className="bg-bg-primary/40 border border-border-subtle rounded-sm p-6 space-y-6">
        <div className="flex gap-4 items-start">
          <div className="flex -space-x-4">
             <img 
               src="https://d1yei2z3i6k35z.cloudfront.net/10694324/6899720e2dc39_COV2.png" 
               alt="Ebook 1" 
               className="w-16 h-20 object-cover rounded-sm shadow-xl border border-white/5 transform -rotate-6" 
             />
             <img 
               src="https://d1yei2z3i6k35z.cloudfront.net/10694324/689972c2536ee_COV1.png" 
               alt="Ebook 2" 
               className="w-16 h-20 object-cover rounded-sm shadow-xl border border-white/5 transform rotate-3" 
             />
          </div>
          <div className="flex-1">
            <h3 className="text-text-primary font-bold text-sm leading-tight mb-1">Pack Ressources Digitales UBB</h3>
            <p className="text-text-muted text-[10px] uppercase tracking-widest leading-relaxed">E-books + Podcasts + Cours vidéos</p>
          </div>
          <span className="text-text-primary font-bold text-sm">£ 20,00</span>
        </div>

        <div className="h-px bg-border-subtle" />

        <div className="flex justify-between items-center text-text-muted">
          <div className="flex items-center gap-2">
            <Tag className="w-3.5 h-3.5" />
            <span className="text-xs">Coupon de réduction</span>
          </div>
          <span className="text-xs">– £ 0,00</span>
        </div>

        <div className="h-px bg-border-subtle" />

        <div className="flex justify-between items-center">
          <span className="text-text-primary font-bold uppercase tracking-widest text-xs">Total</span>
          <span className="text-gold font-bold text-xl">£ 20,00</span>
        </div>
      </div>

      {/* Payment Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
           <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center border border-gold/20">
                <Lock className="w-4 h-4 text-gold" />
              </div>
              <h3 className="text-text-primary font-bold text-sm uppercase tracking-widest">Paiement sécurisé</h3>
           </div>
           <div className="flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full">
              <ShieldCheck className="w-3.5 h-3.5 text-green-400" />
              <span className="text-[9px] text-green-400 font-bold uppercase tracking-widest">SSL Secure</span>
           </div>
        </div>

        <PayPalButton 
          formData={formData}
          disabled={!isFormValid}
          onApprove={onPayPalApprove}
          onError={onPayPalError}
        />

        <p className="text-center text-text-muted text-[10px] leading-relaxed max-w-xs mx-auto">
          En finalisant votre achat, vous acceptez les <br />
          <a href="#" className="text-gold hover:underline">Conditions d'utilisation</a> & <a href="#" className="text-gold hover:underline">Politique de confidentialité</a> d'UBB.
        </p>
      </div>
    </div>
  );
};
