# Inter Luxury Hotel — Full Hotel Management System

A Next.js clone/rebuild of the Inter Luxury Hotel management system: a public
booking + restaurant-ordering site plus a full admin console, themed around
an Addis Ababa five-star hotel (gold-on-charcoal palette, Fraunces + Manrope
type).

## Features

**Public site**
- Hero, Rooms & Suites, "What Sets Us Apart", Menu, and My Account sections
  on a single scrolling page with anchor navigation
- Room browsing with live availability and per-night pricing
- Book-a-room flow (dates, guests, ID verification) that computes nights ×
  price automatically
- Restaurant menu with category filters (Breakfast/Lunch/Dinner/Drinks/Dessert)
- Cart drawer + checkout for food orders (table/room delivery)
- Email/password login and registration (with ID verification fields)
- My Account: booking history and order history with live status badges

**Admin console** (`/admin`, requires an admin account)
- Overview dashboard: revenue, room/menu counts, pending bookings/orders
- Rooms: create/edit/delete, set price, type, image, availability
- Menu: create/edit/delete dishes and drinks by category
- Bookings: view all reservations, update status (pending → confirmed →
  completed/cancelled)
- Orders: view all food orders, update status (pending → preparing →
  completed/cancelled)
- Users: promote/demote admins, suspend/reactivate accounts, delete users
- Settings: change the homepage hero image

## Tech

- Next.js 16 (App Router), React, Tailwind CSS v4
- A tiny JSON-file "database" (`data/db.json`, seeded from `data/db.seed.json`)
  read/written by the Next.js API routes under `app/api/**` — no external
  database needed to try it out
- Client state (auth session, cart) persisted to `localStorage`
- Icons: lucide-react

## Getting started

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

On first run, `data/db.json` is created automatically from the seed data.
Delete it any time to reset the demo data.

### Demo accounts

| Role  | Email             | Password |
|-------|-------------------|----------|
| Admin | admin@inter.com   | admin123 |
| Guest | sara@example.com  | sara123  |

### Production build

```bash
npm run build
npm start
```

## Notes / next steps for production use

- Passwords are stored in plaintext in the demo JSON store — swap in a real
  database (Postgres/MySQL/Mongo) and hash passwords (bcrypt) before going
  live.
- Sessions are just the user object in `localStorage`; add real auth
  (NextAuth, JWT + httpOnly cookies) for production.
- Image uploads use direct URLs; wire up a file/image upload service
  (S3, Cloudinary, UploadThing) if you want to upload photos instead of
  pasting links.
