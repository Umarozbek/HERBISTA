const User = require('../models/User');
const dotenv = require('dotenv')
const jwt = require("jsonwebtoken")
dotenv.config()
const SECRET_KEY = process.env.JWT_SECRET || "SECRET_KEY"
exports.getAllUsers = async (_, res) => {
  console.log('getAllUsers called');
  try {
    const users = await User.find();
    console.log('getAllUsers success');
    res.json({ data: users });
  } catch (err) {
    console.error('getAllUsers error:', err);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

exports.createUser = async (req, res) => {
  try {
    const {name, email,password}= req.body
    const user = await User.findOne({email})
    if (user) {
      return res.status(400).json({ success: false, error: "Your email already registered" });
    }
    const newUser = new User(
      {name,email,password}
    );
    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, SECRET_KEY, { expiresIn: "7d" });

    res.status(201).json({
      success: true,
      message: "User created successfully",
      token,
      user: newUser,
    });
  } catch (err) {
    console.error("createUser error:", err);
    res.status(400).json({ success: false, error: "Failed to create user" });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || user.password !== password) {
      return res.status(400).json({ success: false, error: "Invalid email or password" });
    }

    const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: "7d" });

    res.json({
      success: true,
      message: "Login successful",
      token,
      user,
    });
  } catch (err) {
    console.error("loginUser error:", err);
    res.status(400).json({ success: false, error: "Failed to login user" });
  }
};


exports.updateUser = async (req, res) => {
  console.log('updateUser called');
  try {
    const updated = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) {
      console.log('updateUser not found');
      return res.status(404).json({ error: 'User not found' });
    }
    console.log('updateUser success');
    res.json({ data: updated });
  } catch (err) {
    console.error('updateUser error:', err);
    res.status(400).json({ error: 'Failed to update user' });
  }
};

exports.deleteUser = async (req, res) => {
  console.log('deleteUser called');
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);
    if (!deleted) {
      console.log('deleteUser not found');
      return res.status(404).json({ error: 'User not found' });
    }
    console.log('deleteUser success');
    res.json({ message: 'User deleted' });
  } catch (err) {
    console.error('deleteUser error:', err);
    res.status(400).json({ error: 'Failed to delete user' });
  }
};

// Most bought users (example: users with most orders)
exports.getMostBoughtUsers = async (req, res) => {
  console.log('getMostBoughtUsers called');
  const Order = require('../models/Order');
  try {
    const users = await Order.aggregate([
      { $group: { _id: '$user', orderCount: { $sum: 1 } } },
      { $sort: { orderCount: -1 } },
      { $limit: 10 },
      { $lookup: { from: 'users', localField: '_id', foreignField: '_id', as: 'user' } },
      { $unwind: '$user' }
    ]);
    console.log('getMostBoughtUsers success');
    res.json({ data: users });
  } catch (err) {
    console.error('getMostBoughtUsers error:', err);
    res.status(500).json({ error: 'Failed to fetch most bought users' });
  }
}; 