import React, { useState } from "react";
import axios from "axios";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const handleAdd = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("adminToken");
    try {
      await axios.post(
        "http://localhost:5000/products",
        { name, price, description, image },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Product added successfully!");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to add product.");
    }
  };

  return (
    <form onSubmit={handleAdd}>
      <h2>Add New Product</h2>
      <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} required />
      <input type="number" placeholder="Price" value={price} onChange={e => setPrice(e.target.value)} required />
      <input placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} required />
      <input placeholder="Image URL" value={image} onChange={e => setImage(e.target.value)} required />
      <button type="submit">Add Product</button>
    </form>
  );
};

export default AddProduct;
