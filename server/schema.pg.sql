    -- server/schema.pg.sql
-- Ubuntu Business Builders (UBB)
-- Schéma PostgreSQL avec données initiales

-- Suppression des tables existantes (ordre inverse des dépendances)
DROP TABLE IF EXISTS workbook_downloads;
DROP TABLE IF EXISTS ebook_orders;
DROP TABLE IF EXISTS community_members;
DROP TABLE IF EXISTS partner_applications;
DROP TABLE IF EXISTS contact_messages;
DROP TABLE IF EXISTS strategic_projects;
DROP TABLE IF EXISTS news_gallery;
DROP TABLE IF EXISTS team_members;
DROP TABLE IF EXISTS admins;

-- Table admins
CREATE TABLE admins (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table team_members
CREATE TABLE team_members (
    id VARCHAR(100) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    img TEXT NOT NULL,
    bio TEXT NOT NULL,
    chips TEXT NOT NULL,
    category VARCHAR(20) NOT NULL DEFAULT 'tech' CHECK (category IN ('direction', 'tech', 'growth', 'partners')),
    visible BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table news_gallery
CREATE TABLE news_gallery (
    id VARCHAR(100) PRIMARY KEY,
    url TEXT NOT NULL,
    caption TEXT NOT NULL,
    date VARCHAR(50) NOT NULL,
    category VARCHAR(100) NOT NULL,
    visible BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table strategic_projects
CREATE TABLE strategic_projects (
    id VARCHAR(100) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    tagline VARCHAR(255),
    description TEXT NOT NULL,
    link TEXT NOT NULL,
    "linkLabel" VARCHAR(100) NOT NULL DEFAULT 'En savoir plus →',
    visible BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table contact_messages
CREATE TABLE contact_messages (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    subject VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table partner_applications
CREATE TABLE partner_applications (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    country VARCHAR(100) NOT NULL,
    linkedin_url VARCHAR(255),
    motivation TEXT NOT NULL,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'accepted', 'rejected')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table community_members
CREATE TABLE community_members (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    company_name VARCHAR(255),
    industry VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table ebook_orders
CREATE TABLE ebook_orders (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    city VARCHAR(100) NOT NULL,
    zip_code VARCHAR(50) NOT NULL,
    country VARCHAR(100) NOT NULL,
    paypal_order_id VARCHAR(100) UNIQUE,
    paypal_payer_id VARCHAR(100),
    amount DECIMAL(10,2) NOT NULL,
    currency VARCHAR(10) DEFAULT 'GBP',
    status VARCHAR(50) DEFAULT 'completed',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table workbook_downloads
CREATE TABLE workbook_downloads (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    country VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ────────────────────────────────────────────────────────────────
-- DONNÉES INITIALES
-- ────────────────────────────────────────────────────────────────

INSERT INTO admins (username, password) VALUES
('ubb_admin', '$2b$10$gMocA1.c/9s/aG8aZ44jH.D6y.0GqH2nLq32P9rS1e/m7qI4Fp2F.');

INSERT INTO team_members (id, name, title, img, bio, chips, category, visible) VALUES
('ambrose', 'Ambrose Nzeyimana', 'Fondateur & Directeur Exécutif',
 'https://d1yei2z3i6k35z.cloudfront.net/10694324/69f9d5444cd729.29932403_ambroseimage.jpeg',
 'Fort de son expérience en gestion de projets et en croissance d''entreprises, Ambrose guide les organisations vers leurs objectifs financiers et stratégiques. Son expertise en structures d''affaires et en optimisation des processus lui permet de concevoir des stratégies sur mesure. Passionné d''analyse et d''innovation, il incarne la mission d''UBB : transformer les défis en opportunités durables.',
 'Gestion de projets, Croissance, Stratégie, Ubuntu', 'direction', TRUE),

('cedric', 'Cédric Bonzi', 'Responsable Opérations',
 'https://d1yei2z3i6k35z.cloudfront.net/10694324/6908d5990f636_cedric.jpeg',
 'Diplômé en IT-Finance, Cédric soutient UBB dans la structuration de ses missions stratégiques et la performance de ses équipes. En tant que Responsable des Opérations, il collabore étroitement avec le CEO pour piloter les projets, assurer la qualité des livrables et fluidifier l''organisation. Son expertise en gestion de projets et finance numérique renforce les diagnostics et optimise les outils de décision.',
 'IT-Finance, Coordination, Finance numérique, Projets', 'direction', TRUE),

('khady', 'Khady Ba', 'Web Développeur',
 'https://d1yei2z3i6k35z.cloudfront.net/10694324/6a01fe61a2db75.59269023_WhatsAppImage2026-05-11at16.53.39.jpeg',
 'Développeuse web polyvalente maîtrisant React, Next.js et Laravel, Khady conçoit des interfaces modernes tout en développant la logique métier côté serveur.',
 'React, Next.js, Laravel, Marketing digital', 'tech', TRUE),

('revhieno', 'Revhieno Roll Haurly Mbouta', 'Développeur Full Stack',
 'https://d1yei2z3i6k35z.cloudfront.net/10694324/68c431d718f0e_Revhieno.jpeg',
 'Développeur Web Full Stack passionné, spécialisé en React et Node.js, Roll conçoit des sites modernes, performants et parfaitement adaptés aux besoins métier.',
 'React, Node.js, PWA, Full Stack', 'tech', TRUE),

('chantal', 'Chantal Yandé Séne', 'Web Développeur & Designer',
 'https://d1yei2z3i6k35z.cloudfront.net/10694324/6908d601e8e63_WhatsAppImage2025-11-03at12.37.02.jpeg',
 'Passionnée de créativité numérique et de design fonctionnel, Chantal unite technologie et esthétique pour concevoir des expériences digitales harmonieuses.',
 'UI/UX, Développement web, Création graphique', 'tech', TRUE),

('andre', 'André Demba Ndione', 'Développeur Full Stack',
 'https://d1yei2z3i6k35z.cloudfront.net/10694324/697a00ae48ce1_IMG-20260128-WA0004.jpg',
 'André conçoit et développe des applications web modernes, performantes et adaptés aux besoins des entreprises sur le front-end et le back-end.',
 'Front-end, Back-end, UX/UI', 'tech', TRUE),

('ousseynou', 'Ousseynou Faye', 'Community Manager & Assistant Marketing',
 'https://d1yei2z3i6k35z.cloudfront.net/10694324/69fa2b2b2e5a80.73389652_WhatsAppImage2026-05-05at15.08.07.jpeg',
 'Professionnel polyvalent à l''intersection de la communication digitale et de la gestion financière, Ousseynou allie rigueur analytique et créativité stratégique pour accompagner les marques et maximiser la performance.',
 'Community Management, SEO, Finance, Branding', 'growth', TRUE),

('babacar', 'Babacar Thiombane', 'Community Manager & Assistant Marketing',
 'https://d1yei2z3i6k35z.cloudfront.net/10694324/6a020b288d8af1.08959300_WhatsAppImage2026-05-05at15.03.32.jpeg',
 'Spécialisé en Community Management, Marketing Digital et Développement Commercial, Babacar accompagne les entreprises dans la croissance de leur visibilité. Il conçoit des stratégies en acquisition et engagement.',
 'Marketing Digital, Développement Commercial, Acquisition', 'growth', TRUE),

('nadinga', 'Nadinga Soapaaba Raoul', 'Partenaire Local · Burkina Faso',
 '/images/nadinga.jpg',
 'Nadinga Soapaaba Raoul est un technicien agronome dynamique, rigoureux et orienté résultats, doté d''une solide formation en agro-sylvo-pastorale et agronomie à l''Université Saint Thomas d''Aquin. Il possède une expérience pratique en recherche agronomique, transformation agroalimentaire et montage de projets. Polyvalent, maîtrisant les outils bureautiques et les techniques culturales, il se distingue par son esprit d''équipe, son assiduité et son engagement professionnel.',
 'Agronomie, Burkina Faso, Projets Agricoles, Ubuntu', 'partners', TRUE);

INSERT INTO news_gallery (id, url, caption, date, category, visible) VALUES
('news-1',
 'https://d1yei2z3i6k35z.cloudfront.net/10694324/6943262fb4eee_WhatsAppImage2025-11-20at15.08.2711.jpeg',
 'Session plénière d''orientation stratégique animée par le fondateur Ambrose Nzeyimana devant l''équipe d''experts d''Ubuntu Business Builders.',
 '15 Novembre 2025', 'Conseil', TRUE),

('news-2',
 'https://d1yei2z3i6k35z.cloudfront.net/10694324/694325a74e507_WhatsAppImage2025-11-20at15.08.261.jpeg',
 'Diagnostic de terrain d''une exploitation agricole partenaire, évaluant le déploiement de techniques culturales durables.',
 '10 Octobre 2025', 'Agribusiness', TRUE),

('news-3',
 'https://d1yei2z3i6k35z.cloudfront.net/10694324/6943260be3479_WhatsAppImage2025-11-20at15.08.273.jpeg',
 'Atelier d''intelligence collective et de cartographie des processus pour la structuration administrative d''une entreprise partenaire.',
 '28 Septembre 2025', 'Formations', TRUE);

INSERT INTO strategic_projects (id, title, tagline, description, link, "linkLabel", visible) VALUES
('proj-1', 'VitalCHECK', 'Diagnostic Business à 360°',
 'Une solution d''audit automatisée qui permet aux dirigeants d''entreprises d''identifier instantanément les leviers de performance inexploités et de sécuriser leur croissance.',
 'https://www.checkmyenterprise.com/pricing', 'En savoir plus →', TRUE),

('proj-2', 'HARVESTS 2.0', 'L''Intelligence Commerciale Africaine',
 'Bien plus qu''un CRM, HARVESTS est une suite logicielle intégrée qui automatise votre force de vente et optimise vos cycles de revenus selon les réalités locales.',
 'https://harvests.site/pricing/', 'En savoir plus →', TRUE);
