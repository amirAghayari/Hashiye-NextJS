# حاشیه | Hashiyeh

A platform for publishing student writing and receiving academic feedback from professors.

> **الحاق** — *The margin where learning happens.*

---

## Overview

**Hashiyeh (حاشیه)** is a Persian-language web application designed for academic writing and assessment. It creates a structured environment where students publish their work and professors provide graded feedback with marginal annotations — mirroring the traditional practice of professors writing comments in the margins of student papers.

### The Problem

Academic writing improves through deliberate practice and expert feedback. Yet most student writing receives minimal commentary: a grade without explanation, or feedback detached from the specific passages it addresses. Hashiyeh restores the connection between text and critique.

### The Solution

- **Students** publish structured writing (title, category, tags, full content) and track feedback over time.
- **Professors** review submissions, assign scores from 0–20, and write contextual comments.
- **Automatic averaging** computes each piece's mean score across all professor evaluations.
- **Marginal presentation** keeps feedback visually adjacent to the work, not buried in a separate report.

### Target Audience

- University students seeking structured feedback on academic writing.
- Professors who want a lightweight, focused tool for reviewing and grading student work.
- Academic programs needing a simple submission and assessment workflow.

---

## Features

### Student Experience
- Register with role selection (Student / Professor)
- Create, edit, and delete own writings
- Rich text content with category and tag organization
- View all received grades and professor comments in context
- Personal dashboard listing own submissions with scores

### Professor Experience
- Dedicated grading interface listing all student submissions
- Score assignment (0–20, half-point precision) with optional comments
- Update or remove own grades at any time
- One grade per professor per writing (enforced at database level)
- Filter and search across all submissions

### Writing Publication & Management
- Title (5–200 characters), content (100–10,000 characters)
- Seven predefined academic categories
- Up to 10 tags per writing (max 50 characters each)
- Automatic reading-time estimation
- Paginated, filterable, searchable listings

### Assessment & Feedback
- Score range: 0–20 with validation
- Optional comment up to 500 characters
- Automatic average score calculation on save
- Grades displayed as prominent vermilion numerals in the margin
- Timestamped feedback with professor attribution

### Authentication & Access Control
- JWT-based authentication via HttpOnly cookies
- Role-based authorization (student vs. professor)
- Protected routes with server-side session validation
- Secure password hashing (bcrypt, cost factor 12)

### Internationalization & Accessibility
- Full Persian (RTL) interface with Vazirmatn font
- Editorial typography using Noto Naskh Arabic for titles and scores
- Semantic HTML, ARIA labels, focus management
- Reduced-motion support for all animations
- Dark/light theme with system preference detection

---

## How It Works

```mermaid
flowchart LR
    A[Register & Choose Role] --> B{Role?}
    B -->|Student| C[Create Writing]
    B -->|Professor| D[Browse Submissions]
    C --> E[Publish]
    D --> F[Select Writing]
    F --> G[Read & Evaluate]
    G --> H[Assign Score 0–20]
    H --> I[Add Marginal Comment]
    I --> J[Submit Grade]
    J --> K[Automatic Average Updates]
    K --> L[Student Reviews Feedback]
    E --> L
```

1. **Register** — Provide name, email, password, university, field of study, and role.
2. **Publish** — Students write structured submissions with categories and tags.
3. **Assess** — Professors read, score (0–20), and annotate.
4. **Review** — Students see scores, averages, and marginal comments on their work.

---

## Technology Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| **Framework** | Next.js 15 (App Router) | Full-stack React with Server Components & Server Actions |
| **Language** | TypeScript 5 | Static typing across frontend and backend |
| **Database** | MongoDB + Mongoose | Document storage with schema validation |
| **Authentication** | JWT + HttpOnly cookies | Stateless auth with secure session handling |
| **Validation** | Zod | Schema validation for forms and API boundaries |
| **Forms** | React Hook Form + @hookform/resolvers | Performant form state with Zod integration |
| **Styling** | Tailwind CSS v4 | Utility-first CSS with CSS variables design tokens |
| **UI Components** | shadcn/ui (Radix UI primitives) | Accessible, composable component library |
| **State** | Redux Toolkit | Client-side grading panel state |
| **Animation** | GSAP + CSS | Scroll-triggered pen stroke, reading progress, entrances |
| **Fonts** | Vazirmatn (UI), Noto Naskh Arabic (editorial) | Persian and Arabic typography via next/font |
| **Icons** | Lucide React | Consistent icon set |
| **Date** | Jalali (Persian) calendar via custom utilities | Localized date formatting |
| **Linting** | ESLint (Next.js core-web-vitals + TypeScript) | Code quality |

---

## Architecture & Project Structure

```
students-articles/
├── app/                          # Next.js App Router pages
│   ├── layout.tsx               # Root layout, fonts, theme provider
│   ├── page.tsx                 # Marketing home page
│   ├── globals.css              # Design tokens, theme, typography, motion
│   ├── auth/
│   │   ├── login/page.tsx       # Login page
│   │   └── register/page.tsx    # Registration page
│   ├── dashboard/
│   │   ├── page.tsx             # Dashboard (server component)
│   │   └── DashboardContent.tsx # Dashboard client logic
│   ├── articles/
│   │   ├── page.tsx             # All articles (paginated, filterable)
│   │   ├── create/page.tsx      # Create article form
│   │   ├── my/page.tsx          # Student's own articles
│   │   └── [id]/page.tsx        # Article detail with grading
│   └── grades/page.tsx          # Professor grading workspace
├── actions/                     # Server Actions (backend logic)
│   ├── auth.ts                  # Register, login, logout
│   ├── articles.ts              # CRUD for articles
│   ├── grades.ts                # Grading operations
│   └── article-wrapper.ts       # Revalidation & redirect helpers
├── components/
│   ├── article/                 # Article display & editing
│   ├── auth/                    # Auth forms & shell
│   ├── dashboard/               # Article lists, filters, pagination
│   ├── editorial/               # Design system: Spread, MarginNote, ScoreMark, etc.
│   ├── form/                    # TagInput, specialized inputs
│   ├── grades/                  # Grading workspace components
│   ├── grading/                 # Shared grade fields
│   ├── home/                    # Home page sections
│   ├── layout/                  # Navbar, Footer
│   ├── states/                  # Empty, error, loading states
│   ├── ui/                      # shadcn/ui primitives (Button, Input, etc.)
│   ├── theme-provider.tsx       # next-themes wrapper
│   └── theme-toggle.tsx         # Dark/light switch
├── lib/
│   ├── server/
│   │   ├── auth/auth.ts         # Password hashing, JWT, user CRUD
│   │   ├── mongoose.ts          # MongoDB connection singleton
│   │   └── getCurrentUser.ts    # Session validation helpers
│   ├── validations/             # Zod schemas (article, grade, user)
│   ├── categories.ts            # Category enum mirror
│   ├── format.ts                # Text excerpt, reading time, Persian numerals
│   ├── formatDate.ts            # Jalali date formatting
│   ├── normalizeFa.ts           # Persian/Arabic normalization for search
│   ├── utils.ts                 # cn(), stagger(), faNum()
│   └── gsap.ts                  # GSAP registration
├── models/
│   ├── Article.ts               # Article schema with grades subdocument
│   └── User.ts                  # User schema with role enum
├── store/
│   └── gradeStore.tsx           # Redux slice for grading panel
├── hooks/
│   └── useStoredUser.ts         # Client-side user persistence
├── types/
│   └── article.ts               # TypeScript interfaces
├── public/                      # Static assets
├── .env                         # Environment variables (not committed)
├── package.json
├── tsconfig.json
├── next.config.ts
├── eslint.config.mjs
├── components.json              # shadcn/ui config
└── README.md
```

### Key Architectural Decisions

- **Server Actions over API routes** — Colocates mutations with their callers, reduces boilerplate, leverages Next.js caching/revalidation.
- **Mongoose subdocuments for grades** — Each article embeds its grades array; average score computed in a pre-save hook.
- **JWT in HttpOnly cookies** — Avoids localStorage XSS risk; `SameSite: Lax` for CSRF balance.
- **Redux only for grading panel** — Ephemeral UI state (selected article) doesn't need server sync.
- **Design tokens in CSS variables** — Single source of truth for colors, spacing, type scale; mapped to Tailwind via `@theme`.
- **Vermilion (`--mark`) reserved for grades/annotations** — Visual language reinforces the "margin" metaphor.

---

## Getting Started

### Prerequisites

- Node.js ≥ 20
- MongoDB ≥ 6 (local or remote)
- pnpm (recommended) or npm

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd Student-Articles-NextJS/students-articles

# Install dependencies
npm install
```

### Environment Configuration

Create a `.env.local` file in `students-articles/`:

```env
# MongoDB connection string
MONGODB_URI="mongodb://localhost:27017/student-articles"

# JWT signing secret (generate a strong random string for production)
JWT_SECRET="your-super-secret-jwt-key-min-32-chars"
```

**Required variables:**
| Variable | Description | Required |
|----------|-------------|----------|
| `MONGODB_URI` | MongoDB connection string | Yes |
| `JWT_SECRET` | Secret for signing JWT tokens | Yes |

### Database Setup

Ensure MongoDB is running. No migration step required — Mongoose creates collections and indexes on first connection.

### Development

```bash
npm run dev
```

Visit `http://localhost:3000`.

### Production Build

```bash
npm run build
npm run start
```

---

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with Turbopack |
| `npm run build` | Production build |
| `npm run start` | Run production server |
| `npm run lint` | Run ESLint |

---

## Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `MONGODB_URI` | Yes | — | MongoDB connection string |
| `JWT_SECRET` | Yes | — | Secret key for JWT signing (min 32 chars recommended) |
| `NODE_ENV` | No | `development` | Environment mode; affects cookie `secure` flag |

---

## API / Server Actions Reference

All backend logic lives in **Server Actions** under `actions/`. They are invoked directly from client components via `useActionState` or form `action` props.

### Authentication (`actions/auth.ts`)

| Action | Parameters | Returns |
|--------|------------|---------|
| `register` | `fullName`, `email`, `password`, `role`, `university`, `field` | `{ success, user, error }` |
| `login` | `email`, `password` | `{ success, user, error }` |
| `logout` | — | `{ success }` |

### Articles (`actions/articles.ts`)

| Action | Parameters | Returns |
|--------|------------|---------|
| `createArticle` | `title`, `content`, `category`, `tags[]` | `{ success, articleId, error }` |
| `getArticles` | `page`, `limit` | `{ success, articles[], pagination, error }` |
| `getArticleById` | `id` | `{ success, article, error }` |
| `updateArticle` | `id`, `title?`, `content?`, `category?`, `tags[]?` | `{ success, article, error }` |
| `deleteArticle` | `id` | `{ success, error }` |
| `getMyArticles` | — | `{ success, articles[], error }` |

### Grades (`actions/grades.ts`)

| Action | Parameters | Returns |
|--------|------------|---------|
| `gradeArticle` | `articleId`, `score` (0–20), `comment?` | `{ success, message, error }` |
| `getArticlesForGrading` | — | `{ success, articles[], error }` |
| `removeGrade` | `articleId` | `{ success, article, error }` |

**Authorization notes:**
- `createArticle`, `updateArticle`, `deleteArticle`, `getMyArticles` → student only
- `gradeArticle`, `getArticlesForGrading`, `removeGrade` → professor only
- `getArticles`, `getArticleById` → any authenticated user

---

## Testing

Currently no automated test suite is configured. To add testing:

```bash
# Example: add Vitest + React Testing Library
npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom
```

Then create `vitest.config.ts` and test files alongside components.

---

## Deployment

### Docker (Recommended)

```dockerfile
# Dockerfile
FROM node:20-alpine AS base
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=base /app/public ./public
COPY --from=base /app/.next/standalone ./
COPY --from=base /app/.next/static ./.next/static
EXPOSE 3000
CMD ["node", "server.js"]
```

```bash
docker build -t hashiyeh .
docker run -p 3000:3000 --env-file .env.local hashiyeh
```

**Note:** Add `output: 'standalone'` to `next.config.ts` for standalone output.

### Vercel

1. Push to GitHub.
2. Import in Vercel.
3. Add `MONGODB_URI` and `JWT_SECRET` as environment variables.
4. Deploy.

### Manual VPS

```bash
# On server
git clone <repo>
cd students-articles
npm ci
npm run build
# Use PM2 or systemd to run `npm run start`
```

---

## Security Considerations

- **Passwords**: bcrypt with cost factor 12.
- **JWT**: HS256, 7-day expiry, HttpOnly + Secure + SameSite=Lax cookies.
- **Authorization**: Every Server Action validates role via `requireUser()`.
- **Input validation**: Zod schemas on all mutations.
- **ObjectId validation**: Regex guard on all ID parameters.
- **No secrets in repo**: `.env*` gitignored.

**Not yet implemented:**
- Rate limiting on auth endpoints
- CSRF tokens (mitigated by SameSite=Lax)
- Content Security Policy headers
- Audit logging

---

## Contributing

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature/meaningful-name`.
3. Make changes with clear, atomic commits.
4. Run `npm run lint` and ensure no errors.
5. Open a Pull Request with a description of the change and its rationale.

### Code Style

- TypeScript strict mode enabled.
- ESLint with Next.js recommended config.
- Prettier not configured — follow existing formatting.
- Component files: PascalCase, one default export.
- Server Actions: `action.ts` files, `use server` directive.

---

## License

This project is proprietary. All rights reserved.

---

## Acknowledgments

- **shadcn/ui** for the component foundation.
- **Radix UI** for accessible primitives.
- **Tailwind CSS** for the utility-first workflow.
- **Vazirmatn** by Rastikerdar for the Persian typeface.
- **Noto Naskh Arabic** by Google Fonts for editorial serif.
- **GSAP** for the pen-stroke animation.

---

## Project Mission

> To restore the margin as a place of dialogue — where a professor's red ink meets a student's thinking, and both grow from the encounter.

Hashiyeh is built for the quiet work of academic improvement: one submission, one score, one marginal note at a time.