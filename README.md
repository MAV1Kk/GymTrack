# GymTrack

Монолітний веб-застосунок (NestJS) для ведення профілю користувача та історії тренувань. Проєкт виконується в рамках лабораторних робіт (ЛР0–ЛР6).

## Функціонал

- **Users**
  - створення профілю
  - перегляд профілю
  - оновлення параметрів (вага/зріст/ціль)
- **Workouts**
  - створення тренування
  - список тренувань користувача
  - оновлення тренування (status, notes)

## Технології

- Node.js + TypeScript (**ESM**, `"type": "module"`)
- NestJS
- PostgreSQL (Docker Compose)
- Prisma (міграції + ORM)
- Jest (unit + e2e)
- ESLint (flat config) + Prettier
- Husky + lint-staged + commitlint (Conventional Commits)
- Stryker (mutation testing)
- pnpm

## Структура репозиторію

- `src/` — застосунок (modules: `users`, `workouts`, `prisma`)
- `prisma/` — Prisma schema + migrations
- `docs/` — документація ЛР2 (архітектура, ER, сценарії)
- `test/` — e2e тести + jest конфіг
- `docker-compose.yml` — локальна dev БД
- `docker-compose.test.yml` — тестова БД для e2e/integration
- `.husky/` — git hooks
- `stryker.conf.cjs` — mutation testing конфіг

> Примітка: проєкт використовує ESM, тому в `src/` локальні імпорти можуть мати суфікс `.js`.

## Вимоги

- Node.js 18+ (краще 20+)
- pnpm 10+
- Docker + Docker Compose

---

## Запуск (dev)

### 1) Встановити залежності

```bash
pnpm i
```

### 2) Env

```bash
cp .env.example .env
```

### 3) Запустити PostgreSQL (dev)

```bash
docker compose up -d
```

### 4) Prisma (dev)

```bash
pnpm prisma migrate dev
pnpm prisma generate
```

### 5) Запуск

```bash
pnpm start:dev
```

API: `http://localhost:3000`

---

## Тестування (ЛР5)

### Unit

```bash
pnpm -s test
```

### E2E (з тестовою БД)

```bash
pnpm -s test:e2e
```

> `test:e2e` використовує `docker-compose.test.yml` + `test/global-setup.cjs` / `test/global-teardown.cjs`.

### Mutation testing (Stryker)

```bash
pnpm -s test:mutation
```

HTML-звіт: `reports/mutation/html/index.html`

---

## API (швидкі приклади)

### Створити користувача

```bash
curl -s -X POST http://localhost:3000/users \
  -H "content-type: application/json" \
  -d '{"name":"Alex","weight":75,"height":180,"goal":"cut"}'
```

### Додати тренування

```bash
curl -s -X POST http://localhost:3000/workouts \
  -H "content-type: application/json" \
  -d '{"userId":"<USER_ID>","type":"cardio","durationMin":30,"notes":"easy"}'
```

### Список тренувань

```bash
curl -s "http://localhost:3000/workouts?userId=<USER_ID>"
```

---

## Скрипти

- `pnpm format` / `pnpm format:check`
- `pnpm lint`
- `pnpm typecheck`
- `pnpm test` (unit)
- `pnpm test:e2e`
- `pnpm test:mutation`
- `pnpm build`

---

## Лабораторні роботи

- **ЛР0**: вибір ідеї + опис у README
- **ЛР1**: налаштування інструментів (formatter/linter/hooks/tests/build)
- **ЛР2**: структура застосунку + ER + сценарії (`docs/`)
- **ЛР3–ЛР4**: реалізація сценаріїв + інтеграція з БД (PostgreSQL + Prisma)
- **ЛР5**: unit/integration/e2e + mutation testing
- **ЛР6**: CI/CD (GitHub Actions + деплой)

---

Навчальний проєкт.
