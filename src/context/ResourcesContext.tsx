// src/context/ResourcesContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { API_BASE_URL } from "../config/api";

export interface Resource {
  id: string;
  type: string;
  title: string;
  description: string;
  image: string;
  link?: string;
  pages?: string;
  visible: boolean;
}

interface ResourcesContextType {
  resources: Resource[];
  loading: boolean;
  addResource: (resource: Omit<Resource, "id">) => void;
  updateResource: (id: string, resource: Partial<Resource>) => void;
  deleteResource: (id: string) => void;
  toggleResourceVisibility: (id: string) => void;
}

const ResourcesContext = createContext<ResourcesContextType | undefined>(undefined);

export const ResourcesProvider = ({ children }: { children: ReactNode }) => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/resources`)
      .then((res) => {
        if (!res.ok) throw new Error("HTTP error " + res.status);
        return res.json();
      })
      .then((data) => {
        setResources(data);
        localStorage.setItem("ubb_resources_data_v1", JSON.stringify(data));
      })
      .catch((err) => {
        console.warn("API ressources hors-ligne. Utilisation du stockage local.", err);
        const saved = localStorage.getItem("ubb_resources_data_v1");
        if (saved) {
          try { setResources(JSON.parse(saved)); } catch { /* tableau vide par défaut */ }
        }
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    localStorage.setItem("ubb_resources_data_v1", JSON.stringify(resources));
  }, [resources]);

  const addResource = (resource: Omit<Resource, "id">) => {
    fetch(`${API_BASE_URL}/api/resources`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(resource),
    })
      .then((res) => {
        if (!res.ok) throw new Error("HTTP error " + res.status);
        return res.json();
      })
      .then(({ id }) => {
        setResources((prev) => [...prev, { ...resource, id }]);
      })
      .catch((err) => {
        console.error("Erreur ajout ressource:", err);
        setResources((prev) => [...prev, { ...resource, id: crypto.randomUUID() }]);
      });
  };

  const updateResource = (id: string, resource: Partial<Resource>) => {
    const current = resources.find((r) => r.id === id);
    if (!current) return;
    const updated = { ...current, ...resource };

    fetch(`${API_BASE_URL}/api/resources/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated),
    })
      .then((res) => {
        if (!res.ok) throw new Error("HTTP error " + res.status);
      })
      .catch((err) => console.error("Erreur mise à jour ressource:", err));

    setResources((prev) => prev.map((r) => (r.id === id ? updated : r)));
  };

  const deleteResource = (id: string) => {
    fetch(`${API_BASE_URL}/api/resources/${id}`, { method: "DELETE" })
      .then((res) => {
        if (!res.ok) throw new Error("HTTP error " + res.status);
      })
      .catch((err) => console.error("Erreur suppression ressource:", err));

    setResources((prev) => prev.filter((r) => r.id !== id));
  };

  const toggleResourceVisibility = (id: string) => {
    fetch(`${API_BASE_URL}/api/resources/${id}/toggle`, { method: "PATCH" })
      .then((res) => {
        if (!res.ok) throw new Error("HTTP error " + res.status);
        return res.json();
      })
      .then(({ visible }) => {
        setResources((prev) => prev.map((r) => (r.id === id ? { ...r, visible } : r)));
      })
      .catch((err) => {
        console.error("Erreur toggle visibilité ressource:", err);
        setResources((prev) => prev.map((r) => (r.id === id ? { ...r, visible: !r.visible } : r)));
      });
  };

  return (
    <ResourcesContext.Provider
      value={{
        resources,
        loading,
        addResource,
        updateResource,
        deleteResource,
        toggleResourceVisibility,
      }}
    >
      {children}
    </ResourcesContext.Provider>
  );
};

export const useResources = () => {
  const context = useContext(ResourcesContext);
  if (context === undefined) {
    throw new Error("useResources must be used within a ResourcesProvider");
  }
  return context;
};
