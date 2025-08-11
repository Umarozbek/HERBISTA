import { toast } from 'react-toastify';
import { Fetch } from '../../middleware/Axios';
import './PaymentPopup.css';
const PaymentPopup = ({ setShowPayment, items, user }) => {

  const totalAmount = items.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleSubmit = async () => {
    try {
      await Fetch.post('orders', {
        user: user._id,
        items: items,
        total: totalAmount
      });
     toast.success('Payment successful!');
     localStorage.removeItem('cartItems');
    //  window.location.reload();
      setShowPayment(false);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  return (
    <div className="payment-popup-overlay">
      <div className="payment-popup">
        <h2>Payment</h2>
        <p>Here you can add your payment form or instructions.</p>
        <button onClick={handleSubmit}>Submit Payment</button>
        <button onClick={() => setShowPayment(false)}>Close</button>
      </div>
    </div>
  );
};

export default PaymentPopup;