# Application Framework

Полнофункциональный фреймворк для создания веб-приложений с микросервисной архитектурой для Mini App.

## Архитектура

Проект состоит из следующих сервисов:

- **Caddy Proxy** - прокси-сервер для маршрутизации запросов
- **SPA** - React 18+ приложение с TypeScript, Tailwind CSS, ShadCN/ui, Grafana Faro
- **Static** - сервер статического контента
- **BFF** - Backend-for-Frontend на Hono + Node JS с OpenTelemetry
- **Mock API** - тестовый API сервис на Deno
- **Grafana Alloy** - сбор телеметрии и логов
- **Mimir** & **Tempo** & **Loki** & **Grafana** для мониторинга

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
- **Node JS 22**
- Hono framework
- OpenTelemetry для телеметрии
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
BOT_TOKEN - токен вашего Telegram Bot
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
- `http://localhost:3000` - Grafana


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

## Тестирование Mini App

После запуска создайте временный https адрес:

```bash
ssh -R 80:localhost:80 localhost.run      
```

Добавьте этот адрес в вашу Mini App.

Работает не очень стабильно и только с мобильного клиента.

## Дальнейшие планы 

Полностью заменить SPA приложение, так как сгенерированное AI слишком сложное для поддержки.