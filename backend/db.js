const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  console.log("Attempting to connect to MongoDB...");
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB: Connected successfully!");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
  }
};

module.exports = connectDB; 