const mysql = require('mysql2');

// Use promise-based connection
const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'myfiuser',
  password: 'mypassword',
  database: 'MyFiDB'
}).promise(); // Use the promise-based API

db.connect((err) => {
  if (err) {
    console.error('❌ DB connection failed:', err.stack);
    return;
  }
  console.log('✅ DB connected successfully');
});

module.exports = db;
