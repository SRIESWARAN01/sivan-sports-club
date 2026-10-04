import React, { useState } from 'react';
import { 
  Trophy, 
  LayoutDashboard, 
  Calendar, 
  Building2, 
  Users, 
  Dumbbell, 
  IndianRupee, 
  MessageSquare, 
  Sparkles, 
  Image, 
  Globe, 
  Tag, 
  Star, 
  FileText, 
  Bell, 
  ShieldCheck, 
  Settings, 
  Activity, 
  LogOut, 
  Menu, 
  X, 
  ExternalLink,
  Search,
  ChevronDown
} from 'lucide-react';
import { useDatabase } from '../../context/DatabaseContext';

// Import Views
import { DashboardOverview } from './views/DashboardOverview';
import { BookingsView } from './views/BookingsView';
import { FacilitiesView } from './views/FacilitiesView';
import { CustomersView } from './views/CustomersView';
import { MembershipsView } from './views/MembershipsView';
import { PaymentsView } from './views/PaymentsView';
import { EnquiriesView } from './views/EnquiriesView';
import { EventsView } from './views/EventsView';
import { GalleryView } from './views/GalleryView';
import { WebsiteCMSView } from './views/WebsiteCMSView';
import { PromotionsView } from './views/PromotionsView';
import { ReviewsView } from './views/ReviewsView';
import { ReportsView } from './views/ReportsView';
import { NotificationsView } from './views/NotificationsView';
import { AdminUsersView } from './views/AdminUsersView';
import { SettingsView } from './views/SettingsView';
import { ActivityLogsView } from './views/ActivityLogsView';
import type { Role } from '../../types/database';

interface AdminLayoutProps {
  onBackToPublic: () => void;
  onLogout: () => void;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ onBackToPublic, onLogout }) => {
  const { 
    currentAdminUser, 
    loginAs, 
    isDemoMode, 
    notifications, 
    enquiries 
  } = useDatabase();

  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);

  // Modals triggered from quick actions
  const [showNewBookingModal, setShowNewBookingModal] = useState(false);
  const [showNewEnquiryModal, setShowNewEnquiryModal] = useState(false);

  const userRole = currentAdminUser?.role || 'SUPER_ADMIN';
  const unreadNotifs = notifications.filter(n => !n.read).length;
  const newEnquiries = enquiries.filter(e => e.status === 'new').length;

  // Role permissions filter
  const allowedTabsByRole: Record<Role, string[]> = {
    SUPER_ADMIN: [
      'dashboard', 'bookings', 'facilities', 'customers', 'memberships',
      'payments', 'enquiries', 'events', 'gallery', 'cms',
      'promotions', 'reviews', 'reports', 'notifications', 'rbac', 'settings', 'logs'
    ],
    MANAGER: [
      'dashboard', 'bookings', 'facilities', 'customers', 'memberships',
      'enquiries', 'events', 'gallery', 'reviews', 'reports', 'notifications'
    ],
    STAFF: [
      'dashboard', 'bookings', 'customers', 'enquiries', 'events', 'notifications'
    ],
    ACCOUNTS: [
      'dashboard', 'payments', 'reports', 'notifications'
    ]
  };

  const currentAllowedTabs = allowedTabsByRole[userRole] || allowedTabsByRole.SUPER_ADMIN;

  const allNavItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'bookings', label: 'Bookings', icon: Calendar },
    { id: 'facilities', label: 'Facilities', icon: Building2 },
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'memberships', label: 'Gym Members', icon: Dumbbell },
    { id: 'payments', label: 'Payments', icon: IndianRupee },
    { id: 'enquiries', label: 'Enquiries', icon: MessageSquare, badge: newEnquiries > 0 ? newEnquiries : undefined },
    { id: 'events', label: 'Party Hall & Events', icon: Sparkles },
    { id: 'gallery', label: 'Gallery Manager', icon: Image },
    { id: 'cms', label: 'Website CMS', icon: Globe },
    { id: 'promotions', label: 'Promotions / Offers', icon: Tag },
    { id: 'reviews', label: 'Reviews Moderation', icon: Star },
    { id: 'reports', label: 'Reports & Export', icon: FileText },
    { id: 'notifications', label: 'Notifications', icon: Bell, badge: unreadNotifs > 0 ? unreadNotifs : undefined },
    { id: 'rbac', label: 'Admin Users & RBAC', icon: ShieldCheck },
    { id: 'settings', label: 'Settings & Data', icon: Settings },
    { id: 'logs', label: 'Activity Logs', icon: Activity },
  ];

  const visibleNavItems = allNavItems.filter(item => currentAllowedTabs.includes(item.id));

  const handleNavigateTab = (tabId: string) => {
    if (currentAllowedTabs.includes(tabId)) {
      setActiveTab(tabId);
    } else {
      setActiveTab('dashboard');
    }
    setMobileSidebarOpen(false);
  };

  const renderActiveView = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <DashboardOverview 
            onNavigateTab={handleNavigateTab}
            onOpenNewBookingModal={() => {
              setActiveTab('bookings');
            }}
            onOpenNewEnquiryModal={() => {
              setActiveTab('enquiries');
            }}
          />
        );
      case 'bookings':
        return <BookingsView />;
      case 'facilities':
        return <FacilitiesView />;
      case 'customers':
        return <CustomersView />;
      case 'memberships':
        return <MembershipsView />;
      case 'payments':
        return <PaymentsView />;
      case 'enquiries':
        return <EnquiriesView />;
      case 'events':
        return <EventsView />;
      case 'gallery':
        return <GalleryView />;
      case 'cms':
        return <WebsiteCMSView onPreviewPublic={onBackToPublic} />;
      case 'promotions':
        return <PromotionsView />;
      case 'reviews':
        return <ReviewsView />;
      case 'reports':
        return <ReportsView />;
      case 'notifications':
        return <NotificationsView onNavigateTab={handleNavigateTab} />;
      case 'rbac':
        return <AdminUsersView />;
      case 'settings':
        return <SettingsView />;
      case 'logs':
        return <ActivityLogsView />;
      default:
        return <DashboardOverview onNavigateTab={handleNavigateTab} onOpenNewBookingModal={() => setActiveTab('bookings')} onOpenNewEnquiryModal={() => setActiveTab('enquiries')} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      
      {/* Demo Mode Banner (Requirement #20) */}
      {isDemoMode && (
        <div className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-slate-950 font-bold px-4 py-1.5 text-xs text-center flex items-center justify-center gap-2 shadow-sm z-50">
          <span>DEMO MODE — Data shown here is for demonstration only.</span>
          <span className="text-[10px] bg-slate-950/20 px-2 py-0.5 rounded font-mono">
            Kalaivanar St, Cumbum
          </span>
        </div>
      )}

      <div className="flex-1 flex overflow-hidden">
        
        {/* Desktop Sidebar (Fixed) */}
        <aside className="hidden lg:flex w-64 bg-slate-950 border-r border-slate-800 flex-col justify-between shrink-0">
          
          <div className="p-4 space-y-6 flex-1 overflow-y-auto">
            {/* Brand Logo in Admin */}
            <div className="flex items-center gap-3 px-2 py-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-white shadow-md shadow-emerald-900/40">
                <Trophy className="w-5 h-5" />
              </div>
              <div>
                <div className="font-heading font-black text-sm tracking-wider text-white">
                  SIVAN SPORTS
                </div>
                <div className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest">
                  Admin Portal
                </div>
              </div>
            </div>

            {/* Navigation Menu */}
            <nav className="space-y-1">
              {visibleNavItems.map(item => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20 font-bold'
                        : 'text-slate-400 hover:text-white hover:bg-slate-900'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </div>

                    {item.badge !== undefined && (
                      <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                        isActive ? 'bg-slate-950 text-emerald-400' : 'bg-emerald-500/20 text-emerald-400'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Footer User Info */}
          <div className="p-4 border-t border-slate-800 bg-slate-950/80 space-y-3">
            <div className="flex items-center gap-3">
              <img
                src={currentAdminUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'}
                alt={currentAdminUser?.name}
                className="w-8 h-8 rounded-full object-cover border border-slate-700"
              />
              <div className="overflow-hidden">
                <div className="text-xs font-bold text-white truncate">{currentAdminUser?.name}</div>
                <div className="text-[10px] text-emerald-400 font-mono font-semibold uppercase">{userRole.replace('_', ' ')}</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={onBackToPublic}
                className="flex-1 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-semibold flex items-center justify-center gap-1.5 border border-slate-800 transition-colors"
                title="Return to Public Website"
              >
                <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
                <span>View Site</span>
              </button>

              <button
                onClick={onLogout}
                className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500 text-rose-400 hover:text-white transition-colors border border-rose-500/20"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>

        </aside>

        {/* Mobile / Tablet Drawer */}
        {mobileSidebarOpen && (
          <div className="fixed inset-0 z-50 bg-black/80 lg:hidden flex">
            <div className="w-72 bg-slate-950 h-full p-4 flex flex-col justify-between overflow-y-auto">
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="font-heading font-black text-white text-base">SIVAN SPORTS CLUB</div>
                  <button onClick={() => setMobileSidebarOpen(false)} className="p-1 text-slate-400 hover:text-white">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <nav className="space-y-1">
                  {visibleNavItems.map(item => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleNavigateTab(item.id)}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                          isActive
                            ? 'bg-emerald-500 text-slate-950 font-bold'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <Icon className="w-4 h-4" />
                          <span>{item.label}</span>
                        </div>
                      </button>
                    );
                  })}
                </nav>
              </div>

              <div className="pt-4 border-t border-slate-800 space-y-2">
                <button
                  onClick={() => {
                    setMobileSidebarOpen(false);
                    onBackToPublic();
                  }}
                  className="w-full py-2 rounded-xl bg-slate-900 text-slate-200 text-xs font-semibold flex items-center justify-center gap-2"
                >
                  <ExternalLink className="w-4 h-4 text-emerald-400" />
                  <span>View Public Website</span>
                </button>
                <button
                  onClick={onLogout}
                  className="w-full py-2 rounded-xl bg-rose-500/10 text-rose-400 text-xs font-semibold flex items-center justify-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
          
          {/* Top Bar */}
          <header className="sticky top-0 z-30 bg-slate-950/90 backdrop-blur-md border-b border-slate-800 px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4">
            
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMobileSidebarOpen(true)}
                className="p-2 rounded-xl bg-slate-900 text-slate-400 hover:text-white lg:hidden border border-slate-800"
              >
                <Menu className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span className="text-white font-bold capitalize">{activeTab.replace('_', ' ')}</span>
                <span>/</span>
                <span>Cumbum Campus</span>
              </div>
            </div>

            {/* Top Right Controls */}
            <div className="flex items-center gap-3">
              
              {/* Role Switcher Simulator */}
              <div className="relative">
                <button
                  onClick={() => setRoleMenuOpen(!roleMenuOpen)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs text-slate-300 font-semibold"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="hidden sm:inline">Role:</span>
                  <span className="text-emerald-400 uppercase font-mono">{userRole.replace('_', ' ')}</span>
                  <ChevronDown className="w-3 h-3 text-slate-500" />
                </button>

                {roleMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-1 z-50 animate-in fade-in zoom-in-95 duration-150">
                    {(['SUPER_ADMIN', 'MANAGER', 'STAFF', 'ACCOUNTS'] as Role[]).map(r => (
                      <button
                        key={r}
                        onClick={() => {
                          loginAs(r);
                          setRoleMenuOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between ${
                          userRole === r ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-300 hover:bg-slate-800'
                        }`}
                      >
                        <span>{r.replace('_', ' ')}</span>
                        {userRole === r && <span className="w-1.5 h-1.5 rounded-full bg-slate-950" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Notifications Bell */}
              <button
                onClick={() => setActiveTab('notifications')}
                className="relative p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 transition-colors"
                title="Notifications"
              >
                <Bell className="w-4 h-4" />
                {unreadNotifs > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 text-slate-950 font-mono font-bold text-[9px] flex items-center justify-center shadow">
                    {unreadNotifs}
                  </span>
                )}
              </button>

              {/* Return to Public Website */}
              <button
                onClick={onBackToPublic}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500 text-emerald-400 hover:text-slate-950 border border-emerald-500/30 text-xs font-bold transition-all"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>View Public Site</span>
              </button>

            </div>

          </header>

          {/* Dynamic Tab View Body */}
          <main className="p-4 sm:p-8 max-w-7xl w-full mx-auto">
            {renderActiveView()}
          </main>

        </div>

      </div>

    </div>
  );
};
