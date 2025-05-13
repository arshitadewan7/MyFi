/*
const db = require('../config/db');

// Create a new user
const createUser = async (name, email, password, phone) => {
  const sql = `INSERT INTO Users (Name, Email, Password, PhoneNumber) VALUES (?, ?, ?, ?)`;
  const [result] = await db.query(sql, [name, email, password, phone]);
  return result;
};

// Get a user by email
const getUserByEmail = async (email) => {
  const sql = `SELECT * FROM Users WHERE Email = ?`;
  const [rows] = await db.query(sql, [email]);
  return rows;
};

// Example of other functions (like getting a user by ID, updating, etc.)
const getUserById = async (userId) => {
  const sql = `SELECT * FROM Users WHERE UserId = ?`;
  const [rows] = await db.query(sql, [userId]);
  return rows;
};

module.exports = { createUser, getUserByEmail, getUserById };
*/
