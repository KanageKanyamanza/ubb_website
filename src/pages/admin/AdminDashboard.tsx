// src/pages/admin/AdminDashboard.tsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  Image as ImageIcon,
  Layout,
  Settings,
  LogOut,
  ExternalLink,
  Menu,
  X,
  User as UserIcon,
  BookOpen,
  ChevronRight
} from "lucide-react";

// Sections
import GalerieAdmin from "./sections/GalerieAdmin";
import ProjectsAdmin from "./sections/ProjectsAdmin";
import TeamAdmin from "./sections/TeamAdmin";
import RessourcesAdmin from "./sections/RessourcesAdmin";
import SettingsAdmin from "./sections/SettingsAdmin";

type ActiveTab = "gallery" | "projects" | "team" | "resources" | "settings";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("gallery");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  const navItems = [
    { id: "gallery", label: "Galerie d'images", icon: <ImageIcon className="w-5 h-5" /> },
    { id: "projects", label: "Projets Stratégiques", icon: <Layout className="w-5 h-5" /> },
    { id: "team", label: "Membres de l'Équipe", icon: <UserIcon className="w-5 h-5" /> },
    { id: "resources", label: "Ressources", icon: <BookOpen className="w-5 h-5" /> },
    { id: "settings", label: "Paramètres", icon: <Settings className="w-5 h-5" /> },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "gallery": return <GalerieAdmin />;
      case "projects": return <ProjectsAdmin />;
      case "team": return <TeamAdmin />;
      case "resources": return <RessourcesAdmin />;
      case "settings": return <SettingsAdmin />;
      default: return <GalerieAdmin />;
    }
  };

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary flex">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[40] md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed md:static inset-y-0 left-0 w-64 bg-bg-secondary border-r border-border-subtle z-[50] transition-transform duration-300 flex flex-col
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
      `}>
        <div className="p-8 border-b border-border-subtle">
          <Link to="/" className="block group">
            <h1 className="text-2xl font-serif italic text-text-primary group-hover:text-gold transition-colors">UBB</h1>
            <p className="text-[10px] uppercase tracking-[0.3em] text-gold font-bold mt-1">Backoffice</p>
          </Link>
        </div>

        <nav className="flex-1 p-6 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id as ActiveTab);
                setIsSidebarOpen(false);
              }}
              className={`
                w-full flex items-center gap-4 px-4 py-3.5 rounded-sm transition-all text-sm font-medium
                ${activeTab === item.id 
                  ? "bg-gold/10 text-gold border-l-2 border-gold" 
                  : "text-text-muted hover:text-text-primary hover:bg-white/5"}
              `}
            >
              {item.icon}
              {item.label}
              {activeTab === item.id && <ChevronRight className="w-4 h-4 ml-auto" />}
            </button>
          ))}
        </nav>

        <div className="p-6 border-t border-border-subtle space-y-4">
          <Link 
            to="/actualites" 
            target="_blank"
            className="flex items-center gap-3 px-4 py-3 text-xs uppercase tracking-widest font-bold text-text-muted hover:text-gold transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            Voir le site
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-xs uppercase tracking-widest font-bold text-red-400/70 hover:text-red-400 hover:bg-red-500/5 transition-all rounded-sm"
          >
            <LogOut className="w-4 h-4" />
            Déconnexion
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <header className="h-20 bg-bg-primary border-b border-border-subtle px-6 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 text-text-muted hover:text-white md:hidden"
            >
              <Menu className="w-6 h-6" />
            </button>
            <h2 className="text-lg font-serif italic text-text-primary capitalize">
              {navItems.find(n => n.id === activeTab)?.label}
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex flex-col items-end mr-2">
              <span className="text-sm font-medium text-text-primary">Admin UBB</span>
              <span className="text-[9px] uppercase tracking-widest text-gold font-bold">Mode Gestionnaire</span>
            </div>
            <div className="w-10 h-10 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center text-gold font-serif italic shadow-inner">
              <UserIcon className="w-5 h-5" />
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 md:p-10 custom-scrollbar">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}
