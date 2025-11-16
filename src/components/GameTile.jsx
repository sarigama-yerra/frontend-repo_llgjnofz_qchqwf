import React from 'react';
import { motion } from 'framer-motion';

export default function GameTile({ title, thumbnail, url, onPlay }) {
  return (
    <motion.div whileHover={{ y: -4 }} className="bg-white rounded-2xl p-3 shadow-sm hover:shadow-md">
      <img src={thumbnail} alt={`${title} thumbnail`} className="w-full h-40 object-cover rounded-xl mb-3" />
      <div className="flex items-center justify-between">
        <div className="font-medium text-slate-800">{title}</div>
        <button onClick={() => onPlay(url)} className="px-3 py-1.5 rounded-xl bg-[#20C997] text-white text-sm shadow hover:shadow-md">Play</button>
      </div>
    </motion.div>
  );
}
