FROM node:18-alpine AS base

# Step 1. Rebuild the source code only when needed
FROM base AS builder

RUN npm --version

WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json package-lock.json* ./
# Omit --production flag for TypeScript devDependencies
RUN npm ci

COPY app ./app
COPY public ./public
COPY next.config.mjs .
COPY tsconfig.json .
COPY prisma ./prisma/
RUN npx prisma generate

# Environment variables must be present at build time
# https://github.com/vercel/next.js/discussions/14030
ARG EVOLUTION_API_URL
ENV EVOLUTION_API_URL=${EVOLUTION_API_URL}
ARG DATABASE_URL
ENV DATABASE_URL=${DATABASE_URL}
ARG AUTH_SECRET
ENV AUTH_SECRET=${AUTH_SECRET}
ARG AUTH_GOOGLE_ID
ENV AUTH_GOOGLE_ID=${AUTH_GOOGLE_ID}
ARG AUTH_GOOGLE_SECRET
ENV AUTH_GOOGLE_SECRET=${AUTH_GOOGLE_SECRET}
ARG AUTHENTICATION_API_KEY
ENV AUTHENTICATION_API_KEY=${AUTHENTICATION_API_KEY}

# Next.js collects completely anonymous telemetry data about general usage. Learn more here: https://nextjs.org/telemetry
# Uncomment the following line to disable telemetry at build time
# ENV NEXT_TELEMETRY_DISABLED 1

# Build Next.js based on the preferred package manager
RUN npm run build

# Note: It is not necessary to add an intermediate step that does a full copy of `node_modules` here

# Step 2. Production image, copy all the files and run next
FROM base AS runner

WORKDIR /app_prod

ENV NODE_ENV=production

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

COPY --from=builder /app/public ./public

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

COPY --from=builder --chown=nextjs:nodejs /app/prisma ./prisma
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/@prisma ./node_modules/@prisma

# Environment variables must be redefined at run time
ARG EVOLUTION_API_URL
ENV EVOLUTION_API_URL=${EVOLUTION_API_URL}
ARG DATABASE_URL
ENV DATABASE_URL=${DATABASE_URL}
ARG POSRGRES_USER
ENV POSRGRES_USER=${POSRGRES_USER}
ARG POSTGRES_PASSWORD
ENV POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
ARG AUTH_SECRET
ENV AUTH_SECRET=${AUTH_SECRET}
ARG AUTH_GOOGLE_ID
ENV AUTH_GOOGLE_ID=${AUTH_GOOGLE_ID}
ARG AUTH_GOOGLE_SECRET
ENV AUTH_GOOGLE_SECRET=${AUTH_GOOGLE_SECRET}
ARG AUTHENTICATION_API_KEY
ENV AUTHENTICATION_API_KEY=${AUTHENTICATION_API_KEY}

# Uncomment the following line to disable telemetry at run time
# ENV NEXT_TELEMETRY_DISABLED 1

# Note: Don't expose ports here, Compose will handle that for us

CMD ["npm", "run", "start:migrate:prod"]