const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const ordersFile = path.join(__dirname, '../data/orders.json');

// Helper to load orders
function loadOrders() {
  if (!fs.existsSync(ordersFile)) return [];
  return JSON.parse(fs.readFileSync(ordersFile));
}

// Helper to save orders
function saveOrders(orders) {
  fs.writeFileSync(ordersFile, JSON.stringify(orders, null, 2));
}

// POST /api/checkout - Place an order
router.post('/', (req, res) => {
  const { fullName, address, city, postalCode, phone, paymentMethod, cart } = req.body;

  if (!fullName || !address || !city || !postalCode || !phone || !paymentMethod || !Array.isArray(cart)) {
    return res.status(400).json({ message: "Missing order data" });
  }

  const newOrder = {
    id: Date.now().toString(),
    fullName,
    address,
    city,
    postalCode,
    phone,
    paymentMethod,
    cart,
    total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    createdAt: new Date().toISOString()
  };

  const orders = loadOrders();
  orders.push(newOrder);
  saveOrders(orders);

  res.status(201).json({ message: "Order placed", order: newOrder });
});

module.exports = router;
