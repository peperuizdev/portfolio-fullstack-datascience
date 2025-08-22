# Usar imagen oficial de Node.js 18 Alpine (más ligera)
FROM node:18-alpine AS base

# Instalar dependencias necesarias para compilación
RUN apk add --no-cache libc6-compat

# Establecer directorio de trabajo
WORKDIR /app

# Copiar archivos de dependencias
COPY package.json package-lock.json* ./

# Instalar dependencias (incluyendo devDependencies para el build)
RUN npm ci

# Rebuild de next.js
FROM base AS builder
WORKDIR /app
COPY . .

# Instalar todas las dependencias necesarias para el build
RUN npm ci

# Variables de entorno para el build
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

# Build de la aplicación
RUN npm run build

# Imagen final de producción
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Crear usuario no-root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copiar archivos necesarios
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

# Exponer puerto
EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Comando para ejecutar la aplicación
CMD ["node", "server.js"]