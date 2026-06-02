// src/context/NewsContext.tsx
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { NewsImage } from "../data/news";
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
  addImage: (image: Omit<NewsImage, "id">) => Promise<void>;
  updateImage: (id: string, image: Partial<NewsImage>) => Promise<void>;
  deleteImage: (id: string) => Promise<void>;
  reorderImages: (newOrder: NewsImage[]) => void;
  addProject: (project: Omit<StrategicProject, "id">) => Promise<void>;
  updateProject: (id: string, project: Partial<StrategicProject>) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  toggleVisibility: (type: "image" | "project", id: string) => Promise<void>;
  resetData: () => void;
}

const NewsContext = createContext<NewsContextType | undefined>(undefined);

export const NewsProvider = ({ children }: { children: ReactNode }) => {
  const [newsGallery, setNewsGallery] = useState<NewsImage[]>([]);
  const [projects, setProjects] = useState<StrategicProject[]>([]);
  const [loading, setLoading] = useState(true);

  // Chargement initial depuis l'API
  useEffect(() => {
    Promise.all([
      fetch(`${API_BASE_URL}/api/news`).then(r => r.json()),
      fetch(`${API_BASE_URL}/api/projects`).then(r => r.json()),
    ])
      .then(([news, projs]) => {
        setNewsGallery(Array.isArray(news) ? news : []);
        setProjects(Array.isArray(projs) ? projs : []);
      })
      .catch(() => {
        setNewsGallery([]);
        setProjects([]);
      })
      .finally(() => setLoading(false));
  }, []);

  // ── ACTUALITÉS ──────────────────────────────────────────────────

  const addImage = async (image: Omit<NewsImage, "id">) => {
    const res = await fetch(`${API_BASE_URL}/api/news`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(image),
    });
    if (!res.ok) throw new Error("Erreur lors de l'ajout de l'actualité");
    const { id } = await res.json();
    setNewsGallery(prev => [{ ...image, id }, ...prev]);
  };

  const updateImage = async (id: string, image: Partial<NewsImage>) => {
    const current = newsGallery.find(img => img.id === id);
    if (!current) return;
    const updated = { ...current, ...image };
    const res = await fetch(`${API_BASE_URL}/api/news/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated),
    });
    if (!res.ok) throw new Error("Erreur lors de la mise à jour");
    setNewsGallery(prev => prev.map(img => img.id === id ? updated : img));
  };

  const deleteImage = async (id: string) => {
    const res = await fetch(`${API_BASE_URL}/api/news/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Erreur lors de la suppression");
    setNewsGallery(prev => prev.filter(img => img.id !== id));
  };

  const reorderImages = (newOrder: NewsImage[]) => {
    setNewsGallery(newOrder);
  };

  // ── PROJETS ─────────────────────────────────────────────────────

  const addProject = async (project: Omit<StrategicProject, "id">) => {
    const res = await fetch(`${API_BASE_URL}/api/projects`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(project),
    });
    if (!res.ok) throw new Error("Erreur lors de l'ajout du projet");
    const { id } = await res.json();
    setProjects(prev => [...prev, { ...project, id }]);
  };

  const updateProject = async (id: string, project: Partial<StrategicProject>) => {
    const current = projects.find(p => p.id === id);
    if (!current) return;
    const updated = { ...current, ...project };
    const res = await fetch(`${API_BASE_URL}/api/projects/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated),
    });
    if (!res.ok) throw new Error("Erreur lors de la mise à jour du projet");
    setProjects(prev => prev.map(p => p.id === id ? updated : p));
  };

  const deleteProject = async (id: string) => {
    const res = await fetch(`${API_BASE_URL}/api/projects/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Erreur lors de la suppression du projet");
    setProjects(prev => prev.filter(p => p.id !== id));
  };

  const toggleVisibility = async (type: "image" | "project", id: string) => {
    if (type === "image") {
      const res = await fetch(`${API_BASE_URL}/api/news/${id}/toggle`, { method: "PATCH" });
      if (!res.ok) throw new Error("Erreur toggle visibilité");
      const { visible } = await res.json();
      setNewsGallery(prev => prev.map(img => img.id === id ? { ...img, visible } : img));
    } else {
      const res = await fetch(`${API_BASE_URL}/api/projects/${id}/toggle`, { method: "PATCH" });
      if (!res.ok) throw new Error("Erreur toggle visibilité");
      const { visible } = await res.json();
      setProjects(prev => prev.map(p => p.id === id ? { ...p, visible } : p));
    }
  };

  const resetData = () => {
    setNewsGallery([]);
    setProjects([]);
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
