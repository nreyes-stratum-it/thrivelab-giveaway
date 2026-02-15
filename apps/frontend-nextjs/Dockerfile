
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

ARG NEXT_PUBLIC_API_URL=http://localhost:3001/api
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NEXT_TELEMETRY_DISABLED=1

WORKDIR /app/apps/frontend-nextjs
RUN pnpm run build


FROM node:20-alpine AS production

WORKDIR /app

RUN npm install -g serve

COPY --from=build /app/apps/frontend-nextjs/out ./out

RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001 && \
    chown -R nextjs:nodejs /app

USER nextjs

EXPOSE 3000

ENV NODE_ENV=production

CMD ["serve", "-s", "out", "-l", "3000"]