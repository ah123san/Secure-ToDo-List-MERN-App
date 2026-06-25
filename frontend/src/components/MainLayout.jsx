import React from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';

export default function MainLayout() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const userInfo = localStorage.getItem('userInfo');
  const isLoggedIn = !!userInfo;

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ur' : 'en';
    i18n.changeLanguage(newLang);
    document.documentElement.dir = newLang === 'ur' ? 'rtl' : 'ltr';
  };

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    toast.success('Logged out successfully');
    navigate('/login', { replace: true });
  };

  return (
    <div className="min-h-screen bg-zinc-950 font-sans selection:bg-emerald-500/30">
      <nav className="sticky top-0 z-50 w-full bg-zinc-900/80 backdrop-blur-md border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            <div className="shrink-0">
              <Link to="/" className="text-2xl font-bold bg-linear-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                TaskPro
              </Link>
            </div>

            <div className="flex items-center gap-6">
              {/* ✅ FIX: Added 'capitalize' to make first letter uppercase (Home) */}
              <Link to="/" className="text-sm font-medium text-zinc-300 hover:text-white transition-colors capitalize">
                {t('home')}
              </Link>
              <Link to="/dashboard" className="text-sm font-medium text-zinc-300 hover:text-white transition-colors capitalize">
                {t('dashboard')}
              </Link>
              <Link to="/pricing" className="text-sm font-medium text-zinc-300 hover:text-white transition-colors capitalize">
                {t('pricing')}
              </Link>
              
              {/* Force Full Reload for Admin Panel */}
              <a href="/admin" className="text-sm font-medium text-zinc-300 hover:text-white transition-colors capitalize">
                {t('adminPanel')}
              </a>

              {isLoggedIn ? (
                <button onClick={handleLogout} className="text-sm font-bold text-red-500 hover:text-red-400 transition-colors capitalize">
                  {t('logout')}
                </button>
              ) : (
                <Link to="/login" className="text-sm font-medium text-zinc-300 hover:text-white transition-colors capitalize">
                  {t('login')}
                </Link>
              )}
              
              <button 
                onClick={toggleLanguage}
                className="flex items-center justify-center w-9 h-9 rounded-full bg-zinc-800 border border-zinc-700 hover:bg-zinc-700 hover:border-zinc-500 transition-all text-white"
                title="Switch Language"
              >
                🌍
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="w-full">
        <Outlet />
      </main>
    </div>
  );
}