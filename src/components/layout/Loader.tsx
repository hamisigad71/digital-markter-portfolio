'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

export default function Loader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          clearInterval(timer);
          setTimeout(() => setLoading(false), 300);
          return 100;
        }
        const diff = Math.random() * 20;
        return Math.min(oldProgress + diff, 100);
      });
    }, 70);


    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-100"
        >
          {/* Animated Background Grid */}
          <div className="absolute inset-0 overflow-hidden opacity-30">
            <motion.div
              animate={{ 
                backgroundPosition: ['0px 0px', '100px 100px'],
              }}
              transition={{ 
                duration: 20, 
                repeat: Infinity,
                ease: "linear" 
              }}
              className="absolute inset-0"
              style={{
                backgroundImage: `
                  linear-gradient(to right, rgb(148 163 184 / 0.1) 1px, transparent 1px),
                  linear-gradient(to bottom, rgb(148 163 184 / 0.1) 1px, transparent 1px)
                `,
                backgroundSize: '50px 50px'
              }}
            />
          </div>

          {/* Floating Particles */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ 
                x: Math.random() * window.innerWidth, 
                y: Math.random() * window.innerHeight,
                scale: 0
              }}
              animate={{ 
                y: [null, Math.random() * window.innerHeight],
                x: [null, Math.random() * window.innerWidth],
                scale: [0, 1, 0],
                opacity: [0, 0.5, 0]
              }}
              transition={{ 
                duration: 8 + Math.random() * 4,
                repeat: Infinity,
                delay: i * 0.8,
                ease: "easeInOut"
              }}
              className="absolute w-2 h-2 bg-gradient-to-br from-primary/40 to-primary/20 rounded-full blur-sm"
            />
          ))}

          <div className="relative flex flex-col items-center z-10">
            {/* Logo Container with Orbital Rings */}
            <div className="relative w-80 h-80 mb-12">


              {/* Outer Orbital Ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ 
                  duration: 20, 
                  repeat: Infinity,
                  ease: "linear" 
                }}
                className="absolute inset-0 rounded-full"
              >
                <div className="absolute top-0 left-1/2 w-2 h-2 -ml-1 -mt-1 bg-gradient-to-br from-primary to-primary/60 rounded-full shadow-lg shadow-primary/50" />
                <div className="absolute inset-0 border border-dashed border-slate-200 rounded-full" />
              </motion.div>

              {/* Inner Orbital Ring */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ 
                  duration: 15, 
                  repeat: Infinity,
                  ease: "linear" 
                }}
                className="absolute inset-14 rounded-full"
              >
                <div className="absolute bottom-0 right-1/2 w-2.5 h-2.5 -mr-1.25 -mb-1.25 bg-gradient-to-br from-primary/60 to-primary/40 rounded-full shadow-md shadow-primary/30" />
                <div className="absolute inset-0 border border-dashed border-slate-300 rounded-full" />
              </motion.div>



              {/* Logo Center */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1, 
                  rotate: 0 
                }}
                transition={{ 
                  duration: 1.2, 
                  ease: [0.34, 1.56, 0.64, 1] // Bounce effect
                }}
                className="absolute inset-14 flex items-center justify-center font-display"
              >
                {/* Glow Effect */}
                <motion.div
                  animate={{ 
                    scale: [1, 1.4, 1],
                    opacity: [0.3, 0.8, 0.3] 
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                    ease: "easeInOut" 
                  }}
                  className="absolute inset-0 bg-gradient-to-br from-primary/40 to-primary/5 rounded-full blur-3xl"
                />

                {/* Logo */}
                <div className="relative w-full h-full bg-white rounded-[2rem] shadow-2xl shadow-slate-300/50 border border-slate-200 flex items-center justify-center overflow-hidden group">


                  {/* Shine Effect */}
                  <motion.div
                    animate={{ 
                      x: ['-200%', '200%'],
                    }}
                    transition={{ 
                      duration: 3,
                      repeat: Infinity,
                      repeatDelay: 2,
                      ease: "easeInOut" 
                    }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12"
                  />

                  <Image
                    src="/logo.png"
                    alt="Logo"
                    fill
                    className="object-contain p-10"


                    priority
                    onError={(e) => {
                      (e.target as any).style.display = 'none';
                      const fallback = document.getElementById('logo-fallback');
                      if (fallback) fallback.style.opacity = '1';
                    }}
                  />
                  
                  {/* CSS Fallback */}
                  <div 
                    id="logo-fallback"
                    className="opacity-0 transition-opacity duration-500 absolute inset-0 flex items-center justify-center"
                  >
                    <div className="relative">
                      <motion.span 
                        animate={{ 
                          textShadow: [
                            '0 0 20px rgba(0,0,0,0.1)',
                            '0 0 30px rgba(0,0,0,0.2)',
                            '0 0 20px rgba(0,0,0,0.1)'
                          ]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="text-4xl font-black bg-gradient-to-br from-slate-800 to-slate-600 bg-clip-text text-transparent"
                      >
                        DG
                      </motion.span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Progress Section */}
            <div className="flex flex-col items-center space-y-6 w-64">
              {/* Progress Bar Container */}
              <div className="w-full">

                <div className="relative w-full h-1.5 bg-slate-200 rounded-full overflow-hidden shadow-inner">
                  {/* Animated shimmer background */}
                  <motion.div
                    animate={{ 
                      x: ['-100%', '100%'],
                    }}
                    transition={{ 
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut" 
                    }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent"
                  />
                  
                  {/* Progress fill */}
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ ease: "easeOut", duration: 0.3 }}
                    className="relative h-full bg-gradient-to-r from-primary via-primary/80 to-primary"
                  >
                    {/* Glowing end cap */}
                    <motion.div 
                      animate={{ 
                        opacity: [0.5, 1, 0.5],
                        scale: [1, 1.2, 1]
                      }}
                      transition={{ 
                        duration: 1, 
                        repeat: Infinity 
                      }}
                      className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full shadow-lg shadow-primary/50"
                    />
                  </motion.div>
                </div>
              </div>

              {/* Loading Text */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-3"
              >
                <motion.p 
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-slate-600 text-[10px] font-bold uppercase tracking-[0.4em]"
                >
                  Igniting Authority <span className="ml-2 text-primary tabular-nums">{Math.round(progress)}%</span>
                </motion.p>

                
                {/* Animated Dots */}
                <div className="flex gap-1">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      animate={{ 
                        scale: [1, 1.5, 1],
                        opacity: [0.3, 1, 0.3]
                      }}
                      transition={{ 
                        duration: 1.5,
                        repeat: Infinity,
                        delay: i * 0.2
                      }}
                      className="w-1.5 h-1.5 bg-slate-400 rounded-full"
                    />
                  ))}
                </div>
              </motion.div>

              {/* Loading Steps Indicator */}
              <div className="flex gap-1.5 pt-1">
                {[...Array(4)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0 }}
                    animate={{ 
                      scale: progress > (i * 25) ? 1 : 0.5,
                      opacity: progress > (i * 25) ? 1 : 0.3
                    }}
                    className={`w-10 h-0.5 rounded-full transition-colors duration-500 ${
                      progress > (i * 25) 
                        ? 'bg-gradient-to-r from-primary to-primary/70' 
                        : 'bg-slate-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Decorative Corner Elements */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="absolute top-8 left-8 flex flex-col gap-1"
          >
            <div className="text-slate-400 font-mono text-xs font-semibold tracking-wider">
              DG_CORE_01
            </div>
            <div className="w-16 h-0.5 bg-gradient-to-r from-primary/50 to-transparent" />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="absolute bottom-8 right-8 flex flex-col gap-1 items-end"
          >
            <div className="text-slate-400 font-mono text-xs font-semibold tracking-wider">
              LOAD_EST_2024
            </div>
            <div className="w-16 h-0.5 bg-gradient-to-l from-primary/50 to-transparent" />
          </motion.div>

          {/* Version Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="absolute bottom-8 left-8 px-3 py-1 bg-white/60 backdrop-blur-sm border border-slate-200 rounded-full"
          >
            <span className="text-slate-500 font-mono text-[10px] font-bold">
              v1.0.0
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}