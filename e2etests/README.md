# Tests E2E (Playwright)

Los tests borran la base de datos de pruebas antes de cada test, por eso usan una base separada (`test_pixelart`).

## Cómo correrlos

1. **MongoDB** corriendo en el puerto 27017. Con Docker:
   ```bash
   docker run --name mongo-pixelart -p 27017:27017 -d mongo:8
   ```
   (Si usas `docker compose up`, bájalo antes con `docker compose down`.)

2. Crear `backend/.env`:
   ```env
   PORT=3001
   MONGODB_URI=mongodb://127.0.0.1:27017/pixelart
   TEST_MONGODB_URI=mongodb://127.0.0.1:27017/test_pixelart
   JWT_SECRET=cualquier_secreto
   ```

3. Backend en modo test (terminal 1):
   ```bash
   cd backend
   npm install
   npm run start:test
   ```

4. Frontend (terminal 2):
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

5. Tests (terminal 3):
   ```bash
   cd e2etests
   npm install
   npx playwright install chromium
   npm test
   ```

Opcional: `npm test -- --ui` (modo visual) o `npm test -- -g "nombre del test"` (un solo test).

## Qué prueban

- Login y acceso protegido: redirige a `/login` sin sesión, rechaza contraseña incorrecta, permite entrar con credenciales válidas.
- CRUD de dibujos: crear, listar, editar y eliminar.
