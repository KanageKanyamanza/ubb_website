// src/pages/admin/AdminLogin.tsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Eye, EyeOff, Lock, User, ArrowLeft } from "lucide-react";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(username, password)) {
      navigate("/admin/dashboard");
    } else {
      setError("Identifiants incorrects. Veuillez réessayer.");
    }
  };

  return (
    <div className="min-h-screen bg-bg-primary flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-gold/5 blur-[80px] rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-10">
          <Link to="/" className="inline-flex items-center gap-2 text-text-muted hover:text-gold transition-colors mb-8 group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-xs uppercase tracking-widest font-bold">Retour au site</span>
          </Link>
          
          <h1 className="text-4xl font-serif text-text-primary mb-2 italic">
            Ubuntu <span className="text-gold-gradient not-italic">Business Builders</span>
          </h1>
          <div className="h-px w-24 bg-gold/30 mx-auto mb-6" />
          
          <h2 className="text-xl text-text-primary font-medium tracking-wide">Espace Administrateur</h2>
          <p className="text-text-muted text-sm mt-2">Accès réservé à l'équipe UBB</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-bg-card border border-border-subtle p-8 rounded-sm shadow-2xl">
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center rounded-sm">
              {error}
            </div>
          )}

          <div className="space-y-6">
            <div>
              <label className="block text-text-secondary text-xs uppercase tracking-widest font-bold mb-2">Identifiant</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-bg-primary border border-border-subtle rounded-sm py-3.5 pl-12 pr-4 text-text-primary focus:outline-none focus:border-gold/50 transition-colors"
                  placeholder="admin_username"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-text-secondary text-xs uppercase tracking-widest font-bold mb-2">Mot de passe</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-bg-primary border border-border-subtle rounded-sm py-3.5 pl-12 pr-12 text-text-primary focus:outline-none focus:border-gold/50 transition-colors"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-gold transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-gold-gradient text-bg-primary font-bold uppercase tracking-widest text-xs hover:shadow-[0_0_20px_rgba(184,115,51,0.3)] transition-all mt-4"
            >
              Se connecter
            </button>
          </div>
        </form>
        
        <p className="text-center mt-8 text-text-muted text-[10px] uppercase tracking-widest">
          Système de gestion sécurisé &copy; {new Date().getFullYear()} UBB
        </p>
      </div>
    </div>
  );
}

