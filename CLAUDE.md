# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server (Vite HMR)
npm run build     # Production build to dist/
npm run lint      # ESLint check
npm run preview   # Preview production build locally
```

## Project Overview

**OpportuneAI** — a cinematic landing page for an AI upskilling/career development platform. Built using the "Midnight Luxe" (Preset B) design system from `GEMINI.md`, which is the authoritative spec for this project.

## Architecture

`App.jsx` composes 7 full-page section components in order:

```
Navbar → Hero → Features → Philosophy → Protocol → Pricing → Footer
```

All components live in `src/components/`. Each maps to a named section (`#features`, `#philosophy`, `#protocol`).

## Design System (Tailwind tokens)

Colors and fonts are defined in `tailwind.config.js` as semantic aliases:

| Token | Value | Use |
|---|---|---|
| `obsidian` | `#0D0D12` | Dark bg, overlays |
| `champagne` | `#C9A84C` | Accent, CTAs |
| `ivory` | `#FAF8F5` | Page background |
| `slate` | `#2A2A35` | Body text |
| `font-inter` | Inter | Headings, UI |
| `font-playfair` | Playfair Display | Drama/italic serif |
| `font-mono` | JetBrains Mono | Data/code labels |

Border radii: `rounded-2xl` = 2rem, `rounded-3xl` = 3rem, `rounded-4xl` = 4rem.

## Animation Conventions (GSAP)

All GSAP animations **must** follow this pattern — no exceptions:

```jsx
useLayoutEffect(() => {
  const ctx = gsap.context(() => {
    // animations here
  }, componentRef);
  return () => ctx.revert(); // cleanup
}, []);
```

- Entrance easing: `power3.out`
- Morph easing: `power2.inOut`
- Text stagger: `0.08`, card/container stagger: `0.15`
- ScrollTrigger must be registered: `gsap.registerPlugin(ScrollTrigger)`

## Button Pattern

Use the `.btn-magnetic` CSS class (defined in `src/index.css`) for all interactive buttons. It provides `scale(1.03)` hover with a sliding background layer. Always wrap button text in a `<span>` so the z-index stacking works:

```jsx
<button className="btn-magnetic bg-champagne text-obsidian px-5 py-2 rounded-full ...">
  <span>Label</span>
</button>
```

## Utility: `cn()`

The `cn()` helper (clsx + tailwind-merge) is currently exported from `src/components/Navbar.jsx`. Import from there when needed for conditional class merging.

## Global Noise Overlay

The grain texture is rendered in `index.html` via a fixed `<div>` with an inline SVG `feTurbulence` filter at `opacity: 0.05`. Do not replicate this in components — it's global.

## Navbar Scroll Behavior

Navbar uses `IntersectionObserver`-free approach: `window.scrollY > 50` triggers a state change that transitions the pill from transparent to `bg-obsidian/80 backdrop-blur-xl`.

## GEMINI.md

`GEMINI.md` is the master design spec for this project. It defines the full component architecture (sections A–G), all fixed design rules, animation lifecycle requirements, and aesthetic presets. Consult it before making structural or visual changes to any section component.
