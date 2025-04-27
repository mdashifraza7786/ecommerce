import { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaStar, FaShoppingCart, FaArrowLeft, FaShoppingBag } from 'react-icons/fa';
import { getProductById, getProducts } from '../api/products';
import { CartContext } from '../App';
import ProductCard from '../components/ProductCard';

const ProductDetail = () => {
  const { id } = useParams();
  const { cart, addToCart } = useContext(CartContext);
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if product is in cart
  const isInCart = product ? cart.some(item => item.id === product.id) : false;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const productData = await getProductById(parseInt(id));
        if (!productData) {
          setError('Product not found');
          setLoading(false);
          return;
        }
        
        setProduct(productData);
        
        // Fetch related products in the same category
        const allProducts = await getProducts();
        const related = allProducts
          .filter(p => p.category === productData.category && p.id !== productData.id)
          .slice(0, 4);
        
        setRelatedProducts(related);
        setLoading(false);
      } catch (err) {
        setError('Failed to load product. Please try again later.');
        setLoading(false);
        console.error(err);
      }
    };
    
    fetchProduct();
    // Scroll to top when component mounts or ID changes
    window.scrollTo(0, 0);
  }, [id]);

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0) {
      setQuantity(value);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
    }
  };

  if (loading) {
    return (
      <div className="container py-12">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container py-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-500 mb-4">{error || 'Product not found'}</h2>
          <Link to="/products" className="text-primary hover:text-primary-dark flex items-center justify-center gap-2">
            <FaArrowLeft /> Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center text-sm">
            <li>
              <Link to="/" className="text-gray-500 hover:text-primary">Home</Link>
            </li>
            <li className="mx-2 text-gray-500">/</li>
            <li>
              <Link to="/products" className="text-gray-500 hover:text-primary">Products</Link>
            </li>
            <li className="mx-2 text-gray-500">/</li>
            <li>
              <Link to={`/products?category=${product.category}`} className="text-gray-500 hover:text-primary capitalize">
                {product.category}
              </Link>
            </li>
            <li className="mx-2 text-gray-500">/</li>
            <li className="text-dark font-medium truncate max-w-[200px]">{product.title}</li>
          </ol>
        </nav>
        
        {/* Product Main Info */}
        <div className="flex flex-col md:flex-row gap-10 mb-16">
          {/* Product Image */}
          <div className="md:w-1/2">
            <div className="bg-white rounded-lg shadow-md p-8 flex items-center justify-center h-[400px] border">
              <img src={product.image} alt={product.title} className="max-h-full max-w-full object-contain" />
            </div>
          </div>
          
          {/* Product Details */}
          <div className="md:w-1/2">
            <h1 className="text-3xl font-bold text-dark mb-4">{product.title}</h1>
            
            {/* Rating */}
            <div className="flex items-center mb-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <FaStar 
                    key={i} 
                    className={i < Math.round(product.rating.rate) ? 'text-yellow-400' : 'text-gray-300'} 
                  />
                ))}
                <span className="ml-2 text-sm text-gray-600">
                  ({product.rating.rate}/5) - {product.rating.count} reviews
                </span>
              </div>
            </div>
            
            {/* Price */}
            <div className="mb-6">
              <span className="text-3xl font-bold text-primary">${product.price.toFixed(2)}</span>
            </div>
            
            {/* Description */}
            <div className="mb-8">
              <h3 className="font-semibold mb-2">Description:</h3>
              <p className="text-gray-600">{product.description}</p>
            </div>
            
            {/* Add to Cart */}
            <div className="mb-8">
              <div className="flex items-center gap-4">
                <div className="w-24">
                  <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
                    Quantity
                  </label>
                  <input
                    type="number"
                    id="quantity"
                    min="1"
                    value={quantity}
                    onChange={handleQuantityChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                {isInCart ? (
                  <Link
                    to="/cart"
                    className="flex-1 bg-secondary hover:bg-secondary-dark text-white py-3 px-6 rounded-md flex items-center justify-center gap-2 transition-colors"
                  >
                    <FaShoppingBag /> Go to Cart
                  </Link>
                ) : (
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 bg-primary hover:bg-primary-dark text-white py-3 px-6 rounded-md flex items-center justify-center gap-2 transition-colors"
                  >
                    <FaShoppingCart /> Add to Cart
                  </button>
                )}
              </div>
            </div>
            
            {/* Additional Info */}
            <div className="border-t pt-6">
              <p className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                <span className="font-medium">Category:</span>
                <Link to={`/products?category=${product.category}`} className="text-primary hover:underline capitalize">
                  {product.category}
                </Link>
              </p>
              <p className="flex items-center gap-2 text-sm text-gray-600">
                <span className="font-medium">Product ID:</span>
                {product.id}
              </p>
            </div>
          </div>
        </div>
        
        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-dark mb-6">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail; 