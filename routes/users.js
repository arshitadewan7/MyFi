const express = require('express');
const router = express.Router();
const db = require('../config/db');
const bcrypt = require('bcryptjs');

// POST /users/login
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and Password are required.' });
  }

  db.query('SELECT * FROM Users WHERE Email = ?', [email], async (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error' });

    if (results.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const user = results[0];

    try {
      const isMatch = await bcrypt.compare(password, user.Password); // Compare hashed passwords
      if (!isMatch) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      res.json({ message: 'Login successful', user });
    } catch (err) {
      console.error('Error comparing passwords:', err);
      return res.status(500).json({ error: 'Login error' });
    }
  });
});


// POST /users/register
router.post('/register', async (req, res) => {
  const { name, email, password, phone_number } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Name, Email, and Password are required.' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10); // Hash password
    db.query('SELECT * FROM Users WHERE Email = ?', [email], (err, results) => {
      if (err) return res.status(500).json({ error: 'Database error' });

      if (results.length > 0) {
        return res.status(400).json({ error: 'Email already registered' });
      }

      db.query('INSERT INTO Users (Name, Email, Password, PhoneNumber) VALUES (?, ?, ?, ?)',
        [name, email, hashedPassword, phone_number], (err, result) => {
          if (err) return res.status(500).json({ error: 'Registration failed' });
          res.json({ message: 'User registered successfully' });
      });
    });
  } catch (err) {
    console.error('Error hashing password:', err);
    return res.status(500).json({ error: 'Internal error' });
  }
});


module.exports = router;
