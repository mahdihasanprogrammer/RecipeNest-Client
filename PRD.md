# Product Requirements Document (PRD)
# RecipeNest — Recipe Sharing Platform

**Type:** Full Stack TypeScript Web Application  
**Timeline:** 3 Days  
**Version:** 1.0

---

## 0) Product Summary

**Product name:** RecipeNest

**Goal:** Build a complete, production-ready Full Stack application using TypeScript where users can browse recipes, view detailed recipe pages, and share their own recipes. The app demonstrates frontend development, backend development, database management, authentication, authorization, API design, and professional UI/UX practices.

**Core promise:** Clean UI, real content (no placeholders), secure auth, solid filtering/search, role-based access (User/Admin), and a polished end-to-end experience.

**Core entity:** Recipe (single primary collection — keeps scope realistic for 3 days)

---

## 1) Technology Stack

### Frontend Stack

1. Next.js (App Router)
2. TypeScript (mandatory)
3. Tailwind CSS
4. Hero UI (client-side UI components)
5. Recharts or Chart.js (for admin dashboard stats)

### Backend Stack

1. Node.js + Express.js
2. TypeScript (mandatory)
3. MongoDB Driver (no Mongoose)
4. Better Auth (authentication + JWT/session handling)
5. Simple structure — no MVC requirement; a single entry file registers all APIs

### Backend Folder Structure

```
backend/
  src/
    index.ts        → registers all API routes
    db.ts            → MongoDB connection
    auth.ts          → Better Auth config
  package.json
  tsconfig.json
  .env
  .gitignore
```

---

## 2) Global UI & Design Rules

- Use a maximum of **3 primary colors** (+ optional neutral color).
- Maintain consistent layout, spacing, and alignment throughout the project.
- All cards and components must have the **same size, border radius, and visual style**.
- Fully responsive for mobile, tablet, and desktop.
- **No placeholder or dummy content allowed** — all recipe content, testimonials, FAQ, and copy must be real and written specifically for this project.

**Suggested palette:** 1 primary (e.g., warm terracotta/amber — food-appropriate), 1 secondary (e.g., deep forest green), 1 accent (e.g., soft gold), + neutral grays.

---

## 3) Roles & Access

| Role | Description |
|---|---|
| **Visitor** (logged out) | Can browse landing page, explore recipes, view recipe details, register/login |
| **User** (logged in) | All visitor capabilities + add recipes, manage own recipes, view profile |
| **Admin** (logged in) | All user capabilities + manage ALL recipes (view/delete any), access admin dashboard with site stats |

---

## 4) Data Models (MongoDB — no Mongoose, raw driver)

### 4.1 Recipe

**Collection:** `recipes`

```ts
interface Recipe {
  _id: ObjectId;
  title: string;                // required
  shortDescription: string;     // required, max ~160 chars
  fullDescription: string;      // required
  ingredients: string[];        // required, min 1
  steps: string[];              // required, min 1, ordered
  image: string;                // required, cover image URL
  additionalImages?: string[];  // optional gallery
  cookTime: string;             // required, e.g. "45 mins"
  servings: number;             // required
  difficulty: "Easy" | "Medium" | "Hard";  // required
  cuisine: string;               // required, e.g. "Bengali", "Italian", "Chinese"
  ratingAvg: number;             // default 0
  ratingCount: number;           // default 0
  reviews: Review[];             // embedded array
  createdBy: string;             // userId
  createdByName: string;         // denormalized for display
  createdAt: Date;
  updatedAt: Date;
}
```

### 4.2 Review (embedded, not a separate collection)

```ts
interface Review {
  userId: string;
  userName: string;
  rating: number;      // 1–5
  comment: string;
  createdAt: Date;
}
```

### 4.3 User

Identity/session managed by **Better Auth**. Additional metadata stored:

```ts
interface UserMeta {
  userId: string;
  role: "user" | "admin";   // default "user"
}
```

Seed **1 admin account** for demo/grading purposes.

---

## 5) Information Architecture (Routes)

All protected routes are **nested under a role-based dashboard prefix** — this keeps access-control logic centralized (one layout guard per role) instead of scattered across individual routes.

### Logged out (minimum 3 required)

1. `/` — Home (Landing)
2. `/recipes` — Explore Recipes
3. `/recipes/[id]` — Recipe Details
4. `/about`
5. `/contact`

### Auth

- `/login`
- `/register`

### Logged in — User routes (minimum 5 required, nested under `/dashboard/user`)

1. `/recipes` — still accessible
2. `/dashboard/user` — User Dashboard (overview/home)
3. `/dashboard/user/profile` — Profile
4. `/dashboard/user/add-recipe` — Add Recipe
5. `/dashboard/user/my-recipes` — My Recipes

### Logged in — Admin routes (nested under `/dashboard/admin`, admin role only)

1. `/dashboard/admin` — Admin Dashboard (stats, Recharts widgets)
2. `/dashboard/admin/manage-users` — Manage Users (view/promote/demote/delete users)
3. `/dashboard/admin/manage-recipes` — Manage ALL Recipes (moderation — view/delete any recipe)
4. `/dashboard/admin/profile` — Admin's own profile

### Route Guard Logic

- `/dashboard/user/**` → requires an authenticated session (any role). If unauthenticated → redirect to `/login`.
- `/dashboard/admin/**` → requires an authenticated session **and** `role === "admin"`. If unauthenticated → redirect to `/login`. If authenticated but not admin → redirect to `/dashboard/user` (or show 403).
- Implemented once via a layout-level guard at `app/dashboard/user/layout.tsx` and `app/dashboard/admin/layout.tsx` — no need to repeat the check on every page.

---

## 6) Home / Landing Page

### 6.1 Navbar (Public Pages)

Shown on all **public/marketing pages**: `/`, `/recipes`, `/recipes/[id]`, `/about`, `/contact`.

- Full-width background.
- Sticky or fixed position.
- Fully responsive (hamburger menu on mobile).
- **Logged out routes (min 3):** Home, Explore Recipes, About/Contact, Login/Register
- **Logged in routes (min 5):** Home, Explore Recipes, then an **Avatar Dropdown** (top-right) containing: Dashboard (`/dashboard/user`), Add Recipe (`/dashboard/user/add-recipe`), My Recipes (`/dashboard/user/my-recipes`), Profile (`/dashboard/user/profile`), Logout — satisfies the "min 5 logged-in routes" requirement.
- **If `role === "admin"`:** the avatar dropdown additionally shows "Admin Panel" routing to `/dashboard/admin`.

### 6.2 Dashboard Layout (`/dashboard/user/**` and `/dashboard/admin/**`)

Once inside any dashboard route, the public navbar is **hidden** and replaced by a dedicated dashboard shell:

- **Sidebar** (left, collapsible on mobile into a drawer/hamburger):
  - User sidebar: Dashboard Home, My Recipes, Add Recipe, Profile, Logout
  - Admin sidebar: Dashboard Home, Manage Recipes, Manage Users, Profile, Logout
  - Active route is visually highlighted.
- **Top bar** (slim, replaces the full navbar): logo/back-to-site link on the left, **Avatar Dropdown** on the right with the user's name/photo, containing: Profile, Switch to Admin/User view (if applicable), Logout.
- This split (sidebar for navigation, avatar dropdown for account actions) keeps the dashboard focused and distinct from the public marketing site.

### 6.3 Hero Section

- Height limited to **60–70% of the screen**.
- Interactive element: image slider/carousel showing featured recipes, OR animated stat counters.
- Clear CTA buttons: "Explore Recipes" and "Share Your Recipe" (routes to register/login if logged out).
- Clear visual flow guiding the eye to the next section below.

### 6.4 Sections (Minimum 7 — no dummy content)

1. **Hero** (see above)
2. **Featured Recipes** — 4–8 hand-picked/highest-rated recipes from seeded data (curated, not just newest)
3. **Latest Recipes** — the most recently added recipes (sorted by `createdAt` desc, e.g. latest 8), pulled live from `GET /api/recipes?sort=newest&limit=8`; each card links to "View All" → `/recipes?sort=newest`
4. **Cuisine Categories** — Bengali, Chinese, Italian, Indian, Continental, etc. (clickable, routes to `/recipes?cuisine=...`)
5. **Why Cook With RecipeNest** — 3–4 real value-proposition cards (e.g., "Verified Home Cooks", "Step-by-Step Clarity", "Real Reviews")
6. **Statistics** — animated counters (Total Recipes, Total Home Cooks, Cuisines Covered, Total Reviews)
7. **Testimonials** — 3–4 real written testimonials (not lorem ipsum) from "users" of the platform
8. **FAQ** — 5–6 real question/answer pairs (e.g., "Is RecipeNest free to use?", "Can I edit a recipe after posting?")
9. **Newsletter / Call to Action** — email signup form + closing CTA

### 6.5 Footer

- Fully functional footer.
- Working links only (no dead `#` links).
- Contact information (email, phone/location).
- Social links (can point to real platforms, e.g., github.com/yourusername).
- Sitemap-style columns: Company (About, Contact), Explore (Recipes, Categories), Legal (Privacy, Terms).

---

## 7) Core Listing / Card Section (Recipe Card)

Each **Recipe Card** must include:

- Image
- Title
- Short description
- Meta info (minimum 2): cook time, difficulty, cuisine, rating
- "View Details" button

### Card Rules

- Same height and width across all cards.
- Same border radius and layout.
- Desktop view: **4 cards per row**.
- Tablet: 2 cards per row. Mobile: 1 card per row.
- **Skeleton loader** shown while data is loading (shimmer placeholder matching card dimensions).

---

## 8) Recipe Details Page (`/recipes/[id]`)

- Publicly accessible (no login required to view).
- Multiple images: cover image + gallery from `additionalImages`.
- Separate clearly divided sections:
  1. **Overview** — full description
  2. **Key Information** — cook time, servings, difficulty, cuisine, posted date, author name
  3. **Ingredients & Steps** — the recipe's specifications, ordered list
  4. **Reviews / Ratings** — list of embedded reviews + average rating display; logged-in users can submit a review
  5. **Related Recipes** — 3–4 recipes from the same cuisine or difficulty level

---

## 9) Explore / Listing Page (`/recipes`)

- **Search bar** — searches `title` and `shortDescription`.
- **Filtering — minimum 2 fields:**
  - `cuisine` (dropdown)
  - `difficulty` (dropdown)
  - (optional 3rd: `cookTime` range)
- **Sorting options:** Newest, Rating (high to low), Cook Time (low to high)
- **Pagination** (page-based, e.g., 8 recipes per page) — infinite scroll acceptable alternative
- Filtering, search, and sort state reflected in URL query params (`?cuisine=Bengali&difficulty=Easy&sort=newest&page=1`)
- Fully functional — filters actually query the backend, not client-side dummy filtering.

---

## 10) Authentication System (Better Auth)

### Pages

- `/login`
- `/register`

### Requirements

- Proper validation (required fields, email format, password length) with inline error messages.
- Demo login button — auto-fills a demo **User** account's credentials into the form.
- Optional: a second demo button for **Admin** demo credentials.
- Social login (Google/Facebook) — optional, only if time permits.
- Clean, professional UI consistent with the rest of the site's design system.

### Authorization Rules

- `/dashboard/user/**` (profile, add-recipe, my-recipes) → require login → redirect to `/login` if not authenticated.
- `/dashboard/admin/**` (admin dashboard, manage-users, manage-recipes, profile) → requires `role === "admin"` → redirect non-admins to `/dashboard/user` or show 403.

---

## 11) Protected Page: Add Recipe (`/dashboard/user/add-recipe`)

- Only accessible when logged in; unauthenticated users redirected to `/login`.

### Form Fields

- Title
- Short description
- Full description
- Ingredients (dynamic list — add/remove ingredient lines)
- Steps (dynamic list — add/remove step lines)
- Cook time
- Servings
- Difficulty (Easy / Medium / Hard — dropdown)
- Cuisine (dropdown)
- Cover image URL (optional, required to look like a valid URL if provided)
- Additional image URLs (optional)

### Buttons

- Submit (add)

### Validation

- Required fields cannot be empty.
- Servings must be a positive number.
- Image URL fields, if filled, must pass a basic URL format check.

---

## 12) Protected Page: My Recipes / Manage Recipes

### 12.1 User scope — `/dashboard/user/my-recipes`

- Lists **only recipes created by the logged-in user**, in a table/grid layout.
- Actions per row/card: **View**, **Edit**, **Delete** (with confirmation modal).
- **Edit** opens a pre-filled version of the Add Recipe form (`/dashboard/user/my-recipes/[id]/edit` or a modal) — updates the recipe via `PATCH /api/recipes/:id`.
- Clean, readable, responsive layout (table on desktop, stacked cards on mobile).

### 12.2 Admin scope — `/dashboard/admin/manage-recipes`

- Lists **ALL recipes on the platform** (moderation view), showing author name for each.
- Actions per row/card: **View**, **Edit**, **Delete** (any recipe, with confirmation modal).
- Same visual layout/component reused from the user version, just with an unfiltered query and an extra "Author" column.

---

## 13) Admin Dashboard (`/dashboard/admin`) — Admin Only

Widgets (using Recharts/Chart.js):

- Total Recipes (count)
- Total Users (count)
- Total Reviews (count)
- Recipes by Cuisine (Pie/Bar Chart)
- Recipes by Difficulty (Pie/Bar Chart)
- Recently Added Recipes (table, last 5)
- Quick links to `/dashboard/admin/manage-users`, `/dashboard/admin/manage-recipes`, `/dashboard/admin/profile`

### 13.1 Manage Users — `/dashboard/admin/manage-users`

- Lists all registered users in a table: name, email, role, joined date, recipe count.
- Actions: **Promote to Admin / Demote to User** (role toggle), **Delete User** (with confirmation modal — cascades to that user's recipes or blocks deletion if they have recipes, admin's choice).
- Admin cannot demote or delete their own account (safety guard).

### 13.2 Admin Profile — `/dashboard/admin/profile`

- Same profile component as `/dashboard/user/profile` (name, email, joined date, recipe count), reused for the admin's own account.

---

## 14) Additional Pages (minimum 2 required)

1. **About** — real written content about RecipeNest's mission and story.
2. **Contact** — working contact form (client-side validated) + real contact details.
3. *(Optional extra)* **FAQ** as standalone page, or **Privacy/Terms**.

---

## 15) Backend API Design

### Recipes

| Method | Endpoint | Access |
|---|---|---|
| GET | `/api/recipes` | Public — search/filter/sort/pagination |
| GET | `/api/recipes/:id` | Public — recipe details |
| POST | `/api/recipes` | Logged-in user |
| PATCH | `/api/recipes/:id` | Owner or Admin only |
| DELETE | `/api/recipes/:id` | Owner or Admin only |

### `GET /api/recipes` Query Params

- `q` — search term
- `cuisine`
- `difficulty`
- `sort` = `newest | rating_desc | cookTime_asc`
- `page`, `limit`

### Reviews

| Method | Endpoint | Access |
|---|---|---|
| POST | `/api/recipes/:id/reviews` | Logged-in user |

### User

| Method | Endpoint | Access |
|---|---|---|
| GET | `/api/me` | Auth required — returns current user + role |

### Admin

| Method | Endpoint | Access |
|---|---|---|
| GET | `/api/admin/stats` | Admin only — dashboard counts |
| GET | `/api/admin/users` | Admin only — list all users |
| PATCH | `/api/admin/users/:id/role` | Admin only — promote/demote role (blocked for self) |
| DELETE | `/api/admin/users/:id` | Admin only — delete a user (blocked for self) |
| GET | `/api/admin/recipes` | Admin only — list ALL recipes (no `createdBy` filter), used by `/dashboard/admin/manage-recipes` |

### Backend Rules

- All write operations (`POST`, `PATCH`, `DELETE`) verify the session via Better Auth middleware.
- `PATCH`/`DELETE` additionally check: `recipe.createdBy === session.userId OR session.role === "admin"`.
- Straightforward manual validation for required fields and data types (no external validation library required, but allowed if preferred).

---

## 16) UX & Responsiveness Rules

- No lorem ipsum or placeholder content anywhere in the shipped product.
- Fully responsive across mobile, tablet, and desktop breakpoints.
- Proper spacing and alignment using a consistent Tailwind spacing scale.
- All buttons and links must be clickable and lead somewhere real (no dead links, no `href="#"` without function).

---

## 17) Loading / Empty / Error States

Every data-driven view must handle all three states explicitly — no blank screens, no unhandled spinners, no raw console errors shown to the user.

| View | Loading | Empty | Error |
|---|---|---|---|
| Home — Featured/Latest Recipes | Skeleton recipe cards (matches real card dimensions) | Section hidden or "New recipes coming soon" if zero recipes exist | Section silently hidden (never breaks the landing page) |
| Explore Recipes (`/recipes`) | Skeleton recipe cards (matches real card dimensions) | "No recipes match your filters" illustration/message + "Clear Filters" button | "Something went wrong loading recipes" + Retry button |
| Recipe Details (`/recipes/[id]`) | Skeleton for image + text blocks | N/A (404-style "Recipe not found" page if id invalid) | "Couldn't load this recipe" + Retry / Back to Explore |
| My Recipes (`/dashboard/user/my-recipes`) | Skeleton table/card rows | "You haven't added any recipes yet" + "Add Your First Recipe" CTA button | Inline error banner + Retry |
| Manage Recipes (admin) | Skeleton table rows | "No recipes on the platform yet" | Inline error banner + Retry |
| Manage Users (admin) | Skeleton table rows | "No users found" | Inline error banner + Retry |
| Admin Dashboard stats/charts | Skeleton chart placeholders | Charts render with zero-state (e.g., "0 recipes yet") rather than breaking | "Couldn't load dashboard stats" + Retry |
| Reviews section (details page) | Skeleton review rows | "No reviews yet — be the first to review this recipe!" | Inline error, review list section only (rest of page still works) |

### Implementation Notes

- Loading: use Hero UI `Skeleton` components sized to match the real content layout — never a generic full-page spinner for list/grid views.
- Empty: always paired with a clear next action (a button or link), never just static text.
- Error: always paired with a **Retry** action that re-triggers the failed fetch; never a dead-end error message.
- Form submissions (Add/Edit Recipe, Login/Register) use inline field-level errors + a toast/banner for submit failures, plus a disabled/loading state on the submit button while the request is in flight.

---

## 18) Content Policy (No Placeholders)

Must ship with real seeded content:

- **12–20 recipes** seeded in MongoDB across at least 4 different cuisines.
- Each recipe has real ingredients/steps (not "step 1, step 2").
- 3–4 real testimonials written specifically for this product.
- 5–6 real FAQ entries.
- Real About/Contact page copy.

---

## 19) Final Submission Requirements

- Live Website URL
- GitHub Repository Link (frontend and backend)
- Demo Credentials:
  - **User** — Email & Password
  - **Admin** — Email & Password

---

## 20) 3-Day Execution Plan

### Day 1 — Foundation

- Initialize Next.js (App Router, TS) + Tailwind + Hero UI
- Build public layout shell: Navbar (with avatar dropdown for logged-in state) + Footer (responsive)
- Build landing page sections 1–4 (Hero, Featured Recipes, Latest Recipes, Cuisine Categories)
- Setup Express + TS backend, MongoDB driver connection
- Better Auth integration (register/login, session, role field)
- Build `/login` + `/register` pages with demo login button(s)

### Day 2 — Core Recipe Features

- Seed 12–20 real recipes in MongoDB
- Build `GET /api/recipes` with search/filter/sort/pagination
- Build Explore page (`/recipes`) with skeleton/empty/error states
- Build Recipe Details page with all required sections + loading/error states
- Build review submission (embedded array update)
- Finish remaining landing sections (Why Choose Us, Stats, Testimonials, FAQ, Newsletter) to reach 7+

### Day 3 — Dashboard + Protected Pages + Admin + Polish

- Build dashboard shell: Sidebar (role-aware) + slim top bar with Avatar Dropdown, replacing the public navbar inside `/dashboard/**`
- Build `dashboard/user` layout guard (auth required) + `dashboard/admin` layout guard (admin required)
- Build `/dashboard/user/add-recipe` with full form + validation
- Build `/dashboard/user/my-recipes` (own recipes, with View/Edit/Delete + empty/error states) + `/dashboard/user/profile`
- Build Edit Recipe flow (`PATCH /api/recipes/:id`, pre-filled form)
- Build `/dashboard/admin` stats page with Recharts widgets
- Build `/dashboard/admin/manage-recipes` (all recipes, View/Edit/Delete) and `/dashboard/admin/manage-users`
- Build `/dashboard/admin/profile`
- Build About + Contact pages
- Full responsiveness pass, spacing/alignment audit, dead-link check, loading/empty/error states audit
- Deploy frontend + backend, prepare README with demo credentials