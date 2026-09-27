# Secure To-Do List — MERN App

A full-stack task manager built by Ahsan Hameed with MongoDB, Express, React, and Node.js.

**Live frontend:** https://secure-to-do-list-mern-app.vercel.app

## What it includes

- User registration and login with JWT authentication and hashed passwords
- A personal dashboard to add, edit, complete, and delete tasks
- A five-task limit for accounts with the `free` role
- An admin-only users endpoint guarded by authentication and role checks
- English and Urdu translation resources in the frontend

## Tech stack

| Layer | Tools |
| --- | --- |
| Frontend | React, Vite, React Router, Tailwind CSS, Axios |
| Backend | Node.js, Express, Mongoose |
| Database | MongoDB |
| Authentication | bcrypt, JSON Web Tokens |

## Run locally

You need Node.js, npm, and a MongoDB database.

1. Create `backend/.env` with your own values:

   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_long_random_secret
   PORT=5000
   ```

2. In one terminal, start the API:

   ```bash
   cd backend
   npm install
   node server.js
   ```

3. In another terminal, start the frontend:

   ```bash
   cd frontend
   npm install
   npm run dev
   ```

4. Open the local URL printed by Vite. The frontend uses `http://localhost:5000` locally unless `VITE_API_URL` is set at build time.

Keep `.env` and credentials out of Git. The frontend deployment link is provided for reference; its API-dependent features require a reachable backend. For Vercel, set the `VITE_API_URL` environment variable to the public Render backend origin (for example, `https://your-service.onrender.com`, with no `/api` suffix), then redeploy. The existing Vercel variable name and live connection have not been verified.

## API routes

| Method | Route | Purpose |
| --- | --- | --- |
| POST | `/api/users/register` | Create an account |
| POST | `/api/users/login` | Log in |
| GET | `/api/users/admin/users` | List users; admin role required |
| GET / POST | `/api/tasks` | List or create your tasks; token required |
| PUT / DELETE | `/api/tasks/:id` | Update or delete your task; token required |

The task routes expect `Authorization: Bearer <token>`.

## Project structure

- `backend/config`, `controllers`, `middleware`, `models`, `routes`: API and data layer
- `frontend/src/pages`: landing page, authentication, dashboard, pricing, and admin screens
- `frontend/src/locales`: translation files

## Current status

This is a portfolio project in progress. The pricing screen shows a Premium option, but no checkout or payment integration is implemented in this repository. Automated backend tests are not configured yet. The frontend needs `VITE_API_URL` set to a reachable backend for login and tasks to work remotely.
