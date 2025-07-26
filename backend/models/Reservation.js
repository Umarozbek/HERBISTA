const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String },
  phone: { type: String },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  numberOfPeople: { type: Number, required: true },
  status: { type: String, default: 'pending' },
  specialRequests: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Reservation', reservationSchema); 