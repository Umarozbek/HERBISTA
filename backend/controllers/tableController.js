const Table = require('../models/Table');

exports.getAllTables = async (req, res) => {
  console.log('getAllTables called');
  try {
    const tables = await Table.find();
    console.log('getAllTables success');
    res.json({ data: tables });
  } catch (err) {
    console.error('getAllTables error:', err);
    res.status(500).json({ error: 'Failed to fetch tables' });
  }
};

exports.createTable = async (req, res) => {
  console.log('createTable called');
  try {
    const newTable = new Table(req.body);
    await newTable.save();
    console.log('createTable success');
    res.status(201).json({ data: newTable });
  } catch (err) {
    console.error('createTable error:', err);
    res.status(400).json({ error: 'Failed to create table' });
  }
};

exports.updateTable = async (req, res) => {
  console.log('updateTable called');
  try {
    const updated = await Table.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) {
      console.log('updateTable not found');
      return res.status(404).json({ error: 'Table not found' });
    }
    console.log('updateTable success');
    res.json({ data: updated });
  } catch (err) {
    console.error('updateTable error:', err);
    res.status(400).json({ error: 'Failed to update table' });
  }
};

exports.deleteTable = async (req, res) => {
  console.log('deleteTable called');
  try {
    const deleted = await Table.findByIdAndDelete(req.params.id);
    if (!deleted) {
      console.log('deleteTable not found');
      return res.status(404).json({ error: 'Table not found' });
    }
    console.log('deleteTable success');
    res.json({ message: 'Table deleted' });
  } catch (err) {
    console.error('deleteTable error:', err);
    res.status(400).json({ error: 'Failed to delete table' });
  }
}; 