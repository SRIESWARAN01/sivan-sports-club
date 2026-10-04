import React from 'react';
import { Bell, CheckCheck, Clock, Calendar, MessageSquare, IndianRupee, Sparkles, Check } from 'lucide-react';
import { useDatabase } from '../../../context/DatabaseContext';

interface NotificationsViewProps {
  onNavigateTab: (tabId: string) => void;
}

export const NotificationsView: React.FC<NotificationsViewProps> = ({ onNavigateTab }) => {
  const { notifications, markNotificationRead, markAllNotificationsRead } = useDatabase();

  const getIcon = (type: string) => {
    switch (type) {
      case 'booking': return Calendar;
      case 'enquiry': return MessageSquare;
      case 'payment': return IndianRupee;
      case 'event': return Sparkles;
      default: return Bell;
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900/60 p-6 rounded-3xl border border-slate-800">
        <div>
          <h1 className="font-heading font-black text-2xl text-white">
            Club Notification Center
          </h1>
          <p className="text-slate-400 text-xs mt-0.5">
            Real-time alerts for online bookings, enquiries, payments and memberships
          </p>
        </div>

        <button
          onClick={markAllNotificationsRead}
          className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 flex items-center gap-2 transition-colors"
        >
          <CheckCheck className="w-4 h-4 text-emerald-400" />
          <span>Mark All as Read</span>
        </button>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {notifications.length === 0 ? (
          <div className="p-12 text-center text-slate-500 text-sm bg-slate-900/40 rounded-3xl border border-slate-800">
            No notifications at the moment. All caught up!
          </div>
        ) : (
          notifications.map(notif => {
            const Icon = getIcon(notif.type);
            return (
              <div
                key={notif.id}
                className={`p-5 rounded-2xl border flex items-start justify-between gap-4 transition-all ${
                  notif.read 
                    ? 'bg-slate-900/40 border-slate-800/80 opacity-75' 
                    : 'bg-slate-900/90 border-emerald-500/40 shadow-lg shadow-emerald-950/20'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-2.5 rounded-xl mt-0.5 ${
                    notif.read ? 'bg-slate-800 text-slate-400' : 'bg-emerald-500/10 text-emerald-400'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-sm text-white">
                      {notif.title}
                    </h4>
                    <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                      {notif.message}
                    </p>
                    <div className="text-[10px] text-slate-500 mt-2 font-mono flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{notif.time}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {!notif.read && (
                    <button
                      onClick={() => markNotificationRead(notif.id)}
                      className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
                      title="Mark Read"
                    >
                      <Check className="w-3.5 h-3.5" />
                    </button>
                  )}
                  {notif.linkTab && (
                    <button
                      onClick={() => onNavigateTab(notif.linkTab!)}
                      className="px-3 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500 hover:text-slate-950 text-xs font-semibold transition-colors"
                    >
                      View
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

    </div>
  );
};
