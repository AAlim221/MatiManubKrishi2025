// src/Pages/CartDetails.jsx
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const CartDetails = () => {
  const { cart, incrementQty, decrementQty, calculateTotal } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-green-700 mb-4 text-center">🛒 Full Cart Details</h1>
      {!cart || cart.length === 0 ? (
        <p className="text-center text-gray-600">Your cart is empty.</p>
      ) : (
        <>
          <ul className="divide-y">
            {cart.map((item, index) => (
              <li key={index} className="py-2 flex justify-between items-center">
                <span>{item.name}</span>
                <div className="flex items-center space-x-2">
                  <button onClick={() => decrementQty(index)} className="px-2 py-1 bg-gray-200 rounded">-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => incrementQty(index)} className="px-2 py-1 bg-gray-200 rounded">+</button>
                </div>
                <span className="text-red-500">
                  ৳{(parseFloat(item.price.replace(/[^\d.-]/g, '')) * item.quantity).toFixed(2)}
                </span>
              </li>
            ))}
          </ul>
          <div className="text-right mt-4 font-bold">
            Total: ৳{calculateTotal()}
          </div>
          <div className="flex justify-end mt-6">
            <button
              onClick={() => navigate('/market')}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              🔙 Back to Market
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartDetails;
