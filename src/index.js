// src/index.js
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { CartProvider } from "./context/CartContext";

// Optional: Global CSS
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    {/* Wrap App with CartProvider so all components can access cart */}
    <CartProvider>
      <App />
    </CartProvider>
  </React.StrictMode>
);
