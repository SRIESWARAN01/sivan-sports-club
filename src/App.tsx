import React, { useState, useEffect } from 'react';
import { DatabaseProvider, useDatabase } from './context/DatabaseContext';
import { PublicWebsite } from './components/public/PublicWebsite';
import { AdminLogin } from './components/admin/AdminLogin';
import { AdminLayout } from './components/admin/AdminLayout';
import { IntroAnimation } from './components/public/IntroAnimation';

const AppContent: React.FC = () => {
  const { currentAdminUser, logout } = useDatabase();
  const [currentView, setCurrentView] = useState<'public' | 'admin-login' | 'admin-dashboard'>('public');
  const [showIntro, setShowIntro] = useState<boolean>(() => {
    // Only show intro animation once per session, and only if not directly navigating to #admin
    if (window.location.hash.startsWith('#admin')) return false;
    return !sessionStorage.getItem('sivan_intro_shown');
  });

  // Listen to hash changes for easy deep linking (#admin or #login)
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash === '#admin') {
        if (currentAdminUser) {
          setCurrentView('admin-dashboard');
        } else {
          setCurrentView('admin-login');
        }
      } else if (hash === '#admin/login') {
        setCurrentView('admin-login');
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, [currentAdminUser]);

  const handleOpenAdmin = () => {
    if (currentAdminUser) {
      setCurrentView('admin-dashboard');
      window.location.hash = 'admin';
    } else {
      setCurrentView('admin-login');
      window.location.hash = 'admin/login';
    }
  };

  const handleBackToPublic = () => {
    setCurrentView('public');
    window.location.hash = '';
  };

  const handleLoginSuccess = () => {
    setCurrentView('admin-dashboard');
    window.location.hash = 'admin';
  };

  const handleLogout = () => {
    logout();
    setCurrentView('admin-login');
    window.location.hash = 'admin/login';
  };

  if (currentView === 'admin-login') {
    return (
      <AdminLogin
        onBackToPublic={handleBackToPublic}
        onLoginSuccess={handleLoginSuccess}
      />
    );
  }

  if (currentView === 'admin-dashboard') {
    return (
      <AdminLayout
        onBackToPublic={handleBackToPublic}
        onLogout={handleLogout}
      />
    );
  }

  return (
    <>
      {showIntro && (
        <IntroAnimation
          onComplete={() => {
            sessionStorage.setItem('sivan_intro_shown', 'true');
            setShowIntro(false);
          }}
        />
      )}
      <PublicWebsite onOpenAdmin={handleOpenAdmin} />
    </>
  );
};

export function App() {
  return (
    <DatabaseProvider>
      <AppContent />
    </DatabaseProvider>
  );
}

export default App;
