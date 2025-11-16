import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

export default function PlayerOverlay({ open, onClose, activity, onComplete, reducedMotion }) {
  const [running, setRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(activity?.duration || 60);
  const rafRef = useRef();

  useEffect(() => {
    if (open) {
      setTimeLeft(activity?.duration || 60);
      setRunning(false);
    }
  }, [open, activity]);

  useEffect(() => {
    if (!running) return;
    const start = performance.now();
    const total = (timeLeft) * 1000;

    const tick = (t0) => (now) => {
      const elapsed = now - t0;
      const remaining = Math.max(0, total - elapsed);
      setTimeLeft(Math.ceil(remaining / 1000));
      if (remaining <= 0) {
        setRunning(false);
        if (!reducedMotion) {
          confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
        }
        onComplete?.(activity);
      } else {
        rafRef.current = requestAnimationFrame(tick(t0));
      }
    };
    rafRef.current = requestAnimationFrame(tick(start));
    return () => cancelAnimationFrame(rafRef.current);
  }, [running]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          role="dialog" aria-modal="true" aria-label={`${activity?.title} player`}
        >
          <motion.div className="w-full max-w-md bg-white rounded-2xl p-6 shadow-xl"
            initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 30, opacity: 0 }} transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="text-xl font-semibold text-slate-800">{activity?.title}</div>
              <button onClick={onClose} className="text-slate-500 hover:text-slate-700 focus:outline-none">✕</button>
            </div>

            <div className="text-slate-600 mb-4">{activity?.instruction || 'Follow the prompt and breathe with the animation.'}</div>

            <div className="grid place-items-center py-6">
              {activity?.type === 'breath' ? (
                <motion.div className="w-40 h-40 rounded-full" style={{ background: `${activity.color}22`, border: `2px solid ${activity.color}` }}
                  animate={reducedMotion ? {} : { scale: [1, 1.15, 1] }} transition={{ duration: 6, repeat: Infinity }}
                  aria-hidden
                />
              ) : (
                <motion.div className="w-full h-24 rounded-xl bg-gradient-to-r from-[#1B9CFC]/20 to-[#20C997]/20" animate={reducedMotion ? {} : { backgroundPositionX: ["0%", "100%", "0%"] }} transition={{ duration: 8, repeat: Infinity }} />
              )}
            </div>

            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold text-slate-800" aria-live="polite" aria-atomic="true">{timeLeft}s</div>
              {!running ? (
                <button onClick={() => setRunning(true)} className="px-4 py-2 rounded-xl bg-[#1B9CFC] text-white shadow hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#1B9CFC]">Start</button>
              ) : (
                <button onClick={() => setRunning(false)} className="px-4 py-2 rounded-xl bg-[#FFA94D] text-white shadow hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#FFA94D]">Pause</button>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
