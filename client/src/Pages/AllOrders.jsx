import React, { useEffect, useState } from "react";
import axios from "axios";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import { FaMoneyBill, FaClock, FaEnvelope, FaCartPlus } from "react-icons/fa";

function AllOrders() {
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user?.email) return;
      try {
        const res = await axios.get("http://localhost:3000/orders", {
          params: { email: user.email },
        });
        setOrders(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Fetch failed:", err);
        setLoading(false);
      }
    };
    fetchOrders();
  }, [user]);

  const formatDate = (isoDate) => new Date(isoDate).toLocaleString();

  if (loading) return <p className="text-center mt-10">Loading orders...</p>;

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-2xl font-bold text-center mb-6">
       All Orders
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {orders.map((order, idx) => (
          <div
            key={idx}
            onClick={() => setSelectedOrder(order)}
            className="bg-white rounded-xl shadow hover:shadow-xl transition p-5 cursor-pointer border border-gray-200"
          >
            <h3 className="text-md font-bold text-gray-800 mb-2">
              Order ID:{" "}
              <span className="text-blue-600">{order._id.slice(-6)}</span>
            </h3>
            <div className="text-sm text-gray-600 space-y-1">
              <p className="flex items-center gap-2">
                <FaCartPlus /> Total:{" "}
                <span className="font-semibold">৳{order.total}</span>
              </p>
              <p className="flex items-center gap-2">
                <FaMoneyBill /> Payment: {order.paymentMode}
              </p>
              <p className="flex items-center gap-2">
                <FaClock /> Date: {formatDate(order.createdAt)}
              </p>
              <p className="flex items-center gap-2">
                <FaEnvelope /> {order.email || user.email}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Popup / Details View */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-2xl rounded-xl shadow-lg p-6 relative overflow-y-auto max-h-[80vh]">
            <button
              className="absolute top-3 right-4 text-xl font-bold"
              onClick={() => setSelectedOrder(null)}
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-4 text-blue-600">
              Order Details
            </h2>

            <p className="mb-3 text-gray-700">
              <strong>Total:</strong> ৳{selectedOrder.total} <br />
              <strong>Payment:</strong> {selectedOrder.paymentMode} <br />
              <strong>Date:</strong> {formatDate(selectedOrder.createdAt)} <br />
              <strong>Email:</strong> {selectedOrder.email || user.email}
            </p>

            <h3 className="text-md font-semibold text-gray-800 mb-2">
              Cart Items:
            </h3>
            <ul className="space-y-3">
              {selectedOrder.cart.map((item, i) => (
                <li
                  key={i}
                  className="border rounded-md p-3 flex gap-4 items-center"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded object-cover border"
                  />
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-gray-600">
                      Category: {item.category}
                    </p>
                    <p className="text-sm text-gray-600">
                      Quantity: {item.quantity}
                    </p>
                    <p className="text-sm text-gray-600">Price: {item.price}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default AllOrders;
