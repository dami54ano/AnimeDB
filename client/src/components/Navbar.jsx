import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

const Navbar = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-indigo-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-xl font-bold hover:text-indigo-200 transition-colors">
            AnimeVerseDB
          </Link>
          
          {/* Mobile menu button */}
          <button
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
            className="md:hidden p-2 rounded-md hover:bg-indigo-700 focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            tabIndex="0"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" role="img" aria-hidden="true">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          {/* Desktop menu */}
          <ul className="hidden md:flex space-x-4">
            <li>
              <Link to="/" className={`px-3 py-2 rounded-md ${isActive('/') ? 'bg-indigo-700' : 'hover:bg-indigo-700'}`}>Home</Link>
            </li>
            <li>
              <Link to="/add-anime" className={`px-3 py-2 rounded-md ${isActive('/add-anime') ? 'bg-indigo-700' : 'hover:bg-indigo-700'}`}>Add Anime</Link>
            </li>
            <li>
              <Link to="/products" className={`px-3 py-2 rounded-md ${isActive('/products') ? 'bg-indigo-700' : 'hover:bg-indigo-700'}`}>Products</Link>
            </li>
          </ul>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden transition-all duration-300 ease-in-out">
            <ul className="px-2 pt-2 pb-3 space-y-1">
              <li>
                <Link
                  to="/"
                  className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/') ? 'bg-indigo-700' : 'hover:bg-indigo-700'}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/add-anime"
                  className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/add-anime') ? 'bg-indigo-700' : 'hover:bg-indigo-700'}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Add Anime
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  className={`block px-3 py-2 rounded-md ${isActive('/products') ? 'bg-indigo-700' : 'hover:bg-indigo-700'}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Products
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;