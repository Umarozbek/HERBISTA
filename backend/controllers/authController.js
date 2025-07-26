const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.status(201).json({ message: 'User registered' });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const token = jwt.sign({ id: user._id, role: user.role }, 'your_jwt_secret', { expiresIn: '1d' });
  res.json({ token, user: { id: user._id, name: user.name, role: user.role } });
}; 