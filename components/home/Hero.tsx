'use client';

import { useEffect, useRef } from 'react';
import { Fredoka } from 'next/font/google';

const fredoka = Fredoka({ subsets: ['latin'], weight: ['700'] });

const clamp = (n: number) => Math.max(-1, Math.min(1, n));

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const logoRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    const logo = logoRef.current;
    if (!hero || !logo) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // every element with data-depth drifts with the cursor (cheap, compositor-only)
    const layers = Array.from(hero.querySelectorAll<HTMLElement>('[data-depth]'));
    let tx = 0, ty = 0; // target (-1..1)
    let cx = 0, cy = 0; // current, eased toward target
    let raf = 0;

    const tick = () => {
      cx += (tx - cx) * 0.12;
      cy += (ty - cy) * 0.12;

      logo.style.transform =
        `perspective(1100px) rotateY(${cx * 26}deg) rotateX(${-cy * 20}deg) ` +
        `scale(${1 + Math.hypot(cx, cy) * 0.035})`;

      layers.forEach((el) => {
        const d = Number(el.dataset.depth);
        el.style.translate = `${cx * d}px ${cy * d}px`;
      });

      raf = Math.abs(tx - cx) > 0.001 || Math.abs(ty - cy) > 0.001
        ? requestAnimationFrame(tick)
        : 0;
    };
    const kick = () => { if (!raf) raf = requestAnimationFrame(tick); };

    // listen on the whole window so the logo reacts anywhere on the page
    const onMove = (e: PointerEvent) => {
      tx = clamp((e.clientX / window.innerWidth - 0.5) * 2);
      ty = clamp((e.clientY / window.innerHeight - 0.5) * 2);
      kick();
    };
    const onLeave = () => { tx = 0; ty = 0; kick(); };

    window.addEventListener('pointermove', onMove, { passive: true });
    document.documentElement.addEventListener('pointerleave', onLeave);
    return () => {
      window.removeEventListener('pointermove', onMove);
      document.documentElement.removeEventListener('pointerleave', onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section ref={heroRef} className="fob-hero">
      <div className="fob-stage">
        <p className="fob-side fob-l" data-depth="14">
          A digital<br />growth studio<br />UAE — GCC
          <hr />
        </p>
        <p className="fob-side fob-r" data-depth="14">
          Websites<br />Marketing<br />Content<br />and more
        </p>

        <svg className="fob-arrow fob-al" data-depth="24" viewBox="0 0 110 110" aria-hidden="true">
          <path d="M8 6C4 52 30 88 98 98" />
          <path d="M84 88l15 10-17 6" />
        </svg>
        <svg className="fob-arrow fob-ar" data-depth="24" viewBox="0 0 110 110" aria-hidden="true">
          <path d="M102 6C106 52 80 88 12 98" />
          <path d="M26 88 11 98l17 6" />
        </svg>
        <svg className="fob-spark" data-depth="-46" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 0c1 7 5 11 12 12-7 1-11 5-12 12-1-7-5-11-12-12 7-1 11-5 12-12z" />
        </svg>

        <span className="fob-pill fob-y" data-depth="-60">Brands</span>
        <span className="fob-pill fob-w" data-depth="-48">Ideas</span>

        {/* float lives on the wrapper so the filtered SVG isn't re-rendered every frame */}
        <div className="fob-float">
          <svg
            ref={logoRef}
            className="fob-logo3d"
            viewBox="40 30 820 520"
            role="img"
            aria-label="FOB Media"
          >
            <defs>
              <filter id="puffY" x="-10%" y="-10%" width="120%" height="125%" colorInterpolationFilters="sRGB">
                <feGaussianBlur in="SourceAlpha" stdDeviation="13" result="h" />
                <feDiffuseLighting in="h" surfaceScale="9" diffuseConstant="1.15" lightingColor="#ffd600" result="d">
                  <feDistantLight azimuth="235" elevation="52" />
                </feDiffuseLighting>
                <feSpecularLighting in="h" surfaceScale="9" specularConstant=".45" specularExponent="34" lightingColor="#fff4b0" result="s">
                  <feDistantLight azimuth="235" elevation="55" />
                </feSpecularLighting>
                <feComposite in="d" in2="SourceAlpha" operator="in" result="dIn" />
                <feComposite in="s" in2="SourceAlpha" operator="in" result="sIn" />
                <feComposite in="dIn" in2="sIn" operator="arithmetic" k1="0" k2="1" k3=".6" k4="0" />
              </filter>
              <filter id="puffK" x="-10%" y="-10%" width="120%" height="125%" colorInterpolationFilters="sRGB">
                <feGaussianBlur in="SourceAlpha" stdDeviation="9" result="h" />
                <feDiffuseLighting in="h" surfaceScale="8" diffuseConstant=".5" lightingColor="#4a4a4a" result="d">
                  <feDistantLight azimuth="235" elevation="50" />
                </feDiffuseLighting>
                <feSpecularLighting in="h" surfaceScale="8" specularConstant=".4" specularExponent="30" lightingColor="#ffffff" result="s">
                  <feDistantLight azimuth="235" elevation="52" />
                </feSpecularLighting>
                <feComposite in="d" in2="SourceAlpha" operator="in" result="dIn" />
                <feComposite in="s" in2="SourceAlpha" operator="in" result="sIn" />
                <feComposite in="dIn" in2="sIn" operator="arithmetic" k1="0" k2="1" k3=".55" k4="0" />
              </filter>
            </defs>
            <text
              x="450" y="330" textAnchor="middle" fontSize="360" letterSpacing="-8"
              fontWeight="700" fill="#000" filter="url(#puffY)"
              style={{ fontFamily: fredoka.style.fontFamily }}
            >
              fob
            </text>
            <text
              x="450" y="500" textAnchor="middle" fontSize="205" letterSpacing="-6"
              fontWeight="700" fill="#000" filter="url(#puffK)"
              style={{ fontFamily: fredoka.style.fontFamily }}
            >
              media
            </text>
          </svg>
        </div>
      </div>

      <style jsx global>{`
        .fob-hero{--fob-nav:88px;position:relative;min-height:100svh;display:flex;flex-direction:column;overflow:hidden;
          background:radial-gradient(60% 40% at 50% 92%,rgba(255,214,0,.28),transparent 70%),#f6f5f2;color:#111}
        /* grid + place-items centers the logo in the space below the navbar, both ways */
        .fob-stage{position:relative;flex:1;display:grid;place-items:center;
          padding:var(--fob-nav) clamp(12px,4vw,56px) 24px}
        .fob-float{width:min(74vw,860px,calc((100svh - var(--fob-nav)) * 1.45));animation:fobFloat 6s ease-in-out infinite}
        .fob-logo3d{display:block;width:100%;height:auto;overflow:visible;will-change:transform}
        @keyframes fobFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
        .fob-side{position:absolute;z-index:3;margin:0;font-weight:700;font-size:12px;letter-spacing:.14em;line-height:1.65;text-transform:uppercase}
        .fob-l{left:clamp(18px,4vw,56px);top:30%}
        .fob-r{right:clamp(18px,4vw,56px);top:26%}
        .fob-side hr{border:0;border-top:1px solid #cfcdc6;width:70px;margin:12px 0 0}
        .fob-arrow{position:absolute;z-index:3;fill:none;stroke:#111;stroke-width:1.4;stroke-linecap:round;stroke-linejoin:round;width:110px;top:44%}
        .fob-al{left:5%}.fob-ar{right:5%}
        .fob-spark{position:absolute;z-index:3;left:56%;top:calc(var(--fob-nav) + 4%);width:26px;fill:#111}
        .fob-pill{position:absolute;z-index:6;font-weight:700;font-size:12px;letter-spacing:.12em;padding:12px 24px;border-radius:999px;text-transform:uppercase;box-shadow:0 14px 30px rgba(0,0,0,.14)}
        .fob-y{left:12%;bottom:15%;background:#ffd600;transform:rotate(-8deg)}
        .fob-w{right:11%;bottom:20%;background:#fff;transform:rotate(6deg)}
        @media (max-width:820px){
          .fob-hero{--fob-nav:72px}
          .fob-side{font-size:10px;top:18%}
          .fob-arrow{display:none}
          .fob-float{width:94vw}
          .fob-y{left:6%;bottom:12%}.fob-w{right:6%;bottom:16%}
        }
        @media (prefers-reduced-motion:reduce){.fob-float{animation:none}}
      `}</style>
    </section>
  );
}

export { Hero as FobHero };
export default Hero;