FROM node:20-alpine AS build
WORKDIR /app

# Chromium for the prerender step (scripts/prerender.mjs) — bakes the real
# per-page <title>/<meta description>/<link rel="canonical"> into static
# HTML so it shows up in "View Source", not just after JavaScript runs.
RUN apk add --no-cache chromium nss freetype freetype-dev harfbuzz ca-certificates ttf-freefont
ENV PUPPETEER_SKIP_DOWNLOAD=true
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
RUN npm run prerender

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
