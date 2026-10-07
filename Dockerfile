# ---- Этап 1: сборка ----
FROM oven/bun:1 AS build
WORKDIR /app

COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

COPY . .

# VITE_* переменные встраиваются в браузерную сборку — их нужно задать ДО build
ARG VITE_SUPABASE_URL
ARG VITE_SUPABASE_PUBLISHABLE_KEY
ARG VITE_SUPABASE_PROJECT_ID
ENV VITE_SUPABASE_URL=$VITE_SUPABASE_URL \
    VITE_SUPABASE_PUBLISHABLE_KEY=$VITE_SUPABASE_PUBLISHABLE_KEY \
    VITE_SUPABASE_PROJECT_ID=$VITE_SUPABASE_PROJECT_ID

# Сборка под свой сервер (node-server), а не под облако
ENV NITRO_PRESET=node-server
RUN bun run build

# ---- Этап 2: запуск ----
FROM node:22-slim
WORKDIR /app
ENV NODE_ENV=production PORT=3000 HOST=0.0.0.0

COPY --from=build /app/.output ./.output

EXPOSE 3000
CMD ["node", ".output/server/index.mjs"]
