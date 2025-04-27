import { useEffect, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaCheck, FaHome, FaShoppingBag, FaPrint } from 'react-icons/fa';
import { CartContext } from '../App';

const CheckoutSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cart, setCart } = useContext(CartContext);
  
  // Get order details from location state
  const orderDetails = location.state;
  
  // If no order details are available, redirect to home
  useEffect(() => {
    if (!orderDetails) {
      navigate('/');
    } else {
      // Clear cart on successful order
      localStorage.removeItem('cart');
      setCart([]);
    }
  }, [orderDetails, navigate, setCart]);
  
  if (!orderDetails) {
    return null; // Will redirect via useEffect
  }
  
  // Format date
  const orderDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  // Handle print
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="py-12">
      <div className="container max-w-3xl mx-auto">
        {/* Success message */}
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaCheck className="text-green-500 text-3xl" />
          </div>
          <h1 className="text-3xl font-bold text-dark mb-2">Order Confirmed!</h1>
          <p className="text-gray-600">
            Thank you for your purchase. Your order has been received and is being processed.
          </p>
        </div>
        
        {/* Order details */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8" id="printable-area">
          <div className="p-6 border-b">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-dark">Order Summary</h2>
              <button 
                onClick={handlePrint}
                className="flex items-center gap-2 text-gray-600 hover:text-primary print:hidden"
              >
                <FaPrint /> Print
              </button>
            </div>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <h3 className="text-sm text-gray-600 mb-1">Order Number</h3>
                <p className="font-semibold">{orderDetails.orderNumber}</p>
              </div>
              <div>
                <h3 className="text-sm text-gray-600 mb-1">Date</h3>
                <p className="font-semibold">{orderDate}</p>
              </div>
              <div>
                <h3 className="text-sm text-gray-600 mb-1">Total</h3>
                <p className="font-semibold text-primary">${orderDetails.orderTotal.toFixed(2)}</p>
              </div>
              <div>
                <h3 className="text-sm text-gray-600 mb-1">Payment Method</h3>
                <p className="font-semibold">Credit Card</p>
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="font-semibold mb-2 text-dark">Shipping Information</h3>
              <div className="bg-gray-50 p-4 rounded-md">
                <p className="mb-1">{orderDetails.shippingInfo.name}</p>
                <p className="mb-1">{orderDetails.shippingInfo.address}</p>
                <p className="mb-1">
                  {orderDetails.shippingInfo.city}, {orderDetails.shippingInfo.state} {orderDetails.shippingInfo.zipCode}
                </p>
                <p>{orderDetails.shippingInfo.country}</p>
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="font-semibold mb-2 text-dark">Order Timeline</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-10 flex-shrink-0">
                    <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                      <FaCheck className="text-white text-xs" />
                    </div>
                  </div>
                  <div>
                    <p className="font-medium">Order Confirmed</p>
                    <p className="text-sm text-gray-600">{orderDate}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-10 flex-shrink-0">
                    <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-600 text-xs">2</span>
                    </div>
                  </div>
                  <div>
                    <p className="font-medium">Processing</p>
                    <p className="text-sm text-gray-600">Your order is being processed</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-10 flex-shrink-0">
                    <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-600 text-xs">3</span>
                    </div>
                  </div>
                  <div>
                    <p className="font-medium">Shipped</p>
                    <p className="text-sm text-gray-600">Estimated: {new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-10 flex-shrink-0">
                    <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-600 text-xs">4</span>
                    </div>
                  </div>
                  <div>
                    <p className="font-medium">Delivered</p>
                    <p className="text-sm text-gray-600">Estimated: {new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="border-t pt-6 mt-6">
              <p className="text-center text-gray-600 mb-4">
                You will receive an email confirmation at <span className="font-medium">your@email.com</span>
              </p>
              <p className="text-center text-gray-600">
                If you have any questions about your order, please contact our customer support.
              </p>
            </div>
          </div>
        </div>
        
        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center print:hidden">
          <Link 
            to="/" 
            className="flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-md transition-colors"
          >
            <FaHome /> Return to Home
          </Link>
          <Link
            to="/products"
            className="flex items-center justify-center gap-2 bg-white border border-primary text-primary hover:bg-gray-50 px-6 py-3 rounded-md transition-colors"
          >
            <FaShoppingBag /> Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSuccess; 