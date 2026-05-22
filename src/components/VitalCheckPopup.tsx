// src/components/VitalCheckPopup.tsx
// 👉 Pour changer l'image : remplacez la valeur de POPUP_IMAGE_SRC
const POPUP_IMAGE_SRC = ""; // ← Collez ici le lien de votre image

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ArrowRight } from "lucide-react";

const POPUP_DELAY_MS = 0;
const POPUP_STORAGE_KEY = "ubb_vitalcheck_popup_shown";

export default function VitalCheckPopup() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(POPUP_STORAGE_KEY)) return;
    const timer = setTimeout(() => {
      setIsVisible(true);
      sessionStorage.setItem(POPUP_STORAGE_KEY, "true");
    }, POPUP_DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => setIsVisible(false);

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[9000] bg-black/70 backdrop-blur-sm"
            onClick={handleClose}
          />

          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[9001] flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="relative w-full max-w-md bg-bg-primary border border-border-subtle rounded-2xl overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.8)] pointer-events-auto">

              {/* Gold top line */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent z-10" />

              {/* Close button */}
              <button
                onClick={handleClose}
                aria-label="Fermer"
                className="absolute top-3 right-3 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-black/40 border border-white/10 text-white/60 hover:text-white hover:bg-black/60 transition-all"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Image */}
              {POPUP_IMAGE_SRC ? (
                <img
                  src={POPUP_IMAGE_SRC}
                  alt="vitalCHECK"
                  className="w-full object-cover"
                />
              ) : (
                <div className="w-full aspect-[4/3] bg-bg-secondary flex items-center justify-center">
                  <p className="text-text-muted text-sm italic">Image bientôt disponible</p>
                </div>
              )}

              {/* Bottom content */}
              <div className="px-6 py-5">
                <p className="text-text-primary font-serif text-center text-lg mb-5">
                  Diagnostiquez votre entreprise en{" "}
                  <span className="text-gold italic">15 minutes.</span>
                </p>

                <div className="flex gap-3">
                  <a
                    href="https://www.checkmyenterprise.com/pricing"
                    target="_blank"
                    rel="noreferrer"
                    onClick={handleClose}
                    className="flex-1 flex items-center justify-center gap-2 py-3 bg-gold text-bg-primary font-bold uppercase tracking-widest text-xs rounded-full hover:bg-gold-light transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(201,151,58,0.4)] active:scale-95"
                  >
                    Démarrer <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                  <button
                    onClick={handleClose}
                    className="flex-1 py-3 border border-border-subtle text-text-muted font-bold uppercase tracking-widest text-xs rounded-full hover:border-gold/40 hover:text-text-secondary transition-all"
                  >
                    Plus tard
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
