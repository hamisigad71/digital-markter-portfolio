'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

export default function Loader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Fast, crisp initial loading state (< 500ms total) for top perceived performance
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoading(false), 160);
          return 100;
        }
        const step = Math.floor(Math.random() * 25) + 20;
        return Math.min(prev + step, 100);
      });
    }, 60);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background/95 backdrop-blur-xl"
        >
          <div className="relative flex flex-col items-center z-10 px-6">
            {/* Logo Center */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
              className="relative w-20 h-20 md:w-24 md:h-24 mb-6 rounded-2xl bg-card border border-border/70 shadow-lg shadow-primary/5 flex items-center justify-center overflow-hidden"
            >
              <Image
                src="/logo.png"
                alt="Daysman Gad"
                fill
                className="object-contain p-3.5"
                priority
              />
            </motion.div>

            {/* Title */}
            <div className="text-center mb-5 space-y-1">
              <h2 className="text-base md:text-lg font-display font-bold text-foreground">
                Daysman <span className="text-primary italic">Marketer</span>
              </h2>
              <p className="text-xs text-muted-foreground uppercase tracking-widest font-mono">
                Growth & Performance
              </p>
            </div>

            {/* Sleek Progress Bar */}
            <div className="w-48 sm:w-56 space-y-2">
              <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-primary rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ ease: [0.23, 1, 0.32, 1], duration: 0.2 }}
                />
              </div>
              <div className="flex justify-between items-center text-[11px] font-mono text-muted-foreground">
                <span>Loading assets</span>
                <span className="tabular-nums font-semibold text-primary">{Math.round(progress)}%</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
