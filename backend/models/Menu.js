const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  category: { type: String },
  image: { type: String },
  isAvailable: { type: Boolean, default: true },
  isFeatured: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  status: { type: String, enum: ['active','sold out', 'paused'], default: 'active' },
});

module.exports = mongoose.model('Menu', menuSchema); 