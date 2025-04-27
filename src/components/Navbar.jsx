import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaSearch, FaBars, FaTimes, FaUser, FaHeart, FaBoxOpen, FaMapMarkerAlt } from 'react-icons/fa';
import { CartContext } from '../App';

const Navbar = () => {
  const { cart } = useContext(CartContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  
  // Count unique items in cart instead of total quantity
  const cartItemsCount = cart.length;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50">
      {/* Top nav bar */}
      <div className="bg-dark text-white">
        <div className="container mx-auto py-3 px-4">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <Link to="/" className="text-2xl font-bold mr-8 flex items-center">
              <span className="font-bold text-accent">Shop</span>
              <span className="font-bold italic text-secondary-light">Ease</span>
            </Link>

            {/* Search */}
            <form onSubmit={handleSubmit} className="flex-grow max-w-xl relative hidden md:block">
              <input
                type="text"
                placeholder="Search for products, brands and more..."
                className="w-full py-2 px-4 pr-10 rounded-full text-dark focus:outline-none focus:ring-2 focus:ring-accent border-0"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button 
                type="submit"
                className="absolute right-0 top-0 h-full bg-accent hover:bg-accent-dark px-4 rounded-r-full transition-colors"
              >
                <FaSearch className="text-white" />
              </button>
            </form>

            {/* Mobile menu button */}
            <button 
              className="md:hidden text-white"
              onClick={toggleMobileMenu}
            >
              {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>

            {/* Navigation - Desktop */}
            <nav className="hidden md:flex items-center space-x-6 ml-auto">
              <div className="group relative">
                <button className="text-white flex items-center gap-1 hover:text-accent-light transition-colors">
                  <FaUser className="text-sm" />
                  <span>Account</span>
                </button>
                <div className="absolute right-0 top-full mt-1 w-60 bg-white rounded-md shadow-lg transform scale-0 group-hover:scale-100 transition-transform origin-top-right duration-150 z-50">
                  <div className="p-4">
                    <div className="mb-3 pb-3 border-b border-gray-200">
                      <p className="text-sm text-gray-500">New Customer?</p>
                      <Link to="/register" className="text-accent font-medium hover:underline">Sign Up</Link>
                    </div>
                    <ul className="space-y-2 text-sm">
                      <li>
                        <Link to="/account" className="text-dark hover:text-accent flex items-center gap-2 transition-colors">
                          <FaUser className="text-accent-dark" /> My Profile
                        </Link>
                      </li>
                      <li>
                        <Link to="/orders" className="text-dark hover:text-accent flex items-center gap-2 transition-colors">
                          <FaBoxOpen className="text-accent-dark" /> Orders
                        </Link>
                      </li>
                      <li>
                        <Link to="/wishlist" className="text-dark hover:text-accent flex items-center gap-2 transition-colors">
                          <FaHeart className="text-accent-dark" /> Wishlist
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <Link to="/cart" className="relative flex items-center gap-1 text-white hover:text-accent-light transition-colors">
                <FaShoppingCart size={18} />
                <span>Cart</span>
                {cartItemsCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-secondary rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                    {cartItemsCount}
                  </span>
                )}
              </Link>
            </nav>
          </div>
        </div>
      </div>
      
      {/* Categories bar */}
      <div className="bg-light shadow-md hidden md:block">
        <div className="container mx-auto">
          <ul className="flex space-x-8 py-2 px-4">
            <li>
              <Link to="/products?category=electronics" className="text-dark hover:text-accent font-medium transition-colors relative group">
                Electronics
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300"></span>
              </Link>
            </li>
            <li>
              <Link to="/products?category=men's clothing" className="text-dark hover:text-accent font-medium transition-colors relative group">
                Men's Fashion
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300"></span>
              </Link>
            </li>
            <li>
              <Link to="/products?category=women's clothing" className="text-dark hover:text-accent font-medium transition-colors relative group">
                Women's Fashion
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300"></span>
              </Link>
            </li>
            <li>
              <Link to="/products?category=jewelery" className="text-dark hover:text-accent font-medium transition-colors relative group">
                Jewelry
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300"></span>
              </Link>
            </li>
            <li>
              <Link to="/products" className="text-dark hover:text-accent font-medium transition-colors relative group">
                All Products
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300"></span>
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Mobile search - visible below md breakpoint */}
      <div className="bg-light shadow-md md:hidden p-3">
        <form onSubmit={handleSubmit} className="relative">
          <input
            type="text"
            placeholder="Search for products, brands and more..."
            className="w-full py-2 px-4 pr-10 rounded-full text-dark focus:outline-none border border-gray-300 focus:border-accent focus:ring-1 focus:ring-accent"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button 
            type="submit"
            className="absolute right-0 top-0 h-full bg-accent hover:bg-accent-dark px-4 rounded-r-full transition-colors"
          >
            <FaSearch className="text-white" />
          </button>
        </form>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-dark bg-opacity-95 z-50 md:hidden flex flex-col">
          <div className="container py-3 flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold flex items-center">
              <span className="font-bold text-accent">Shop</span>
              <span className="font-bold italic text-secondary-light">Ease</span>
            </Link>
            <button onClick={toggleMobileMenu} className="text-white">
              <FaTimes size={24} />
            </button>
          </div>
          <nav className="flex flex-col overflow-y-auto">
            <div className="p-4 bg-dark/90 text-white mb-2 border-t border-gray-700">
              <div className="flex items-center gap-3 mb-2">
                <FaUser size={18} className="text-accent" />
                <span className="font-medium">Hello, Sign in</span>
              </div>
              <div className="flex gap-4">
                <Link to="/login" className="bg-accent text-white px-4 py-1 rounded-full text-sm">
                  Login
                </Link>
                <Link to="/register" className="bg-white text-dark px-4 py-1 rounded-full text-sm">
                  Register
                </Link>
              </div>
            </div>
            
            <div className="bg-light flex-1">
              <div className="p-4 border-b border-gray-200">
                <Link 
                  to="/" 
                  className="text-lg font-medium text-dark hover:text-accent flex items-center gap-2 transition-colors"
                  onClick={toggleMobileMenu}
                >
                  <FaMapMarkerAlt className="text-accent-dark" /> Home
                </Link>
              </div>
              
              <div className="p-4 border-b border-gray-200">
                <p className="text-sm font-medium mb-3 text-gray-500 uppercase tracking-wider">Shop by category</p>
                <ul className="space-y-3">
                  <li>
                    <Link 
                      to="/products?category=electronics" 
                      className="text-dark hover:text-accent transition-colors"
                      onClick={toggleMobileMenu}
                    >
                      Electronics
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/products?category=men's clothing" 
                      className="text-dark hover:text-accent transition-colors"
                      onClick={toggleMobileMenu}
                    >
                      Men's Fashion
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/products?category=women's clothing" 
                      className="text-dark hover:text-accent transition-colors"
                      onClick={toggleMobileMenu}
                    >
                      Women's Fashion
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/products?category=jewelery" 
                      className="text-dark hover:text-accent transition-colors"
                      onClick={toggleMobileMenu}
                    >
                      Jewelry
                    </Link>
                  </li>
                </ul>
              </div>
              
              <div className="p-4 border-b border-gray-200">
                <Link 
                  to="/cart" 
                  className="text-lg font-medium text-dark hover:text-accent flex items-center gap-2 transition-colors"
                  onClick={toggleMobileMenu}
                >
                  <div className="relative">
                    <FaShoppingCart size={20} className="text-accent-dark" />
                    {cartItemsCount > 0 && (
                      <span className="absolute -top-2 -right-2 bg-secondary rounded-full w-5 h-5 flex items-center justify-center text-xs text-white font-bold">
                        {cartItemsCount}
                      </span>
                    )}
                  </div>
                  <span>Cart</span>
                </Link>
              </div>
              
              <div className="p-4">
                <Link 
                  to="/orders" 
                  className="text-lg font-medium text-dark hover:text-accent flex items-center gap-2 transition-colors"
                  onClick={toggleMobileMenu}
                >
                  <FaBoxOpen className="text-accent-dark" /> My Orders
                </Link>
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar; 