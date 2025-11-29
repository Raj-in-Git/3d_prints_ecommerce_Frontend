import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Register from './pages/Register';
import AdminPage from "./pages/AdminPage";
import UsersPage from "./pages/UsersPage";
import ProductPage from "./pages/ProductPage";
import { useEffect } from "react";
import api from './api/axiosConfig';
import Navbar from "./components/Navbar";
import { AuthProvider } from "./context/AuthContext";
import HomePage from "./pages/HomePage";


function ProtectedRoute({ children, requiredRole }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) return <Navigate to="/login" replace />;

  // If requiredRole is array
  if (Array.isArray(requiredRole) && !requiredRole.includes(role)) {
    return <Navigate to="/login" replace />;
  }

  // If requiredRole is string
  if (typeof requiredRole === "string" && role !== requiredRole) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function App() {
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) api.setAuthToken(token);
  }, []);

  return (
    <AuthProvider>
    <Router>
      {/* Navbar always visible */}
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />
        {/* Admin only */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminPage />
            </ProtectedRoute>
          }
        />

        {/* Users + Admin */}
        <Route
          path="/users"
          element={
            <ProtectedRoute requiredRole={["user", "admin"]}>
              <UsersPage />
            </ProtectedRoute>
          }
        />

        <Route path="/products/:id" element={<ProductPage />} />
      </Routes>
    </Router>
    </AuthProvider>
  );
}

export default App;
