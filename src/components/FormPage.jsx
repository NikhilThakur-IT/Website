import React, { useState, useRef, useLayoutEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { gsap } from "gsap";

// ─── Formspree ────────────────────────────────────────────────────────────────
const FORMSPREE_ENDPOINT = "https://formspree.io/f/mzdaogwo";
// ─────────────────────────────────────────────────────────────────────────────

const INTEREST_OPTIONS = [
    { value: "waitlist", label: "Join the Performance Workshop waitlist" },
    { value: "partners", label: "Explore an Enterprise Partnership" },
];

// Rate limiting: max 3 submissions per hour stored in localStorage
const RATE_LIMIT_KEY = "oai_form_submissions";
const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;

function checkRateLimit() {
    try {
        const raw = localStorage.getItem(RATE_LIMIT_KEY);
        const timestamps = raw ? JSON.parse(raw) : [];
        const now = Date.now();
        const recent = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
        if (recent.length >= RATE_LIMIT_MAX) return false;
        recent.push(now);
        localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify(recent));
        return true;
    } catch {
        return true; // fail open if localStorage is unavailable
    }
}

function validateForm(form) {
    const errors = {};
    if (!form.name.trim() || form.name.trim().length < 2) {
        errors.name = "Please enter your full name.";
    }
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email.trim() || !emailRe.test(form.email.trim())) {
        errors.email = "Please enter a valid email address.";
    }
    if (!form.role.trim() || form.role.trim().length < 2) {
        errors.role = "Please enter your role.";
    }
    return errors;
}

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
        website: "", // honeypot field — must stay empty
    });
    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState("idle"); // idle | loading | success | error | ratelimit

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
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: undefined }));
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();

        // Honeypot — bots fill this hidden field; silently fake success
        if (form.website) {
            setStatus("success");
            return;
        }

        // Client-side validation
        const validationErrors = validateForm(form);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        // Rate limit check
        if (!checkRateLimit()) {
            setStatus("ratelimit");
            return;
        }

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
            <div className="form-el fixed top-5 left-5 z-50">
                <button
                    onClick={() => navigate("/")}
                    className="group flex items-center justify-center w-10 h-10 rounded-full text-champagne/50 hover:text-champagne transition-colors duration-200"
                    aria-label="Back to OpportuneAI"
                >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M19 12H5M12 5l-7 7 7 7" />
                    </svg>
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

                            {/* Next steps */}
                            <div className="w-full max-w-sm mt-2 border border-white/8 rounded-2xl bg-white/3 p-6 text-left flex flex-col gap-4">
                                <p className="font-mono text-xs tracking-widest text-champagne/50 uppercase">What happens next</p>
                                <div className="flex flex-col gap-3">
                                    <div className="flex items-start gap-3">
                                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-champagne/10 font-mono text-[10px] text-champagne">1</span>
                                        <p className="font-inter text-sm text-ivory/60">A confirmation email is on its way to your inbox.</p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-champagne/10 font-mono text-[10px] text-champagne">2</span>
                                        <p className="font-inter text-sm text-ivory/60">
                                            {isWaitlist
                                                ? "Our team will review your application within 48 hours."
                                                : "A partnerships lead will personally reach out within 24 hours."}
                                        </p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-champagne/10 font-mono text-[10px] text-champagne">3</span>
                                        <p className="font-inter text-sm text-ivory/60">
                                            {isWaitlist
                                                ? "If selected, you'll get onboarding details and community access."
                                                : "We'll schedule a discovery call tailored to your team's needs."}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={() => navigate("/")}
                                className="btn-magnetic mt-2 bg-champagne/10 border border-champagne/30 text-champagne px-8 py-3 rounded-full font-inter font-semibold text-sm tracking-wide hover:bg-champagne hover:text-obsidian transition-colors"
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

                            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">

                                {/* Honeypot — off-screen, invisible to real users, attracts bots */}
                                <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", height: 0, overflow: "hidden", opacity: 0 }}>
                                    <label htmlFor="hp_website">Website</label>
                                    <input
                                        type="text"
                                        id="hp_website"
                                        name="website"
                                        value={form.website}
                                        onChange={handleChange}
                                        tabIndex={-1}
                                        autoComplete="off"
                                    />
                                </div>

                                {/* Interest selector */}
                                <div className="form-el">
                                    <label className="block font-inter font-semibold text-sm text-ivory mb-3">
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
                                                <span className="font-inter text-sm text-ivory">
                                                    {opt.label}
                                                </span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Name */}
                                <div className="form-el">
                                    <label className="block font-inter font-semibold text-sm text-ivory mb-2">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={form.name}
                                        onChange={handleChange}
                                        placeholder="Jane Smith"
                                        className={`w-full bg-white border rounded-xl px-5 py-4 font-inter text-sm text-obsidian placeholder:text-obsidian/30 focus:outline-none transition-colors ${
                                            errors.name ? "border-red-400" : "border-white/20 focus:border-champagne"
                                        }`}
                                    />
                                    {errors.name && (
                                        <p className="mt-1.5 font-mono text-xs text-red-400/80">{errors.name}</p>
                                    )}
                                </div>

                                {/* Email */}
                                <div className="form-el">
                                    <label className="block font-inter font-semibold text-sm text-ivory mb-2">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        placeholder="jane@company.com"
                                        className={`w-full bg-white border rounded-xl px-5 py-4 font-inter text-sm text-obsidian placeholder:text-obsidian/30 focus:outline-none transition-colors ${
                                            errors.email ? "border-red-400" : "border-white/20 focus:border-champagne"
                                        }`}
                                    />
                                    {errors.email && (
                                        <p className="mt-1.5 font-mono text-xs text-red-400/80">{errors.email}</p>
                                    )}
                                </div>

                                {/* Role / Company */}
                                <div className="form-el">
                                    <label className="block font-inter font-semibold text-sm text-ivory mb-2">
                                        {isWaitlist ? "Current Role" : "Company & Role"}
                                    </label>
                                    <input
                                        type="text"
                                        name="role"
                                        value={form.role}
                                        onChange={handleChange}
                                        placeholder={isWaitlist ? "e.g. Software Engineer at Acme" : "e.g. Head of L&D at Acme Corp"}
                                        className={`w-full bg-white border rounded-xl px-5 py-4 font-inter text-sm text-obsidian placeholder:text-obsidian/30 focus:outline-none transition-colors ${
                                            errors.role ? "border-red-400" : "border-white/20 focus:border-champagne"
                                        }`}
                                    />
                                    {errors.role && (
                                        <p className="mt-1.5 font-mono text-xs text-red-400/80">{errors.role}</p>
                                    )}
                                </div>

                                {/* Message */}
                                <div className="form-el">
                                    <label className="block font-inter font-semibold text-sm text-ivory mb-2">
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
                                        className="w-full bg-white border border-white/20 rounded-xl px-5 py-4 font-inter text-sm text-obsidian placeholder:text-obsidian/30 focus:outline-none focus:border-champagne transition-colors resize-none"
                                    />
                                </div>

                                {/* Status messages */}
                                {status === "error" && (
                                    <p className="font-mono text-xs text-red-400/80 tracking-wide">
                                        Something went wrong. Please try again or email us directly.
                                    </p>
                                )}
                                {status === "ratelimit" && (
                                    <p className="font-mono text-xs text-red-400/80 tracking-wide">
                                        Too many submissions. Please wait an hour before trying again.
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
