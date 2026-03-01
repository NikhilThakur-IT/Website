import React from "react";
import { useNavigate } from "react-router-dom";

export default function TermsPage() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-obsidian text-ivory selection:bg-champagne/20">
            <div className="fixed top-5 left-5 z-50">
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

            <div className="max-w-2xl mx-auto px-6 py-24">
                <p className="font-mono text-xs tracking-widest text-champagne/50 uppercase mb-4">Legal</p>
                <h1 className="font-playfair italic text-5xl text-ivory mb-12">Terms of Service</h1>

                <div className="flex flex-col gap-8 font-inter text-sm text-ivory/60 leading-relaxed">
                    <section>
                        <h2 className="font-inter font-semibold text-base text-ivory mb-3">Acceptance of Terms</h2>
                        <p>By accessing or using the OpportuneAI website and services, you agree to be bound by these terms. If you do not agree, please do not use our services.</p>
                    </section>

                    <section>
                        <h2 className="font-inter font-semibold text-base text-ivory mb-3">Services</h2>
                        <p>OpportuneAI provides AI upskilling workshops, community access, and enterprise training programmes. Specific deliverables, schedules, and pricing are outlined at the time of enrolment or engagement.</p>
                    </section>

                    <section>
                        <h2 className="font-inter font-semibold text-base text-ivory mb-3">Workshop Enrolment</h2>
                        <p>Performance Workshop enrolment is subject to availability. Acceptance into a cohort is at our discretion. Payment is due before the cohort start date.</p>
                    </section>

                    <section>
                        <h2 className="font-inter font-semibold text-base text-ivory mb-3">Refund Policy</h2>
                        <p>You may request a full refund within 7 days of your cohort start date. After this period, refunds are not available. To request a refund, contact us at hello@opportuneai.com.</p>
                    </section>

                    <section>
                        <h2 className="font-inter font-semibold text-base text-ivory mb-3">Intellectual Property</h2>
                        <p>All workshop materials, content, and branding are the property of OpportuneAI. You may not reproduce, distribute, or create derivative works from our materials without written permission.</p>
                    </section>

                    <section>
                        <h2 className="font-inter font-semibold text-base text-ivory mb-3">Community Guidelines</h2>
                        <p>Members of the OpportuneAI community are expected to engage respectfully. We reserve the right to remove any member who violates community standards, engages in harassment, or misuses the platform.</p>
                    </section>

                    <section>
                        <h2 className="font-inter font-semibold text-base text-ivory mb-3">Limitation of Liability</h2>
                        <p>OpportuneAI provides educational content and career development resources. We do not guarantee specific employment outcomes, salary increases, or business results. Our services are provided as-is.</p>
                    </section>

                    <section>
                        <h2 className="font-inter font-semibold text-base text-ivory mb-3">Changes to Terms</h2>
                        <p>We may update these terms from time to time. Continued use of our services after changes constitutes acceptance of the updated terms.</p>
                    </section>

                    <section>
                        <h2 className="font-inter font-semibold text-base text-ivory mb-3">Contact</h2>
                        <p>For questions about these terms, contact <a href="mailto:hello@opportuneai.com" className="text-champagne hover:underline">hello@opportuneai.com</a>.</p>
                    </section>

                    <p className="text-ivory/30 font-mono text-xs mt-4">Last updated: March 2026</p>
                </div>
            </div>
        </div>
    );
}
