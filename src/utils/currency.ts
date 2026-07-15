// src/utils/currency.ts

// Taux de conversion approximatifs (à mettre à jour manuellement)
// 1 GBP ≈ 1.17 EUR ≈ 768 XOF (FCFA)
// Pack e-books : £20.00

export const PACK_PRICE = {
  GBP: 20.00,        // Prix réel PayPal (NE PAS CHANGER)
  EUR: 38.23,        // Affiché visuellement (arrondi)
  XOF: 25000,        // Indication en FCFA (arrondi)
  display: "38,23 €", // Chaîne d'affichage principale
  displayCFA: "≈ 25 000 FCFA", // Note informative
};

// Formateur de prix pour l'affichage
export const formatPrice = (amount: number, currency = "EUR") => {
  if (currency === "XOF") return `${amount.toLocaleString("fr-FR")} FCFA`;
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency,
  }).format(amount);
};
