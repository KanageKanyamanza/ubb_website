// src/pages/admin/sections/SettingsAdmin.tsx
import React, { useState } from "react";
import { useNews } from "../../../context/NewsContext";
import { RefreshCw, Shield, AlertTriangle, ExternalLink, Key } from "lucide-react";
import { Link } from "react-router-dom";

export default function SettingsAdmin() {
  const { resetData } = useNews();
  const [confirmText, setConfirmText] = useState("");
  const [isResetting, setIsResetting] = useState(false);

  const [showSuccess, setShowSuccess] = useState(false);

  const handleReset = () => {
    if (confirmText === "CONFIRMER") {
      resetData();
      setConfirmText("");
      setIsResetting(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }
  };

  return (
    <div className="max-w-4xl space-y-10 relative">
      {/* Success Notification */}
      {showSuccess && (
        <div className="fixed top-24 right-10 z-[100] animate-fade-up bg-green-500 text-white px-6 py-3 rounded-sm shadow-xl font-bold text-xs uppercase tracking-widest">
          Données réinitialisées !
        </div>
      )}

      {/* Account Info */}
      <div className="bg-bg-card border border-border-subtle p-8 rounded-sm">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center border border-gold/20">
            <Shield className="w-6 h-6 text-gold" />
          </div>
          <div>
            <h2 className="text-xl font-serif text-text-primary italic">Compte Administrateur</h2>
            <p className="text-text-muted text-xs uppercase tracking-widest mt-1">Niveau d'accès : Total</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <label className="text-text-muted text-[10px] uppercase tracking-widest font-bold">Identifiant</label>
            <div className="bg-bg-primary border border-border-subtle p-4 rounded-sm text-text-secondary text-sm font-mono">
              ubb_admin
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-text-muted text-[10px] uppercase tracking-widest font-bold">Mot de passe</label>
            <button className="w-full flex items-center justify-between bg-bg-primary border border-border-subtle p-4 rounded-sm text-gold text-xs uppercase tracking-widest font-bold hover:border-gold/50 transition-all">
              <span>Changer le mot de passe</span>
              <Key className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Data Management */}
      <div className="bg-bg-card border border-border-subtle p-8 rounded-sm">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center border border-red-500/20">
            <AlertTriangle className="w-6 h-6 text-red-400" />
          </div>
          <div>
            <h2 className="text-xl font-serif text-red-400 italic">Zone de Danger</h2>
            <p className="text-text-muted text-xs uppercase tracking-widest mt-1">Actions irréversibles</p>
          </div>
        </div>

        <div className="p-6 border border-red-500/20 bg-red-500/5 rounded-sm">
          <h3 className="text-text-primary font-bold text-sm mb-2">Réinitialiser les données</h3>
          <p className="text-text-secondary text-sm mb-6 leading-relaxed">
            Cette action effacera toutes vos modifications (images ajoutées, projets modifiés) et restaurera les données d'origine du site.
          </p>

          {!isResetting ? (
            <button
              onClick={() => setIsResetting(true)}
              className="flex items-center gap-2 px-6 py-3 bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-bold uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all"
            >
              <RefreshCw className="w-4 h-4" />
              Réinitialiser maintenant
            </button>
          ) : (
            <div className="space-y-4">
              <p className="text-xs text-red-400 font-bold uppercase tracking-widest">
                Tapez "CONFIRMER" pour valider :
              </p>
              <div className="flex gap-4">
                <input
                  type="text"
                  value={confirmText}
                  onChange={(e) => setConfirmText(e.target.value)}
                  className="bg-bg-primary border border-red-500/50 px-4 py-2 text-text-primary focus:outline-none w-full max-w-[200px]"
                  placeholder="CONFIRMER"
                />
                <button
                  onClick={handleReset}
                  disabled={confirmText !== "CONFIRMER"}
                  className="px-6 py-2 bg-red-500 text-white text-xs font-bold uppercase tracking-widest disabled:opacity-30"
                >
                  Valider
                </button>
                <button
                  onClick={() => {
                    setIsResetting(false);
                    setConfirmText("");
                  }}
                  className="px-6 py-2 text-text-muted hover:text-white text-xs font-bold uppercase tracking-widest"
                >
                  Annuler
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* External Links */}
      <div className="bg-bg-card border border-border-subtle p-8 rounded-sm">
        <h2 className="text-xl font-serif text-text-primary italic mb-6">Liens Rapides</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            to="/actualites"
            target="_blank"
            className="flex items-center justify-between p-4 bg-bg-primary border border-border-subtle hover:border-gold transition-all group"
          >
            <span className="text-sm text-text-secondary group-hover:text-gold transition-colors">Aperçu page Actualités</span>
            <ExternalLink className="w-4 h-4 text-text-muted group-hover:text-gold" />
          </Link>
          <a
            href="https://www.ubuntu-business-builders.com"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between p-4 bg-bg-primary border border-border-subtle hover:border-gold transition-all group"
          >
            <span className="text-sm text-text-secondary group-hover:text-gold transition-colors">Site Principal</span>
            <ExternalLink className="w-4 h-4 text-text-muted group-hover:text-gold" />
          </a>
        </div>
      </div>
    </div>
  );
}
