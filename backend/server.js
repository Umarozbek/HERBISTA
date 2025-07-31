const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const menuRoutes = require('./routes/menu');
const userRoutes = require('./routes/users');
const orderRoutes = require('./routes/orders');
const reservationRoutes = require('./routes/reservations');
const galleryRoutes = require('./routes/gallery');
const tableRoutes = require('./routes/tables');
// Remove multer, path, and direct upload/controller usage

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());

app.use('/api/menu', menuRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/reservations', reservationRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/tables', tableRoutes);
app.use('/uploads', express.static('uploads'));
app.get('/', (_, res) => {
  res.send('Welcome to Herbista API');
});
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGODB_URI ;
mongoose.connect(MONGO_URI, console.log("MongoDB connected") );
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); 
