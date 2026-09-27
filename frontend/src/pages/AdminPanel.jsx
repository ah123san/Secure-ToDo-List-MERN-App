import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { API_BASE_URL } from '../config/api';

export default function AdminPanel() {
  const [users, setUsers] = useState([]);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo') || 'null');
    if (!userInfo?.token) {
      setStatus('login');
      return;
    }

    axios.get(`${API_BASE_URL}/api/users/admin/users`, {
      headers: { Authorization: `Bearer ${userInfo.token}` }
    })
      .then(({ data }) => {
        setUsers(data);
        setStatus('ready');
      })
      .catch((error) => {
        setStatus(error.response?.status === 403 ? 'forbidden' : 'error');
      });
  }, []);

  if (status === 'login') return <p className="p-8 text-white">Please <Link to="/login" className="underline">log in</Link> to continue.</p>;
  if (status === 'forbidden') return <p className="p-8 text-white">Access denied. An admin account is required.</p>;
  if (status === 'error') return <p className="p-8 text-white">Could not load users. Check your connection and try again.</p>;
  if (status === 'loading') return <p className="p-8 text-white">Loading users…</p>;

  return (
    <section className="min-h-screen bg-zinc-950 p-6 text-white">
      <h1 className="text-2xl font-bold mb-6">Admin: registered users</h1>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead><tr className="border-b border-zinc-700">
            <th className="p-3">Name</th><th className="p-3">Email</th><th className="p-3">Role</th><th className="p-3">Joined</th>
          </tr></thead>
          <tbody>{users.map((user) => (
            <tr key={user._id} className="border-b border-zinc-800">
              <td className="p-3">{user.name}</td><td className="p-3">{user.email}</td>
              <td className="p-3">{user.role}</td>
              <td className="p-3">{user.createdAt ? new Date(user.createdAt).toLocaleDateString() : '—'}</td>
            </tr>
          ))}</tbody>
        </table>
        {users.length === 0 && <p className="p-3">No users found.</p>}
      </div>
    </section>
  );
}
