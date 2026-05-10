# TaskFlow

A modern full-stack task management platform built with the MERN stack, featuring secure JWT authentication, role-based access control, task management APIs, admin monitoring, and a responsive black-themed UI.

TaskFlow was developed as part of a Backend Developer Internship Assignment focused on building scalable backend systems with secure authentication, modular architecture, and frontend API integration.

---

# Features

## Authentication & Security

* JWT Authentication
* Password Hashing using bcryptjs
* Protected Routes
* Role-Based Access Control (User/Admin)
* Secure Middleware Validation
* Environment Variable Protection using dotenv

---

## Task Management

* Create Tasks
* Edit Tasks
* Delete Tasks
* Task Completion Tracking
* Priority-Based Tasks
* Real-Time UI Updates
* Filter Tasks by Priority
* Hide Completed Tasks

---

## Admin Panel

* View All Registered Users
* Monitor User Tasks
* Track Task Status & Priorities
* Role-Based Admin Access

---

## Frontend

* Built with Next.js
* Responsive UI
* Modern Black Theme
* Animated Dashboard
* Context API Authentication
* Cookie-Based Session Persistence

---

## Backend

* Built with Express
* RESTful APIs
* Modular MVC Architecture
* MongoDB Database Integration
* Secure Middleware Handling
* Centralized Error Handling

---

# Tech Stack

## Frontend

* Next.js
* React.js
* Tailwind CSS
* Lucide Icons
* React Hot Toast

## Backend

* Node.js
* Express
* MongoDB
* Mongoose
* jsonwebtoken
* bcryptjs
* Morgan
* Helmet

---

# Folder Structure

```bash id="0q6n4j"
taskflow/
│
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── .env
│
├── frontend/
│   ├── app/
│   ├── components/
│   ├── context/
│   └── public/
│
└── README.md
```

---

# API Endpoints

## Authentication

```http id="6q0g94"
POST /api/auth/register
POST /api/auth/login
```

---

## Tasks

```http id="2vjlwm"
GET    /api/tasks
POST   /api/tasks
PUT    /api/tasks/:id
DELETE /api/tasks/:id
```

---

## Admin

```http id="rj1f8l"
GET /api/auth/admin/users
```

---

# Installation

## Clone Repository

```bash id="2mjlwm"
git clone <your-repo-url>
cd taskflow
```

## Environment Variables

Create your `.env` file using the provided `.env.example` template in both frontend and backend.

```bash id="9mjlwm"
cp .env.example .env
```
After creating the file, replace the placeholder values with your actual configuration.

---

# Backend Setup

```bash id="zh73kn"
cd backend
npm install
```

Run Backend

```bash id="8mj8yz"
node server.js
```

---

# Frontend Setup

```bash id="b0ohgh"
cd frontend
npm install
npm run dev
```

---
# Admin Access Setup

By default, newly registered users are created with:

```js id="r7j2wh"
userType: "user"
```

To create an admin account, manually update the user's `userType` inside MongoDB.

Example:

```js id="8k9xpa"
{
  "userType": "admin"
}
```

This can be updated using:

* MongoDB Compass
* Mongo Shell
* Atlas Database Viewer

Once updated, log in again to generate a new JWT token containing admin privileges.

---

# Security Practices Implemented

* JWT Authentication
* Password Hashing
* Protected API Routes
* Role-Based Authorization
* Input Validation
* Middleware-Based Security
* Secure HTTP Headers using Helmet
* API Logging using Morgan

---

# Scalability Considerations

TaskFlow follows a scalable modular architecture using:

* MVC Design Pattern
* Middleware Separation
* Reusable Controllers
* API-Based Communication
* Independent Frontend & Backend
* Database Relationship Modeling

Future scalability improvements can include:

* Redis Caching
* Docker Deployment
* Microservices Architecture
* Rate Limiting
* Background Job Queues
* Load Balancing

---

# Future Improvements

* Real-Time Notifications
* Task Deadlines
* File Attachments
* Team Collaboration
* Email Verification
* OAuth Authentication
* Activity Logs
* Task Analytics Dashboard

---
# Demo

Deployed Link: [TaskFlow WebApp](https://taskflow-five-phi.vercel.app/)

---
# Author

Asmi M Shetty
  
LinkedIn: [Asmi Shetty LinkedIn](https://www.linkedin.com/in/asmishetty/)
