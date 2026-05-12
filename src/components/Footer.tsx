import { Link } from "react-router-dom";
import { navigation } from "../data/navigation";

export default function Footer() {
  return (
    <footer className="bg-bg-secondary border-t border-border-subtle pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="lg:col-span-2">
            <img
              src="https://d1yei2z3i6k35z.cloudfront.net/10694324/691e68ac86ecf_ubb.jpg"
              alt="UBB Logo"
              className="h-16 mb-6 transition-all duration-500"
            />
            <p className="text-text-secondary max-w-md leading-relaxed">
              Ubuntu Business Builders — Partenaire pour la croissance des PME Africaines. 
              Cabinet de conseil panafricain aidant les PME à croître durablement à travers l'esprit Ubuntu.
            </p>
            <div className="flex gap-4 mt-8">
              {navigation.socials.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full bg-bg-card border border-border-subtle flex items-center justify-center hover:border-gold hover:bg-gold-dim transition-all overflow-hidden p-2"
                >
                  <img src={social.icon} alt={social.name} className="w-full h-auto" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-serif text-lg text-gold mb-6 italic">Navigation</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-text-secondary hover:text-gold transition-colors">Accueil</Link>
              </li>
              <li>
                <Link to="/team" className="text-text-secondary hover:text-gold transition-colors">UBB Team</Link>
              </li>
              <li>
                <Link to="/jobs" className="text-text-secondary hover:text-gold transition-colors">Jobs & Careers</Link>
              </li>
              <li>
                <Link to="/ebooks" className="text-text-secondary hover:text-gold transition-colors">E-books</Link>
              </li>
              <li>
                <Link to="/actualites" className="text-text-secondary hover:text-gold transition-colors">Actualités</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-lg text-gold mb-6 italic">Contact & Légal</h4>
            <ul className="space-y-3 text-text-muted text-sm">
              <li>+221 77 197 07 13 / +221 77 453 67 04</li>
              <li>UBUNTU BUSINESS BUILDERS (UBB) – SARL</li>
              <li>RCCM : SN.DKR.2026.B.1650</li>
              <li>NINEA : 012753069</li>
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-border-subtle flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-text-muted text-xs">
            © 2025 — UBB | Tous droits réservés
          </p>
          <div className="text-text-muted text-xs flex gap-6">
            <span>Professionnel · Sombre · Premium · Panafricain</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
