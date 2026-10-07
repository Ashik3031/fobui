import Image from 'next/image';
import Link from 'next/link';

interface FobLogoProps {
  color?: 'black' | 'white' | 'yellow';
  className?: string;
  priority?: boolean;
  asLink?: boolean;
  width?: number;
  height?: number;
}

export function FobLogo({
  color = 'black',
  className = '',
  priority = false,
  asLink = true,
  width = 160,
  height = 113,
}: FobLogoProps) {
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

  return (
    <Link
      href="/"
      className="inline-flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD600] group"
      aria-label="FOB Media — Homepage"
    >
      {logoElement}
    </Link>
  );
}
