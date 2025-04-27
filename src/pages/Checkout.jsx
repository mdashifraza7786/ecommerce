import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaCheck, FaCreditCard, FaPaypal } from 'react-icons/fa';
import { CartContext } from '../App';

const Checkout = () => {
  const { cart, cartTotal } = useContext(CartContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'USA',
    paymentMethod: 'credit-card'
  });
  const [formErrors, setFormErrors] = useState({});
  const [processing, setProcessing] = useState(false);
  const [step, setStep] = useState(1); // 1: shipping, 2: payment, 3: review

  // Calculate totals
  const tax = cartTotal * 0.1;
  const totalAmount = cartTotal + tax;

  // If cart is empty, redirect to cart page
  if (cart.length === 0) {
    return (
      <div className="py-12">
        <div className="container">
          <div className="text-center py-16 bg-white rounded-lg shadow-md">
            <div className="text-6xl mb-4">🛒</div>
            <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">You need to add items to your cart before checking out.</p>
            <Link 
              to="/products" 
              className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-md transition-colors inline-block"
            >
              Browse Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
    
    // Clear error when field is updated
    if (formErrors[name]) {
      setFormErrors(prevErrors => ({
        ...prevErrors,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const errors = {};
    
    // Required fields for shipping
    if (step === 1) {
      if (!formData.firstName.trim()) errors.firstName = 'First name is required';
      if (!formData.lastName.trim()) errors.lastName = 'Last name is required';
      if (!formData.email.trim()) {
        errors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        errors.email = 'Email is invalid';
      }
      if (!formData.address.trim()) errors.address = 'Address is required';
      if (!formData.city.trim()) errors.city = 'City is required';
      if (!formData.state.trim()) errors.state = 'State is required';
      if (!formData.zipCode.trim()) errors.zipCode = 'Zip code is required';
    }
    
    // Required fields for payment
    if (step === 2) {
      if (formData.paymentMethod === 'credit-card') {
        if (!formData.cardNumber) errors.cardNumber = 'Card number is required';
        if (!formData.cardName) errors.cardName = 'Name on card is required';
        if (!formData.expiryDate) errors.expiryDate = 'Expiry date is required';
        if (!formData.cvv) errors.cvv = 'CVV is required';
      }
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNextStep = () => {
    if (validateForm()) {
      setStep(prevStep => prevStep + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePrevStep = () => {
    setStep(prevStep => prevStep - 1);
    window.scrollTo(0, 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setProcessing(true);
      
      // Simulate processing
      setTimeout(() => {
        setProcessing(false);
        
        // Generate order details
        const orderDetails = {
          orderNumber: Math.floor(Math.random() * 1000000), 
          orderTotal: totalAmount,
          shippingInfo: {
            name: `${formData.firstName} ${formData.lastName}`,
            address: formData.address,
            city: formData.city,
            state: formData.state,
            zipCode: formData.zipCode,
            country: formData.country
          }
        };
        
        // Navigate to success page with order details
        navigate('/checkout/success', { state: orderDetails });
      }, 2000);
    }
  };

  // Progress indicator
  const renderProgressBar = () => {
    return (
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <div className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 1 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-600'}`}>
            {step > 1 ? <FaCheck /> : 1}
          </div>
          <div className={`ml-2 font-medium ${step >= 1 ? 'text-primary' : 'text-gray-500'}`}>Shipping</div>
        </div>
        <div className={`flex-1 h-1 mx-4 ${step >= 2 ? 'bg-primary' : 'bg-gray-200'}`}></div>
        <div className="flex items-center">
          <div className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 2 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-600'}`}>
            {step > 2 ? <FaCheck /> : 2}
          </div>
          <div className={`ml-2 font-medium ${step >= 2 ? 'text-primary' : 'text-gray-500'}`}>Payment</div>
        </div>
        <div className={`flex-1 h-1 mx-4 ${step >= 3 ? 'bg-primary' : 'bg-gray-200'}`}></div>
        <div className="flex items-center">
          <div className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 3 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-600'}`}>
            3
          </div>
          <div className={`ml-2 font-medium ${step >= 3 ? 'text-primary' : 'text-gray-500'}`}>Review</div>
        </div>
      </div>
    );
  };

  // Render shipping form (step 1)
  const renderShippingForm = () => {
    return (
      <div>
        <h2 className="text-2xl font-bold mb-6 text-dark">Shipping Information</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
              First Name *
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                formErrors.firstName ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {formErrors.firstName && (
              <p className="text-red-500 text-sm mt-1">{formErrors.firstName}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
              Last Name *
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                formErrors.lastName ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {formErrors.lastName && (
              <p className="text-red-500 text-sm mt-1">{formErrors.lastName}</p>
            )}
          </div>
          
          <div className="md:col-span-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                formErrors.email ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {formErrors.email && (
              <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
            )}
          </div>
          
          <div className="md:col-span-2">
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
              Address *
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                formErrors.address ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {formErrors.address && (
              <p className="text-red-500 text-sm mt-1">{formErrors.address}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
              City *
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                formErrors.city ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {formErrors.city && (
              <p className="text-red-500 text-sm mt-1">{formErrors.city}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
              State *
            </label>
            <input
              type="text"
              id="state"
              name="state"
              value={formData.state}
              onChange={handleChange}
              className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                formErrors.state ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {formErrors.state && (
              <p className="text-red-500 text-sm mt-1">{formErrors.state}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
              Zip Code *
            </label>
            <input
              type="text"
              id="zipCode"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleChange}
              className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                formErrors.zipCode ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {formErrors.zipCode && (
              <p className="text-red-500 text-sm mt-1">{formErrors.zipCode}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
              Country *
            </label>
            <select
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="USA">United States</option>
              <option value="CAN">Canada</option>
              <option value="UK">United Kingdom</option>
              <option value="AUS">Australia</option>
            </select>
          </div>
        </div>
        
        <div className="flex justify-between mt-8">
          <Link to="/cart" className="flex items-center text-primary hover:text-primary-dark">
            <FaArrowLeft className="mr-2" /> Back to Cart
          </Link>
          <button
            type="button"
            onClick={handleNextStep}
            className="bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded-md transition-colors"
          >
            Continue to Payment
          </button>
        </div>
      </div>
    );
  };

  // Render payment form (step 2)
  const renderPaymentForm = () => {
    return (
      <div>
        <h2 className="text-2xl font-bold mb-6 text-dark">Payment Method</h2>
        
        <div className="mb-6">
          <div className="flex items-center mb-4">
            <input
              type="radio"
              id="credit-card"
              name="paymentMethod"
              value="credit-card"
              checked={formData.paymentMethod === 'credit-card'}
              onChange={handleChange}
              className="mr-2"
            />
            <label htmlFor="credit-card" className="flex items-center cursor-pointer">
              <FaCreditCard className="text-primary mr-2" /> Credit Card
            </label>
          </div>
          
          <div className="flex items-center mb-4">
            <input
              type="radio"
              id="paypal"
              name="paymentMethod"
              value="paypal"
              checked={formData.paymentMethod === 'paypal'}
              onChange={handleChange}
              className="mr-2"
            />
            <label htmlFor="paypal" className="flex items-center cursor-pointer">
              <FaPaypal className="text-primary mr-2" /> PayPal
            </label>
          </div>
        </div>
        
        {formData.paymentMethod === 'credit-card' && (
          <div className="bg-gray-50 p-6 rounded-md mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                  Card Number *
                </label>
                <input
                  type="text"
                  id="cardNumber"
                  name="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  value={formData.cardNumber || ''}
                  onChange={handleChange}
                  className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                    formErrors.cardNumber ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {formErrors.cardNumber && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.cardNumber}</p>
                )}
              </div>
              
              <div className="md:col-span-2">
                <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-1">
                  Name on Card *
                </label>
                <input
                  type="text"
                  id="cardName"
                  name="cardName"
                  value={formData.cardName || ''}
                  onChange={handleChange}
                  className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                    formErrors.cardName ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {formErrors.cardName && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.cardName}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">
                  Expiry Date *
                </label>
                <input
                  type="text"
                  id="expiryDate"
                  name="expiryDate"
                  placeholder="MM/YY"
                  value={formData.expiryDate || ''}
                  onChange={handleChange}
                  className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                    formErrors.expiryDate ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {formErrors.expiryDate && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.expiryDate}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
                  CVV *
                </label>
                <input
                  type="text"
                  id="cvv"
                  name="cvv"
                  placeholder="123"
                  value={formData.cvv || ''}
                  onChange={handleChange}
                  className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                    formErrors.cvv ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {formErrors.cvv && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.cvv}</p>
                )}
              </div>
            </div>
          </div>
        )}
        
        {formData.paymentMethod === 'paypal' && (
          <div className="bg-gray-50 p-6 rounded-md mb-6 text-center">
            <p className="mb-4">You will be redirected to PayPal to complete your payment.</p>
            <div className="flex justify-center">
              <FaPaypal className="text-blue-600 text-4xl" />
            </div>
          </div>
        )}
        
        <div className="flex justify-between mt-8">
          <button
            type="button"
            onClick={handlePrevStep}
            className="text-primary hover:text-primary-dark flex items-center"
          >
            <FaArrowLeft className="mr-2" /> Back to Shipping
          </button>
          <button
            type="button"
            onClick={handleNextStep}
            className="bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded-md transition-colors"
          >
            Continue to Review
          </button>
        </div>
      </div>
    );
  };

  // Render order review (step 3)
  const renderOrderReview = () => {
    return (
      <div>
        <h2 className="text-2xl font-bold mb-6 text-dark">Review Your Order</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Shipping Information */}
          <div className="bg-gray-50 p-4 rounded-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-dark">Shipping Information</h3>
              <button 
                type="button" 
                onClick={() => setStep(1)}
                className="text-primary text-sm hover:text-primary-dark"
              >
                Edit
              </button>
            </div>
            <p className="mb-1">{formData.firstName} {formData.lastName}</p>
            <p className="mb-1">{formData.address}</p>
            <p className="mb-1">{formData.city}, {formData.state} {formData.zipCode}</p>
            <p className="mb-1">{formData.country}</p>
            <p className="mb-1">{formData.email}</p>
          </div>
          
          {/* Payment Information */}
          <div className="bg-gray-50 p-4 rounded-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-dark">Payment Information</h3>
              <button 
                type="button" 
                onClick={() => setStep(2)}
                className="text-primary text-sm hover:text-primary-dark"
              >
                Edit
              </button>
            </div>
            {formData.paymentMethod === 'credit-card' ? (
              <>
                <p className="mb-1">Credit Card</p>
                <p className="mb-1">**** **** **** {formData.cardNumber ? formData.cardNumber.slice(-4) : '****'}</p>
                <p className="mb-1">{formData.cardName || 'Card Holder'}</p>
                <p className="mb-1">Expires: {formData.expiryDate || 'MM/YY'}</p>
              </>
            ) : (
              <p className="mb-1">PayPal</p>
            )}
          </div>
        </div>
        
        {/* Order Items */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
          <h3 className="font-semibold text-dark p-4 bg-gray-50 border-b">Order Items</h3>
          
          <div className="divide-y">
            {cart.map(item => (
              <div key={item.id} className="flex items-center p-4">
                <div className="w-16 h-16 flex-shrink-0 mr-4">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-contain" 
                  />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium line-clamp-1">{item.title}</h4>
                  <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                </div>
                <div className="font-semibold text-primary">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-between mt-8">
          <button
            type="button"
            onClick={handlePrevStep}
            className="text-primary hover:text-primary-dark flex items-center"
          >
            <FaArrowLeft className="mr-2" /> Back to Payment
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            disabled={processing}
            className={`bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded-md transition-colors flex items-center ${
              processing ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {processing ? (
              <>
                <span className="mr-2">Processing...</span>
                <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
              </>
            ) : (
              'Place Order'
            )}
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="py-12">
      <div className="container">
        <h1 className="text-3xl font-bold mb-4 text-dark">Checkout</h1>
        
        {/* Progress Bar */}
        {renderProgressBar()}
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Checkout Form */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-lg shadow-md p-6">
              <form onSubmit={handleSubmit}>
                {step === 1 && renderShippingForm()}
                {step === 2 && renderPaymentForm()}
                {step === 3 && renderOrderReview()}
              </form>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-6 pb-4 border-b text-dark">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                {cart.map(item => (
                  <div key={item.id} className="flex items-start">
                    <div className="w-10 h-10 flex-shrink-0 mr-3">
                      <img 
                        src={item.image} 
                        alt={item.title}
                        className="w-full h-full object-contain" 
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm line-clamp-1">{item.title}</p>
                      <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-sm font-medium">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="space-y-3 mb-6 pt-4 border-t">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">Free</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">${tax.toFixed(2)}</span>
                </div>
                <div className="pt-3 mt-3 border-t flex justify-between">
                  <span className="font-bold text-dark">Total</span>
                  <span className="font-bold text-primary text-xl">
                    ${totalAmount.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout; 