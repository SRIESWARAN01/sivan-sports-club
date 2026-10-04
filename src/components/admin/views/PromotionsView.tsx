import React, { useState } from 'react';
import { Tag, Plus, Power, Trash2, Calendar, Percent, X } from 'lucide-react';
import { useDatabase } from '../../../context/DatabaseContext';
import type { Promotion } from '../../../types/database';

export const PromotionsView: React.FC = () => {
  const { promotions, addPromotion, togglePromotionStatus, deletePromotion, facilities } = useDatabase();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New Promotion Form
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [discountType, setDiscountType] = useState<'percentage' | 'fixed'>('percentage');
  const [discountValue, setDiscountValue] = useState(15);
  const [applicableFacility, setApplicableFacility] = useState('All Facilities');
  const [couponCode, setCouponCode] = useState('');
  const [startDate, setStartDate] = useState('2026-10-01');
  const [endDate, setEndDate] = useState('2026-10-31');

  const handleCreatePromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !couponCode) return;

    addPromotion({
      name,
      description,
      discountType,
      discountValue: Number(discountValue),
      applicableFacility,
      startDate,
      endDate,
      couponCode: couponCode.toUpperCase(),
      status: 'active'
    });

    setIsModalOpen(false);
    setName('');
    setDescription('');
    setCouponCode('');
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900/60 p-6 rounded-3xl border border-slate-800">
        <div>
          <h1 className="font-heading font-black text-2xl text-white">
            Offers & Promotional Coupons
          </h1>
          <p className="text-slate-400 text-xs mt-0.5">
            Configure early bird court discounts, festival coupons, and inaugural membership passes
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-all shadow-lg shadow-emerald-500/20 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Promo</span>
        </button>
      </div>

      {/* Promotions Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {promotions.map(promo => (
          <div
            key={promo.id}
            className={`p-6 rounded-3xl bg-slate-900/60 border flex flex-col justify-between space-y-4 ${
              promo.status === 'active' ? 'border-slate-800' : 'border-rose-900/40 opacity-70'
            }`}
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  {promo.discountType === 'percentage' ? `${promo.discountValue}% OFF` : `Rs. ${promo.discountValue} OFF`}
                </span>

                <button
                  onClick={() => togglePromotionStatus(promo.id)}
                  className={`p-1.5 rounded-lg text-xs font-semibold ${
                    promo.status === 'active' 
                      ? 'bg-emerald-500/10 text-emerald-400' 
                      : 'bg-rose-500/10 text-rose-400'
                  }`}
                  title="Toggle Active"
                >
                  <Power className="w-3.5 h-3.5" />
                </button>
              </div>

              <h3 className="font-heading font-black text-lg text-white mb-1">
                {promo.name}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                {promo.description}
              </p>

              <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between mb-3">
                <span className="text-[10px] text-slate-500 font-mono">COUPON CODE</span>
                <span className="font-mono font-bold text-sm text-emerald-400 tracking-wider">
                  {promo.couponCode}
                </span>
              </div>

              <div className="text-[11px] text-slate-400 space-y-1">
                <div>Applies to: <strong className="text-slate-300">{promo.applicableFacility}</strong></div>
                <div>Valid: <span className="font-mono text-slate-400">{promo.startDate}</span> to <span className="font-mono text-slate-400">{promo.endDate}</span></div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
              <span className={`text-[10px] font-bold uppercase ${promo.status === 'active' ? 'text-emerald-400' : 'text-slate-500'}`}>
                {promo.status}
              </span>
              <button
                onClick={() => {
                  if (confirm(`Delete promotion ${promo.name}?`)) {
                    deletePromotion(promo.id);
                  }
                }}
                className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* New Promotion Modal */}
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
              Create Promotion / Coupon
            </h3>
            <p className="text-slate-400 text-xs mb-6">
              Create a discount coupon code for bookings or memberships
            </p>

            <form onSubmit={handleCreatePromo} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Offer Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="e.g. Diwali Court Fest"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Description</label>
                <input
                  type="text"
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  placeholder="e.g. 15% off on evening badminton slots"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Discount Type</label>
                  <select
                    value={discountType}
                    onChange={e => setDiscountType(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
                  >
                    <option value="percentage">Percentage (%)</option>
                    <option value="fixed">Flat Amount (Rs.)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Discount Value</label>
                  <input
                    type="number"
                    value={discountValue}
                    onChange={e => setDiscountValue(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs font-mono"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Coupon Code</label>
                  <input
                    type="text"
                    value={couponCode}
                    onChange={e => setCouponCode(e.target.value)}
                    placeholder="e.g. FESTIVAL15"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs font-mono font-bold uppercase"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Applicable Facility</label>
                  <select
                    value={applicableFacility}
                    onChange={e => setApplicableFacility(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
                  >
                    <option value="All Facilities">All Facilities</option>
                    {facilities.map(f => (
                      <option key={f.id} value={f.name}>{f.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Start Date</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={e => setStartDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">End Date</label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={e => setEndDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
                  />
                </div>
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
                  Save Promotion
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
