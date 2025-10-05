# Application Framework

Полнофункциональный фреймворк для создания веб-приложений с микросервисной архитектурой на Deno.

## Архитектура

Проект состоит из следующих сервисов:

- **Caddy Proxy** - прокси-сервер для маршрутизации запросов
- **SPA** - React 18+ приложение с TypeScript, Tailwind CSS, ShadCN/ui, Grafana Faro
- **Static** - сервер статического контента
- **BFF** - Backend-for-Frontend на Hono + Deno с OpenTelemetry
- **Mock API** - тестовый API сервис на Deno
- **Grafana Alloy** - сбор телеметрии и логов

## Технологический стек

### Frontend (SPA)
- React 18+
- TypeScript
- Vite (с Deno)
- Tailwind CSS
- ShadCN/ui компоненты
- Zustand для управления состоянием
- react-i18next для интернационализации (русский и английский)
- react-oidc-context для SSO аутентификации
- **Grafana Faro** для Real User Monitoring (RUM)

### Backend (BFF & Mock API)
- **Deno 2.1.4**
- Hono framework
- OpenTelemetry для трейсинга
- Интеграция с Mock API

### Инфраструктура
- Docker & Docker Compose v2
- Caddy веб-сервер
- Grafana Alloy для observability

## Observability

### OpenTelemetry (Backend)
BFF автоматически отправляет traces в Grafana Alloy через OpenTelemetry:
- Трейсинг всех HTTP запросов
- Spans для внутренних операций
- Отправка через OTLP/HTTP

### Grafana Faro (Frontend)
SPA интегрирован с Grafana Faro для мониторинга:
- **Логи** - все console.log/error
- **Трейсы** - навигация и загрузка страниц
- **Метрики** - производительность и ошибки
- **Проксирование через Caddy** - `/faro/*` → Alloy

Конфигурация Caddy автоматически проксирует:
- `/faro/collect` → Grafana Alloy (порт 12347)
- `/v1/traces`, `/v1/logs`, `/v1/metrics` → Alloy OTLP endpoints

## Быстрый старт

### Предварительные требования

- Docker версии 20.10 или выше
- Docker Compose v2

### Настройка переменных окружения

Создайте файл `.env` в корне проекта:

```bash
# OIDC Configuration
OIDC_AUTHORITY=https://your-sso-provider.com
OIDC_CLIENT_ID=your-client-id
OIDC_REDIRECT_URI=http://localhost/callback
```

### Запуск проекта

1. Клонируйте репозиторий:
```bash
git clone <repository-url>
cd <project-directory>
```

2. Запустите все сервисы:
```bash
docker-compose up --build
```

3. Откройте браузер и перейдите на `http://localhost`

## Доступные endpoints

- `http://localhost` - главное приложение (SPA)
- `http://localhost/static` - статический контент
- `http://localhost/api/*` - BFF API
- `http://localhost/faro/collect` - Grafana Faro collector
- `http://localhost:12345` - Grafana Alloy UI

## Структура проекта

```
.
├── docker-compose.yml          # Конфигурация Docker Compose
├── Caddyfile                   # Главная конфигурация Caddy прокси
├── spa/                        # React SPA приложение
│   ├── Dockerfile
│   ├── Caddyfile
│   ├── deno.json
│   ├── package.json
│   └── src/
│       ├── components/         # React компоненты
│       ├── store/              # Zustand stores
│       ├── i18n/               # Переводы (ru/en)
│       ├── auth/               # OIDC конфигурация
│       └── lib/
│           └── faro.ts         # Grafana Faro setup
├── static/                     # Статический контент
│   ├── Dockerfile
│   ├── Caddyfile
│   └── public/
├── bff/                        # Backend-for-Frontend (Deno)
│   ├── Dockerfile
│   ├── deno.json
│   └── src/
│       ├── index.ts
│       ├── index.test.ts       # Тесты
│       └── telemetry.ts        # OpenTelemetry
├── mock-api/                   # Mock API сервис (Deno)
│   ├── Dockerfile
│   ├── deno.json
│   └── src/
│       ├── index.ts
│       └── index.test.ts       # Тесты
└── observability/
    └── alloy-config.yaml       # Grafana Alloy конфигурация
```

## Функционал приложения

### SSO Аутентификация
Приложение использует OIDC для Single Sign-On аутентификации. Настройте параметры SSO в переменных окружения.

### Отправка формы
После аутентификации пользователь может заполнить форму. Данные отправляются:
1. В BFF (Backend-for-Frontend)
2. Из BFF в Mock API
3. Ответ возвращается пользователю

### Телеметрия
- **Backend**: BFF отправляет traces в Grafana Alloy через OpenTelemetry
- **Frontend**: SPA отправляет логи, трейсы и метрики через Grafana Faro

## Тестирование

### BFF тесты
```bash
cd bff
deno task test
```

### Mock API тесты
```bash
cd mock-api
deno task test
```

## Разработка

### Разработка BFF (Deno)
```bash
cd bff
deno task dev
```

### Разработка Mock API (Deno)
```bash
cd mock-api
deno task dev
```

### Разработка SPA
```bash
cd spa
deno task dev
```

## Смена языка

Приложение поддерживает русский и английский языки. Переключение доступно в UI после авторизации.

## Остановка проекта

```bash
docker-compose down
```

Для удаления volumes:
```bash
docker-compose down -v
```

## Лицензия

MIT
