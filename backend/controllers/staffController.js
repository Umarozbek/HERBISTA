const Staff = require('../models/Staff');
exports.getAll = async (req, res) => {
  const staff = await Staff.find();
  res.json({ data: staff });
};
exports.create = async (req, res) => {
  const staff = new Staff(req.body);
  await staff.save();
  res.status(201).json({ data: staff });
};
exports.update = async (req, res) => {
  const staff = await Staff.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json({ data: staff });
};
exports.delete = async (req, res) => {
  await Staff.findByIdAndDelete(req.params.id);
  res.json({ message: 'Staff deleted' });
}; 