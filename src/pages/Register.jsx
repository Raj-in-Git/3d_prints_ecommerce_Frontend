import React, { useState } from 'react';
import api from '../api/axiosConfig';
import { useNavigate } from 'react-router-dom';


export default function Register() {
const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [role, setRole] = useState('user');
const [err, setErr] = useState('');
const navigate = useNavigate();


const submit = async (e) => {
e.preventDefault();
try {
const res = await api.post('/auth/register', { name, email, password, role });
const { token, user } = res.data;
localStorage.setItem('token', token);
api.setAuthToken(token);
if (user.role === 'admin') navigate('/admin');
else navigate('/user');
} catch (error) {
setErr(error.response?.data?.msg || 'Registration failed');
}
};


return (
<div style={{ maxWidth: 420, margin: '40px auto' }}>
<h2>Register</h2>
<form onSubmit={submit}>
<div>
<input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
</div>
<div>
<input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
</div>
<div>
<input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
</div>
<div>
<select value={role} onChange={(e) => setRole(e.target.value)}>
<option value="user">User</option>
<option value="admin">Admin</option>
</select>
</div>
<button type="submit">Register</button>
</form>
{err && <p style={{ color: 'red' }}>{err}</p>}
</div>
);
}