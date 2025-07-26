const Reservation = require('../models/Reservation');

exports.getAllReservations = async (req, res) => {
  console.log('getAllReservations called');
  try {
    const reservations = await Reservation.find();
    console.log('getAllReservations success');
    res.json({ data: reservations });
  } catch (err) {
    console.error('getAllReservations error:', err);
    res.status(500).json({ error: 'Failed to fetch reservations' });
  }
};

exports.createReservation = async (req, res) => {
  console.log('createReservation called');
  try {
    const newReservation = new Reservation(req.body);
    await newReservation.save();
    console.log('createReservation success');
    res.status(201).json({ data: newReservation });
  } catch (err) {
    console.error('createReservation error:', err);
    res.status(400).json({ error: 'Failed to create reservation' });
  }
};

exports.updateReservation = async (req, res) => {
  console.log('updateReservation called');
  try {
    const updated = await Reservation.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) {
      console.log('updateReservation not found');
      return res.status(404).json({ error: 'Reservation not found' });
    }
    console.log('updateReservation success');
    res.json({ data: updated });
  } catch (err) {
    console.error('updateReservation error:', err);
    res.status(400).json({ error: 'Failed to update reservation' });
  }
};

exports.deleteReservation = async (req, res) => {
  console.log('deleteReservation called');
  try {
    const deleted = await Reservation.findByIdAndDelete(req.params.id);
    if (!deleted) {
      console.log('deleteReservation not found');
      return res.status(404).json({ error: 'Reservation not found' });
    }
    console.log('deleteReservation success');
    res.json({ message: 'Reservation deleted' });
  } catch (err) {
    console.error('deleteReservation error:', err);
    res.status(400).json({ error: 'Failed to delete reservation' });
  }
}; 