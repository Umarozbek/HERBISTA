import { toast } from 'react-toastify';
import { Fetch } from '../../middleware/Axios';
import './PaymentPopup.css';
const PaymentPopup = ({ setShowPayment, items, user, fee }) => {

  const subTotal = items.reduce((total, item) => total + item.price * item.quantity, 0);
  const totalAmount = subTotal + fee;

  const handleSubmit = async () => {
    try {
      await Fetch.post('orders', {
        user: user._id,
        items: items,
        total: totalAmount
      });
     toast.success('Payment successful!');
     localStorage.removeItem('cartItems');
     setTimeout(() => {
       window.location.href = '/myorders'; 
     }, 2000);
      setShowPayment(false);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  return (
    <div className="payment-popup-overlay">
      <div className="payment-popup">
        <div>
          <p style={{ fontWeight: "bold" , fontSize: "24px"}}>Your Payment Details</p>
          <ul className='payment-details'>
            <li>User :{user.name}</li>
            <li>SubTotal :{subTotal.toLocaleString()} $</li>
            <li>Delivery Fee :{fee} $</li>
            <li>Total :{totalAmount.toLocaleString()} $</li>
            <div style={{marginTop: "12px", borderTop: "1px solid #aaa", borderBottom: "1px solid #aaa", padding: "12px 0px"}}>Items:
              {items.map((item, index) => (
                <li key={index}>
                  {item.name} x {item.quantity} = {item.price * item.quantity} $
                </li>
              ))}
              </div>
            </ul>
        </div>
        <p>Are you sure you want to proceed with the payment of <span style={{fontWeight: "bold",}}>{totalAmount.toLocaleString()}</span>$ ?</p>
        <button onClick={handleSubmit}>Submit Payment</button>
        <button onClick={() => setShowPayment(false)} style={{ backgroundColor: 'red', color: 'white' }}>Close</button>
      </div>
    </div>
  );
};

export default PaymentPopup;