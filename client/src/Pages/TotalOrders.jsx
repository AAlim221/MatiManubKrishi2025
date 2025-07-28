import React, { useEffect, useState } from 'react';
import axios from 'axios';

function TotalOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get('http://localhost:3000/orders');
        setOrders(res.data);
        setLoading(false);
      } catch (error) {
        console.error('❌ Failed to fetch orders:', error);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const formatPrice = (priceStr) => {
    // If price is a range (e.g. "৳6,50,000+"), just return as-is
    return priceStr.includes("৳") ? priceStr : `৳${priceStr}`;
  };

  const formatDate = (iso) => {
    const date = new Date(iso);
    return date.toLocaleString('bn-BD', {
      dateStyle: 'medium',
      timeStyle: 'short',
    });
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-green-700">📦 মোট অর্ডার ({orders.length})</h1>

      {loading ? (
        <p>⏳ লোড হচ্ছে...</p>
      ) : orders.length === 0 ? (
        <p className="text-gray-600">🚫 কোনো অর্ডার পাওয়া যায়নি।</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-xl overflow-hidden">
            <thead className="bg-green-600 text-white">
              <tr>
                <th className="py-3 px-4 text-left">#</th>
                <th className="py-3 px-4 text-left">Products</th>
                <th className="py-3 px-4 text-left">Qty</th>
                <th className="py-3 px-4 text-left">Price</th>
                <th className="py-3 px-4 text-left">Total</th>
                <th className="py-3 px-4 text-left">Payment</th>
                <th className="py-3 px-4 text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, idx) => (
                <tr key={order._id} className="border-b hover:bg-green-50">
                  <td className="py-2 px-4">{idx + 1}</td>
                  <td className="py-2 px-4">
                    <ul className="list-disc list-inside space-y-1">
                      {order.cart.map((item) => (
                        <li key={item._id}>{item.name}</li>
                      ))}
                    </ul>
                  </td>
                  <td className="py-2 px-4">
                    {order.cart.map((item) => (
                      <p key={item._id}>{item.quantity}</p>
                    ))}
                  </td>
                  <td className="py-2 px-4">
                    {order.cart.map((item) => (
                      <p key={item._id}>{formatPrice(item.price)}</p>
                    ))}
                  </td>
                  <td className="py-2 px-4 font-semibold text-green-700">
                    ৳{order.total}
                  </td>
                  <td className="py-2 px-4">{order.paymentMode}</td>
                  <td className="py-2 px-4">{formatDate(order.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default TotalOrders;