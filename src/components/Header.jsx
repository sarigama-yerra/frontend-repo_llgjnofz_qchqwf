import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { User, Settings, Moon, Sun, Sparkles } from 'lucide-react';

const tabs = [
  { to: '/', label: 'Home' },
  { to: '/reset', label: 'Mind Reset' },
  { to: '/games', label: 'Play & Relax' },
  { to: '/inspire', label: 'InspireHub' },
  { to: '/explore', label: 'Explore' },
  { to: '/sound', label: 'Sound Studio' },
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/extension', label: 'Extension' },
];

export default function Header({ reducedMotion, setReducedMotion, fontSize, setFontSize }) {
  return (
    <header className="sticky top-0 z-30 backdrop-blur bg-white/70 border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Sparkles className="text-[#1B9CFC]" />
          <span className="font-bold text-lg">MindSphere</span>
        </Link>
        <nav className="hidden md:flex items-center gap-2">
          {tabs.map(t => (
            <NavLink
              key={t.to}
              to={t.to}
              className={({ isActive }) => `px-3 py-2 rounded-xl text-sm transition-all ${isActive ? 'bg-[#F4F6F9] text-slate-900' : 'text-slate-600 hover:bg-[#F4F6F9]'}`}
            >
              {t.label}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <button aria-label="Toggle reduced motion" onClick={() => setReducedMotion(!reducedMotion)} className="px-3 py-2 rounded-xl bg-[#F4F6F9] hover:bg-slate-100 text-slate-700">
            {reducedMotion ? <Moon size={18} /> : <Sun size={18} />}
          </button>
          <div className="flex items-center gap-2 bg-[#F4F6F9] rounded-xl px-2 py-1" aria-label="Text size">
            <button onClick={() => setFontSize(s => Math.max(14, s - 2))} className="px-2 py-1 rounded-lg hover:bg-white">A-</button>
            <div className="text-sm text-slate-600">{fontSize}px</div>
            <button onClick={() => setFontSize(s => Math.min(22, s + 2))} className="px-2 py-1 rounded-lg hover:bg-white">A+</button>
          </div>
          <button aria-label="Settings" className="px-3 py-2 rounded-xl bg-[#F4F6F9] hover:bg-slate-100 text-slate-700"><Settings size={18} /></button>
          <button aria-label="Profile" className="ml-1 p-2 rounded-full bg-gradient-to-br from-[#1B9CFC] to-[#20C997] text-white shadow">
            <User size={18} />
          </button>
        </div>
      </div>
      <div className="md:hidden overflow-x-auto px-4 pb-3 flex gap-2">
        {tabs.map(t => (
          <NavLink key={t.to} to={t.to} className={({ isActive }) => `whitespace-nowrap px-3 py-2 rounded-xl text-sm ${isActive ? 'bg-[#F4F6F9] text-slate-900' : 'text-slate-600 bg-white'}`}>
            {t.label}
          </NavLink>
        ))}
      </div>
    </header>
  );
}
