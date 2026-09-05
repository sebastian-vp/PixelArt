# PixelArt

Editor web de pixel art donde cada usuario crea sus dibujos en el navegador y los guarda en su propia cuenta.

Proyecto del curso de Aplicaciones Web Reactivas.

## Frontend

### Stack

- **React 19** + **TypeScript**

### Requisitos

- Node.js 20+ y npm

### Puesta en marcha

```bash
cd frontend
npm install
npm run dev
```

La app queda en `http://localhost:5173`.

#### Scripts

| Script | Descripción |
|--------|-------------|
| `npm run dev` | Levanta el servidor de desarrollo con HMR |
| `npm run build` | Compila TypeScript y genera el build de producción |
| `npm run preview` | Sirve el build de producción localmente |
| `npm run lint` | Corre ESLint |
| `npm run lint:fix` | ESLint con autofix |
| `npm run format` | Formatea `src` con Prettier |

### Estructura

```
frontend/
├── public/            # Estáticos (favicon, etc.)
└── src/
    ├── assets/        # Fuentes e imágenes
    ├── components/    # Componentes reutilizables (ej. Sidebar)
    ├── templates/     # Layouts/plantillas de página
    ├── App.tsx        # Componente raíz
    └── main.tsx       # Punto de entrada
```

## Backend

No configurado aún.

## Convención de commits

**Formato:** `<tipo>(<scope opcional>): <resumen>`

- Resumen en imperativo (`add`, `fix`, `remove`), máx. 50 caracteres, sin punto final.
- Contexto extra va en el cuerpo del mensaje, no en el título.
- Un commit = una unidad lógica de cambio.

**Tipos:**

| Tipo | Uso |
|------|-----|
| `feat` | Nueva funcionalidad |
| `fix` | Corrección de bug |
| `perf` | Mejora de rendimiento |
| `refactor` | Reestructura sin cambiar comportamiento |
| `style` | Formato, espacios, CSS |
| `test` | Agrega o actualiza tests |
| `docs` | Solo documentación |

**Ejemplos:**

```
feat(auth): add login form validation
fix(sidebar): prevent menu overflow on mobile
refactor: remove unused dashboard components
```
