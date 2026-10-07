const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function makeTrailAssets() {
  const trailDir = path.join(process.cwd(), 'public', 'images', 'trail');
  if (!fs.existsSync(trailDir)) {
    fs.mkdirSync(trailDir, { recursive: true });
  }

  const items = [
    {
      num: '01',
      title: 'KINETIC',
      sub: 'BRAND SYSTEMS // 01',
      bg: '#0A0A0A',
      accent: '#FFD600',
      art: `<circle cx="250" cy="275" r="160" stroke="#FFD600" stroke-width="3" fill="none" opacity="0.8"/>
            <circle cx="250" cy="275" r="110" stroke="#F7F7F5" stroke-width="1" stroke-dasharray="8 8" fill="none" opacity="0.6"/>
            <rect x="170" y="195" width="160" height="160" fill="#FFD600" opacity="0.2"/>`
    },
    {
      num: '02',
      title: 'VELOCITY',
      sub: 'CREATIVE TECH // 02',
      bg: '#111111',
      accent: '#FFFFFF',
      art: `<path d="M70 420 L430 130" stroke="#FFD600" stroke-width="6"/>
            <path d="M120 440 L440 200" stroke="#888888" stroke-width="2"/>
            <rect x="200" y="220" width="120" height="120" fill="#FFD600"/>`
    },
    {
      num: '03',
      title: 'KRONOS',
      sub: 'SYSTEM ARCHITECTURE // 03',
      bg: '#050505',
      accent: '#FFD600',
      art: `<circle cx="250" cy="275" r="140" fill="#FFD600" opacity="0.9"/>
            <circle cx="250" cy="275" r="140" fill="none" stroke="#050505" stroke-width="24"/>
            <line x1="90" y1="275" x2="410" y2="275" stroke="#050505" stroke-width="6"/>`
    },
    {
      num: '04',
      title: 'EDITORIAL',
      sub: 'MEDIA GRAVITY // 04',
      bg: '#161616',
      accent: '#FFD600',
      art: `<rect x="80" y="80" width="340" height="390" fill="none" stroke="#FFD600" stroke-width="2"/>
            <rect x="120" y="120" width="260" height="310" fill="#222222"/>
            <circle cx="250" cy="275" r="70" fill="#FFD600"/>`
    },
    {
      num: '05',
      title: 'VORTEX',
      sub: 'AUTONOMOUS CORE // 05',
      bg: '#080808',
      accent: '#FFD600',
      art: `<circle cx="250" cy="275" r="180" stroke="#FFD600" stroke-width="1.5" stroke-dasharray="4 8" fill="none"/>
            <circle cx="250" cy="275" r="120" stroke="#FFD600" stroke-width="2" fill="none"/>
            <circle cx="250" cy="275" r="60" fill="#FFD600"/>`
    },
    {
      num: '06',
      title: 'HYPERION',
      sub: 'SCALE PLATFORMS // 06',
      bg: '#0D0D0D',
      accent: '#FFFFFF',
      art: `<polygon points="250,110 390,390 110,390" stroke="#FFD600" stroke-width="3" fill="none"/>
            <polygon points="250,170 340,360 160,360" fill="#FFD600" opacity="0.3"/>`
    },
    {
      num: '07',
      title: 'SYNAPSE',
      sub: 'DIGITAL INTELLECT // 07',
      bg: '#141414',
      accent: '#FFD600',
      art: `<circle cx="160" cy="200" r="40" fill="#FFD600"/>
            <circle cx="340" cy="220" r="50" fill="#F7F7F5" opacity="0.8"/>
            <circle cx="250" cy="350" r="60" fill="#FFD600"/>
            <line x1="160" y1="200" x2="340" y2="220" stroke="#FFD600" stroke-width="2"/>
            <line x1="340" y1="220" x2="250" y2="350" stroke="#FFD600" stroke-width="2"/>
            <line x1="250" y1="350" x2="160" y2="200" stroke="#FFD600" stroke-width="2"/>`
    },
    {
      num: '08',
      title: 'FOB MEDIA',
      sub: 'HIGH VELOCITY // 08',
      bg: '#050505',
      accent: '#FFD600',
      art: `<rect x="60" y="60" width="380" height="430" fill="#FFD600"/>
            <text x="250" y="295" font-family="sans-serif" font-size="70" font-weight="900" fill="#050505" text-anchor="middle" letter-spacing="-2">FOB</text>`
    }
  ];

  for (const item of items) {
    const isSpecial = item.num === '08';
    const svg = `<svg width="500" height="550" viewBox="0 0 500 550" xmlns="http://www.w3.org/2000/svg">
      <rect width="500" height="550" fill="${item.bg}"/>
      <g opacity="0.15">
        <line x1="0" y1="110" x2="500" y2="110" stroke="#FFFFFF" stroke-width="1"/>
        <line x1="0" y1="220" x2="500" y2="220" stroke="#FFFFFF" stroke-width="1"/>
        <line x1="0" y1="330" x2="500" y2="330" stroke="#FFFFFF" stroke-width="1"/>
        <line x1="0" y1="440" x2="500" y2="440" stroke="#FFFFFF" stroke-width="1"/>
        <line x1="125" y1="0" x2="125" y2="550" stroke="#FFFFFF" stroke-width="1"/>
        <line x1="250" y1="0" x2="250" y2="550" stroke="#FFFFFF" stroke-width="1"/>
        <line x1="375" y1="0" x2="375" y2="550" stroke="#FFFFFF" stroke-width="1"/>
      </g>
      ${item.art}
      ${!isSpecial ? `
      <text x="40" y="470" font-family="sans-serif" font-size="34" font-weight="900" fill="#F7F7F5" letter-spacing="-1">${item.title}</text>
      <text x="40" y="505" font-family="monospace" font-size="13" font-weight="700" fill="${item.accent}" letter-spacing="3">${item.sub}</text>
      <text x="450" y="80" font-family="monospace" font-size="18" font-weight="900" fill="${item.accent}" text-anchor="end">${item.num}</text>
      ` : `
      <text x="40" y="515" font-family="monospace" font-size="13" font-weight="700" fill="#050505" letter-spacing="3">FOB MEDIA // 2026</text>
      `}
    </svg>`;

    const dest = path.join(trailDir, `${item.num}.jpg`);
    await sharp(Buffer.from(svg)).jpeg({ quality: 92 }).toFile(dest);
    console.log(`Generated ${dest}`);
  }

  console.log('Done generating trail assets.');
}

makeTrailAssets().catch(err => {
  console.error(err);
  process.exit(1);
});
