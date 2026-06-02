// src/context/NewsContext.tsx
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { newsGallery as INITIAL_IMAGES, NewsImage } from "../data/news";
import { API_BASE_URL } from "../config/api";
export type { NewsImage };

export interface StrategicProject {
  id: string;
  title: string;
  tagline?: string;
  description: string;
  link: string;
  linkLabel: string;
  visible: boolean;
}

interface NewsContextType {
  newsGallery: NewsImage[];
  projects: StrategicProject[];
  loading: boolean;
  addImage: (image: Omit<NewsImage, "id">) => void;
  updateImage: (id: string, image: Partial<NewsImage>) => void;
  deleteImage: (id: string) => void;
  reorderImages: (newOrder: NewsImage[]) => void;
  addProject: (project: Omit<StrategicProject, "id">) => void;
  updateProject: (id: string, project: Partial<StrategicProject>) => void;
  deleteProject: (id: string) => void;
  toggleVisibility: (type: "image" | "project", id: string) => void;
  resetData: () => void;
}

const NewsContext = createContext<NewsContextType | undefined>(undefined);

const INITIAL_PROJECTS: StrategicProject[] = [
  {
    id: "proj-1",
    title: "VitalCHECK",
    tagline: "Diagnostic Business à 360°",
    description: "Une solution d'audit automatisée qui permet aux dirigeants d'entreprises d'identifier instantanément les leviers de performance inexploités et de sécuriser leur croissance.",
    link: "https://www.checkmyenterprise.com/pricing",
    linkLabel: "En savoir plus →",
    visible: true,
  },
  {
    id: "proj-2",
    title: "HARVESTS 2.0",
    tagline: "L'Intelligence Commerciale Africaine",
    description: "Bien plus qu'un CRM, HARVESTS est une suite logicielle intégrée qui automatise votre force de vente et optimise vos cycles de revenus selon les réalités locales.",
    link: "https://harvests.site/pricing/",
    linkLabel: "En savoir plus →",
    visible: true,
  },
];

export const NewsProvider = ({ children }: { children: ReactNode }) => {
  const [newsGallery, setNewsGallery] = useState<NewsImage[]>(INITIAL_IMAGES);
  const [projects, setProjects] = useState<StrategicProject[]>(INITIAL_PROJECTS);
  const [loading, setLoading] = useState(true);

  // Chargement initial depuis l'API — fallback localStorage puis données statiques
  useEffect(() => {
    Promise.all([
      fetch(`${API_BASE_URL}/api/news`).then(r => { if (!r.ok) throw new Error(r.status.toString()); return r.json(); }),
      fetch(`${API_BASE_URL}/api/projects`).then(r => { if (!r.ok) throw new Error(r.status.toString()); return r.json(); }),
    ])
      .then(([news, projs]) => {
        if (Array.isArray(news) && news.length > 0) {
          setNewsGallery(news);
          localStorage.setItem("ubb_news_data_v2", JSON.stringify(news));
        }
        if (Array.isArray(projs) && projs.length > 0) {
          setProjects(projs);
          localStorage.setItem("ubb_projects_data_v2", JSON.stringify(projs));
        }
      })
      .catch((err) => {
        console.warn("API hors-ligne. Utilisation du stockage local.", err);
        const savedNews = localStorage.getItem("ubb_news_data_v2");
        const savedProjects = localStorage.getItem("ubb_projects_data_v2");
        if (savedNews) try { setNewsGallery(JSON.parse(savedNews)); } catch { /* garde INITIAL_IMAGES */ }
        if (savedProjects) try { setProjects(JSON.parse(savedProjects)); } catch { /* garde INITIAL_PROJECTS */ }
      })
      .finally(() => setLoading(false));
  }, []);

  // Sync localStorage en arrière-plan
  useEffect(() => {
    if (newsGallery.length > 0) localStorage.setItem("ubb_news_data_v2", JSON.stringify(newsGallery));
  }, [newsGallery]);
  useEffect(() => {
    if (projects.length > 0) localStorage.setItem("ubb_projects_data_v2", JSON.stringify(projects));
  }, [projects]);

  // ── ACTUALITÉS ──────────────────────────────────────────────────

  const addImage = (image: Omit<NewsImage, "id">) => {
    fetch(`${API_BASE_URL}/api/news`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(image),
    })
      .then(r => { if (!r.ok) throw new Error(r.status.toString()); return r.json(); })
      .then(({ id }) => {
        setNewsGallery(prev => [{ ...image, id }, ...prev]);
      })
      .catch(err => {
        console.error("Erreur ajout actualité:", err);
        setNewsGallery(prev => [{ ...image, id: crypto.randomUUID() }, ...prev]);
      });
  };

  const updateImage = (id: string, image: Partial<NewsImage>) => {
    const current = newsGallery.find(img => img.id === id);
    if (!current) return;
    const updated = { ...current, ...image };
    fetch(`${API_BASE_URL}/api/news/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated),
    })
      .then(r => { if (!r.ok) throw new Error(r.status.toString()); })
      .catch(err => console.error("Erreur mise à jour actualité:", err));
    setNewsGallery(prev => prev.map(img => img.id === id ? updated : img));
  };

  const deleteImage = (id: string) => {
    fetch(`${API_BASE_URL}/api/news/${id}`, { method: "DELETE" })
      .then(r => { if (!r.ok) throw new Error(r.status.toString()); })
      .catch(err => console.error("Erreur suppression actualité:", err));
    setNewsGallery(prev => prev.filter(img => img.id !== id));
  };

  const reorderImages = (newOrder: NewsImage[]) => {
    setNewsGallery(newOrder);
  };

  // ── PROJETS ─────────────────────────────────────────────────────

  const addProject = (project: Omit<StrategicProject, "id">) => {
    fetch(`${API_BASE_URL}/api/projects`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(project),
    })
      .then(r => { if (!r.ok) throw new Error(r.status.toString()); return r.json(); })
      .then(({ id }) => {
        setProjects(prev => [...prev, { ...project, id }]);
      })
      .catch(err => {
        console.error("Erreur ajout projet:", err);
        setProjects(prev => [...prev, { ...project, id: crypto.randomUUID() }]);
      });
  };

  const updateProject = (id: string, project: Partial<StrategicProject>) => {
    const current = projects.find(p => p.id === id);
    if (!current) return;
    const updated = { ...current, ...project };
    fetch(`${API_BASE_URL}/api/projects/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated),
    })
      .then(r => { if (!r.ok) throw new Error(r.status.toString()); })
      .catch(err => console.error("Erreur mise à jour projet:", err));
    setProjects(prev => prev.map(p => p.id === id ? updated : p));
  };

  const deleteProject = (id: string) => {
    fetch(`${API_BASE_URL}/api/projects/${id}`, { method: "DELETE" })
      .then(r => { if (!r.ok) throw new Error(r.status.toString()); })
      .catch(err => console.error("Erreur suppression projet:", err));
    setProjects(prev => prev.filter(p => p.id !== id));
  };

  const toggleVisibility = (type: "image" | "project", id: string) => {
    const endpoint = type === "image" ? "news" : "projects";
    fetch(`${API_BASE_URL}/api/${endpoint}/${id}/toggle`, { method: "PATCH" })
      .then(r => { if (!r.ok) throw new Error(r.status.toString()); return r.json(); })
      .then(({ visible }) => {
        if (type === "image") {
          setNewsGallery(prev => prev.map(img => img.id === id ? { ...img, visible } : img));
        } else {
          setProjects(prev => prev.map(p => p.id === id ? { ...p, visible } : p));
        }
      })
      .catch(err => {
        console.error("Erreur toggle visibilité:", err);
        // Fallback local
        if (type === "image") {
          setNewsGallery(prev => prev.map(img => img.id === id ? { ...img, visible: !img.visible } : img));
        } else {
          setProjects(prev => prev.map(p => p.id === id ? { ...p, visible: !p.visible } : p));
        }
      });
  };

  const resetData = () => {
    setNewsGallery(INITIAL_IMAGES);
    setProjects(INITIAL_PROJECTS);
  };

  return (
    <NewsContext.Provider
      value={{
        newsGallery,
        projects,
        loading,
        addImage,
        updateImage,
        deleteImage,
        reorderImages,
        addProject,
        updateProject,
        deleteProject,
        toggleVisibility,
        resetData,
      }}
    >
      {children}
    </NewsContext.Provider>
  );
};

export const useNews = () => {
  const context = useContext(NewsContext);
  if (context === undefined) {
    throw new Error("useNews must be used within a NewsProvider");
  }
  return context;
};
