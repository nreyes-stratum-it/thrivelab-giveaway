# Thrivelab Giveaway - Monorepo

## Structure
```
thrivelab-giveaway/
├── apps/
│   ├── frontend/    # Next.js app
│   └── backend/     # NestJS app
└── packages/        # Shared code
```

## Quick Start
```bash
# Install all dependencies
pnpm install

# Run both apps
pnpm dev

# Build all
pnpm build
```

## Commands
```bash
# Frontend only
pnpm --filter frontend dev
pnpm --filter frontend build

# Backend only
pnpm --filter backend dev
pnpm --filter backend build
```
