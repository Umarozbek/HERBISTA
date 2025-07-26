const Order = require('../models/Order');

exports.getAllOrders = async (req, res) => {
  console.log('getAllOrders called');
  try {
    const orders = await Order.find().populate('user');
    console.log('getAllOrders success');
    res.json({ data: orders });
  } catch (err) {
    console.error('getAllOrders error:', err);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
};

exports.createOrder = async (req, res) => {
  console.log('createOrder called');
  try {
    const newOrder = new Order(req.body);
    await newOrder.save();
    console.log('createOrder success');
    res.status(201).json({ data: newOrder });
  } catch (err) {
    console.error('createOrder error:', err);
    res.status(400).json({ error: 'Failed to create order' });
  }
};

exports.updateOrder = async (req, res) => {
  console.log('updateOrder called');
  try {
    const updated = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) {
      console.log('updateOrder not found');
      return res.status(404).json({ error: 'Order not found' });
    }
    console.log('updateOrder success');
    res.json({ data: updated });
  } catch (err) {
    console.error('updateOrder error:', err);
    res.status(400).json({ error: 'Failed to update order' });
  }
};

exports.deleteOrder = async (req, res) => {
  console.log('deleteOrder called');
  try {
    const deleted = await Order.findByIdAndDelete(req.params.id);
    if (!deleted) {
      console.log('deleteOrder not found');
      return res.status(404).json({ error: 'Order not found' });
    }
    console.log('deleteOrder success');
    res.json({ message: 'Order deleted' });
  } catch (err) {
    console.error('deleteOrder error:', err);
    res.status(400).json({ error: 'Failed to delete order' });
  }
}; 