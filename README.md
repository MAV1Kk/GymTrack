# GymTrack

Монолітний веб‑застосунок для ведення профілю користувача та історії тренувань. Проєкт виконується в рамках лабораторних робіт (ЛР0–ЛР6) з розробки ПЗ.

## Функціонал

- **Users**
  - створення профілю користувача
  - перегляд профілю
  - оновлення параметрів (вага/зріст/ціль)
- **Workouts**
  - створення тренування
  - перегляд списку тренувань користувача
  - оновлення тренування (status, notes)

## Технології

- **Node.js + TypeScript (ESM, `"type": "module"`)**
- **NestJS**
- **PostgreSQL** (через Docker Compose)
- **Prisma** (міграції + ORM)
- **Jest** (unit + e2e)
- **ESLint (flat config) + Prettier**
- **Husky + lint-staged + commitlint (Conventional Commits)**
- **pnpm**

## Структура репозиторію

- `src/` — код застосунку (модулі `users`, `workouts`, `prisma`)
- `prisma/` — схема Prisma та міграції
- `docs/` — документація ЛР2 (архітектура, ER, сценарії)
- `test/` — e2e тести
- `docker-compose.yml` — локальна PostgreSQL
- `.husky/` — git hooks
- `eslint.config.mjs`, `prettier.config.cjs`, `jest.config.cjs` — конфіги інструментів

> Примітка: проєкт використовує ESM, тому в `src/` локальні імпорти між файлами можуть містити суфікс `.js` (для коректної роботи NodeNext/ESM).

## Передумови

- Node.js **18+** (рекомендовано 20+)
- pnpm **10+**
- Docker + Docker Compose

## Швидкий старт (локально)

### 1) Встановити залежності

```bash
pnpm i
```

### 2) Налаштувати змінні середовища

```bash
cp .env.example .env
```

### 3) Запустити PostgreSQL

```bash
docker compose up -d
```

### 4) Міграції та генерація Prisma Client

```bash
pnpm prisma migrate dev
pnpm prisma generate
```

### 5) Запуск застосунку

```bash
pnpm start:dev
```

API буде доступне за адресою: `http://localhost:3000`.

## API (приклади запитів)

### Створити користувача

```bash
curl -s -X POST http://localhost:3000/users   -H "content-type: application/json"   -d '{"name":"Alex","weight":75,"height":180,"goal":"cut"}'
```

### Отримати користувача

```bash
curl -s http://localhost:3000/users/<USER_ID>
```

### Оновити користувача

```bash
curl -s -X PATCH http://localhost:3000/users/<USER_ID>   -H "content-type: application/json"   -d '{"weight":74}'
```

### Додати тренування

```bash
curl -s -X POST http://localhost:3000/workouts   -H "content-type: application/json"   -d '{"userId":"<USER_ID>","type":"cardio","durationMin":30,"notes":"easy"}'
```

### Список тренувань користувача

```bash
curl -s "http://localhost:3000/workouts?userId=<USER_ID>"
```

### Оновити тренування (DONE)

```bash
curl -s -X PATCH http://localhost:3000/workouts/<WORKOUT_ID>   -H "content-type: application/json"   -d '{"status":"DONE","notes":"finished"}'
```

## Скрипти

- `pnpm format` / `pnpm format:check` — форматування (Prettier)
- `pnpm lint` — ESLint
- `pnpm typecheck` — перевірка типів
- `pnpm test` — unit тести
- `pnpm test:e2e` — e2e тести
- `pnpm build` — збірка

## Git hooks та стиль комітів

- **pre-commit**: `lint-staged`
- **commit-msg**: `commitlint` (Conventional Commits)
- **pre-push**: `test` + `build`

Приклад повідомлення коміту:

- `feat: add workouts endpoints`
- `docs: update lab2 diagrams`
- `chore: configure prisma migrations`

## Лабораторні роботи

- **ЛР0**: вибір ідеї + опис у README
- **ЛР1**: налаштування інструментів (formatter/linter/hooks/tests/build)
- **ЛР2**: структура застосунку + ER + сценарії (`docs/`)
- **ЛР3–ЛР4**: реалізація основних сценаріїв та інтеграція з БД (PostgreSQL + Prisma)

---

### Ліцензія

Навчальний проєкт.
