// src/pages/HomePage.jsx
import { useEffect, useState } from "react";
import axios from "../api/axiosConfig";
import { Link } from "react-router-dom";
// import  getImageUrl  from "../utils/getImageUrl";



const API_URL = "http://localhost:5000/"; // your backend URL

function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("/products");
        setProducts(res.data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch products");
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) return <p>Loading products...</p>;

  return (
    <div className="homepage">
      <h1 className="homepage-title">3D Products Store</h1>
      {error && <p className="error">{error}</p>}

      <div className="product-grid">
        {products.length === 0 ? (
          <p>No products available</p>
        ) : (
          products.map((p) => (
            <Link key={p._id} to={`/products/${p._id}`} className="product-card">
              <div className="image-wrapper">
              <img 
                src={`${API_URL}${p.images[0]}`} 
                alt={p.name} 
              />
              </div>
              <h3>{p.name}</h3>
              <p className="price">₹{p.price}</p>
              <p className="material">Material: {p.material}</p>
            </Link>
          ))
        )}
      </div>

      {/* <div className="admin-link">
        <Link to="/Admin">🔑 Admin Login</Link>
      </div> */}
    </div>
  );
}

export default HomePage;
