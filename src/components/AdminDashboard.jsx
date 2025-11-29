// src/pages/AdminDashboard.jsx
import { useState } from "react";
import ProductsPage from "./ProductsPage";
import UsersPage from "./UsersPage";
import OrdersPage from "./OrdersPage";

function AdminDashboard() {
  const [tab, setTab] = useState("products");

  const logout = () => {
    localStorage.removeItem("token");
    window.location = "/login";
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <nav>
        <button onClick={() => setTab("products")}>Products</button>
        <button onClick={() => setTab("users")}>Users</button>
        <button onClick={() => setTab("orders")}>Orders</button>
        <button onClick={logout}>Logout</button>
      </nav>
      <hr />
      {tab === "products" && <ProductsPage />}
      {tab === "users" && <UsersPage />}
      {tab === "orders" && <OrdersPage />}
    </div>
  );
}

export default AdminDashboard;
