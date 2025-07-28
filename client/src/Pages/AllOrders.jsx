import React, { useEffect, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase.config";

function AllOrders() {
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Get current Firebase user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Fetch orders (initial or on filter change)
  useEffect(() => {
    if (!user?.email) return;

    const isAdmin = user.email === "admin@example.com";
    const params = {};

    if (!isAdmin) params.email = user.email;
    if (startDate) params.startDate = startDate;
    if (endDate) params.endDate = endDate;

    axios
      .get("/orders", { params })
      .then((res) => {
        setOrders(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching orders:", err);
        setLoading(false);
      });
  }, [user, startDate, endDate]);

  // Download invoice PDF
  const downloadPDF = (order, index) => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("MatiManubKrishi - Order Invoice", 14, 15);

    doc.setFontSize(12);
    doc.text(`Order #: ${index + 1}`, 14, 25);
    doc.text(`User: ${order.userEmail || user?.email}`, 14, 32);
    doc.text(`Date: ${new Date(order.createdAt).toLocaleString()}`, 14, 39);
    doc.text(`Payment Mode: ${order.paymentMode}`, 14, 46);

    const tableRows = order.cart.map((item, idx) => [
      idx + 1,
      item.name,
      item.category,
      item.quantity,
      item.price,
    ]);

    doc.autoTable({
      startY: 52,
      head: [["#", "Product", "Category", "Qty", "Price"]],
      body: tableRows,
    });

    doc.text(`Total: ৳${order.total}`, 14, doc.lastAutoTable.finalY + 10);
    doc.save(`invoice_order_${index + 1}.pdf`);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Orders</h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium">Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border p-2 rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border p-2 rounded"
          />
        </div>
      </div>

      {/* Orders List */}
      {loading ? (
        <p>Loading orders...</p>
      ) : orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order, index) => (
            <div key={index} className="border p-4 rounded-lg shadow bg-white">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-semibold">
                  Order #{index + 1} — {new Date(order.createdAt).toLocaleString()}
                </h2>
                <button
                  onClick={() => downloadPDF(order, index)}
                  className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
                >
                  Download Invoice
                </button>
              </div>

              <p className="text-sm text-gray-600">
                {order.userEmail && <span>User: {order.userEmail} | </span>}
                Payment: {order.paymentMode} | Total: ৳{order.total}
              </p>

              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                {order.cart.map((item, idx) => (
                  <li
                    key={idx}
                    className="border rounded-md p-3 bg-gray-50 shadow-sm"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-32 object-cover rounded mb-2"
                    />
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm">Category: {item.category}</p>
                    <p className="text-sm">Price: {item.price}</p>
                    <p className="text-sm">Quantity: {item.quantity}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AllOrders;
