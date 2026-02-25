import React, { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CAL_LINK = 'https://cal.com/nik-thakur/quick-intro';

export default function BookCall() {
    const comp = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.book-content', {
                scrollTrigger: { trigger: comp.current, start: 'top 65%' },
                y: 40,
                opacity: 0,
                duration: 1,
                stagger: 0.15,
                ease: 'power3.out',
            });
        }, comp);
        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={comp}
            id="join-club"
            className="relative py-40 bg-obsidian overflow-hidden selection:bg-champagne/20"
        >
            {/* Subtle radial glow behind the text */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: 'radial-gradient(ellipse 60% 50% at 50% 60%, rgba(201,168,76,0.07) 0%, transparent 70%)',
                }}
            />

            <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 text-center flex flex-col items-center gap-8">

                <p className="book-content font-mono text-xs tracking-widest text-champagne/50 uppercase">
                    — Book a Session
                </p>

                <h2 className="book-content font-playfair italic font-medium text-6xl md:text-8xl lg:text-[7rem] leading-none text-ivory">
                    Let's talk.
                </h2>

                <p className="book-content font-inter text-ivory/50 text-lg md:text-xl max-w-md leading-relaxed">
                    30 minutes. No pitch. Just an honest conversation about where you want to go.
                </p>

                <div className="book-content flex flex-col items-center gap-4 mt-4">
                    <a
                        href={CAL_LINK}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-magnetic bg-champagne text-obsidian px-10 py-5 rounded-full font-inter font-semibold tracking-wide text-base shadow-[0_0_40px_rgba(201,168,76,0.15)] hover:shadow-[0_0_60px_rgba(201,168,76,0.3)] transition-shadow"
                    >
                        <span>Book a Free Intro Call</span>
                    </a>
                    <span className="font-mono text-xs text-ivory/20 uppercase tracking-widest">
                        Powered by Cal.com
                    </span>
                </div>

            </div>
        </section>
    );
}
