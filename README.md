# 🚀 Nova Studio

A modern full-stack digital agency platform built with **Next.js 16**, **TypeScript**, **Material UI**, **Prisma**, and **PostgreSQL**.

## 🎯 Internship Assignment

This project was developed as part of the **Nova Studio Full Stack Developer Internship Assignment**.

The objective was to build a production-ready agency website that demonstrates:

* Modern responsive UI design
* Full-stack application architecture
* Database integration with PostgreSQL
* Secure authentication and route protection
* Project portfolio management
* Contact inquiry management
* API development using Next.js Route Handlers
* Production deployment readiness

The application provides a professional agency landing page along with a protected administrative dashboard for managing projects and customer inquiries.

---

## ✨ Key Features

### Public Website

* Responsive landing page
* Hero section with call-to-action
* Services showcase
* Portfolio projects section
* Animated statistics counters
* Contact form with validation
* Mobile-friendly design

### Admin Dashboard

* Secure administrator login
* HttpOnly cookie-based authentication
* Middleware route protection
* Project management system
* Contact inquiry management
* Secure logout functionality

### Database Features

* PostgreSQL database integration
* Prisma ORM
* Database migrations
* Seed data support
* Type-safe database access

---

## 🏗 Architecture

```text
User Browser
      │
      ▼
Next.js Frontend
      │
      ▼
Route Handlers (API)
      │
      ▼
Prisma ORM + Prisma Adapter PG
      │
      ▼
PostgreSQL Database
```

### Request Flow

1. Users interact with the Next.js frontend.
2. Frontend components request data from Route Handlers.
3. Route Handlers validate requests and process business logic.
4. Prisma ORM communicates with PostgreSQL.
5. Data is returned to the frontend for rendering.
6. Middleware protects administrative routes before access is granted.

---

## 🛠 Tech Stack

### Frontend

* Next.js 16.2.9
* React 19.2.4
* TypeScript 5
* Material UI 9.1.1
* Framer Motion
* Lucide React
* React CountUp

### Backend

* Next.js Route Handlers
* Prisma 7.8.0
* PostgreSQL
* Prisma Adapter PG
* Zod Validation

### Development Tools

* ESLint
* Prisma Studio
* TypeScript
* ts-node
* dotenv

---

## 📊 Database Schema

### Project

Stores portfolio projects.

```text
id
title
category
description
imageUrl
createdAt
```

### Stat

Stores website statistics.

```text
id
key
value
label
suffix
```

### ContactSubmission

Stores customer inquiries.

```text
id
name
email
message
createdAt
```

---

## 🚧 Challenges & Solutions

### Database Integration

Implemented PostgreSQL integration using Prisma ORM and Prisma Adapter PG for type-safe database operations.

### Authentication

Built a secure authentication system using environment-based credentials and HttpOnly cookies.

### Route Protection

Protected dashboard routes using Next.js Middleware to prevent unauthorized access.

### Deployment

Configured Prisma generation during build and resolved environment variable and deployment issues for production readiness.

---

## 📚 Learning Outcomes

This project strengthened my skills in:

* Full-stack web development
* Next.js App Router architecture
* REST API development
* Database design and management
* Authentication and authorization
* Middleware-based security
* Prisma ORM workflows
* Production deployment and debugging
* TypeScript best practices
* Git and GitHub collaboration

---

## 👨‍💻 Author

**Dolly Chahar**

B.Tech AI/ML Student | Full-Stack Developer | Open Source Contributor

GitHub: https://github.com/dollychahar27

Built with ❤️ using Next.js, TypeScript, Material UI, Prisma, and PostgreSQL.
