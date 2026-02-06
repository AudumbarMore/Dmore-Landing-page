import { type FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobile, setMobile] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [companyAddress, setCompanyAddress] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await register(name, email, password, mobile, companyName, companyAddress);
      navigate('/admin');
    } catch (err) {
      setError('Registration failed. Please try a different email.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <p className="badge subtle">Onboarding</p>
        <h2>Create your account</h2>
        <p className="lede">Start with secure authentication out of the box.</p>

        <form onSubmit={handleSubmit} className="form">
          <label>
            Full name
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Alex Johnson"
              required
            />
          </label>
          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@morex.com"
              required
            />
          </label>
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </label>
          <label>
            Mobile number
            <input
              type="tel"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              placeholder="+1 555 123 4567"
              required
            />
          </label>
          <label>
            Company name
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="Morex Technology"
              required
            />
          </label>
          <label>
            Company address
            <textarea
              value={companyAddress}
              onChange={(e) => setCompanyAddress(e.target.value)}
              placeholder="Street, city, state, ZIP"
              required
              rows={3}
              style={{ resize: 'vertical' }}
            />
          </label>
          {error && <p className="error">{error}</p>}
          <button type="submit" className="btn primary" disabled={loading}>
            {loading ? 'Creating…' : 'Create account'}
          </button>
        </form>

        <p className="hint">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
