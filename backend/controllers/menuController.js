const Menu = require('../models/Menu');

exports.getAllMenuItems = async (req, res) => {
  try {
    const items = await Menu.find();
    res.json({ data: items });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch menu items' });
  }
};

exports.createMenuItem = async (req, res) => {
  try {
    const newItem = new Menu(req.body);
    await newItem.save();
    res.status(201).json({ data: newItem });
  } catch (err) {
    res.status(400).json({ error: 'Failed to create menu item' });
  }
};

exports.updateMenuItem = async (req, res) => {
  try {
    const updated = await Menu.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: 'Menu item not found' });
    res.json({ data: updated });
  } catch (err) {
    res.status(400).json({ error: 'Failed to update menu item' });
  }
};

exports.deleteMenuItem = async (req, res) => {
  try {
    const deleted = await Menu.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Menu item not found' });
    res.json({ message: 'Menu item deleted' });
  } catch (err) {
    res.status(400).json({ error: 'Failed to delete menu item' });
  }
}; 