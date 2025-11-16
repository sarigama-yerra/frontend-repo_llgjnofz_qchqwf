import React from 'react';
import { motion } from 'framer-motion';

export default function QuoteCard({ text, tag = 'Calm', onReact }) {
  return (
    <motion.div whileHover={{ y: -3 }} className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md">
      <div className="text-slate-700 mb-3">“{text}”</div>
      <div className="flex items-center justify-between">
        <span className="text-xs px-2 py-1 rounded-lg bg-[#F4F6F9] text-slate-600">{tag}</span>
        <div className="flex gap-2">
          <button onClick={() => onReact('Loved')} className="px-3 py-1.5 rounded-xl bg-[#1B9CFC] text-white text-sm">Loved</button>
          <button onClick={() => onReact('Meh')} className="px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700 text-sm">Meh</button>
        </div>
      </div>
    </motion.div>
  );
}
