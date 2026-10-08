🍽️ AI Meal Planner
An AI-powered full-stack meal planning application that generates personalized recipes and meal suggestions based on your pantry, dietary preferences, allergies, and health constraints.


🛠️ Tech Stack
Frontend
React
JavaScript
HTML/CSS
Backend
Node.js
Express.js
REST API
Database
PostgreSQL
Authentication
JSON Web Tokens (JWT)
AI
Google Gemini API
Deployment
Render

📂 Project Structure
AI-mealPlanner/
│
├── backend/
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── migration.js
│   └── server.js
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── .gitignore
└── README.md
⚙️ Getting Started
Prerequisites
Make sure you have the following installed:

Node.js
npm
PostgreSQL
Git
Google Gemini API key
1. Clone the repository
git clone https://github.com/Rohansharma778/AI-mealPlanner.git

cd AI-mealPlanner
2. Backend Setup
cd backend

npm install
Create a .env file inside the backend directory:

DB_HOST=localhost
DB_PORT=5432
DB_NAME=your_database
DB_USER=your_user
DB_PASSWORD=your_password

GEMINI_API_KEY=your_gemini_api_key

JWT_SECRET=your_jwt_secret

PORT=8000
Run the database migration:

node migration.js
Start the backend:

node server.js
The backend will run on:

http://localhost:8000
3. Frontend Setup
Open a new terminal:

cd frontend

npm install
Start the development server:

npm start
The frontend will be available at:

http://localhost:3000
🔐 Environment Variables
Never commit API keys, database credentials, or JWT secrets to GitHub.

Example:

GEMINI_API_KEY=your_key
JWT_SECRET=your_secret
DATABASE_URL=your_database_url
Make sure .env is included in .gitignore.

☁️ Deployment
The application is deployed using Render.

Production Architecture
React Frontend
       │
       ▼
Render
       │
       ▼
Express REST API
       │
       ├──────────────► PostgreSQL
       │
       └──────────────► Google Gemini API
The production database uses PostgreSQL, while the Gemini API provides AI-powered recipe generation.



🔄 Application Flow
User
 │
 ▼
Select preferences
 │
 ├── Dietary preferences
 ├── Allergies
 ├── Health constraints
 └── Pantry ingredients
 │
 ▼
React Frontend
 │
 ▼
Express REST API
 │
 ▼
Gemini API
 │
 ▼
Personalized Recipe
 │
 ▼
PostgreSQL
 │
 ▼
Display to User
