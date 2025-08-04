import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

function EditDoctor() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    designation: "",
    university: "",
    specialization: "",
    phone: "",
    mobile: "",
    email: "",
    bio: "",
    profileLink: "",
  });
  const [image, setImage] = useState(null);
  const [existingImage, setExistingImage] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:3000/doctors/${id}`).then((res) => {
      const d = res.data;
      setFormData({
        name: d.name,
        designation: d.designation,
        university: d.university,
        specialization: Array.isArray(d.specialization)
          ? d.specialization.join(", ")
          : d.specialization,
        phone: d.contact?.phone || "",
        mobile: d.contact?.mobile || "",
        email: d.contact?.email || "",
        bio: d.bio || "",
        profileLink: d.profileLink || "",
      });
      setExistingImage(d.imageUrl || d.image || "");
    });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.designation || !formData.university) {
      toast.error("Please fill all required fields!");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => data.append(key, value));
    if (image) data.append("doctorImage", image);

    try {
      await axios.put(`http://localhost:3000/doctors/${id}`, data);
      toast.success("✅ Doctor updated successfully!");
      setTimeout(() => navigate("/admin/doctors"), 1500);
    } catch (err) {
      console.error(err);
      toast.error("❌ Update failed");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white rounded-lg shadow mt-10">
      <Toaster position="top-right" />
      <h2 className="text-2xl font-bold text-green-700 text-center mb-6">📝 Edit Doctor</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Full Name"
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
          required
        />
        <input
          name="designation"
          value={formData.designation}
          onChange={handleChange}
          placeholder="Designation"
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
          required
        />
        <input
          name="university"
          value={formData.university}
          onChange={handleChange}
          placeholder="University"
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
          required
        />
        <input
          name="specialization"
          value={formData.specialization}
          onChange={handleChange}
          placeholder="Specialization (comma-separated)"
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
        />
        <input
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Phone"
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
        />
        <input
          name="mobile"
          value={formData.mobile}
          onChange={handleChange}
          placeholder="Mobile"
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
          required
        />
        <input
          name="profileLink"
          value={formData.profileLink}
          onChange={handleChange}
          placeholder="Profile Link"
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
        />
        <textarea
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          rows={3}
          placeholder="Short Bio"
          className="w-full px-4 py-2 border border-gray-300 rounded-md resize-none"
        />

        {/* Image Preview and Delete */}
       <div>
  <label className="block mb-1 font-medium">Replace Image (optional)</label>
  <input
    type="file"
    accept="image/*"
    onChange={handleFileChange}
    className="w-full px-4 py-2 border border-gray-300 rounded-md"
  />

  {/* Existing image */}
  {existingImage && !image && (
    <div className="flex items-center gap-4 mt-2">
      <img
        src={
          existingImage.startsWith("http")
            ? existingImage
            : `http://localhost:3000${existingImage}`
        }
        alt="Current"
        className="w-20 h-20 rounded-full border object-cover"
      />
      <button
        type="button"
        onClick={() => setExistingImage("")}
        className="text-sm text-red-600 underline"
      >
        ❌ Remove Image
      </button>
    </div>
  )}

  {/* New selected image preview */}
  {image && (
    <img
      src={URL.createObjectURL(image)}
      alt="Preview"
      className="w-20 h-20 rounded-full border mt-2 object-cover"
    />
  )}
</div>


        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg"
        >
          Update Doctor
        </button>
      </form>
    </div>
  );
}

export default EditDoctor;
