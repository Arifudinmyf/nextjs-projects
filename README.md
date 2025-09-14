This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
"# nextjs-projects" 

## structur golang nitip

## BE POBUS

```bash
po-bus-microservices/
├── api-gateway/
│   ├── cmd/
│   │   └── main.go
│   ├── internal/
│   │   ├── config/
│   │   ├── handlers/
│   │   ├── middleware/
│   │   │   ├── auth.go
│   │   │   ├── logging.go
│   │   │   └── ratelimit.go
│   │   └── routes/
│   ├── pkg/
│   │   └── kong/
│   └── go.mod
│
├── auth-service/
│   ├── cmd/
│   │   └── main.go
│   ├── internal/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── dto/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── repositories/
│   │   └── services/
│   ├── pkg/
│   │   ├── jwt/
│   │   └── redis/
│   ├── migrations/
│   └── go.mod
│
├── user-service/
│   ├── cmd/
│   │   └── main.go
│   ├── internal/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── dto/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── repositories/
│   │   └── services/
│   ├── pkg/
│   │   ├── database/
│   │   └── kafka/
│   ├── migrations/
│   └── go.mod
│
├── admin-service/
│   ├── cmd/
│   │   └── main.go
│   ├── internal/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── dto/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── repositories/
│   │   └── services/
│   ├── pkg/
│   │   ├── database/
│   │   └── kafka/
│   ├── migrations/
│   └── go.mod
│
├── booking-service/
│   ├── cmd/
│   │   └── main.go
│   ├── internal/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── dto/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── repositories/
│   │   └── services/
│   ├── pkg/
│   │   ├── database/
│   │   ├── kafka/
│   │   └── redis/
│   ├── migrations/
│   └── go.mod
│
├── payment-service/
│   ├── cmd/
│   │   └── main.go
│   ├── internal/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── dto/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── repositories/
│   │   └── services/
│   ├── pkg/
│   │   ├── database/
│   │   └── kafka/
│   ├── migrations/
│   └── go.mod
│
├── driver-service/
│   ├── cmd/
│   │   └── main.go
│   ├── internal/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── dto/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── repositories/
│   │   └── services/
│   ├── pkg/
│   │   ├── database/
│   │   └── kafka/
│   ├── migrations/
│   └── go.mod
│
├── shared/
│   ├── config/
│   │   └── config.go
│   ├── database/
│   │   ├── database.go
│   │   └── migrations.go
│   ├── kafka/
│   │   ├── producer.go
│   │   └── consumer.go
│   ├── middleware/
│   │   ├── auth.go
│   │   ├── logging.go
│   │   └── ratelimit.go
│   ├── models/
│   │   ├── base.go
│   │   └── response.go
│   ├── redis/
│   │   └── redis.go
│   ├── utils/
│   │   ├── validator.go
│   │   ├── error.go
│   │   └── jwt.go
│   └── go.mod
│
├── deployments/
│   ├── docker/
│   │   ├── api-gateway.Dockerfile
│   │   ├── auth-service.Dockerfile
│   │   ├── user-service.Dockerfile
│   │   ├── admin-service.Dockerfile
│   │   ├── booking-service.Dockerfile
│   │   ├── payment-service.Dockerfile
│   │   └── driver-service.Dockerfile
│   ├── k8s/
│   │   ├── api-gateway.yaml
│   │   ├── auth-service.yaml
│   │   ├── user-service.yaml
│   │   ├── admin-service.yaml
│   │   ├── booking-service.yaml
│   │   ├── payment-service.yaml
│   │   ├── driver-service.yaml
│   │   ├── postgres.yaml
│   │   ├── redis.yaml
│   │   └── kafka.yaml
│   └── docker-compose.yml
│
└── docs/
    ├── api/
    │   ├── auth-service.yaml
    │   ├── user-service.yaml
    │   ├── admin-service.yaml
    │   ├── booking-service.yaml
    │   ├── payment-service.yaml
    │   └── driver-service.yaml
    └── architecture.md

```