# Application Framework Project

## Overview
This is a Docker-based microservices application framework built with Deno, designed for local development. The project provides a complete template for building web applications with SSO authentication, form handling, and comprehensive observability.

## Important Note
⚠️ **This project uses Docker and is NOT designed to run in Replit**. Replit's NixOS environment does not support Docker or nested virtualization. This repository serves as a template that should be:
1. Downloaded to a local machine
2. Run using Docker Compose

## Architecture
- **Caddy Proxy**: Routes requests to different services and proxies telemetry
- **SPA Service**: React 18+ with TypeScript, Tailwind CSS, ShadCN/ui, Zustand, i18n (EN/RU), OIDC, Grafana Faro
- **Static Service**: Serves static content via Caddy
- **BFF Service**: Backend-for-Frontend using Hono + Deno with OpenTelemetry
- **Mock API Service**: Simulates external API using Deno
- **Grafana Alloy**: Collects telemetry data from both frontend and backend

## Technology Stack
- Runtime: **Deno 2.1.4** (all backend services)
- Frontend: React 18+, TypeScript, Vite, Tailwind CSS, ShadCN/ui, Zustand, react-i18next
- Backend: Hono, Deno, OpenTelemetry
- Frontend Observability: Grafana Faro (RUM, logs, traces, metrics)
- Backend Observability: OpenTelemetry (traces)
- Infrastructure: Docker, Docker Compose v2, Caddy
- Observability: Grafana Alloy

## Application Flow
1. User authenticates via OIDC (SSO)
2. User fills out a form
3. Form data sent to BFF (with OpenTelemetry tracing)
4. BFF forwards to Mock API
5. Response returned to user
6. Backend telemetry: OpenTelemetry → Grafana Alloy
7. Frontend telemetry: Grafana Faro → Caddy proxy → Grafana Alloy

## Observability Setup
### Caddy Proxy Routes
- `/faro/*` → Grafana Alloy (port 12347) for frontend telemetry
- `/v1/traces`, `/v1/logs`, `/v1/metrics` → Grafana Alloy OTLP endpoints

### Grafana Alloy
- Receives OTLP traces from BFF (port 4318)
- Receives Faro telemetry from SPA (port 12347)
- Logs all telemetry with detailed verbosity

## Testing
All services include Deno tests:
- `bff/src/index.test.ts` - BFF endpoint tests
- `mock-api/src/index.test.ts` - Mock API tests

Run tests: `deno task test` in each service directory

## Local Usage
```bash
docker-compose up --build
```

Access the application at http://localhost

## Project State
- All services migrated to Deno 2.1.4
- OpenTelemetry configured in BFF
- Grafana Faro integrated in SPA
- Caddy configured for telemetry proxying
- Tests written for all services
- Docker Compose file updated
- Documentation complete
- Ready for local deployment
