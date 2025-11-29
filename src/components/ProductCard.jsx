import { useCart } from "../context/CartContext";

function ProductCard({ product }) {
  const { dispatch } = useCart();
  return (
    <div style={{ margin: "10px", border: "1px solid #ccc", padding: "10px" }}>
      <img src={product.images[0]} alt={product.name} width="150" />
      <h3>{product.name}</h3>
      <p>₹{product.price}</p>
      <button onClick={() => dispatch({ type: "ADD_ITEM", payload: product })}>
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;
