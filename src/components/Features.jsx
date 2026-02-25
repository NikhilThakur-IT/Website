import React, { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MousePointer2, CircleDashed } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// --- Card 1: Diagnostic Shuffler ---
const diagnosticItems = [
    "Match: Industry Peer",
    "Event: Architect Round Table",
    "Message: Portfolio Review"
];

function CardShuffler() {
    const [items, setItems] = useState([0, 1, 2]);

    useEffect(() => {
        const interval = setInterval(() => {
            setItems(prev => {
                const next = [...prev];
                next.unshift(next.pop());
                return next;
            });
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative h-48 w-full flex items-center justify-center mt-6">
            {items.map((originalIndex, currentPos) => {
                const isTop = currentPos === 0;
                const scale = 1 - currentPos * 0.05;
                const translateY = currentPos * 16;
                const opacity = 1 - currentPos * 0.2;
                const zIndex = 10 - currentPos;

                return (
                    <div
                        key={originalIndex}
                        className="absolute w-full max-w-[240px] bg-slate/50 backdrop-blur-md border border-white/10 p-4 rounded-xl flex items-center gap-4 transition-all duration-700 shadow-xl"
                        style={{
                            transform: `translateY(${translateY}px) scale(${scale})`,
                            opacity,
                            zIndex,
                            transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
                        }}
                    >
                        <div className="w-8 h-8 rounded-full bg-champagne/20 flex items-center justify-center">
                            <div className="w-2 relative h-2 rounded-full bg-champagne animate-pulse"></div>
                        </div>
                        <span className="font-mono text-xs text-ivory/90 tracking-wider">
                            {diagnosticItems[originalIndex]}
                        </span>
                    </div>
                );
            })}
        </div>
    );
}

// --- Card 2: Telemetry Typewriter ---
const typeMessages = [
    "> Analyzing career trajectory...",
    "> Re-routing to Director track.",
    "> Skill gap detected: System Design.",
    "> Injecting practical coursework...",
    "> Optimizing portfolio output."
];

function CardTypewriter() {
    const [text, setText] = useState('');
    const [msgIndex, setMsgIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);

    useEffect(() => {
        let timeout;
        const currentMsg = typeMessages[msgIndex];
        if (charIndex < currentMsg.length) {
            timeout = setTimeout(() => {
                setText(prev => prev + currentMsg[charIndex]);
                setCharIndex(prev => prev + 1);
            }, Math.random() * 30 + 30);
        } else {
            timeout = setTimeout(() => {
                setText('');
                setCharIndex(0);
                setMsgIndex(prev => (prev + 1) % typeMessages.length);
            }, 2500);
        }
        return () => clearTimeout(timeout);
    }, [charIndex, msgIndex]);

    return (
        <div className="w-full mt-6 bg-obsidian border border-white/10 rounded-xl p-4 h-48 flex flex-col">
            <div className="flex items-center gap-2 mb-4 border-b border-white/10 pb-2">
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                <span className="font-mono text-[10px] text-ivory/50 uppercase tracking-widest">Live Feed</span>
            </div>
            <div className="font-mono text-sm text-champagne leading-relaxed whitespace-pre-wrap">
                {text}
                <span className="animate-pulse inline-block w-2 h-4 bg-champagne/70 ml-1 align-middle"></span>
            </div>
        </div>
    );
}

// --- Card 3: Cursor Protocol Scheduler ---
function CardScheduler() {
    const containerRef = useRef(null);
    const cursorRef = useRef(null);
    const dayRefs = useRef([]);
    const saveBtnRef = useRef(null);
    const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

    useEffect(() => {
        let ctx = gsap.context(() => {
            const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });

            // Target Wednesday (index 3)
            const targetDay = dayRefs.current[3];
            const saveBtn = saveBtnRef.current;

            if (!targetDay || !saveBtn || !cursorRef.current) return;

            // Reset
            gsap.set(cursorRef.current, { x: 200, y: 150, opacity: 0, scale: 1 });
            gsap.set(targetDay, { backgroundColor: 'transparent', color: '#FAF8F5' });

            // Move to Wednesday
            tl.to(cursorRef.current, {
                opacity: 1,
                duration: 0.3
            })
                .to(cursorRef.current, {
                    x: targetDay.offsetLeft + targetDay.offsetWidth / 2,
                    y: targetDay.offsetTop + targetDay.offsetHeight / 2,
                    duration: 1.2,
                    ease: "power2.inOut"
                })
                // Click simulation
                .to(cursorRef.current, { scale: 0.8, duration: 0.15 })
                .to(targetDay, { backgroundColor: '#C9A84C', color: '#0D0D12', duration: 0.1 }, "<")
                .to(cursorRef.current, { scale: 1, duration: 0.15 })
                // Move to Save
                .to(cursorRef.current, {
                    x: saveBtn.offsetLeft + saveBtn.offsetWidth / 2,
                    y: saveBtn.offsetTop + saveBtn.offsetHeight / 2,
                    duration: 1,
                    ease: "power2.inOut",
                    delay: 0.2
                })
                // Click Save
                .to(cursorRef.current, { scale: 0.8, duration: 0.15 })
                .to(saveBtn, { scale: 0.95, duration: 0.1 }, "<")
                .to(cursorRef.current, { scale: 1, duration: 0.15 })
                .to(saveBtn, { scale: 1, duration: 0.1 }, "<")
                // Fade out
                .to(cursorRef.current, { opacity: 0, duration: 0.4, delay: 0.5 });

        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="relative w-full mt-6 bg-slate/30 border border-white/5 rounded-xl p-5 h-48 overflow-hidden select-none">
            <p className="font-mono text-xs text-ivory/50 mb-3">Allocating AI curriculum...</p>

            <div className="grid grid-cols-7 gap-1 flex-1">
                {days.map((day, i) => (
                    <div
                        key={i}
                        ref={el => dayRefs.current[i] = el}
                        className="aspect-square flex items-center justify-center rounded-md font-mono text-sm border border-white/5 transition-colors"
                    >
                        {day}
                    </div>
                ))}
            </div>

            <div className="absolute bottom-5 right-5">
                <button ref={saveBtnRef} className="bg-white/10 text-ivory/80 px-4 py-1.5 rounded-full font-mono text-xs tracking-wide">
                    Commit Time
                </button>
            </div>

            {/* SVG Cursor */}
            <div ref={cursorRef} className="absolute top-0 left-0 w-6 h-6 z-20 pointer-events-none drop-shadow-xl text-ivory origin-top-left flex items-start justify-start">
                <MousePointer2 className="w-5 h-5 fill-obsidian stroke-ivory stroke-2" />
            </div>
        </div>
    );
}

// --- Main Section ---
export default function Features() {
    const sectionRef = useRef(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            gsap.from(".feature-card", {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 75%",
                },
                y: 60,
                opacity: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: "power2.out"
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section id="features" ref={sectionRef} className="py-32 px-6 md:px-12 lg:px-24 bg-obsidian relative z-20 rounded-t-[3rem] -mt-8 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
            <div className="max-w-7xl mx-auto">

                <div className="mb-20 max-w-2xl">
                    <h2 className="text-3xl md:text-5xl font-inter font-bold tracking-tight text-ivory mb-6">
                        Why Join ?
                    </h2>
                    <p className="font-playfair italic text-xl md:text-2xl text-ivory/60">
                        Three Value Propositions:
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    {/* Card 1 */}
                    <div className="feature-card bg-slate/20 rounded-[2rem] p-8 border border-white/5 shadow-lg relative overflow-hidden flex flex-col justify-between">
                        <div className="relative z-10">
                            <h3 className="text-xl font-inter font-bold text-ivory tracking-tight">Practical Career Development</h3>
                            <p className="text-sm text-ivory/60 mt-3 leading-relaxed">
                                Build a portfolio of AI projects, get mentorship, and land real opportunities.
                            </p>
                        </div>
                        <CardShuffler />
                    </div>

                    {/* Card 2 */}
                    <div className="feature-card bg-slate/20 rounded-[2rem] p-8 border border-white/5 shadow-lg relative overflow-hidden flex flex-col justify-between">
                        <div className="relative z-10">
                            <h3 className="text-xl font-inter font-bold text-ivory tracking-tight">Curated AI Learning Resources</h3>
                            <p className="text-sm text-ivory/60 mt-3 leading-relaxed">
                                Access hand-picked tutorials, courses, and workshops—no outdated material.
                            </p>
                        </div>
                        <CardTypewriter />
                    </div>

                    {/* Card 3 */}
                    <div className="feature-card bg-slate/20 rounded-[2rem] p-8 border border-white/5 shadow-lg relative overflow-hidden flex flex-col justify-between">
                        <div className="relative z-10">
                            <h3 className="text-xl font-inter font-bold text-ivory tracking-tight">Collaborative Network</h3>
                            <p className="text-sm text-ivory/60 mt-3 leading-relaxed">
                                Connect with like-minded learners, collaborate on projects, and grow together.
                            </p>
                        </div>
                        <CardScheduler />
                    </div>

                </div>
            </div>
        </section>
    );
}
