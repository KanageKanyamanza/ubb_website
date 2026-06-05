// src/context/TeamContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { API_BASE_URL } from "../config/api";

export interface TeamMember {
  id: string;
  name: string;
  title: string;
  img: string;
  bio: string;
  chips: string[];
  category: "direction" | "tech" | "growth" | "partners";
  visible: boolean;
  linkedin?: string;
}

interface TeamContextType {
  team: TeamMember[];
  addMember: (member: Omit<TeamMember, "id">) => void;
  updateMember: (id: string, member: Partial<TeamMember>) => void;
  deleteMember: (id: string) => void;
  toggleMemberVisibility: (id: string) => void;
  resetTeam: () => void;
}

const TeamContext = createContext<TeamContextType | undefined>(undefined);

const INITIAL_TEAM: TeamMember[] = [
  {
    id: "ambrose",
    name: "Ambrose Nzeyimana",
    title: "Fondateur & Directeur Exécutif",
    img: "https://d1yei2z3i6k35z.cloudfront.net/10694324/69f9d5444cd729.29932403_ambroseimage.jpeg",
    bio: "Fort de son expérience en gestion de projets et en croissance d'entreprises, Ambrose guide les organisations vers leurs objectifs financiers et stratégiques. Son expertise en structures d'affaires et en optimisation des processus lui permet de concevoir des stratégies sur mesure. Passionné d'analyse et d'innovation, il incarne la mission d'UBB : transformer les défis en opportunités durables.",
    chips: ["Gestion de projets", "Croissance", "Stratégie", "Ubuntu"],
    category: "direction",
    visible: true,
  },
  {
    id: "cedric",
    name: "Cédric Bonzi",
    title: "Responsable Opérations",
    img: "https://d1yei2z3i6k35z.cloudfront.net/10694324/6908d5990f636_cedric.jpeg",
    bio: "Diplômé en IT-Finance, Cédric soutient UBB dans la structuration de ses missions stratégiques et la performance de ses équipes. En tant que Responsable des Opérations, il collabore étroitement avec le CEO pour piloter les projets, assurer la qualité des livrables et fluidifier l'organisation. Son expertise en gestion de projets et finance numérique renforce les diagnostics et optimise les outils de décision.",
    chips: ["IT-Finance", "Coordination", "Finance numérique", "Projets"],
    category: "direction",
    visible: true,
  },
  {
    id: "khady",
    name: "Khady Ba",
    title: "Web Développeur",
    img: "https://d1yei2z3i6k35z.cloudfront.net/10694324/6a01fe61a2db75.59269023_WhatsAppImage2026-05-11at16.53.39.jpeg",
    bio: "Développeuse web polyvalente maîtrisant React, Next.js et Laravel, Khady conçoit des interfaces modernes tout en développant la logique métier côté serveur.",
    chips: ["React", "Next.js", "Laravel", "Marketing digital"],
    category: "tech",
    visible: true,
  },
  {
    id: "revhieno",
    name: "Revhieno Roll Haurly Mbouta",
    title: "Développeur Full Stack",
    img: "https://d1yei2z3i6k35z.cloudfront.net/10694324/68c431d718f0e_Revhieno.jpeg",
    bio: "Développeur Web Full Stack passionné, spécialisé en React et Node.js, Roll conçoit des sites modernes, performants et parfaitement adaptés aux besoins métier.",
    chips: ["React", "Node.js", "PWA", "Full Stack"],
    category: "tech",
    visible: true,
  },
  {
    id: "chantal",
    name: "Chantal Yandé Séne",
    title: "Web Développeur & Designer",
    img: "https://d1yei2z3i6k35z.cloudfront.net/10694324/6908d601e8e63_WhatsAppImage2025-11-03at12.37.02.jpeg",
    bio: "Passionnée de créativité numérique et de design fonctionnel, Chantal unite technologie et esthétique pour concevoir des expériences digitales harmonieuses.",
    chips: ["UI/UX", "Développement web", "Création graphique"],
    category: "tech",
    visible: true,
  },
  {
    id: "andre",
    name: "André Demba Ndione",
    title: "Développeur Full Stack",
    img: "https://d1yei2z3i6k35z.cloudfront.net/10694324/697a00ae48ce1_IMG-20260128-WA0004.jpg",
    bio: "André conçoit et développe des applications web modernes, performantes et adaptés aux besoins des entreprises sur le front-end et le back-end.",
    chips: ["Front-end", "Back-end", "UX/UI"],
    category: "tech",
    visible: true,
  },
  {
    id: "ousseynou",
    name: "Ousseynou Faye",
    title: "Community Manager & Assistant Marketing",
    img: "https://d1yei2z3i6k35z.cloudfront.net/10694324/69fa2b2b2e5a80.73389652_WhatsAppImage2026-05-05at15.08.07.jpeg",
    bio: "Professionnel polyvalent à l'intersection de la communication digitale et de la gestion financière, Ousseynou allie rigueur analytique et créativité stratégique pour accompagner les marques et maximiser la performance.",
    chips: ["Community Management", "SEO", "Finance", "Branding"],
    category: "growth",
    visible: true,
  },
  {
    id: "babacar",
    name: "Babacar Thiombane",
    title: "Community Manager & Assistant Marketing",
    img: "https://d1yei2z3i6k35z.cloudfront.net/10694324/6a020b288d8af1.08959300_WhatsAppImage2026-05-05at15.03.32.jpeg",
    bio: "Spécialisé en Community Management, Marketing Digital et Développement Commercial, Babacar accompagne les entreprises dans la croissance de leur visibilité. Il conçoit des stratégies en acquisition et engagement.",
    chips: ["Marketing Digital", "Développement Commercial", "Acquisition"],
    category: "growth",
    visible: true,
  },
  {
    id: "nadinga",
    name: "Nadinga Soapaaba Raoul",
    title: "Partenaire Local · Burkina Faso",
    img: "/images/nadinga.jpg",
    bio: "Nadinga Soapaaba Raoul est un technicien agronome dynamique, rigoureux et orienté résultats, doté d’une solide formation en agro-sylvo-pastorale et agronomie à l’Université Saint Thomas d’Aquin. Il possède une expérience pratique en recherche agronomique, transformation agroalimentaire et montage de projets. Polyvalent, maîtrisant les outils bureautiques et les techniques culturales, il se distingue par son esprit d’équipe, son assiduité et son engagement professionnel.",
    chips: ["Agronomie", "Burkina Faso", "Projets Agricoles", "Ubuntu"],
    category: "partners",
    visible: true,
  },
];

export const TeamProvider = ({ children }: { children: ReactNode }) => {
  const [team, setTeam] = useState<TeamMember[]>(INITIAL_TEAM);

  // 1. Fetch team members from monolithic Express database on mount
  useEffect(() => {
    fetch(`${API_BASE_URL}/api/team`)
      .then((res) => {
        if (!res.ok) throw new Error("HTTP error " + res.status);
        return res.json();
      })
      .then((data) => {
        setTeam(data);
        localStorage.setItem("ubb_team_data_v2", JSON.stringify(data));
      })
      .catch((err) => {
        console.warn("Serveur MySQL hors-ligne. Utilisation du stockage local.", err);
        const saved = localStorage.getItem("ubb_team_data_v2");
        if (saved) {
          try {
            setTeam(JSON.parse(saved));
          } catch (e) {
            setTeam(INITIAL_TEAM);
          }
        }
      });
  }, []);

  // 2. Synchronize memory to localstorage as a secondary fallback
  useEffect(() => {
    if (team.length > 0) {
      localStorage.setItem("ubb_team_data_v2", JSON.stringify(team));
    }
  }, [team]);

  const addMember = (member: Omit<TeamMember, "id">) => {
    fetch(`${API_BASE_URL}/api/team`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(member)
    })
      .then((res) => {
        if (!res.ok) throw new Error("HTTP error " + res.status);
        return res.json();
      })
      .then((data) => {
        setTeam((prev) => [...prev, { ...member, id: data.id || crypto.randomUUID() }]);
      })
      .catch((err) => {
        console.error("Erreur de sauvegarde en base de données MySQL :", err);
        // Fallback local en mémoire
        setTeam((prev) => [...prev, { ...member, id: crypto.randomUUID() }]);
      });
  };

  const updateMember = (id: string, member: Partial<TeamMember>) => {
    const current = team.find(m => m.id === id);
    if (!current) return;
    const updated = { ...current, ...member };

    fetch(`${API_BASE_URL}/api/team/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated)
    })
      .then((res) => {
        if (!res.ok) throw new Error("HTTP error " + res.status);
        setTeam((prev) => prev.map((m) => (m.id === id ? updated : m)));
      })
      .catch((err) => {
        console.error("Erreur de modification en base de données MySQL :", err);
        setTeam((prev) => prev.map((m) => (m.id === id ? updated : m)));
      });
  };

  const deleteMember = (id: string) => {
    fetch(`${API_BASE_URL}/api/team/${id}`, {
      method: "DELETE"
    })
      .then((res) => {
        if (!res.ok) throw new Error("HTTP error " + res.status);
        setTeam((prev) => prev.filter((m) => m.id !== id));
      })
      .catch((err) => {
        console.error("Erreur de suppression en base de données MySQL :", err);
        setTeam((prev) => prev.filter((m) => m.id !== id));
      });
  };

  const toggleMemberVisibility = (id: string) => {
    fetch(`${API_BASE_URL}/api/team/${id}/toggle`, {
      method: "PATCH"
    })
      .then((res) => {
        if (!res.ok) throw new Error("HTTP error " + res.status);
        setTeam((prev) =>
          prev.map((m) => (m.id === id ? { ...m, visible: !m.visible } : m))
        );
      })
      .catch((err) => {
        console.error("Erreur de modification de visibilité en base de données MySQL :", err);
        setTeam((prev) =>
          prev.map((m) => (m.id === id ? { ...m, visible: !m.visible } : m))
        );
      });
  };

  const resetTeam = () => {
    setTeam(INITIAL_TEAM);
  };

  return (
    <TeamContext.Provider
      value={{
        team,
        addMember,
        updateMember,
        deleteMember,
        toggleMemberVisibility,
        resetTeam,
      }}
    >
      {children}
    </TeamContext.Provider>
  );
};

export const useTeam = () => {
  const context = useContext(TeamContext);
  if (context === undefined) {
    throw new Error("useTeam must be used within a TeamProvider");
  }
  return context;
};
