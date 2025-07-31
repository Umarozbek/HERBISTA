import React from 'react';
import './PaymentPopup.css';

const PaymentPopup = ({ setShowPayment }) => {
  return (
    <div className="payment-popup-overlay">
      <div className="payment-popup">
        <h2>Payment</h2>
        <p>Here you can add your payment form or instructions.</p>
        <button onClick={() => setShowPayment(false)}>Close</button>
      </div>
    </div>
  );
};

export default PaymentPopup;