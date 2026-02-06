import { type FormEvent, useEffect, useState } from 'react';
import { api } from '../api/client';
import { useAuth } from '../hooks/useAuth';
import type { Role, User } from '../types';

interface EditableUser extends Partial<User> {
  password?: string;
}

const emptyForm: EditableUser = { name: '', email: '', password: '', role: 'user' };

const AdminDashboard = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState<EditableUser>(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [error, setError] = useState('');

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/users');
      setUsers(data.users);
    } catch (err) {
      setError('Unable to load users.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      if (editingId) {
        await api.put(`/users/${editingId}`, form);
      } else {
        await api.post('/users', form);
      }
      setForm(emptyForm);
      setEditingId(null);
      fetchUsers();
    } catch (err) {
      setError('Unable to save user. Please check the details.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (entry: User) => {
    setEditingId(entry.id);
    setForm({ name: entry.name, email: entry.email, role: entry.role, password: '' });
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this user?')) return;
    await api.delete(`/users/${id}`);
    fetchUsers();
  };

  const downloadCsv = async () => {
    const response = await api.get('/users/export/csv', { responseType: 'blob' });
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'users.csv');
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="dashboard">
      <section className="panel">
        <div className="panel-header">
          <div>
            <p className="badge subtle">Admin Dashboard</p>
            <h2>Welcome, {user?.name}</h2>
            <p className="lede">Manage users, roles, and exports from a single view.</p>
          </div>
          <div className="chip-row">
            <span className="pill strong">Role: {user?.role}</span>
            <span className="pill">Users: {users.length}</span>
          </div>
        </div>

        <div className="grid two">
          <div className="card">
            <div className="card-header">
              <h3>{editingId ? 'Edit user' : 'Add user'}</h3>
              {editingId && (
                <button className="btn ghost" onClick={() => { setEditingId(null); setForm(emptyForm); }}>
                  Cancel
                </button>
              )}
            </div>
            <form className="form" onSubmit={handleSubmit}>
              <label>
                Name
                <input
                  type="text"
                  value={form.name || ''}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
              </label>
              <label>
                Email
                <input
                  type="email"
                  value={form.email || ''}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />
              </label>
              <label>
                Password {editingId && <span className="hint">(leave blank to keep)</span>}
                <input
                  type="password"
                  value={form.password || ''}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder={editingId ? '•••••••• (optional)' : '••••••••'}
                  required={!editingId}
                />
              </label>
              <label>
                Role
                <select
                  value={form.role || 'user'}
                  onChange={(e) => setForm({ ...form, role: e.target.value as Role })}
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </label>
              {error && <p className="error">{error}</p>}
              <button className="btn primary" type="submit" disabled={submitting}>
                {submitting ? 'Saving…' : editingId ? 'Update user' : 'Add user'}
              </button>
            </form>
          </div>

          <div className="card">
            <div className="card-header">
              <h3>Users</h3>
              <div className="chip-row">
                <button className="btn ghost" onClick={fetchUsers} disabled={loading}>
                  Refresh
                </button>
                <button className="btn secondary" onClick={downloadCsv}>
                  Download CSV
                </button>
              </div>
            </div>

            {loading ? (
              <div className="centered">
                <div className="spinner" />
                <p>Loading users…</p>
              </div>
            ) : (
              <div className="table">
                <div className="table-head">
                  <span>Name</span>
                  <span>Email</span>
                  <span>Role</span>
                  <span>Actions</span>
                </div>
                {users.map((entry) => (
                  <div key={entry.id} className="table-row">
                    <span>{entry.name}</span>
                    <span>{entry.email}</span>
                    <span className="pill small">{entry.role}</span>
                    <div className="table-actions">
                      <button className="text-btn" onClick={() => handleEdit(entry)}>
                        Edit
                      </button>
                      <button className="text-btn danger" onClick={() => handleDelete(entry.id)}>
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
                {users.length === 0 && <p className="hint">No users yet.</p>}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;
