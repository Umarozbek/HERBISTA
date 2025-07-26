const Menu = require('../models/Menu');
const Reservation = require('../models/Reservation');
const User = require('../models/User');

exports.sales = async (req, res) => {
  const sales = await Menu.aggregate([
    { $group: { _id: '$category', totalSold: { $sum: '$orderCount' } } }
  ]);
  res.json({ data: sales });
};

exports.revenue = async (req, res) => {
  const revenue = await Reservation.aggregate([
    { $group: { _id: null, total: { $sum: '$total' } } }
  ]);
  res.json({ data: revenue });
};

exports.customers = async (req, res) => {
  const customers = await User.find().sort({ loyaltyPoints: -1 }).limit(10);
  res.json({ data: customers });
}; 