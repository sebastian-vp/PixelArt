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

TypeScript + Express + Mongoose.

```bash
cd backend
npm install
cp .env.example .env
```

Configura `MONGODB_URI` en `.env` con la URI de MongoDB antes de usar el CRUD. El puerto predeterminado es `3001`.

- `npm run dev`: inicia el servidor de desarrollo.
- `npm run build`: compila TypeScript.
- `npm start`: ejecuta el servidor compilado.

## Base de datos

### User (colección: users)

| Campo | Tipo | Definición y restricciones |
|-------|------|----------------------------|
| `_id` | `ObjectId` | Identificador único del documento, generado automáticamente. |
| `name` | `string` | Nombre completo, con nombre y apellido en un mismo campo. Obligatorio. |
| `email` | `string` | Correo electrónico de la cuenta. Obligatorio y único. |
| `passwordHash` | `string` | Hash de la contraseña generado con bcrypt. Obligatorio. |
| `createdAt` | `Date` | Fecha de creación del documento, gestionada automáticamente por Mongoose mediante `timestamps: true`. |
| `updatedAt` | `Date` | Fecha de la última actualización del documento, gestionada automáticamente por Mongoose mediante `timestamps: true`. |

### Drawing (colección: drawings)

| Campo | Tipo | Definición y restricciones |
|-------|------|----------------------------|
| `_id` | `ObjectId` | Identificador único del documento, generado automáticamente. |
| `userId` | `ObjectId` | Referencia al modelo `User` del propietario y creador del dibujo. Obligatorio e inmutable tras la creación. |
| `title` | `String` | Título del dibujo. |
| `width` | `Number` | Ancho del dibujo en celdas. Entero positivo y obligatorio. |
| `height` | `Number` | Alto del dibujo en celdas. Entero positivo y obligatorio. |
| `pixels` | `(String \| null)[]` | Arreglo lineal de colores hexadecimales en formato `#RRGGBB`; `null` representa una celda sin color. Se lee por filas de `width` celdas y `height` filas. Su longitud debe ser `width * height`. |
| `isFavorite` | `Boolean` | Indica si el dibujo es favorito. Por defecto, `false`. |
| `createdAt` | `Date` | Fecha de creación del documento, gestionada automáticamente por Mongoose mediante `timestamps: true`. |
| `updatedAt` | `Date` | Fecha de la última actualización del documento, gestionada automáticamente por Mongoose mediante `timestamps: true`. |

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
