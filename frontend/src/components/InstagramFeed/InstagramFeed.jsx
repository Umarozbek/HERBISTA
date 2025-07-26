import React from 'react';
import './InstagramFeed.css';

const images = [
  '/src/assets/food_7.png',
  '/src/assets/food_8.png',
  '/src/assets/food_9.png',
  '/src/assets/food_10.png',
  '/src/assets/food_11.png',
  '/src/assets/food_12.png',
];

const InstagramFeed = () => (
  <div className="instagram-feed-container">
    <h2>Follow Us <span role="img" aria-label="Instagram">📸</span></h2>
    <div className="instagram-grid">
      {images.map((src, i) => (
        <img src={src} alt={`Instagram ${i+1}`} key={i} />
      ))}
    </div>
  </div>
);

export default InstagramFeed; 