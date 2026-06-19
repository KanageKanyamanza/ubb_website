import React from "react";
import { Link } from "react-router-dom";
import { navigation } from "../data/navigation";
import { Phone, Mail, MapPin, ArrowRight, Facebook, Linkedin, Instagram, Youtube } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

// TikTok SVG (absent de lucide-react)
const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.75a8.16 8.16 0 0 0 4.77 1.52V6.82a4.85 4.85 0 0 1-1-.13z"/>
  </svg>
);

const socialIcons: Record<string, React.ReactNode> = {
  Facebook:  <Facebook className="w-5 h-5" />,
  LinkedIn:  <Linkedin className="w-5 h-5" />,
  Instagram: <Instagram className="w-5 h-5" />,
  YouTube:   <Youtube className="w-5 h-5" />,
  TikTok:    <TikTokIcon />,
};


export default function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  const getTranslationKey = (label: string) => {
    switch (label) {
      case "Accueil": return "nav.home";
      case "UBB Team": return "nav.team";
      case "Jobs & Careers": return "nav.careers";
      case "Ressources": return "nav.ebooks";
      case "Actualités": return "nav.actualites";
      case "S'inscrire": return "nav.register";
      case "Diagnostic d'Entreprise": return "nav.enterpriseDiagnostic";
      case "Partenariat": return "nav.applyPartner";
      case "Blog": return "nav.blog";
      default: return "";
    }
  };

  const navLinks = [
    { label: "Accueil", to: "/" },
    { label: "UBB Team", to: "/team" },
    { label: "Jobs & Careers", to: "/jobs" },
    { label: "Ressources", to: "/ebooks" },
    { label: "Actualités", to: "/actualites" },
    { label: "S'inscrire", to: "/inscription" },
  ];

  const services = [
    { label: "vitalCHECK", href: "https://www.checkmyenterprise.com/pricing" },
    { label: "HARVESTS", href: "https://harvests.site/pricing/" },
    { label: "Diagnostic d'Entreprise", href: "/contact", internal: true },
    { label: "Partenariat", href: "/postuler", internal: true },
    { label: "Blog", href: "https://harvests.site/blog/" },
  ];

  return (
    <footer className="relative overflow-hidden bg-[#141210] border-t border-white/10">

      {/* Gold gradient top line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-gold/60 to-transparent" />

      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-gold/4 blur-3xl rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 pt-20 pb-10">

        {/* ── Main grid ─────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">

          {/* Brand col */}
          <div className="lg:col-span-4">
            <Link to="/" className="inline-flex items-center gap-3 group mb-6">
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-gold/20 blur-md scale-110 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <img
                  src="https://d1yei2z3i6k35z.cloudfront.net/10694324/691e68ac86ecf_ubb.jpg"
                  alt="UBB Logo"
                  className="relative h-14 w-auto brightness-125"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-serif font-bold tracking-wider text-white leading-tight">UBB</span>
                <span className="text-[8px] font-sans font-bold uppercase tracking-[0.2em] text-white">Ubuntu Business Builders</span>
              </div>
            </Link>

            <p className="text-white/70 text-sm leading-relaxed max-w-sm mb-8">
              {t("footer.brandDesc")}
            </p>

            {/* Legal info */}
            <div className="text-[11px] text-white/50 space-y-1 mb-8 pl-3 border-l border-gold/30">
              <p className="font-medium text-white/80">UBUNTU BUSINESS BUILDERS (UBB) – SARL</p>
              <p>RCCM : SN.DKR.2026.B.1650</p>
              <p>NINEA : 012753069</p>
            </div>

            {/* Social icons */}
            <div className="flex items-center gap-3 flex-wrap">
              {navigation.socials.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  title={social.name}
                  className="w-11 h-11 rounded-full border border-white/15 bg-white/5 flex items-center justify-center text-white/60 hover:text-gold hover:border-gold/60 hover:bg-gold/10 hover:scale-110 transition-all duration-200 group"
                >
                  {socialIcons[social.name] ?? <span className="text-xs">{social.name[0]}</span>}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation col */}
          <div className="lg:col-span-2">
            <h4 className="font-serif text-base text-gold italic mb-6 flex items-center gap-2">
              <span className="w-4 h-px bg-gold/50 inline-block" />
              {t("footer.navigation")}
            </h4>
            <ul className="space-y-3">
              {navLinks.map((link) => {
                const linkKey = getTranslationKey(link.label);
                return (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="text-sm text-white/70 hover:text-gold transition-colors duration-200 flex items-center gap-2 group"
                    >
                      <span className="w-0 group-hover:w-3 h-px bg-gold transition-all duration-200 inline-block" />
                      {linkKey ? t(linkKey) : link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Services col */}
          <div className="lg:col-span-3">
            <h4 className="font-serif text-base text-gold italic mb-6 flex items-center gap-2">
              <span className="w-4 h-px bg-gold/50 inline-block" />
              {t("footer.services")}
            </h4>
            <ul className="space-y-3">
              {services.map((s) => {
                const sKey = getTranslationKey(s.label);
                const sName = sKey ? t(sKey) : s.label;
                return (
                  <li key={s.label}>
                    {(s as any).internal ? (
                      <Link
                        to={s.href}
                        className="text-sm text-white/70 hover:text-gold transition-colors duration-200 flex items-center gap-2 group"
                      >
                        <span className="w-0 group-hover:w-3 h-px bg-gold transition-all duration-200 inline-block" />
                        {sName}
                      </Link>
                    ) : (
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm text-white/70 hover:text-gold transition-colors duration-200 flex items-center gap-2 group"
                      >
                        <span className="w-0 group-hover:w-3 h-px bg-gold transition-all duration-200 inline-block" />
                        {sName}
                      </a>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Contact col */}
          <div className="lg:col-span-3">
            <h4 className="font-serif text-base text-gold italic mb-6 flex items-center gap-2">
              <span className="w-4 h-px bg-gold/50 inline-block" />
              {t("footer.contact")}
            </h4>
            <ul className="space-y-4 text-sm text-white/70">
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-gold/60 mt-0.5 flex-shrink-0" />
                <div>
                  <p>+221 77 197 07 13</p>
                  <p>+221 77 453 67 04</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-gold/60 mt-0.5 flex-shrink-0" />
                <a href="mailto:contact@ubbuntu.com" className="hover:text-gold transition-colors text-white/70">
                  contact@ubbuntu.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-gold/60 mt-0.5 flex-shrink-0" />
                <span>Dakar, Sénégal — Afrique</span>
              </li>
            </ul>

            {/* CTA mini */}
            <Link
              to="/inscription"
              className="mt-8 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-white px-5 py-2.5 rounded-full hover:shadow-[0_0_20px_rgba(160,82,45,0.4)] hover:scale-105 active:scale-95 transition-all duration-300 group"
              style={{ background: "linear-gradient(135deg, #D08555 0%, #A0522D 60%, #7A3E1E 100%)" }}
            >
              {t("footer.joinUbb")}
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* ── Bottom bar ──────────────────────────────── */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-xs">
            © {year} Ubuntu Business Builders · {t("common.copyright")}
          </p>
          <div className="flex items-center gap-6 text-white/40 text-xs">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-gold/60 inline-block" />
              {t("common.professional")}
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-gold/60 inline-block" />
              {t("common.panafrican")}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

