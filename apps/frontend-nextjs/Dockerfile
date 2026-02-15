FROM node:20-alpine AS base

RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app


FROM base AS dependencies

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc* ./
COPY apps/frontend-nextjs/package.json ./apps/frontend-nextjs/
COPY packages ./packages

RUN pnpm install --frozen-lockfile


FROM base AS build

WORKDIR /app

COPY --from=dependencies /app/node_modules ./node_modules
COPY --from=dependencies /app/apps/frontend-nextjs/node_modules ./apps/frontend-nextjs/node_modules

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc* ./
COPY apps/frontend-nextjs ./apps/frontend-nextjs
COPY packages ./packages

ARG NEXT_PUBLIC_API_URL=http://localhost:3001
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

WORKDIR /app/apps/frontend-nextjs
RUN pnpm run build


FROM base AS prod-dependencies

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc* ./
COPY apps/frontend-nextjs/package.json ./apps/frontend-nextjs/
COPY packages ./packages

RUN pnpm install --frozen-lockfile --prod


FROM base AS production

WORKDIR /app

COPY --from=prod-dependencies /app/node_modules ./node_modules
COPY --from=prod-dependencies /app/apps/frontend-nextjs/node_modules ./apps/frontend-nextjs/node_modules

COPY --from=build /app/apps/frontend-nextjs/.next ./apps/frontend-nextjs/.next
COPY --from=build /app/apps/frontend-nextjs/public ./apps/frontend-nextjs/public

COPY --from=build /app/package.json ./
COPY --from=build /app/apps/frontend-nextjs/package.json ./apps/frontend-nextjs/
COPY --from=build /app/apps/frontend-nextjs/next.config.* ./apps/frontend-nextjs/

RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001

RUN chown -R nextjs:nodejs /app

USER nextjs

WORKDIR /app/apps/frontend-nextjs

EXPOSE 3000

ENV NODE_ENV=production
ENV PORT=3000

# Health check
# HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
#   CMD node -e "require('http').get('http://localhost:3000', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

CMD ["pnpm", "start"]