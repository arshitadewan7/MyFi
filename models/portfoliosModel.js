// models/portfoliosModel.js

const db = require('../config/db');

// Get all portfolios by user ID
exports.getPortfoliosByUserId = (userId) =>
    new Promise((resolve, reject) => {
        db.query('SELECT * FROM Portfolios WHERE user_id = ?', [userId], (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });

// Get a specific portfolio by ID
exports.getPortfolioById = (portfolioId) =>
    new Promise((resolve, reject) => {
        db.query('SELECT * FROM Portfolios WHERE portfolio_id = ?', [portfolioId], (err, results) => {
            if (err) return reject(err);
            resolve(results[0]);
        });
    });

// Create a new portfolio
exports.createPortfolio = (userId, portfolioName, notes) =>
    new Promise((resolve, reject) => {
        const query = 'INSERT INTO Portfolios (user_id, portfolio_name, notes) VALUES (?, ?, ?)';
        db.query(query, [userId, portfolioName, notes], (err, result) => {
            if (err) return reject(err);
            resolve({
                portfolio_id: result.insertId,
                user_id: userId,
                portfolio_name: portfolioName,
                notes
            });
        });
    });

// Update a portfolio
exports.updatePortfolio = (portfolioId, userId, portfolioName, notes) =>
    new Promise((resolve, reject) => {
        const query = `
            UPDATE Portfolios
            SET portfolio_name = ?, notes = ?
            WHERE portfolio_id = ? AND user_id = ?
        `;
        db.query(query, [portfolioName, notes, portfolioId, userId], (err, result) => {
            if (err) return reject(err);
            resolve(result.affectedRows > 0);
        });
    });

// Delete a portfolio
exports.deletePortfolio = (portfolioId, userId) =>
    new Promise((resolve, reject) => {
        const query = 'DELETE FROM Portfolios WHERE portfolio_id = ? AND user_id = ?';
        db.query(query, [portfolioId, userId], (err, result) => {
            if (err) return reject(err);
            resolve(result.affectedRows > 0);
        });
    });
