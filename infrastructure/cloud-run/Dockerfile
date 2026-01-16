FROM oven/bun:1 AS builder

WORKDIR /app
COPY package.json pnpm-lock.yaml ./
COPY apps/web/package.json ./apps/web/
COPY packages/*/package.json ./packages/*/
RUN npm install -g pnpm && pnpm install --frozen-lockfile
COPY . .
RUN pnpm build --filter=@c4/web

FROM oven/bun:1-slim AS runner

WORKDIR /app
COPY --from=builder /app/apps/web/.output ./.output

ENV NODE_ENV=production
ENV PORT=8080

EXPOSE 8080

CMD ["bun", "run", ".output/server/index.mjs"]
