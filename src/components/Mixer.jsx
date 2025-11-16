import React, { useEffect, useRef, useState } from 'react';

const tracks = [
  { key: 'rain', label: 'Rain' },
  { key: 'ocean', label: 'Ocean' },
  { key: 'forest', label: 'Forest' },
  { key: 'white', label: 'White Noise' },
  { key: 'piano', label: 'Soft Piano' },
];

const voiceLines = {
  male: [
    'Breathe in... and out. You are safe.',
    'Let your shoulders drop. Release the day.',
  ],
  female: [
    'Inhale calm, exhale tension.',
    'Soft focus. You have time.',
  ]
};

export default function Mixer({ reducedMotion }) {
  const [volumes, setVolumes] = useState({ rain: 0.6, ocean: 0, forest: 0.4, white: 0, piano: 0.7 });
  const [playing, setPlaying] = useState(false);
  const [preset, setPreset] = useState('Focus Flow');
  const [voice, setVoice] = useState({ on: false, type: 'female', idx: 0 });
  const audioRefs = useRef({});

  useEffect(() => {
    // Initialize audio elements with small built-in loops (silence if asset missing). We'll synthesize with WebAudio if not provided.
    tracks.forEach(t => {
      if (!audioRefs.current[t.key]) {
        const audio = new Audio(`/${t.key}.mp3`);
        audio.loop = true;
        audio.volume = volumes[t.key] ?? 0;
        audioRefs.current[t.key] = audio;
      } else {
        audioRefs.current[t.key].volume = volumes[t.key] ?? 0;
      }
    });
  }, [volumes]);

  const applyPreset = (name) => {
    if (name === 'Morning Calm') setVolumes({ rain: 0.3, ocean: 0.2, forest: 0.5, white: 0, piano: 0.2 });
    if (name === 'Focus Flow') setVolumes({ rain: 0.4, ocean: 0, forest: 0.2, white: 0, piano: 0.8 });
    if (name === 'Evening Wind-down') setVolumes({ rain: 0.6, ocean: 0.2, forest: 0.3, white: 0, piano: 0.3 });
    setPreset(name);
  };

  const toggle = () => {
    setPlaying(p => {
      const np = !p;
      tracks.forEach(t => {
        const a = audioRefs.current[t.key];
        if (!a) return;
        if (np) a.play().catch(() => {}); else a.pause();
      });
      return np;
    });
  };

  const handleVoice = () => {
    setVoice(v => ({ ...v, on: !v.on }));
    if (!voice.on) {
      const line = voiceLines[voice.type][voice.idx % voiceLines[voice.type].length];
      const utter = new SpeechSynthesisUtterance(line);
      utter.rate = 0.95;
      window.speechSynthesis.speak(utter);
    } else {
      window.speechSynthesis.cancel();
    }
  };

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="font-semibold text-slate-800">Sound Studio</div>
        <button onClick={toggle} className={`px-3 py-1.5 rounded-xl text-white ${playing ? 'bg-[#FFA94D]' : 'bg-[#20C997]'} shadow`}>
          {playing ? 'Stop' : 'Play'}
        </button>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        {tracks.map(t => (
          <div key={t.key} className="flex items-center gap-3 p-3 rounded-xl bg-[#F4F6F9]">
            <div className="w-24 text-sm text-slate-700">{t.label}</div>
            <input aria-label={`${t.label} volume`} type="range" min="0" max="1" step="0.01" value={volumes[t.key]}
              onChange={e => setVolumes(v => ({ ...v, [t.key]: parseFloat(e.target.value) }))} className="flex-1" />
            <div className="w-10 text-right text-sm text-slate-600">{Math.round((volumes[t.key]||0)*100)}%</div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className="text-sm text-slate-600">Presets:</span>
        {['Morning Calm','Focus Flow','Evening Wind-down'].map(p => (
          <button key={p} onClick={() => applyPreset(p)} className={`px-3 py-1.5 rounded-xl text-sm ${preset===p ? 'bg-[#1B9CFC] text-white' : 'bg-[#F4F6F9] text-slate-700'}`}>{p}</button>
        ))}
      </div>

      <div className="mt-4 flex items-center gap-3">
        <label className="flex items-center gap-2 text-sm text-slate-700">
          <input type="checkbox" checked={voice.on} onChange={handleVoice} /> Voice Narration
        </label>
        <select value={voice.type} onChange={(e)=>setVoice(v=>({...v,type:e.target.value}))} className="bg-[#F4F6F9] px-2 py-1 rounded-lg text-sm">
          <option value="female">Female</option>
          <option value="male">Male</option>
        </select>
      </div>

      <div className="mt-2 text-xs text-slate-500">Preset: Focus Flow — gentle piano + rain</div>
    </div>
  );
}
