const mongoose = require('mongoose');

const tableSchema = new mongoose.Schema({
  number: { type: Number, required: true, unique: true },
  seats: { type: Number, required: true },
  status: { type: String, default: 'available' }, // available, reserved, occupied, etc.
  location: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Table', tableSchema); 