# ---- Builder: instala deps e compila TypeScript ----
FROM node:22-alpine AS builder
WORKDIR /app

# Build tools para eventuais modulos nativos (ex.: bcrypt).
RUN apk add --no-cache python3 make g++

COPY package*.json ./
RUN npm ci

COPY tsconfig.json .sequelizerc ./
COPY src ./src
RUN npm run build

# ---- Runner: imagem final que roda a app ----
FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# Copia node_modules do builder (inclui sequelize-cli, usado nas migrations
# no start) e o JS ja compilado.
COPY package*.json .sequelizerc ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

# Arquivos necessarios para o sequelize-cli rodar migrations/seeds.
COPY config ./config
COPY migrations ./migrations
COPY seeders ./seeders

EXPOSE 3000

# Aplica migrations (idempotente) e sobe o servidor.
CMD ["sh", "-c", "npm run db:migrate && npm start"]
