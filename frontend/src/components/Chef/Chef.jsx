import React from 'react';
import './Chef.css';
import { assets } from '../../assets/assets';

const Chef = () => (
  <div className="chef-container">
    <h2>Meet Our Chef</h2>
    <div className="chef-profile">
      <img src={assets.restaurant_chef} alt="Chef" />
      <h3 style={{textAlign: 'center', marginTop: '1rem'}}>Chef Lorenzo</h3>
      <div>
        <p>A fine dine master chef crafts exquisite cuisine with precision, passion, creativity, and elegance, delivering unforgettable culinary experiences and refined flavors.</p>
      </div>
    </div>
  </div>
);

export default Chef; 