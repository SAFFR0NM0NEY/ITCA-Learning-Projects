// app.js

const express = require('express');
const cors = require('cors');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');

const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const cartRoutes = require('./routes/cart');
const checkoutRoutes = require('./routes/checkout');

const app = express();              // ← Create the Express app first
app.use(cors());                    // ← Only now call app.use(cors())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Simple session setup (for cart/login state)
app.use(
  session({
    secret: 'supersecretkey',       // Change in production
    resave: false,
    saveUninitialized: true,
  })
);

// Serve any static files from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// Mount your API routes under /api/…
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/checkout', checkoutRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
