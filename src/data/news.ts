export interface NewsImage {
  id: string;
  url: string;
  caption: string;
  date: string;
  category: string;
  visible: boolean;
}

export const CATEGORIES = [
  "Tous", "Webinaire", "Événement", "Marketing",
  "Équipe", "Communauté", "HARVESTS"
];

export const newsGallery: NewsImage[] = [
  {
    id: "1",
    url: "https://d1yei2z3i6k35z.cloudfront.net/10694324/6931991a233b1_2151202441.jpg",
    caption: "Lancement officiel d'Ubuntu Business Builders",
    date: "2025-11-20",
    category: "Événement",
    visible: true
  },
  {
    id: "2",
    url: "https://d1yei2z3i6k35z.cloudfront.net/10694324/69a1af37b8ff5_Sanstitre-1E.png",
    caption: "Campagne de communication UBB",
    date: "2026-02-15",
    category: "Marketing",
    visible: true
  },
  {
    id: "3",
    url: "https://d1yei2z3i6k35z.cloudfront.net/10694324/69a0c152b1902_marketing-Récupéré2.png",
    caption: "Stratégie marketing digitale UBB",
    date: "2026-02-10",
    category: "Marketing",
    visible: true
  },
  {
    id: "4",
    url: "https://d1yei2z3i6k35z.cloudfront.net/10694324/69a0c0237dbf9_Cédric.png",
    caption: "L'équipe UBB en action",
    date: "2026-02-08",
    category: "Équipe",
    visible: true
  },
  {
    id: "5",
    url: "https://d1yei2z3i6k35z.cloudfront.net/10694324/699f774ba4e58_ramadan-Copie.png",
    caption: "Message UBB pour le Ramadan",
    date: "2026-03-01",
    category: "Communauté",
    visible: true
  },
  {
    id: "6",
    url: "https://d1yei2z3i6k35z.cloudfront.net/10694324/699f7675e1326_affichecareme4.png",
    caption: "Initiative communautaire — Carême 2026",
    date: "2026-03-05",
    category: "Communauté",
    visible: true
  },
  {
    id: "7",
    url: "https://d1yei2z3i6k35z.cloudfront.net/10694324/699f704906020_webinairet.png",
    caption: "Webinaire UBB — Croissance & Stratégie",
    date: "2026-04-10",
    category: "Webinaire",
    visible: true
  },
  {
    id: "8",
    url: "https://d1yei2z3i6k35z.cloudfront.net/10694324/698ece159d728_webinaire1.png",
    caption: "Webinaire UBB — Opérations & Performance",
    date: "2026-03-20",
    category: "Webinaire",
    visible: true
  },
  {
    id: "9",
    url: "https://d1yei2z3i6k35z.cloudfront.net/10694324/6942d8e7bbc41_webinaire.png",
    caption: "Webinaire UBB — Diagnostic d'entreprise",
    date: "2026-04-25",
    category: "Webinaire",
    visible: true
  },
  {
    id: "10",
    url: "https://d1yei2z3i6k35z.cloudfront.net/10694324/6931ac0b38f8f_UBBaffiche.png",
    caption: "Affiche officielle Ubuntu Business Builders",
    date: "2025-11-15",
    category: "Événement",
    visible: true
  },
  {
    id: "11",
    url: "https://d1yei2z3i6k35z.cloudfront.net/10694324/6932a4a51c24a_Recrutement_d_Ambassadeurs_HARVESTS.png",
    caption: "Recrutement d'Ambassadeurs HARVESTS 2.0",
    date: "2025-12-01",
    category: "HARVESTS",
    visible: true
  }
];
