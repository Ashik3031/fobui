'use client';

import React, { useRef, useState, useSyncExternalStore } from 'react';
import Link from 'next/link';

function subscribeReducedMotion(callback: () => void) {
  if (typeof window === 'undefined') return () => {};
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  mediaQuery.addEventListener('change', callback);
  return () => mediaQuery.removeEventListener('change', callback);
}

function getReducedMotionSnapshot() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function getServerSnapshot() {
  return false;
}

interface MagneticButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  variant?: 'yellow' | 'black' | 'white' | 'outline' | 'ghost';
  ariaLabel?: string;
  magneticStrength?: number;
}

export function MagneticButton({
  children,
  href,
  onClick,
  className = '',
  variant = 'yellow',
  ariaLabel,
  magneticStrength = 0.25,
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLAnchorElement & HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const isReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getServerSnapshot
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (isReducedMotion || !buttonRef.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const deltaX = (clientX - centerX) * magneticStrength;
    const deltaY = (clientY - centerY) * magneticStrength;
    setPosition({ x: deltaX, y: deltaY });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const variantStyles = {
    yellow:
      'bg-[#FFD600] text-[#050505] hover:bg-white transition-colors duration-300 font-bold',
    black:
      'bg-[#050505] text-[#F7F7F5] hover:bg-[#FFD600] hover:text-[#050505] transition-colors duration-300 font-bold',
    white:
      'bg-[#F7F7F5] text-[#050505] hover:bg-[#FFD600] transition-colors duration-300 font-bold',
    outline:
      'bg-transparent border border-current text-current hover:bg-[#FFD600] hover:border-[#FFD600] hover:text-[#050505] transition-colors duration-300 font-bold',
    ghost:
      'bg-transparent text-current hover:text-[#FFD600] transition-colors duration-300 font-bold',
  }[variant];

  const combinedClasses = `
    inline-flex items-center justify-center gap-3 px-7 py-4 select-none
    text-xs tracking-[0.2em] uppercase font-bold
    transition-transform duration-200 ease-out cursor-pointer
    focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD600]
    ${variantStyles}
    ${className}
  `.trim();

  const transformStyle = isReducedMotion
    ? undefined
    : { transform: `translate3d(${position.x}px, ${position.y}px, 0)` };

  if (href) {
    const isInternal = href.startsWith('#') || href.startsWith('/');
    if (isInternal) {
      return (
        <Link
          ref={buttonRef}
          href={href}
          aria-label={ariaLabel}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={transformStyle}
          className={combinedClasses}
          onClick={onClick}
        >
          {children}
        </Link>
      );
    }
    return (
      <a
        ref={buttonRef}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={ariaLabel}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={transformStyle}
        className={combinedClasses}
        onClick={onClick}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      ref={buttonRef}
      type="button"
      aria-label={ariaLabel}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={transformStyle}
      className={combinedClasses}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
