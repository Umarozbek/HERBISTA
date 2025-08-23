import {  useEffect, useState } from 'react'
import './Cart.css'
import LoginPopup from '../../components/LoginPopup/LoginPopup';

import PaymentPopup from '../../pages/PaymentPopup/PaymentPopup';
import { useSelector } from 'react-redux';
import { Fetch } from '../../middleware/Axios';
import { toast } from 'react-toastify';

const Cart = () => {
  const {isAuth, data, isPending, isError } = useSelector(state => state.user);
  const [showLogin, setShowLogin] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [cartItems, setCartItems] = useState([]); // bu yerda yangi state ochib localStorage dagi cartItems ni oldim
  const subTotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const deliveryFee = subTotal === 0 ? 0 : 5;
  
  const [promoCode, setPromoCode] = useState({});
  
  const [promoValue, setPromoValue] = useState ("");
  

   
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


  const handlePromoSubmit = async () => {
    try {
      const response = await Fetch.get(`/promo/${promoValue}`);
      setPromoCode(response.data);
      toast.success(`Promo code applied! You get ${response.data.discount}$ off.`);
    } catch (error) {
      console.error('Error fetching promo code:', error); 
      toast.error('Invalid promo code');
    }
  }
  const handleToggle = () => {
    if (!isAuth) {
      setShowLogin(true);
      return;
    }
    setShowPayment(true); // Show payment popup instead of navigating
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
        <div style={{ textAlign: 'center', padding: '20px' }}>Your cart is empty</div>
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
            <div className="cart-total-details"><p>Subtotal</p><p>{subTotal.toLocaleString()} $</p></div>
            <hr />
            <div className="cart-total-details"><p>Delivery Fee</p><p>{deliveryFee} $</p></div>
            <hr />
            <div className="cart-total-details"><p>Discount</p><p>{promoCode.discount ? `- ${promoCode.discount} $` : '0 $'}</p></div>
            <hr />
            <div className="cart-total-details"><b>Total</b><b>{(subTotal + deliveryFee -(promoCode.discount|| 0)).toLocaleString()} $</b></div>
          </div>
          <button onClick={handleToggle}>PROCEED TO CHECKOUT</button>
        </div>
        <div className="cart-promocode">
          <div>
            <p>If you have a promo code, Enter it here</p>
            <div className='cart-promocode-input'>
              <input value={promoValue} onChange={(e)=>setPromoValue(e.target.value)} type="text" placeholder='promo code'/>
              <button onClick={handlePromoSubmit}>Submit</button>
            </div>
          </div>
        </div>
      </div>
      {showLogin && <LoginPopup setShowLogin={setShowLogin} />}
      {showPayment && <PaymentPopup  promo={promoCode} setShowPayment={setShowPayment} items={cartItems} user={data} fee={deliveryFee} />}
    </div>
  )
}

export default Cart


