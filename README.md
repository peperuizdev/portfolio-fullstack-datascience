# Pepe Ruiz — Portfolio

Una web personal para mostrar proyectos, CV y datos de contacto.

![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=next.js&logoColor=white) ![TypeScript](https://img.shields.io/badge/TypeScript-3078C6?style=flat-square&logo=typescript&logoColor=white) ![Tailwind](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat-square&logo=tailwind-css&logoColor=white)

Descripción breve
------------------
Proyecto personal construido con Next.js y TypeScript. Está pensado para mostrar mi trabajo y facilitar contacto; no es un proyecto colaborativo.

Stack principal
- Next.js (App Router)
- TypeScript + React
- Tailwind CSS
- Prisma (opcional, PostgreSQL)
- Librerías: Framer Motion, GSAP, EmailJS, Lucide

Estructura relevante
- `src/app/` — rutas y páginas (i18n: `/es` y `/en`).
- `src/components/` — componentes reutilizables (Navbar, Footer, etc.).
- `src/data/` — contenido editable: proyectos y skills.
- `src/lib/constants.ts` — configuración del sitio (contacto, enlaces, meta, hero).
- `public/` — imágenes, CVs y otros activos.

Inicio rápido
--------------
1) Instala dependencias:

```bash
npm install
```

2) Levanta en desarrollo:

```bash
npm run dev
```

La app estará disponible en http://localhost:3000

Notas opcionales
- Si quieres usar la parte de administración (Prisma / usuarios): configura `DATABASE_URL` con PostgreSQL y ejecuta migraciones.
- Para generar el cliente Prisma:

```bash
npm run build
# o
npx prisma generate
```

Dónde editar el contenido
- Proyectos: `src/data/projects.ts`
- Textos/meta: `src/lib/constants.ts` y `src/app/[lang]/`
- Imágenes/CV: `public/`

Colaboración y licencia
- Repositorio personal. No se aceptan PRs; puedes usar el código como referencia.

Contacto
- Email: jorsqn@gmail.com
