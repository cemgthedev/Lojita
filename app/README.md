# Application Developer Guide

## Overview

Lojita's frontend is a multi-vendor marketplace and store-management application. It is built with React 19, TypeScript, Vite, Tailwind CSS, React Router, and TanStack Query.

## Prerequisites

- Node.js `^20.19.0` or `>=22.12.0` (required by the installed Vite version).
- npm.
- The backend API is not included. Set `VITE_API_URL` to use API-backed operations; demo and mock fallback data are available for many read flows.

## Getting Started

From the repository root, run:

```powershell
cd app
npm ci
npm run dev
```

The development server prints its local URL in the terminal. The frontend can start without an API URL. To connect it to a backend, set `VITE_API_URL` in the same PowerShell session before starting Vite:

```powershell
$env:VITE_API_URL = Read-Host "Backend API base URL"
npm run dev
```

Alternatively, create `app/.env.local` with `VITE_API_URL=<backend-base-URL>`. No environment template or backend URL is provided in this repository.

## Available Scripts

Run these commands from `app/`:

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Vite development server. |
| `npm run build` | Run the TypeScript project build, then create the production bundle. |
| `npm run lint` | Run ESLint across the app. |
| `npm run preview` | Preview the production build locally; run `npm run build` first. |

There is no test script or test runner configured in `package.json`.

## Project Structure

```text
src/api/          HTTP client and domain API resources
src/components/   reusable UI, forms, entities, and layouts
src/constants/    shared route URLs, tokens, and permissions
src/hooks/        shared React hooks
src/pages/        screens grouped by feature
src/providers/    authentication and application-wide providers
src/routes/       public, authenticated, and role-specific route trees
src/styles/       global styles
src/types/        shared TypeScript types
src/utils/        shared utilities
```

`public/` contains static assets. The `@/` import alias points to `src/`.

## Architecture and Conventions

- **Routing and access:** `src/routes/index.tsx` combines public routes with authenticated routes under `RequireAuth`. Role-specific route modules add `RequireRole` and the corresponding layout. Keep route declarations explicit; sidebar configuration controls navigation, not authorization. See [`src/routes/guide.md`](src/routes/guide.md).
- **Authentication:** `AuthProvider` exposes session state and actions through `useAuth` / `useRequiredAuth`. The current `authApi` uses demo users and `localStorage`; it is not wired to the backend.
- **API integration:** `src/api/http.ts` reads `VITE_API_URL`. Domain resources under `src/api/resources/` separate endpoints, services, query keys, TanStack Query hooks, mutations, validation schemas, and (where present) mock data.
- **Data fetching:** use React Query for resource queries and mutations. Mutations invalidate or update the relevant query keys. Many query hooks use shared helpers to provide mock data when API data is unavailable.
- **Validation:** define resource schemas with Zod under the resource's `validations/` directory. Parse API responses in services instead of trusting untyped response data.
- **Components and pages:** put feature screens in `src/pages/<Feature>/`; reusable primitives belong in `src/components/ui/`, with shared forms, entities, and layouts organized in their respective component directories.

## How to Contribute

- Add a page under `src/pages/<Feature>/` and register it in the appropriate route module. Reuse a page component across role layouts when the experience is shared, but keep each route inside the correct role guard and layout.
- Add reusable UI to `src/components/`; prefer existing component patterns and exports from `src/components/ui/`.
- Add resource data access under `src/api/resources/<resource>/`. Follow neighboring resources for services, query keys, queries, mutations, Zod validations, and mocks.
- Add cross-cutting hooks to `src/hooks/`; keep resource-specific query and mutation hooks with their resource.
- No tests or test conventions are present yet. There is currently no test command; add tests when a test runner and project convention are established.
- Before opening a change, run `npm run lint` and `npm run build` from `app/`.
