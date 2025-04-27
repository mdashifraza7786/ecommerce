import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaTrash, FaShoppingCart } from 'react-icons/fa';
import { CartContext } from '../App';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal, cartItemCount } = useContext(CartContext);

  const handleQuantityChange = (id, quantity) => {
    updateQuantity(id, quantity);
  };

  return (
    <div className="py-12">
      <div className="container">
        <h1 className="text-3xl font-bold mb-8 text-dark">Your Shopping Cart</h1>
        
        {cart.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-lg shadow-md">
            <div className="text-6xl mb-4">🛒</div>
            <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">Looks like you haven't added any products to your cart yet.</p>
            <Link 
              to="/products" 
              className="bg-primary text-white px-6 py-3 rounded-md inline-flex items-center gap-2 hover:bg-primary-dark transition-colors"
            >
              <FaShoppingCart /> Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart Items */}
            <div className="lg:w-2/3">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="hidden md:grid grid-cols-12 gap-4 p-4 border-b bg-gray-50 text-dark font-semibold">
                  <div className="col-span-6">Product</div>
                  <div className="col-span-2 text-center">Price</div>
                  <div className="col-span-2 text-center">Quantity</div>
                  <div className="col-span-2 text-center">Total</div>
                </div>
                
                {cart.map(item => (
                  <div 
                    key={item.id} 
                    className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 border-b items-center"
                  >
                    {/* Product */}
                    <div className="col-span-1 md:col-span-6 flex items-center gap-4">
                      <div className="w-20 h-20 flex-shrink-0">
                        <img 
                          src={item.image} 
                          alt={item.title}
                          className="w-full h-full object-contain" 
                        />
                      </div>
                      <div>
                        <Link 
                          to={`/products/${item.id}`}
                          className="font-medium text-dark hover:text-primary mb-1 block line-clamp-2"
                        >
                          {item.title}
                        </Link>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-sm text-red-500 hover:text-red-700 flex items-center gap-1"
                        >
                          <FaTrash size={12} /> Remove
                        </button>
                      </div>
                    </div>
                    
                    {/* Price */}
                    <div className="col-span-1 md:col-span-2 flex md:justify-center items-center">
                      <span className="md:hidden font-medium mr-2">Price:</span>
                      <span className="text-gray-700">${item.price.toFixed(2)}</span>
                    </div>
                    
                    {/* Quantity */}
                    <div className="col-span-1 md:col-span-2 flex md:justify-center items-center">
                      <span className="md:hidden font-medium mr-2">Quantity:</span>
                      <div className="flex items-center">
                        <button 
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          className="bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded-l"
                        >
                          -
                        </button>
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                          className="w-12 px-2 py-1 border-y text-center"
                        />
                        <button 
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          className="bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded-r"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    
                    {/* Total */}
                    <div className="col-span-1 md:col-span-2 flex md:justify-center items-center">
                      <span className="md:hidden font-medium mr-2">Total:</span>
                      <span className="font-semibold text-primary">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6">
                <Link 
                  to="/products" 
                  className="inline-flex items-center gap-2 text-primary hover:text-primary-dark"
                >
                  <FaArrowLeft /> Continue Shopping
                </Link>
              </div>
            </div>
            
            {/* Cart Summary */}
            <div className="lg:w-1/3">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold mb-6 pb-4 border-b text-dark">Cart Summary</h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Items ({cartItemCount})</span>
                    <span className="font-medium">${cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">Free</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax</span>
                    <span className="font-medium">${(cartTotal * 0.1).toFixed(2)}</span>
                  </div>
                  <div className="pt-3 mt-3 border-t flex justify-between">
                    <span className="font-bold text-dark">Total</span>
                    <span className="font-bold text-primary text-xl">
                      ${(cartTotal + cartTotal * 0.1).toFixed(2)}
                    </span>
                  </div>
                </div>
                
                <Link 
                  to="/checkout" 
                  className="block w-full bg-primary hover:bg-primary-dark text-white text-center py-3 rounded-md transition-colors"
                >
                  Proceed to Checkout
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart; 