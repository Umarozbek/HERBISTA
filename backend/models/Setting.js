const mongoose = require('mongoose');
const SettingSchema = new mongoose.Schema({
  restaurantName: String,
  contact: String,
  businessHours: String,
  deliverySettings: String,
  privacyPolicy: String
});
module.exports = mongoose.model('Setting', SettingSchema); 