// src/Pages/AddProduct.jsx
import React, { useState } from "react";
import axios from "axios";

const AddProduct = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "",
    price: "",
    image: "",
  });

  const BASE_URL = "http://localhost:3000";

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${BASE_URL}/products`, newProduct);
      alert("✅ Product added successfully!");
      setNewProduct({ name: "", category: "", price: "", image: "" });
    } catch (err) {
      console.error("Product upload failed:", err);
      alert("❌ Failed to add product");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 mt-10 bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-4 text-center text-green-700">
        ➕ Add New Product
      </h2>
      <form onSubmit={handleAddProduct} className="space-y-4">
        <input
          type="text"
          placeholder="Product Name"
          value={newProduct.name}
          onChange={(e) =>
            setNewProduct({ ...newProduct, name: e.target.value })
          }
          className="w-full border px-4 py-2 rounded"
          required
        />
        <input
          type="text"
          placeholder="Category"
          value={newProduct.category}
          onChange={(e) =>
            setNewProduct({ ...newProduct, category: e.target.value })
          }
          className="w-full border px-4 py-2 rounded"
          required
        />
        <input
          type="text"
          placeholder="Price"
          value={newProduct.price}
          onChange={(e) =>
            setNewProduct({ ...newProduct, price: e.target.value })
          }
          className="w-full border px-4 py-2 rounded"
          required
        />
        <input
          type="text"
          placeholder="Image URL"
          value={newProduct.image}
          onChange={(e) =>
            setNewProduct({ ...newProduct, image: e.target.value })
          }
          className="w-full border px-4 py-2 rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-green-700 text-white py-2 rounded hover:bg-green-800 transition"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
