import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import ThemeToggle from '../../components/ThemeToggle';
import SearchModal from '../../components/SearchModal';
import { HiMenuAlt3, HiX, HiLockClosed, HiViewGrid, HiSearch } from 'react-icons/hi';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/departments', label: 'Departments' },
  { to: '/programs', label: 'Programs' },
  { to: '/admissions', label: 'Admissions' },
  { to: '/notices', label: 'Notices' },
  { to: '/downloads', label: 'Downloads' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/contact', label: 'Contact' },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { user } = useAuth();

  const linkStyle = (isActive) => ({
    fontSize: '0.875rem',
    fontWeight: isActive ? '700' : '500',
    color: isActive ? 'var(--color-accent)' : 'var(--text-primary)',
    padding: '0.5rem 0',
    position: 'relative',
    transition: 'color var(--transition-fast)',
    textDecoration: 'none',
  });

  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 100,
      background: 'var(--bg-surface)',
      borderBottom: '1px solid var(--border-default)',
      boxShadow: 'var(--shadow-sm)',
      transition: 'background var(--transition-base)',
    }}>
      {/* Search Modal Overlay */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* Top accent bar */}
      <div style={{ height: '3px', background: 'linear-gradient(90deg, var(--color-primary), var(--color-accent), var(--color-secondary))' }} />

      <div className="nav-container" style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '70px', gap: '0.5rem' }}>
          {/* Logo */}
          <Link to="/" className="navbar-logo" style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', textDecoration: 'none', minWidth: 0 }}>
            <img src="/gdc-logo.png" alt="GDC Adilpur Logo" className="logo-img" style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
            <div style={{ minWidth: 0 }}>
              <div className="logo-title" style={{ fontSize: '0.9375rem', fontWeight: '700', color: 'var(--color-primary)', lineHeight: '1.2', letterSpacing: '-0.01em', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                GDC Adilpur
              </div>
              <div className="logo-subtitle" style={{ fontSize: '0.625rem', color: 'var(--text-tertiary)', letterSpacing: '0.04em', textTransform: 'uppercase', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                Government Degree College
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
            {navLinks.map((link) => (
              <NavLink key={link.to} to={link.to} end={link.to === '/'}
                style={({ isActive }) => linkStyle(isActive)}
              >
                {({ isActive }) => (
                  <span>
                    {link.label}
                    {isActive && (
                      <span style={{ position: 'absolute', bottom: '-2px', left: 0, right: 0, height: '2px', background: 'var(--color-accent)', borderRadius: '1px' }} />
                    )}
                  </span>
                )}
              </NavLink>
            ))}

            {/* Global Search Button */}
            <button
              onClick={() => setSearchOpen(true)}
              className="btn btn-ghost btn-icon"
              style={{ fontSize: '1.2rem', color: 'var(--text-secondary)' }}
              title="Search Notices, Programs & Downloads (Ctrl + K)"
              aria-label="Search"
            >
              <HiSearch />
            </button>

            <ThemeToggle />
          </div>

          {/* Mobile Toggle */}
          <div className="mobile-nav-toggle" style={{ flexShrink: 0 }}>
            <button
              onClick={() => setSearchOpen(true)}
              className="btn btn-ghost btn-icon"
              style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', padding: '0.375rem' }}
              title="Search"
              aria-label="Search"
            >
              <HiSearch />
            </button>
            <ThemeToggle className="mobile-theme-toggle" />
            <button className="btn btn-ghost btn-icon" onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu" style={{ fontSize: '1.5rem', padding: '0.375rem' }}>
              {mobileOpen ? <HiX /> : <HiMenuAlt3 />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="animate-slide-up" style={{
          position: 'absolute', top: '73px', left: 0, right: 0,
          background: 'var(--bg-surface)', borderBottom: '1px solid var(--border-default)',
          boxShadow: 'var(--shadow-lg)', padding: '1rem 1.25rem', zIndex: 99,
        }}>
          {navLinks.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.to === '/'}
              onClick={() => setMobileOpen(false)}
              style={({ isActive }) => ({
                display: 'block', padding: '0.75rem 0',
                fontSize: '0.9375rem', fontWeight: isActive ? '700' : '500',
                color: isActive ? 'var(--color-accent)' : 'var(--text-primary)',
                borderBottom: '1px solid var(--border-light)', textDecoration: 'none',
              })}
            >
              {link.label}
            </NavLink>
          ))}

        </div>
      )}

      <style>{`
        .nav-container { padding: 0 1.5rem; }
        .navbar-logo { margin-right: 2rem; }
        .mobile-nav-toggle { display: none; align-items: center; gap: 0.25rem; }
        
        @media (max-width: 1080px) {
          .nav-container { padding: 0 0.75rem !important; }
          .navbar-logo { margin-right: 0 !important; }
          .desktop-nav { display: none !important; }
          .mobile-nav-toggle { display: flex !important; }
        }

        @media (max-width: 380px) {
          .logo-img { width: 36px !important; height: 36px !important; }
          .logo-title { font-size: 0.84rem !important; }
          .logo-subtitle { font-size: 0.52rem !important; }
        }
      `}</style>
    </header>
  );
};

export default Navbar;
