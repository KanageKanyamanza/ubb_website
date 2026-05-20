// src/components/checkout/CheckoutSuccess.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle2, Package } from "lucide-react";
import { CheckoutFormData } from "../../hooks/useCheckoutForm";
import { useLanguage } from "../../context/LanguageContext";

interface CheckoutSuccessProps {
  details: any;
  formData: CheckoutFormData;
  onReset: () => void;
}

export const CheckoutSuccess: React.FC<CheckoutSuccessProps> = ({
  details,
  formData,
  onReset,
}) => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div className="bg-bg-card border border-border-subtle p-10 md:p-16 rounded-sm text-center max-w-2xl mx-auto shadow-2xl relative overflow-hidden">
      {/* Top Gold Bar */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gold-gradient" />
      
      <div className="mb-8 flex justify-center">
        <div className="w-20 h-20 bg-gold/10 rounded-full flex items-center justify-center border border-gold/20">
          <CheckCircle2 className="w-10 h-10 text-gold" />
        </div>
      </div>

      <h2 className="text-4xl font-serif text-text-primary italic mb-4">{t("checkout.successTitle")}</h2>
      <p className="text-text-secondary text-lg mb-10 italic">
        {t("checkout.successDesc").replace("{name}", formData.firstName)}
      </p>

      <div className="bg-bg-primary/50 border border-border-subtle rounded-sm p-8 text-left mb-10 space-y-4">
        <div className="flex justify-between items-center border-b border-border-subtle pb-4">
          <span className="text-[10px] uppercase tracking-widest text-text-muted font-bold">{t("checkout.orderLabel")}</span>
          <span className="text-sm text-text-primary font-medium flex items-center gap-2">
            <Package className="w-4 h-4 text-gold" />
            {t("checkout.packTitle")}
          </span>
        </div>
        <div className="flex justify-between items-center border-b border-border-subtle pb-4">
          <span className="text-[10px] uppercase tracking-widest text-text-muted font-bold">{t("checkout.amountLabel")}</span>
          <div className="text-right">
            <span className="text-sm text-gold font-bold">23,50 €</span>
            <span className="text-[10px] text-text-muted block mt-1">{t("checkout.processedInGbp")}</span>
          </div>
        </div>
        <div className="flex justify-between items-center border-b border-border-subtle pb-4">
          <span className="text-[10px] uppercase tracking-widest text-text-muted font-bold">{t("checkout.deliveryEmailLabel")}</span>
          <span className="text-sm text-text-secondary">{formData.email}</span>
        </div>
        <div className="flex justify-between items-center pt-2">
          <span className="text-[10px] uppercase tracking-widest text-text-muted font-bold">{t("checkout.transactionIdLabel")}</span>
          <span className="text-[10px] font-mono text-text-muted">{details.id}</span>
        </div>
      </div>

      <p className="text-text-muted text-sm leading-relaxed mb-12">
        {t("checkout.successDeliveryHelp").replace("{email}", formData.email)}
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => navigate("/")}
          className="flex-1 py-4 bg-gold-gradient text-bg-primary font-bold uppercase tracking-widest text-xs hover:shadow-[0_0_20px_rgba(201,151,58,0.3)] transition-all flex items-center justify-center gap-2"
        >
          {t("checkout.homeCta")}
        </button>
        <button
          onClick={() => navigate("/actualites")}
          className="flex-1 py-4 bg-bg-primary border border-border-subtle text-text-muted font-bold uppercase tracking-widest text-xs hover:text-gold hover:border-gold transition-all"
        >
          {t("checkout.newsCta")}
        </button>
      </div>

      <button
        onClick={onReset}
        className="mt-8 text-[10px] text-text-muted hover:text-gold transition-colors uppercase tracking-widest"
      >
        {t("checkout.newOrderCta")}
      </button>
    </div>
  );
};
