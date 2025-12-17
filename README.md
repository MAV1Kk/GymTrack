# GymTrack

GymTrack — навчальний бекенд (NestJS + PostgreSQL + Prisma) для ведення профілю користувача та журналу тренувань. Проєкт робився поетапно в рамках лабораторних робіт (ЛР0–ЛР6).

## Демо

- Base URL: https://gymtrack-qo8a.onrender.com

> Якщо Render “засинає”, перший запит може відповісти повільніше.

## Що вміє

**Users**

- створення профілю користувача
- отримання профілю
- оновлення параметрів (вага / зріст / ціль)

**Workouts**

- створення тренування для користувача
- перегляд списку тренувань користувача
- оновлення тренування (status, notes)

## API

Нижче — мінімальний набір запитів, якими зручно швидко “прогнати” деплой (можна через curl або Postman).

### 1) Health check

```bash
curl -i https://gymtrack-qo8a.onrender.com/
```

### 2) Створити користувача

```bash
curl -i -X POST https://gymtrack-qo8a.onrender.com/users \
  -H "Content-Type: application/json" \
  -d '{ "name":"Alex", "weight":75, "height":180, "goal":"cut" }'
```

Очікування: `201 Created`, в `body` має бути `id`.

### 3) Отримати користувача

```bash
curl -i https://gymtrack-qo8a.onrender.com/users/<USER_ID>
```

### 4) Оновити користувача

```bash
curl -i -X PATCH https://gymtrack-qo8a.onrender.com/users/<USER_ID> \
  -H "Content-Type: application/json" \
  -d '{ "weight": 77, "goal":"bulk" }'
```

### 5) Створити тренування

```bash
curl -i -X POST https://gymtrack-qo8a.onrender.com/workouts \
  -H "Content-Type: application/json" \
  -d '{ "userId":"<USER_ID>", "type":"cardio", "durationMin":30, "notes":"easy" }'
```

### 6) Список тренувань користувача

```bash
curl -i "https://gymtrack-qo8a.onrender.com/workouts?userId=<USER_ID>"
```

### 7) Оновити тренування

```bash
curl -i -X PATCH https://gymtrack-qo8a.onrender.com/workouts/<WORKOUT_ID> \
  -H "Content-Type: application/json" \
  -d '{ "status":"DONE", "notes":"felt good" }'
```

### Негативні кейси (швидка перевірка)

- створити тренування на неіснуючого користувача → очікувано `404`

```bash
curl -i -X POST https://gymtrack-qo8a.onrender.com/workouts \
  -H "Content-Type: application/json" \
  -d '{ "userId":"nope", "type":"cardio", "durationMin":10 }'
```

- передати невалідне тіло (пропустити обов’язкові поля) → очікувано `400`

## Запуск локально

### Вимоги

- Node.js (рекомендовано як у CI/Render)
- pnpm
- Docker (для PostgreSQL, якщо піднімаєш БД через compose)

### 1) Встановити залежності

```bash
pnpm i
```

### 2) Налаштувати змінні середовища

Створи `.env` на основі `.env.example` і задай `DATABASE_URL`.

Приклад:

```
DATABASE_URL="postgresql://user:pass@localhost:5432/gymtrack?schema=public"
```

### 3) База даних + Prisma

```bash
pnpm prisma generate
pnpm prisma migrate deploy
# або для локальної розробки
# pnpm prisma migrate dev
```

### 4) Запустити застосунок

```bash
pnpm -s build
pnpm -s start
# або dev
# pnpm -s start:dev
```

## Тести

- Unit:

```bash
pnpm -s test:unit
```

- E2E (потрібна тестова БД з `docker-compose.test.yml`):

```bash
pnpm -s db:test:up
pnpm -s test:e2e
pnpm -s db:test:down
```

- Mutation testing (Stryker):

```bash
pnpm -s test:mutation
```

## Скрипти (package.json)

```json
{
  "scripts": {
    "start": "node dist/main.js",
    "start:dev": "nest start --watch",
    "build": "nest build",
    "postinstall": "prisma generate",
    "typecheck": "tsc -p tsconfig.json --noEmit",
    "format": "prettier --write .",
    "format:check": "prettier -c .",
    "lint": "eslint .",
    "test": "NODE_OPTIONS=--experimental-vm-modules jest --config jest.config.cjs",
    "test:watch": "NODE_OPTIONS=--experimental-vm-modules jest --config jest.config.cjs --watch",
    "test:unit": "NODE_OPTIONS=--experimental-vm-modules jest --config jest.config.cjs",
    "test:e2e": "NODE_OPTIONS=--experimental-vm-modules jest --config test/jest-e2e.json",
    "test:mutation": "stryker run",
    "db:test:up": "docker compose -f docker-compose.test.yml up -d --wait",
    "db:test:down": "docker compose -f docker-compose.test.yml down -v",
    "test:all": "pnpm -s lint && pnpm -s format:check && pnpm -s test && pnpm -s test:e2e && pnpm -s build",
    "prepare": "husky"
  }
}
```

## Документація

У папці `docs/`:

- `architecture.md` — коротко про архітектуру
- `data-model.md` — ER/модель даних
- `scenarios.md` — сценарії використання

## Лабораторні роботи (коротко)

- **ЛР0**: вибір ідеї + опис у README
- **ЛР1**: базове налаштування проєкту (formatter/linter/hooks, базові тести/збірка)
- **ЛР2**: документація та проєктування (`docs/`)
- **ЛР3–ЛР4**: реалізація сценаріїв + інтеграція з PostgreSQL (Prisma)
- **ЛР5**: тестування (unit/e2e + mutation)
- **ЛР6**: CI/CD та деплой

---

### Ліцензія

Навчальний проєкт.
