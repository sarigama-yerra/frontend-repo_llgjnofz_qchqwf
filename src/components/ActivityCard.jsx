import React from 'react';
import { motion } from 'framer-motion';

export default function ActivityCard({ title, duration = 60, benefit = 'Calm', color = '#1B9CFC', onClick, progress = 0, icon }) {
  return (
    <motion.button
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="w-full text-left bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow focus:outline-none focus:ring-2 focus:ring-[#1B9CFC]"
      style={{ borderColor: color }}
      aria-label={`${title}, ${duration}s, ${benefit}`}
    >
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: `${color}22`, color }} aria-hidden>
          {icon || '◎'}
        </div>
        <div className="flex-1">
          <div className="font-semibold text-slate-800">{title}</div>
          <div className="text-sm text-slate-500">{duration}s · {benefit}</div>
        </div>
        <div className="relative w-12 h-12">
          <svg className="absolute inset-0" viewBox="0 0 36 36" role="img" aria-label={`Progress ${Math.round(progress*100)}%`}>
            <path d="M18 2 a 16 16 0 1 1 0 32 a 16 16 0 1 1 0 -32" fill="none" stroke="#F4F6F9" strokeWidth="4"/>
            <motion.path
              d="M18 2 a 16 16 0 1 1 0 32 a 16 16 0 1 1 0 -32"
              fill="none"
              stroke={color}
              strokeWidth="4"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: progress }}
              transition={{ duration: 0.6 }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center text-xs font-medium text-slate-700">{duration}s</div>
        </div>
      </div>
    </motion.button>
  );
}
