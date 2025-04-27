import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaSearch, FaBars, FaTimes } from 'react-icons/fa';
import { CartContext } from '../App';

const Navbar = () => {
  const { cart } = useContext(CartContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Count unique items in cart instead of total quantity
  const cartItemsCount = cart.length;

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle search
    console.log('Searching for:', searchQuery);
    setSearchQuery('');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-dark text-white sticky top-0 z-50 shadow-md">
      <div className="container py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-primary">
          ShopEase
        </Link>

        {/* Mobile menu button */}
        <button 
          className="md:hidden text-white"
          onClick={toggleMobileMenu}
        >
          {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>

        {/* Navigation - Desktop */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <Link to="/products" className="hover:text-primary transition-colors">
            Products
          </Link>
          <form onSubmit={handleSubmit} className="relative">
            <input
              type="text"
              placeholder="Search products..."
              className="py-1 px-3 pr-9 rounded text-dark focus:outline-none focus:ring-2 focus:ring-primary"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button 
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-dark"
            >
              <FaSearch />
            </button>
          </form>
          <Link to="/cart" className="relative">
            <FaShoppingCart size={22} className="hover:text-primary transition-colors" />
            {cartItemsCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {cartItemsCount}
              </span>
            )}
          </Link>
        </nav>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 bg-dark bg-opacity-95 z-50 md:hidden flex flex-col">
            <div className="container py-3 flex justify-between items-center">
              <Link to="/" className="text-2xl font-bold text-primary">
                ShopEase
              </Link>
              <button onClick={toggleMobileMenu}>
                <FaTimes size={24} />
              </button>
            </div>
            <nav className="flex flex-col items-center space-y-6 mt-16">
              <Link 
                to="/" 
                className="text-xl hover:text-primary transition-colors"
                onClick={toggleMobileMenu}
              >
                Home
              </Link>
              <Link 
                to="/products" 
                className="text-xl hover:text-primary transition-colors"
                onClick={toggleMobileMenu}
              >
                Products
              </Link>
              <form onSubmit={handleSubmit} className="relative w-full max-w-xs">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full py-2 px-4 pr-10 rounded text-dark focus:outline-none focus:ring-2 focus:ring-primary"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button 
                  type="submit"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-dark"
                >
                  <FaSearch />
                </button>
              </form>
              <Link 
                to="/cart" 
                className="flex items-center space-x-2 text-xl hover:text-primary transition-colors"
                onClick={toggleMobileMenu}
              >
                <div className="relative">
                  <FaShoppingCart size={22} />
                  {cartItemsCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-primary rounded-full w-5 h-5 flex items-center justify-center text-xs">
                      {cartItemsCount}
                    </span>
                  )}
                </div>
                <span>Cart</span>
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar; 