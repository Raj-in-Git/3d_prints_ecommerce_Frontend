import { useCart } from "../context/CartContext";
import axios from "../api/axiosConfig";

function CartPage() {
  const { state } = useCart();
  const total = state.cartItems.reduce((acc, item) => acc + item.price, 0);

  // Checkout function
  const handleCheckout = async () => {
    try {
      const res = await axios.post("/payment", { cartItems: state.cartItems });
      // Redirect to Stripe checkout page
      window.location.href = res.data.url;
    } catch (err) {
      console.error("Checkout error:", err);
      alert("Failed to proceed to payment.");
    }
  };

  return (
    <div>
      <h1>Your Cart</h1>
      {state.cartItems.map((item, idx) => (
        <div key={idx} style={{ borderBottom: "1px solid #ccc", margin: "10px 0" }}>
          <h3>{item.name}</h3>
          <p>Price: ₹{item.price}</p>
          {item.customization && <p>Custom: {JSON.stringify(item.customization)}</p>}
        </div>
      ))}
      <h2>Total: ₹{total}</h2>

      {/* Checkout button */}
      <button onClick={handleCheckout}>Checkout</button>
    </div>
  );
}

export default CartPage;
