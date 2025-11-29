import { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "../api/axiosConfig";

const API_URL = "https://threed-prints-ecommerce-backend.onrender.com/"; // your backend URL

function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Magnifier state
  const [lens, setLens] = useState({ x: 0, y: 0, visible: false });
  const imgRef = useRef(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`/products/${id}`);
        setProduct(res.data);
        setMainImage(res.data.images?.[0] || "");
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch product");
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <p>Loading product...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  const handleMouseMove = (e) => {
    const rect = imgRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setLens({ x, y, visible: true });
  };

  const handleMouseLeave = () => setLens({ ...lens, visible: false });

  return (
    <div className="product-details">
      <h1>{product.name}</h1>

      {/* Main Image with Lens */}
      <div
        className="main-image-wrapper"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <img
          ref={imgRef}
          src={`${API_URL}${mainImage}`}
          alt={`${product.name} main view`}
          className="main-product-image"
        />

        {lens.visible && (
          <div
            className="magnifier-lens"
            style={{
              backgroundImage: `url(${mainImage})`,
              backgroundPosition: `-${lens.x * 2 - 75}px -${lens.y * 2 - 75}px`,
            }}
          />
        )}
      </div>

      {/* Thumbnails */}
      {product.images && product.images.length > 1 && (
        <div className="thumbnail-gallery">
          {product.images.map((img, i) => (
            <img
              key={i}
              src={`${API_URL}${img}`}
              alt={`${product.name} view ${i + 1}`}
              className={`thumbnail ${img === mainImage ? "active" : ""}`}
              onClick={() => setMainImage(img)}
            />
          ))}
        </div>
      )}

      <p><strong>Description:</strong> {product.description}</p>
      <p><strong>Price:</strong> ₹{product.price}</p>
      <p><strong>Material:</strong> {product.material}</p>
      <p><strong>Customizable:</strong>{" "}<span>{product.customizable ? "Yes" : "No"}</span></p>
      {/* Back to Home */}
      <div style={{ marginTop: "20px" }}>
        <Link to="/" className="back-button">
          ⬅ Back to Home
        </Link>
      </div>
    </div>
  );
}

export default ProductPage;
