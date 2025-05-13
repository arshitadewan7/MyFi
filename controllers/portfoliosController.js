// controllers/portfoliosController.js

const portfoliosModel = require('../models/portfoliosModel');

// Get all portfolios for the logged-in user
exports.getAllPortfolios = async (req, res) => {
    try {
        const portfolios = await portfoliosModel.getPortfoliosByUserId(req.user.id);
        res.json(portfolios);
    } catch (err) {
        console.error('Error fetching portfolios:', err);
        res.status(500).json({ message: 'Failed to retrieve portfolios' });
    }
};

// Get a single portfolio by ID
exports.getPortfolioById = async (req, res) => {
    try {
        const portfolio = await portfoliosModel.getPortfolioById(req.params.id);

        if (!portfolio || portfolio.user_id !== req.user.id) {
            return res.status(404).json({ message: 'Portfolio not found or unauthorized' });
        }

        res.json(portfolio);
    } catch (err) {
        console.error('Error fetching portfolio:', err);
        res.status(500).json({ message: 'Failed to retrieve portfolio' });
    }
};

// Create a new portfolio
exports.createPortfolio = async (req, res) => {
    try {
        const { portfolioName, notes } = req.body;
        const newPortfolio = await portfoliosModel.createPortfolio(req.user.id, portfolioName, notes);
        res.status(201).json(newPortfolio);
    } catch (err) {
        console.error('Error creating portfolio:', err);
        res.status(500).json({ message: 'Failed to create portfolio' });
    }
};

// Update an existing portfolio
exports.updatePortfolio = async (req, res) => {
    try {
        const { portfolioName, notes } = req.body;
        const success = await portfoliosModel.updatePortfolio(req.params.id, req.user.id, portfolioName, notes);

        if (!success) {
            return res.status(404).json({ message: 'Portfolio not found or unauthorized' });
        }

        res.json({ message: 'Portfolio updated successfully' });
    } catch (err) {
        console.error('Error updating portfolio:', err);
        res.status(500).json({ message: 'Failed to update portfolio' });
    }
};

// Delete a portfolio
exports.deletePortfolio = async (req, res) => {
    try {
        const success = await portfoliosModel.deletePortfolio(req.params.id, req.user.id);

        if (!success) {
            return res.status(404).json({ message: 'Portfolio not found or unauthorized' });
        }

        res.json({ message: 'Portfolio deleted successfully' });
    } catch (err) {
        console.error('Error deleting portfolio:', err);
        res.status(500).json({ message: 'Failed to delete portfolio' });
    }
};
