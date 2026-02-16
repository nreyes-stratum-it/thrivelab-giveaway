# ThriveLab Giveaway Monorepo

Frontend based in features (Next 16, React 19, TailwindCSS, HeroUI) using Static Site Generation (SSG) for optimal
performance. Backend with Drive Domain Design architecture (Nest js, Prisma, and PostgresSQL) exposing a REST API. AWS
CDK defines infrastructure
with Lambda functions for email notifications, SQS for queuing, SES for sending emails, and CloudFront + S3 for hosting
the frontend.

## Quick Start (One Command)

```bash
# Clone and run
git clone <repo-url>
cd thrivelab-giveaway
pnpm docker:up
```

**That's it!** The app will be running at:

- 🌐 Frontend: http://localhost:3000/giveaway
- 🔌 Backend API: http://localhost:3001/api
- 🗄️ PostgreSQL: localhost:5432

---

## Architecture

![Architecture Diagram](assets/architecture.png)

---

## AWS SES Email Limitation (Sandbox Mode)

**Current Status**: The AWS account is in SES sandbox mode for this technical assessment.

### What This Means

| Email Type              | Status         | Details                                                |
|-------------------------|----------------|--------------------------------------------------------|
| **Admin Notifications** | ✅ Working      | Admin email is verified and receives all notifications |
| **User Confirmations**  | ⚠️ Logged Only | Blocked by sandbox - would work in production          |

### How It Works Now

When a user submits the giveaway form:

1. Entry saved to PostgreSQL database
2. Event published to SQS queue
3. Lambda function triggered and processes event
4. Admin receives notification email
5. User email is logged (CloudWatch shows it would be sent)

**Local Development**: Emails are mocked (logged to console, not sent)  
**Production**: Real emails sent via AWS SES

---

## Prerequisites

- **Node.js 20+**
- **pnpm 8+**
- **Docker & Docker Compose**

---

## Docker Commands (Recommended)

```bash
# Start all services (detached mode)
pnpm docker:up

# Start with fresh build
pnpm docker:rebuild

# View all logs
pnpm docker:logs

# View specific service logs
pnpm docker:logs:backend
pnpm docker:logs:frontend
pnpm docker:logs:postgres

# Check service status
pnpm docker:ps

# Restart services
pnpm docker:restart
pnpm docker:restart:backend
pnpm docker:restart:frontend

# Stop all services
pnpm docker:down

# Clean everything (including database & images)
pnpm docker:clean
```

---

## Local Development (Without Docker)

If you prefer to run without Docker:

### 1. Install dependencies

```bash
pnpm install
```

### 2. Setup environment files

**`apps/backend-nestjs/.env`**:

```bash
PORT=3001
DATABASE_URL="postgresql://user:password@localhost:5432/thrivelab"
FRONTEND_URL="http://localhost:3000"
NODE_ENV=development
NOTIFICATION_QUEUE_URL=mock://local
```

**`apps/frontend-nextjs/.env.local`**:

```bash
NODE_ENV=development
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

### 3. Setup PostgreSQL

```bash
# Install PostgreSQL 16
# macOS: brew install postgresql@16
# Ubuntu: sudo apt-get install postgresql-16

# Create database
createdb thrivelab
```

### 4. Run migrations

```bash
cd apps/backend-nestjs
pnpm exec prisma migrate dev
```

### 5. Start services

```bash
# Start both frontend and backend
pnpm dev

# Or separately:
pnpm dev:frontend  # Just frontend
pnpm dev:backend   # Just backend
```

---

## Project Structure

```
thrivelab-giveaway/
├── apps/
│   ├── frontend-nextjs/       # Next.js 16 frontend
│   ├── backend-nestjs/        # NestJS backend
│   └── ...
├── infrastructure/            # AWS CDK infrastructure
│   └── lib/
│       ├── lambda/
│       │   └── email-notification/  # Email Lambda
│       └── thrivelab-stack.ts
├── docker-compose.yml
├── package.json
└── README.md
```

---

### Local Development

Emails are **mocked** and logged to console:

```bash
# Start backend and watch logs
pnpm dev:backend

# Or with Docker
pnpm docker:logs:backend
```

You'll see:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 EMAIL NOTIFICATION (MOCKED)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
{
  "eventType": "GiveawayEntryCreated",
  "firstName": "John",
  "email": "john@example.com"
}
```

### Production

Real emails sent via AWS SES to:

- ✉️ User: Confirmation email with olive theme
- ✉️ Admin: Notification with entry details

---

### API Health Check

```bash
curl http://localhost:3001/api/health
# Should return: {"status":"ok"}
```

---

## Tech Stack

- **Frontend**: Next.js 16, React 19, TailwindCSS, HeroUI
- **Backend**: NestJS, Prisma, PostgreSQL
- **Infrastructure**: AWS CDK, Lambda, SQS, SES, CloudFront, S3
- **Deployment**: GitHub Actions, AWS
- **Containerization**: Docker, Docker Compose

---

## Available Commands Reference

### Development

```bash
pnpm dev                # Run frontend + backend
pnpm dev:frontend       # Run frontend only
pnpm dev:backend        # Run backend only
```

### Build

```bash
pnpm build              # Build all
pnpm build:frontend     # Build frontend
pnpm build:backend      # Build backend
pnpm clean              # Clean builds & dependencies
```

### Docker

```bash
pnpm docker:up          # Start (detached)
pnpm docker:down        # Stop
pnpm docker:build       # Build images
pnpm docker:rebuild     # Clean + build + start
pnpm docker:logs        # View logs (all)
pnpm docker:logs:backend   # View backend logs
pnpm docker:logs:frontend  # View frontend logs
pnpm docker:logs:postgres  # View postgres logs
pnpm docker:restart     # Restart all
pnpm docker:restart:backend   # Restart backend
pnpm docker:restart:frontend  # Restart frontend
pnpm docker:ps          # Check status
pnpm docker:clean       # Remove all (including volumes)
```

### Database

```bash
pnpm db:migrate         # Run migrations (dev)
pnpm db:migrate:deploy  # Deploy migrations (prod-style)
pnpm db:studio          # Open Prisma Studio
pnpm db:seed            # Seed database
```

### AWS Deployment

```bash
pnpm deploy             # Deploy infrastructure
pnpm deploy:backend     # Deploy backend Lambda
pnpm migrate:prod       # Run production migrations
pnpm logs:backend       # View Lambda logs
pnpm invalidate:cdn     # Clear CloudFront cache
```

---

## 🚨 Important Notes

### Docker Commands

- `pnpm docker:up` starts existing containers (won't rebuild code changes)
- `pnpm docker:rebuild` rebuilds images with latest code changes
- `pnpm docker:clean` deletes everything including database data

---

## Access URLs

| Service           | URL                              | Description                                 |
|-------------------|----------------------------------|---------------------------------------------|
| **Giveaway Page** | http://localhost:3000/giveaway   | Giveaway form                               |
| **Backend API**   | http://localhost:3001/api        | REST API                                    |
| **Health Check**  | http://localhost:3001/api/health | API health status                           |
| **Prisma Studio** | http://localhost:5555            | Database GUI (run `pnpm db:studio`)         |
| **PostgreSQL**    | localhost:5432                   | Database (user: thrivelab, pass: thrivelab) |

---

**Made with ❤️ by Nelson Reyes**