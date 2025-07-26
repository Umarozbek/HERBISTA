import React, { useState } from 'react';
import './Reservation.css';

const Reservation = () => {
  const [form, setForm] = useState({ 
    name: '', 
    email: '', 
    phone: '',
    date: '', 
    time: '', 
    people: 1,
    specialRequests: '',
    occasion: ''
  });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  
  const handleSubmit = e => {
    e.preventDefault();
    alert('Reservation submitted! (Demo only)');
  };

  return (
    <div className="reservation-container">
      <h2>Book A Table</h2>
      <p className="reservation-subtitle">Make your reservation and enjoy our delicious cuisine</p>
      
      <form className="reservation-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="name">Full Name *</label>
            <input 
              id="name"
              name="name" 
              value={form.name} 
              onChange={handleChange} 
              placeholder="Enter your full name" 
              required 
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email Address *</label>
            <input 
              id="email"
              name="email" 
              value={form.email} 
              onChange={handleChange} 
              placeholder="Enter your email" 
              type="email" 
              required 
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input 
              id="phone"
              name="phone" 
              value={form.phone} 
              onChange={handleChange} 
              placeholder="Enter your phone number" 
              type="tel" 
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="occasion">Occasion</label>
            <select 
              id="occasion"
              name="occasion" 
              value={form.occasion} 
              onChange={handleChange}
            >
              <option value="">Select an occasion</option>
              <option value="birthday">Birthday</option>
              <option value="anniversary">Anniversary</option>
              <option value="business">Business Meeting</option>
              <option value="nikkah">Nikkah</option>
              <option value="family">Family Gathering</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="date">Date *</label>
            <input 
              id="date"
              name="date" 
              value={form.date} 
              onChange={handleChange} 
              type="date" 
              required 
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="time">Time *</label>
            <input 
              id="time"
              name="time" 
              value={form.time} 
              onChange={handleChange} 
              type="time" 
              required 
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="people">Number of People *</label>
            <select 
              id="people"
              name="people" 
              value={form.people} 
              onChange={handleChange} 
              required
            >
              <option value="1">1 Person</option>
              <option value="2">2 People</option>
              <option value="3">3 People</option>
              <option value="4">4 People</option>
              <option value="5">5 People</option>
              <option value="6">6 People</option>
              <option value="7">7 People</option>
              <option value="8">8 People</option>
              <option value="9">9 People</option>
              <option value="10">10+ People</option>
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="table">Table Preference</label>
            <select 
              id="table"
              name="table" 
              value={form.table || ''} 
              onChange={handleChange}
            >
              <option value="">No preference</option>
              <option value="window">Window Seat</option>
              <option value="outdoor">Outdoor</option>
              <option value="quiet">Quiet Corner</option>
            </select>
          </div>
        </div>

        <div className="form-group full-width">
          <label htmlFor="specialRequests">Special Requests</label>
          <textarea 
            id="specialRequests"
            name="specialRequests" 
            value={form.specialRequests} 
            onChange={handleChange} 
            placeholder="Any special requests, dietary restrictions, or additional notes..."
            rows="4"
          />
        </div>

        <button type="submit" className="submit-btn">Book Table</button>
      </form>
    </div>
  );
};

export default Reservation; 