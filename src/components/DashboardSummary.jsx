import React from 'react';

export default function DashboardSummary({ tokens, streak }) {
  const badges = [];
  if (tokens >= 100) badges.push('Theme Unlocked');
  if (streak >= 3) badges.push('3-day Streak');

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm">
      <div className="text-lg font-semibold text-slate-800 mb-2">Today: {streak > 0 ? `${streak} resets` : '0 resets'} — Calm</div>
      <div className="text-slate-700">Token balance: <span className="font-semibold">{tokens}</span></div>
      <div className="mt-3 flex flex-wrap gap-2">
        {badges.map((b, i) => (
          <span key={i} className="px-2 py-1 rounded-lg bg-[#F4F6F9] text-slate-600 text-sm">{b}</span>
        ))}
        {badges.length === 0 && <span className="text-slate-500 text-sm">No badges yet — keep going!</span>}
      </div>
      <div className="mt-3 text-xs text-slate-500">All interactions are stored locally in this demo.</div>
    </div>
  );
}
