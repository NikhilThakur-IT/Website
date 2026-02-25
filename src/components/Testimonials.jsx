import React, { useRef, useLayoutEffect, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
    {
        quote: "I kept putting off learning AI tools because every course felt the same, 40 hours of theory, 2 hours of anything useful. OpportuneAI was the first place where I actually shipped something on day two. Got promoted four months later. My manager still thinks I hired a junior.",
        name: "Lauren M.",
        role: "Product Manager · Fintech",
        detail: "Member since Jan 2026",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
        quote: "Landed my first $3.4k automation client three weeks after joining. I'm not even going to pretend I knew what I was doing. I basically reverse-engineered a workflow from a thread in the community and pitched it. Nobody told me it was that simple to just start.",
        name: "James R.",
        role: "English Teacher (Now Freelance Developer)",
        detail: "Member since Nov 2025",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
        quote: "I almost spent $800 on a tool that someone here talked me out of in about four messages. The community isn't just motivational fluff. People will tell you when you're wrong, and that's honestly rarer than it sounds.",
        name: "Sarah K.",
        role: "Marketing Director · SaaS",
        detail: "Member since Feb 2025",
        avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    },
    {
        quote: "Took me longer than I expected to transition out of teaching — about eight months, not three. But I'm now consulting on AI curriculum for two schools and making more than I ever did in a classroom. Still check the digest every Monday without fail.",
        name: "Daniel O.",
        role: "Math Teacher",
        detail: "Member since Aug 2025",
        avatar: "https://randomuser.me/api/portraits/men/75.jpg",
    },
    {
        quote: "The prompting guide alone was worth it. Not the 'act as a CEO' stuff, there were actual structured prompting for engineering workflows. I sent it to my whole team. We cut sprint planning from three hours to forty minutes.",
        name: "Marcus T.",
        role: "Senior Software Engineer",
        detail: "Member since Mar 2025",
        avatar: "https://randomuser.me/api/portraits/men/46.jpg",
    },
];

export default function Testimonials() {
    const [current, setCurrent] = useState(0);
    const comp = useRef(null);
    const trackRef = useRef(null);
    const firstCardRef = useRef(null);
    const isDragging = useRef(false);
    const dragStartX = useRef(0);
    const dragStartOffset = useRef(0);

    const getCardStep = () => {
        if (!firstCardRef.current) return 504;
        return firstCardRef.current.offsetWidth + 24;
    };

    const slideTo = useCallback((index) => {
        const clamped = Math.max(0, Math.min(index, testimonials.length - 1));
        setCurrent(clamped);
        gsap.to(trackRef.current, {
            x: -(clamped * getCardStep()),
            duration: 0.65,
            ease: 'power3.out',
        });
    }, []);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.testi-header', {
                scrollTrigger: { trigger: comp.current, start: 'top 72%' },
                y: 30,
                opacity: 0,
                duration: 1,
                ease: 'power3.out',
            });
            gsap.from('.testi-card', {
                scrollTrigger: { trigger: comp.current, start: 'top 65%' },
                x: 50,
                opacity: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: 'power3.out',
            });
        }, comp);
        return () => ctx.revert();
    }, []);

    const onMouseDown = (e) => {
        isDragging.current = true;
        dragStartX.current = e.clientX;
        dragStartOffset.current = Number(gsap.getProperty(trackRef.current, 'x')) || 0;
        e.preventDefault();
    };

    const onMouseMove = (e) => {
        if (!isDragging.current) return;
        const delta = e.clientX - dragStartX.current;
        gsap.set(trackRef.current, { x: dragStartOffset.current + delta });
    };

    const onMouseUp = (e) => {
        if (!isDragging.current) return;
        isDragging.current = false;
        const delta = e.clientX - dragStartX.current;
        if (delta < -60) slideTo(current + 1);
        else if (delta > 60) slideTo(current - 1);
        else slideTo(current);
    };

    const onTouchStart = (e) => {
        dragStartX.current = e.touches[0].clientX;
        dragStartOffset.current = Number(gsap.getProperty(trackRef.current, 'x')) || 0;
    };

    const onTouchEnd = (e) => {
        const delta = e.changedTouches[0].clientX - dragStartX.current;
        if (delta < -50) slideTo(current + 1);
        else if (delta > 50) slideTo(current - 1);
        else slideTo(current);
    };

    return (
        <section ref={comp} id="testimonials" className="py-32 bg-obsidian overflow-hidden selection:bg-champagne/20">
            <div className="max-w-7xl mx-auto px-6 md:px-12">

                {/* Header row */}
                <div className="testi-header flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
                    <div>
                        <p className="font-mono text-xs tracking-widest text-champagne/50 uppercase mb-3">
                            — Members
                        </p>
                        <h2 className="font-inter font-bold text-4xl md:text-5xl text-ivory tracking-tight leading-none">
                            From the community.
                        </h2>
                        <p className="font-playfair italic text-ivory/40 text-xl mt-3">
                            Unfiltered. Unsolicited. Real.
                        </p>
                    </div>

                    {/* Desktop nav arrows */}
                    <div className="hidden md:flex items-center gap-3">
                        <button
                            onClick={() => slideTo(current - 1)}
                            disabled={current === 0}
                            aria-label="Previous testimonial"
                            className="group w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-ivory/40 hover:border-champagne/40 hover:text-champagne disabled:opacity-20 disabled:cursor-not-allowed transition-all duration-300"
                        >
                            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M15 18l-6-6 6-6" />
                            </svg>
                        </button>
                        <button
                            onClick={() => slideTo(current + 1)}
                            disabled={current === testimonials.length - 1}
                            aria-label="Next testimonial"
                            className="group w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-ivory/40 hover:border-champagne/40 hover:text-champagne disabled:opacity-20 disabled:cursor-not-allowed transition-all duration-300"
                        >
                            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M9 18l6-6-6-6" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Draggable track wrapper */}
                <div
                    className="cursor-grab active:cursor-grabbing select-none"
                    onMouseDown={onMouseDown}
                    onMouseMove={onMouseMove}
                    onMouseUp={onMouseUp}
                    onMouseLeave={onMouseUp}
                    onTouchStart={onTouchStart}
                    onTouchEnd={onTouchEnd}
                >
                    <div
                        ref={trackRef}
                        className="flex gap-6"
                        style={{ width: 'max-content' }}
                    >
                        {testimonials.map((t, i) => (
                            <div
                                key={i}
                                ref={i === 0 ? firstCardRef : null}
                                className="testi-card relative flex flex-col justify-between bg-white/[0.04] border border-white/[0.07] rounded-[2rem] p-8 md:p-10 shrink-0"
                                style={{ width: 'min(480px, 82vw)', minHeight: '260px' }}
                            >
                                {/* Decorative open quote */}
                                <span
                                    className="absolute top-2 right-7 font-playfair text-[8rem] leading-none text-champagne/[0.08] pointer-events-none select-none"
                                    aria-hidden="true"
                                >
                                    "
                                </span>

                                <blockquote className="relative z-10 font-playfair italic text-[1.1rem] md:text-[1.2rem] leading-relaxed text-ivory/80">
                                    "{t.quote}"
                                </blockquote>

                                <footer className="mt-8 pt-6 border-t border-white/[0.07] flex items-center justify-between gap-4">
                                    <div className="flex items-center gap-3">
                                        <img
                                            src={t.avatar}
                                            alt={t.name}
                                            className="w-10 h-10 rounded-full object-cover ring-2 ring-white/10 shrink-0"
                                        />
                                        <div>
                                            <p className="font-inter font-semibold text-ivory text-sm tracking-tight">
                                                {t.name}
                                            </p>
                                            <p className="font-mono text-[0.65rem] text-champagne/60 uppercase tracking-widest mt-0.5">
                                                {t.role}
                                            </p>
                                        </div>
                                    </div>
                                    <span className="font-mono text-[0.6rem] text-ivory/20 uppercase tracking-wide whitespace-nowrap">
                                        {t.detail}
                                    </span>
                                </footer>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Progress bar + counter */}
                <div className="mt-10 flex items-center gap-5">
                    <div className="flex-1 h-px bg-white/[0.08] relative overflow-hidden rounded-full">
                        <div
                            className="absolute inset-y-0 left-0 bg-champagne rounded-full transition-all duration-700 ease-out"
                            style={{ width: `${((current + 1) / testimonials.length) * 100}%` }}
                        />
                    </div>
                    <span className="font-mono text-xs text-ivory/25 tabular-nums tracking-widest">
                        {String(current + 1).padStart(2, '0')} / {String(testimonials.length).padStart(2, '0')}
                    </span>
                </div>

                {/* Mobile nav arrows */}
                <div className="flex md:hidden items-center gap-3 mt-6">
                    <button
                        onClick={() => slideTo(current - 1)}
                        disabled={current === 0}
                        aria-label="Previous"
                        className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-ivory/40 hover:border-champagne/40 hover:text-champagne disabled:opacity-20 transition-all"
                    >
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M15 18l-6-6 6-6" />
                        </svg>
                    </button>
                    <button
                        onClick={() => slideTo(current + 1)}
                        disabled={current === testimonials.length - 1}
                        aria-label="Next"
                        className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-ivory/40 hover:border-champagne/40 hover:text-champagne disabled:opacity-20 transition-all"
                    >
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M9 18l6-6-6-6" />
                        </svg>
                    </button>
                </div>

            </div>
        </section>
    );
}
