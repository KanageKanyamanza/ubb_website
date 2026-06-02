import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, ChevronDown, Phone, Facebook, Linkedin, Instagram, Youtube, Globe } from "lucide-react";
import { navigation } from "../data/navigation";
import { useLanguage } from "../context/LanguageContext";

// TikTok SVG (absent de lucide-react)
const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.75a8.16 8.16 0 0 0 4.77 1.52V6.82a4.85 4.85 0 0 1-1-.13z"/>
  </svg>
);

const socialIcons: Record<string, React.ReactNode> = {
  Facebook:  <Facebook className="w-4 h-4" />,
  LinkedIn:  <Linkedin className="w-4 h-4" />,
  Instagram: <Instagram className="w-4 h-4" />,
  YouTube:   <Youtube className="w-4 h-4" />,
  TikTok:    <TikTokIcon />,
};

export default function Navbar() {
  const { language, setLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();

  const getTranslationKey = (name: string) => {
    switch (name) {
      case "Accueil": return "nav.home";
      case "UBB Team": return "nav.team";
      case "Services": return "nav.services";
      case "Jobs & Careers": return "nav.careers";
      case "Ressources": return "nav.ebooks";
      case "Blog": return "nav.blog";
      case "Contact": return "nav.contact";
      case "Actualités": return "nav.actualites";
      case "Diagnostic d'Entreprise": return "nav.enterpriseDiagnostic";
      case "PARTENARIAT": return "nav.applyPartner";
      case "Partenaire Local": return "nav.partner";
      default: return "";
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setActiveDropdown(null);
  }, [location]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const phoneNumbers = navigation.main
    .find((item) => item.name === "Contact")
    ?.dropdown?.filter((d) => d.href.startsWith("tel:")) ?? [];

  const mainLinks = navigation.main.filter((item) => item.name !== "Contact");

  return (
    <>
      {/* ── Top Bar ────────────────────────────────────────────── */}
      <div
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled ? "opacity-0 pointer-events-none -translate-y-full" : "opacity-100 translate-y-0"
        }`}
      >
        <div className="bg-white border-b border-border-subtle backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-9 text-[11px]">
            {/* Phones */}
            <div className="flex items-center gap-5">
              {phoneNumbers.map((p) => (
                <a
                  key={p.href}
                  href={p.href}
                  className="flex items-center gap-1.5 text-gold/80 hover:text-gold transition-colors font-medium"
                >
                  <Phone className="w-3 h-3" />
                  {p.name}
                </a>
              ))}
            </div>

            {/* Social icons */}
            <div className="hidden sm:flex items-center gap-2">
              {navigation.socials.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  title={s.name}
                  className="w-7 h-7 rounded-full flex items-center justify-center text-gold/70 hover:text-gold hover:bg-gold/15 hover:scale-110 transition-all duration-200"
                >
                  {socialIcons[s.name] ?? <span className="text-[10px]">{s.name[0]}</span>}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Main Navbar ─────────────────────────────────────────── */}
      <nav
        className={`fixed left-0 w-full z-40 transition-all duration-500 ${
          scrolled
            ? "top-0 py-3 shadow-2xl border-b border-white/10"
            : "top-9 py-5"
        }`}
        style={{
          backdropFilter: "blur(20px) saturate(180%)",
          backgroundColor: scrolled
            ? "rgba(20, 18, 16, 0.97)"
            : "rgba(20, 18, 16, 0.82)",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-gold/20 blur-md scale-110 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <img
                src="https://d1yei2z3i6k35z.cloudfront.net/10694324/691e68ac86ecf_ubb.jpg"
                alt="UBB Logo"
                className="relative h-10 w-auto brightness-125 transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-serif font-bold tracking-wider text-white leading-tight">
                UBB
              </span>
              <span className="text-[8px] font-sans font-bold uppercase tracking-[0.2em] text-white hidden sm:inline">
                Ubuntu Business Builders
              </span>
            </div>
          </Link>

          {/* ── Desktop Navigation ─────────────────────────────── */}
          <div className="hidden lg:flex items-center gap-1">
            {mainLinks.map((item) => {
              const itemKey = getTranslationKey(item.name);
              const itemName = itemKey ? t(itemKey) : item.name;
              return (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => setActiveDropdown(item.name)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  {item.dropdown ? (
                    <button
                      className={`group flex items-center gap-1 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                        activeDropdown === item.name
                          ? "text-gold bg-gold/10"
                          : "text-white/80 hover:text-white hover:bg-white/10"
                      }`}
                    >
                      {itemName}
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          activeDropdown === item.name ? "rotate-180 text-gold" : ""
                        }`}
                      />
                    </button>
                  ) : (
                    <Link
                      to={item.href || "#"}
                      target={item.external ? "_blank" : undefined}
                      className={`relative block px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                        location.pathname === item.href
                          ? "text-gold bg-gold/10"
                          : "text-white/80 hover:text-white hover:bg-white/10"
                      }`}
                    >
                      {itemName}
                      {location.pathname === item.href && (
                        <motion.span
                          layoutId="active-pill"
                          className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-gold"
                        />
                      )}
                    </Link>
                  )}

                  {/* Dropdown */}
                  <AnimatePresence>
                    {item.dropdown && activeDropdown === item.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.97 }}
                        transition={{ duration: 0.18, ease: "easeOut" }}
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-58 min-w-max"
                      >
                        {/* Arrow */}
                        <div className="mx-auto w-3 h-1.5 overflow-hidden flex justify-center mb-0.5">
                          <div className="w-3 h-3 rotate-45 bg-bg-card border-t border-l border-border-subtle translate-y-1.5" />
                        </div>
                        <div className="bg-bg-card border border-border-subtle shadow-2xl rounded-xl p-1.5 overflow-hidden">
                          {item.dropdown.map((sub, i) => {
                            const subKey = getTranslationKey(sub.name);
                            return (
                              <motion.a
                                key={sub.name}
                                href={sub.href}
                                target={sub.href.startsWith("http") ? "_blank" : undefined}
                                rel="noreferrer"
                                initial={{ opacity: 0, x: -6 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.05 }}
                                className="flex items-center gap-3 px-4 py-2.5 text-sm text-text-secondary hover:text-gold hover:bg-gold/8 rounded-lg transition-all duration-150 group"
                              >
                                <span className="w-1 h-1 rounded-full bg-gold/40 group-hover:bg-gold transition-colors" />
                                {subKey ? t(subKey) : sub.name}
                              </motion.a>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}

            {/* Language Switcher */}
            <div className="flex items-center gap-1 mx-4 border-r border-l border-white/10 px-4 h-6">
              <button
                onClick={() => setLanguage("fr")}
                className={`text-[10px] font-bold tracking-wider px-2 py-0.5 rounded transition-all duration-300 cursor-pointer ${
                  language === "fr"
                    ? "text-gold bg-gold/15"
                    : "text-white/50 hover:text-white"
                }`}
              >
                FR
              </button>
              <button
                onClick={() => setLanguage("en")}
                className={`text-[10px] font-bold tracking-wider px-2 py-0.5 rounded transition-all duration-300 cursor-pointer ${
                  language === "en"
                    ? "text-gold bg-gold/15"
                    : "text-white/50 hover:text-white"
                }`}
              >
                EN
              </button>
            </div>

            {/* CTA */}
            <Link
              to="/inscription"
              className="relative overflow-hidden px-6 py-2.5 text-sm font-bold uppercase tracking-widest text-white rounded-full transition-all duration-300 hover:shadow-[0_0_24px_rgba(160,82,45,0.45)] hover:scale-105 active:scale-95"
              style={{
                background: "linear-gradient(135deg, #D08555 0%, #A0522D 60%, #7A3E1E 100%)",
              }}
            >
              <span className="relative z-10">{t("nav.register")}</span>
              {/* Shimmer */}
              <span
                className="absolute inset-0 translate-x-[-100%] hover:translate-x-[100%] transition-transform duration-700"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)",
                }}
              />
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            id="mobile-menu-toggle"
            className="lg:hidden relative w-10 h-10 flex items-center justify-center rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={isOpen ? "close" : "open"}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </nav>

      {/* ── Mobile Menu (slide from right) ──────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm lg:hidden"
              onClick={() => setIsOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 35 }}
              className="fixed top-0 right-0 h-full w-80 max-w-[90vw] z-40 lg:hidden flex flex-col"
              style={{
                background: "#FFFFFF",
                borderLeft: "1px solid rgba(0,0,0,0.09)",
              }}
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-border-subtle">
                <Link to="/" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
                  <img
                    src="https://d1yei2z3i6k35z.cloudfront.net/10694324/691e68ac86ecf_ubb.jpg"
                    alt="UBB"
                    className="h-8 w-auto brightness-125"
                  />
                  <span className="font-serif font-bold text-text-primary">UBB</span>
                </Link>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-black/5 text-text-secondary hover:text-text-primary transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Nav Links */}
              <div className="flex-1 overflow-y-auto px-4 py-6 flex flex-col gap-1">
                {mainLinks.map((item, i) => {
                  const itemKey = getTranslationKey(item.name);
                  const itemName = itemKey ? t(itemKey) : item.name;
                  return (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06, duration: 0.25 }}
                    >
                      {item.dropdown ? (
                        <div>
                          <button
                            onClick={() =>
                              setActiveDropdown(activeDropdown === item.name ? null : item.name)
                            }
                            className="flex items-center justify-between w-full px-4 py-3 rounded-xl text-base font-medium text-text-secondary hover:text-gold hover:bg-gold/8 transition-all"
                          >
                            {itemName}
                            <ChevronDown
                              className={`w-4 h-4 transition-transform duration-200 ${
                                activeDropdown === item.name ? "rotate-180 text-gold" : ""
                              }`}
                            />
                          </button>
                          <AnimatePresence>
                            {activeDropdown === item.name && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="overflow-hidden"
                              >
                                <div className="ml-4 mt-1 flex flex-col gap-0.5 pl-4 border-l border-gold/20">
                                  {item.dropdown.map((sub) => {
                                    const subKey = getTranslationKey(sub.name);
                                    return (
                                      <a
                                        key={sub.name}
                                        href={sub.href}
                                        target={sub.href.startsWith("http") ? "_blank" : undefined}
                                        rel="noreferrer"
                                        className="flex items-center gap-2 px-3 py-2.5 text-sm text-text-secondary hover:text-gold transition-colors rounded-lg hover:bg-gold/5"
                                        onClick={() => setIsOpen(false)}
                                      >
                                        <span className="w-1 h-1 rounded-full bg-gold/40" />
                                        {subKey ? t(subKey) : sub.name}
                                      </a>
                                    );
                                  })}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ) : (
                        <Link
                          to={item.href || "#"}
                          onClick={() => setIsOpen(false)}
                          className={`flex items-center px-4 py-3 rounded-xl text-base font-medium transition-all ${
                            location.pathname === item.href
                              ? "text-gold bg-gold/10"
                              : "text-text-secondary hover:text-gold hover:bg-gold/8"
                          }`}
                        >
                          {itemName}
                        </Link>
                      )}
                    </motion.div>
                  );
                })}
              </div>

              {/* Drawer Footer */}
              <div className="px-4 pb-8 flex flex-col gap-4 border-t border-border-subtle pt-5">
                {/* Phone numbers */}
                <div className="flex flex-col gap-2">
                  {phoneNumbers.map((p) => (
                    <a
                      key={p.href}
                      href={p.href}
                      className="flex items-center gap-2 text-sm text-gold/80 hover:text-gold transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      {p.name}
                    </a>
                  ))}
                </div>

                {/* Social icons */}
                <div className="flex items-center gap-2 flex-wrap">
                  {navigation.socials.map((s) => (
                    <a
                      key={s.name}
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      title={s.name}
                      className="w-9 h-9 rounded-full border border-border-subtle bg-bg-card flex items-center justify-center text-text-muted hover:text-gold hover:border-gold/50 hover:bg-gold/10 hover:scale-110 transition-all duration-200"
                    >
                      {socialIcons[s.name] ?? <span className="text-[10px]">{s.name[0]}</span>}
                    </a>
                  ))}
                </div>

                {/* Language Switcher Mobile */}
                <div className="flex items-center gap-2 border-t border-b border-border-subtle py-3 justify-center">
                  <span className="text-xs text-text-muted mr-2 flex items-center gap-1">
                    <Globe className="w-3 h-3 text-gold" /> Langue:
                  </span>
                  <button
                    onClick={() => { setLanguage("fr"); setIsOpen(false); }}
                    className={`text-xs font-bold tracking-wider px-3 py-1 rounded transition-all ${
                      language === "fr" ? "text-gold bg-gold/15" : "text-text-muted"
                    }`}
                  >
                    Français
                  </button>
                  <button
                    onClick={() => { setLanguage("en"); setIsOpen(false); }}
                    className={`text-xs font-bold tracking-wider px-3 py-1 rounded transition-all ${
                      language === "en" ? "text-gold bg-gold/15" : "text-text-muted"
                    }`}
                  >
                    English
                  </button>
                </div>

                {/* CTA */}
                <Link
                  to="/inscription"
                  onClick={() => setIsOpen(false)}
                  className="text-center py-3.5 text-sm font-bold uppercase tracking-widest text-white rounded-full"
                  style={{
                    background: "linear-gradient(135deg, #D08555 0%, #A0522D 60%, #7A3E1E 100%)",
                  }}
                >
                  {t("nav.register")}
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

