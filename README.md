# StayFinder — Premium Hotel Search SPA

A production-ready Hotel Search Single Page Application built with Next.js 15 App Router, powered by the SearchAPI Google Hotels API.

---

## 🚀 Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 |
| UI Components | Shadcn UI (manual) |
| Forms | React Hook Form + Zod |
| Data Fetching | TanStack Query v5 |
| HTTP Client | Axios |
| Animations | Framer Motion |
| Icons | Lucide React |

---

## 🔒 Security Architecture

The SearchAPI key **never** reaches the browser. All external API calls flow through a Next.js server-side API route:

```
Browser (client)
    │
    │ GET /api/hotels?q=Paris&...
    ▼
Next.js API Route (server)   ← SEARCHAPI_KEY lives here only
    │
    │ GET searchapi.io/api/v1/search?api_key=***
    ▼
SearchAPI / Google Hotels
```

Security measures implemented:
- ✅ API key stored in `.env.local` only (never `NEXT_PUBLIC_`)
- ✅ API route sanitizes all errors before returning to client
- ✅ No raw SearchAPI responses forwarded (only `properties`, `brands` fields)
- ✅ Security headers: `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`
- ✅ Input validation on both client (Zod) and server side

---

## 📦 Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/hotel-search.git
cd hotel-search

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env.local
# Edit .env.local and add your SearchAPI key

# 4. Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔑 Environment Variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_APP_NAME=StayFinder
SEARCHAPI_KEY=your_actual_searchapi_key
```

Get your API key at [searchapi.io](https://www.searchapi.io).

> ⚠️ Never commit `.env.local`. It is already listed in `.gitignore`.

---

## 📁 Folder Structure

```
src/
├── app/
│   ├── api/
│   │   └── hotels/
│   │       └── route.ts          # Server-side API proxy
│   ├── globals.css               # Tailwind v4 + custom animations
│   ├── layout.tsx                # Root layout with metadata + providers
│   └── page.tsx                  # Main page orchestration
│
├── components/
│   ├── ui/                       # Shadcn UI primitives
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   ├── select.tsx
│   │   ├── card.tsx
│   │   ├── badge.tsx
│   │   ├── skeleton.tsx
│   │   ├── slider.tsx
│   │   ├── checkbox.tsx
│   │   └── separator.tsx
│   ├── layout/
│   │   ├── Navbar.tsx            # Sticky glassmorphism navbar
│   │   └── Footer.tsx
│   ├── search/
│   │   ├── SearchHero.tsx        # Animated hero section
│   │   └── SearchCard.tsx        # RHF + Zod form
│   ├── hotels/
│   │   ├── HotelCard.tsx         # Full-featured hotel card
│   │   ├── HotelGrid.tsx         # Stagger animation grid
│   │   ├── HotelFilters.tsx      # Filter sidebar
│   │   └── SortDropdown.tsx      # Sort selector
│   ├── common/
│   │   ├── LoadingSkeleton.tsx   # Shimmer skeletons
│   │   ├── EmptyState.tsx        # Beautiful empty states
│   │   ├── ErrorState.tsx        # Error-code-specific states
│   │   └── Pagination.tsx        # Accessible pagination
│   └── providers/
│       └── QueryProvider.tsx     # TanStack Query provider
│
├── features/
│   └── hotels/
│       └── useHotelSearch.ts     # TanStack Query search hook
│
├── hooks/
│   ├── useDebounce.ts
│   └── useFilters.ts             # Filter + sort logic
│
├── lib/
│   ├── axios.ts                  # Axios instance
│   └── utils.ts                  # cn() utility
│
├── services/
│   └── hotelService.ts           # API service layer
│
├── types/
│   └── hotel.ts                  # All TypeScript interfaces & enums
│
├── schemas/
│   └── searchSchema.ts           # Zod validation schema
│
├── constants/
│   └── index.ts                  # App-wide constants
│
└── utils/
    ├── formatters.ts             # Price/rating/type formatters
    └── errorHandler.ts           # HTTP error → user message
```

---

## ▶️ How to Run

```bash
# Development
npm run dev

# Production build
npm run build
npm start

# Lint
npm run lint
```

---

## ✨ Features

### Search
- **Destination** (required) with Zod validation
- **Check-in / Check-out** with cross-field date validation
- **Adults + Children** guest counts
- **Currency** selector (10 currencies)
- **Language** selector (10 languages)
- Collapsible advanced options panel
- Inline animated error messages

### Results
- Responsive grid: 1 → 2 → 3 → 4 columns
- Full hotel data: name, address, rating, reviews, price, amenities, star class, nearby places, check-in/out times, property type, free cancellation, deal badges
- Lazy image loading with error fallback
- External link to hotel detail page

### Filters (client-side, no extra API calls)
- Minimum rating selector (Any / 3+ / 3.5+ / 4+ / 4.5+)
- Price range dual slider ($0–$2000+)
- Property type checkboxes (9 types)
- Free cancellation toggle

### Sort
- Relevance (default)
- Price: Low to High
- Price: High to Low
- Highest Rating
- Most Reviewed

### Pagination
- 12 hotels per page
- Ellipsis for large page counts
- Auto-scroll to results on page change

### UX / Animations
- Framer Motion stagger animations on hotel cards
- AnimatePresence for state transitions
- Skeleton shimmer loading cards
- Animated form field errors
- Smooth page transitions
- Collapsible filter panel

### Accessibility
- ARIA labels on all interactive elements
- `aria-live` on results count
- `aria-busy` on loading state
- `role="alert"` on errors
- Skip-to-content link in navbar
- Full keyboard navigation
- Focus-visible ring on all controls

---

## 🏗️ Architecture

### API Flow

```
1. User fills search form (RHF + Zod validates)
2. onSubmit → useHotelSearch.search(params)
3. TanStack Query triggers queryFn
4. hotelService.searchHotels() → GET /api/hotels?q=...
5. Next.js API route receives request
6. Route reads SEARCHAPI_KEY from process.env
7. Route calls searchapi.io with key in server-side request
8. Response filtered (only properties/brands returned)
9. Client receives data → TanStack Query caches for 5 min
10. useFilters memoizes filtered+sorted results
11. Page paginates with useMemo slice
```

### State Management

- **Server state**: TanStack Query (search results, 5-min cache)
- **Filter state**: `useFilters` hook (local, client-side)
- **Form state**: React Hook Form (with Zod resolver)
- **Pagination state**: `useState` in page component

---

## 🔮 Future Improvements

- [ ] Map view with hotel pins (Mapbox / Google Maps)
- [ ] Saved/favorited hotels (localStorage or user auth)
- [ ] Hotel detail modal with full photo gallery
- [ ] Price history chart per hotel
- [ ] Autocomplete destination suggestions
- [ ] Dark/light theme toggle
- [ ] PWA support with offline caching
- [ ] Server-side rendering for SEO (if hotel pages needed)
- [ ] A/B testing on search form layout
- [ ] Analytics integration (Vercel Analytics, PostHog)
