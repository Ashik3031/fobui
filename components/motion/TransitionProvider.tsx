'use client';

import React, { createContext, useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const Ctx = createContext<(href: string, label: string) => void>(() => {});
export const useTransition = () => useContext(Ctx);

function formatTitle(str: string): string {
  if (!str) return '';
  const trimmed = str.replace(/\.+$/, '').trim();
  return trimmed
    .split(/\s+/)
    .map((word) => {
      if (!word) return '';
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(' ');
}

export function TransitionProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [label, setLabel] = useState<string | null>(null);

  const go = (href: string, name: string) => {
    setLabel(name); // 1. cover
    setTimeout(() => {
      if (typeof window !== 'undefined') {
        const lenis = (window as unknown as { __lenis?: { scrollTo: (target: unknown, options?: { immediate?: boolean }) => void } }).__lenis;

        if (href === '/' || href === '') {
          if (lenis) {
            lenis.scrollTo(0, { immediate: true });
          } else {
            window.scrollTo({ top: 0, behavior: 'instant' });
          }
          router.push('/');
        } else if (href.startsWith('#')) {
          const target = document.querySelector(href);
          if (target) {
            if (lenis) {
              lenis.scrollTo(target, { immediate: true });
            } else {
              target.scrollIntoView({ behavior: 'instant' });
            }
          }
          router.push(href);
        } else {
          router.push(href);
        }
      } else {
        router.push(href);
      }
    }, 600); // 2. navigate while covered
    setTimeout(() => setLabel(null), 1400); // 3. reveal
  };

  const titleText = label ? `${formatTitle(label)}.` : '';

  return (
    <Ctx.Provider value={go}>
      {children}
      <AnimatePresence>
        {label && (
          <motion.div
            className="fixed inset-0 z-[999] grid place-items-center bg-black select-none pointer-events-auto"
            initial={{ clipPath: 'inset(100% 0 0 0)' }}
            animate={{ clipPath: 'inset(0% 0 0 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          >
            {/* 3D Fold text container */}
            <div className="overflow-hidden py-8 px-6 [perspective:1000px]">
              <motion.h1
                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white tracking-[-0.035em] leading-none text-center font-[family-name:var(--font-heading)]"
                initial={{
                  rotateX: 75,
                  y: 40,
                  opacity: 0,
                  scale: 0.96,
                }}
                animate={{
                  rotateX: 0,
                  y: 0,
                  opacity: 1,
                  scale: 1,
                  transition: {
                    duration: 0.55,
                    ease: [0.16, 1, 0.3, 1],
                    delay: 0.12,
                  },
                }}
                exit={{
                  rotateX: -60,
                  y: -30,
                  opacity: 0,
                  transition: {
                    duration: 0.35,
                    ease: [0.76, 0, 0.24, 1],
                  },
                }}
                style={{
                  transformOrigin: '50% 100%',
                  transformStyle: 'preserve-3d',
                }}
              >
                {titleText}
              </motion.h1>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Ctx.Provider>
  );
}

export const PageTransitionProvider = TransitionProvider;
export const usePageTransition = useTransition;
