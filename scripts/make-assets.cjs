const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function createEditorialAssets() {
  const imagesDir = path.join(process.cwd(), 'public', 'images');
  if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
  }

  // 1. Vortex project image
  const linesH = Array.from({ length: 20 }, (_, i) => `<line x1="0" y1="${i * 54}" x2="1920" y2="${i * 54}"/>`).join('');
  const linesV = Array.from({ length: 36 }, (_, i) => `<line x1="${i * 54}" y1="0" x2="${i * 54}" y2="1080"/>`).join('');
  const vortexSvg = `<svg width="1920" height="1080" viewBox="0 0 1920 1080" xmlns="http://www.w3.org/2000/svg">
    <rect width="1920" height="1080" fill="#050505"/>
    <rect width="1920" height="1080" fill="#111111" opacity="0.3"/>
    <g stroke="#1a1a1a" stroke-width="1">${linesH}${linesV}</g>
    <g fill="none" stroke="#FFD600" stroke-width="2" opacity="0.85">
      <circle cx="1280" cy="540" r="140" />
      <circle cx="1280" cy="540" r="260" stroke-dasharray="10 16" opacity="0.7" />
      <circle cx="1280" cy="540" r="400" stroke-dasharray="2 10" opacity="0.5" />
      <circle cx="1280" cy="540" r="540" opacity="0.25" />
    </g>
    <text x="140" y="440" font-family="sans-serif" font-size="110" font-weight="900" fill="#F7F7F5" letter-spacing="-3">VORTEX LABS</text>
    <text x="140" y="520" font-family="sans-serif" font-size="28" font-weight="700" fill="#FFD600" letter-spacing="6">CREATIVE COMPUTING PLATFORM // 03</text>
    <text x="140" y="580" font-family="sans-serif" font-size="20" fill="#888888" letter-spacing="1">AUTONOMOUS INTERFACE ARCHITECTURE + KINETIC ENGINE</text>
  </svg>`;
  await sharp(Buffer.from(vortexSvg)).jpeg({ quality: 92 }).toFile(path.join(imagesDir, 'project-vortex.jpg'));
  console.log('project-vortex.jpg OK');

  // 2. Article 1
  const art1Svg = `<svg width="1200" height="800" viewBox="0 0 1200 800" xmlns="http://www.w3.org/2000/svg">
    <rect width="1200" height="800" fill="#0A0A0A"/>
    <rect x="60" y="60" width="1080" height="680" fill="none" stroke="#FFD600" stroke-width="1" opacity="0.35"/>
    <circle cx="950" cy="300" r="220" fill="#FFD600" opacity="0.15"/>
    <circle cx="950" cy="300" r="140" fill="none" stroke="#FFD600" stroke-width="2"/>
    <path d="M950 140 L950 460 M790 300 L1110 300" stroke="#FFD600" stroke-width="1" opacity="0.5"/>
    <text x="120" y="320" font-family="sans-serif" font-size="64" font-weight="900" fill="#F7F7F5">THE FUTURE OF</text>
    <text x="120" y="390" font-family="sans-serif" font-size="64" font-weight="900" fill="#FFD600">DIGITAL GROWTH</text>
    <text x="120" y="460" font-family="sans-serif" font-size="18" font-weight="700" fill="#888888">ESSAY 01 / STRATEGY + SCALE</text>
    <line x1="120" y1="520" x2="420" y2="520" stroke="#333333" stroke-width="2"/>
    <text x="120" y="570" font-family="sans-serif" font-size="18" fill="#AAAAAA">Combining editorial brand gravity with high-velocity web engineering.</text>
  </svg>`;
  await sharp(Buffer.from(art1Svg)).jpeg({ quality: 92 }).toFile(path.join(imagesDir, 'article-future-growth.jpg'));
  console.log('article-future-growth.jpg OK');

  // 3. Article 2
  const art2Svg = `<svg width="800" height="600" viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
    <rect width="800" height="600" fill="#111111"/>
    <rect x="40" y="40" width="720" height="520" fill="none" stroke="#222222" stroke-width="1"/>
    <rect x="520" y="120" width="180" height="180" fill="#FFD600" opacity="0.95"/>
    <rect x="550" y="150" width="180" height="180" fill="#F7F7F5" opacity="0.12" stroke="#F7F7F5" stroke-width="1"/>
    <text x="80" y="240" font-family="sans-serif" font-size="44" font-weight="900" fill="#F7F7F5">SYSTEMIC BRANDING</text>
    <text x="80" y="295" font-family="sans-serif" font-size="44" font-weight="900" fill="#888888">OVER CAMPAIGNS</text>
    <text x="80" y="370" font-family="sans-serif" font-size="15" font-weight="700" fill="#FFD600">ESSAY 02 / BRAND ARCHITECTURE</text>
  </svg>`;
  await sharp(Buffer.from(art2Svg)).jpeg({ quality: 92 }).toFile(path.join(imagesDir, 'article-systemic-branding.jpg'));
  console.log('article-systemic-branding.jpg OK');

  // 4. Article 3
  const art3Svg = `<svg width="800" height="600" viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
    <rect width="800" height="600" fill="#0C0C0C"/>
    <line x1="80" y1="120" x2="720" y2="480" stroke="#FFD600" stroke-width="2"/>
    <circle cx="80" cy="120" r="10" fill="#FFD600"/>
    <circle cx="400" cy="300" r="10" fill="#F7F7F5"/>
    <circle cx="720" cy="480" r="10" fill="#FFD600"/>
    <text x="80" y="240" font-family="sans-serif" font-size="44" font-weight="900" fill="#F7F7F5">ENGINEERING</text>
    <text x="80" y="295" font-family="sans-serif" font-size="44" font-weight="900" fill="#FFD600">VELOCITY</text>
    <text x="80" y="370" font-family="sans-serif" font-size="15" font-weight="700" fill="#AAAAAA">ESSAY 03 / CREATIVE COMPUTING</text>
  </svg>`;
  await sharp(Buffer.from(art3Svg)).jpeg({ quality: 92 }).toFile(path.join(imagesDir, 'article-engineering-velocity.jpg'));
  console.log('article-engineering-velocity.jpg OK');

  // 5. Capabilities
  const capabilities = [
    { name: 'digital-marketing', title: 'DIGITAL MARKETING', subtitle: 'REVENUE + REACH' },
    { name: 'web-development', title: 'WEB DEVELOPMENT', subtitle: 'PERFORMANCE ARCHITECTURE' },
    { name: 'seo', title: 'SEARCH DOMINANCE', subtitle: 'TECHNICAL + INTENT SEO' },
    { name: 'branding', title: 'BRAND SYSTEMS', subtitle: 'EDITORIAL IDENTITY' },
    { name: 'social-media', title: 'SOCIAL CONVERSATION', subtitle: 'KINETIC CONTENT' },
    { name: 'performance-marketing', title: 'PERFORMANCE', subtitle: 'ALGORITHMIC SCALE' },
  ];

  for (const cap of capabilities) {
    const capSvg = `<svg width="600" height="400" viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg">
      <rect width="600" height="400" fill="#080808"/>
      <circle cx="300" cy="200" r="150" fill="#FFD600" opacity="0.14"/>
      <rect x="30" y="30" width="540" height="340" fill="none" stroke="#222222" stroke-width="1"/>
      <text x="50" y="190" font-family="sans-serif" font-size="30" font-weight="900" fill="#F7F7F5">${cap.title}</text>
      <text x="50" y="235" font-family="sans-serif" font-size="13" font-weight="700" fill="#FFD600">${cap.subtitle}</text>
    </svg>`;
    await sharp(Buffer.from(capSvg)).jpeg({ quality: 90 }).toFile(path.join(imagesDir, `service-${cap.name}.jpg`));
    console.log(`service-${cap.name}.jpg OK`);
  }

  console.log('ALL ASSETS GENERATED SUCCESSFULLY!');
}

createEditorialAssets().catch(err => {
  console.error(err);
  process.exit(1);
});
