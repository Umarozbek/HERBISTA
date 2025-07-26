const Event = require('../models/Event');
exports.getAll = async (req, res) => {
  const events = await Event.find();
  res.json({ data: events });
};
exports.create = async (req, res) => {
  const event = new Event(req.body);
  await event.save();
  res.status(201).json({ data: event });
};
exports.update = async (req, res) => {
  const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json({ data: event });
};
exports.delete = async (req, res) => {
  await Event.findByIdAndDelete(req.params.id);
  res.json({ message: 'Event deleted' });
}; 