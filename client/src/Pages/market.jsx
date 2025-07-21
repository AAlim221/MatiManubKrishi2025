import React, { useEffect, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";

const categories = [
  "All",
  "Machinery",
  "Fertilizer",
  "Seeds",
  "Pesticide",
  "Tools",
];

const Market = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [paymentMode, setPaymentMode] = useState("");

  const BASE_URL = "http://localhost:3000";

  useEffect(() => {
    axios
      .get(`${BASE_URL}/products`)
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Fetch failed:", err));
  }, []);

  const handleAddToCart = (item) => {
    setCart((prev) => {
      const exists = prev.find((p) => p.name === item.name);
      if (exists) {
        return prev.map((p) =>
          p.name === item.name ? { ...p, quantity: p.quantity + 1 } : p
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    setShowModal(true);
  };

  const incrementQty = (index) => {
    const updated = [...cart];
    updated[index].quantity += 1;
    setCart(updated);
  };

  const decrementQty = (index) => {
    const updated = [...cart];
    if (updated[index].quantity > 1) {
      updated[index].quantity -= 1;
    } else {
      updated.splice(index, 1);
    }
    setCart(updated);
  };

  const calculateTotal = () =>
    cart
      .reduce(
        (acc, item) =>
          acc +
          (parseFloat(item.price.replace(/[^\d.-]/g, "")) || 0) * item.quantity,
        0
      )
      .toFixed(2);

  const handlePayment = async () => {
    if (!paymentMode) {
      alert("Please select a payment method!");
      return;
    }

    const invoice = {
      cart,
      total: calculateTotal(),
      paymentMode,
      createdAt: new Date().toISOString(),
    };

    try {
      await axios.post(`${BASE_URL}/orders`, invoice);
      alert(`Payment successful via ${paymentMode} ✅`);
      generatePDF();
      setCart([]);
      setPaymentMode("");
      setShowModal(false);
    } catch (err) {
      console.error("Invoice save failed:", err);
      alert("Payment succeeded but failed to save invoice ❌");
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("🧾 Invoice", 14, 22);
    doc.setFontSize(12);
    doc.text(`Date: ${new Date().toLocaleString()}`, 14, 32);
    doc.text(`Payment Method: ${paymentMode}`, 14, 40);

    let y = 60;
    cart.forEach((item, i) => {
      doc.text(
        `${i + 1}. ${item.name} - ${item.quantity} x ${item.price}`,
        14,
        y
      );
      y += 10;
    });

    doc.text(`Total: ৳${calculateTotal()}`, 14, y + 10);
    doc.save("invoice.pdf");
  };

  const filteredItems =
    selectedCategory === "All"
      ? products
      : products.filter((item) => item.category === selectedCategory);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-center text-green-700 mb-6">
        Agri Market
      </h1>

      {/* Category Filter */}
      <div className="flex justify-center mb-6">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border px-4 py-2 rounded-lg shadow-sm"
        >
          {categories.map((cat, index) => (
            <option key={index} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {filteredItems.map((item, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-2xl hover:shadow-xl transition flex flex-col justify-between overflow-hidden"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 flex-grow">
              <h2 className="text-lg font-bold text-green-700">{item.name}</h2>
              <p className="text-sm text-gray-600">{item.category}</p>
              <p className="text-sm font-semibold text-gray-800 mt-2">
                Price: <span className="text-red-500">{item.price}</span>
              </p>
            </div>
            <button
              onClick={() => handleAddToCart(item)}
              className="bg-green-600 text-white font-semibold py-2 px-4 m-4 rounded-lg hover:bg-green-700"
            >
              🛒 Add to Cart
            </button>
          </div>
        ))}
      </div>

      {/* 🛒 Modal with Cart Details */}
      {showModal && cart.length > 0 && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg font-bold mb-4 text-green-700 text-center">
              🛒 Your Cart
            </h2>

            <ul className="divide-y mb-4">
              {cart.map((item, index) => (
                <li
                  key={index}
                  className="py-2 flex justify-between items-center"
                >
                  <span>{item.name}</span>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => decrementQty(index)}
                      className="px-2 py-1 bg-gray-200 rounded"
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => incrementQty(index)}
                      className="px-2 py-1 bg-gray-200 rounded"
                    >
                      +
                    </button>
                  </div>
                  <span className="text-red-500 text-sm">
                    ৳
                    {(
                      parseFloat(item.price.replace(/[^\d.-]/g, "")) *
                      item.quantity
                    ).toFixed(2)}
                  </span>
                </li>
              ))}
            </ul>

            <div className="font-bold text-right mb-4">
              Total: ৳{calculateTotal()}
            </div>

            <div className="mb-4">
              <select
                value={paymentMode}
                onChange={(e) => setPaymentMode(e.target.value)}
                className="w-full border px-4 py-2 rounded"
              >
                <option value="">-- Select Payment Method --</option>
                <option value="Cash">Cash</option>
                <option value="Online">Online Pay</option>
              </select>
            </div>

            <div className="flex justify-between">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Add more...
              </button>

              <button
                onClick={handlePayment}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                ✅ Confirm and Pay
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Market;
