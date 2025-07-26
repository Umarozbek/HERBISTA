const Cart = require('../models/Cart');

// Get current user's cart
exports.getCart = async (req, res) => {
  const userId = req.query.user || req.user?.id; // fallback for public API
  const cart = await Cart.findOne({ user: userId }).populate('items.menuItem');
  res.json({ data: cart || { items: [] } });
};

// Add or update item in cart
exports.addOrUpdateItem = async (req, res) => {
  const userId = req.body.user || req.user?.id;
  const { menuItem, quantity } = req.body;
  let cart = await Cart.findOne({ user: userId });
  if (!cart) {
    cart = new Cart({ user: userId, items: [{ menuItem, quantity }] });
  } else {
    const item = cart.items.find(i => i.menuItem.toString() === menuItem);
    if (item) {
      item.quantity = quantity;
    } else {
      cart.items.push({ menuItem, quantity });
    }
  }
  cart.updatedAt = Date.now();
  await cart.save();
  res.json({ data: cart });
};

// Remove item from cart
exports.removeItem = async (req, res) => {
  const userId = req.body.user || req.user?.id;
  const { menuItem } = req.body;
  const cart = await Cart.findOne({ user: userId });
  if (cart) {
    cart.items = cart.items.filter(i => i.menuItem.toString() !== menuItem);
    cart.updatedAt = Date.now();
    await cart.save();
  }
  res.json({ data: cart });
};

// Clear cart
exports.clearCart = async (req, res) => {
  const userId = req.body.user || req.user?.id;
  await Cart.findOneAndDelete({ user: userId });
  res.json({ message: 'Cart cleared' });
};

const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// All routes are public (no auth)
router.get('/', cartController.getCart);
router.post('/add', cartController.addOrUpdateItem);
router.post('/remove', cartController.removeItem);
router.post('/clear', cartController.clearCart);

module.exports = router;      