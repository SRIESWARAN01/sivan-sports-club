import React from 'react';
import { Star, Check, X, Trash2, ShieldCheck, StarOff } from 'lucide-react';
import { useDatabase } from '../../../context/DatabaseContext';

export const ReviewsView: React.FC = () => {
  const { reviews, updateReviewStatus, toggleFeatureReview } = useDatabase();

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900/60 p-6 rounded-3xl border border-slate-800">
        <div>
          <h1 className="font-heading font-black text-2xl text-white">
            Customer Reviews & Testimonials
          </h1>
          <p className="text-slate-400 text-xs mt-0.5">
            Only reviews approved by management are published to the public website
          </p>
        </div>

        <div className="text-xs text-slate-300 font-mono bg-slate-800 px-3 py-1.5 rounded-xl">
          {reviews.filter(r => r.status === 'approved').length} Published Reviews
        </div>
      </div>

      {/* Reviews Table */}
      <div className="rounded-3xl bg-slate-900/60 border border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/80 text-slate-400 border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Member Name</th>
                <th className="py-3 px-4">Facility</th>
                <th className="py-3 px-4">Rating</th>
                <th className="py-3 px-4">Review Text</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Featured</th>
                <th className="py-3 px-4 text-right">Moderation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {reviews.map(rev => (
                <tr key={rev.id} className="hover:bg-slate-800/30">
                  <td className="py-3 px-4 font-semibold text-white">
                    {rev.customerName}
                  </td>
                  <td className="py-3 px-4 text-slate-300">
                    {rev.facility}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-0.5 text-amber-400">
                      {Array.from({ length: rev.rating }).map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-slate-300 max-w-sm truncate italic">
                    "{rev.review}"
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                      rev.status === 'approved' 
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                        : rev.status === 'rejected'
                        ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                        : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                    }`}>
                      {rev.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => toggleFeatureReview(rev.id)}
                      className={`px-2 py-0.5 rounded-lg text-[10px] font-semibold border ${
                        rev.featured 
                          ? 'bg-amber-500/10 text-amber-400 border-amber-500/30' 
                          : 'bg-slate-950 text-slate-500 border-slate-800'
                      }`}
                    >
                      {rev.featured ? 'Featured' : 'Standard'}
                    </button>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      {rev.status !== 'approved' && (
                        <button
                          onClick={() => updateReviewStatus(rev.id, 'approved')}
                          className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500 hover:text-slate-950 transition-colors"
                          title="Approve & Publish"
                        >
                          <Check className="w-3.5 h-3.5" />
                        </button>
                      )}
                      {rev.status !== 'rejected' && (
                        <button
                          onClick={() => updateReviewStatus(rev.id, 'rejected')}
                          className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500 hover:text-white transition-colors"
                          title="Reject"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
