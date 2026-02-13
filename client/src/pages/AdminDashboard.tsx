import { type FormEvent, useEffect, useState } from 'react';
import { api } from '../api/client';
import { useAuth } from '../hooks/useAuth';
import type { Role, User, PlanType, SubscriptionDuration, AccountStatus } from '../types';

interface EditableUser extends Partial<User> {
  password?: string;
}

const emptyForm: EditableUser = { 
  name: '', 
  email: '', 
  password: '', 
  role: 'user',
  mobile: '',
  companyName: '',
  companyAddress: '',
  domain: '',
  numberOfUsers: 1,
  planType: 'basic',
  subscriptionDuration: 'monthly',
  accountStatus: 'active'
};

const AdminDashboard = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState<EditableUser>(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [error, setError] = useState('');
  const [deleteError, setDeleteError] = useState('');

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/users');
      setUsers(data.users);
    } catch {
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
    } catch {
      setError('Unable to save user. Please check the details.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (entry: User) => {
    setEditingId(entry.id);
    setForm({ 
      name: entry.name, 
      email: entry.email, 
      role: entry.role, 
      password: '',
      mobile: entry.mobile || '',
      companyName: entry.companyName || '',
      companyAddress: entry.companyAddress || '',
      domain: entry.domain || '',
      numberOfUsers: entry.numberOfUsers || 1,
      planType: entry.planType || 'basic',
      subscriptionDuration: entry.subscriptionDuration || 'monthly',
      accountStatus: entry.accountStatus || 'active'
    });
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this user?')) return;
    setDeleteError('');
    try {
      await api.delete(`/users/${id}`);
      fetchUsers();
    } catch {
      setDeleteError('Unable to delete user. Please try again.');
    }
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
                Name *
                <input
                  type="text"
                  value={form.name || ''}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
              </label>
              <label>
                Email *
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
                Role *
                <select
                  value={form.role || 'user'}
                  onChange={(e) => setForm({ ...form, role: e.target.value as Role })}
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </label>
              
              {/* Company Information */}
              <fieldset className="form-fieldset">
                <legend>Company Information</legend>
                <label>
                  Mobile
                  <input
                    type="text"
                    value={form.mobile || ''}
                    onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                    placeholder="+1 234 567 8900"
                  />
                </label>
                <label>
                  Company Name
                  <input
                    type="text"
                    value={form.companyName || ''}
                    onChange={(e) => setForm({ ...form, companyName: e.target.value })}
                    placeholder="Company Inc."
                  />
                </label>
                <label>
                  Company Address
                  <input
                    type="text"
                    value={form.companyAddress || ''}
                    onChange={(e) => setForm({ ...form, companyAddress: e.target.value })}
                    placeholder="123 Main St, City"
                  />
                </label>
              </fieldset>

              {/* Subscription Information */}
              <fieldset className="form-fieldset">
                <legend>Subscription Information</legend>
                <label>
                  Domain
                  <input
                    type="text"
                    value={form.domain || ''}
                    onChange={(e) => setForm({ ...form, domain: e.target.value })}
                    placeholder="example.com"
                  />
                </label>
                <label>
                  Number of Users
                  <input
                    type="number"
                    min="1"
                    value={form.numberOfUsers || 1}
                    onChange={(e) => setForm({ ...form, numberOfUsers: parseInt(e.target.value) || 1 })}
                  />
                </label>
                <label>
                  Plan Type
                  <select
                    value={form.planType || 'basic'}
                    onChange={(e) => setForm({ ...form, planType: e.target.value as PlanType })}
                  >
                    <option value="basic">Basic</option>
                    <option value="pro">Pro</option>
                  </select>
                </label>
                <label>
                  Subscription Duration
                  <select
                    value={form.subscriptionDuration || 'monthly'}
                    onChange={(e) => setForm({ ...form, subscriptionDuration: e.target.value as SubscriptionDuration })}
                  >
                    <option value="monthly">Monthly</option>
                    <option value="quarterly">Quarterly</option>
                    <option value="6months">6 Months</option>
                    <option value="1year">1 Year</option>
                  </select>
                </label>
                <label>
                  Account Status
                  <select
                    value={form.accountStatus || 'active'}
                    onChange={(e) => setForm({ ...form, accountStatus: e.target.value as AccountStatus })}
                  >
                    <option value="active">Active</option>
                    <option value="disabled">Disabled</option>
                  </select>
                </label>
              </fieldset>

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
              <div className="table-responsive">
                <div className="table">
                  <div className="table-head">
                    <span>Name</span>
                    <span>Email</span>
                    <span>Role</span>
                    <span>Company</span>
                    <span>Plan</span>
                    <span>Status</span>
                    <span>Actions</span>
                  </div>
                  {users.map((entry) => (
                    <div key={entry.id} className="table-row">
                      <span>{entry.name}</span>
                      <span>{entry.email}</span>
                      <span className="pill small">{entry.role}</span>
                      <span>{entry.companyName || '-'}</span>
                      <span className="pill small">{entry.planType || 'basic'}</span>
                      <span className={`pill small ${entry.accountStatus === 'active' ? 'success' : 'warning'}`}>
                        {entry.accountStatus || 'active'}
                      </span>
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
              </div>
            )}
            {deleteError && <p className="error">{deleteError}</p>}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;
