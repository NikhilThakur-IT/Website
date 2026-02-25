import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Philosophy() {
    const comp = useRef(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            // Parallax Background
            gsap.to(".philosophy-bg", {
                yPercent: 20,
                ease: "none",
                scrollTrigger: {
                    trigger: comp.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true
                },
            });

            // Text Reveal
            gsap.from(".reveal-text", {
                scrollTrigger: {
                    trigger: comp.current,
                    start: "top 60%",
                },
                y: 40,
                opacity: 0,
                duration: 1,
                stagger: 0.2,
                ease: "power3.out"
            });

        }, comp);
        return () => ctx.revert();
    }, []);

    return (
        <section id="philosophy" ref={comp} className="relative w-full py-40 bg-obsidian overflow-hidden selection:bg-champagne/30">

            {/* Background Parallax Image */}
            <div className="absolute inset-0 z-0 overflow-hidden opacity-20 pointer-events-none">
                <img
                    src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2000&auto=format&fit=crop"
                    alt="Abstract dark texture"
                    className="philosophy-bg w-full h-[120%] object-cover -mt-[10%]"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-obsidian via-transparent to-obsidian"></div>
            </div>

            <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 text-center md:text-left flex flex-col gap-12 md:gap-24">

                <div className="reveal-text">
                    <p className="font-mono text-sm tracking-widest text-ivory/40 uppercase mb-4">
                        The Manifesto
                    </p>
                    <h2 className="font-inter font-medium text-2xl md:text-4xl text-ivory/70 max-w-3xl leading-snug">
                        Most platforms focus on: <span className="text-ivory">endless automated theory without human consequence.</span>
                    </h2>
                </div>

                <div className="reveal-text md:pl-24">
                    <h2 className="font-inter text-xl md:text-2xl text-ivory/60 mb-2">We focus on:</h2>
                    <div className="font-playfair italic font-medium text-5xl md:text-7xl lg:text-[7rem] leading-none text-ivory drop-shadow-2xl">
                        uncompromised <br />
                        <span className="text-champagne not-italic font-inter font-bold tracking-tighter">practical velocity.</span>
                    </div>
                </div>

            </div>
        </section>
    );
}
