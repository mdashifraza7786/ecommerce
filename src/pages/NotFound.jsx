import { Link } from 'react-router-dom';
import { FaArrowLeft, FaHome, FaShoppingBag } from 'react-icons/fa';

const NotFound = () => {
  return (
    <div className="py-16 text-center">
      <div className="container">
        <div className="max-w-lg mx-auto">
          <h1 className="text-9xl font-bold text-primary">404</h1>
          <h2 className="text-3xl font-semibold mb-6 text-dark mt-4">Page Not Found</h2>
          <p className="text-gray-600 mb-8">
            The page you are looking for might have been removed or is temporarily unavailable.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/" 
              className="flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-md transition-colors"
            >
              <FaHome /> Go to Homepage
            </Link>
            <Link
              to="/products"
              className="flex items-center justify-center gap-2 bg-white border border-primary text-primary hover:bg-gray-50 px-6 py-3 rounded-md transition-colors"
            >
              <FaShoppingBag /> Browse Products
            </Link>
          </div>
          
          <div className="mt-12">
            <Link to="/" className="inline-flex items-center text-primary hover:text-primary-dark">
              <FaArrowLeft className="mr-2" /> Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound; 