// controllers/assetsController.js

const assetsModel = require('../models/assetsModel');

// Get all assets for a given portfolio (ensures ownership)
exports.getAssetsByPortfolio = async (req, res) => {
    try {
        const { portfolioId } = req.params;
        const { id: userId } = req.user;

        const assets = await assetsModel.getAssetsByPortfolioId(portfolioId, userId);
        res.json(assets);
    } catch (fetchErr) {
        console.error('Error fetching assets:', fetchErr);
        res.status(500).json({ message: 'Failed to retrieve assets' });
    }
};

// Add a new asset to a portfolio
exports.addAsset = async (req, res) => {
    try {
        const {
            portfolioId,
            assetSymbol,
            assetType,
            quantityOwned,
            purchasePrice,
            purchaseDate
        } = req.body;

        const { id: userId } = req.user;

        const newAsset = await assetsModel.addAsset(
            userId,
            portfolioId,
            assetSymbol,
            assetType,
            quantityOwned,
            purchasePrice,
            purchaseDate
        );

        res.status(201).json(newAsset);
    } catch (addErr) {
        console.error('Error adding asset:', addErr);
        res.status(500).json({ message: 'Failed to add asset' });
    }
};

// Update an asset
exports.updateAsset = async (req, res) => {
    try {
        const { id: assetId } = req.params;
        const { id: userId } = req.user;
        const updatedData = req.body;

        const success = await assetsModel.updateAsset(assetId, userId, updatedData);
        if (!success) {
            return res.status(404).json({ message: 'Asset not found or unauthorized' });
        }

        res.json({ message: 'Asset updated successfully' });
    } catch (updateErr) {
        console.error('Error updating asset:', updateErr);
        res.status(500).json({ message: 'Failed to update asset' });
    }
};

// Delete an asset
exports.deleteAsset = async (req, res) => {
    try {
        const { id: assetId } = req.params;
        const { id: userId } = req.user;

        const success = await assetsModel.deleteAsset(assetId, userId);
        if (!success) {
            return res.status(404).json({ message: 'Asset not found or unauthorized' });
        }

        res.json({ message: 'Asset deleted successfully' });
    } catch (deleteErr) {
        console.error('Error deleting asset:', deleteErr);
        res.status(500).json({ message: 'Failed to delete asset' });
    }
};
