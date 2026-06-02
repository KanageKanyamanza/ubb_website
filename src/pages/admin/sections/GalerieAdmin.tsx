// src/pages/admin/sections/GalerieAdmin.tsx
import React, { useState } from "react";
import { useNews, NewsImage } from "../../../context/NewsContext";
import { CATEGORIES } from "../../../data/news";
import { Plus, Edit2, Eye, EyeOff, Trash2, GripVertical, X, Image as ImageIcon, Calendar as CalendarIcon, Check } from "lucide-react";

export default function GalerieAdmin() {
  const { newsGallery, addImage, updateImage, deleteImage, reorderImages, toggleVisibility } = useNews();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDeleteId, setItemToDeleteId] = useState<string | null>(null);
  const [editingImage, setEditingImage] = useState<NewsImage | null>(null);
  const [isReordering, setIsReordering] = useState(false);
  
  // Modal states
  const [url, setUrl] = useState("");
  const [caption, setCaption] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("Webinaire");
  const [visible, setVisible] = useState(true);

  const openModal = (image?: NewsImage) => {
    if (image) {
      setEditingImage(image);
      setUrl(image.url);
      setCaption(image.caption);
      setDate(image.date);
      setCategory(image.category || "Webinaire");
      setVisible(image.visible);
    } else {
      setEditingImage(null);
      setUrl("");
      setCaption("");
      setDate(new Date().toISOString().split("T")[0]);
      setCategory("Webinaire");
      setVisible(true);
    }
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (!url) return;
    if (editingImage) {
      updateImage(editingImage.id, { url, caption, date, visible, category });
    } else {
      addImage({ url, caption, date, visible, category });
    }
    setIsModalOpen(false);
  };

  // Drag & Drop
  const [draggedItem, setDraggedItem] = useState<number | null>(null);

  const onDragStart = (idx: number) => {
    if (!isReordering) return;
    setDraggedItem(idx);
  };

  const onDragOver = (e: React.DragEvent, idx: number) => {
    e.preventDefault();
    if (!isReordering || draggedItem === null || draggedItem === idx) return;
    
    const newList = [...newsGallery];
    const item = newList[draggedItem];
    newList.splice(draggedItem, 1);
    newList.splice(idx, 0, item);
    
    reorderImages(newList);
    setDraggedItem(idx);
  };

  const onDragEnd = () => {
    setDraggedItem(null);
  };

  const visibleCount = newsGallery.filter(img => img.visible).length;

  return (
    <div className="space-y-8">
      {/* Header Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-bg-card p-6 border border-border-subtle rounded-sm">
        <div>
          <h2 className="text-2xl font-serif text-text-primary italic">Galerie Actualités</h2>
          <p className="text-text-muted text-sm mt-1">
            {newsGallery.length} images au total &bull; <span className="text-green-400">{visibleCount} visibles</span> &bull; <span className="text-text-muted">{newsGallery.length - visibleCount} masquées</span>
          </p>
        </div>
        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => setIsReordering(!isReordering)}
            className={`px-6 py-2.5 rounded-sm text-xs font-bold uppercase tracking-widest transition-all border ${
              isReordering ? "bg-gold text-bg-primary border-gold" : "border-gold/40 text-gold hover:bg-gold/10"
            }`}
          >
            {isReordering ? "Valider l'ordre" : "Réorganiser"}
          </button>
          <button
            onClick={() => openModal()}
            className="px-6 py-2.5 bg-gold-gradient text-bg-primary rounded-sm text-xs font-bold uppercase tracking-widest hover:shadow-[0_0_15px_rgba(184,115,51,0.3)] transition-all flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Ajouter une image
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {newsGallery.map((img, idx) => (
          <div
            key={img.id}
            draggable={isReordering}
            onDragStart={() => onDragStart(idx)}
            onDragOver={(e) => onDragOver(e, idx)}
            onDragEnd={onDragEnd}
            className={`group bg-bg-card border transition-all duration-300 rounded-sm overflow-hidden flex flex-col ${
              isReordering ? "cursor-move border-gold/40 shadow-lg" : "border-border-subtle hover:border-gold/20"
            } ${draggedItem === idx ? "opacity-30 scale-95" : "opacity-100"}`}
          >
            {/* Image Preview */}
            <div className="aspect-square relative overflow-hidden bg-bg-primary">
              <img src={img.url} alt={img.caption} className="w-full h-full object-cover" />
              {!img.visible && (
                <div className="absolute inset-0 bg-bg-primary/60 backdrop-blur-[1px] flex items-center justify-center">
                  <div className="px-3 py-1 bg-bg-card border border-text-muted rounded-full text-[10px] text-text-muted uppercase tracking-widest font-bold">
                    Masquée
                  </div>
                </div>
              )}
              {isReordering && (
                <div className="absolute top-2 left-2 p-1.5 bg-gold text-bg-primary rounded-sm shadow-xl">
                  <GripVertical className="w-4 h-4" />
                </div>
              )}
            </div>

            {/* Info & Actions */}
            <div className="p-4 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-3">
                <span className={`text-[10px] uppercase tracking-widest font-bold ${img.visible ? "text-green-400" : "text-text-muted"}`}>
                  {img.visible ? "Visible" : "Masquée"}
                </span>
                <span className="text-[10px] text-text-muted font-mono">{img.date}</span>
              </div>
              <h4 className="text-text-primary text-sm font-serif italic mb-4 line-clamp-1">
                {img.caption || "Sans légende"}
              </h4>
              
              <div className="mt-auto pt-4 border-t border-border-subtle flex justify-between items-center">
                <div className="flex gap-2">
                  <button
                    onClick={() => openModal(img)}
                    className="p-2 text-text-muted hover:text-gold hover:bg-gold/5 transition-all rounded-sm"
                    title="Modifier"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => toggleVisibility("image", img.id)}
                    className={`p-2 transition-all rounded-sm ${img.visible ? "text-text-muted hover:text-white" : "text-gold hover:bg-gold/5"}`}
                    title={img.visible ? "Masquer" : "Afficher"}
                  >
                    {img.visible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <button
                  onClick={() => {
                    setItemToDeleteId(img.id);
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
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-bg-primary/90 backdrop-blur-md">
          <div className="bg-bg-card border border-border-subtle w-full max-w-xl rounded-sm shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between p-6 border-b border-border-subtle">
              <h3 className="text-xl font-serif text-text-primary italic">
                {editingImage ? "Modifier l'image" : "Ajouter une image"}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-text-muted hover:text-white transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-8 overflow-y-auto space-y-6">
              {/* Preview */}
              <div className="aspect-video w-full bg-bg-primary border border-border-subtle rounded-sm overflow-hidden relative flex items-center justify-center text-text-muted">
                {url ? (
                  <img src={url} alt="Aperçu" className="w-full h-full object-contain" />
                ) : (
                  <div className="flex flex-col items-center gap-3">
                    <ImageIcon className="w-10 h-10 opacity-20" />
                    <span className="text-xs uppercase tracking-widest">Aperçu de l'image</span>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-text-secondary text-[10px] uppercase tracking-widest font-bold mb-2">Source de l'image</label>
                  <div className="flex flex-col gap-4">
                    {/* File Upload Button */}
                    <div className="relative group">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;

                          const MAX_WIDTH = 1200;
                          const QUALITY = 0.75;

                          const img = new Image();
                          const objectUrl = URL.createObjectURL(file);
                          img.onload = () => {
                            const canvas = document.createElement('canvas');
                            let w = img.width;
                            let h = img.height;
                            if (w > MAX_WIDTH) {
                              h = Math.round((h * MAX_WIDTH) / w);
                              w = MAX_WIDTH;
                            }
                            canvas.width = w;
                            canvas.height = h;
                            canvas.getContext('2d')!.drawImage(img, 0, 0, w, h);
                            const compressed = canvas.toDataURL('image/jpeg', QUALITY);
                            setUrl(compressed);
                            URL.revokeObjectURL(objectUrl);
                          };
                          img.src = objectUrl;
                        }}
                        className="absolute inset-0 opacity-0 cursor-pointer z-10"
                      />
                      <div className="w-full bg-bg-primary border border-dashed border-border-subtle group-hover:border-gold/50 transition-colors rounded-sm py-8 flex flex-col items-center justify-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
                          <Plus className="w-5 h-5 text-gold" />
                        </div>
                        <span className="text-xs text-text-secondary uppercase tracking-widest font-bold">Sélectionner un fichier local</span>
                        <p className="text-[10px] text-text-muted">JPG, PNG ou WEBP (max 2Mo recommandé)</p>
                      </div>
                    </div>

                    {/* Fallback URL (Optional but kept for flexibility) */}
                    <div className="relative">
                      <div className="flex items-center gap-4 mb-2">
                        <div className="h-px flex-1 bg-border-subtle" />
                        <span className="text-[9px] text-text-muted uppercase tracking-widest">Ou entrer une URL</span>
                        <div className="h-px flex-1 bg-border-subtle" />
                      </div>
                      <input
                        type="text"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        className="w-full bg-bg-primary border border-border-subtle rounded-sm px-4 py-3 text-text-primary focus:outline-none focus:border-gold/50 transition-colors text-sm"
                        placeholder="https://..."
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-text-secondary text-[10px] uppercase tracking-widest font-bold mb-2">Légende (optionnelle)</label>
                  <input
                    type="text"
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    className="w-full bg-bg-primary border border-border-subtle rounded-sm px-4 py-3 text-text-primary focus:outline-none focus:border-gold/50 transition-colors text-sm"
                    placeholder="Webinaire Mai 2026..."
                  />
                </div>

                <div>
                  <label className="block text-text-secondary text-[10px] uppercase tracking-widest font-bold mb-2">Catégorie</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-bg-primary border border-border-subtle rounded-sm px-4 py-3 text-text-primary focus:outline-none focus:border-gold/50 transition-colors text-sm"
                  >
                    {CATEGORIES.filter(c => c !== "Tous").map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-text-secondary text-[10px] uppercase tracking-widest font-bold mb-2">Date</label>
                    <div className="relative">
                      <CalendarIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                      <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full bg-bg-primary border border-border-subtle rounded-sm pl-12 pr-4 py-3 text-text-primary focus:outline-none focus:border-gold/50 transition-colors text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-text-secondary text-[10px] uppercase tracking-widest font-bold mb-2">Statut</label>
                    <button
                      onClick={() => setVisible(!visible)}
                      className={`w-full h-[46px] rounded-sm flex items-center justify-between px-4 transition-all border ${
                        visible ? "border-green-500/30 bg-green-500/5 text-green-400" : "border-border-subtle text-text-muted"
                      }`}
                    >
                      <span className="text-xs uppercase tracking-widest font-bold">{visible ? "Visible" : "Masquée"}</span>
                      {visible ? <Check className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
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
                disabled={!url}
                className="px-8 py-3 bg-gold-gradient text-bg-primary rounded-sm text-xs font-bold uppercase tracking-widest hover:shadow-[0_0_15px_rgba(184,115,51,0.3)] transition-all disabled:opacity-30"
              >
                {editingImage ? "Mettre à jour" : "Enregistrer"}
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
              Êtes-vous sûr de vouloir supprimer cette actualité ? Cette action est irréversible et l'image sera retirée du site.
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
                  if (itemToDeleteId) deleteImage(itemToDeleteId);
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

