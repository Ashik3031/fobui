'use client';

import React from 'react';
import Image from 'next/image';
import { useTransition } from '@/components/motion/TransitionProvider';

interface FobLogoProps {
  color?: 'black' | 'white' | 'yellow';
  className?: string;
  priority?: boolean;
  asLink?: boolean;
  width?: number;
  height?: number;
  onClick?: () => void;
}

export function FobLogo({
  color = 'black',
  className = '',
  priority = false,
  asLink = true,
  width = 160,
  height = 113,
  onClick,
}: FobLogoProps) {
  const transition = useTransition();

  const logoSrc =
    color === 'white'
      ? '/logo/fob-logo-white.png'
      : color === 'yellow'
      ? '/logo/fob-logo-yellow.png'
      : '/logo/fob-logo-black.png';

  const logoElement = (
    <span className={`inline-flex items-center select-none ${className}`}>
      <Image
        src={logoSrc}
        alt="FOB Media Logo"
        width={width}
        height={height}
        priority={priority}
        className="w-auto h-auto max-h-full object-contain"
      />
    </span>
  );

  if (!asLink) {
    return logoElement;
  }

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onClick) onClick();
    transition('/', 'HOME');
  };

  return (
    <a
      href="/"
      onClick={handleClick}
      className="inline-flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD600] group cursor-pointer"
      aria-label="FOB Media — Homepage"
    >
      {logoElement}
    </a>
  );
}
