import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Banner from '../components/Banner';
import ProductCard from '../components/ProductCard';
import { getProducts, getCategories } from '../api/products';
import { FaArrowRight } from 'react-icons/fa';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Get 8 products for the featured section
        const products = await getProducts(8);
        setFeaturedProducts(products);
        
        // Get all categories
        const categoriesData = await getCategories();
        setCategories(categoriesData);
        
        setLoading(false);
      } catch (err) {
        setError('Failed to load data. Please try again later.');
        setLoading(false);
        console.error(err);
      }
    };
    
    fetchData();
  }, []);

  // These would normally come from a CMS or backend
  const categoryImages = {
    "electronics": "https://images.unsplash.com/photo-1550009158-9ebf69173e03?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2301&q=80",
    "jewelery": "https://images.unsplash.com/photo-1535632066274-1f274a2856c7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    "men's clothing": "https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    "women's clothing": "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
  };

  return (
    <div>
      {/* Hero Banner */}
      <Banner />
      
      {/* Featured Products */}
      <section className="py-12 bg-gray-50">
        <div className="container">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-dark">Featured Products</h2>
            <Link to="/products" className="text-primary hover:text-primary-dark flex items-center gap-2">
              View All <FaArrowRight />
            </Link>
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : error ? (
            <div className="text-center text-red-500 py-8">{error}</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {featuredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>
      
      {/* Shop by Category */}
      <section className="py-12">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-bold text-dark mb-8 text-center">Shop by Category</h2>
          
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : error ? (
            <div className="text-center text-red-500 py-8">{error}</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.map(category => (
                <Link 
                  key={category} 
                  to={`/products?category=${category}`}
                  className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={categoryImages[category] || "https://via.placeholder.com/400x300"} 
                      alt={category} 
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark/70 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-xl font-semibold text-white capitalize mb-2">
                        {category}
                      </h3>
                      <span className="text-white inline-flex items-center text-sm">
                        Shop Now <FaArrowRight className="ml-2" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
      
      {/* Info Banners */}
      <section className="py-12 bg-gray-50">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-4xl text-primary mb-4">🚚</div>
              <h3 className="font-bold text-lg mb-2">Free Shipping</h3>
              <p className="text-gray-500">On orders over $50</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-4xl text-primary mb-4">↩️</div>
              <h3 className="font-bold text-lg mb-2">Easy Returns</h3>
              <p className="text-gray-500">30 day money back guarantee</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-4xl text-primary mb-4">🔒</div>
              <h3 className="font-bold text-lg mb-2">Secure Payment</h3>
              <p className="text-gray-500">100% secure checkout</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 