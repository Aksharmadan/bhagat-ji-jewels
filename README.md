# Bhagat Ji Jewels

Premium jewellery storefront for **Bhagat Ji Jewels**, a heritage jeweller in Chandausi, Uttar Pradesh. The site is built as a polished catalogue and showroom experience for gold, diamond, silver, and platinum jewellery with live metal-rate tools, WhatsApp inquiry flows, appointment booking, and collection storytelling.

## Highlights

- Cinematic home page with jewellery-led hero slides and smooth motion.
- Large product catalogue powered by `data/products.json`.
- Collection pages for signature edits, including Platinum Signature.
- Product detail pages with gallery support, wishlist, and WhatsApp inquiry.
- Live gold-rate ticker and calculator backed by `/api/rates`.
- GoldAPI.io integration for authenticated real-time metal prices.
- Store locator with embedded Google Maps, direct call, and WhatsApp actions.
- Appointment and inquiry APIs for showroom leads.
- Responsive mobile navigation, sticky CTAs, and luxury-focused UI styling.

## Tech Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS 4
- Framer Motion
- GSAP
- Lenis smooth scrolling
- Three.js / React Three Fiber
- Lucide icons

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

Create `.env.local` when running locally:

```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000
GOLDAPI_IO_KEY=your-goldapi-io-access-token
ADMIN_KEY=your-secret-admin-key
```

`GOLDAPI_IO_KEY` is used server-side by `/api/rates`. If it is missing, the site returns fallback indicative rates and labels them as fallback.

## Scripts

```bash
npm run dev      # Start local development
npm run build    # Create production build
npm run start    # Run production server
npm run lint     # Run ESLint
```

## Project Structure

```text
src/app/                 App Router pages and route handlers
src/components/bhagat/   Brand-specific layout, homepage, cards, header, footer
src/components/features/ Calculators, live rates, alerts, and interactive tools
src/components/providers Global providers for theme, wishlist, and smooth scroll
src/lib/                 Products, constants, rate storage, actions, utilities
data/products.json       Product catalogue and collection metadata
public/jewelry/          Local jewellery image assets
```

## Catalogue Management

Products live in `data/products.json`.

Each product supports:

- `name`, `slug`, `category`, `metal`, and `collection`
- `image` and optional `gallery`
- `description`, `subcategory`, `occasion`, `purity`, and `weight`
- `trending`, `featured`, and `isNew` flags
- searchable `tags`

Collection cards are derived from `data/products.json` and curated thumbnail mappings in `src/lib/products.ts`.

## API Routes

- `GET /api/products` - product listing with filters
- `GET /api/products/[slug]` - product details
- `POST /api/inquiries` - save customer/product inquiries
- `GET /api/rates` - live metal rates via GoldAPI.io
- `GET /api/rates/history` - recent saved rate history
- `GET /api/price-alerts` - list saved price alerts
- `POST /api/price-alerts` - create a price alert

## Deployment

Build and run:

```bash
npm run build
npm run start
```

For production, set:

- `NEXT_PUBLIC_SITE_URL`
- `GOLDAPI_IO_KEY`
- `ADMIN_KEY`

## Notes

The repository targets the installed Next.js version. If upgrading Next.js, read the local docs in `node_modules/next/dist/docs/` before changing framework APIs or conventions.
