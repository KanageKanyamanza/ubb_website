// src/components/checkout/OrderForm.tsx
import React from "react";
import { Mail, ChevronDown } from "lucide-react";
import { CheckoutFormData, CheckoutFormErrors } from "../../hooks/useCheckoutForm";
import { useLanguage } from "../../context/LanguageContext";

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
  const { t } = useLanguage();

  const inputClass = (name: keyof CheckoutFormErrors) => `
    w-full bg-bg-card border 
    ${touched[name] && errors[name] ? "border-red-500" : "border-border-subtle"}
    text-text-primary placeholder-text-muted
    px-4 py-3 text-sm outline-none
    focus:border-gold transition-colors duration-200
  `;

  const labelClass = "block text-text-secondary text-xs uppercase tracking-widest mb-2 font-medium";

  // Translate validation error messages dynamically
  const getErrorMessage = (name: keyof CheckoutFormErrors): string | undefined => {
    const err = errors[name];
    if (!err) return undefined;
    
    // Check if error is one of standard messages and map to translated keys if available
    if (err === "Le prénom est obligatoire") return t("postuler.form.prenom") + " " + (t("contact.form.required") || "obligatoire");
    if (err === "Le nom est obligatoire") return t("postuler.form.nom") + " " + (t("contact.form.required") || "obligatoire");
    if (err === "L'email est obligatoire") return t("postuler.form.email") + " " + (t("contact.form.required") || "obligatoire");
    if (err === "This field is required") return t("contact.form.required") || "Requis";
    if (err === "Minimum 2 caractères") return t("postuler.form.minChars") || "Minimum 2 caractères";
    if (err === "Format email invalide") return t("postuler.form.invalidEmail") || "Format email invalide";
    
    return err;
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-serif text-text-primary italic mb-8">{t("checkout.title")}</h2>

      {/* Ligne 1 : Prénom + Nom */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="firstName" className={labelClass}>{t("checkout.firstName")}</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            onBlur={handleBlur}
            className={inputClass("firstName")}
            placeholder={t("checkout.firstNamePlaceholder")}
          />
          {touched.firstName && errors.firstName && (
            <p className="text-red-400 text-[10px] mt-1 uppercase tracking-wider">{getErrorMessage("firstName")}</p>
          )}
        </div>
        <div>
          <label htmlFor="lastName" className={labelClass}>{t("checkout.lastName")}</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            onBlur={handleBlur}
            className={inputClass("lastName")}
            placeholder={t("checkout.lastNamePlaceholder")}
          />
          {touched.lastName && errors.lastName && (
            <p className="text-red-400 text-[10px] mt-1 uppercase tracking-wider">{getErrorMessage("lastName")}</p>
          )}
        </div>
      </div>

      {/* Ligne 2 : Email */}
      <div>
        <label htmlFor="email" className={labelClass}>{t("checkout.email")}</label>
        <div className="relative">
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={inputClass("email")}
            placeholder={t("checkout.emailPlaceholder")}
          />
          <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
        </div>
        {touched.email && errors.email && (
          <p className="text-red-400 text-[10px] mt-1 uppercase tracking-wider">{getErrorMessage("email")}</p>
        )}
      </div>

      {/* Ligne 3 : Ville + Code postal */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="city" className={labelClass}>{t("checkout.city")}</label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            onBlur={handleBlur}
            className={inputClass("city")}
            placeholder={t("checkout.cityPlaceholder")}
          />
          {touched.city && errors.city && (
            <p className="text-red-400 text-[10px] mt-1 uppercase tracking-wider">{getErrorMessage("city")}</p>
          )}
        </div>
        <div>
          <label htmlFor="zipCode" className={labelClass}>{t("checkout.zipCode")}</label>
          <input
            type="text"
            id="zipCode"
            name="zipCode"
            value={formData.zipCode}
            onChange={handleChange}
            onBlur={handleBlur}
            className={inputClass("zipCode")}
            placeholder={t("checkout.zipCodePlaceholder")}
          />
          {touched.zipCode && errors.zipCode && (
            <p className="text-red-400 text-[10px] mt-1 uppercase tracking-wider">{getErrorMessage("zipCode")}</p>
          )}
        </div>
      </div>

      {/* Ligne 4 : Pays */}
      <div>
        <label htmlFor="country" className={labelClass}>{t("checkout.country")}</label>
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
                {t(`countries.${country.code.toLowerCase()}`) || country.name}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gold pointer-events-none" />
        </div>
      </div>
    </div>
  );
};
