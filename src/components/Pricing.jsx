import React from 'react';

const tiers = [
    {
        name: "Performance",
        price: "$2,000",
        period: "/ workshop",
        description: "Intensive 4-week structured AI engineering sprints.",
        features: ["Project-based curriculum", "1:1 Architecture reviews", "Portfolio engineering", "Priority networking"],
        primary: false,
        cta: "Join the Waiting List"
    },
    {
        name: "Community",
        price: "Free",
        period: "forever",
        description: "Access to the digital lounge and member directory.",
        features: ["Skool Community Access", "Weekly digest", "Community events"],
        primary: true,
        cta: "Join the Club",
        href: "#join-club"
    },
    {
        name: "Enterprise",
        price: "Custom",
        period: "engagement",
        description: "Private workshops designed for organizational transformation.",
        features: ["Custom tailored curriculum", "On-site delivery", "Executive alignment", "Dedicated cohort lead"],
        primary: false,
        cta: "Contact Partners"
    }
];

export default function Pricing() {
    return (
        <section id="pricing" className="py-32 px-6 md:px-12 bg-ivory">
            <div className="max-w-7xl mx-auto">

                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-5xl font-inter font-bold tracking-tight text-obsidian mb-4">
                        Membership & Access
                    </h2>
                    <p className="font-playfair italic text-xl text-slate max-w-xl mx-auto">
                        Select the tier that aligns with your trajectory.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                    {tiers.map((tier, index) => (
                        <div
                            key={index}
                            className={`p-8 rounded-[2.5rem] flex flex-col h-full border ${tier.primary
                                ? 'bg-obsidian border-white/10 text-ivory shadow-[0_20px_50px_rgba(0,0,0,0.3)] md:-translate-y-4'
                                : 'bg-[#F2F0E9] border-obsidian/5 text-slate'
                                }`}
                        >
                            <div className="mb-8">
                                <h3 className="font-inter font-bold text-2xl tracking-tighter mb-2">{tier.name}</h3>
                                <p className={`text-sm ${tier.primary ? 'text-ivory/60' : 'text-slate/70'}`}>
                                    {tier.description}
                                </p>
                            </div>

                            <div className="mb-8 border-b pb-8 border-opacity-10 border-current">
                                <div className="flex items-baseline gap-2">
                                    <span className={`text-4xl font-inter font-bold tracking-tight ${tier.primary ? 'text-champagne' : 'text-obsidian'}`}>
                                        {tier.price}
                                    </span>
                                    {tier.price !== 'Custom' && tier.price !== 'Free' && (
                                        <span className="font-mono text-xs uppercase tracking-widest text-current opacity-60">
                                            {tier.period}
                                        </span>
                                    )}
                                </div>
                            </div>

                            <ul className="flex-1 flex flex-col gap-4 mb-10">
                                {tier.features.map((feature, i) => (
                                    <li key={i} className="flex items-center gap-3">
                                        <svg className={`w-4 h-4 shrink-0 ${tier.primary ? 'text-champagne' : 'text-obsidian/40'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span className={`text-sm tracking-wide ${tier.primary ? 'text-ivory/80' : 'text-slate/80'}`}>
                                            {feature}
                                        </span>
                                    </li>
                                ))}
                            </ul>

                            {tier.href ? (
                                <a href={tier.href} className={`btn-magnetic w-full flex items-center justify-center py-4 rounded-full font-bold tracking-wide text-sm transition-all ${tier.primary
                                    ? 'bg-champagne text-obsidian shadow-[0_0_20px_rgba(201,168,76,0.2)]'
                                    : 'bg-obsidian/5 text-obsidian hover:bg-obsidian hover:text-ivory'
                                    }`}>
                                    <span>{tier.cta}</span>
                                </a>
                            ) : (
                                <button className={`btn-magnetic w-full py-4 rounded-full font-bold tracking-wide text-sm transition-all ${tier.primary
                                    ? 'bg-champagne text-obsidian shadow-[0_0_20px_rgba(201,168,76,0.2)]'
                                    : 'bg-obsidian/5 text-obsidian hover:bg-obsidian hover:text-ivory'
                                    }`}>
                                    <span>{tier.cta}</span>
                                </button>
                            )}
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
