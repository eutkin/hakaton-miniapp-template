# Application Framework

Полнофункциональный фреймворк для создания веб-приложений с микросервисной архитектурой.

## Архитектура

Проект состоит из следующих сервисов:

- **Caddy Proxy** - прокси-сервер для маршрутизации запросов
- **SPA** - React 18+ приложение с TypeScript, Tailwind CSS, ShadCN/ui
- **Static** - сервер статического контента
- **BFF** - Backend-for-Frontend на Hono + Bun с OpenTelemetry
- **Mock API** - тестовый API сервис
- **Grafana Alloy** - сбор телеметрии

## Технологический стек

### Frontend (SPA)
- React 18+
- TypeScript
- Vite
- Tailwind CSS
- ShadCN/ui компоненты
- Zustand для управления состоянием
- react-i18next для интернационализации (русский и английский)
- react-oidc-context для SSO аутентификации

### Backend (BFF)
- Hono
- Bun
- OpenTelemetry для телеметрии
- Интеграция с Mock API

### Инфраструктура
- Docker & Docker Compose v2
- Caddy веб-сервер
- Grafana Alloy для observability

## Быстрый старт

### Предварительные требования

- Docker версии 20.10 или выше
- Docker Compose v2

### Настройка переменных окружения

Создайте файл `.env` в корне проекта:

\`\`\`bash
# OIDC Configuration
OIDC_AUTHORITY=https://your-sso-provider.com
OIDC_CLIENT_ID=your-client-id
OIDC_REDIRECT_URI=http://localhost/callback
\`\`\`

### Запуск проекта

1. Клонируйте репозиторий:
\`\`\`bash
git clone <repository-url>
cd <project-directory>
\`\`\`

2. Запустите все сервисы:
\`\`\`bash
docker-compose up --build
\`\`\`

3. Откройте браузер и перейдите на `http://localhost`

## Доступные endpoints

- `http://localhost` - главное приложение (SPA)
- `http://localhost/static` - статический контент
- `http://localhost/api/*` - BFF API
- `http://localhost:12345` - Grafana Alloy UI

## Структура проекта

\`\`\`
.
├── docker-compose.yml          # Конфигурация Docker Compose
├── Caddyfile                   # Главная конфигурация Caddy прокси
├── spa/                        # React SPA приложение
│   ├── Dockerfile
│   ├── Caddyfile
│   ├── package.json
│   └── src/
│       ├── components/         # React компоненты
│       ├── store/              # Zustand stores
│       ├── i18n/               # Переводы (ru/en)
│       └── auth/               # OIDC конфигурация
├── static/                     # Статический контент
│   ├── Dockerfile
│   ├── Caddyfile
│   └── public/
├── bff/                        # Backend-for-Frontend
│   ├── Dockerfile
│   ├── package.json
│   └── src/
│       ├── index.ts
│       └── telemetry.ts        # OpenTelemetry настройка
├── mock-api/                   # Mock API сервис
│   ├── Dockerfile
│   ├── package.json
│   └── src/
└── observability/
    └── alloy-config.yaml       # Grafana Alloy конфигурация
\`\`\`

## Функционал приложения

### SSO Аутентификация
Приложение использует OIDC для Single Sign-On аутентификации. Настройте параметры SSO в переменных окружения.

### Отправка формы
После аутентификации пользователь может заполнить форму. Данные отправляются:
1. В BFF (Backend-for-Frontend)
2. Из BFF в Mock API
3. Ответ возвращается пользователю

### Телеметрия
BFF автоматически отправляет traces в Grafana Alloy через OpenTelemetry.

## Разработка

### Разработка SPA
\`\`\`bash
cd spa
npm install
npm run dev
\`\`\`

### Разработка BFF
\`\`\`bash
cd bff
bun install
bun run dev
\`\`\`

### Разработка Mock API
\`\`\`bash
cd mock-api
bun install
bun run dev
\`\`\`

## Смена языка

Приложение поддерживает русский и английский языки. Переключение доступно в UI после авторизации.

## Остановка проекта

\`\`\`bash
docker-compose down
\`\`\`

Для удаления volumes:
\`\`\`bash
docker-compose down -v
\`\`\`

## Лицензия

MIT
