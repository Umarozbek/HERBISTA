const mongoose = require('mongoose');
const EventSchema = new mongoose.Schema({
  name: String,
  date: Date,
  description: String,
  attendees: [String]
});
module.exports = mongoose.model('Event', EventSchema); 