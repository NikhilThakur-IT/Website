# Website Audit To-Do List
*Updated: 2026-04-21 | Security audit v3*

## Priority Legend
- CRITICAL = Bugs, broken functionality, security risk
- HIGH = Significant UX/a11y/perf/security impact
- MEDIUM = Code quality, polish, best practices
- LOW = Nice-to-have, future-proofing

---

## Security Testing Summary (2026-04-21)
- [x] `npm audit --audit-level=low` passed with 0 known dependency vulnerabilities.
- [x] `npm run build` passed after rerunning outside the sandbox because esbuild was blocked by `spawn EPERM`.
- [x] Secret scan found no committed credentials outside the local security-guidance rule definitions.
- [x] React XSS sink scan found no `dangerouslySetInnerHTML`, direct `.innerHTML =`, `eval()`, or `new Function()` usage in `src`.
- [x] CSP was tightened by removing `script-src 'unsafe-inline'` and adding `frame-ancestors 'self'`.
- [x] Removed unused `randomuser.me` preconnect after images were self-hosted.
- [x] Fixed ESLint environment coverage for `plugins/**/*.js`; lint now passes.

---

## HIGH - Security Audit Findings

### Task 55: Move remaining inline styles out of JSX/HTML so CSP can remove `style-src 'unsafe-inline'`
- **Status:** [ ] Pending
- **Files:** `index.html:30`, `Hero.jsx:36`, `FormPage.jsx:189`, `BookCall.jsx:89`, animation/card style props across `Features.jsx` and `Testimonials.jsx`
- **Details:** `script-src` is now hardened, but `style-src 'unsafe-inline'` is still required because the app uses inline `style` attributes and a global inline noise overlay. Move static inline styles to CSS classes/CSS variables where practical, then replace `style-src 'unsafe-inline'` with nonces or hashes.

### Task 56: Add server-side anti-spam/rate limiting for form submissions
- **Status:** [x] Done (2026-04-21)
- **Files:** `src/components/FormPage.jsx`, `api/contact.js`, `vercel.json`
- **Details:** Form submissions now post to `/api/contact`, which enforces a server-side honeypot, IP-based throttling, allowlisted option values, and server validation before forwarding accepted submissions to Formspree. The browser CSP no longer needs direct `connect-src` or `form-action` access to Formspree.

### Task 57: Add form field length limits before posting to Formspree
- **Status:** [x] Done (2026-04-21)
- **File:** `FormPage.jsx:65-76`
- **Details:** Added shared client-side caps for name, email, and message, plus matching `maxLength` attributes and server-side payload caps in `api/contact.js`.

### Task 58: Add privacy/consent disclosure near embedded third parties
- **Status:** [ ] Pending
- **Files:** `BookCall.jsx`, `FormPage.jsx`, `PrivacyPage.jsx:37-39`
- **Details:** The site sends user data to Formspree and loads Cal.com. The privacy page mentions them, but the form and booking areas do not provide an inline notice before submission/booking. Add short copy linking to Privacy, and update the privacy policy with retention, cookies/tracking, and data processor details.

### Task 59: Consider self-hosting fonts to reduce third-party request exposure
- **Status:** [ ] Pending
- **File:** `index.html:23`
- **Details:** Google Fonts creates third-party requests on page load. Self-hosting fonts improves privacy, reliability, and makes CSP easier to tighten.

### Task 60: Review Cal.com embed supply-chain risk
- **Status:** [ ] Pending
- **File:** `BookCall.jsx:36-57`
- **Details:** The app dynamically loads `https://app.cal.com/embed/embed.js`. This is normal for an embed, but Subresource Integrity is not practical unless Cal publishes stable versioned assets. Document the accepted risk, pin a version if Cal supports it, or prefer the fallback outbound link for stricter CSP deployments.

### Task 61: Add explicit cache headers for HTML vs hashed static assets
- **Status:** [ ] Pending
- **File:** `vercel.json`
- **Details:** Security-sensitive deployments should avoid stale HTML while allowing immutable caching for hashed JS/CSS. Add `Cache-Control: no-cache` for HTML/app shell and `public, max-age=31536000, immutable` for hashed assets.

### Task 62: Add automated security checks to CI
- **Status:** [ ] Pending
- **Files:** `package.json`, GitHub/Vercel CI config
- **Details:** Local checks passed, but there is no visible CI gate. Add `npm audit --audit-level=low`, `npm run lint`, and `npm run build` to deployment checks so regressions are caught before release.

---

## MEDIUM - Bugs Found During Security Audit

### Task 63: Fix mojibake/encoding corruption in user-facing copy
- **Status:** [x] Done (2026-04-21)
- **Files:** `src/components/FormPage.jsx`, `src/components/Hero.jsx`, `src/components/Features.jsx`, `src/components/Pricing.jsx`, `src/components/Testimonials.jsx`, `TODO.md`
- **Details:** Verified user-facing source copy uses valid UTF-8 punctuation and found no committed mojibake sequences in `src`. The visible corruption was from the PowerShell console decoding, not the files themselves.

### Task 64: Keep ESLint Node globals for plugin files
- **Status:** [x] Done (2026-04-21)
- **File:** `eslint.config.js`
- **Details:** `npm run lint` failed because `plugins/security-guidance/index.js` uses Node's `process`, while ESLint only configured browser globals. Added a `plugins/**/*.js` override with Node globals.

---

## Previously Completed (from v1 audit)
- [x] ~~Fix Hero CTA — make it functional~~ (now links to `#join-club`)
- [x] ~~Add mobile hamburger menu~~ (implemented in Navbar)
- [x] ~~Add security headers to vercel.json~~ (CSP, HSTS, etc. added)
- [x] ~~Add form validation, rate limiting, and honeypot~~ (FormPage.jsx)
- [x] ~~Fix all dead footer links~~ (Privacy/Terms pages created, links working)
- [x] ~~Protocol section~~ (component deleted, removed from App.jsx)

---

## CRITICAL

### Task 1: Add 404 catch-all route
- **Status:** [x] Done (c066cdf)
- **File:** `App.jsx:33-38`
- **Details:** Unknown routes show a blank page. Add `<Route path="*" element={<NotFound />} />`.

### Task 2: Fix stale closure bug in Testimonials carousel
- **Status:** [x] Done
- **File:** `Testimonials.jsx:59-68`
- **Details:** Drag handlers read stale `current` from closure during rapid interactions. Fixed by adding `currentRef` that `slideTo` keeps in sync, and reading from `currentRef.current` in `onMouseUp`/`onTouchEnd` handlers.

### Task 3: Self-host critical images
- **Status:** [x] Done (c066cdf)
- **Files:** `Hero.jsx:36,71-85`, `Philosophy.jsx:47`, `FormPage.jsx:188`
- **Details:** Hero background, 5 avatars (randomuser.me), philosophy background, and form background all depend on external URLs. Download and place in `public/images/`. If Unsplash or randomuser.me is slow/down, the site looks broken.

### Task 4: Self-host OG/Twitter social image
- **Status:** [x] Done (c066cdf)
- **File:** `index.html:13,18`
- **Details:** OG and Twitter card images point to external Unsplash URL. Social previews break if URL changes. Save to `public/og-image.jpg`.

### Task 5: Add `.env` to .gitignore
- **Status:** [x] Done (c066cdf)
- **File:** `.gitignore`
- **Details:** Add `.env`, `.env.*`, `.env.local`, `.env.production` patterns. Currently only `*.local` is covered.

---

## HIGH — Security

### Task 6: Harden CSP in vercel.json
- **Status:** [x] Done (53824bc)
- **File:** `vercel.json:9`
- **Details:** Add missing directives: `base-uri 'self'`, `form-action 'self' https://formspree.io`, `object-src 'none'`, `upgrade-insecure-requests`. Evaluate removing `unsafe-inline` for scripts (may need Vite CSP nonce plugin).

### Task 7: Fix deprecated X-XSS-Protection header
- **Status:** [x] Done (53824bc)
- **File:** `vercel.json:25`
- **Details:** Set to `0` or remove. The `1; mode=block` value is a no-op in modern browsers and can cause issues in old IE.

### Task 8: Fix Cal.com script injection issues
- **Status:** [x] Done (53824bc)
- **File:** `BookCall.jsx:15-46`
- **Details:** Script re-injects on every mount (React StrictMode). No dedup check, no cleanup on unmount, no `integrity`/`crossorigin` attributes. Add script-already-loaded guard and cleanup function.

---

## HIGH — Accessibility

### Task 10: Add `<main>` landmark to all pages
- **Status:** [x] Done (53824bc)
- **Files:** `App.jsx:17`, `FormPage.jsx`, `PrivacyPage.jsx`, `TermsPage.jsx`
- **Details:** Wrap page content in `<main>` element. Assistive tech currently can't identify the main content region.

### Task 12: Add `:focus-visible` styles
- **Status:** [ ] Pending
- **Files:** `index.css:18-38`, `Navbar.jsx:55-63`
- **Details:** `.btn-magnetic` and nav links have no keyboard focus indicator. WCAG 2.4.7 failure. Add `focus-visible:ring-2 focus-visible:ring-champagne` or similar.

### Task 13: Fix mobile menu focus trap
- **Status:** [ ] Pending
- **File:** `Navbar.jsx:103-128`
- **Details:** Menu hidden via `max-h-0 opacity-0` but links still receive tab focus when closed. Add `tabindex="-1"` or `aria-hidden="true"` when `menuOpen` is false. Also add Escape key handler and click-outside-to-close.

### Task 14: Make Testimonials carousel keyboard-accessible
- **Status:** [ ] Pending
- **File:** `Testimonials.jsx:168-175`
- **Details:** No arrow key navigation. Mouse/touch only. Add `onKeyDown` handler for left/right arrow keys. Add `role="region"` and `aria-roledescription="carousel"`.

### Task 15: Fix star rating accessibility
- **Status:** [ ] Pending
- **File:** `Hero.jsx:90`
- **Details:** Screen readers read literal star characters. Add `aria-label="4.8 out of 5 stars"` and `aria-hidden="true"` on the visual stars.

### Task 16: Link form errors to inputs with aria-describedby
- **Status:** [ ] Pending
- **File:** `FormPage.jsx:400-403`
- **Details:** Error messages are not programmatically associated with inputs. Add `id` to error `<p>` elements and `aria-describedby` on the corresponding inputs.

### Task 17: Fix FAQ accessibility
- **Status:** [ ] Pending
- **File:** `Pricing.jsx:179-180`
- **Details:** Collapsed FAQ answers hidden visually (`max-h-0 opacity-0`) but still readable by screen readers. Add `aria-hidden={!isOpen}` to the answer region.

---

## HIGH — Performance

### Task 18: Optimize hero LCP image
- **Status:** [ ] Pending
- **File:** `Hero.jsx:36`
- **Details:** 2000px Unsplash image via CSS `background-image` is the LCP element. Self-host, add `<link rel="preload">` in index.html, provide responsive sizing, add fallback background color.

### Task 19: Fix above-the-fold images using loading="lazy"
- **Status:** [ ] Pending
- **File:** `Hero.jsx:82-83`
- **Details:** Avatar images in hero section have `loading="lazy"` but are immediately visible. Change to eager loading or add `<link rel="preload">`.

### Task 20: Optimize Google Fonts loading
- **Status:** [ ] Pending
- **File:** `index.html:24`
- **Details:** Render-blocking font stylesheet loading 3 families. Consider self-hosting fonts, using `<link rel="preload" as="style">` with onload swap, or using `font-display: optional`.

### Task 21: Pause off-screen animations
- **Status:** [x] Done
- **File:** `Features.jsx`
- **Details:** Added IntersectionObserver on the Features section to track visibility. CardShuffler and CardTypewriter skip their interval/timeout when `isVisible` is false. CardScheduler pauses/resumes its GSAP timeline based on visibility.

### Task 22: Add lazy loading for secondary routes
- **Status:** [ ] Pending
- **File:** `App.jsx:1-13`
- **Details:** `/apply`, `/privacy`, `/terms` are eagerly imported. Use `React.lazy()` + `<Suspense>` to reduce initial bundle size.

### Task 23: Add vendor chunk splitting
- **Status:** [ ] Pending
- **File:** `vite.config.js`
- **Details:** Add `build.rollupOptions.output.manualChunks` to split React, GSAP, and react-router into separate cached chunks.

---

## MEDIUM — Bugs & Code Quality

### Task 24: Fix useEffect → useLayoutEffect for GSAP
- **Status:** [x] Done (b92001c)
- **Files:** `Features.jsx:218`, `Philosophy.jsx:10`
- **Details:** CLAUDE.md mandates `useLayoutEffect` for all GSAP animations. `useEffect` causes flash of unanimated content.

### Task 25: Remove dead code in Features.jsx
- **Status:** [x] Done (53824bc)
- **File:** `Features.jsx:4,32`
- **Details:** `CircleDashed` imported but never used (line 4). `_isTop` variable declared but never used (line 32).

### Task 26: Fix fake "Commit Time" button
- **Status:** [x] Done (53824bc)
- **File:** `Features.jsx:198`
- **Details:** Looks interactive but does nothing. Change to `<span>` or add `aria-hidden="true"` and `tabindex="-1"`.

### Task 27: Fix dead Tailwind v2 class
- **Status:** [x] Done (53824bc)
- **File:** `Pricing.jsx:67`
- **Details:** `border-opacity-10` was removed in Tailwind v3. Border has no opacity effect. Use `border-obsidian/10` instead.

### Task 28: Move `cn()` utility to dedicated file
- **Status:** [ ] Pending
- **File:** `Navbar.jsx:6` → create `src/lib/utils.js`
- **Details:** `cn()` (clsx + tailwind-merge) is exported from a UI component. Creates architectural coupling. Move to `src/lib/utils.js`.

### Task 29: Remove dead SVG filter in index.html
- **Status:** [x] Done (c066cdf)
- **File:** `index.html:31-35`
- **Details:** `<filter id="noiseFilter">` is never referenced. Only the `data:` URI noise overlay works. Remove the dead SVG.

### Task 30: Rename `slate` to avoid Tailwind conflict
- **Status:** [ ] Pending
- **File:** `tailwind.config.js:13`
- **Details:** Overwrites Tailwind's built-in `slate` color scale. `bg-slate-500` etc. are broken. Rename to `graphite` or `charcoal`.

### Task 31: Update CLAUDE.md component order
- **Status:** [x] Done (b92001c)
- **File:** `CLAUDE.md`
- **Details:** Currently lists `Navbar > Hero > Features > Philosophy > Protocol > Pricing > Footer`. Actual order is `Navbar > Hero > Testimonials > Features > Philosophy > BookCall > Pricing > Footer`.

### Task 32: Add ScrollToTop on route change
- **Status:** [ ] Pending
- **File:** `App.jsx`
- **Details:** Navigating between routes preserves scroll position. Add a `ScrollToTop` component that calls `window.scrollTo(0, 0)` on route change.

### Task 33: Add React ErrorBoundary
- **Status:** [ ] Pending
- **File:** `App.jsx`
- **Details:** Any component crash = white screen. Wrap routes in an error boundary with a friendly fallback UI.

### Task 34: Remove redundant body styles
- **Status:** [ ] Pending
- **Files:** `index.html:26`, `index.css:7`
- **Details:** `bg-ivory text-slate` defined in both. Pick one source of truth.

### Task 35: Fix back button behavior
- **Status:** [ ] Pending
- **Files:** `FormPage.jsx:201`, `PrivacyPage.jsx:11`, `TermsPage.jsx:11`
- **Details:** All use `navigate("/")` instead of `navigate(-1)`. User always sent to home instead of previous page.

---

## MEDIUM — UX

### Task 36: Add Cal.com fallback link
- **Status:** [x] Done (a6377df)
- **File:** `BookCall.jsx:96-103`
- **Details:** If embed script fails (ad blocker, network), button does nothing silently. Add fallback `<a href="https://cal.com/nik-thakur">` that opens when Cal.com isn't loaded.

### Task 37: Fix mobile menu UX (escape key + click outside)
- **Status:** [x] Done (a6377df)
- **File:** `Navbar.jsx`
- **Details:** No escape key handler. Clicking outside doesn't close. Standard mobile UX expectations.

### Task 38: Show "Get Free Access Today" on mobile
- **Status:** [x] Done (a6377df)
- **File:** `Hero.jsx:63`
- **Details:** `hidden md:inline-block` hides this value prop text from mobile users.

### Task 39: Add touch-follow feedback to Testimonials
- **Status:** [x] Done (a6377df)
- **File:** `Testimonials.jsx:169`
- **Details:** Touch users see no movement until release. No visual peek of next card. Consider adding real-time drag follow on `onTouchMove`.

### Task 40: Remove fake "System Operational" status
- **Status:** [ ] Pending
- **File:** `Footer.jsx:21-29`
- **Details:** Pulsing green dot with no actual status check. Misleading. Either connect to a real status API or remove.

---

## LOW — SEO & Polish

### Task 41: Add canonical URL
- **Status:** [ ] Pending
- **File:** `index.html`
- **Details:** Add `<link rel="canonical" href="https://opportuneai.com/" />` to prevent duplicate content issues.

### Task 42: Add theme-color meta tag
- **Status:** [ ] Pending
- **File:** `index.html`
- **Details:** Add `<meta name="theme-color" content="#0D0D12">` for mobile browser chrome.

### Task 43: Add structured data (JSON-LD)
- **Status:** [ ] Pending
- **File:** `index.html`
- **Details:** Add Organization/WebSite schema markup for better search engine understanding.

### Task 44: Add noscript fallback
- **Status:** [ ] Pending
- **File:** `index.html`
- **Details:** Blank page if JS disabled. Add `<noscript>` message.

### Task 45: Add per-route page titles
- **Status:** [ ] Pending
- **Files:** `FormPage.jsx`, `PrivacyPage.jsx`, `TermsPage.jsx`
- **Details:** All routes show the same browser tab title. Set `document.title` per route or use `react-helmet-async`.

### Task 46: Add preconnect hints for external domains
- **Status:** [ ] Pending
- **File:** `index.html`
- **Details:** Add `<link rel="preconnect">` for `randomuser.me`, `images.unsplash.com`, `app.cal.com`.

### Task 47: Add cache-control headers for static assets
- **Status:** [ ] Pending
- **File:** `vercel.json`
- **Details:** Hashed JS/CSS assets should have `Cache-Control: public, max-age=31536000, immutable`. HTML should have `no-cache`.

### Task 48: Update privacy policy for Cal.com tracking
- **Status:** [ ] Pending
- **File:** `PrivacyPage.jsx:38`
- **Details:** Cal.com embed likely sets cookies. Privacy policy doesn't mention this. Also missing GDPR/CCPA specific rights.

### Task 49: Fix noise overlay z-index
- **Status:** [ ] Pending
- **File:** `index.html:36`
- **Details:** `z-index: 50` may conflict with future modals/dropdowns. Consider `z-[9999]` with `pointer-events: none` (already has pointer-events-none).

### Task 50: Add Pricing section entrance animation
- **Status:** [ ] Pending
- **File:** `Pricing.jsx`
- **Details:** No GSAP entrance animation unlike other sections. Feels inconsistent.

---

## Conversion & Content (from v1 audit, still pending)

### Task 51: Create pricing comparison table with "Most Popular" badge
- **Status:** [x] Done (b92001c, 9db3b51)
- **File:** `Pricing.jsx`
- **Details:** Add feature comparison matrix across tiers. Add "Most Popular" badge. Clarify "$2,000/workshop" pricing.

### Task 52: Add CTA after Testimonials and Philosophy sections
- **Status:** [ ] Pending
- **Files:** `Testimonials.jsx`, `Philosophy.jsx`
- **Details:** Both sections have zero CTAs — missed conversion points after trust-building content.

### Task 53: Improve form success message with next steps
- **Status:** [ ] Pending
- **File:** `FormPage.jsx:104-122`
- **Details:** Add expected response timeline, confirmation email mention, and what to expect next.

### Task 54: Streamline conversion funnel
- **Status:** [ ] Pending
- **Files:** `Hero.jsx`, `Navbar.jsx`, `BookCall.jsx`, `Pricing.jsx`
- **Details:** Multiple competing CTAs with no clear hierarchy. Define one primary action and reduce steps.
