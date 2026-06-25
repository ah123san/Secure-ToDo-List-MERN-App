import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function LandingPage() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center w-full min-h-[calc(100vh-4rem)] pb-20 bg-zinc-950 font-sans">
      
      {/* ----------------- 1. HERO SECTION ----------------- */}
      <div className="flex flex-col items-center justify-center min-h-[85vh] px-4 sm:px-6 lg:px-8 text-center w-full relative overflow-hidden">
        {/* ✅ FIX: w-[800px] aur h-[800px] ko w-200 h-200 kar diya gaya hai */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-200 bg-emerald-900/20 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in-up relative z-10">
          
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-zinc-900 border border-zinc-800 shadow-sm mb-4">
            <span className="flex w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse mr-3"></span>
            <span className="text-sm font-bold text-zinc-300 tracking-wide">Enterprise-Grade MERN Application</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white drop-shadow-2xl leading-tight">
            {t('welcome')} <br/>
            {/* ✅ FIX: bg-gradient-to-r ko bg-linear-to-r kar diya gaya hai */}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-400 to-cyan-500">
              Task Management
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-lg md:text-xl text-zinc-400 leading-relaxed font-medium">
            Not just another Todo app. This is a fully scaled SaaS architecture engineered with strict MVC patterns, Bank-Grade Security (RBAC), and an automated Paywall engine.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 pt-8">
            <Link 
              to="/register" 
              className="px-10 py-4 w-full sm:w-auto rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-lg shadow-[0_0_30px_rgba(16,185,129,0.3)] hover:shadow-[0_0_45px_rgba(16,185,129,0.5)] transition-all duration-300 transform hover:-translate-y-1"
            >
              {t('getStarted')} Free
            </Link>
            <a 
              href="#architecture" 
              className="px-10 py-4 w-full sm:w-auto rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-200 font-bold text-lg border border-zinc-700 hover:border-zinc-500 transition-all duration-300"
            >
              Explore Architecture
            </a>
          </div>
        </div>
      </div>

      {/* ----------------- 2. HOW IT WORKS (THE WORKFLOW) ----------------- */}
      <div className="w-full bg-zinc-900/50 border-y border-zinc-800 py-16 mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-sm font-bold text-emerald-500 tracking-widest uppercase mb-2">The SaaS Workflow</h2>
            <h3 className="text-3xl font-bold text-white">How TaskPro Operates</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            <div className="p-6">
              <div className="w-16 h-16 mx-auto rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-2xl mb-4 text-emerald-400 font-bold">1</div>
              <h4 className="text-white font-bold mb-2">Secure Registration</h4>
              <p className="text-zinc-400 text-sm">Users create accounts securely. Passwords are hashed using bcrypt before hitting the database.</p>
            </div>
            <div className="p-6">
              <div className="w-16 h-16 mx-auto rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-2xl mb-4 text-emerald-400 font-bold">2</div>
              <h4 className="text-white font-bold mb-2">Workspace Creation</h4>
              <p className="text-zinc-400 text-sm">Every user gets an isolated dashboard. Data is fetched using secure JSON Web Tokens (JWT).</p>
            </div>
            <div className="p-6">
              <div className="w-16 h-16 mx-auto rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-2xl mb-4 text-emerald-400 font-bold">3</div>
              <h4 className="text-white font-bold mb-2">Hit The Paywall</h4>
              <p className="text-zinc-400 text-sm">Free users are capped at 5 tasks. The backend automatically blocks the 6th task via API.</p>
            </div>
            <div className="p-6">
              <div className="w-16 h-16 mx-auto rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-2xl mb-4 text-emerald-400 font-bold">4</div>
              <h4 className="text-white font-bold mb-2">Admin Control</h4>
              <p className="text-zinc-400 text-sm">Administrators monitor the entire database through a secret, password-protected control panel.</p>
            </div>
          </div>
        </div>
      </div>

      {/* ----------------- 3. CORE ARCHITECTURE SECTION ----------------- */}
      <div id="architecture" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">Built for Scale & Performance</h2>
          <p className="text-zinc-400 max-w-2xl mx-auto text-lg">No spaghetti code. Just pure, clean, and modular software engineering practices designed for commercial readiness.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="p-8 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-emerald-500/50 transition-all duration-300 group">
            <div className="w-14 h-14 rounded-xl bg-zinc-950 flex items-center justify-center text-3xl mb-6 border border-zinc-800 group-hover:scale-110 transition-transform">🔒</div>
            <h3 className="text-xl font-bold text-white mb-3">Role-Based Access (RBAC)</h3>
            <p className="text-zinc-400 leading-relaxed">Advanced security routing. Free users, Premium users, and Administrators have strictly distinct privileges and API access levels.</p>
          </div>
          
          <div className="p-8 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-emerald-500/50 transition-all duration-300 group">
            <div className="w-14 h-14 rounded-xl bg-zinc-950 flex items-center justify-center text-3xl mb-6 border border-zinc-800 group-hover:scale-110 transition-transform">⚡</div>
            <h3 className="text-xl font-bold text-white mb-3">Strict MVC Pattern</h3>
            <p className="text-zinc-400 leading-relaxed">Complete separation of concerns. Database Models, User Views, and Backend Controllers are fully isolated for flawless scaling.</p>
          </div>

          <div className="p-8 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-emerald-500/50 transition-all duration-300 group">
            <div className="w-14 h-14 rounded-xl bg-zinc-950 flex items-center justify-center text-3xl mb-6 border border-zinc-800 group-hover:scale-110 transition-transform">💰</div>
            <h3 className="text-xl font-bold text-white mb-3">SaaS Monetization Logic</h3>
            <p className="text-zinc-400 leading-relaxed">Built-in business model. Backend algorithms calculate task usage and seamlessly trigger front-end upgrade modals.</p>
          </div>

          <div className="p-8 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-emerald-500/50 transition-all duration-300 group">
            <div className="w-14 h-14 rounded-xl bg-zinc-950 flex items-center justify-center text-3xl mb-6 border border-zinc-800 group-hover:scale-110 transition-transform">🌍</div>
            <h3 className="text-xl font-bold text-white mb-3">Global i18n Support</h3>
            <p className="text-zinc-400 leading-relaxed">Instant translation engine. Switch between English and Urdu with automatic Right-to-Left (RTL) layout shifting.</p>
          </div>

          <div className="p-8 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-emerald-500/50 transition-all duration-300 group">
            <div className="w-14 h-14 rounded-xl bg-zinc-950 flex items-center justify-center text-3xl mb-6 border border-zinc-800 group-hover:scale-110 transition-transform">🛡️</div>
            <h3 className="text-xl font-bold text-white mb-3">Creator Authentication</h3>
            <p className="text-zinc-400 leading-relaxed">A secondary layer of security. The Admin panel is locked behind a custom protocol question to prevent unauthorized database access.</p>
          </div>

          <div className="p-8 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-emerald-500/50 transition-all duration-300 group">
            <div className="w-14 h-14 rounded-xl bg-zinc-950 flex items-center justify-center text-3xl mb-6 border border-zinc-800 group-hover:scale-110 transition-transform">🎨</div>
            <h3 className="text-xl font-bold text-white mb-3">Dark Metallic UI</h3>
            <p className="text-zinc-400 leading-relaxed">A premium, highly responsive user interface crafted with Tailwind CSS, featuring subtle animations and backdrop blurs.</p>
          </div>
        </div>
      </div>

      {/* ----------------- 4. TECH STACK STRIP ----------------- */}
      <div className="w-full border-y border-zinc-800 py-10 mb-20 bg-zinc-950">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <p className="text-zinc-500 font-bold tracking-widest text-sm uppercase mb-6">Powered by Industry Standards</p>
          <div className="flex flex-wrap justify-center gap-6 md:gap-12 text-zinc-400 font-bold text-lg">
            <span>MongoDB</span>
            <span className="text-zinc-700">•</span>
            <span>Express.js</span>
            <span className="text-zinc-700">•</span>
            <span>React.js</span>
            <span className="text-zinc-700">•</span>
            <span>Node.js</span>
            <span className="text-zinc-700">•</span>
            <span>Tailwind CSS</span>
            <span className="text-zinc-700">•</span>
            <span>JWT Auth</span>
          </div>
        </div>
      </div>

      {/* ----------------- 5. DEVELOPER PROFILE SECTION ----------------- */}
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 mb-10">
        {/* ✅ FIX: bg-gradient-to-br ko bg-linear-to-br kar diya gaya hai */}
        <div className="relative p-px rounded-3xl bg-linear-to-br from-emerald-500/30 via-zinc-800 to-zinc-900 overflow-hidden">
          <div className="absolute inset-0 bg-zinc-900/50 backdrop-blur-3xl"></div>
          
          <div className="relative p-8 sm:p-12 rounded-3xl bg-zinc-900/90 flex flex-col md:flex-row items-center gap-10">
            
            <div className="w-36 h-36 shrink-0 rounded-full bg-zinc-950 border-4 border-emerald-500/30 shadow-[0_0_30px_rgba(16,185,129,0.15)] flex items-center justify-center text-5xl font-extrabold text-emerald-400">
              AH
            </div>
            
            <div className="text-center md:text-left flex-1">
              <h3 className="text-3xl font-extrabold text-white mb-2">Ahsan Hameed</h3>
              <p className="text-emerald-400 font-bold text-sm mb-5 uppercase tracking-widest">Lead Architect & Full Stack Engineer</p>
              
              <p className="text-zinc-300 text-base leading-relaxed mb-6 italic border-l-4 border-emerald-500 pl-4 py-1">
                "My philosophy in software engineering is simple: Build the foundation right the first time. This application is a demonstration of commercial-grade development, avoiding temporary shortcuts in favor of robust, scalable, and maintainable code."
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <button className="px-6 py-3 rounded-lg bg-emerald-600/10 text-emerald-400 font-bold border border-emerald-500/30 hover:bg-emerald-600/20 transition-all w-full sm:w-auto">
                  View Source Code
                </button>
                <div className="text-zinc-500 text-sm font-medium">
                  Air University • ADSCS Semester 3
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}