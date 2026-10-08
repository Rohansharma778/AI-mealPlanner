# 🍽️ AI Meal Planner

An AI-powered full-stack web app that turns the ingredients in your pantry into personalized recipes, tailored to your dietary preferences, allergies, and health constraints.

## 🔑 Demo Account

Try the live app without signing up:

- **Email:** rohan@gmail.com
- **Password:** rohan77

## ✨ Features

- 🥕 **Pantry-based recipes** – enter what you have, get dishes you can actually cook
- 🌍 **Exotic cuisines** – explore dishes from different cuisines, not just the usual suspects
- 🥗 **Personalized** – respects dietary preferences, allergies, and health constraints
- 🤖 **AI-generated** – recipes created by the Google Gemini API
- 🔐 **Secure login** – JWT-based authentication
- 💾 **Saved data** – user data and recipes stored in PostgreSQL

---

## 🛠️ Tech Stack

| Layer          | Technology                              |
| -------------- | --------------------------------------- |
| Frontend       | React, JavaScript, HTML/CSS             |
| Backend        | Node.js, Express.js (REST API)          |
| Database       | PostgreSQL                              |
| Authentication | JSON Web Tokens (JWT)                   |
| AI             | Google Gemini API                       |
| Deployment     | Render                                  |

---

## 🔄 How It Works

```
User selects preferences
  (diet • allergies • health constraints • pantry items)
          │
          ▼
   React Frontend
          │
          ▼
  Express REST API ──────► PostgreSQL (stores data)
          │
          ▼
    Gemini API
          │
          ▼
 Personalized recipe shown to the user
```

---

## 📂 Project Structure

```
AI-mealPlanner/
├── backend/
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── migration.js
│   └── server.js
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
├── .gitignore
└── README.md
```
---

## ☁️ Deployment

The app is deployed on [Render](https://render.com/), with the React frontend, Express API, and a PostgreSQL database. Set the same environment variables from the `.env` example above in your Render dashboard.

---

## 📄 License

MIT
