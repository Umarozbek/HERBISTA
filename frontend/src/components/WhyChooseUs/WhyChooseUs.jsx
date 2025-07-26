import React from 'react';
import './WhyChooseUs.css';

const features = [
  { icon: '👨‍🍳', title: 'Skilled Chef', desc: 'Our chefs are masters of their craft.' },
  { icon: '🍽️', title: 'Hygienic Food', desc: 'We maintain the highest standards of hygiene.' },
  { icon: '🌿', title: 'Fresh Ambience', desc: 'Enjoy your meal in a fresh, relaxing environment.' },
  { icon: '🗝️', title: 'Secret Recipe', desc: 'Unique flavors you won\'t find anywhere else.' },
];

const WhyChooseUs = () => (
  <div className="why-choose-us-container">
    <h2>Why Dine With Us</h2>
    <div className="features-list">
      {features.map((f, i) => (
        <div className="feature-card" key={i}>
          <span className="feature-icon">{f.icon}</span>
          <h3>{f.title}</h3>
          <p>{f.desc}</p>
        </div>
      ))}
    </div>
  </div>
);

export default WhyChooseUs; 