import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router';
import { useAuth } from '../hooks/useAuth';
import { useCart } from '../hooks/useCart';

const categories = [
  { name: 'Beauty', path: 'beauty' },
  { name: 'Mens', path: 'mens' },
  { name: 'Womens', path: 'women' },
  { name: 'Kids', path: 'kids' },
  { name: 'Footwear', path: 'footwear' },
  { name: 'Near Me', path: 'zudio-near-you' },
  { name: 'Products', path: '/buyform' },
];

const HomeLayout = () => {
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const { cartCount } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navLinkClass = ({ isActive }) =>
    `transition-all duration-300 ${
      isActive
        ? 'text-white'
        : 'text-white/70 hover:text-white'
    }`;

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto flex h-16 md:h-[72px] items-center justify-between px-4 md:px-8">
          
          {/* Logo */}
          <button
            type="button"
            onClick={() => navigate('/home')}
            className="text-2xl md:text-3xl font-bold tracking-[0.25em] uppercase"
          >
            ZUDIO
          </button>

          {/* Desktop Navbar */}
          <nav className="hidden md:flex items-center gap-6 text-sm uppercase tracking-wider">
            {categories.map((cat) => (
              <NavLink
                key={cat.path}
                to={cat.path}
                className={navLinkClass}
              >
                {cat.name}
              </NavLink>
            ))}
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-3 md:gap-5">
            <button
              type="button"
              onClick={() => navigate('/home/cart')}
              className="relative p-2 rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Cart"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>

              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-white text-black text-xs font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            <span className="hidden sm:block text-sm text-white/60">
              {user?.name || 'User'}
            </span>

            <button
              type="button"
              onClick={handleLogout}
              className="hidden md:block border border-white/20 px-4 py-2 rounded-lg text-xs hover:bg-white hover:text-black transition-all duration-300"
            >
              Logout
            </button>

            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              className="md:hidden p-2 rounded-lg border border-white/20"
            >
              {menuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <nav className="md:hidden border-t border-white/10 px-4 py-4 space-y-1 bg-black">
            {categories.map((cat) => (
              <NavLink
                key={cat.path}
                to={cat.path}
                onClick={() => setMenuOpen(false)}
                className="block py-3 px-3 rounded-lg hover:bg-white/10 uppercase tracking-widest text-sm"
              >
                {cat.name}
              </NavLink>
            ))}

            <button
              type="button"
              onClick={() => {
                setMenuOpen(false);
                handleLogout();
              }}
              className="w-full text-left py-3 px-3 rounded-lg hover:bg-white/10 text-sm"
            >
              Logout
            </button>
          </nav>
        )}
      </header>

      <main className="pt-16 md:pt-[72px]">
        <Outlet />
      </main>
    </div>
  );
};

export default HomeLayout;