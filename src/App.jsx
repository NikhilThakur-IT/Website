import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Philosophy from './components/Philosophy';
import Protocol from './components/Protocol';
import Pricing from './components/Pricing';
import Testimonials from './components/Testimonials';
import BookCall from './components/BookCall';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-ivory text-slate selection:bg-champagne/30 overflow-x-hidden">
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

export default App;
