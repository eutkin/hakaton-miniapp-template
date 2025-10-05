# Application Framework Project

## Overview
This is a Docker-based microservices application framework designed for local development. The project provides a complete template for building web applications with SSO authentication, form handling, and observability.

## Important Note
⚠️ **This project uses Docker and is NOT designed to run in Replit**. Replit's NixOS environment does not support Docker or nested virtualization. This repository serves as a template that should be:
1. Downloaded to a local machine
2. Run using Docker Compose

## Architecture
- **Caddy Proxy**: Routes requests to different services
- **SPA Service**: React 18+ with TypeScript, Tailwind CSS, ShadCN/ui, Zustand, i18n (EN/RU), OIDC
- **Static Service**: Serves static content via Caddy
- **BFF Service**: Backend-for-Frontend using Hono + Bun with OpenTelemetry
- **Mock API Service**: Simulates external API
- **Grafana Alloy**: Collects telemetry data

## Technology Stack
- Frontend: React 18+, TypeScript, Vite, Tailwind CSS, ShadCN/ui, Zustand, react-i18next
- Backend: Hono, Bun, OpenTelemetry
- Infrastructure: Docker, Docker Compose v2, Caddy
- Observability: Grafana Alloy

## Application Flow
1. User authenticates via OIDC (SSO)
2. User fills out a form
3. Form data sent to BFF
4. BFF forwards to Mock API
5. Response returned to user
6. Telemetry collected via OpenTelemetry → Grafana Alloy

## Local Usage
```bash
docker-compose up --build
```

Access the application at http://localhost

## Project State
- All services configured and ready
- Docker Compose file created
- Documentation complete
- Ready for local deployment
