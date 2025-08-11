import { useState, useEffect } from 'react';
import './FoodItem.css';
import { assets } from '../../assets/assets';

const FoodItem = ({ image, name, price, desc, id }) => {
  const [itemCount, setItemCount] = useState(0);

  const addToCart = () => {
    let cart = JSON.parse(localStorage.getItem('cartItems')) || [];
    const foundIndex = cart.findIndex(item => item.id === id);
    if (foundIndex !== -1) {
      cart[foundIndex].quantity += 1;
      setItemCount(cart[foundIndex].quantity);
    } else {
      cart.push({ id, name, image, price, quantity: 1 });
      setItemCount(1);
    }
    // bu yerda quantity ni berib yubordim
    localStorage.setItem('cartItems', JSON.stringify(cart));
  };

  const removeFromCart = () => {
    let cart = JSON.parse(localStorage.getItem('cartItems')) || [];
    const foundIndex = cart.findIndex(item => item.id === id);
    if (foundIndex !== -1) {
      if (cart[foundIndex].quantity > 1) {
        cart[foundIndex].quantity -= 1;
        setItemCount(cart[foundIndex].quantity);
      } else {
        cart.splice(foundIndex, 1);
        setItemCount(0);
      }
      // bu yerda shu quantity dan ayriydi, masalan - ni bossez 7 dan 6 ga, agar 0 bo'lsa o'chiradi
      localStorage.setItem('cartItems', JSON.stringify(cart));
    }
  };

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cartItems')) || [];
    const found = cart.find(item => item.id === id);
    setItemCount(found ? found.quantity : 0);
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
              onClick={removeFromCart} 
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
