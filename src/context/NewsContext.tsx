// src/context/NewsContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface NewsImage {
  id: string;
  url: string;
  caption: string;
  date: string;
  visible: boolean;
}

export interface StrategicProject {
  id: string;
  title: string;
  tagline?: string; // Adding tagline for the premium version
  description: string;
  link: string;
  linkLabel: string;
  visible: boolean;
}

interface NewsData {
  newsGallery: NewsImage[];
  projects: StrategicProject[];
}

interface NewsContextType {
  newsGallery: NewsImage[];
  projects: StrategicProject[];
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

const INITIAL_IMAGES = [
  "https://d1yei2z3i6k35z.cloudfront.net/10694324/6931991a233b1_2151202441.jpg",
  "https://d1yei2z3i6k35z.cloudfront.net/10694324/69a1af37b8ff5_Sanstitre-1E.png",
  "https://d1yei2z3i6k35z.cloudfront.net/10694324/69a0c152b1902_marketing-Récupéré2.png",
  "https://d1yei2z3i6k35z.cloudfront.net/10694324/69a0c0237dbf9_Cédric.png",
  "https://d1yei2z3i6k35z.cloudfront.net/10694324/699f774ba4e58_ramadan-Copie.png",
  "https://d1yei2z3i6k35z.cloudfront.net/10694324/699f7675e1326_affichecareme4.png",
  "https://d1yei2z3i6k35z.cloudfront.net/10694324/699f704906020_webinairet.png",
  "https://d1yei2z3i6k35z.cloudfront.net/10694324/698ece159d728_webinaire1.png",
  "https://d1yei2z3i6k35z.cloudfront.net/10694324/6942d8e7bbc41_webinaire.png",
  "https://d1yei2z3i6k35z.cloudfront.net/10694324/6931ac0b38f8f_UBBaffiche.png",
  "https://d1yei2z3i6k35z.cloudfront.net/10694324/6932a4a51c24a_Recrutement_d_Ambassadeurs_HARVESTS.png",
].map((url, idx) => ({
  id: crypto.randomUUID(),
  url,
  caption: `Actualité ${idx + 1}`,
  date: "2024-05-14",
  visible: true,
}));

const INITIAL_PROJECTS: StrategicProject[] = [
  {
    id: crypto.randomUUID(),
    title: "VitalCHECK",
    tagline: "Diagnostic Business à 360°",
    description: "Une solution d'audit automatisée qui permet aux dirigeants de PME d'identifier instantanément les leviers de performance inexploités et de sécuriser leur croissance.",
    link: "https://www.checkmyenterprise.com/pricing",
    linkLabel: "En savoir plus →",
    visible: true,
  },
  {
    id: crypto.randomUUID(),
    title: "HARVESTS 2.0",
    tagline: "L'Intelligence Commerciale Africaine",
    description: "Bien plus qu'un CRM, HARVESTS est une suite logicielle intégrée qui automatise votre force de vente et optimise vos cycles de revenus selon les réalités locales.",
    link: "https://harvests.site/pricing/",
    linkLabel: "En savoir plus →",
    visible: true,
  },
];

export const NewsProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<NewsData>(() => {
    const saved = localStorage.getItem("ubb_news_data");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return { newsGallery: INITIAL_IMAGES, projects: INITIAL_PROJECTS };
      }
    }
    return { newsGallery: INITIAL_IMAGES, projects: INITIAL_PROJECTS };
  });

  useEffect(() => {
    localStorage.setItem("ubb_news_data", JSON.stringify(data));
  }, [data]);

  const addImage = (image: Omit<NewsImage, "id">) => {
    setData((prev) => ({
      ...prev,
      newsGallery: [...prev.newsGallery, { ...image, id: crypto.randomUUID() }],
    }));
  };

  const updateImage = (id: string, image: Partial<NewsImage>) => {
    setData((prev) => ({
      ...prev,
      newsGallery: prev.newsGallery.map((img) => (img.id === id ? { ...img, ...image } : img)),
    }));
  };

  const deleteImage = (id: string) => {
    setData((prev) => ({
      ...prev,
      newsGallery: prev.newsGallery.filter((img) => img.id !== id),
    }));
  };

  const reorderImages = (newOrder: NewsImage[]) => {
    setData((prev) => ({ ...prev, newsGallery: newOrder }));
  };

  const addProject = (project: Omit<StrategicProject, "id">) => {
    setData((prev) => ({
      ...prev,
      projects: [...prev.projects, { ...project, id: crypto.randomUUID() }],
    }));
  };

  const updateProject = (id: string, project: Partial<StrategicProject>) => {
    setData((prev) => ({
      ...prev,
      projects: prev.projects.map((p) => (p.id === id ? { ...p, ...project } : p)),
    }));
  };

  const deleteProject = (id: string) => {
    setData((prev) => ({
      ...prev,
      projects: prev.projects.filter((p) => p.id !== id),
    }));
  };

  const toggleVisibility = (type: "image" | "project", id: string) => {
    if (type === "image") {
      updateImage(id, { visible: !data.newsGallery.find((img) => img.id === id)?.visible });
    } else {
      updateProject(id, { visible: !data.projects.find((p) => p.id === id)?.visible });
    }
  };

  const resetData = () => {
    setData({ newsGallery: INITIAL_IMAGES, projects: INITIAL_PROJECTS });
  };

  return (
    <NewsContext.Provider
      value={{
        ...data,
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
