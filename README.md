# DevLog 🚀

A full-stack personal coding journal and habit tracker built for developers who want to document their daily progress and track their growth over time.

## Live Demo
🔗 Coming soon

## Screenshots

> Home Page — Your coding logs in a clean grid layout

> Dashboard — Streak counter, topic breakdown, and mood tracker

> New Log — Log your daily win with mood and topic tag

## Features

- 📝 **Log daily coding wins** — title, description, topic tag, and mood
- 📊 **Dashboard analytics** — streak counter, topic breakdown with progress bars, mood tracker
- 🗑️ **Delete logs** — remove entries instantly
- 🎨 **Dark theme UI** — professional developer aesthetic
- 💾 **Persistent storage** — all data saved to a real PostgreSQL database

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React, React Router, Tailwind CSS |
| Backend | Node.js, Express |
| Database | PostgreSQL |
| Fonts | Outfit, JetBrains Mono, Material Symbols |

## Getting Started

### Prerequisites
- Node.js v18+
- PostgreSQL

### Installation

1. Clone the repo
```bash
   git clone https://github.com/shayanali/devlog.git
   cd devlog
```

2. Set up the database
```sql
   CREATE DATABASE devlog;
   CREATE TABLE logs (
     id SERIAL PRIMARY KEY,
     title VARCHAR(255) NOT NULL,
     description TEXT,
     tag VARCHAR(100),
     mood VARCHAR(50),
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );
```

3. Set up the backend
```bash
   cd server
   npm install
```
   Create a `.env` file in the server folder:
   DB_USER=postgres
DB_HOST=localhost
DB_NAME=devlog
DB_PASSWORD=your_password
DB_PORT=5432
Start the server:
```bash
   node index.js
```

4. Set up the frontend
```bash
   cd client
   npm install
   npm start
```

5. Open `http://localhost:3000`

## Project Structure
devlog/
├── client/          # React frontend
│   └── src/
│       ├── pages/   # Home, Dashboard, NewLog
│       └── App.js   # Routing and sidebar
└── server/          # Express backend
└── index.js     # API routes
## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/logs | Fetch all logs |
| POST | /api/logs | Create a new log |
| DELETE | /api/logs/:id | Delete a log |

## Author

Built by shayanali1