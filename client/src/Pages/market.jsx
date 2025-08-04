// Market.jsx
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import { useLocation, useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebase.config";
import { onAuthStateChanged } from "firebase/auth";


// categories
const categories = [
  "Filter",
  "Machinery",
  "Fertilizer",
  "Seeds",
  "Pesticide",
  "Tools",
];

// local storage keys for small data only
const LOCAL_STORAGE_SIDEBAR_OPEN_KEY = "market_isSidebarOpen";
const LOCAL_STORAGE_CART_KEY = "market_cart";

// IndexedDB keys
const IDB_DB_NAME = "marketDB";
const IDB_STORE_NAME = "pdfStore";
const IDB_PDF_KEY = "pdfBase64";
const IDB_LANGUAGE_KEY = "language";

// IndexedDB helper functions
function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(IDB_DB_NAME, 1);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(IDB_STORE_NAME)) {
        db.createObjectStore(IDB_STORE_NAME);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}
async function idbSet(key, value) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(IDB_STORE_NAME, "readwrite");
    const store = tx.objectStore(IDB_STORE_NAME);
    const request = store.put(value, key);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

async function idbGet(key) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(IDB_STORE_NAME, "readonly");
    const store = tx.objectStore(IDB_STORE_NAME);
    const request = store.get(key);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function _idbDelete(key) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(IDB_STORE_NAME, "readwrite");
    const store = tx.objectStore(IDB_STORE_NAME);
    const request = store.delete(key);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

// Utility: convert base64 string to Blob
const base64ToBlob = (base64, mime) => {
  const byteChars = atob(base64);
  const byteArrays = [];
  for (let offset = 0; offset < byteChars.length; offset += 512) {
    const slice = byteChars.slice(offset, offset + 512);
    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }
  return new Blob(byteArrays, { type: mime });
};

const Market = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [userEmail, setUserEmail] = useState("");
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem(LOCAL_STORAGE_CART_KEY);
    return storedCart ? JSON.parse(storedCart) : [];
  });
  const [showModal, setShowModal] = useState(false);
  const [paymentMode, setPaymentMode] = useState("");
  const [zoomLevel, setZoomLevel] = useState(70);
  const [searchTerm, setSearchTerm] = useState("");

  const location = useLocation();
  const _navigate = useNavigate();

  const [pdfUrl, setPdfUrl] = useState(null);
  const [_language, setLanguage] = useState("en");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const pdfUrlRef = useRef(null);
  const BASE_URL = "http://localhost:3000";
  

useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    if (user) {
      setUserEmail(user.email);
    }
  });
  return () => unsubscribe();
}, []);


  // Create object URL from base64 PDF and set in state
  const setPdfFromBase64 = (base64, forceOpen = false) => {
    if (pdfUrlRef.current) {
      URL.revokeObjectURL(pdfUrlRef.current);
    }
    const blob = base64ToBlob(base64, "application/pdf");
    const url = URL.createObjectURL(blob);
    pdfUrlRef.current = url;
    setPdfUrl(url);
    if (forceOpen) setIsSidebarOpen(true);
  };


  // Save PDF base64 and language to IndexedDB
  const savePdfAndLanguageToIndexedDB = async (base64, lang) => {
    try {
      await idbSet(IDB_PDF_KEY, base64);
      await idbSet(IDB_LANGUAGE_KEY, lang);
    } catch (error) {
      console.warn("Failed to save PDF or language to IndexedDB:", error);
    }
  };

  // Generate default PDF if none available
  const generateDefaultPDF = async () => {
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text("📋 Welcome to Agri Market", 20, 30);
    doc.setFontSize(14);
    doc.text("Browse products and shop with ease!", 20, 50);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 70);

    const base64 = await doc
      .output("datauristring")
      .then((dataUri) => dataUri.split(",")[1]);

    await savePdfAndLanguageToIndexedDB(base64, "en");
    setPdfFromBase64(base64);
    setLanguage("en");
  };

  // Load PDF + language from navigation state or IndexedDB
  useEffect(() => {
    async function loadPdfAndLang() {
      const incomingBase64 = location.state?.pdfBase64;
      const incomingLang = location.state?.language;

      if (incomingBase64) {
        setPdfFromBase64(incomingBase64, false);
        setLanguage(incomingLang || "en");
        await savePdfAndLanguageToIndexedDB(
          incomingBase64,
          incomingLang || "en"
        );
      } else {
        const storedBase64 = await idbGet(IDB_PDF_KEY);
        const storedLang = await idbGet(IDB_LANGUAGE_KEY);

        if (storedBase64) {
          setPdfFromBase64(storedBase64);
          setLanguage(storedLang || "en");
        } else {
          generateDefaultPDF();
        }
      }
    }
    loadPdfAndLang();
  }, [location.state]);

  // Persist sidebar open state in localStorage (small data)
  useEffect(() => {
    localStorage.setItem(
      LOCAL_STORAGE_SIDEBAR_OPEN_KEY,
      isSidebarOpen.toString()
    );
  }, [isSidebarOpen]);

  // Cleanup PDF blob URL on unmount
  useEffect(() => {
    return () => {
      if (pdfUrlRef.current) {
        URL.revokeObjectURL(pdfUrlRef.current);
        pdfUrlRef.current = null;
      }
    };
  }, []);

  // Persist cart in localStorage
  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem(LOCAL_STORAGE_CART_KEY, JSON.stringify(cart));
    } else {
      localStorage.removeItem(LOCAL_STORAGE_CART_KEY);
    }
  }, [cart]);

  // Load products from backend
  useEffect(() => {
   axios
  .get(`${BASE_URL}/products`)
  .then((res) => {
    const productsWithStock = res.data.map((item) => ({
      ...item,
      stock: item.stock ?? 100, // if stock undefined, set to 100
    }));
    setProducts(productsWithStock);
  })
  .catch((err) => console.error("Fetch failed:", err));

  }, []);
  



const handleAddToCart = (item) => {
  if (item.stock <= 0) {
    alert("❌ Out of stock!");
    return;
  }

  // Reduce stock in products list
  setProducts((prevProducts) =>
    prevProducts.map((p) =>
      p.name === item.name
        ? { ...p, stock: p.stock - 1 }
        : p
    )
  );

  // Add to cart
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
  const item = cart[index];
  const product = products.find((p) => p.name === item.name);
  if (item.quantity >= product.stock) {
    alert("❌ No more stock available!");
    return;
  }

  const updated = [...cart];
  updated[index].quantity += 1;

  // Reduce from stock
  setProducts((prevProducts) =>
    prevProducts.map((p) =>
      p.name === item.name ? { ...p, stock: p.stock - 1 } : p
    )
  );

  setCart(updated);
};


const decrementQty = (index) => {
  const item = cart[index];
  const updated = [...cart];

  // Restore stock when decreasing
  setProducts((prevProducts) =>
    prevProducts.map((p) =>
      p.name === item.name ? { ...p, stock: p.stock + 1 } : p
    )
  );

  if (updated[index].quantity > 1) {
    updated[index].quantity -= 1;
  } else {
    updated.splice(index, 1);
  }

  setCart(updated);
};


  const calculateTotal = (items) =>
    items
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
  total: calculateTotal(cart),
  paymentMode,
  createdAt: new Date().toISOString(),
  email: userEmail, // ✅ include logged-in user email here
};


    try {
      await axios.post(`${BASE_URL}/orders`, invoice);
      alert(`Payment successful via ${paymentMode} ✅`);
      setCart([]);
      setPaymentMode("");
      setShowModal(false);
    } catch (err) {
      console.error("Invoice save failed:", err);
      alert("Payment succeeded but failed to save invoice ❌");
    }
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const filteredItems = products.filter((item) => {
    const matchCategory =
      selectedCategory === "All" || item.category === selectedCategory;
    const matchSearch = item.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchCategory && matchSearch;
  });

  // Reopen PDF preview from IndexedDB
  const handleReopenPreview = async () => {
    try {
      const savedBase64 = await idbGet(IDB_PDF_KEY);
      if (savedBase64) {
        setPdfFromBase64(savedBase64, true);
      } else {
        alert("No PDF preview available.");
      }
    } catch {
      alert("No PDF preview available.");
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f7f9] p-6 relative">
      {/* Top Bar: Category Dropdown & Prescription Button */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-6">
        {/* Category Dropdown */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
          aria-label="Select category"
        >
          {categories.map((cat, index) => (
            <option key={index} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        {/* Search Input */}
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="🔍 Search product..."
          className="border px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 w-full sm:w-64"
        />

        {/* Prescription Button */}
        {!isSidebarOpen && (
          <button
            onClick={handleReopenPreview}
            className="bg-green-700 text-white px-4 py-2 rounded-xl shadow-md hover:bg-green-600 hover:scale-[1.03] transition-transform duration-200 flex items-center gap-2 font-medium tracking-wide"
            aria-label="View Prescription"
          >
            <span className="text-lg">📋</span>
            <span className="hidden sm:inline">Prescription Preview</span>
          </button>
        )}
      </div>

      {/* Category Filter & Product Grid Wrapper */}
      <div
        className="transition-all duration-300"
        style={{ marginRight: isSidebarOpen ? "300px" : "0px" }}
      >
        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
                <h2 className="text-lg font-bold text-green-700">
                  {item.name}
                </h2>
                <p className="text-sm text-gray-600">{item.category}</p>
                <p className="text-sm font-semibold text-gray-800 mt-2">
                  Price: <span className="text-red-500">{item.price}</span>
                </p>
                <p className="text-xs text-gray-500 mt-1">
  Stock: {item.stock}
</p>

              </div>
              <button
                onClick={() => handleAddToCart(item)}
                className="bg-green-800 text-white font-semibold py-2 px-4 m-4 rounded-lg hover:bg-green-700"
                aria-label={`Add ${item.name} to cart`}
              >
                🛒 Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Sidebar (Prescription Preview) */}
      {pdfUrl && isSidebarOpen && (
        <div
          className="fixed top-[64px] right-0 w-[400px] h-[calc(100vh-64px)] bg-gradient-to-r from-gray-100 to-white z-40 rounded-l-3xl shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
          style={{ boxShadow: "-6px 0 20px rgba(0, 0, 0, 0.15)" }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 bg-[#a4c3b2] border-b border-gray-300 shadow-sm">
            <h2 className="text-xl font-semibold text-green-900 flex items-center gap-2">
              📋 Prescription Preview
            </h2>
            <button
              onClick={closeSidebar}
              className="text-gray-600 hover:text-red-600 text-2xl font-bold"
              aria-label="Close prescription preview"
            >
              ×
            </button>
          </div>
          {/* Minimized Preview Button (visible only if PDF exists and sidebar is closed) */}
          {pdfUrl && !isSidebarOpen && (
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="fixed bottom-4 right-4 bg-white border border-gray-300 shadow-lg rounded-full p-4 hover:scale-[1.05] transition-transform duration-200 z-50 flex items-center gap-2"
              aria-label="Open PDF preview"
            >
              <span className="text-2xl">📋</span>
              <span className="hidden sm:inline text-sm font-semibold text-gray-700">
                Open Preview
              </span>
            </button>
          )}

          {/* Zoom Controls */}
          <div className="flex justify-center items-center gap-6 px-6 py-3 bg-gray-100 border-b border-gray-200">
            <button
              onClick={() => setZoomLevel((z) => Math.max(z - 10, 50))}
              className="w-9 h-9 rounded-full bg-white border shadow hover:bg-gray-200"
              aria-label="Zoom out"
            >
              <span className="text-xl font-bold">−</span>
            </button>
            <span className="text-sm font-medium text-gray-700">
              Zoom: {zoomLevel}%
            </span>
            <button
              onClick={() => setZoomLevel((z) => Math.min(z + 10, 300))}
              className="w-9 h-9 rounded-full bg-white border shadow hover:bg-gray-200"
              aria-label="Zoom in"
            >
              <span className="text-xl font-bold">+</span>
            </button>
          </div>

          {/* PDF Viewer */}
          <div className="flex-grow p-4 bg-[#e6f0ec]">
            <div className="w-full h-full bg-white border border-gray-300 rounded-lg overflow-hidden shadow-lg">
              <iframe
                key={zoomLevel}
                src={`${pdfUrl}#toolbar=0&zoom=${zoomLevel}`}
                className="w-full h-full"
                title="Prescription PDF"
              />
            </div>
          </div>
        </div>
      )}

      {/* Cart Modal */}
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
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => decrementQty(index)}
                      className="px-2 py-1 bg-gray-200 rounded"
                    >
                      −
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
              Total: ৳{calculateTotal(cart)}
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
