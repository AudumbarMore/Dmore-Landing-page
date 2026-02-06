import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { pathname } = useLocation();

  const isActive = (path: string) => (pathname === path ? 'nav-link active' : 'nav-link');

  return (
    <header className="navbar">
      <Link to="/" className="brand">
        <div className="brand-mark">M</div>
        <div>
          <p className="brand-name">Morex Technology</p>
          <p className="brand-sub">Secure digital experiences</p>
        </div>
      </Link>

      <nav className="nav-links">
        <Link className={isActive('/')} to="/">
          Home
        </Link>
        <a className="nav-link" href="#features">
          Features
        </a>
        {user?.role === 'admin' && (
          <Link className={isActive('/admin')} to="/admin">
            Admin
          </Link>
        )}
      </nav>

      <div className="nav-actions">
        {user ? (
          <>
            <span className="pill">
              {user.name} · {user.role}
            </span>
            <button className="btn ghost" onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn ghost">
              Login
            </Link>
            <Link to="/register" className="btn primary">
              Get Started
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Navbar;
