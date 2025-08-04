import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function TotalOrdersEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    paymentMode: "",
    total: "",
    status: "",
    cart: [],
  });

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/orders/${id}`);
        setOrder(res.data);
        setFormData({
          paymentMode: res.data.paymentMode,
          total: res.data.total,
          status: res.data.status || "",
          cart: res.data.cart || [],
        });
        setLoading(false);
      } catch (err) {
        console.error("❌ Failed to fetch order:", err);
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCartChange = (index, field, value) => {
    const newCart = [...formData.cart];
    newCart[index][field] = value;
    setFormData((prev) => ({
      ...prev,
      cart: newCart,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/orders/${id}`, formData);
      alert("✅ Order updated successfully!");
      navigate("/admin/orders");
    } catch (err) {
      console.error("❌ Failed to update order:", err);
    }
  };

  if (loading) return <p>⏳ লোড হচ্ছে...</p>;
  if (!order) return <p>❌ অর্ডার পাওয়া যায়নি।</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">✏️ অর্ডার আপডেট করুন</h2>

      <button
        onClick={() => navigate("/admin/orders")}
        className="mb-4 text-sm text-blue-600 hover:underline"
      >
        🔙 অর্ডার তালিকায় ফিরে যান
      </button>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">💳 পেমেন্ট মোড</label>
          <input
            type="text"
            name="paymentMode"
            value={formData.paymentMode}
            onChange={handleChange}
            className="border px-3 py-2 w-full rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">💰 মোট টাকা</label>
          <input
            type="number"
            name="total"
            value={formData.total}
            onChange={handleChange}
            className="border px-3 py-2 w-full rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">📦 অর্ডার স্ট্যাটাস</label>
          <input
            type="text"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="border px-3 py-2 w-full rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">🛒 পণ্য তালিকা</label>
          {formData.cart.map((item, index) => (
            <div key={index} className="grid grid-cols-3 gap-2 mb-2">
              <input
                type="text"
                value={item.name}
                onChange={(e) =>
                  handleCartChange(index, "name", e.target.value)
                }
                className="border px-2 py-1 rounded"
                placeholder="পণ্যের নাম"
              />
              <input
                type="number"
                value={item.quantity}
                onChange={(e) =>
                  handleCartChange(index, "quantity", e.target.value)
                }
                className="border px-2 py-1 rounded"
                placeholder="পরিমাণ"
              />
              <input
                type="text"
                value={item.price}
                onChange={(e) =>
                  handleCartChange(index, "price", e.target.value)
                }
                className="border px-2 py-1 rounded"
                placeholder="দাম"
              />
            </div>
          ))}
        </div>

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          ✅ আপডেট করুন
        </button>
      </form>
    </div>
  );
}

export default TotalOrdersEdit;
