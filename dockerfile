FROM node:lts-bookworm AS builder

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
RUN npm ci --omit=dev

COPY . .

RUN npm run build
RUN npx prisma generate

FROM node:22-alpine

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY package.json ./


EXPOSE 3000
CMD ["node", "dist/main"]
