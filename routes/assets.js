// routes/assets.js

const express = require('express');
const router = express.Router();
const {
    getAssetsByPortfolio,
    addAsset,
    updateAsset,
    deleteAsset
} = require('../controllers/assetsController');
const { authenticateToken } = require('../utils/authMiddleware');

// Get all assets in a portfolio
router.get('/portfolio/:portfolioId', authenticateToken, getAssetsByPortfolio);

// Add a new asset
router.post('/', authenticateToken, addAsset);

// Update an asset
router.put('/:id', authenticateToken, updateAsset);

// Delete an asset
router.delete('/:id', authenticateToken, deleteAsset);

module.exports = router;
