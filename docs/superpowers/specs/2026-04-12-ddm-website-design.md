# Dream Drive Motors — Website Design Specification

## 1. Overview

Dream Drive Motors (DDM) is a premium, concierge-level car leasing dealership in Baldwin Park, CA. This spec defines the build of a 14-page marketing website with a "full showroom experience" — cinematic animations, smooth scrolling, and an award-worthy luxury aesthetic that works flawlessly across all devices.

**Business info:**
- Address: 15132 Arrow Hwy, Baldwin Park, CA
- Phone: 626-257-4368
- Email: dreamdrivemotors1@gmail.com

## 2. Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| Framework | Next.js 14+ (App Router) | Routing, SSG, layouts |
| Styling | Tailwind CSS v3 | Design system tokens via tailwind.config.ts |
| Scroll animations | GSAP + ScrollTrigger | Parallax, scroll-pinned sequences, number counters, timelines |
| Smooth scroll | Lenis | Momentum scrolling (desktop only) |
| UI animations | Framer Motion | Page transitions, scroll reveals, stagger sequences |
| Text animations | SplitType | Character/word split headline animations |
| Images | Next.js Image + Unsplash/Pexels stock | Optimized responsive images |
| Deployment | Vercel | Zero-config Next.js hosting |

**Forms:** Frontend-only for initial build. Inputs validate and look correct but don't submit. Backend integration is a future phase.

**Lease Calculator:** Real client-side math. Formula:
```
residual = MSRP * residualPercent
netCapCost = MSRP - downPayment
monthly = (netCapCost - residual) / term + (netCapCost + residual) * moneyFactor
```
Default assumptions: residual value = 50% of MSRP, money factor = 0.00125 (equivalent to ~3% APR). These defaults are configurable in `lib/constants.ts`.

## 3. Design System

### 3.1 Colors

> **Note:** The Stitch exports use varying background values (#0a0a0a, #0F0F0F, #121212, #131313) across screens. This spec defines the canonical unified palette. The `design/DESIGN.md` file also references different primary values (#ffc28d) — this spec supersedes all Stitch color definitions.

```
primary:                  #D4AF37  (Champagne Gold)
on-primary:               #1c1b1b
background:               #0a0a0a  (page body background — deepest)
surface:                  #131313  (primary content surface)
surface-container-low:    #1c1b1b
surface-container:        #201f1f
surface-container-high:   #2a2a2a
surface-container-highest:#353534
surface-container-lowest: #0e0e0e  (footer, sunken areas)
on-surface:               #e5e2e1
on-surface-variant:       #d0c5af
outline:                  #99907c
outline-variant:          #4d4635
error:                    #ffb4ab  (form validation errors)
error-container:          #93000a
```

### 3.2 Typography

- **Headlines:** Newsreader (serif), italic for emphasis. Used for brand statements, prices, hero text.
- **Body/Labels:** Manrope (sans-serif). Labels use 10px uppercase with 0.3em tracking.
- No pure white (#fff) for text — always `on-surface` (#e5e2e1).

### 3.3 Border Radii

Canonical scale (Stitch exports vary — this is the unified system):

```
none:    0px     (default — sharp edges)
sm:      0.125rem (2px)
DEFAULT: 0.25rem  (4px)
md:      0.375rem (6px — primary buttons)
lg:      0.5rem   (8px)
xl:      0.75rem  (12px — vehicle cards, bento items)
full:    9999px   (circular elements only)
```

No pill-shaped buttons. Vehicle cards use `xl`. Most UI elements use `none` or `sm`.

### 3.4 Design Rules

- **No-Line Rule:** No 1px solid borders for sectioning. Use tonal shifts between surface colors.
- **Ghost Borders:** Where borders are needed, use `outline-variant` at 10-15% opacity.
- **Shadows:** Broad, diffused (30-60px blur), tinted. No standard drop shadows.
- **Glassmorphism:** `bg-white/5` + `backdrop-blur-[20px]` for floating elements (modals, search bar, pricing cards).
- **Monogram Overlay:** DDM watermark in `outline-variant` at 2-5% opacity as background element.
- **Container Max Width:** `max-w-screen-2xl` (1536px) is the canonical content container. All pages use this consistently. Full-bleed sections (heroes, maps) ignore the container.

## 4. Project Structure

```
ddm-website/
├── app/
│   ├── layout.tsx                    # Root layout (Nav, Footer, Lenis, CustomCursor)
│   ├── not-found.tsx                 # Custom 404 page
│   ├── page.tsx                      # Homepage
│   ├── inventory/
│   │   └── page.tsx                  # Reserve Inventory
│   ├── inventory/[slug]/
│   │   └── page.tsx                  # Vehicle Detail
│   ├── about/
│   │   └── page.tsx                  # The Atelier
│   ├── services/
│   │   ├── page.tsx                  # Services & Concierge hub
│   │   ├── leasing/page.tsx          # Bespoke Auto Leasing
│   │   ├── financing/page.tsx        # Precision Auto Financing
│   │   ├── credit-info/page.tsx      # Credit Application (info)
│   │   ├── acquisition/page.tsx      # Direct Acquisition
│   │   ├── trade-in/page.tsx         # Seamless Trade-Ins
│   │   └── delivery/page.tsx         # Bespoke Home Delivery
│   ├── calculator/
│   │   └── page.tsx                  # Lease Calculator
│   ├── apply/
│   │   └── page.tsx                  # Secure Credit Application (form)
│   └── contact/
│       └── page.tsx                  # Contact & Inquire
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx                # Fixed nav with glassmorphism
│   │   ├── Footer.tsx                # Shared footer
│   │   └── MobileMenu.tsx            # Full-screen mobile overlay
│   ├── ui/
│   │   ├── Button.tsx                # Primary, Secondary, Tertiary variants
│   │   ├── SectionHeading.tsx        # Newsreader headline + label pattern
│   │   ├── VehicleCard.tsx           # Inventory card
│   │   ├── ServiceCard.tsx           # Services grid card
│   │   ├── BentoGrid.tsx             # Reusable bento wrapper
│   │   ├── GlassCard.tsx             # Glassmorphism card
│   │   ├── InputField.tsx            # Styled form inputs
│   │   └── MonogramOverlay.tsx       # DDM watermark
│   ├── animation/
│   │   ├── ScrollReveal.tsx          # Fade-in on scroll
│   │   ├── StaggerReveal.tsx         # Staggered children reveal
│   │   ├── TextSplit.tsx             # SplitType headline animation
│   │   ├── ParallaxImage.tsx         # GSAP parallax wrapper
│   │   ├── NumberCounter.tsx         # Count-up on scroll
│   │   ├── MagneticButton.tsx        # Magnetic hover (desktop)
│   │   ├── ImageReveal.tsx           # Clip-path image reveal
│   │   └── PageTransition.tsx        # Route transition wrapper
│   ├── interactive/
│   │   ├── CustomCursor.tsx          # Gold cursor (desktop only)
│   │   ├── SmoothScroll.tsx          # Lenis wrapper (desktop only)
│   │   ├── LeaseCalculator.tsx       # Calculator with sliders + results
│   │   └── BudgetSearch.tsx          # Homepage budget-first search
│   └── sections/
│       ├── Hero.tsx                  # Reusable hero pattern
│       └── CTASection.tsx            # Reusable CTA block
├── lib/
│   ├── animations.ts                 # GSAP timeline presets
│   ├── constants.ts                  # Colors, contact info, vehicle data
│   └── utils.ts                      # Helpers
├── styles/
│   └── globals.css                   # Tailwind directives, custom CSS
├── public/
│   └── images/                       # Stock images
├── tailwind.config.ts                # DDM design system tokens
└── next.config.ts
```

## 5. Animation Architecture

### 5.1 Layers

**Layer 1 — Smooth Scroll (Lenis):** Momentum scrolling on desktop. Disabled on touch devices and when `prefers-reduced-motion` is set.

**Layer 2 — Scroll Reveals (Framer Motion):** `<ScrollReveal>` wraps sections for fade-up-on-enter. `<StaggerReveal>` staggers children with configurable delay. Triggered once via `whileInView` with `-100px` margin.

**Layer 3 — Text Animations (SplitType + GSAP):** Hero headlines split into characters, animate with stagger. Used sparingly on Homepage, Atelier, Services, Vehicle Detail heroes only. Mobile: word-level splits only.

**Layer 4 — Parallax & Pinned Sequences (GSAP ScrollTrigger):** Hero images parallax. Vehicle Detail hero pins while counters animate. Homepage search tool floats. `<NumberCounter>` counts up stats on scroll. Mobile: no pinning, reduced parallax, counters still work.

**Layer 5 — Micro-interactions:** Magnetic buttons (desktop). Vehicle card image zoom + border glow on hover. Nav link animated underlines. Service card background image reveal on hover. CTA arrow translate on hover. Mobile: tap/active states replace hover.

**Layer 6 — Custom Cursor:** Small gold dot with lerp follow. Expands on interactive elements. Shows contextual text ("View", "Drag"). Hidden on touch devices.

**Layer 7 — Page Transitions (Framer Motion):** Crossfade with gold line wipe between routes (~600ms). Mobile: crossfade only.

### 5.2 Performance Safeguards

- All GSAP ScrollTriggers cleaned up on component unmount
- `will-change: transform` applied only during active animations
- Max 3 simultaneous scroll-triggered animations in viewport
- GSAP `matchMedia` for desktop vs mobile animation sets
- Next.js `<Image>` with lazy loading, blur placeholders, WebP/AVIF
- JS bundle target: <150kb gzipped (Lenis ~5kb, GSAP+ScrollTrigger ~30kb, Framer Motion ~25kb, SplitType ~5kb)

### 5.3 Device Behavior Matrix

| Animation | Desktop | Tablet | Mobile |
|---|---|---|---|
| Lenis smooth scroll | On | Off | Off |
| Custom cursor | On | Off | Off |
| Magnetic buttons | On | Off | Off |
| Text split (chars) | On | Words | Words |
| Parallax images | Full | Reduced | Subtle scale |
| Scroll-pinned | Full | Simplified | Standard scroll |
| Number counters | On | On | On |
| Scroll reveal travel | 40px | 30px | 20px |
| Stagger delays | 100ms | 80ms | 60ms |
| Page transitions | Line wipe | Crossfade | Crossfade |
| Image hover zoom | On | Off | Off |
| Service card bg reveal | Hover | Always visible | Always visible |

## 6. Page Specifications

### 6.1 Homepage (`/`)

**Hero Section:**
- Full-viewport height, parallax car image background with gradient overlay
- Text-split "Drive Your Ambition." headline (Newsreader 8xl, "Ambition" in italic gold)
- Subtitle + two CTAs (primary "Explore Collection", secondary outline "Lease Programs")
- Budget search tool: glassmorphism floating panel at bottom with Monthly Budget select, Preferred Type select, Lease/Buy toggle, "Find My DDM" gold button

**Curated Selection:**
- Section heading: "Curated Selection" with "View Full Inventory" link
- Bento grid: 8-col featured vehicle (Porsche 911 GT3, "New Arrival" tag, price + monthly) + 4-col stack of 2 vehicles (Range Rover, Mercedes S-Class)
- All cards: image zoom on hover, gradient overlay from bottom, info at bottom

**DDM Difference:**
- Asymmetric 2-col: left showroom image, right text content
- DDM monogram watermark at 3% opacity (background, top-right)
- 3 feature rows: icon box + title + description, stagger-revealed
- Features: Multi-Point Pedigree, Bespoke Leasing, Nationwide White-Glove

**Services Overview:**
- 3-column grid with 1px gaps (intentional exception to the No-Line Rule — the thin gap between dark cards creates a subtle structural division matching the Stitch design), dark cards with tonal hover
- Each: headline (with italic gold word), description, arrow link that expands gap on hover
- Services: Sell or Trade, The Leasing Desk, DDM Atelier

**Footer:** Shared component (see Section 7).

### 6.2 The Atelier — About (`/about`)

**Hero:** "Established 2024" label, "The Atelier: Bespoke Excellence" headline (9xl), gold divider line.

**Hero Image:** 21:9 aspect ratio, grayscale by default, color on hover, scale animation.

**Editorial Section:** 12-col grid — 4-col "The Art of Curated Motoring" heading, offset 7-col body text (large lead paragraph + detailed paragraph), "Private Gallery" / "By Appointment" stats below divider.

**CTA:** "Begin Your Bespoke Journey" centered, two buttons (Request Membership, Schedule a Visit).

### 6.3 Inventory (`/inventory`)

**Hero:** "The Reserve Inventory" with gold gradient text, stats (42 units / LAX).

**Filters:** Manufacturer pill buttons (All/Porsche/Ferrari/Lamborghini), Body Style buttons, Filter + Sort controls.

**Vehicle Grid:** 3-column, each card: image with tag badge, make/model, specs row (speed/hp/drivetrain), monthly lease price, arrow button. Hover: border glow to primary.

**Curated Collections:** Bento grid — large "The Classics" (2-col×2-row), "Electric Luxury" (2-col), "Interiors" (1-col, centered label), gold "Bespoke Ordering" card (1-col).

### 6.4 Vehicle Detail (`/inventory/[slug]`)

**Hero:** Full-screen car image, massive model name (10rem), spec tags.

**Specs:** 4-column grid with number counter animations (acceleration, HP, top speed, downforce). Hover: scale-up.

**Gallery:** 12-col (8-col main + 4-col 2-image stack). Images zoom on hover.

**Atelier Info:** 8-col card with two-column text, location + verification badges, monogram watermark.

**Lease Sidebar:** 4-col sticky panel — price, two CTA buttons, vehicle details (odometer, interior, transmission).

**Map:** Full-width grayscale image with gold pin.

### 6.5 Services & Concierge (`/services`)

**Hero:** 95vh, "The Elite Concierge" in massive italic gold with text-glow effect.

**Services Grid:** 3×2 grid, 520px tall cards. Each: hidden background image that reveals at 20% opacity on hover, icon, title (italic, hover→gold), description, arrow link. Services: Leasing, Financing, Credit, Sell/Trade, Delivery, Concierge.

**Bespoke Experience:** Asymmetric — left: "Bespoke Experience" (9rem italic), description, stats (24/7, 50+, Elite), expanding-line CTA. Right: 4:5 image with glassmorphism testimonial card overlapping bottom-left.

### 6.6 Bespoke Auto Leasing (`/services/leasing`)

**Hero:** "Bespoke Auto Leasing" italic headline, starting price glassmorphism card (right).

**Art of the Lease:** Left: 3 features with gold left-border hover. Right: staggered image grid (2-col with offset) + info cards.

**Vehicle Portfolio:** Bento grid — 2-col×2-row hero, 2-col secondary, 2 small cards.

**CTA:** "Begin Your Journey" centered, Concierge + Brochure buttons.

### 6.7 Precision Auto Financing (`/services/financing`)

**Hero:** "Financial Engineering." headline, DDM monogram watermark.

**Bento Specs:** 8-col Private Lender Network (stats: 3.2%, 24h, $0, grayscale portrait right) + 4-col Elite Privacy + 3 small cards (Concierge Portfolios, Tax Optimization, Trust Score).

**Editorial:** Grayscale portrait + blockquote with gold border.

**CTA:** Email input + Request Callback button.

### 6.8 Credit Application Info (`/services/credit-info`)

**Hero:** Split layout — left text, right 4:5 grayscale→color image + quote overlay.

**Form:** Step indicator (01/03), 2×2 input grid (name, email, phone, contact method), Tailored Structures card with Lease/Finance toggles, gold "Proceed to Verification" button.

**Features Bento:** Unrivaled Privacy (2-col), 24/7 Concierge, Prestige Perks, cinematic banner.

### 6.9 Direct Acquisition (`/services/acquisition`)

**Hero:** Grayscale vintage car, "Direct Acquisition." headline, "48 Hours" stat.

**Value Proposition Bento:** 8-col Unrivaled Market Liquidity ($500M+, 24h, 100%), 4-col gold Elite Appraisal card, 12-col glass logistics card.

**Process:** Sticky left column with 4 numbered steps (01-04), right column with parallax image + testimonial card.

**CTA:** Gold-tinted card with email input.

### 6.10 Seamless Trade-Ins (`/services/trade-in`)

**Hero:** Stacked car images (modern over vintage), "The Perfect Transition." headline.

**Valuation Section:** Left: editorial with icon features (Bespoke Appraisals, Portfolio Integration). Right: glassmorphism valuation form (vehicle ID, mileage, interest select, submit button).

**Bento Grid:** Glass market knowledge card, tax efficiency, 24h stat, certified badge.

**Testimonial:** Full-width centered blockquote.

### 6.11 Bespoke Home Delivery (`/services/delivery`)

**Hero:** 90vh, "Bespoke Home Delivery" 9xl headline.

**Handover Bento:** 8-col ceremony card (split), 4-col punctuality card, 4-col atmosphere card, 8-col ecosystem card (split).

**Logistics:** 2-col — left features list (Bureaucratic Management, Full-Value Indemnity, Platinum Protocol), right circular image.

**CTA:** Two buttons centered.

### 6.12 Lease Calculator (`/calculator`)

**Vehicle Selector:** Thumbnail + model name + MSRP, dropdown expand.

**Inputs:** Down payment range slider ($5k-$50k), Lease term buttons (24/36/48), Annual mileage cards (10k/12k/15k with labels Limited/Standard/Executive).

**Results Panel:** Sticky glassmorphism card — "Estimated Monthly Investment" label, massive price, purchase option price, total interest, two CTA buttons, security/concierge badges, disclaimer.

**Related:** 3 cards with grayscale→color hover (Interior Customization, Collector Leases, Maintenance Inclusive).

### 6.13 Secure Credit Application (`/apply`)

**Hero:** "Secure Credit Application" headline, encryption + prequalification badges, image + quote overlay.

**Form:** DDM monogram watermark, step indicator, underline inputs (name, email, phone, contact method), Tailored Options card with Lease/Finance toggles, gold submit button, SSL badge.

**Features Bento:** Unrivaled Privacy, 24/7 Concierge, Prestige Perks, cinematic banner.

### 6.14 Contact & Inquire (`/contact`)

**Sidebar:** Left sidebar (desktop only) — DDM Concierge heading, nav links mapped to routes:
- Showroom → `/inventory`
- Private Collection → `/inventory` (filtered)
- Service Center → `/services`
- Financial Suites → `/services/financing`
- Contact → `/contact` (active)
- Schedule Viewing button → scrolls to inquiry form

**Hero:** "The Direct Line to Excellence." headline.

**Content Grid:** Left (4-col): Baldwin Park Atelier address/phone/email, Private Appointments card, atmospheric image. Right (8-col): inquiry form — name, email, interest radio group (Acquisition/Leasing/Bespoke/General), message textarea, gold submit button.

**Map:** Full-width aerial night view with gold Atelier pin overlay card.

## 7. Shared Components

### 7.1 Navbar

Fixed top, glassmorphism background (`bg-background/90 backdrop-blur-xl`), gold DDM logo (Newsreader italic), nav links (10px uppercase tracking-widest), search bar (desktop), calendar + person icons, gold Inquire CTA button. Active page: gold text with underline.

**Nav links and route mapping:**

| Label | Route | Notes |
|---|---|---|
| Inventory | `/inventory` | |
| Leasing | `/services/leasing` | |
| Sell/Trade | `/services/trade-in` | |
| About | `/about` | |
| Concierge | `/services` | Services hub page |
| Inquire (CTA) | `/contact` | Gold button |

Desktop (lg+): full nav. Tablet: hamburger + Inquire. Mobile: logo + hamburger.

### 7.2 Mobile Menu

Full-screen overlay, dark background, large stacked nav links in Newsreader italic. Smooth slide-in animation. Contact info at bottom.

### 7.3 Footer

Background: `surface-container-lowest` (#0e0e0e). Grid layout — left: DDM logo (Newsreader italic 3xl gold) + tagline + social icons. Right: 3-column links (Contact, Services, Legal). Bottom bar: copyright centered, 10px uppercase.

## 8. Responsive Strategy

### 8.1 Breakpoints

- `sm`: 640px, `md`: 768px, `lg`: 1024px, `xl`: 1280px, `2xl`: 1536px
- Design is desktop-first, gracefully adapting down

### 8.2 Layout Transformations

- Bento grids → stacked single column on mobile
- 12-col editorial → single column
- Side-by-side (text + image) → stacked, image first
- Vehicle grid: 3-col → 2-col tablet → 1-col mobile
- Sticky sidebars → non-sticky stacked on mobile
- Contact sidebar → hidden on mobile

### 8.3 Typography Scaling

- Hero headlines: 10rem → 5rem → 3.5rem
- Section headings: 5-6rem → 3.5rem → 2.5rem
- Body: consistent 16px
- Labels (10px uppercase): consistent

### 8.4 Touch Optimizations

- 44px minimum touch targets
- Native select dropdowns on mobile
- Larger input padding on mobile
- Hover states → tap/active states
- Service card images visible by default on mobile

## 9. Performance Targets

- Lighthouse mobile: 90+
- FCP: <1.5s
- LCP: <2.5s
- JS bundle: <150kb gzipped
- All images: Next.js Image with WebP/AVIF, responsive srcset, blur placeholders
- `prefers-reduced-motion`: all animations disabled, content still accessible

## 10. Image Strategy

Stock images from Unsplash/Pexels matching the Stitch design aesthetic:
- Dark, cinematic lighting
- Luxury/exotic vehicles (Porsche, Ferrari, Range Rover, Mercedes)
- Moody showroom/garage interiors
- Detail shots (wheels, interiors, keys)
- Professional/concierge portraits (grayscale)

All images optimized through Next.js Image component with lazy loading and blur placeholders. Structured in `/public/images/` by page context.

## 11. Vehicle Data Schema

All vehicle data lives in `lib/constants.ts` as a typed array. The dynamic route `/inventory/[slug]` resolves against the `slug` field.

```typescript
interface Vehicle {
  slug: string;              // URL-safe identifier: "porsche-911-gt3-rs"
  make: string;              // "Porsche"
  model: string;             // "911 GT3 RS"
  year: number;              // 2024
  tagline: string;           // "Aero-Optimized Masterpiece"
  price: number;             // 215900 (MSRP in dollars)
  monthlyLease: number;      // 3450
  category: "coupe" | "suv" | "sedan" | "convertible";
  manufacturer: "porsche" | "ferrari" | "lamborghini" | "land-rover" | "mercedes" | "other";
  specs: {
    acceleration: string;    // "3.0s"
    horsepower: number;      // 518
    topSpeed: number;        // 184
    drivetrain: string;      // "RWD"
    transmission: string;    // "7-Speed PDK"
    downforce?: string;      // "1,895 lbs at 177 mph"
  };
  details: {
    odometer: string;        // "142 Miles"
    interior: string;        // "Black / Arctic Grey"
    engine: string;          // "4.0L Flat-6"
  };
  badge?: "new-arrival" | "certified-pre-owned";
  images: {
    hero: string;            // Primary full-width image
    gallery: string[];       // Detail shots
    thumbnail: string;       // Card/list thumbnail
  };
}
```

Initial dataset: 6-8 vehicles covering Porsche, Ferrari, Range Rover, Mercedes, Lamborghini. Enough to populate the inventory grid, homepage bento, and calculator selector.

## 12. Form Validation & Error States

Forms are frontend-only but must validate inputs and show errors matching the luxury aesthetic.

**Validation rules:**
- Name: required, min 2 characters
- Email: required, valid email format
- Phone: required, valid phone format
- Message (contact): required, min 10 characters

**Error display:**
- Inline error text below the field in `error` (#ffb4ab), 11px Manrope
- Input border-bottom transitions from `outline-variant` to `error` color
- Error text fades in with 200ms transition
- No toast notifications or alert dialogs — errors stay inline, matching the elite atmosphere
- Background colors remain dark (no red backgrounds)

**Submit behavior:**
- Button shows brief "Submitted" state with checkmark, then resets after 2 seconds
- No actual submission — this is a visual-only confirmation for the initial build

## 13. Loading & Skeleton States

**Page loading:** Framer Motion page transition handles the visual gap between routes. No additional loading spinner needed.

**Image loading:** Next.js `<Image>` with `placeholder="blur"` and `blurDataURL` generated at build time. Images fade in over 500ms when loaded.

**Vehicle grid (Inventory page):** If filtering is implemented client-side, cards fade out and back in with stagger animation when filter changes. No skeleton screens — the data is static and renders instantly on SSG.

**Lease calculator:** Results update instantly on input change (client-side math). The price number animates between values using the NumberCounter component.

## 14. 404 Page

Custom not-found page (`app/not-found.tsx`) matching the DDM aesthetic:
- Dark background (#0a0a0a)
- DDM monogram watermark at 3% opacity
- "Lost in the Collection" headline (Newsreader italic, 6xl)
- "The page you're looking for has been relocated or no longer exists." subtitle
- "Return to Gallery" primary gold button → links to `/`
- "Contact Concierge" secondary outline button → links to `/contact`

## 15. SEO Strategy

Each page exports Next.js `metadata` with unique title and description.

| Page | Title | Description |
|---|---|---|
| Homepage | Dream Drive Motors \| Curated Automotive Excellence | Premium pre-owned luxury vehicles. Bespoke leasing, financing, and concierge services in Baldwin Park, CA. |
| Inventory | The Reserve Inventory \| Dream Drive Motors | Explore our curated collection of high-performance vehicles and luxury grand tourers. |
| Vehicle Detail | {Year} {Make} {Model} \| Dream Drive Motors | (Dynamic per vehicle) |
| About | The Atelier \| Dream Drive Motors | Our philosophy of bespoke automotive curation. Private gallery in Baldwin Park, California. |
| Services | Services & Concierge \| Dream Drive Motors | Leasing, financing, acquisition, trade-in, and white-glove delivery services. |
| Leasing | Bespoke Auto Leasing \| Dream Drive Motors | Curated lease programs for the world's finest automobiles. |
| Financing | Precision Auto Financing \| Dream Drive Motors | Private lender network and bespoke capital solutions. |
| Credit Info | Credit Application \| Dream Drive Motors | Secure, accelerated credit processing for the discerning individual. |
| Acquisition | Direct Acquisition \| Dream Drive Motors | Immediate valuations and discreet liquidation for significant automobiles. |
| Trade-In | Seamless Trade-Ins \| Dream Drive Motors | Effortless transitions between masterpieces with maximum equity applied. |
| Delivery | Bespoke Home Delivery \| Dream Drive Motors | Elite handover ceremony with climate-controlled enclosed transit. |
| Calculator | Lease Calculator \| Dream Drive Motors | Tailor your monthly investment with our concierge-calibrated calculator. |
| Apply | Secure Credit Application \| Dream Drive Motors | Begin your bespoke financing journey with absolute discretion. |
| Contact | Contact & Inquire \| Dream Drive Motors | Schedule a private viewing or submit a bespoke inquiry. |

**Additional SEO:**
- `robots.txt` and `sitemap.xml` auto-generated via Next.js App Router conventions
- Open Graph image: dark card with DDM gold logo, used as default, overridden per vehicle detail page
- Structured data: `LocalBusiness` schema on homepage (name, address, phone, hours)

## 16. Accessibility

**Target:** WCAG 2.1 AA compliance where feasible given the dark luxury aesthetic.

**Focus management:**
- Custom focus ring: 2px `primary` (#D4AF37) outline with 2px offset on all interactive elements
- Skip-to-content link: visually hidden, appears on Tab, links to `<main>`
- Mobile menu: focus trapped when open, Escape to close

**Color contrast:**
- `on-surface` (#e5e2e1) on `background` (#0a0a0a): ratio 15.2:1 (passes AAA)
- `on-surface-variant` (#d0c5af) on `surface` (#131313): ratio 10.4:1 (passes AAA)
- `primary` (#D4AF37) on `background` (#0a0a0a): ratio 9.4:1 (passes AAA)
- 10px label text (`on-surface-variant` on dark): ratio 9.6:1+ on all dark surfaces, passes AA for normal text (4.5:1 threshold)

**ARIA:**
- Icon-only buttons (calendar, person, hamburger): `aria-label` attributes
- Custom cursor: `aria-hidden="true"`, does not affect screen reader experience
- Glassmorphism cards: proper semantic structure (`<article>`, `<section>`, headings)
- Form inputs: associated `<label>` elements
- Image alts: descriptive alts for all vehicle/showroom images, decorative images use `alt=""`

**Motion:**
- `prefers-reduced-motion: reduce`: all animations instantly complete (no motion), Lenis disabled, custom cursor disabled, parallax disabled, page transitions instant

## 17. Future Phases (Out of Scope)

- Backend form submissions (EmailJS/Resend integration)
- Real inventory data from API/CMS
- Admin dashboard for submissions
- User accounts / saved vehicles
- Real map integration (Google Maps/Mapbox)
- Analytics integration
