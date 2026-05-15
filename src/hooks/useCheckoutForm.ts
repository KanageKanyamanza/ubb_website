// src/hooks/useCheckoutForm.ts
import { useState, ChangeEvent, FocusEvent } from "react";

export interface CheckoutFormData {
  firstName: string;
  lastName: string;
  email: string;
  city: string;
  zipCode: string;
  country: string;
}

export interface CheckoutFormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  city?: string;
  zipCode?: string;
}

export const useCheckoutForm = () => {
  const [formData, setFormData] = useState<CheckoutFormData>({
    firstName: "",
    lastName: "",
    email: "",
    city: "",
    zipCode: "",
    country: "SN", // Sénégal par défaut
  });

  const [errors, setErrors] = useState<CheckoutFormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const countries = [
    { code: "SN", name: "Sénégal" },
    { code: "CI", name: "Côte d'Ivoire" },
    { code: "ML", name: "Mali" },
    { code: "BF", name: "Burkina Faso" },
    { code: "GN", name: "Guinée" },
    { code: "TG", name: "Togo" },
    { code: "BJ", name: "Bénin" },
    { code: "CM", name: "Cameroun" },
    { code: "CD", name: "Congo RDC" },
    { code: "GA", name: "Gabon" },
    { code: "MG", name: "Madagascar" },
    { code: "MR", name: "Mauritanie" },
    { code: "NE", name: "Niger" },
    { code: "RW", name: "Rwanda" },
    { code: "BI", name: "Burundi" },
    { code: "FR", name: "France" },
    { code: "BE", name: "Belgique" },
    { code: "CH", name: "Suisse" },
    { code: "CA", name: "Canada" },
    { code: "GB", name: "Royaume-Uni" },
    { code: "US", name: "États-Unis" },
  ];

  const validateField = (name: keyof CheckoutFormData, value: string): string => {
    switch (name) {
      case "firstName":
        if (!value) return "Le prénom est obligatoire";
        if (value.length < 2) return "Minimum 2 caractères";
        return "";
      case "lastName":
        if (!value) return "Le nom est obligatoire";
        if (value.length < 2) return "Minimum 2 caractères";
        return "";
      case "email":
        if (!value) return "L'email est obligatoire";
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return "Format email invalide";
        return "";
      case "city":
        if (!value) return "This field is required";
        return "";
      case "zipCode":
        if (!value) return "This field is required";
        return "";
      default:
        return "";
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (hasSubmitted || touched[name]) {
      const error = validateField(name as keyof CheckoutFormData, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const error = validateField(name as keyof CheckoutFormData, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const validate = (): boolean => {
    setHasSubmitted(true);
    const newErrors: CheckoutFormErrors = {};
    let isValid = true;

    Object.keys(formData).forEach((key) => {
      if (key !== "country") {
        const error = validateField(key as keyof CheckoutFormData, formData[key as keyof CheckoutFormData]);
        if (error) {
          newErrors[key as keyof CheckoutFormErrors] = error;
          isValid = false;
        }
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const isValid = Object.values(errors).every((error) => !error) && 
                  formData.firstName && formData.lastName && formData.email && 
                  formData.city && formData.zipCode;

  return {
    formData,
    errors,
    touched,
    handleChange,
    handleBlur,
    validate,
    isValid: !!isValid,
    countries,
  };
};
