import React from 'react';
import { Link } from 'react-router-dom';

export default function Pricing() {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-zinc-950 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center animate-in fade-in-up duration-500">
        
        <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Unlock Your True Productivity</h2>
        <p className="text-xl text-zinc-400 mb-16 max-w-2xl mx-auto">
          Choose the plan that fits your workflow. Upgrade to Premium for unrestricted access to all commercial-grade features.
        </p>
        
        <div className="flex flex-col lg:flex-row justify-center items-center gap-8 max-w-5xl mx-auto">
          
          {/* Free Tier Card */}
          <div className="w-full max-w-md p-8 rounded-2xl bg-zinc-900 border border-zinc-800 shadow-lg text-left transition-all hover:border-zinc-600">
            <h3 className="text-2xl font-bold text-white mb-2">Free Tier</h3>
            <p className="text-zinc-400 mb-6">Perfect for testing the platform.</p>
            <div className="text-4xl font-extrabold text-white mb-8">
              $0<span className="text-lg text-zinc-500 font-medium">/month</span>
            </div>
            <ul className="space-y-4 mb-8 text-zinc-300">
              <li className="flex items-center">✓ Up to 5 Tasks Limit</li>
              <li className="flex items-center">✓ Basic MERN Architecture</li>
              <li className="flex items-center text-zinc-600">✕ Pomodoro Focus Mode</li>
              <li className="flex items-center text-zinc-600">✕ Admin Control Panel</li>
            </ul>
            <Link to="/dashboard" className="block w-full py-3 px-4 rounded-xl text-center font-bold bg-zinc-800 text-zinc-300 hover:bg-zinc-700 transition-colors">
              Your Current Plan
            </Link>
          </div>

          {/* Premium Tier Card (Highlighted with Glowing Border) */}
          <div className="w-full max-w-md p-px rounded-2xl bg-linear-to-b from-emerald-500 to-cyan-500 shadow-[0_0_30px_rgba(16,185,129,0.2)] transform lg:-translate-y-4">
            <div className="h-full w-full p-8 rounded-xl bg-zinc-900 text-left">
              <div className="inline-block px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wide mb-4">
                Most Popular
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Premium Pro</h3>
              <p className="text-zinc-400 mb-6">For serious professionals & clients.</p>
              <div className="text-4xl font-extrabold text-white mb-8">
                $9.99<span className="text-lg text-zinc-500 font-medium">/month</span>
              </div>
              <ul className="space-y-4 mb-8 text-zinc-300">
                <li className="flex items-center">✓ <strong className="ml-2 text-white">Unlimited</strong> Tasks Creation</li>
                <li className="flex items-center">✓ Advanced RBAC Security</li>
                <li className="flex items-center">✓ Pomodoro Focus Mode</li>
                <li className="flex items-center">✓ Priority Technical Support</li>
              </ul>
              <button className="w-full py-3 px-4 rounded-xl text-center font-bold bg-emerald-600 text-white hover:bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all duration-300">
                Upgrade Securely
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}