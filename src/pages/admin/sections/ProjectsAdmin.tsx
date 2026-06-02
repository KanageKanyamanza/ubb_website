// src/pages/admin/sections/ProjectsAdmin.tsx
import React, { useState } from "react";
import { useNews, StrategicProject } from "../../../context/NewsContext";
import { Plus, Edit2, Eye, EyeOff, Trash2, X, Link as LinkIcon, FileText, Check, Layout } from "lucide-react";

export default function ProjectsAdmin() {
  const { projects, addProject, updateProject, deleteProject, toggleVisibility } = useNews();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDeleteId, setItemToDeleteId] = useState<string | null>(null);
  const [editingProject, setEditingProject] = useState<StrategicProject | null>(null);

  // Modal states
  const [title, setTitle] = useState("");
  const [tagline, setTagline] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [linkLabel, setLinkLabel] = useState("En savoir plus →");
  const [visible, setVisible] = useState(true);

  const openModal = (project?: StrategicProject) => {
    if (project) {
      setEditingProject(project);
      setTitle(project.title);
      setTagline(project.tagline || "");
      setDescription(project.description);
      setLink(project.link);
      setLinkLabel(project.linkLabel);
      setVisible(project.visible);
    } else {
      setEditingProject(null);
      setTitle("");
      setTagline("");
      setDescription("");
      setLink("");
      setLinkLabel("En savoir plus →");
      setVisible(true);
    }
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (!title || !description || !link) return;

    const projectData = { title, tagline, description, link, linkLabel, visible };

    if (editingProject) {
      updateProject(editingProject.id, projectData);
    } else {
      addProject(projectData);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-8">
      {/* Header Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-bg-card p-6 border border-border-subtle rounded-sm">
        <div>
          <h2 className="text-2xl font-serif text-text-primary italic">Projets Stratégiques</h2>
          <p className="text-text-muted text-sm mt-1">
            Gérez les plateformes et initiatives mises en avant sur le site.
          </p>
        </div>
        <button
          onClick={() => openModal()}
          className="px-6 py-2.5 bg-gold-gradient text-bg-primary rounded-sm text-xs font-bold uppercase tracking-widest hover:shadow-[0_0_15px_rgba(184,115,51,0.3)] transition-all flex items-center gap-2 self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          Nouveau Projet
        </button>
      </div>

      {/* List */}
      <div className="grid grid-cols-1 gap-6">
        {projects.map((p) => (
          <div
            key={p.id}
            className={`bg-bg-card border p-8 rounded-sm transition-all duration-300 ${
              p.visible ? "border-border-subtle hover:border-gold/30" : "border-border-subtle opacity-60"
            }`}
          >
            <div className="flex flex-col lg:flex-row justify-between gap-8">
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-4">
                  <span className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest border ${
                    p.visible ? "border-green-500/30 text-green-400 bg-green-500/5" : "border-text-muted text-text-muted"
                  }`}>
                    {p.visible ? "Actif" : "Masqué"}
                  </span>
                  <span className="text-gold text-[10px] uppercase tracking-[0.2em] font-bold">{p.tagline}</span>
                </div>
                <h3 className="text-3xl font-serif text-text-primary italic mb-4">{p.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed mb-6 max-w-3xl">
                  {p.description}
                </p>
                <div className="flex items-center gap-2 text-gold text-xs font-mono">
                  <LinkIcon className="w-3.5 h-3.5" />
                  <span>{p.link}</span>
                </div>
              </div>

              <div className="flex lg:flex-col gap-3 justify-center">
                <button
                  onClick={() => openModal(p)}
                  className="flex items-center gap-3 px-5 py-2.5 bg-bg-primary border border-border-subtle text-text-primary text-xs font-bold uppercase tracking-widest hover:border-gold transition-all"
                >
                  <Edit2 className="w-4 h-4 text-gold" />
                  Modifier
                </button>
                <button
                  onClick={() => toggleVisibility("project", p.id)}
                  className="flex items-center gap-3 px-5 py-2.5 bg-bg-primary border border-border-subtle text-text-primary text-xs font-bold uppercase tracking-widest hover:border-gold transition-all"
                >
                  {p.visible ? <EyeOff className="w-4 h-4 text-gold" /> : <Eye className="w-4 h-4 text-gold" />}
                  {p.visible ? "Masquer" : "Afficher"}
                </button>
                <button
                  onClick={() => {
                    setItemToDeleteId(p.id);
                    setIsDeleteModalOpen(true);
                  }}
                  className="flex items-center gap-3 px-5 py-2.5 bg-bg-primary border border-border-subtle text-text-muted text-xs font-bold uppercase tracking-widest hover:border-red-500/50 hover:text-red-400 transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                  Supprimer
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-bg-primary/90 backdrop-blur-md">
          <div className="bg-bg-card border border-border-subtle w-full max-w-2xl rounded-sm shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between p-6 border-b border-border-subtle">
              <h3 className="text-xl font-serif text-text-primary italic">
                {editingProject ? "Modifier le projet" : "Ajouter un projet"}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-text-muted hover:text-white transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-8 overflow-y-auto space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-text-secondary text-[10px] uppercase tracking-widest font-bold mb-2 flex items-center gap-2">
                    <Layout className="w-3 h-3 text-gold" /> Titre du projet
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full bg-bg-primary border border-border-subtle rounded-sm px-4 py-3 text-text-primary focus:outline-none focus:border-gold/50 transition-colors text-sm"
                    placeholder="ex: VitalCHECK"
                    required
                  />
                </div>
                <div>
                  <label className="block text-text-secondary text-[10px] uppercase tracking-widest font-bold mb-2">Slogan / Tagline</label>
                  <input
                    type="text"
                    value={tagline}
                    onChange={(e) => setTagline(e.target.value)}
                    className="w-full bg-bg-primary border border-border-subtle rounded-sm px-4 py-3 text-text-primary focus:outline-none focus:border-gold/50 transition-colors text-sm"
                    placeholder="ex: Diagnostic Business"
                  />
                </div>
              </div>

              <div>
                <label className="block text-text-secondary text-[10px] uppercase tracking-widest font-bold mb-2 flex items-center gap-2">
                  <FileText className="w-3 h-3 text-gold" /> Description
                </label>
                <textarea
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-bg-primary border border-border-subtle rounded-sm px-4 py-3 text-text-primary focus:outline-none focus:border-gold/50 transition-colors text-sm resize-none"
                  placeholder="Décrivez l'impact et la mission du projet..."
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-text-secondary text-[10px] uppercase tracking-widest font-bold mb-2 flex items-center gap-2">
                    <LinkIcon className="w-3.5 h-3.5 text-gold" /> URL du lien
                  </label>
                  <input
                    type="text"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    className="w-full bg-bg-primary border border-border-subtle rounded-sm px-4 py-3 text-text-primary focus:outline-none focus:border-gold/50 transition-colors text-sm font-mono"
                    placeholder="https://..."
                    required
                  />
                </div>
                <div>
                  <label className="block text-text-secondary text-[10px] uppercase tracking-widest font-bold mb-2">Texte du bouton</label>
                  <input
                    type="text"
                    value={linkLabel}
                    onChange={(e) => setLinkLabel(e.target.value)}
                    className="w-full bg-bg-primary border border-border-subtle rounded-sm px-4 py-3 text-text-primary focus:outline-none focus:border-gold/50 transition-colors text-sm"
                    placeholder="En savoir plus →"
                  />
                </div>
              </div>

              <div>
                <label className="block text-text-secondary text-[10px] uppercase tracking-widest font-bold mb-2">Visibilité publique</label>
                <button
                  onClick={() => setVisible(!visible)}
                  className={`flex items-center gap-3 px-6 py-3 rounded-sm border transition-all ${
                    visible ? "border-green-500/30 bg-green-500/5 text-green-400" : "border-border-subtle text-text-muted"
                  }`}
                >
                  <span className="text-xs uppercase tracking-widest font-bold">{visible ? "Affiché sur le site" : "Masqué pour le public"}</span>
                  {visible ? <Check className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="p-6 bg-bg-secondary border-t border-border-subtle flex justify-end gap-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-6 py-2 text-xs font-bold uppercase tracking-widest text-text-muted hover:text-white transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={handleSave}
                disabled={!title || !description || !link}
                className="px-8 py-3 bg-gold-gradient text-bg-primary rounded-sm text-xs font-bold uppercase tracking-widest hover:shadow-[0_0_15px_rgba(184,115,51,0.3)] transition-all disabled:opacity-30"
              >
                {editingProject ? "Mettre à jour" : "Enregistrer"}
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-bg-primary/90 backdrop-blur-md">
          <div className="bg-bg-card border border-red-500/20 w-full max-w-md rounded-sm shadow-2xl overflow-hidden p-8 text-center">
            <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-red-500/20">
              <Trash2 className="w-8 h-8 text-red-400" />
            </div>
            
            <h3 className="text-2xl font-serif text-text-primary italic mb-4">Confirmer la suppression</h3>
            <p className="text-text-secondary text-sm leading-relaxed mb-10">
              Êtes-vous sûr de vouloir supprimer ce projet stratégique ? Toutes les informations liées seront définitivement effacées.
            </p>

            <div className="flex gap-4">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="flex-1 py-3 bg-bg-primary border border-border-subtle text-text-muted text-xs font-bold uppercase tracking-widest hover:text-white transition-all"
              >
                Annuler
              </button>
              <button
                onClick={() => {
                  if (itemToDeleteId) deleteProject(itemToDeleteId);
                  setIsDeleteModalOpen(false);
                }}
                className="flex-1 py-3 bg-red-500 text-white text-xs font-bold uppercase tracking-widest hover:bg-red-600 transition-all shadow-lg shadow-red-500/20"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

