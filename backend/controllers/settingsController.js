const Setting = require('../models/Setting');
exports.get = async (req, res) => {
  const settings = await Setting.findOne();
  res.json({ data: settings });
};
exports.update = async (req, res) => {
  const settings = await Setting.findOneAndUpdate({}, req.body, { new: true, upsert: true });
  res.json({ data: settings });
}; 