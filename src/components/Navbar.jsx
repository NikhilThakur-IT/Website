import React, { useEffect, useState } from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// eslint-disable-next-line react-refresh/only-export-components
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const NAV_LINKS = [
  { href: "#features", label: "Why Join?" },
  { href: "#join-club", label: "Let's Talk!" },
  { href: "#pricing", label: "Membership" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-5xl">
      {/* Pill bar */}
      <div
        className={cn(
          "flex items-center justify-between px-6 py-3 rounded-full transition-all duration-500 ease-out",
          isScrolled || menuOpen
            ? "bg-obsidian/80 backdrop-blur-xl border border-white/10 text-ivory shadow-2xl"
            : "bg-transparent border border-transparent text-ivory",
        )}
      >
        <div className="flex items-center gap-2">
          <span className="font-inter font-bold tracking-tight text-xl">
            OpportuneAI
          </span>
        </div>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide">
          {NAV_LINKS.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="hover:-translate-y-[1px] transition-transform duration-300"
            >
              {label}
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <a
          href="#pricing"
          className="hidden md:inline-flex btn-magnetic bg-champagne text-obsidian px-5 py-2 rounded-full text-sm font-semibold tracking-wide hover:shadow-[0_0_20px_rgba(201,168,76,0.3)] transition-all"
        >
          <span>Join the Club</span>
        </a>

        {/* Hamburger — mobile only */}
        <button
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-[5px] focus:outline-none"
        >
          <span
            className={cn(
              "block h-[2px] w-6 bg-ivory rounded-full origin-center transition-transform duration-300",
              menuOpen && "translate-y-[7px] rotate-45",
            )}
          />
          <span
            className={cn(
              "block h-[2px] w-6 bg-ivory rounded-full transition-opacity duration-300",
              menuOpen && "opacity-0",
            )}
          />
          <span
            className={cn(
              "block h-[2px] w-6 bg-ivory rounded-full origin-center transition-transform duration-300",
              menuOpen && "-translate-y-[7px] -rotate-45",
            )}
          />
        </button>
      </div>

      {/* Mobile dropdown */}
      <div
        className={cn(
          "md:hidden overflow-hidden transition-all duration-500 ease-out",
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <div className="mt-2 px-6 py-6 rounded-3xl bg-obsidian/90 backdrop-blur-xl border border-white/10 text-ivory flex flex-col gap-5">
          {NAV_LINKS.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              onClick={closeMenu}
              className="text-base font-medium tracking-wide hover:text-champagne transition-colors duration-200"
            >
              {label}
            </a>
          ))}
          <a
            href="#pricing"
            onClick={closeMenu}
            className="btn-magnetic bg-champagne text-obsidian px-5 py-3 rounded-full text-sm font-semibold tracking-wide text-center hover:shadow-[0_0_20px_rgba(201,168,76,0.3)] transition-all mt-1"
          >
            <span>Join the Club</span>
          </a>
        </div>
      </div>
    </nav>
  );
}
