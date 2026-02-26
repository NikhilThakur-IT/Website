import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function Hero() {
    const comp = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline();

            tl.from(".hero-text", {
                y: 40,
                opacity: 0,
                duration: 1.2,
                stagger: 0.15,
                ease: "power3.out",
                delay: 0.2
            });

            tl.from(".hero-cta", {
                y: 20,
                opacity: 0,
                duration: 1,
                ease: "power3.out",
            }, "-=0.6");
        }, comp);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={comp} className="relative h-[100dvh] w-full overflow-hidden flex items-center justify-center">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1620825937374-87fc7d62828e?q=80&w=2000&auto=format&fit=crop"
                    alt=""
                    className="w-full h-full object-cover"
                />
                {/* Heavy Primary-to-Black Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-obsidian/60 via-obsidian/80 to-obsidian"></div>
                <div className="absolute inset-0 bg-obsidian/40"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 w-full px-6 flex flex-col items-center justify-center text-center">
                <div className="max-w-4xl flex flex-col items-center">
                    <h1 className="flex flex-col gap-2 items-center">
                        <span className="hero-text text-ivory/80 font-inter font-bold tracking-tight text-3xl md:text-5xl lg:text-6xl uppercase leading-none">
                            Upskilling meets
                        </span>
                        <span className="hero-text text-champagne font-playfair italic font-medium text-7xl md:text-9xl lg:text-[11rem] leading-[0.85] drop-shadow-2xl">
                            Precision.
                        </span>
                    </h1>

                    <p className="hero-text mt-8 text-ivory/70 font-inter max-w-xl text-lg md:text-xl font-light leading-relaxed">
                        A private members’ club offering practical career development, curated AI resources, and a collaborative network of AI enthusiasts.
                    </p>

                    <div className="hero-cta mt-12 flex flex-col items-center gap-6">
                        <button className="btn-magnetic bg-champagne text-obsidian px-8 py-4 rounded-full font-semibold tracking-wide text-lg shadow-[0_0_30px_rgba(201,168,76,0.2)] hover:shadow-[0_0_40px_rgba(201,168,76,0.4)]">
                            <span>I AM READY TO LEARN</span>
                        </button>
                        <span className="text-ivory/50 font-mono text-sm uppercase tracking-widest hidden md:inline-block">
                            Get Free Access Today
                        </span>

                        {/* Social proof */}
                        <div className="flex items-center gap-3">
                            {/* Overlapping avatars */}
                            <div className="flex -space-x-3">
                                {[
                                    "https://randomuser.me/api/portraits/women/44.jpg",
                                    "https://randomuser.me/api/portraits/men/32.jpg",
                                    "https://randomuser.me/api/portraits/women/68.jpg",
                                    "https://randomuser.me/api/portraits/men/75.jpg",
                                    "https://randomuser.me/api/portraits/men/46.jpg",
                                ].map((src, i) => (
                                    <img
                                        key={i}
                                        src={src}
                                        alt=""
                                        className="w-9 h-9 rounded-full border-2 border-obsidian object-cover"
                                    />
                                ))}
                            </div>
                            {/* Rating + label */}
                            <div className="flex flex-col items-start leading-tight">
                                <div className="flex items-center gap-1">
                                    <span className="text-champagne text-sm tracking-tight">★★★★★</span>
                                    <span className="text-ivory/80 font-mono text-xs">4.8</span>
                                </div>
                                <span className="text-ivory/50 font-mono text-xs tracking-wide">Join 65+ others</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
