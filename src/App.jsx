import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Philosophy from './components/Philosophy';
import Pricing from './components/Pricing';
import Testimonials from './components/Testimonials';
import BookCall from './components/BookCall';
import Footer from './components/Footer';
import FormPage from './components/FormPage';
import PrivacyPage from './components/PrivacyPage';
import TermsPage from './components/TermsPage';

function Landing() {
  return (
    <div className="min-h-screen bg-ivory text-slate selection:bg-champagne/30 overflow-x-hidden select-none cursor-default">
      <Navbar />
      <main>
        <Hero />
        <Testimonials />
        <Features />
        <Philosophy />
        <BookCall />
        <Pricing />
      </main>
      <Footer />
    </div>
  );
}

function NotFound() {
  return (
    <main className="min-h-screen bg-obsidian flex flex-col items-center justify-center text-center px-6 selection:bg-champagne/30">
      <p className="font-mono text-xs tracking-widest text-champagne/50 uppercase mb-4">404</p>
      <h1 className="font-playfair italic text-5xl md:text-7xl text-ivory font-semibold mb-4">
        Page not found.
      </h1>
      <p className="font-inter text-ivory/60 text-lg max-w-md mb-10">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="btn-magnetic bg-champagne text-obsidian px-8 py-4 rounded-full font-inter font-semibold tracking-wide text-sm"
      >
        <span>Back to Home</span>
      </Link>
    </main>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/apply" element={<FormPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
