import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ExtensionPopup({ open, onStart, onSnooze }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="w-80 bg-white rounded-2xl p-4 shadow-xl">
          <div className="font-semibold text-slate-800 mb-1">MindSphere</div>
          <div className="text-slate-600 mb-4">Feeling foggy? 60s Reset?</div>
          <div className="flex gap-2">
            <button onClick={onStart} className="flex-1 px-3 py-2 rounded-xl bg-[#1B9CFC] text-white">Start</button>
            <button onClick={onSnooze} className="px-3 py-2 rounded-xl bg-[#F4F6F9] text-slate-700">Snooze</button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
