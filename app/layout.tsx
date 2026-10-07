import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans, Inter, Inter_Tight } from 'next/font/google';
import './globals.css';
import { constructMetadata } from '@/lib/seo';
import { JsonLd } from '@/components/seo/JsonLd';
import { SmoothScroll } from '@/components/motion/SmoothScroll';
import { PageTransitionProvider } from '@/components/motion/PageTransition';
import { Navbar } from '@/components/navigation/Navbar';
import { Footer } from '@/components/footer/Footer';
import { IntroLoader } from '@/components/intro/IntroLoader';

// 1. Headings & Large Display: Wide / geometric grotesk, heavy weight (Graphik / Neue Haas / Söhne Display territory)
const headingFont = Plus_Jakarta_Sans({
  variable: '--font-heading',
  subsets: ['latin'],
  display: 'swap',
  weight: ['600', '700', '800'],
});

// 2. Body Text: Clean neutral sans-serif (Söhne / Helvetica Now / Inter territory)
const bodyFont = Inter({
  variable: '--font-body',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600'],
});

// 3. Navigation & Tech Labels: Compact sans-serif
const navFont = Inter_Tight({
  variable: '--font-nav',
  subsets: ['latin'],
  display: 'swap',
  weight: ['500', '600', '700', '800'],
});

export const metadata: Metadata = constructMetadata();

export const viewport: Viewport = {
  themeColor: '#FFD600',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${headingFont.variable} ${bodyFont.variable} ${navFont.variable}`}
    >
      <head>
        <JsonLd />
      </head>
      <body className="bg-[#050505] text-[#F7F7F5] font-sans antialiased selection:bg-[#FFD600] selection:text-[#050505]">
        {/* Accessible Skip Link */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-[9999] bg-[#FFD600] text-[#050505] px-4 py-2 font-mono text-xs font-bold uppercase tracking-widest border border-[#050505]"
        >
          Skip to main content
        </a>

        {/* First-visit Art-Directed Entry Loader */}
        <IntroLoader />

        {/* Global Page Transition and Smooth Scroll System */}
        <PageTransitionProvider>
          <SmoothScroll>
            <div className="relative min-h-screen flex flex-col justify-between">
              <Navbar />
              <main id="main-content" className="flex-1 focus:outline-none">
                {children}
              </main>
              <Footer />
            </div>
          </SmoothScroll>
        </PageTransitionProvider>
      </body>
    </html>
  );
}
