const express = require('express');
const router = express.Router();
const path = require('path');

// Full path to products.json
const productsPath = path.join(__dirname, '..', 'data', 'products.json');

// Send the products.json file as response
router.get('/', (req, res) => {
  res.sendFile(productsPath, err => {
    if (err) {
      console.error('Failed to send products.json:', err);
      res.status(500).json({ error: 'Failed to load products' });
    }
  });
});

module.exports = router;
