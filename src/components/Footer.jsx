import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="w-full bg-obsidian rounded-t-[4rem] text-ivory/80 pt-24 pb-12 px-6 md:px-12 mt-[-4rem] relative z-30 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
            <div className="max-w-7xl mx-auto flex flex-col gap-16">

                {/* Top Section */}
                <div className="flex flex-col md:flex-row justify-between items-start gap-12">

                    <div className="max-w-sm">
                        <h2 className="font-inter font-bold text-3xl text-ivory tracking-tight mb-4">
                            OpportuneAI
                        </h2>
                        <p className="font-playfair italic text-lg text-ivory/60 leading-relaxed mb-8">
                            Practical career velocity through structured AI integration.
                        </p>

                        {/* System Status Container */}
                        <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-2 rounded-full">
                            <div className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                            </div>
                            <span className="font-mono text-[10px] tracking-widest uppercase text-ivory/50">
                                System Operational
                            </span>
                        </div>
                    </div>

                    <div className="flex gap-16 md:gap-24 font-inter text-sm">
                        <div className="flex flex-col gap-4">
                            <h4 className="font-bold text-ivory mb-2 tracking-wider">PLATFORM</h4>
                            <a href="#features" className="hover:text-champagne transition-colors">Why Join Us</a>
                            <a href="#testimonials" className="hover:text-champagne transition-colors">Testimonials</a>
                            <a href="#pricing" className="hover:text-champagne transition-colors">Membership</a>
                            <a href="#join-club" className="hover:text-champagne transition-colors">Book a Call</a>
                        </div>

                        <div className="flex flex-col gap-4">
                            <h4 className="font-bold text-ivory mb-2 tracking-wider">GET STARTED</h4>
                            <Link to="/apply?type=waitlist" className="hover:text-champagne transition-colors">Join the Waitlist</Link>
                            <Link to="/apply?type=partners" className="hover:text-champagne transition-colors">Enterprise Enquiry</Link>
                            <a href="mailto:hello@opportuneai.com" className="hover:text-champagne transition-colors">Contact Us</a>
                        </div>
                    </div>

                </div>

                {/* Bottom Section */}
                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono tracking-widest text-ivory/30 uppercase">
                    <p>&copy; {new Date().getFullYear()} OpportuneAI. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link to="/privacy" className="hover:text-ivory transition-colors">Privacy</Link>
                        <Link to="/terms" className="hover:text-ivory transition-colors">Terms</Link>
                    </div>
                </div>

            </div>
        </footer>
    );
}
