import React from 'react';
import './SpecialDishes.css';

const dishes = [
  { name: 'Vietnamese Noodle Soup', desc: 'A delicious bowl of noodles with fresh herbs and vegetables.', price: '$12.00', img: '/src/assets/food_1.png' },
  { name: 'Lasagna Roll', desc: 'Cheesy lasagna roll with spinach and creamy sauce.', price: '$10.00', img: '/src/assets/food_2.png' },
  { name: 'Chicken Wrap', desc: 'Spicy chicken wrap with onions and fresh herbs.', price: '$8.00', img: '/src/assets/food_3.png' },
];

const SpecialDishes = () => (
  <div className="special-dishes-container">
    <h2>Special Dishes</h2>
    <div className="dishes-list">
      {dishes.map((d, i) => (
        <div className="dish-card" key={i}>
          <img src={d.img} alt={d.name} />
          <div className="dish-info">
            <h3>{d.name}</h3>
            <p>{d.desc}</p>
            <span className="dish-price">{d.price}</span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default SpecialDishes; 