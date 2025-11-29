import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { token, role, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav
      style={{
        display: "flex",
        gap: "20px",
        padding: "10px",
        background: "#f0f0f0",
        marginBottom: "20px",
      }}
    >

      {token ? (
        
        <>
        <Link to="/">Products</Link>
          {role === "admin" && (
            <>
              <Link to="/admin">Admin Dashboard</Link>
              <Link to="/users">Users Dashboard</Link>
              <Link to="/register">Add Users</Link>
            </>
          )}

          {role === "user" && (
            <>
              <Link to="/users">User Dashboard</Link>
            </>
          )}

          <button
            onClick={handleLogout}
            style={{ marginLeft: "auto", padding: "5px 10px" }}
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
          <Link to="/">Products</Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;
