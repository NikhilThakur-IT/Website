import React, { useState, useRef, useLayoutEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { gsap } from "gsap";

// ─── Formspree ────────────────────────────────────────────────────────────────
// 1. Go to https://formspree.io → New Form → copy your endpoint ID
// 2. Replace "YOUR_FORM_ID" below with it (e.g. "xpwzgkqr")
const FORMSPREE_ENDPOINT = "https://formspree.io/f/mzdaogwo";
// ─────────────────────────────────────────────────────────────────────────────

const INTEREST_OPTIONS = [
    { value: "waitlist", label: "Join the Performance Workshop waitlist" },
    { value: "partners", label: "Explore an Enterprise Partnership" },
];

export default function FormPage() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const comp = useRef(null);

    const initialInterest = searchParams.get("type") === "partners" ? "partners" : "waitlist";

    const [form, setForm] = useState({
        name: "",
        email: "",
        interest: initialInterest,
        role: "",
        message: "",
    });
    const [status, setStatus] = useState("idle"); // idle | loading | success | error

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".form-el", {
                y: 36,
                opacity: 0,
                duration: 0.9,
                stagger: 0.1,
                ease: "power3.out",
            });
        }, comp);
        return () => ctx.revert();
    }, []);

    function handleChange(e) {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setStatus("loading");

        try {
            const res = await fetch(FORMSPREE_ENDPOINT, {
                method: "POST",
                headers: { "Content-Type": "application/json", Accept: "application/json" },
                body: JSON.stringify({
                    name: form.name,
                    email: form.email,
                    interest: INTEREST_OPTIONS.find((o) => o.value === form.interest)?.label,
                    role: form.role,
                    message: form.message,
                }),
            });

            if (res.ok) {
                setStatus("success");
            } else {
                setStatus("error");
            }
        } catch {
            setStatus("error");
        }
    }

    const isWaitlist = form.interest === "waitlist";
    const isLoading = status === "loading";

    return (
        <div
            ref={comp}
            className="min-h-screen bg-obsidian flex flex-col selection:bg-champagne/20"
            style={{
                background:
                    "radial-gradient(ellipse 70% 55% at 50% 0%, rgba(201,168,76,0.06) 0%, #0D0D12 60%)",
            }}
        >
            {/* Back nav */}
            <div className="form-el px-6 md:px-12 pt-8">
                <button
                    onClick={() => navigate("/")}
                    className="inline-flex items-center gap-2 font-mono text-xs tracking-widest text-champagne/50 uppercase hover:text-champagne transition-colors"
                >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M19 12H5M12 5l-7 7 7 7" />
                    </svg>
                    Back to OpportuneAI
                </button>
            </div>

            <div className="flex-1 flex items-center justify-center px-6 md:px-12 py-16">
                <div className="w-full max-w-lg">

                    {status === "success" ? (
                        <div className="text-center flex flex-col items-center gap-6">
                            <div className="w-16 h-16 rounded-full bg-champagne/10 border border-champagne/30 flex items-center justify-center">
                                <svg className="w-7 h-7 text-champagne" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h2 className="font-playfair italic text-5xl text-ivory">We got you.</h2>
                            <p className="font-inter text-ivory/50 text-base max-w-sm leading-relaxed">
                                {isWaitlist
                                    ? "You're on the list. We'll reach out when the next cohort opens."
                                    : "Thanks for reaching out. Our partnerships team will be in touch shortly."}
                            </p>
                            <button
                                onClick={() => navigate("/")}
                                className="btn-magnetic mt-4 bg-champagne/10 border border-champagne/30 text-champagne px-8 py-3 rounded-full font-inter font-semibold text-sm tracking-wide hover:bg-champagne hover:text-obsidian transition-colors"
                            >
                                <span>Back to Home</span>
                            </button>
                        </div>
                    ) : (
                        <>
                            {/* Header */}
                            <div className="form-el mb-10">
                                <p className="font-mono text-xs tracking-widest text-champagne/50 uppercase mb-4">
                                    — Get in touch
                                </p>
                                <h1 className="font-playfair italic font-medium text-5xl md:text-6xl text-ivory leading-tight mb-3">
                                    {isWaitlist ? "Reserve your seat." : "Let's build together."}
                                </h1>
                                <p className="font-inter text-ivory/40 text-base leading-relaxed">
                                    {isWaitlist
                                        ? "Spots are limited. Tell us a little about where you're headed."
                                        : "Serious about transformation at scale? Let's talk."}
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                                {/* Interest selector */}
                                <div className="form-el">
                                    <label className="block font-mono text-xs tracking-widest text-champagne/40 uppercase mb-3">
                                        I'm here to
                                    </label>
                                    <div className="grid grid-cols-1 gap-3">
                                        {INTEREST_OPTIONS.map((opt) => (
                                            <label
                                                key={opt.value}
                                                className={`flex items-center gap-4 px-5 py-4 rounded-2xl border cursor-pointer transition-all ${form.interest === opt.value
                                                    ? "border-champagne/60 bg-champagne/8"
                                                    : "border-white/8 bg-white/3 hover:border-white/20"
                                                    }`}
                                            >
                                                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${form.interest === opt.value
                                                    ? "border-champagne"
                                                    : "border-white/20"
                                                    }`}>
                                                    {form.interest === opt.value && (
                                                        <div className="w-2 h-2 rounded-full bg-champagne" />
                                                    )}
                                                </div>
                                                <input
                                                    type="radio"
                                                    name="interest"
                                                    value={opt.value}
                                                    checked={form.interest === opt.value}
                                                    onChange={handleChange}
                                                    className="sr-only"
                                                />
                                                <span className="font-inter text-sm text-ivory/70">
                                                    {opt.label}
                                                </span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Name */}
                                <div className="form-el">
                                    <label className="block font-mono text-xs tracking-widest text-champagne/40 uppercase mb-2">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={form.name}
                                        onChange={handleChange}
                                        required
                                        placeholder="Jane Smith"
                                        className="w-full bg-white/4 border border-white/8 rounded-xl px-5 py-4 font-inter text-sm text-ivory placeholder:text-ivory/20 focus:outline-none focus:border-champagne/50 transition-colors"
                                    />
                                </div>

                                {/* Email */}
                                <div className="form-el">
                                    <label className="block font-mono text-xs tracking-widest text-champagne/40 uppercase mb-2">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        required
                                        placeholder="jane@company.com"
                                        className="w-full bg-white/4 border border-white/8 rounded-xl px-5 py-4 font-inter text-sm text-ivory placeholder:text-ivory/20 focus:outline-none focus:border-champagne/50 transition-colors"
                                    />
                                </div>

                                {/* Role / Company */}
                                <div className="form-el">
                                    <label className="block font-mono text-xs tracking-widest text-champagne/40 uppercase mb-2">
                                        {isWaitlist ? "Current Role" : "Company & Role"}
                                    </label>
                                    <input
                                        type="text"
                                        name="role"
                                        value={form.role}
                                        onChange={handleChange}
                                        required
                                        placeholder={isWaitlist ? "e.g. Software Engineer at Acme" : "e.g. Head of L&D at Acme Corp"}
                                        className="w-full bg-white/4 border border-white/8 rounded-xl px-5 py-4 font-inter text-sm text-ivory placeholder:text-ivory/20 focus:outline-none focus:border-champagne/50 transition-colors"
                                    />
                                </div>

                                {/* Message */}
                                <div className="form-el">
                                    <label className="block font-mono text-xs tracking-widest text-champagne/40 uppercase mb-2">
                                        {isWaitlist ? "What do you want to build?" : "Tell us about your team"}
                                    </label>
                                    <textarea
                                        name="message"
                                        value={form.message}
                                        onChange={handleChange}
                                        rows={4}
                                        placeholder={isWaitlist
                                            ? "Share the project, skill, or outcome you're working toward…"
                                            : "Team size, current challenges, what success looks like for you…"}
                                        className="w-full bg-white/4 border border-white/8 rounded-xl px-5 py-4 font-inter text-sm text-ivory placeholder:text-ivory/20 focus:outline-none focus:border-champagne/50 transition-colors resize-none"
                                    />
                                </div>

                                {/* Error message */}
                                {status === "error" && (
                                    <p className="font-mono text-xs text-red-400/80 tracking-wide">
                                        Something went wrong. Please try again or email us directly.
                                    </p>
                                )}

                                <div className="form-el pt-2">
                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="btn-magnetic w-full bg-champagne text-obsidian py-5 rounded-full font-inter font-semibold tracking-wide text-sm shadow-[0_0_40px_rgba(201,168,76,0.15)] hover:shadow-[0_0_60px_rgba(201,168,76,0.3)] transition-shadow disabled:opacity-60 disabled:cursor-not-allowed"
                                    >
                                        <span>
                                            {isLoading
                                                ? "Sending…"
                                                : isWaitlist
                                                    ? "Join the Waiting List"
                                                    : "Contact Partners"}
                                        </span>
                                    </button>
                                </div>
                            </form>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
