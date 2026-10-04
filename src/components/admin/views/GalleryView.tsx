import React, { useState } from 'react';
import { Image, Plus, Trash2, Star, Eye, X, Filter } from 'lucide-react';
import { useDatabase } from '../../../context/DatabaseContext';
import type { GalleryImage } from '../../../types/database';

export const GalleryView: React.FC = () => {
  const { gallery, addGalleryImage, deleteGalleryImage, toggleFeaturedImage } = useDatabase();
  const [selectedCat, setSelectedCat] = useState<string>('ALL');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New Image Form
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<GalleryImage['category']>('Badminton');
  const [imageUrl, setImageUrl] = useState('');
  const [isFeatured, setIsFeatured] = useState(false);

  const categories: GalleryImage['category'][] = ['Badminton', 'Arena', 'Gym', 'Swimming Pool', 'Events', 'Club'];

  const filteredGallery = selectedCat === 'ALL'
    ? gallery
    : gallery.filter(g => g.category.toLowerCase() === selectedCat.toLowerCase());

  const handleAddImage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !imageUrl) return;

    addGalleryImage({
      title,
      category,
      imageUrl,
      isFeatured,
      active: true
    });

    setIsModalOpen(false);
    setTitle('');
    setImageUrl('');
    setIsFeatured(false);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900/60 p-6 rounded-3xl border border-slate-800">
        <div>
          <h1 className="font-heading font-black text-2xl text-white">
            Gallery & Media Management
          </h1>
          <p className="text-slate-400 text-xs mt-0.5">
            Manage high resolution photography across badminton, arena, gym, pool, and banquets
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-all shadow-lg shadow-emerald-500/20 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Media Photo</span>
        </button>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => setSelectedCat('ALL')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
            selectedCat === 'ALL' 
              ? 'bg-emerald-500 text-slate-950' 
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          All Categories ({gallery.length})
        </button>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCat(cat)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
              selectedCat === cat 
                ? 'bg-emerald-500 text-slate-950' 
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredGallery.map(img => (
          <div
            key={img.id}
            className="rounded-3xl bg-slate-900/60 border border-slate-800 overflow-hidden flex flex-col justify-between group"
          >
            <div className="relative h-48 overflow-hidden bg-slate-950">
              <img
                src={img.imageUrl}
                alt={img.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
              
              <div className="absolute top-3 left-3">
                <span className="px-2.5 py-0.5 rounded-full bg-slate-950/80 backdrop-blur-md text-[10px] font-bold text-emerald-400 border border-slate-700">
                  {img.category}
                </span>
              </div>

              <div className="absolute top-3 right-3 flex items-center gap-1">
                <button
                  onClick={() => toggleFeaturedImage(img.id)}
                  className={`p-1.5 rounded-lg backdrop-blur-md transition-colors ${
                    img.isFeatured 
                      ? 'bg-amber-500 text-slate-950' 
                      : 'bg-slate-950/80 text-slate-400 hover:text-amber-400'
                  }`}
                  title="Toggle Featured"
                >
                  <Star className="w-3.5 h-3.5 fill-current" />
                </button>
                <button
                  onClick={() => {
                    if (confirm(`Delete photo "${img.title}"?`)) {
                      deleteGalleryImage(img.id);
                    }
                  }}
                  className="p-1.5 rounded-lg bg-slate-950/80 text-slate-400 hover:text-rose-400 transition-colors"
                  title="Delete Photo"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="p-4">
              <h4 className="font-heading font-bold text-sm text-white truncate">
                {img.title}
              </h4>
              <div className="text-[10px] text-slate-400 mt-1 flex items-center justify-between">
                <span>{img.isFeatured ? '★ Featured on public site' : 'Standard gallery'}</span>
                <span className="text-emerald-400 font-mono">Active</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Image Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative max-w-md w-full bg-slate-900 rounded-3xl border border-slate-800 p-6 sm:p-8 shadow-2xl">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="font-heading font-black text-xl text-white mb-1">
              Add Photo to Gallery
            </h3>
            <p className="text-slate-400 text-xs mb-6">
              New images will appear immediately in the public gallery
            </p>

            <form onSubmit={handleAddImage} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Photo Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder="e.g. Synthetic Badminton Court 1"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Category</label>
                <select
                  value={category}
                  onChange={e => setCategory(e.target.value as GalleryImage['category'])}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
                >
                  {categories.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Image URL</label>
                <input
                  type="url"
                  value={imageUrl}
                  onChange={e => setImageUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
                  required
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="featuredCheck"
                  checked={isFeatured}
                  onChange={e => setIsFeatured(e.target.checked)}
                  className="rounded bg-slate-950 border-slate-800 text-emerald-500"
                />
                <label htmlFor="featuredCheck" className="text-xs text-slate-300 cursor-pointer">
                  Feature this image on the public homepage gallery
                </label>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-xs font-semibold text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold"
                >
                  Add Photo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
