/*
const usersModel = require('../models/usersModel');

// Create a new user
const createUser = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    const result = await usersModel.createUser(name, email, password, phone);
    res.status(201).json({ message: 'User created successfully', userId: result.insertId });
  } catch (error) {
    res.status(500).json({ error: 'Error creating user' });
  }
};

// Get a user by email
const getUserByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const user = await usersModel.getUserByEmail(email);
    if (user.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching user' });
  }
};

module.exports = { createUser, getUserByEmail };

*/
