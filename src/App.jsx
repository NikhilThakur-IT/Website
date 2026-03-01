import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Philosophy from './components/Philosophy';
import Protocol from './components/Protocol';
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
      <Hero />
      <Testimonials />
      <Features />
      <Philosophy />
      <BookCall />
      {/* <Protocol /> */}
      <Pricing />
      <Footer />
    </div>
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
