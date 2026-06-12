// src/pages/admin/sections/RessourcesAdmin.tsx
import React, { useState } from "react";
import { useResources, Resource } from "../../../context/ResourcesContext";
import { Plus, Edit2, Eye, EyeOff, Trash2, X, Image as ImageIcon, Link as LinkIcon, FileText, Check } from "lucide-react";

const RESOURCE_TYPES = ["E-book", "Guide", "Podcast", "Formation vidéo", "Workbook", "Article"];

export default function RessourcesAdmin() {
  const { resources, addResource, updateResource, deleteResource, toggleResourceVisibility } = useResources();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDeleteId, setItemToDeleteId] = useState<string | null>(null);
  const [editingResource, setEditingResource] = useState<Resource | null>(null);

  // Modal states
  const [type, setType] = useState(RESOURCE_TYPES[0]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [link, setLink] = useState("");
  const [pages, setPages] = useState("");
  const [visible, setVisible] = useState(true);
  const [uploadError, setUploadError] = useState("");

  const isVideoType = type === "Formation vidéo";
  const isDocType = ["E-book", "Guide", "Workbook"].includes(type);

  const openModal = (resource?: Resource) => {
    if (resource) {
      setEditingResource(resource);
      setType(resource.type || RESOURCE_TYPES[0]);
      setTitle(resource.title);
      setDescription(resource.description);
      setImage(resource.image || "");
      setLink(resource.link || "");
      setPages(resource.pages || "");
      setVisible(resource.visible);
    } else {
      setEditingResource(null);
      setType(RESOURCE_TYPES[0]);
      setTitle("");
      setDescription("");
      setImage("");
      setLink("");
      setPages("");
      setVisible(true);
    }
    setUploadError("");
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (!title || !description) return;

    const resourceData = { type, title, description, image, link, pages, visible };

    if (editingResource) {
      updateResource(editingResource.id, resourceData);
    } else {
      addResource(resourceData);
    }
    setIsModalOpen(false);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const MAX_WIDTH = 1200;
    const QUALITY = 0.75;

    const img = new Image();
    const objectUrl = URL.createObjectURL(file);
    img.onload = () => {
      const canvas = document.createElement("canvas");
      let w = img.width;
      let h = img.height;
      if (w > MAX_WIDTH) {
        h = Math.round((h * MAX_WIDTH) / w);
        w = MAX_WIDTH;
      }
      canvas.width = w;
      canvas.height = h;
      canvas.getContext("2d")!.drawImage(img, 0, 0, w, h);
      const compressed = canvas.toDataURL("image/jpeg", QUALITY);
      setImage(compressed);
      URL.revokeObjectURL(objectUrl);
    };
    img.src = objectUrl;
  };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const MAX_SIZE = 7 * 1024 * 1024; // ~7 Mo (limite body API = 10 Mo, l'encodage base64 ajoute ~33%)
    if (file.size > MAX_SIZE) {
      setUploadError("Cette vidéo est trop volumineuse (max ~7 Mo). Hébergez-la ailleurs (YouTube, Drive...) et collez son lien dans le champ « Lien » ci-dessous.");
      return;
    }

    setUploadError("");
    const reader = new FileReader();
    reader.onload = () => setImage(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handlePdfUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const MAX_SIZE = 7 * 1024 * 1024; // ~7 Mo (limite body API = 10 Mo, l'encodage base64 ajoute ~33%)
    if (file.size > MAX_SIZE) {
      setUploadError("Ce fichier est trop volumineux (max ~7 Mo). Hébergez-le ailleurs (Google Drive...) et collez son lien dans le champ « Lien » ci-dessous.");
      return;
    }

    setUploadError("");
    const reader = new FileReader();
    reader.onload = () => setLink(reader.result as string);
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-8">
      {/* Header Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-bg-card p-6 border border-border-subtle rounded-sm">
        <div>
          <h2 className="text-2xl font-serif text-text-primary italic">Ressources</h2>
          <p className="text-text-muted text-sm mt-1">
            Gérez les e-books, guides et autres ressources affichés sur la page Ressources.
          </p>
        </div>
        <button
          onClick={() => openModal()}
          className="px-6 py-2.5 bg-gold-gradient text-bg-primary rounded-sm text-xs font-bold uppercase tracking-widest hover:shadow-[0_0_15px_rgba(184,115,51,0.3)] transition-all flex items-center gap-2 self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          Nouvelle Ressource
        </button>
      </div>

      {/* List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map((r) => (
          <div
            key={r.id}
            className={`bg-bg-card border rounded-sm overflow-hidden transition-all duration-300 flex flex-col ${
              r.visible ? "border-border-subtle hover:border-gold/30" : "border-border-subtle opacity-60"
            }`}
          >
            <div className="aspect-video relative overflow-hidden bg-bg-primary flex items-center justify-center">
              {r.image ? (
                r.type === "Formation vidéo" ? (
                  <video src={r.image} className="w-full h-full object-cover" muted />
                ) : (
                  <img src={r.image} alt={r.title} className="w-full h-full object-cover" />
                )
              ) : (
                <ImageIcon className="w-10 h-10 text-text-muted opacity-20" />
              )}
              {!r.visible && (
                <div className="absolute inset-0 bg-bg-primary/60 backdrop-blur-[1px] flex items-center justify-center">
                  <div className="px-3 py-1 bg-bg-card border border-text-muted rounded-full text-[10px] text-text-muted uppercase tracking-widest font-bold">
                    Masquée
                  </div>
                </div>
              )}
            </div>

            <div className="p-5 flex-1 flex flex-col">
              <span className="inline-block px-3 py-1 bg-gold/10 text-gold text-[10px] font-bold uppercase tracking-widest rounded-full mb-3 self-start">
                {r.type}
              </span>
              <h3 className="text-lg font-serif text-text-primary mb-2 line-clamp-2">{r.title}</h3>
              <p className="text-text-secondary text-sm leading-relaxed mb-4 line-clamp-3 flex-grow">
                {r.description}
              </p>
              {r.link && (
                <div className="flex items-center gap-2 text-gold text-xs font-mono mb-4 truncate">
                  <LinkIcon className="w-3.5 h-3.5 flex-shrink-0" />
                  <span className="truncate">{r.link}</span>
                </div>
              )}

              <div className="mt-auto pt-4 border-t border-border-subtle flex justify-between items-center">
                <div className="flex gap-2">
                  <button
                    onClick={() => openModal(r)}
                    className="p-2 text-text-muted hover:text-gold hover:bg-gold/5 transition-all rounded-sm"
                    title="Modifier"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => toggleResourceVisibility(r.id)}
                    className={`p-2 transition-all rounded-sm ${r.visible ? "text-text-muted hover:text-white" : "text-gold hover:bg-gold/5"}`}
                    title={r.visible ? "Masquer" : "Afficher"}
                  >
                    {r.visible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <button
                  onClick={() => {
                    setItemToDeleteId(r.id);
                    setIsDeleteModalOpen(true);
                  }}
                  className="p-2 text-text-muted hover:text-red-400 hover:bg-red-500/5 transition-all rounded-sm"
                  title="Supprimer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}

        {resources.length === 0 && (
          <div className="col-span-full text-center py-16 text-text-muted text-sm">
            Aucune ressource pour le moment. Cliquez sur « Nouvelle Ressource » pour en ajouter.
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-bg-primary/90 backdrop-blur-md">
          <div className="bg-bg-card border border-border-subtle w-full max-w-2xl rounded-sm shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between p-6 border-b border-border-subtle">
              <h3 className="text-xl font-serif text-text-primary italic">
                {editingResource ? "Modifier la ressource" : "Ajouter une ressource"}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-text-muted hover:text-white transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-8 overflow-y-auto space-y-6">
              {/* Aperçu */}
              <div className="aspect-video w-full bg-bg-primary border border-border-subtle rounded-sm overflow-hidden relative flex items-center justify-center text-text-muted">
                {image ? (
                  isVideoType ? (
                    <video src={image} controls className="w-full h-full object-contain" />
                  ) : (
                    <img src={image} alt="Aperçu" className="w-full h-full object-contain" />
                  )
                ) : (
                  <div className="flex flex-col items-center gap-3">
                    <ImageIcon className="w-10 h-10 opacity-20" />
                    <span className="text-xs uppercase tracking-widest">
                      {isVideoType ? "Aperçu de la vidéo" : "Aperçu de l'image"}
                    </span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-text-secondary text-[10px] uppercase tracking-widest font-bold mb-2">
                  {isVideoType ? "Vidéo" : "Image de couverture"}
                </label>
                <div className="flex flex-col gap-4">
                  <div className="relative group">
                    {isVideoType ? (
                      <input
                        type="file"
                        accept="video/*,.mov"
                        onChange={handleVideoUpload}
                        className="absolute inset-0 opacity-0 cursor-pointer z-10"
                      />
                    ) : (
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="absolute inset-0 opacity-0 cursor-pointer z-10"
                      />
                    )}
                    <div className="w-full bg-bg-primary border border-dashed border-border-subtle group-hover:border-gold/50 transition-colors rounded-sm py-8 flex flex-col items-center justify-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
                        <Plus className="w-5 h-5 text-gold" />
                      </div>
                      <span className="text-xs text-text-secondary uppercase tracking-widest font-bold">Sélectionner un fichier local</span>
                      <p className="text-[10px] text-text-muted">
                        {isVideoType ? "MP4, MOV ou WEBM (max ~7Mo recommandé)" : "JPG, PNG ou WEBP (max 2Mo recommandé)"}
                      </p>
                    </div>
                  </div>

                  {uploadError && (
                    <p className="text-[11px] text-red-400 leading-relaxed">{uploadError}</p>
                  )}

                  <div className="relative">
                    <div className="flex items-center gap-4 mb-2">
                      <div className="h-px flex-1 bg-border-subtle" />
                      <span className="text-[9px] text-text-muted uppercase tracking-widest">Ou entrer une URL</span>
                      <div className="h-px flex-1 bg-border-subtle" />
                    </div>
                    <input
                      type="text"
                      value={image}
                      onChange={(e) => setImage(e.target.value)}
                      className="w-full bg-bg-primary border border-border-subtle rounded-sm px-4 py-3 text-text-primary focus:outline-none focus:border-gold/50 transition-colors text-sm"
                      placeholder="https://..."
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-text-secondary text-[10px] uppercase tracking-widest font-bold mb-2">Type</label>
                  <select
                    value={type}
                    onChange={(e) => {
                      setType(e.target.value);
                      setUploadError("");
                    }}
                    className="w-full bg-bg-primary border border-border-subtle rounded-sm px-4 py-3 text-text-primary focus:outline-none focus:border-gold/50 transition-colors text-sm"
                  >
                    {RESOURCE_TYPES.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-text-secondary text-[10px] uppercase tracking-widest font-bold mb-2">Pages / Format (optionnel)</label>
                  <input
                    type="text"
                    value={pages}
                    onChange={(e) => setPages(e.target.value)}
                    className="w-full bg-bg-primary border border-border-subtle rounded-sm px-4 py-3 text-text-primary focus:outline-none focus:border-gold/50 transition-colors text-sm"
                    placeholder="ex: 32 pages, Gratuit..."
                  />
                </div>
              </div>

              <div>
                <label className="block text-text-secondary text-[10px] uppercase tracking-widest font-bold mb-2">Titre</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-bg-primary border border-border-subtle rounded-sm px-4 py-3 text-text-primary focus:outline-none focus:border-gold/50 transition-colors text-sm"
                  placeholder="Titre de la ressource"
                  required
                />
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
                  placeholder="Décrivez le contenu de la ressource..."
                  required
                />
              </div>

              <div>
                <label className="block text-text-secondary text-[10px] uppercase tracking-widest font-bold mb-2 flex items-center gap-2">
                  <LinkIcon className="w-3.5 h-3.5 text-gold" /> Lien (téléchargement ou page externe, optionnel)
                </label>
                <input
                  type="text"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  className="w-full bg-bg-primary border border-border-subtle rounded-sm px-4 py-3 text-text-primary focus:outline-none focus:border-gold/50 transition-colors text-sm font-mono"
                  placeholder="https://..."
                />
                {isDocType && (
                  <div className="relative group mt-3">
                    <input
                      type="file"
                      accept="application/pdf,.pdf,application/vnd.openxmlformats-officedocument.presentationml.presentation,.pptx"
                      onChange={handlePdfUpload}
                      className="absolute inset-0 opacity-0 cursor-pointer z-10"
                    />
                    <div className="w-full bg-bg-primary border border-dashed border-border-subtle group-hover:border-gold/50 transition-colors rounded-sm py-4 flex items-center justify-center gap-3">
                      <Plus className="w-4 h-4 text-gold" />
                      <span className="text-xs text-text-secondary uppercase tracking-widest font-bold">Ou importer un fichier PDF ou PPTX (max ~7Mo)</span>
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-text-secondary text-[10px] uppercase tracking-widest font-bold mb-2">Visibilité publique</label>
                <button
                  onClick={() => setVisible(!visible)}
                  className={`flex items-center gap-3 px-6 py-3 rounded-sm border transition-all ${
                    visible ? "border-green-500/30 bg-green-500/5 text-green-400" : "border-border-subtle text-text-muted"
                  }`}
                >
                  <span className="text-xs uppercase tracking-widest font-bold">{visible ? "Affichée sur le site" : "Masquée pour le public"}</span>
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
                disabled={!title || !description}
                className="px-8 py-3 bg-gold-gradient text-bg-primary rounded-sm text-xs font-bold uppercase tracking-widest hover:shadow-[0_0_15px_rgba(184,115,51,0.3)] transition-all disabled:opacity-30"
              >
                {editingResource ? "Mettre à jour" : "Enregistrer"}
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
              Êtes-vous sûr de vouloir supprimer cette ressource ? Elle sera définitivement retirée du site.
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
                  if (itemToDeleteId) deleteResource(itemToDeleteId);
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
