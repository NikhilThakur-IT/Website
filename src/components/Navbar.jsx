import React, { useEffect, useState } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
    return twMerge(clsx(inputs));
}

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-5xl">
            <div
                className={cn(
                    "flex items-center justify-between px-6 py-3 rounded-full transition-all duration-500 ease-out",
                    isScrolled
                        ? "bg-obsidian/80 backdrop-blur-xl border border-white/10 text-ivory shadow-2xl"
                        : "bg-transparent border border-transparent text-ivory"
                )}
            >
                <div className="flex items-center gap-2">
                    <span className="font-inter font-bold tracking-tight text-xl">OpportuneAI</span>
                </div>

                <div className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide">
                    <a href="#features" className="hover:-translate-y-[1px] transition-transform duration-300">Features</a>
                    <a href="#philosophy" className="hover:-translate-y-[1px] transition-transform duration-300">Philosophy</a>
                    <a href="#protocol" className="hover:-translate-y-[1px] transition-transform duration-300">Protocol</a>
                </div>

                <button className="btn-magnetic bg-champagne text-obsidian px-5 py-2 rounded-full text-sm font-semibold tracking-wide hover:shadow-[0_0_20px_rgba(201,168,76,0.3)] transition-all">
                    <span>Join the Club</span>
                </button>
            </div>
        </nav>
    );
}
