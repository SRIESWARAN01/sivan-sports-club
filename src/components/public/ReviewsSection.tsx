import React from 'react';
import { useDatabase } from '../../context/DatabaseContext';
import { Star, Quote } from 'lucide-react';

export const ReviewsSection: React.FC = () => {
  const { reviews } = useDatabase();
  const approvedReviews = reviews.filter(r => r.status === 'approved');

  if (approvedReviews.length === 0) return null;

  return (
    <section className="py-24 bg-slate-950 relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold tracking-wider uppercase">
            Member Experiences
          </div>
          <h2 className="font-heading font-black text-3xl sm:text-5xl text-white tracking-tight">
            Voices of Cumbum Sports Community.
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            What our athletes, fitness members, and event hosts have to say about Sivan Sports Club.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {approvedReviews.map((rev) => (
            <div
              key={rev.id}
              className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800/80 flex flex-col justify-between hover:border-slate-700 transition-colors"
            >
              <div>
                {/* Rating stars */}
                <div className="flex items-center gap-1 mb-4 text-amber-400">
                  {Array.from({ length: rev.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>

                <Quote className="w-6 h-6 text-slate-700 mb-3" />

                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed italic mb-6">
                  "{rev.review}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800/80">
                <div className="font-heading font-bold text-white text-sm">
                  {rev.customerName}
                </div>
                <div className="text-[11px] text-emerald-400 font-medium">
                  {rev.facility}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
