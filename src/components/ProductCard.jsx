import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaStar, FaShoppingBag, FaRegHeart } from 'react-icons/fa';
import { CartContext } from '../App';

const ProductCard = ({ product }) => {
  const { cart, addToCart } = useContext(CartContext);
  const { id, title, price, image, rating } = product;

  // Check if product is already in cart
  const isInCart = cart.some(item => item.id === id);

  // Format price to 2 decimal places
  const formattedPrice = price.toFixed(2);

  // Handle add to cart
  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <div className="bg-white rounded-md overflow-hidden transition-all duration-300 hover:shadow-lg group relative">
      <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
        <button className="bg-white hover:bg-light p-2 rounded-full shadow-md text-dark hover:text-accent transition-colors">
          <FaRegHeart />
        </button>
      </div>
      
      <Link to={`/products/${id}`} className="block">
        <div className="h-52 overflow-hidden relative flex items-center justify-center p-6 bg-gray-50">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute top-2 left-2 bg-accent text-white px-2 py-1 rounded-full text-xs flex items-center">
            <FaStar className="mr-1" /> {rating.rate}
          </div>
        </div>
        
        <div className="p-4">
          <h3 className="text-dark font-medium text-sm md:text-base mb-2 line-clamp-2 h-12 group-hover:text-accent transition-colors">{title}</h3>
          
          <div className="mt-4 flex justify-between items-center">
            <div>
              <span className="text-dark font-bold text-lg">${formattedPrice}</span>
            </div>
            
            {isInCart ? (
              <Link 
                to="/cart"
                onClick={(e) => e.stopPropagation()}
                className="bg-accent hover:bg-accent-dark text-white p-2.5 rounded-full transition-colors flex items-center justify-center"
                aria-label="Go to cart"
              >
                <FaShoppingBag size={16} />
              </Link>
            ) : (
              <button 
                onClick={handleAddToCart}
                className="bg-dark hover:bg-accent text-white p-2.5 rounded-full transition-colors flex items-center justify-center"
                aria-label="Add to cart"
              >
                <FaShoppingCart size={16} />
              </button>
            )}
          </div>
        </div>
      </Link>
      
      {/* Quick add overlay - visible on hover */}
      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform">
          {isInCart ? (
            <Link 
              to="/cart"
              onClick={(e) => e.stopPropagation()}
              className="bg-accent hover:bg-accent-dark text-white py-2 px-4 rounded-full transition-colors text-sm font-medium pointer-events-auto"
            >
              View in Cart
            </Link>
          ) : (
            <button 
              onClick={handleAddToCart}
              className="bg-accent hover:bg-accent-dark text-white py-2 px-4 rounded-full transition-colors text-sm font-medium pointer-events-auto"
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard; 