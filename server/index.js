 const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware — explained below
app.use(cors());
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'DevLog API is running! 🚀' });
});

// Get all logs
app.get('/api/logs', (req, res) => {
  res.json({ logs: [], message: 'No logs yet!' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});