import React, { useEffect, useMemo, useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Header from './components/Header'
import ActivityCard from './components/ActivityCard'
import PlayerOverlay from './components/PlayerOverlay'
import GameTile from './components/GameTile'
import QuoteCard from './components/QuoteCard'
import Mixer from './components/Mixer'
import ExtensionPopup from './components/ExtensionPopup'
import DashboardSummary from './components/DashboardSummary'

const PALETTE = { primary: '#1B9CFC', secondary: '#20C997', accent: '#FFA94D', bg: '#F4F6F9', surface: '#FFFFFF', muted: '#7A7F86' }

const ACTS = [
  { key: 'breath', title: 'Breath Sync', duration: 60, benefit: 'Calm', color: PALETTE.primary, type: 'breath', instruction: 'Inhale 4s, hold 2s, exhale 4s.' },
  { key: 'ground', title: 'Grounding', duration: 45, benefit: 'Calm', color: PALETTE.secondary, type: 'nature', instruction: 'Name 3 things you see, 2 you feel, 1 you hear.' },
  { key: 'nature', title: 'Nature Loop', duration: 60, benefit: 'Calm', color: '#34d399', type: 'nature', instruction: 'Watch the gentle particles drift.' },
  { key: 'reframe', title: 'One-Line Reframe', duration: 45, benefit: 'Focus', color: PALETTE.accent, type: 'nature', instruction: 'Write one helpful reframe in your notes.' },
  { key: 'focus', title: '60s Focus Game', duration: 60, benefit: 'Focus', color: '#0ea5e9', type: 'nature', instruction: 'Keep eyes on the moving dot.' },
  { key: 'doodle', title: 'Quick Doodle', duration: 30, benefit: 'Energy', color: '#f59e0b', type: 'nature', instruction: 'Scribble something fun for 30s.' },
]

function Section({ title, children, action }) {
  return (
    <section className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-slate-800">{title}</h2>
        {action}
      </div>
      {children}
    </section>
  );
}

function Home({ onOpenPlayer, tokens }) {
  const now = new Date();
  const hour = now.getHours();
  const recs = hour >= 18 ? ACTS.filter(a=>['breath','nature'].includes(a.key)) : ACTS.filter(a=>['focus','reframe'].includes(a.key));
  return (
    <div>
      <div className="bg-gradient-to-br from-[#1B9CFC] to-[#20C997] text-white">
        <section className="max-w-6xl mx-auto px-4 py-14">
          <h1 className="text-4xl font-extrabold mb-2">Reset your mind in 60 seconds.</h1>
          <p className="text-white/90 mb-6">Bright, calm, playful — take micro-breaks that actually help.</p>
          <div className="flex gap-3 flex-wrap">
            <button onClick={()=>onOpenPlayer(ACTS[0])} className="px-5 py-3 rounded-2xl bg-white text-slate-900 shadow">60s Reset — Start</button>
            <button onClick={()=>onOpenPlayer(ACTS[4])} className="px-5 py-3 rounded-2xl bg-[#FFA94D] text-white shadow">Play & Relax</button>
            <button onClick={()=>onOpenPlayer(ACTS[2])} className="px-5 py-3 rounded-2xl bg-[#20C997] text-white shadow">Sound Studio</button>
          </div>
          <div className="mt-6 text-sm">Tokens: <span className="font-semibold">{tokens}</span></div>
        </section>
      </div>

      <Section title="Recommended for you" action={<span className="text-sm text-slate-500" title="Why this was recommended">Why? You used Breath Sync last night — try Nature Loop now.</span>}>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {recs.map(a => (
            <ActivityCard key={a.key} title={a.title} duration={a.duration} benefit={a.benefit} color={a.color} onClick={()=>onOpenPlayer(a)} />
          ))}
        </div>
      </Section>
    </div>
  );
}

function ResetCatalog({ onOpenPlayer }) {
  return (
    <Section title="Mind Reset Zone">
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {ACTS.map((a) => (
          <ActivityCard key={a.key} title={a.title} duration={a.duration} benefit={a.benefit} color={a.color} onClick={()=>onOpenPlayer(a)} />
        ))}
      </div>
    </Section>
  )
}

function Games() {
  const [url, setUrl] = useState('');
  const games = [
    { title: 'Calm Puzzle', thumbnail: 'https://picsum.photos/seed/puzzle/400/240', url: 'https://play2048.co/' },
    { title: 'Zen Dots', thumbnail: 'https://picsum.photos/seed/dots/400/240', url: 'https://chromedino.com/' },
    { title: 'Gentle Tetris', thumbnail: 'https://picsum.photos/seed/tetris/400/240', url: 'https://tetris.com/play-tetris' },
  ];
  return (
    <Section title="Play & Relax" action={<div className="text-sm text-slate-600">Light games to enter flow</div>}>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {games.map(g => <GameTile key={g.title} {...g} onPlay={setUrl} />)}
      </div>
      {url && (
        <div className="mt-6 bg-white rounded-2xl p-3 shadow-sm">
          <div className="text-sm text-slate-600 mb-2">Embedded game</div>
          <iframe title="embedded game" src={url} className="w-full h-[500px] rounded-xl" />
        </div>
      )}
    </Section>
  );
}

function InspireHub() {
  const items = [
    { text: 'Tiny steps still move you forward.', tag: 'Motivational' },
    { text: 'Like the ocean, thoughts ebb and flow.', tag: 'Calm' },
    { text: 'Smile at the next small thing you see.', tag: 'Funny' },
  ];
  return (
    <Section title="InspireHub" action={<select className="bg-[#F4F6F9] px-2 py-1 rounded-lg text-sm"><option>All</option><option>Calm</option><option>Motivational</option><option>Funny</option><option>Confident</option></select>}>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {items.map((q, i) => <QuoteCard key={i} {...q} onReact={(r)=>alert(`${r}! Saved.`)} />)}
      </div>
    </Section>
  );
}

function Explore() {
  const cats = [
    { name: 'Psychology', tip: 'Name your feeling to tame it.' },
    { name: 'Fitness', tip: '30s wall-sit to boost energy.' },
    { name: 'Sleep', tip: 'Dim lights 1 hour before bed.' },
    { name: 'Productivity', tip: 'Turn off notifications for 25 minutes.' },
  ];
  return (
    <Section title="Explore Micro-Lessons">
      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
        {cats.map(c => (
          <div key={c.name} className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="font-semibold text-slate-800 mb-1">{c.name}</div>
            <div className="text-slate-600 text-sm mb-3">{c.tip}</div>
            <button className="px-3 py-1.5 rounded-xl bg-[#20C997] text-white text-sm">Do today</button>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Dashboard({ tokens, streak }) {
  return (
    <Section title="Your Dashboard">
      <DashboardSummary tokens={tokens} streak={streak} />
    </Section>
  );
}

function ExtensionMock({ onOpenPlayer }) {
  const [open, setOpen] = useState(true);
  return (
    <Section title="Extension Popup Mock">
      <ExtensionPopup open={open} onStart={() => { setOpen(false); onOpenPlayer(ACTS[0]); }} onSnooze={() => setOpen(false)} />
    </Section>
  );
}

export default function App() {
  const [tokens, setTokens] = useState(() => Number(localStorage.getItem('tokens')||0));
  const [streak, setStreak] = useState(() => Number(localStorage.getItem('streak')||0));
  const [reducedMotion, setReducedMotion] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  const [overlay, setOverlay] = useState({ open: false, activity: null });

  useEffect(() => { localStorage.setItem('tokens', String(tokens)); }, [tokens]);
  useEffect(() => { localStorage.setItem('streak', String(streak)); }, [streak]);

  const onOpenPlayer = (activity) => setOverlay({ open: true, activity });
  const onClose = () => setOverlay({ open: false, activity: null });
  const onComplete = () => {
    setTokens(t => t + 10);
    // Simple streak logic: increment if first completion of the day (mock)
    setStreak(s => Math.max(1, s));
    onClose();
    alert('Nice — token earned +10. Ready to go?');
  };

  useEffect(() => { document.documentElement.style.fontSize = fontSize + 'px'; }, [fontSize]);

  return (
    <div className="min-h-screen bg-[#F4F6F9] text-slate-800">
      <Header reducedMotion={reducedMotion} setReducedMotion={setReducedMotion} fontSize={fontSize} setFontSize={setFontSize} />

      <Routes>
        <Route index element={<Home onOpenPlayer={onOpenPlayer} tokens={tokens} />} />
        <Route path="/reset" element={<ResetCatalog onOpenPlayer={onOpenPlayer} />} />
        <Route path="/games" element={<Games />} />
        <Route path="/inspire" element={<InspireHub />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/sound" element={<Section title="Sound Studio"><Mixer reducedMotion={reducedMotion} /></Section>} />
        <Route path="/dashboard" element={<Dashboard tokens={tokens} streak={streak} />} />
        <Route path="/extension" element={<ExtensionMock onOpenPlayer={onOpenPlayer} />} />
      </Routes>

      <PlayerOverlay open={overlay.open} onClose={onClose} activity={overlay.activity} onComplete={onComplete} reducedMotion={reducedMotion} />
    </div>
  )
}
