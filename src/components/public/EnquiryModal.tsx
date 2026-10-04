import React, { useState, useEffect } from 'react';
import { X, Calendar, CheckCircle2, Phone, Mail, User, Clock, MessageSquare, Sparkles } from 'lucide-react';
import { useDatabase } from '../../context/DatabaseContext';

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedFacility?: string;
}

export const EnquiryModal: React.FC<EnquiryModalProps> = ({ 
  isOpen, 
  onClose, 
  preselectedFacility 
}) => {
  const { addEnquiry } = useDatabase();

  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [facility, setFacility] = useState(preselectedFacility || 'Indoor Badminton Court');
  const [preferredDate, setPreferredDate] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (preselectedFacility) {
      setFacility(preselectedFacility);
    }
  }, [preselectedFacility]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('Please provide your name.');
      return;
    }

    if (!mobile.trim() || mobile.replace(/\D/g, '').length < 10) {
      setError('Please provide a valid 10-digit mobile number.');
      return;
    }

    // Submit to database
    addEnquiry({
      name: name.trim(),
      mobile: mobile.trim(),
      email: email.trim(),
      interestedFacility: facility,
      preferredDate: preferredDate || undefined,
      message: message.trim() || 'General inquiry regarding facility availability and packages.'
    });

    setIsSubmitted(true);
  };

  const handleResetAndClose = () => {
    setName('');
    setMobile('');
    setEmail('');
    setPreferredDate('');
    setMessage('');
    setIsSubmitted(false);
    setError('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div 
        className="relative max-w-xl w-full bg-slate-900 rounded-3xl border border-slate-800 shadow-2xl p-6 sm:p-8 my-8"
        onClick={e => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleResetAndClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          aria-label="Close Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-4 border border-emerald-500/30 animate-bounce">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            
            <h3 className="font-heading font-black text-2xl sm:text-3xl text-white">
              Enquiry Received!
            </h3>
            
            <p className="text-slate-300 text-sm max-w-md mx-auto leading-relaxed">
              Thank you! Your enquiry has been received. Our team will get in touch with you shortly on <span className="font-semibold text-emerald-400">{mobile}</span> regarding <span className="font-semibold text-white">{facility}</span>.
            </p>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 max-w-md mx-auto text-left text-xs text-slate-400 space-y-1">
              <div><strong className="text-slate-200">Campus:</strong> Kalaivanar Street, Near Thambis Theatre, Cumbum</div>
              <div><strong className="text-slate-200">Status:</strong> Logged directly into Admin Dashboard</div>
            </div>

            <div className="pt-4">
              <button
                onClick={handleResetAndClose}
                className="px-8 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm transition-all"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                Bookings & Enquiries
              </div>
              <h2 className="font-heading font-black text-2xl sm:text-3xl text-white">
                Book a Slot or Enquire
              </h2>
              <p className="text-slate-400 text-xs sm:text-sm mt-1">
                Tell us your preferred sport or celebration. Our team at Cumbum will connect promptly.
              </p>
            </div>

            {error && (
              <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-medium">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Name */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Your Full Name <span className="text-emerald-400">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="e.g. Arun Kumar"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-emerald-500"
                    required
                  />
                </div>
              </div>

              {/* Mobile & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Mobile Number <span className="text-emerald-400">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
                    <input
                      type="tel"
                      value={mobile}
                      onChange={e => setMobile(e.target.value)}
                      placeholder="e.g. 9842100000"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-emerald-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Email Address <span className="text-slate-500">(Optional)</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
                    <input
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="your.email@example.com"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>
              </div>

              {/* Facility & Preferred Date */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Interested In <span className="text-emerald-400">*</span>
                  </label>
                  <select
                    value={facility}
                    onChange={e => setFacility(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Indoor Badminton Court">Indoor Badminton Court</option>
                    <option value="Multi-Sport Arena">Multi-Sport Arena</option>
                    <option value="Gym & Fitness Center">Gym & Fitness Center</option>
                    <option value="Swimming Pool">Swimming Pool</option>
                    <option value="Party Hall & Event Space">Party Hall & Event Space</option>
                    <option value="General Enquiry">General Enquiry</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Preferred Date
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
                    <input
                      type="date"
                      value={preferredDate}
                      onChange={e => setPreferredDate(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Message / Requirements
                </label>
                <div className="relative">
                  <MessageSquare className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
                  <textarea
                    rows={3}
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    placeholder="Tell us about your timing preference, group size, or occasion..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm transition-all shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30"
                >
                  Send Enquiry
                </button>
              </div>

            </form>
          </div>
        )}

      </div>
    </div>
  );
};
