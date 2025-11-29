// src/components/ProductForm.jsx
import { useState, useEffect } from "react";
import axios from "../api/axiosConfig";

function ProductForm({ onSuccess, editProduct, onCancel }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [material, setMaterial] = useState("PLA");
  const [customizable, setCustomizable] = useState(true);
  const [error, setError] = useState("");

  // Populate form when editing
  useEffect(() => {
    if (editProduct) {
      setName(editProduct.name);
      setDescription(editProduct.description);
      setPrice(editProduct.price);
      setMaterial(editProduct.material);
      setCustomizable(editProduct.customizable);
    }
  }, [editProduct]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editProduct) {
        // Update product
        await axios.put(`/products/${editProduct._id}`, {
          name,
          description,
          price: Number(price),
          material,
          customizable
        });
      } else {
        // Add new product
        await axios.post("/products", {
          name,
          description,
          price: Number(price),
          material,
          customizable
        });
      }
      // Reset form
      setName(""); setDescription(""); setPrice("");
      setMaterial("PLA"); setCustomizable(true);
      setError("");
      if (onSuccess) onSuccess();
      if (onCancel) onCancel(); // close edit mode
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save product");
    }
  };

  return (
    <div>
      <h3>{editProduct ? "Edit Product" : "Add New Product"}</h3>
      <form onSubmit={handleSubmit}>
        <input placeholder="Name" value={name} onChange={e=>setName(e.target.value)} required />
        <input placeholder="Description" value={description} onChange={e=>setDescription(e.target.value)} required />
        <input type="number" placeholder="Price" value={price} onChange={e=>setPrice(e.target.value)} required />
        <select value={material} onChange={e=>setMaterial(e.target.value)}>
          <option value="PLA">PLA</option>
          <option value="ABS">ABS</option>
          <option value="PETG">PETG</option>
        </select>
        <label>
          Customizable:
          <input type="checkbox" checked={customizable} onChange={e=>setCustomizable(e.target.checked)} />
        </label>
        <button type="submit">{editProduct ? "Update Product" : "Add Product"}</button>
        {editProduct && <button type="button" onClick={onCancel}>Cancel</button>}
      </form>
      {error && <p style={{color:"red"}}>{error}</p>}
    </div>
  );
}

export default ProductForm;
