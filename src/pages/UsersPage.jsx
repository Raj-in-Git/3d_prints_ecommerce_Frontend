import { useEffect, useState } from "react";
import api from "../api/axiosConfig";

function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await api.get("/users"); // protected route
      setUsers(res.data);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch users");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);


const deleteUser = async (id) => {
  if (!window.confirm("Are you sure you want to delete this user?")) return;

  try {
    await api.delete(`/users/${id}`);
    setUsers(users.filter(u => u._id !== id));
  } catch (err) {
    alert(err.response?.data?.message || "Delete failed");
  }
};


  return (
    <div>
      <h2>Users</h2>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Admin</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u._id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.role ==="admin" ? "Yes" : "No"}</td>
              <td>
                <button onClick={() => deleteUser(u._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


export default UsersPage;
