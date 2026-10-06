<div align="center">

# 🌾 Farmora — Frontend

**Smart Agriculture Marketplace and AI Platform — Web Client**

Role-based web interface for Farmers, Customers, and Administrators, built with Next.js, TypeScript, and Tailwind CSS.

[![Build Status](https://img.shields.io/github/actions/workflow/status/anas20023/Farmora-Frontend/ci.yml?branch=master&style=for-the-badge&logo=githubactions&logoColor=white)](https://github.com/anas20023/Farmora_Frontend/actions)
[![License](https://img.shields.io/github/license/anas20023/Farmora-Frontend?style=for-the-badge)](./LICENSE)
[![Last Commit](https://img.shields.io/github/last-commit/anas20023/Farmora-Frontend?style=for-the-badge&logo=git&logoColor=white)](https://github.com/anas20023/Farmora_Frontend/commits/master)
[![Issues](https://img.shields.io/github/issues/anas20023/Farmora-Frontend?style=for-the-badge)](https://github.com/anas20023/Farmora_Frontend/issues)
[![Pull Requests](https://img.shields.io/github/issues-pr/anas20023/Farmora-Frontend?style=for-the-badge)](https://github.com/anas20023/Farmora_Frontend/pulls)
[![Contributors](https://img.shields.io/github/contributors/anas20023/Farmora-Frontend?style=for-the-badge)](https://github.com/anas20023/Farmora_Frontend/graphs/contributors)
[![Stars](https://img.shields.io/github/stars/anas20023/Farmora-Frontend?style=for-the-badge)](https://github.com/anas20023/Farmora_Frontend/stargazers)

![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-000000?style=flat-square&logo=shadcnui&logoColor=white)
![React Query](https://img.shields.io/badge/React_Query-FF4154?style=flat-square&logo=reactquery&logoColor=white)
![Node](https://img.shields.io/badge/Node-%E2%89%A520-339933?style=flat-square&logo=nodedotjs&logoColor=white)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen?style=flat-square)

[Overview](#-overview) •
[Features](#-features) •
[Tech Stack](#-tech-stack) •
[Getting Started](#-getting-started) •
[Project Structure](#-project-structure) •
[Scripts](#-available-scripts) •
[Deployment](#-deployment) •
[Contributing](#-contributing) •
[Team](#-team)

</div>

---

## 📖 Overview

**Farmora** is a digital agriculture ecosystem that connects farmers directly with customers while providing data-driven decision support through farm management tools, IoT monitoring, machine learning predictions, and an AI assistant (**AgriAI**).

This repository contains the **frontend web application**. It consumes the [Farmora Backend API](https://github.com/anas20023/farmora-backend) over REST and WebSocket and delivers a dedicated, role-specific experience for each user group:

| Role | Experience |
|------|------------|
| 🧑‍🌾 **Farmer** | Farm & crop management, IoT dashboard, ML insights, listings, orders, analytics |
| 🛒 **Customer** | Marketplace, pre-orders, cart & checkout, order tracking, reviews, recommendations |
| 🛡️ **Admin** | Verification, moderation, user management, disputes, IoT/ML monitoring, analytics |

> **Vision:** *Farmers produce → IoT monitors → ML predicts → AI explains → Farmora connects → Customers purchase → Data improves future decisions.*

---

## ✨ Features

### 🧑‍🌾 Farmer
- Farm and plot registration with soil type and map-based location
- Crop management with cultivation stage tracking (Land Preparation → Harvest)
- **Real-time IoT dashboard** — soil moisture, temperature, humidity (live via WebSocket)
- **ML insights** — yield prediction, crop risk assessment, price forecasting with confidence levels
- Crop listing management with pre-order support
- Order acceptance, status updates, and harvest confirmation
- Revenue and performance analytics

### 🛒 Customer
- Marketplace browsing with search and filters (crop, location, price, harvest date)
- Farm and farmer profiles with cultivation transparency
- Cart, checkout, and online payment
- Pre-order crops before harvest
- Real-time order tracking: `Placed → Confirmed → Harvested → Delivered`
- AI-assisted product recommendations
- Post-purchase reviews and ratings

### 🤖 AgriAI Assistant
- Natural-language chat for Farmers, Customers, and Admins
- Role-aware contextual answers (farm data, IoT readings, ML predictions, marketplace data)
- Streaming responses and advisory disclaimers for high-risk agricultural decisions

### 🛡️ Administrator
- Farmer/farm verification and listing moderation (approve / reject / suspend / remove)
- User management and dispute resolution
- IoT device health and ML model monitoring
- Platform-wide analytics and business intelligence

### ⚙️ Platform
- Role-based routing and route guards (RBAC)
- Responsive, accessible UI (light/dark theme)
- Optimistic updates, caching, and background refetching via React Query
- Interactive maps (Leaflet / Mapbox) and rich data visualization (Recharts)

---

## 🧰 Tech Stack

| Category | Technology |
|----------|------------|
| Framework | [Next.js](https://nextjs.org/) (App Router), [React](https://react.dev/) |
| Language | [TypeScript](https://www.typescriptlang.org/) |
| Styling | [Tailwind CSS](https://tailwindcss.com/), [shadcn/ui](https://ui.shadcn.com/) |
| Data Fetching | [TanStack React Query](https://tanstack.com/query) |
| Charts | [Recharts](https://recharts.org/) |
| Maps | [Leaflet](https://leafletjs.com/) / [Mapbox](https://www.mapbox.com/) |
| Real-time | WebSocket (Socket.IO client) |
| Forms & Validation | React Hook Form + Zod |
| Quality | ESLint, Prettier, Husky, lint-staged, Commitlint |
| Testing | Vitest, React Testing Library, Playwright |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 20 (LTS recommended)
- **pnpm** ≥ 9 (or npm / yarn)
- A running instance of the [Farmora Backend](https://github.com/anas20023/farmora-backend)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/anas20023/Farmora_Frontend.git
cd Farmora-Frontend

# 2. Install dependencies
pnpm install

# 3. Configure environment variables
cp .env.example .env.local

# 4. Start the development server
pnpm dev
```

The app will be available at **http://localhost:3000**.

### Environment Variables

Create a `.env.local` file in the project root:

```env
# --- API ---
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
NEXT_PUBLIC_WS_URL=ws://localhost:5000

# --- App ---
NEXT_PUBLIC_APP_NAME=Farmora
NEXT_PUBLIC_APP_URL=http://localhost:3000

# --- Maps (use one provider) ---
NEXT_PUBLIC_MAP_PROVIDER=leaflet        # leaflet | mapbox
NEXT_PUBLIC_MAPBOX_TOKEN=

# --- Payments (public key only) ---
NEXT_PUBLIC_PAYMENT_PUBLIC_KEY=
```

> ⚠️ Never commit `.env.local`. Only variables prefixed with `NEXT_PUBLIC_` are exposed to the browser — never place secrets in them.

---

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start the development server with hot reload |
| `pnpm build` | Create an optimized production build |
| `pnpm start` | Run the production build |
| `pnpm lint` | Lint the codebase with ESLint |
| `pnpm lint:fix` | Auto-fix lint issues |
| `pnpm format` | Format code with Prettier |
| `pnpm typecheck` | Run the TypeScript compiler (no emit) |
| `pnpm test` | Run unit/component tests (Vitest) |
| `pnpm test:e2e` | Run end-to-end tests (Playwright) |

---

## 🗂️ Project Structure

```
Farmora-Frontend/
├── public/                     # Static assets
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (auth)/             # Login, register, forgot password
│   │   ├── (marketplace)/      # Public marketplace & farm profiles
│   │   ├── customer/           # Customer dashboard, cart, orders
│   │   ├── farmer/             # Farmer dashboard, farms, crops, IoT, ML
│   │   ├── admin/              # Admin dashboard & moderation
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── ui/                 # shadcn/ui primitives
│   │   ├── shared/             # Reusable components (tables, cards, modals)
│   │   ├── charts/             # Recharts wrappers
│   │   ├── maps/               # Leaflet / Mapbox components
│   │   └── agri-ai/            # AgriAI chat widget
│   ├── features/               # Feature modules (api, hooks, components, types)
│   │   ├── auth/
│   │   ├── farms/
│   │   ├── crops/
│   │   ├── marketplace/
│   │   ├── orders/
│   │   ├── iot/
│   │   ├── predictions/
│   │   ├── reviews/
│   │   └── analytics/
│   ├── hooks/                  # Global custom hooks
│   ├── lib/                    # API client, utils, constants, validators
│   ├── providers/              # React Query, Auth, Theme, Socket providers
│   ├── middleware.ts           # Role-based route protection
│   ├── styles/                 # Global styles
│   └── types/                  # Shared TypeScript types
├── tests/                      # Unit, component & e2e tests
├── .env.example
├── next.config.ts
├── tailwind.config.ts
└── package.json
```

---

## 🔐 Authentication & Authorization

- JWT-based authentication against the backend (access + refresh token flow)
- `middleware.ts` enforces role-based access (`FARMER`, `CUSTOMER`, `ADMIN`) before pages render
- Tokens are stored in **HttpOnly cookies** where supported; avoid persisting tokens in `localStorage`
- Unauthorized and expired sessions are redirected to `/login` with a return URL

---

## 🔌 Backend Integration

| Concern | Approach |
|---------|----------|
| REST | Typed API client in `src/lib/api`, consumed through React Query hooks |
| Real-time | WebSocket provider for live IoT readings and order status updates |
| AgriAI | Streamed responses from `/ai/chat` rendered progressively |
| Errors | Centralized error handling with toast notifications and error boundaries |

See the [backend repository](https://github.com/anas20023/farmora-backend) for the full API reference.

---

## 🧪 Testing

```bash
pnpm test           # unit & component tests
pnpm test:e2e       # Playwright end-to-end tests
pnpm typecheck      # type safety
```

Continuous Integration runs lint, type checks, and tests on every pull request.

---

## 📦 Deployment

### Vercel (recommended)

1. Import the repository into [Vercel](https://vercel.com/).
2. Set the environment variables listed above.
3. Deploy — every push to `master` triggers a production deployment.

### Docker

```dockerfile
# Dockerfile
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN corepack enable && pnpm install --frozen-lockfile

FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN corepack enable && pnpm build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
EXPOSE 3000
CMD ["node", "server.js"]
```

```bash
docker build -t Farmora-Frontend .
docker run -p 3000:3000 --env-file .env.local Farmora-Frontend
```

> Requires `output: "standalone"` in `next.config.ts`.

---

## 🤝 Contributing

We welcome contributions from the team and community.

1. **Fork** the repo and create your branch from `master`:
   ```bash
   git checkout -b feat/your-feature-name
   ```
2. Follow [Conventional Commits](https://www.conventionalcommits.org/):
   `feat:`, `fix:`, `docs:`, `style:`, `refactor:`, `test:`, `chore:`
3. Make sure checks pass: `pnpm lint && pnpm typecheck && pnpm test`
4. Open a **Pull Request** with a clear description and screenshots for UI changes.

### Branch Naming

| Prefix | Use |
|--------|-----|
| `feat/` | New features |
| `fix/` | Bug fixes |
| `docs/` | Documentation |
| `refactor/` | Code refactoring |
| `chore/` | Tooling, dependencies |

### Code Standards
- Strict TypeScript — avoid `any`
- Feature-based folder organization
- Accessible, responsive components (WCAG 2.1 AA targets)
- No secrets in the client bundle

---

## 👥 Team

### Frontend Team

| Name | Role | GitHub |
|------|------|--------|
| **Anas Ibn Belal** | Full Stack Developer | [@anas20023](https://github.com/github-username) |
| **Anamika Akter Mohona** | Frontend Developer & UI/UX Designer | [@anamika2994](https://github.com/anamika2994) |
| **Fahmida Kaniz** | Frontend Developer & UI/UX Designer| [@Fahmida20006](https://github.com/Fahmida20006) |
| **Sadia Rimi** | Frontend Developer & UI/UX Designer| [@rimi20233](https://github.com/rimi20233) |

### 🌟 Contributors

Automatically generated from the GitHub API:

<a href="https://github.com/anas20023/Farmora_Frontend/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=anas20023/Farmora-Frontend" alt="Contributors" />
</a>

![Repobeats](https://repobeats.axiom.co/api/embed/REPLACE_WITH_YOUR_REPOBEATS_ID.svg "Repobeats analytics image")

---

## 🌍 SDG Alignment

Farmora contributes to the UN Sustainable Development Goals: **SDG 2** (Zero Hunger), **SDG 8** (Decent Work & Economic Growth), **SDG 9** (Industry, Innovation & Infrastructure), **SDG 12** (Responsible Consumption & Production), and **SDG 13** (Climate Action).

---

## 🗺️ Roadmap

- [x] Phase 1 — Core web platform (auth, dashboards, farms, marketplace, orders, reviews)
- [ ] Phase 2 — Pre-orders, analytics, notifications, payments, delivery
- [ ] Phase 3 — ML insights UI (yield, risk, price)
- [ ] Phase 4 — Real-time IoT dashboard
- [ ] Phase 5 — AgriAI assistant
- [ ] Future — Mobile apps, multilingual & voice assistant, disease detection, weather integration

---

## 📄 License

Distributed under the **MIT License**. See [`LICENSE`](./LICENSE) for details.

---

## 🔗 Related Repositories

- ⚙️ [Farmora Backend](https://github.com/anas20023/farmora-backend)

<div align="center">

**Farmora — Smart Agriculture Marketplace and AI Platform**
Made with 💚 for farmers everywhere.

[⬆ Back to top](#-farmora--frontend)

</div>