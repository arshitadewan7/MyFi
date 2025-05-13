// routes/portfolios.js

const express = require('express');
const router = express.Router();
const portfoliosController = require('../controllers/portfoliosController');
const { authenticateToken } = require('../utils/authMiddleware');

// GET all portfolios for a user
router.get('/', authenticateToken, portfoliosController.getAllPortfolios);

// GET a specific portfolio
router.get('/:id', authenticateToken, portfoliosController.getPortfolioById);

// POST a new portfolio
router.post('/', authenticateToken, portfoliosController.createPortfolio);

// PUT (update) a portfolio
router.put('/:id', authenticateToken, portfoliosController.updatePortfolio);

// DELETE a portfolio
router.delete('/:id', authenticateToken, portfoliosController.deletePortfolio);

module.exports = router;
