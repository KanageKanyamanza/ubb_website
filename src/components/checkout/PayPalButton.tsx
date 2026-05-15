// src/components/checkout/PayPalButton.tsx
import React, { useState, useEffect } from "react";
import { CheckoutFormData } from "../../hooks/useCheckoutForm";

interface PayPalButtonProps {
  formData: CheckoutFormData;
  onApprove: (details: any) => void;
  onError: (err: any) => void;
  disabled: boolean;
}

declare global {
  interface Window {
    paypal?: any;
  }
}

export const PayPalButton: React.FC<PayPalButtonProps> = ({
  formData,
  onApprove,
  onError,
  disabled,
}) => {
  const [payPalReady, setPayPalReady] = useState(false);

  useEffect(() => {
    // Load PayPal SDK dynamically
    const clientID = import.meta.env.VITE_PAYPAL_CLIENT_ID;
    
    if (!clientID) {
      console.error("PayPal Client ID missing in .env");
      return;
    }

    const scriptId = "paypal-sdk-script";
    let script = document.getElementById(scriptId) as HTMLScriptElement;

    if (!script) {
      script = document.createElement("script");
      script.id = scriptId;
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientID}&currency=GBP&locale=fr_FR`;
      script.async = true;
      script.defer = true;
      script.onload = () => setPayPalReady(true);
      document.body.appendChild(script);
    } else if (window.paypal) {
      setPayPalReady(true);
    }

    // Cleanup not recommended for SDK scripts usually, but if we wanted to:
    // return () => { if (script) document.body.removeChild(script); }
  }, []);

  useEffect(() => {
    if (!payPalReady || !window.paypal || disabled) return;

    // Clear the container before rendering to avoid duplicates
    const container = document.getElementById("paypal-button-container");
    if (container) container.innerHTML = "";

    window.paypal.Buttons({
      style: {
        layout: 'vertical',
        color: 'gold',
        shape: 'rect',
        label: 'pay',
        height: 48
      },

      createOrder: (data: any, actions: any) => {
        return actions.order.create({
          purchase_units: [{
            description: "Pack Ressources Digitales UBB — E-books",
            amount: {
              currency_code: "GBP",
              value: "20.00"
            },
            custom_id: formData.email, // email acheteur pour livraison
          }],
          application_context: {
            shipping_preference: "NO_SHIPPING" // produit digital
          }
        });
      },

      onApprove: (data: any, actions: any) => {
        return actions.order.capture().then((details: any) => {
          onApprove(details);
        });
      },

      onError: (err: any) => {
        console.error("PayPal error:", err);
        onError(err);
      },

      onCancel: () => {
        console.log("Paiement annulé par l'utilisateur");
      }

    }).render("#paypal-button-container");

  }, [payPalReady, disabled, formData.email]);

  return (
    <div className="w-full">
      {!payPalReady && (
        <div className="h-12 bg-gold/10 animate-pulse rounded-sm border border-gold/20 flex items-center justify-center">
          <span className="text-[10px] text-gold uppercase tracking-[0.2em] font-bold">Chargement PayPal...</span>
        </div>
      )}
      
      {payPalReady && disabled && (
        <div className="mb-6 p-4 bg-gold/5 border border-gold/10 rounded-sm text-center">
          <p className="text-text-muted text-xs italic">
            Veuillez compléter le formulaire avant de payer
          </p>
        </div>
      )}

      <div
        id="paypal-button-container"
        className={`transition-opacity duration-300 ${disabled ? "opacity-30 pointer-events-none" : "opacity-100"}`}
      />
    </div>
  );
};
