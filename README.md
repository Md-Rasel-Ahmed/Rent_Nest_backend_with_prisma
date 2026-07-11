# 🏠 RentNest Backend API

**RentNest** is a Rental Property Marketplace Backend API built with **Node.js, Express.js, TypeScript, Prisma ORM, and PostgreSQL**. It allows tenants to browse rental properties, landlords to manage listings and rental requests, and admins to manage the entire platform.

---

## Live API

```
https://assinemen4.vercel.app
```

---

# Features

## Public Features

- Browse all available properties
- Search properties by address
- Filter properties by rent
- View property details

---

## Tenant Features

- Register & Login
- Browse Properties
- Submit Rental Requests
- View Rental History
- Leave Reviews
- Manage Profile

---

## Landlord Features

- Register & Login
- Create Property
- Update Property
- Delete Property
- View Rental Requests
- Approve / Reject Rental Requests

---

## Admin Features

- View All Users
- Ban / Unban Users
- Delete user
- View All Properties
- View All Rental Requests
- Manage Categories

---

# Tech Stack

- Node.js
- Express.js
- TypeScript
- PostgreSQL
- Prisma ORM
- JWT Authentication
- Bcrypt
- http-status
- dotenv

---

# API Endpoints

## Authentication

| Method | Endpoint           |
| ------ | ------------------ |
| POST   | /api/auth/register |
| POST   | /api/auth/login    |
| GET    | /api/auth/me       |

---

## Property

| Method | Endpoint                              |
| ------ | ------------------------------------- |
| GET    | /api/landlord/properties              |
| GET    | /api/landlord/properties/requests     |
| GET    | /api/landlord/properties/:id          |
| POST   | /api/landlord/properties              |
| PATCH  | /api/landlord/properties/requests/:id |
| PUT    | /api/landlord//properties/:id         |
| DELETE | /api/landlord//properties/:id         |

## Rental

| Method | Endpoint     |
| ------ | ------------ |
| POST   | /api/rentals |
| GET    | /api/rentals |

---

## Review

| Method | Endpoint     |
| ------ | ------------ |
| POST   | /api/reviews |

---

## Category

| Method | Endpoint          |
| ------ | ----------------- |
| GET    | /api/categories   |
| POST   | /api/categoriesv1 |

---

## Admin

| Method | Endpoint                |
| ------ | ----------------------- |
| GET    | /api/admin/users        |
| GET    | /api/admin/properties   |
| GET    | /api/admin/rentals      |
| PATCH  | /api/admin/users/:id    |
| PATCH  | /api/admin/category/:id |
| DELETE | /api/admin/users/:id    |

---

# Installation

Clone the repository

Go to project

```bash
cd rentnest-backend
```

Install dependencies

```bash
npm install
```

Create a `.env` file

```env
DATABASE_URL=your_database_url

JWT_ACCESS_SECRET=your_secret_key
JWT_REFRESH_SECRET=your_secret_key
STRIPE_SECRET_KEY=your_secret_key
STRIPE_WEBHOOK_SECRET=your_secret_key

```

Generate Prisma Client

```bash
npx prisma generate
```

Run Migration

```bash
npx prisma migrate dev
```

Run Project

```bash
npm run dev
```

Build Project

```bash
npm run build
```

Run Production

```bash
npm start
```

---

# Authorization

Role-based authorization is implemented.

- Tenant
- Landlord
- Admin

Unauthorized users receive:

```
403 Forbidden
```

---

# Payment

Payment module is designed for Stripe.

Payment flow:

```
Rental Request

↓

Landlord Approval

↓

Payment

↓

Rental Active

↓

Review
```

---

# Author

**Md Rasel**

Backend Developer
