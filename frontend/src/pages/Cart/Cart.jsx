import {  useEffect, useState } from 'react'
import './Cart.css'
import LoginPopup from '../../components/LoginPopup/LoginPopup';

import PaymentPopup from '../../pages/PaymentPopup/PaymentPopup';
import { useSelector } from 'react-redux';

const Cart = () => {
  const {isAuth, data, isPending, isError } = useSelector(state => state.user);
  const [showLogin, setShowLogin] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [cartItems, setCartItems] = useState([]); // bu yerda yangi state ochib localStorage dagi cartItems ni oldim
useEffect(() => {
  try {
    const storedCart = localStorage.getItem('cartItems');
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    } else {
      setCartItems([]);
    }
  } catch (error) {
    setCartItems([]);
  }
}, []);

  
  const handleToggle = () => {
    if (!isAuth) {
      setShowLogin(true);
      return;
    }
    setShowPayment(true); // Show payment popup instead of navigating
  };
  
  const handleCheckout = () => {
    if (!token) {
      setShowLogin(true);
      return;
    }
  };
  
  
  // bu yerda mahsulotni localStorage dan o'chirdim, id si orqali, quantity kerak emas bu yerga
  const removeFromCart = (id) => {
    let cart = JSON.parse(localStorage.getItem('cartItems')) || [];
    cart = cart.filter(item => item._id !== id);
    localStorage.setItem('cartItems', JSON.stringify(cart));
    setCartItems(cart);
  };
  
  if (isPending) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error: {isError}</div>;
  }
      
  return (
    <div className='cart'>
  <div className="cart-items">
    <div className="cart-items-title">
      <p>Items</p> <p>Title</p> <p>Price</p> <p>Quantity</p> <p>Total</p> <p>Remove</p>
    </div>
    <br />
    <hr />
    {
      cartItems.length === 0 ? (
        <div>Your cart is empty</div> 
      ) : (
        cartItems.map((item, index) => {
          return (<div key={index}>
              <div className="cart-items-title cart-items-item">
                <img src={item.image} alt="" />
                <p>{item.name}</p>
                <p>{item.price}</p>
                <p>{item.quantity}</p>
                <p>{item.price * item.quantity}</p>
                <h1 className='cart-items-remove-icon' onClick={() => removeFromCart(item._id)}>X</h1>
              </div>
              <hr />
            </div>)
        })
      )}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details"><p>Subtotal</p><p>1</p></div>
            <hr />
            <div className="cart-total-details"><p>Delivery Fee</p><p>1</p></div>
            <hr />
            <div className="cart-total-details"><b>Total</b><b>1</b></div>
          </div>
          <button onClick={handleToggle}>PROCEED TO CHECKOUT</button>
        </div>
        <div className="cart-promocode">
          <div>
            <p>If you have a promo code, Enter it here</p>
            <div className='cart-promocode-input'>
              <input type="text" placeholder='promo code'/>
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
      {showLogin && <LoginPopup setShowLogin={setShowLogin} />}
      {showPayment && <PaymentPopup setShowPayment={setShowPayment} items={cartItems} user={data} />}
    </div>
  )
}

export default Cart


