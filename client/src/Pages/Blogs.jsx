import React, { useState } from "react";
import axios from "axios";

const BlogForm = () => {
  const [form, setForm] = useState({
    title: "",
    author: "",
    content: "",
    date: "",
    image: null
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value);
    });

    try {
      const res = await axios.post("http://localhost:3000/blogs", formData);
      alert("Blog created: " + res.data.id);
    } catch (err) {
      console.error("Error creating blog:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-6 space-y-4 bg-white rounded shadow">
      <input type="text" name="title" placeholder="Title" onChange={handleChange} required className="w-full p-2 border rounded" />
      <input type="text" name="author" placeholder="Author" onChange={handleChange} required className="w-full p-2 border rounded" />
      <textarea name="content" placeholder="Content" onChange={handleChange} required className="w-full p-2 border rounded h-40"></textarea>
      <input type="date" name="date" onChange={handleChange} required className="w-full p-2 border rounded" />
      <input type="file" name="image" onChange={handleChange} accept="image/*" required className="w-full p-2 border rounded" />
      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Post Blog</button>
    </form>
  );
};

export default BlogForm;
