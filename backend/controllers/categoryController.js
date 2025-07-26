const Category = require('../models/Category');
exports.getAll = async (req, res) => {
  const categories = await Category.find();
  res.json({ data: categories });
};
exports.getOne = async (req, res) => {
  const category = await Category.findById(req.params.id);
  res.json({ data: category });
};
exports.create = async (req, res) => {
  const category = new Category(req.body);
  await category.save();
  res.status(201).json({ data: category });
};
exports.update = async (req, res) => {
  const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json({ data: category });
};
exports.delete = async (req, res) => {
  await Category.findByIdAndDelete(req.params.id);
  res.json({ message: 'Category deleted' });
}; 