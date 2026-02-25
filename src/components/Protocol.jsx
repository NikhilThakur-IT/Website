import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const protocolSteps = [
    {
        step: "01",
        title: "Diagnostic Assembly",
        description: "Your background, gaps, and targets are evaluated to map a precise upskilling trajectory.",
    },
    {
        step: "02",
        title: "Vector Execution",
        description: "High-intensity workshops and curated resources bridge your theoretical knowledge to practical reality.",
    },
    {
        step: "03",
        title: "Network Synchronization",
        description: "Integration into a curated ecosystem of professionals pushing the boundaries of AI.",
    }
];

export default function Protocol() {
    const containerRef = useRef(null);
    const cardsRef = useRef([]);

    useEffect(() => {
        let ctx = gsap.context(() => {

            const cards = gsap.utils.toArray('.protocol-card');

            cards.forEach((card, index) => {
                if (index === cards.length - 1) return; // Last card doesn't stack away

                ScrollTrigger.create({
                    trigger: card,
                    start: "top top",
                    end: () => `+=${window.innerHeight}`,
                    pin: true,
                    pinSpacing: false,
                    animation: gsap.to(card, {
                        scale: 0.9,
                        opacity: 0.4,
                        filter: "blur(20px)",
                        ease: "none"
                    }),
                    scrub: true,
                });
            });

            // SVG Animations
            // Card 1: Rotating Concentric
            gsap.to(".spin-fast", { rotation: 360, duration: 10, repeat: -1, ease: "linear", transformOrigin: "50% 50%" });
            gsap.to(".spin-slow", { rotation: -360, duration: 20, repeat: -1, ease: "linear", transformOrigin: "50% 50%" });

            // Card 2: Laser Scan
            gsap.to(".laser-line", { y: 200, duration: 2, repeat: -1, yoyo: true, ease: "power1.inOut" });

            // Card 3: EKG Pulse
            gsap.to(".ekg-path", { strokeDashoffset: 0, duration: 2, repeat: -1, ease: "power1.inOut" });

        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section id="protocol" ref={containerRef} className="relative w-full bg-obsidian pb-32 pt-20">
            <div className="text-center mb-24 max-w-2xl mx-auto px-6">
                <h2 className="text-ivory font-playfair italic text-4xl md:text-6xl drop-shadow-lg">
                    The <span className="font-inter font-bold not-italic">Protocol.</span>
                </h2>
                <p className="mt-4 text-ivory/60 font-mono text-sm tracking-widest uppercase">Systematic Ascension</p>
            </div>

            <div className="relative w-full max-w-5xl mx-auto px-4 md:px-8 h-[300vh]">
                {protocolSteps.map((item, index) => (
                    <div
                        key={index}
                        ref={el => cardsRef.current[index] = el}
                        className="protocol-card absolute top-0 left-0 w-full h-[80vh] bg-slate/30 backdrop-blur-3xl border border-white/5 rounded-[3rem] p-8 md:p-16 flex flex-col md:flex-row items-center gap-12 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] origin-top"
                        style={{
                            zIndex: protocolSteps.length - index,
                            marginTop: `${index * 40}px`
                        }}
                    >
                        {/* Visual Assembly */}
                        <div className="w-full md:w-1/2 h-full min-h-[300px] flex items-center justify-center relative bg-obsidian/50 rounded-[2rem] border border-white/5 overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-ivory/5 to-transparent"></div>

                            {/* Card 1 Visual */}
                            {index === 0 && (
                                <svg viewBox="0 0 200 200" className="w-48 h-48 opacity-80">
                                    <circle cx="100" cy="100" r="80" className="spin-slow stroke-white/10" strokeWidth="1" fill="none" strokeDasharray="4 8" />
                                    <circle cx="100" cy="100" r="60" className="spin-fast stroke-champagne/40" strokeWidth="2" fill="none" strokeDasharray="20 10" />
                                    <circle cx="100" cy="100" r="40" className="spin-slow stroke-white/20" strokeWidth="1" fill="none" />
                                    <rect x="95" y="95" width="10" height="10" className="fill-champagne animate-pulse rounded-full" />
                                </svg>
                            )}

                            {/* Card 2 Visual */}
                            {index === 1 && (
                                <div className="relative w-full h-full p-8 hidden md:block">
                                    <svg className="w-full h-full opacity-60">
                                        <defs>
                                            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                                                <circle cx="2" cy="2" r="1.5" className="fill-white/10" />
                                            </pattern>
                                        </defs>
                                        <rect width="100%" height="100%" fill="url(#grid)" />
                                        {/* Laser line bounded */}
                                        <line x1="0" y1="0" x2="100%" y2="0" className="laser-line stroke-champagne drop-shadow-[0_0_8px_rgba(201,168,76,0.8)]" strokeWidth="2" />
                                    </svg>
                                </div>
                            )}

                            {/* Card 3 Visual */}
                            {index === 2 && (
                                <svg viewBox="0 0 400 100" className="w-full px-12 opacity-80 overflow-visible">
                                    <path
                                        className="ekg-path stroke-champagne"
                                        d="M 0 50 L 50 50 L 70 20 L 90 80 L 110 50 L 160 50 L 180 10 L 200 90 L 220 50 L 270 50 L 290 30 L 310 70 L 330 50 L 400 50"
                                        fill="none"
                                        strokeWidth="3"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeDasharray="1000"
                                        strokeDashoffset="1000"
                                        style={{ filter: 'drop-shadow(0 0 6px rgba(201,168,76,0.5))' }}
                                    />
                                </svg>
                            )}
                        </div>

                        {/* Text Content */}
                        <div className="w-full md:w-1/2 flex flex-col justify-center">
                            <span className="font-mono text-champagne text-xl md:text-2xl mb-4 tracking-tight drop-shadow-md">
                                [{item.step}]
                            </span>
                            <h3 className="text-3xl md:text-5xl font-inter font-bold text-ivory tracking-tighter mb-6 leading-none">
                                {item.title}
                            </h3>
                            <p className="text-ivory/60 font-inter text-lg leading-relaxed max-w-md">
                                {item.description}
                            </p>
                        </div>

                    </div>
                ))}
            </div>
        </section>
    );
}
