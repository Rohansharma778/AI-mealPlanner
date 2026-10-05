🍽️ AI Meal Planner

A full-stack AI-powered meal planning application that helps users manage meals, recipes, pantry items, dietary preferences, and shopping lists.

Tech Stack

Frontend: React, JavaScript

Backend: Node.js, Express.js

Database: PostgreSQL

Authentication: JWT

AI: Google Gemini API

Deployment: Render

Features

User authentication

AI-powered recipe generation

Dietary preferences & allergies

Pantry management

Meal planning

Nutrition tracking

Shopping lists

Architecture
React Frontend
      ↓
Express REST API
      ↓
PostgreSQL + Gemini API

Local Setup
git clone <repository-url>
cd AI-mealPlanner

Backend
cd backend
npm install
node migration.js
node server.js

Environment Variables
DB_HOST=localhost
DB_PORT=5432
DB_NAME=your_database
DB_USER=your_user
DB_PASSWORD=your_password

GEMINI_API_KEY=your_key
JWT_SECRET=your_secret
PORT=8000


Production uses:

DATABASE_URL=your_postgresql_url


Never commit .env files or API keys to GitHub.

Production

Backend and PostgreSQL are deployed on Render.

Frontend → Render API → Render PostgreSQL
                    ↘ Gemini API

License

MIT
