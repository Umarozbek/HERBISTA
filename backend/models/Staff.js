const mongoose = require('mongoose');
const StaffSchema = new mongoose.Schema({
  name: String,
  role: String,
  profileImage: String,
  schedule: [String]
});
module.exports = mongoose.model('Staff', StaffSchema); 