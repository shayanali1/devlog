require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const app = express();
const PORT = 5000;
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});
app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
  res.json({ message: 'DevLog API is running!' });
});
app.get('/api/logs', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM logs ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Failed to fetch logs' });
  }
});
app.post('/api/logs', async (req, res) => {
  try {
    const { title, description, tag, mood } = req.body;
    const result = await pool.query('INSERT INTO logs (title, description, tag, mood) VALUES ($1, $2, $3, $4) RETURNING *',[title, description, tag, mood]);
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Failed to save log' });
  }
});
app.listen(PORT, () => {
  console.log('Server running on http://localhost:' + PORT);
});
