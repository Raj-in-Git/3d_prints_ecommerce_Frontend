import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosConfig";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const navigate = useNavigate();
  const { login } = useAuth(); // ✅ Hook called at top level

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");

    try {
      const res = await api.post("/auth/login", { email, password });
      const { token, user } = res.data;

      // Call login from context
      login(token, user.role.toLowerCase());

      // Set token globally for axios
      api.setAuthToken(token);

      // Redirect based on role
      if (user.role.toLowerCase() === "admin") navigate("/admin");
      else navigate("/users");
    } catch (error) {
      const message =
        error.response?.data?.msg ||
        error.response?.data?.error ||
        "Login failed";
      setErr(message);
    }
  };

  return (
    <div style={{ maxWidth: 420, margin: "40px auto" }}>
      <h2>Login</h2>

      <form onSubmit={handleSubmit} style={{ marginTop: 20 }}>
        <div>
          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: "100%", padding: 8, marginBottom: 12 }}
          />
        </div>

        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: "100%", padding: 8, marginBottom: 12 }}
          />
        </div>

        <button
          type="submit"
          style={{
            width: "100%",
            padding: 10,
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: 4,
            cursor: "pointer",
          }}
        >
          Login
        </button>
      </form>

      {err && <p style={{ color: "red", marginTop: 10 }}>{err}</p>}
    </div>
  );
}
