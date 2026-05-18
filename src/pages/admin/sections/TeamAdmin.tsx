// src/pages/admin/sections/TeamAdmin.tsx
import React, { useState } from "react";
import { useTeam, TeamMember } from "../../../context/TeamContext";
import { Plus, Edit2, Eye, EyeOff, Trash2, X, User, Image, FileText, Check, Award, Briefcase, Hash } from "lucide-react";

export default function TeamAdmin() {
  const { team, addMember, updateMember, deleteMember, toggleMemberVisibility } = useTeam();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDeleteId, setItemToDeleteId] = useState<string | null>(null);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);

  // Form states
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [img, setImg] = useState("");
  const [bio, setBio] = useState("");
  const [chipsText, setChipsText] = useState("");
  const [category, setCategory] = useState<"direction" | "tech" | "growth" | "partners">("tech");
  const [visible, setVisible] = useState(true);

  const openModal = (member?: TeamMember) => {
    if (member) {
      setEditingMember(member);
      setName(member.name);
      setTitle(member.title);
      setImg(member.img);
      setBio(member.bio);
      setChipsText(member.chips.join(", "));
      setCategory(member.category);
      setVisible(member.visible);
    } else {
      setEditingMember(null);
      setName("");
      setTitle("");
      setImg("");
      setBio("");
      setChipsText("");
      setCategory("tech");
      setVisible(true);
    }
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (!name || !title || !bio) return;

    const chips = chipsText
      .split(",")
      .map((c) => c.trim())
      .filter((c) => c.length > 0);

    const memberData = {
      name,
      title,
      img: img || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&h=400&q=80",
      bio,
      chips,
      category,
      visible,
    };

    if (editingMember) {
      updateMember(editingMember.id, memberData);
    } else {
      addMember(memberData);
    }
    setIsModalOpen(false);
  };

  const getCategoryLabel = (cat: string) => {
    switch (cat) {
      case "direction": return "Direction & Conseil";
      case "tech": return "Produit & Technologie";
      case "growth": return "Croissance & Visibilité";
      case "partners": return "Partenaires Locaux";
      default: return cat;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-bg-card p-6 border border-border-subtle rounded-sm">
        <div>
          <h2 className="text-2xl font-serif text-text-primary italic">Gestion de l'Équipe</h2>
          <p className="text-text-muted text-sm mt-1">
            Gérez les profils des membres de l'équipe et des partenaires locaux affichés sur le site.
          </p>
        </div>
        <button
          onClick={() => openModal()}
          className="px-6 py-2.5 bg-gold-gradient text-bg-primary rounded-sm text-xs font-bold uppercase tracking-widest hover:shadow-[0_0_15px_rgba(201,151,58,0.3)] transition-all flex items-center gap-2 self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          Nouveau Membre
        </button>
      </div>

      {/* Grid of Team Members */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {team.map((member) => (
          <div
            key={member.id}
            className={`bg-bg-card border p-6 rounded-sm transition-all duration-300 flex flex-col justify-between ${
              member.visible ? "border-border-subtle hover:border-gold/30" : "border-border-subtle opacity-60"
            }`}
          >
            <div>
              {/* Thumbnail & Badges */}
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden border border-border-subtle bg-bg-primary">
                  <img src={member.img} alt={member.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-bold text-text-primary text-sm leading-tight">{member.name}</h4>
                  <p className="text-xs text-gold mt-0.5">{member.title}</p>
                </div>
              </div>

              {/* Tags & Categories */}
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-2 py-0.5 rounded bg-gold/10 text-gold text-[9px] font-bold uppercase tracking-widest border border-gold/20">
                  {getCategoryLabel(member.category)}
                </span>
                <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-widest border ${
                  member.visible ? "border-green-500/30 text-green-400 bg-green-500/5" : "border-text-muted text-text-muted"
                }`}>
                  {member.visible ? "Visible" : "Masqué"}
                </span>
              </div>

              {/* Bio summary */}
              <p className="text-text-secondary text-xs leading-relaxed line-clamp-3 mb-4">
                {member.bio}
              </p>

              {/* Chips */}
              <div className="flex flex-wrap gap-1.5 mb-6">
                {member.chips.map((chip) => (
                  <span key={chip} className="text-[9px] font-mono text-text-muted bg-bg-primary px-2 py-0.5 border border-border-subtle/50 rounded-sm">
                    #{chip}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2 border-t border-border-subtle/40 pt-4 mt-auto">
              <button
                onClick={() => openModal(member)}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-bg-primary border border-border-subtle text-text-primary text-[10px] font-bold uppercase tracking-widest hover:border-gold hover:text-gold transition-all"
              >
                <Edit2 className="w-3.5 h-3.5" />
                Éditer
              </button>
              <button
                onClick={() => toggleMemberVisibility(member.id)}
                className="flex items-center justify-center px-3 py-2 bg-bg-primary border border-border-subtle text-text-primary hover:border-gold hover:text-gold transition-all"
                title={member.visible ? "Masquer" : "Afficher"}
              >
                {member.visible ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              </button>
              <button
                onClick={() => {
                  setItemToDeleteId(member.id);
                  setIsDeleteModalOpen(true);
                }}
                disabled={member.id === "ambrose"} // Prevent deleting the CEO profile
                className="flex items-center justify-center px-3 py-2 bg-bg-primary border border-border-subtle text-text-muted hover:border-red-500/50 hover:text-red-400 transition-all disabled:opacity-20"
                title="Supprimer"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-bg-primary/90 backdrop-blur-md">
          <div className="bg-bg-card border border-border-subtle w-full max-w-2xl rounded-sm shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between p-6 border-b border-border-subtle">
              <h3 className="text-xl font-serif text-text-primary italic">
                {editingMember ? "Modifier le membre" : "Ajouter un membre"}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-text-muted hover:text-white transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-8 overflow-y-auto space-y-6">
              {/* Row 1: Name and Title */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-text-secondary text-[10px] uppercase tracking-widest font-bold mb-2 flex items-center gap-2">
                    <User className="w-3 h-3 text-gold" /> Nom Complet
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-bg-primary border border-border-subtle rounded-sm px-4 py-3 text-text-primary focus:outline-none focus:border-gold/50 transition-colors text-sm"
                    placeholder="ex: Raoul Nadinga"
                    required
                  />
                </div>
                <div>
                  <label className="block text-text-secondary text-[10px] uppercase tracking-widest font-bold mb-2 flex items-center gap-2">
                    <Briefcase className="w-3 h-3 text-gold" /> Poste / Rôle
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full bg-bg-primary border border-border-subtle rounded-sm px-4 py-3 text-text-primary focus:outline-none focus:border-gold/50 transition-colors text-sm"
                    placeholder="ex: Partenaire Local · Burkina Faso"
                    required
                  />
                </div>
              </div>

              {/* Row 2: Category and Photo URL */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-text-secondary text-[10px] uppercase tracking-widest font-bold mb-2 flex items-center gap-2">
                    <Award className="w-3 h-3 text-gold" /> Département / Catégorie
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full bg-bg-primary border border-border-subtle rounded-sm px-4 py-3 text-text-primary focus:outline-none focus:border-gold/50 transition-colors text-sm"
                  >
                    <option value="direction">Direction & Conseil Stratégique</option>
                    <option value="tech">Produit & Technologie</option>
                    <option value="growth">Croissance & Visibilité</option>
                    <option value="partners">Partenaires Locaux & Terrain</option>
                  </select>
                </div>
                <div>
                  <label className="block text-text-secondary text-[10px] uppercase tracking-widest font-bold mb-2 flex items-center gap-2">
                    <Image className="w-3 h-3 text-gold" /> URL de la Photo
                  </label>
                  <input
                    type="text"
                    value={img}
                    onChange={(e) => setImg(e.target.value)}
                    className="w-full bg-bg-primary border border-border-subtle rounded-sm px-4 py-3 text-text-primary focus:outline-none focus:border-gold/50 transition-colors text-sm font-mono"
                    placeholder="ex: /images/nadinga.jpg (ou lien Unsplash)"
                  />
                </div>
              </div>

              {/* Row 3: Biography */}
              <div>
                <label className="block text-text-secondary text-[10px] uppercase tracking-widest font-bold mb-2 flex items-center gap-2">
                  <FileText className="w-3 h-3 text-gold" /> Biographie
                </label>
                <textarea
                  rows={4}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full bg-bg-primary border border-border-subtle rounded-sm px-4 py-3 text-text-primary focus:outline-none focus:border-gold/50 transition-colors text-sm resize-none"
                  placeholder="Décrivez son parcours, son engagement et ses expertises..."
                  required
                />
              </div>

              {/* Row 4: Chips / Tags */}
              <div>
                <label className="block text-text-secondary text-[10px] uppercase tracking-widest font-bold mb-2 flex items-center gap-2">
                  <Hash className="w-3 h-3 text-gold" /> Expertises / Tags (séparés par des virgules)
                </label>
                <input
                  type="text"
                  value={chipsText}
                  onChange={(e) => setChipsText(e.target.value)}
                  className="w-full bg-bg-primary border border-border-subtle rounded-sm px-4 py-3 text-text-primary focus:outline-none focus:border-gold/50 transition-colors text-sm"
                  placeholder="ex: Agronomie, Burkina Faso, Coordination, Projets"
                />
              </div>

              {/* Row 5: Visibility */}
              <div>
                <label className="block text-text-secondary text-[10px] uppercase tracking-widest font-bold mb-2">Statut de Visibilité</label>
                <button
                  onClick={() => setVisible(!visible)}
                  className={`flex items-center gap-3 px-6 py-3 rounded-sm border transition-all ${
                    visible ? "border-green-500/30 bg-green-500/5 text-green-400" : "border-border-subtle text-text-muted"
                  }`}
                >
                  <span className="text-xs uppercase tracking-widest font-bold">{visible ? "Affiché sur le site" : "Masqué (Brouillon)"}</span>
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
                disabled={!name || !title || !bio}
                className="px-8 py-3 bg-gold-gradient text-bg-primary rounded-sm text-xs font-bold uppercase tracking-widest hover:shadow-[0_0_15px_rgba(201,151,58,0.3)] transition-all disabled:opacity-30"
              >
                {editingMember ? "Mettre à jour" : "Enregistrer"}
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
              Êtes-vous sûr de vouloir supprimer ce membre de l'équipe ? Cette action est irréversible.
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
                  if (itemToDeleteId) deleteMember(itemToDeleteId);
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
