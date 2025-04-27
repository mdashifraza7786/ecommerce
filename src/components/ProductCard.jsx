import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaStar, FaShoppingBag } from 'react-icons/fa';
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
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:shadow-lg hover:-translate-y-1">
      <Link to={`/products/${id}`} className="block">
        <div className="h-48 overflow-hidden relative">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-contain p-4"
          />
          <div className="absolute top-2 right-2 bg-primary text-white px-2 py-1 rounded text-xs">
            {rating.rate} <FaStar className="inline ml-1" />
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-dark font-medium text-lg mb-2 line-clamp-2 h-14">{title}</h3>
          <div className="flex justify-between items-center mt-4">
            <span className="text-primary font-bold">${formattedPrice}</span>
            {isInCart ? (
              <Link 
                to="/cart"
                onClick={(e) => e.stopPropagation()}
                className="bg-secondary hover:bg-secondary-dark text-white p-2 rounded transition-colors"
                aria-label="Go to cart"
              >
                <FaShoppingBag />
              </Link>
            ) : (
              <button 
                onClick={handleAddToCart}
                className="bg-primary hover:bg-primary-dark text-white p-2 rounded transition-colors"
                aria-label="Add to cart"
              >
                <FaShoppingCart />
              </button>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard; 