import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaMapMarkerAlt, FaPhone, FaEnvelope, FaCreditCard, FaShippingFast, FaUndo, FaHeadset } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark text-white">
      {/* Services bar */}
      <div className="bg-light py-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center space-x-3">
              <FaShippingFast className="text-accent text-2xl" />
              <div>
                <h4 className="font-semibold text-dark">Free Shipping</h4>
                <p className="text-sm text-gray-600">On orders over $50</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <FaUndo className="text-accent text-2xl" />
              <div>
                <h4 className="font-semibold text-dark">Easy Returns</h4>
                <p className="text-sm text-gray-600">30 days return policy</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <FaCreditCard className="text-accent text-2xl" />
              <div>
                <h4 className="font-semibold text-dark">Secure Payment</h4>
                <p className="text-sm text-gray-600">100% secure checkout</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <FaHeadset className="text-accent text-2xl" />
              <div>
                <h4 className="font-semibold text-dark">24/7 Support</h4>
                <p className="text-sm text-gray-600">Dedicated support</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main footer */}
      <div className="pt-12 pb-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand and description */}
            <div className="col-span-1">
              <Link to="/" className="text-2xl font-bold flex items-center">
                <span className="font-bold text-accent">Shop</span>
                <span className="font-bold italic text-secondary-light">Ease</span>
              </Link>
              <p className="mt-4 text-gray-400 leading-relaxed">
                Your one-stop shop for all your shopping needs. We provide quality products at the best prices with exceptional service.
              </p>
              <div className="mt-6">
                <div className="flex items-start space-x-3 mb-2">
                  <FaMapMarkerAlt className="text-accent mt-1" />
                  <span className="text-gray-300">123 Shopping Street, Retail City, 10001</span>
                </div>
                <div className="flex items-center space-x-3 mb-2">
                  <FaPhone className="text-accent" />
                  <span className="text-gray-300">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FaEnvelope className="text-accent" />
                  <span className="text-gray-300">support@shopease.com</span>
                </div>
              </div>
            </div>

            {/* Quick links */}
            <div className="col-span-1">
              <h3 className="text-lg font-semibold mb-5 pb-2 border-b border-gray-700 inline-block">Quick Links</h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/" className="text-gray-300 hover:text-accent transition-colors flex items-center">
                    <span className="h-1 w-2 bg-accent mr-2"></span>
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/products" className="text-gray-300 hover:text-accent transition-colors flex items-center">
                    <span className="h-1 w-2 bg-accent mr-2"></span>
                    Products
                  </Link>
                </li>
                <li>
                  <Link to="/cart" className="text-gray-300 hover:text-accent transition-colors flex items-center">
                    <span className="h-1 w-2 bg-accent mr-2"></span>
                    Cart
                  </Link>
                </li>
                <li>
                  <Link to="/checkout" className="text-gray-300 hover:text-accent transition-colors flex items-center">
                    <span className="h-1 w-2 bg-accent mr-2"></span>
                    Checkout
                  </Link>
                </li>
              </ul>
            </div>

            {/* Categories */}
            <div className="col-span-1">
              <h3 className="text-lg font-semibold mb-5 pb-2 border-b border-gray-700 inline-block">Categories</h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/products?category=electronics" className="text-gray-300 hover:text-accent transition-colors flex items-center">
                    <span className="h-1 w-2 bg-accent mr-2"></span>
                    Electronics
                  </Link>
                </li>
                <li>
                  <Link to="/products?category=men's clothing" className="text-gray-300 hover:text-accent transition-colors flex items-center">
                    <span className="h-1 w-2 bg-accent mr-2"></span>
                    Men's Fashion
                  </Link>
                </li>
                <li>
                  <Link to="/products?category=women's clothing" className="text-gray-300 hover:text-accent transition-colors flex items-center">
                    <span className="h-1 w-2 bg-accent mr-2"></span>
                    Women's Fashion
                  </Link>
                </li>
                <li>
                  <Link to="/products?category=jewelery" className="text-gray-300 hover:text-accent transition-colors flex items-center">
                    <span className="h-1 w-2 bg-accent mr-2"></span>
                    Jewelry
                  </Link>
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div className="col-span-1">
              <h3 className="text-lg font-semibold mb-5 pb-2 border-b border-gray-700 inline-block">Stay Updated</h3>
              <p className="text-gray-400 mb-4">Subscribe to receive updates on our latest offers.</p>
              <form className="mt-4">
                <div className="flex flex-col space-y-2">
                  <input 
                    type="email" 
                    placeholder="Enter your email" 
                    className="px-4 py-2 rounded-full bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                  />
                  <button 
                    type="submit" 
                    className="bg-accent hover:bg-accent-dark px-4 py-2 rounded-full transition-colors text-white font-medium"
                  >
                    Subscribe
                  </button>
                </div>
              </form>
              <div className="mt-6">
                <h4 className="text-md font-medium mb-3">Follow Us</h4>
                <div className="flex space-x-4">
                  <a href="#" className="bg-gray-800 p-2 rounded-full text-gray-300 hover:text-accent hover:bg-gray-700 transition-colors">
                    <FaFacebook size={18} />
                  </a>
                  <a href="#" className="bg-gray-800 p-2 rounded-full text-gray-300 hover:text-accent hover:bg-gray-700 transition-colors">
                    <FaTwitter size={18} />
                  </a>
                  <a href="#" className="bg-gray-800 p-2 rounded-full text-gray-300 hover:text-accent hover:bg-gray-700 transition-colors">
                    <FaInstagram size={18} />
                  </a>
                  <a href="#" className="bg-gray-800 p-2 rounded-full text-gray-300 hover:text-accent hover:bg-gray-700 transition-colors">
                    <FaYoutube size={18} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom copyright */}
      <div className="py-4 border-t border-gray-800 bg-dark">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">© {currentYear} ShopEase. All rights reserved.</p>
            <div className="mt-4 md:mt-0">
              <img src="https://dummyimage.com/250x30/cccccc/666666&text=Payment+Methods" alt="Payment methods accepted" className="h-6" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 