const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const cors = require('cors');

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Enable CORS
app.use(cors());

// DB connection
const db = require('./config/db');
db.query('SELECT 1')
  .then(() => console.log('✅ DB connected successfully'))
  .catch((err) => console.error('❌ DB connection failed:', err));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/users', require('./routes/users'));

// Default route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// 404 handler
app.use((req, res) => {
  res.status(404).send('Page not found');
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// ✅ Start the server
app.listen(port, () => {
  console.log(`  Server running at http://localhost:${port}`);
});



