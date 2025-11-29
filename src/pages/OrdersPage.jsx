import { useEffect, useState } from "react";
import axios from "../api/axiosConfig";

function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/orders"); // protected route
      setOrders(res.data);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch orders");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`/orders/${id}`, { status });
      fetchOrders(); // refresh
    } catch (err) {
      alert(err.response?.data?.message || "Update failed");
    }
  };

  return (
    <div>
      <h2>Orders</h2>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>User</th>
            <th>Products</th>
            <th>Total</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(o => (
            <tr key={o._id}>
              <td>{o.user.name}</td>
              <td>
                {o.products.map(p => (
                  <div key={p._id}>{p.name} x {p.quantity}</div>
                ))}
              </td>
              <td>₹{o.total}</td>
              <td>{o.status}</td>
              <td>
                {o.status !== "Delivered" && (
                  <button onClick={() => updateStatus(o._id, "Delivered")}>
                    Mark as Delivered
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OrdersPage;
