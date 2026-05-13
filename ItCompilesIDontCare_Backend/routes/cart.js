const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  const cart = req.session.cart || [];
  res.json(cart);
});

router.post('/add', (req, res) => {
  const { productId, quantity } = req.body;
  if(!req.session.cart) req.session.cart = [];

  // check if product exists in cart
  const existing = req.session.cart.find(item => item.productId === productId);
  if(existing) {
    existing.quantity += quantity;
  } else {
    req.session.cart.push({ productId, quantity });
  }

  res.json(req.session.cart);
});

router.post('/remove', (req, res) => {
  const { productId } = req.body;
  if(!req.session.cart) req.session.cart = [];

  req.session.cart = req.session.cart.filter(item => item.productId !== productId);
  res.json(req.session.cart);
});

router.post('/clear', (req, res) => {
  req.session.cart = [];
  res.json({ message: "Cart cleared" });
});

module.exports = router;
