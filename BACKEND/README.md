Quiz Master Backend (Node.js + MongoDB)

Overview
This is the backend API for Quiz Master, built with Node.js, Express, and MongoDB (Mongoose). It supports authentication, role-based access, quiz management, assignments, and quiz results.

Quick Start
1) Copy env example and fill values:
   cp .env.example .env

2) Install dependencies:
   npm install

3) Run development server:
   npm run dev

Environment Variables (.env)
PORT=5000
MONGODB_URI=mongodb://localhost:27017/quiz_master
JWT_SECRET=change_this_secret
CLIENT_ORIGIN=http://localhost:5173

Scripts
- npm run dev: Start with nodemon
- npm start: Start production server

API Base URL
/api

Roles
- admin
- teacher
- student

High-Level Routes
- POST /api/auth/register
- POST /api/auth/login
- GET  /api/auth/me
- GET  /api/users           (admin)
- PATCH/DELETE /api/users/:id (admin)
- CRUD /api/quizzes         (teacher/admin)
- POST /api/results/submit  (student)
- GET  /api/results/my      (student)
- GET  /api/results/quiz/:quizId (teacher/admin)
- CRUD /api/assignments     (teacher/admin)

Folder Structure
src/
  server.js
  config/db.js
  middleware/
  models/
  controllers/
  routes/


