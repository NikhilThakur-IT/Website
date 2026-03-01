import React from "react";
import { useNavigate } from "react-router-dom";

export default function PrivacyPage() {
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
                <h1 className="font-playfair italic text-5xl text-ivory mb-12">Privacy Policy</h1>

                <div className="flex flex-col gap-8 font-inter text-sm text-ivory/60 leading-relaxed">
                    <section>
                        <h2 className="font-inter font-semibold text-base text-ivory mb-3">Information We Collect</h2>
                        <p>When you submit a form on our website, we collect the information you provide: your name, email address, role, and any message content. We do not collect data automatically beyond standard server logs.</p>
                    </section>

                    <section>
                        <h2 className="font-inter font-semibold text-base text-ivory mb-3">How We Use Your Information</h2>
                        <p>We use the information you provide to respond to your enquiry, process waitlist applications, and communicate about our workshops and community. We will not sell or share your personal data with third parties for marketing purposes.</p>
                    </section>

                    <section>
                        <h2 className="font-inter font-semibold text-base text-ivory mb-3">Third-Party Services</h2>
                        <p>Form submissions are processed through Formspree. Calendar bookings are handled through Cal.com. Both services process data in accordance with their own privacy policies. We use Google Fonts for typography, which may involve requests to Google servers.</p>
                    </section>

                    <section>
                        <h2 className="font-inter font-semibold text-base text-ivory mb-3">Data Retention</h2>
                        <p>We retain your information for as long as necessary to fulfil the purpose for which it was collected. You may request deletion of your data at any time by contacting us.</p>
                    </section>

                    <section>
                        <h2 className="font-inter font-semibold text-base text-ivory mb-3">Your Rights</h2>
                        <p>You have the right to access, correct, or delete the personal data we hold about you. To exercise these rights, please contact us at hello@opportuneai.com.</p>
                    </section>

                    <section>
                        <h2 className="font-inter font-semibold text-base text-ivory mb-3">Contact</h2>
                        <p>For any privacy-related questions, reach out to <a href="mailto:hello@opportuneai.com" className="text-champagne hover:underline">hello@opportuneai.com</a>.</p>
                    </section>

                    <p className="text-ivory/30 font-mono text-xs mt-4">Last updated: March 2026</p>
                </div>
            </div>
        </div>
    );
}
