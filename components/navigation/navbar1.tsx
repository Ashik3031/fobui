'use client';

import React, { useState, useEffect } from 'react';
import { MAIN_NAV_ITEMS } from '@/data/navigation';
import { FobLogo } from '@/components/ui/FobLogo';
import { useTransition } from '@/components/motion/TransitionProvider';
import { MobileMenu } from './MobileMenu';

export function Navbar() {
    const transition = useTransition();
    const [theme, setTheme] = useState<'light' | 'dark'>('light'); // 'light' means light/yellow bg -> dark text; 'dark' means dark bg -> white text
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [hoveredNav, setHoveredNav] = useState<string | null>(null);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            setIsScrolled(scrollY > 30);

            // Detect background under navbar
            const sections = document.querySelectorAll<HTMLElement>('[data-nav-theme]');
            let currentTheme: 'light' | 'dark' = 'light';

            sections.forEach((section) => {
                const rect = section.getBoundingClientRect();
                // Check if section intersects the top 70px of the viewport
                if (rect.top <= 70 && rect.bottom >= 70) {
                    const themeAttr = section.getAttribute('data-nav-theme');
                    if (themeAttr === 'dark') {
                        currentTheme = 'dark';
                    } else {
                        currentTheme = 'light';
                    }
                }
            });

            setTheme(currentTheme);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const isDarkContent = theme === 'light'; // dark text/logo on light/yellow background
    const textColor = isDarkContent ? 'text-[#050505]' : 'text-[#F7F7F5]';
    const logoColor = isDarkContent ? 'black' : 'white';

    const navbarBg = isScrolled
        ? isDarkContent
            ? 'bg-[#F7F7F5]/85 backdrop-blur-md border-b border-[#050505]/10'
            : 'bg-[#050505]/85 backdrop-blur-md border-b border-white/10'
        : 'bg-transparent';

    return (
        <>
            <header
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navbarBg}`}
                role="banner"
            >
                <div className="max-w-[1720px] mx-auto px-6 sm:px-10 md:px-14 h-20 md:h-24 flex items-center justify-between">
                    {/* Brand Logo */}
                    <div className="flex items-center">
                        <FobLogo
                            color={logoColor}
                            width={140}
                            height={99}
                            priority
                            className="h-9 md:h-11 w-auto transition-opacity duration-300 hover:opacity-80"
                        />
                    </div>

                    {/* Desktop Navigation Links */}
                    <nav
                        className="hidden lg:flex items-center gap-8 xl:gap-11"
                        aria-label="Main Navigation"
                    >
                        {MAIN_NAV_ITEMS.map((item) => (
                            <a
                                key={item.id}
                                href={item.href}
                                onClick={(e) => {
                                    e.preventDefault();
                                    transition(item.href, item.label);
                                }}
                                onMouseEnter={() => setHoveredNav(item.id)}
                                onMouseLeave={() => setHoveredNav(null)}
                                className={`relative py-2 text-xs tracking-[0.2em] font-extrabold uppercase transition-colors duration-200 ${textColor} group cursor-pointer`}
                            >
                                <span className="relative z-10 block transition-transform duration-200 group-hover:-translate-y-0.5">
                                    {item.label}
                                </span>
                                {/* Minimal editorial underline indicator */}
                                <span
                                    className={`absolute left-0 bottom-0 h-[1.5px] transition-all duration-300 ease-out ${hoveredNav === item.id
                                            ? 'w-full opacity-100'
                                            : 'w-0 opacity-0'
                                        } ${isDarkContent ? 'bg-[#050505]' : 'bg-[#FFD600]'}`}
                                />
                            </a>
                        ))}
                    </nav>

                    {/* Desktop CTA & Mobile Toggle */}
                    <div className="flex items-center gap-6">
                        <a
                            href="#contact"
                            onClick={(e) => {
                                e.preventDefault();
                                transition('#contact', "LET'S TALK");
                            }}
                            className={`hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-mono text-xs tracking-[0.16em] font-bold uppercase transition-all duration-300 shadow-xs group cursor-pointer ${isDarkContent
                                    ? 'bg-[#111111] text-white hover:bg-[#FFD600] hover:text-[#111111]'
                                    : 'bg-[#FFD600] text-[#050505] hover:bg-white hover:text-[#050505]'
                                }`}
                            aria-label="Contact FOB Media"
                        >
                            <span>LET&apos;S TALK</span>
                            <span className="text-sm transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                                ↗
                            </span>
                        </a>

                        {/* Mobile / Tablet Menu Button */}
                        <button
                            type="button"
                            onClick={() => setIsMobileMenuOpen(true)}
                            className={`lg:hidden flex items-center gap-2 px-3 py-2 font-mono text-xs font-bold tracking-widest uppercase transition-colors ${textColor} hover:opacity-75 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD600]`}
                            aria-label="Open Navigation Menu"
                            aria-expanded={isMobileMenuOpen}
                        >
                            <span>MENU</span>
                            <span className="w-5 flex flex-col gap-1 items-end">
                                <span
                                    className={`block h-[2px] w-5 ${isDarkContent ? 'bg-[#050505]' : 'bg-[#F7F7F5]'
                                        }`}
                                />
                                <span
                                    className={`block h-[2px] w-3 ${isDarkContent ? 'bg-[#050505]' : 'bg-[#FFD600]'
                                        }`}
                                />
                            </span>
                        </button>
                    </div>
                </div>
            </header>

            {/* Full-screen Mobile Menu */}
            <MobileMenu
                isOpen={isMobileMenuOpen}
                onClose={() => setIsMobileMenuOpen(false)}
            />
        </>
    );
}
