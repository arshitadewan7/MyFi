// models/assetsModel.js

const db = require('../config/db');

// Get assets in a portfolio (ensures ownership)
exports.getAssetsByPortfolioId = (portfolioId, userId) =>
    new Promise((resolve, reject) => {
        const query = `
            SELECT a.* FROM Assets a
            JOIN Portfolios p ON a.portfolio_id = p.portfolio_id
            WHERE a.portfolio_id = ? AND p.user_id = ?
        `;
        db.query(query, [portfolioId, userId], (dbErr, results) => {
            if (dbErr) return reject(dbErr);
            resolve(results);
        });
    });

// Add new asset
exports.addAsset = (userId, portfolioId, assetSymbol, assetType, quantityOwned, purchasePrice, purchaseDate) =>
    new Promise((resolve, reject) => {
        // Confirm ownership of the portfolio
        const checkQuery = 'SELECT * FROM Portfolios WHERE portfolio_id = ? AND user_id = ?';
        db.query(checkQuery, [portfolioId, userId], (checkErr, checkResults) => {
            if (checkErr) return reject(checkErr);
            if (checkResults.length === 0) return reject(new Error('Unauthorized or portfolio not found'));

            const insertQuery = `
                INSERT INTO Assets (portfolio_id, asset_symbol, asset_type, quantity_owned, purchase_price, purchase_date)
                VALUES (?, ?, ?, ?, ?, ?)
            `;
            db.query(
                insertQuery,
                [portfolioId, assetSymbol, assetType, quantityOwned, purchasePrice, purchaseDate],
                (insertErr, insertResult) => {
                    if (insertErr) return reject(insertErr);
                    resolve({
                        asset_id: insertResult.insertId,
                        portfolio_id: portfolioId,
                        asset_symbol: assetSymbol,
                        asset_type: assetType,
                        quantity_owned: quantityOwned,
                        purchase_price: purchasePrice,
                        purchase_date: purchaseDate
                    });
                }
            );
        });
    });

// Update asset
exports.updateAsset = (assetId, userId, data) =>
    new Promise((resolve, reject) => {
        const {
            assetSymbol,
            assetType,
            quantityOwned,
            purchasePrice,
            purchaseDate
        } = data;

        const updateQuery = `
            UPDATE Assets a
            JOIN Portfolios p ON a.portfolio_id = p.portfolio_id
            SET a.asset_symbol = ?, a.asset_type = ?, a.quantity_owned = ?, a.purchase_price = ?, a.purchase_date = ?
            WHERE a.asset_id = ? AND p.user_id = ?
        `;
        db.query(
            updateQuery,
            [assetSymbol, assetType, quantityOwned, purchasePrice, purchaseDate, assetId, userId],
            (updateErr, result) => {
                if (updateErr) return reject(updateErr);
                resolve(result.affectedRows > 0);
            }
        );
    });

// Delete asset
exports.deleteAsset = (assetId, userId) =>
    new Promise((resolve, reject) => {
        const deleteQuery = `
            DELETE a FROM Assets a
            JOIN Portfolios p ON a.portfolio_id = p.portfolio_id
            WHERE a.asset_id = ? AND p.user_id = ?
        `;
        db.query(deleteQuery, [assetId, userId], (deleteErr, result) => {
            if (deleteErr) return reject(deleteErr);
            resolve(result.affectedRows > 0);
        });
    });
