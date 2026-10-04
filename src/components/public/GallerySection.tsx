import React, { useState } from 'react';
import { useDatabase } from '../../context/DatabaseContext';
import { Eye, X } from 'lucide-react';
import type { GalleryImage } from '../../types/database';

export const GallerySection: React.FC = () => {
  const { gallery } = useDatabase();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activePhoto, setActivePhoto] = useState<GalleryImage | null>(null);

  const categories = ['All', 'Badminton', 'Arena', 'Gym', 'Swimming Pool', 'Events', 'Club'];

  const filteredImages = selectedCategory === 'All'
    ? gallery.filter(img => img.active)
    : gallery.filter(img => img.active && img.category.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <section id="gallery" className="py-24 bg-slate-900/60 relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold tracking-wider uppercase">
            Facility Gallery
          </div>
          <h2 className="font-heading font-black text-3xl sm:text-5xl text-white tracking-tight">
            See Sivan Sports Club in Action.
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            High-standard courts, modern equipment, refreshing pools, and welcoming spaces in Cumbum.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                selectedCategory === cat
                  ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20'
                  : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredImages.map((img) => (
            <div
              key={img.id}
              onClick={() => setActivePhoto(img)}
              className="relative h-72 rounded-3xl overflow-hidden border border-slate-800 bg-slate-950 group cursor-pointer"
            >
              <img
                src={img.imageUrl}
                alt={img.title}
                className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
                onError={(e) => {
                  if (img.category === 'Badminton') e.currentTarget.src = 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=1000&q=80';
                  else if (img.category === 'Swimming Pool') e.currentTarget.src = 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1000&q=80';
                  else if (img.category === 'Gym') e.currentTarget.src = 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1000&q=80';
                  else if (img.category === 'Club') e.currentTarget.src = 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1000&q=80';
                  else e.currentTarget.src = 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1000&q=80';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              <div className="absolute inset-0 p-6 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <span className="px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-slate-700 text-[11px] font-bold text-emerald-400">
                    {img.category}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-slate-900/80 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <Eye className="w-4 h-4" />
                  </div>
                </div>

                <div>
                  <h3 className="text-white font-heading font-bold text-base sm:text-lg drop-shadow-md">
                    {img.title}
                  </h3>
                  {img.isFeatured && (
                    <span className="text-[10px] text-amber-400 font-semibold tracking-wide uppercase">
                      Featured
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {activePhoto && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setActivePhoto(null)}
        >
          <div 
            className="relative max-w-4xl w-full bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setActivePhoto(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-950/80 text-slate-300 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
            <img
              src={activePhoto.imageUrl}
              alt={activePhoto.title}
              className="w-full max-h-[75vh] object-cover"
            />
            <div className="p-6 flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                  {activePhoto.category}
                </span>
                <h3 className="text-white font-heading font-bold text-xl mt-1">
                  {activePhoto.title}
                </h3>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
