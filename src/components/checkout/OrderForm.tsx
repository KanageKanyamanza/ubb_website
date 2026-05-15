// src/components/checkout/OrderForm.tsx
import React from "react";
import { Mail, ChevronDown } from "lucide-react";
import { CheckoutFormData, CheckoutFormErrors } from "../../hooks/useCheckoutForm";

interface OrderFormProps {
  formData: CheckoutFormData;
  errors: CheckoutFormErrors;
  touched: Record<string, boolean>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleBlur: (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => void;
  countries: { code: string; name: string }[];
}

export const OrderForm: React.FC<OrderFormProps> = ({
  formData,
  errors,
  touched,
  handleChange,
  handleBlur,
  countries,
}) => {
  const inputClass = (name: keyof CheckoutFormErrors) => `
    w-full bg-bg-card border 
    ${touched[name] && errors[name] ? "border-red-500" : "border-border-subtle"}
    text-text-primary placeholder-text-muted
    px-4 py-3 text-sm outline-none
    focus:border-gold transition-colors duration-200
  `;

  const labelClass = "block text-text-secondary text-xs uppercase tracking-widest mb-2 font-medium";

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-serif text-text-primary italic mb-8">Informations de commande</h2>

      {/* Ligne 1 : Prénom + Nom */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="firstName" className={labelClass}>Prénom</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            onBlur={handleBlur}
            className={inputClass("firstName")}
            placeholder="Votre prénom"
          />
          {touched.firstName && errors.firstName && (
            <p className="text-red-400 text-[10px] mt-1 uppercase tracking-wider">{errors.firstName}</p>
          )}
        </div>
        <div>
          <label htmlFor="lastName" className={labelClass}>Nom</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            onBlur={handleBlur}
            className={inputClass("lastName")}
            placeholder="Votre nom"
          />
          {touched.lastName && errors.lastName && (
            <p className="text-red-400 text-[10px] mt-1 uppercase tracking-wider">{errors.lastName}</p>
          )}
        </div>
      </div>

      {/* Ligne 2 : Email */}
      <div>
        <label htmlFor="email" className={labelClass}>Adresse email</label>
        <div className="relative">
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={inputClass("email")}
            placeholder="adresse@exemple.com"
          />
          <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
        </div>
        {touched.email && errors.email && (
          <p className="text-red-400 text-[10px] mt-1 uppercase tracking-wider">{errors.email}</p>
        )}
      </div>

      {/* Ligne 3 : Ville + Code postal */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="city" className={labelClass}>Ville</label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            onBlur={handleBlur}
            className={inputClass("city")}
            placeholder="Ex: Dakar"
          />
          {touched.city && errors.city && (
            <p className="text-red-400 text-[10px] mt-1 uppercase tracking-wider">{errors.city}</p>
          )}
        </div>
        <div>
          <label htmlFor="zipCode" className={labelClass}>Code postal</label>
          <input
            type="text"
            id="zipCode"
            name="zipCode"
            value={formData.zipCode}
            onChange={handleChange}
            onBlur={handleBlur}
            className={inputClass("zipCode")}
            placeholder="Ex: 10000"
          />
          {touched.zipCode && errors.zipCode && (
            <p className="text-red-400 text-[10px] mt-1 uppercase tracking-wider">{errors.zipCode}</p>
          )}
        </div>
      </div>

      {/* Ligne 4 : Pays */}
      <div>
        <label htmlFor="country" className={labelClass}>Pays</label>
        <div className="relative">
          <select
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full bg-bg-card border border-border-subtle text-text-primary px-4 py-3 text-sm outline-none focus:border-gold transition-colors duration-200 appearance-none cursor-pointer"
          >
            {countries.map((country) => (
              <option key={country.code} value={country.code} className="bg-bg-card">
                {country.name}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gold pointer-events-none" />
        </div>
      </div>
    </div>
  );
};
