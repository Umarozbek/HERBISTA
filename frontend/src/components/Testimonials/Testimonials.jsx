import React from 'react';
import './Testimonials.css';

const testimonials = [
  { name: 'Willium Joe', city: 'New York', text: 'A perfect blend of mouthwatering dishes, warm atmosphere, and outstanding service. Every meal feels like a special occasion worth savoring!' },
  { name: 'Theresa Tin', city: 'Chicago', text: 'Every visit is a flavorful journey! Delicious food, elegant ambiance, and welcoming staff make this restaurant a true dining destination.' },
  { name: 'Michel Byrd', city: 'Denmark', text: 'From appetizers to desserts, every bite bursts with perfection. A cozy atmosphere and exceptional service make each visit unforgettable.' },
];

const Testimonials = () => (
  <div className="testimonials-container">
    <h2>What People Are Saying</h2>
    <div className="testimonials-list">
      {testimonials.map((t, i) => (
        <div className="testimonial-card" key={i}>
          <p className="testimonial-text">“{t.text}”</p>
          <p className="testimonial-author">- {t.name} <span>({t.city})</span></p>
        </div>
      ))}
    </div>
  </div>
);

export default Testimonials; 