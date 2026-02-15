FROM node:20-alpine AS base


RUN corepack enable && corepack prepare pnpm@latest --activate

RUN apk add --no-cache openssl

WORKDIR /app


FROM base AS dependencies

# Copiar archivos de configuración del monorepo
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc* ./
COPY apps/backend-nestjs/package.json ./apps/backend-nestjs/
COPY packages ./packages

RUN pnpm install --frozen-lockfile


FROM base AS build

WORKDIR /app

COPY --from=dependencies /app/node_modules ./node_modules
COPY --from=dependencies /app/apps/backend-nestjs/node_modules ./apps/backend-nestjs/node_modules

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc* ./
COPY apps/backend-nestjs ./apps/backend-nestjs
COPY packages ./packages

WORKDIR /app/apps/backend-nestjs
RUN pnpm exec prisma generate

RUN pnpm run build


FROM base AS prod-dependencies

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc* ./
COPY apps/backend-nestjs/package.json ./apps/backend-nestjs/
COPY packages ./packages

RUN pnpm install --frozen-lockfile --prod


FROM base AS production

WORKDIR /app

COPY --from=prod-dependencies /app/node_modules ./node_modules
COPY --from=prod-dependencies /app/apps/backend-nestjs/node_modules ./apps/backend-nestjs/node_modules

COPY --from=build /app/apps/backend-nestjs/dist ./apps/backend-nestjs/dist

COPY --from=build /app/apps/backend-nestjs/generated ./apps/backend-nestjs/generated

COPY --from=build /app/apps/backend-nestjs/prisma ./apps/backend-nestjs/prisma
COPY --from=build /app/apps/backend-nestjs/prisma.config.ts ./apps/backend-nestjs/

COPY --from=build /app/package.json ./
COPY --from=build /app/apps/backend-nestjs/package.json ./apps/backend-nestjs/

RUN addgroup -g 1001 -S nodejs && \
    adduser -S nestjs -u 1001

RUN chown -R nestjs:nodejs /app

USER nestjs

WORKDIR /app/apps/backend-nestjs

EXPOSE 3001
#
## Health check
#HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
#  CMD node -e "require('http').get('http://localhost:3001/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Comando de inicio
CMD ["node", "dist/src/main.js"]