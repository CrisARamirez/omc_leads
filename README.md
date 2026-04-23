# OMC Leads API

Backend API para la gestión, análisis y automatización de leads. Construido con NestJS, PostgreSQL, TypeORM y OpenAI.

---

## Overview

OMC Leads API es un sistema backend diseñado para capturar, gestionar y analizar leads provenientes de múltiples canales (Instagram, Facebook, landing pages, referidos, entre otros), con capacidades de análisis automático mediante inteligencia artificial y estructura lista para escalar como CRM o sistema de marketing intelligence.

---

## Tech Stack

### Backend
- NestJS
- TypeORM
- PostgreSQL
- Node.js
- TypeScript

### AI
- OpenAI API

### Tools
- ESLint
- Prettier
- Jest
- class-validator
- dotenv

---

## Installation

### 1. Clonar el repositorio

```bash
git clone https://github.com/CrisARamirez/omc_leads.git
cd omc_leads
```

---

### 2. Instalar dependencias

```bash
npm install
```

---

### 3. Configurar variables de entorno

Crear archivo `.env`:

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=omc_leads
DB_USER=postgres
DB_PASSWORD=your_password

OPENAI_API_KEY=your_openai_key
```

---

## Scripts

### Build & Run

```bash
npm run build
npm run start
npm run start:dev
npm run start:debug
npm run start:prod
```

---

### Lint & Format

```bash
npm run lint
npm run lint:fix
npm run format
```

---

### Tests

```bash
npm run test
npm run test:watch
npm run test:cov
npm run test:e2e
```

---

### Database (TypeORM)

#### Generar migración

```bash
npm run migration:generate src/database/migrations/CreateLeadsTable
```

#### Ejecutar migraciones

```bash
npm run migration:run
```

#### Revertir migración

```bash
npm run migration:revert
```

---

### Seed

Ejecuta un script que crear 10 leads en la base de datos.

```bash
npm run seed
```
```
    {
      nombre: 'Juan Pérez',
      email: 'juan@gmail.com',
      telefono: '3001234567',
      fuente: LeadSource.INSTAGRAM,
      producto_interes: 'CRM empresarial',
      presupuesto: 1500000,
    },
    {
      nombre: 'María Gómez',
      email: 'maria@gmail.com',
      fuente: LeadSource.FACEBOOK,
      producto_interes: 'Landing page',
      presupuesto: 2500000,
    },
    {
      nombre: 'Carlos Ruiz',
      email: 'carlos@gmail.com',
      fuente: LeadSource.LANDING_PAGE,
      producto_interes: 'Automatización',
      presupuesto: 3200000,
    },
    {
      nombre: 'Andrea López',
      email: 'andrea@gmail.com',
      telefono: '3205551234',
      fuente: LeadSource.REFERIDO,
      producto_interes: 'Chatbot',
      presupuesto: 1800000,
    },
    {
      nombre: 'Santiago Torres',
      email: 'santiago@gmail.com',
      fuente: LeadSource.OTRO,
      producto_interes: 'Inventario',
      presupuesto: 4000000,
    },
    {
      nombre: 'Laura Martínez',
      email: 'laura@gmail.com',
      fuente: LeadSource.INSTAGRAM,
      producto_interes: 'E-commerce',
      presupuesto: 5000000,
    },
    {
      nombre: 'Diego Fernández',
      email: 'diego@gmail.com',
      fuente: LeadSource.FACEBOOK,
      producto_interes: 'Landing de ventas',
      presupuesto: 1200000,
    },
    {
      nombre: 'Valentina Ruiz',
      email: 'valentina@gmail.com',
      fuente: LeadSource.LANDING_PAGE,
      producto_interes: 'Reservas',
      presupuesto: 2800000,
    },
    {
      nombre: 'Andrés Molina',
      email: 'andres@gmail.com',
      fuente: LeadSource.REFERIDO,
      producto_interes: 'CRM personalizado',
      presupuesto: 3500000,
    },
    {
      nombre: 'Camila Herrera',
      email: 'camila@gmail.com',
      fuente: LeadSource.OTRO,
      producto_interes: 'Dashboard',
      presupuesto: 4200000,
    }
```


---

## API Endpoints

### Leads

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /leads | Crear lead |
| GET | /leads | Listar leads |
| GET | /leads/:id | Obtener lead |
| PATCH | /leads/:id | Actualizar lead |
| DELETE | /leads/:id | Soft delete |

---

### Stats

```GET /leads/stats```

Retorna:
- Total de leads
- Leads por fuente
- Promedio de presupuesto
- Leads últimos 7 días

---

### AI Summary

```POST /leads/ai/summary```

Genera un resumen ejecutivo usando OpenAI con fallback automático en caso de error.

---

## Query Filters

```GET /leads?```

- page
- limit
- fuente
- startDate
- endDate
- order (DESC por defecto)

---

## AI Resilience

El sistema incluye fallback automático cuando OpenAI falla:

- Error 429 (quota exceeded)
- Rate limits
- Network failures

En estos casos, se devuelve un resumen mock estructurado para garantizar continuidad del servicio.

---

## Author

Cristian Ramírez
Full Stack Developer (Backend & Data Engineering)

---
