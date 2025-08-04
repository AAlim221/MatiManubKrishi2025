import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

function TotalOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 10;
  const navigate = useNavigate();

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

  useEffect(() => {
    fetchOrders();
  }, []);

  const formatPrice = (priceStr) => priceStr.includes("৳") ? priceStr : `৳${priceStr}`;

  const formatDate = (iso) => {
    const date = new Date(iso);
    return date.toLocaleString('bn-BD', {
      dateStyle: 'medium',
      timeStyle: 'short',
    });
  };

  const handleConfirm = async (id) => {
    try {
      await axios.patch(`http://localhost:3000/orders/${id}/confirm`);
      alert("✅ Order confirmed!");
      fetchOrders();
    } catch (err) {
      console.error("❌ Confirm failed:", err);
    }
  };

  const handleEdit = (id) => {
    navigate(`/admin/totalorderedit/${id}`);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this order?");
    if (!confirmDelete) return;
    try {
      await axios.delete(`http://localhost:3000/orders/${id}`);
      setOrders(prev => prev.filter(order => order._id !== id));
    } catch (error) {
      console.error("❌ Failed to delete order:", error);
    }
  };

  const handleExportExcel = () => {
    const data = filteredOrders.map(order => ({
      ID: order._id,
      Total: order.total,
      Payment: order.paymentMode,
      Status: order.status,
      Date: formatDate(order.createdAt),
    }));
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Orders");
    XLSX.writeFile(workbook, "orders.xlsx");
  };

  const handleExportPDF = () => {
  const doc = new jsPDF();
  const tableColumn = ["ID", "Total", "Payment", "Status", "Date"];
  const tableRows = filteredOrders.map(order => [
    order._id.slice(-6), // Shorten ID for readability
    `৳${order.total}`,
    order.paymentMode,
    order.status,
    formatDate(order.createdAt),
  ]);
  doc.text("📦 Order Report", 14, 15);
  doc.autoTable({
    head: [tableColumn],
    body: tableRows,
    startY: 20,
  });
  doc.save("orders.pdf");
};


  const filteredOrders = orders.filter(order => {
    const date = new Date(order.createdAt);
    const now = new Date();
    const matchSearch = order._id.includes(searchTerm) || order.cart.some(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
    if (dateFilter === "today") {
      return matchSearch && date.toDateString() === now.toDateString();
    } else if (dateFilter === "week") {
      return matchSearch && ((now - date) / (1000 * 60 * 60 * 24)) <= 7;
    }
    return matchSearch;
  });

  const totalPages = Math.ceil(filteredOrders.length / perPage);
  const paginatedOrders = filteredOrders.slice((currentPage - 1) * perPage, currentPage * perPage);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white shadow rounded p-4 border-l-4 border-green-500">
          <h3 className="text-sm text-gray-500">মোট অর্ডার</h3>
          <p className="text-xl font-bold text-green-700">{orders.length}</p>
        </div>
        <div className="bg-white shadow rounded p-4 border-l-4 border-yellow-500">
          <h3 className="text-sm text-gray-500">পেন্ডিং</h3>
          <p className="text-xl font-bold text-yellow-700">{orders.filter(o => o.status !== 'confirmed').length}</p>
        </div>
        <div className="bg-white shadow rounded p-4 border-l-4 border-blue-600">
          <h3 className="text-sm text-gray-500">কনফার্মড</h3>
          <p className="text-xl font-bold text-blue-700">{orders.filter(o => o.status === 'confirmed').length}</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
        <input
          type="text"
          placeholder="🔍 পণ্যের নাম বা অর্ডার ID লিখুন"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/3 px-4 py-2 border rounded shadow-sm"
        />
        <select
          onChange={(e) => setDateFilter(e.target.value)}
          className="px-4 py-2 border rounded shadow-sm"
        >
          <option value="">📅 সব অর্ডার</option>
          <option value="today">আজকের অর্ডার</option>
          <option value="week">এই সপ্তাহ</option>
        </select>
        <div className="flex gap-2">
          <button onClick={handleExportExcel} className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded">⬇️ Excel</button>
          <button onClick={handleExportPDF} className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded">⬇️ PDF</button>
        </div>
      </div>

      {loading ? (
        <p>⏳ লোড হচ্ছে...</p>
      ) : (
        <>
          <div className="overflow-x-auto border rounded-lg shadow">
            <table className="min-w-full bg-white text-sm">
              <thead className="bg-green-600 text-white">
                <tr>
                  <th className="py-3 px-4 text-left">#</th>
                  <th className="py-3 px-4 text-left">পণ্য</th>
                  <th className="py-3 px-4 text-left">পরিমাণ</th>
                  <th className="py-3 px-4 text-left">দাম</th>
                  <th className="py-3 px-4 text-left">মোট</th>
                  <th className="py-3 px-4 text-left">পেমেন্ট</th>
                  <th className="py-3 px-4 text-left">তারিখ</th>
                  <th className="py-3 px-4 text-left">স্ট্যাটাস</th>
                  <th className="py-3 px-4 text-left">✏️</th>
                </tr>
              </thead>
              <tbody>
                {paginatedOrders.map((order, idx) => (
                  <tr key={order._id} className="border-b hover:bg-green-50 even:bg-gray-50">
                    <td className="py-2 px-4 font-medium">{idx + 1}</td>
                    <td className="py-2 px-4">
                      <ul className="list-disc list-inside space-y-1">
                        {order.cart.map(item => <li key={item._id}>{item.name}</li>)}
                      </ul>
                    </td>
                    <td className="py-2 px-4">{order.cart.map(item => <p key={item._id}>{item.quantity}</p>)}</td>
                    <td className="py-2 px-4">{order.cart.map(item => <p key={item._id}>{formatPrice(item.price)}</p>)}</td>
                    <td className="py-2 px-4 font-semibold text-green-700">৳{order.total}</td>
                    <td className="py-2 px-4">{order.paymentMode}</td>
                    <td className="py-2 px-4">{formatDate(order.createdAt)}</td>
                    <td className="py-2 px-4">
                      <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded ${order.status === 'confirmed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                        {order.status === 'confirmed' ? '✅ কনফার্মড' : '⏳ পেন্ডিং'}
                      </span>
                    </td>
                    <td className="py-2 px-4 flex gap-1">
                      <button
                        disabled={order.status === "confirmed"}
                        title="Confirm Order"
                        className={`text-xs px-2 py-1 rounded ${order.status === "confirmed" ? "bg-gray-400 text-white cursor-not-allowed" : "bg-green-600 hover:bg-green-700 text-white"}`}
                        onClick={() => handleConfirm(order._id)}
                      >✅</button>
                      <button
                        onClick={() => handleEdit(order._id)}
                        title="Edit Order"
                        className="text-xs bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded"
                      >✏️</button>
                      <button
                        onClick={() => handleDelete(order._id)}
                        title="Delete Order"
                        className="text-xs bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded"
                      >🗑️</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 flex justify-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 rounded ${page === currentPage ? "bg-green-600 text-white" : "bg-gray-200 text-black hover:bg-gray-300"}`}
              >{page}</button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default TotalOrders;