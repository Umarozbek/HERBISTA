import React, { useState, useEffect } from 'react';
import './FoodItem.css';
import { assets } from '../../assets/assets';

const FoodItem = ({ image, name, price, desc, id, index }) => {
  const [itemCount, setItemCount] = useState(0);

  // Add item to cart (push into array)
  const addToCart = () => {
    const existingCart = JSON.parse(localStorage.getItem('cartItems')) || [];
    existingCart.push({ id, name, image, price });
    localStorage.setItem('cartItems', JSON.stringify(existingCart));
    setItemCount(itemCount + 1);
  };

  // Remove item by index
  const removeFromCart = (removeIndex) => {
    let existingCart = JSON.parse(localStorage.getItem('cartItems')) || [];
    existingCart.splice(removeIndex, 1); // remove item at given index
    localStorage.setItem('cartItems', JSON.stringify(existingCart));
    setItemCount(0);
  };

  // On mount, check if item exists in cart and set count
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cartItems')) || [];
    const foundIndex = cart.findIndex(item => item.id === id);
    if (foundIndex !== -1) {
      setItemCount(1); // could be quantity tracking here if needed
    }
  }, [id]);

  return (
    <div className='food-item'>
      <div className='food-item-img-container'>
        <img className='food-item-image' src={image} alt="" />
        {itemCount === 0 ? (
          <img
            className='add'
            onClick={addToCart}
            src={assets.add_icon_white}
            alt=""
          />
        ) : (
          <div className="food-item-counter">
            <img 
              src={assets.remove_icon_red} 
              onClick={() => removeFromCart(index)} 
              alt="" 
            />
            <p>{itemCount}</p>
            <img 
              src={assets.add_icon_green} 
              onClick={addToCart} 
              alt="" 
            />
          </div>
        )}
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p> <img src={assets.rating_starts} alt="" />
        </div>
        <p className="food-item-desc">{desc}</p>
        <p className="food-item-price">{price}</p>
      </div>
    </div>
  );
};

export default FoodItem;
