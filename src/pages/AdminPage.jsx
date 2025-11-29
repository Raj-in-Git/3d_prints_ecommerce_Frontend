import { useEffect, useState } from "react";
import axios from "../api/axiosConfig";
import getImageUrl from "../utils/getImageUrl";
import { Link } from "react-router-dom";

function AdminPage() {
  console.log("ADMIN PAGE LOADED SUCCESSFULLY")
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingProduct, setEditingProduct] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // Form state
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [material, setMaterial] = useState("");
  const [customizable, setCustomizable] = useState(false);
  const [images, setImages] = useState([]); // new images
  const [previewImages, setPreviewImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]); // existing images
  const [formLoading, setFormLoading] = useState(false);

  // Fetch all products
  const fetchProducts = async () => {
    setLoading(true);
    try {
      // const token = localStorage.getItem("token");
      // const res = await axios.get("/products", {
      // headers: { Authorization: `Bearer ${token}` },
    
      // });
      const res = await axios.get("/products");
      console.log(res.data)
      setProducts(res.data);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Open form for add/edit
  const openForm = (product = null) => {
    if (product) {
      setEditingProduct(product);
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setMaterial(product.material);
      setCustomizable(product.customizable);
      setImages([]);
      setPreviewImages([]);
      setExistingImages(product.images || []);
    } else {
      setEditingProduct(null);
      setName("");
      setDescription("");
      setPrice("");
      setMaterial("");
      setCustomizable(false);
      setImages([]);
      setPreviewImages([]);
      setExistingImages([]);
    }
    setShowForm(true);
  };

  // Handle new image selection
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);

    const previews = files.map((file) => URL.createObjectURL(file));
    setPreviewImages(previews);
  };

  // Remove an existing image
  const removeExistingImage = (index) => {
    const updated = [...existingImages];
    updated.splice(index, 1);
    setExistingImages(updated);
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("material", material);
    formData.append("customizable", customizable ? "true" : "false");

    // Append new images
    images.forEach((img) => formData.append("images", img));

    // Include existing images array (backend should handle this)
    formData.append("existingImages", JSON.stringify(existingImages));

    try {
      const token = localStorage.getItem("token");
      let res;
      if (editingProduct) {
        res = await axios.put(`/products/${editingProduct._id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });
      } else {
        res = await axios.post("/products", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });
      }

      

      alert(res.data.message || "Product saved successfully");
      fetchProducts();
      setShowForm(false);
    } catch (err) {
      console.error(err.response || err);
      alert(err.response?.data?.message || "Failed to save product");
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure to delete this product?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Product deleted successfully");
      fetchProducts();
    } catch (err) {
      console.error(err);
      alert("Failed to delete product");
    }
  };

  return (
    
    <div>
      <h2>Admin Page</h2>
      <button onClick={() => openForm()}>Add Product</button>

      {showForm && (
        <form onSubmit={handleSubmit} style={{ margin: "20px 0" }}>
          <input
            type="text"
            placeholder="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Material"
            value={material}
            onChange={(e) => setMaterial(e.target.value)}
            required
          />
          <label>
            Customizable:
            <input
              type="checkbox"
              checked={customizable}
              onChange={(e) => setCustomizable(e.target.checked)}
            />
          </label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
          />

          {/* Existing images */}
          {existingImages.length > 0 && (
  <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
    {existingImages.map((img, idx) => (
      <div key={idx} style={{ position: "relative" }}>
        <img
          src={getImageUrl(img)}
          alt={`existing-${idx}`}
          style={{
            width: "80px",
            height: "80px",
            objectFit: "cover",
            border: "1px solid #ccc",
          }}
        />
        <button
          type="button"
          onClick={() => removeExistingImage(idx)}
          style={{
            position: "absolute",
            top: "-5px",
            right: "-5px",
            background: "red",
            color: "#fff",
            border: "none",
            borderRadius: "50%",
            width: "20px",
            height: "20px",
            cursor: "pointer",
          }}
        >
          ×
        </button>
      </div>
    ))}
  </div>
)}

          {/* Preview new images */}
          {previewImages.length > 0 && (
            <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
              {previewImages.map((src, idx) => (
                <img
                  key={idx}
                  src={src}
                  alt={`preview-${idx}`}
                  style={{
                    width: "80px",
                    height: "80px",
                    objectFit: "cover",
                    border: "1px solid #ccc",
                  }}
                />
              ))}
            </div>
          )}

          <button type="submit" disabled={formLoading}>
            {formLoading
              ? editingProduct
                ? "Updating..."
                : "Adding..."
              : editingProduct
              ? "Update Product"
              : "Add Product"}
          </button>
          {editingProduct && (
            <button type="button" onClick={() => setShowForm(false)}>
              Cancel
            </button>
          )}
        </form>
      )}

      {loading ? (
        <p>Loading products...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <table border="1" cellPadding="5" style={{ marginTop: "20px" }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Material</th>
              <th>Customizable</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((prod) => (
              <tr key={prod._id}>
                <td>{prod.name}</td>
                <td>{prod.price}</td>
                <td>{prod.material}</td>
                <td>{prod.customizable ? "Yes" : "No"}</td>
                <td>
                  <button onClick={() => openForm(prod)}>Edit</button>
                  <button onClick={() => handleDelete(prod._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {/* Back to Home */}
      <div style={{ marginTop: "20px" }}>
        <Link to="/" className="back-button">
          ⬅ Back to Home
        </Link>
      </div>
    </div>
  );
}

export default AdminPage;
