import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, ChevronDown } from "lucide-react";
import { navigation } from "../data/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setActiveDropdown(null);
  }, [location]);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "nav-blur py-4 shadow-xl border-b border-border-subtle" : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <span className="text-xl font-serif font-bold tracking-wider text-text-primary">
            UBB <span className="text-gold">·</span> <span className="text-sm font-sans font-light uppercase tracking-[0.2em] hidden sm:inline">Ubuntu Business Builders</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          {navigation.main.map((item) => (
            <div
              key={item.name}
              className="relative group"
              onMouseEnter={() => setActiveDropdown(item.name)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              {item.dropdown ? (
                <button
                  className={`flex items-center gap-1 text-sm font-medium transition-colors hover:text-gold ${
                    location.pathname === item.href ? "text-gold" : "text-text-secondary"
                  }`}
                >
                  {item.name}
                  <ChevronDown className="w-4 h-4" />
                </button>
              ) : (
                <Link
                  to={item.href || "#"}
                  className={`text-sm font-medium transition-colors hover:text-gold ${
                    location.pathname === item.href ? "text-gold" : "text-text-secondary"
                  }`}
                  target={item.external ? "_blank" : undefined}
                >
                  {item.name}
                </Link>
              )}

              {item.dropdown && activeDropdown === item.name && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-full left-0 mt-2 w-56 bg-bg-card border border-border-subtle shadow-2xl rounded-sm p-2"
                >
                  {item.dropdown.map((sub) => (
                    <a
                      key={sub.name}
                      href={sub.href}
                      target={sub.href.startsWith("http") ? "_blank" : undefined}
                      rel="noreferrer"
                      className="block px-4 py-2 text-sm text-text-secondary hover:text-gold hover:bg-gold-dim transition-all rounded-xs"
                    >
                      {sub.name}
                    </a>
                  ))}
                </motion.div>
              )}
            </div>
          ))}

          <Link
            to="/inscription"
            className="px-6 py-2 bg-gold text-bg-primary text-sm font-bold uppercase tracking-widest hover:bg-gold-light transition-colors"
          >
            S'inscrire
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button className="lg:hidden text-text-primary" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            className="fixed inset-0 top-[70px] bg-bg-primary z-40 lg:hidden p-6 overflow-y-auto"
          >
            <div className="flex flex-col gap-6">
              {navigation.main.map((item) => (
                <div key={item.name} className="flex flex-col gap-3">
                  {item.dropdown ? (
                    <>
                      <span className="text-lg font-serif text-gold">{item.name}</span>
                      <div className="flex flex-col gap-2 pl-4 border-l border-border-subtle">
                        {item.dropdown.map((sub) => (
                          <a
                            key={sub.name}
                            href={sub.href}
                            target={sub.href.startsWith("http") ? "_blank" : undefined}
                            rel="noreferrer"
                            className="text-text-secondary py-2"
                          >
                            {sub.name}
                          </a>
                        ))}
                      </div>
                    </>
                  ) : (
                    <Link
                      to={item.href || "#"}
                      className="text-lg font-serif text-text-primary hover:text-gold"
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
              <Link
                to="/inscription"
                className="mt-4 px-6 py-3 bg-gold text-bg-primary text-center font-bold uppercase tracking-widest"
              >
                S'inscrire
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
