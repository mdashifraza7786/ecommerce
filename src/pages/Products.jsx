import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getProducts, getProductsByCategory, getCategories } from '../api/products';
import ProductCard from '../components/ProductCard';
import { FaFilter, FaSort, FaTimes } from 'react-icons/fa';

const Products = () => {
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortOption, setSortOption] = useState('default');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  // Parse query params
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const categoryParam = queryParams.get('category');
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [location.search]);

  // Fetch products and categories
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        let fetchedProducts;
        if (selectedCategory) {
          fetchedProducts = await getProductsByCategory(selectedCategory);
        } else {
          fetchedProducts = await getProducts();
        }
        
        setProducts(fetchedProducts);
        setFilteredProducts(fetchedProducts);
        
        const categoriesData = await getCategories();
        setCategories(categoriesData);
        
        setLoading(false);
      } catch (err) {
        setError('Failed to load products. Please try again later.');
        setLoading(false);
        console.error(err);
      }
    };
    
    fetchData();
  }, [selectedCategory]);

  // Apply filters and sorting
  useEffect(() => {
    let result = [...products];
    
    // Filter by price range
    result = result.filter(product => 
      product.price >= priceRange.min && product.price <= priceRange.max
    );
    
    // Apply sorting
    switch (sortOption) {
      case 'price-low-high':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high-low':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'name-a-z':
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'name-z-a':
        result.sort((a, b) => b.title.localeCompare(a.title));
        break;
      default:
        // Default sorting (by id)
        result.sort((a, b) => a.id - b.id);
    }
    
    setFilteredProducts(result);
  }, [products, sortOption, priceRange]);

  // Handle category change
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setIsFilterOpen(false);
  };

  // Handle price range change
  const handlePriceChange = (e, type) => {
    const value = parseFloat(e.target.value);
    setPriceRange(prev => ({
      ...prev,
      [type]: value
    }));
  };

  // Reset all filters
  const resetFilters = () => {
    setSelectedCategory('');
    setSortOption('default');
    setPriceRange({ min: 0, max: 1000 });
  };

  // Toggle filter sidebar for mobile
  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  return (
    <div className="py-8">
      <div className="container">
        <h1 className="text-3xl font-bold mb-8 text-dark">
          {selectedCategory ? `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}` : 'All Products'}
        </h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filter button for mobile */}
          <div className="lg:hidden flex justify-between mb-4">
            <button 
              onClick={toggleFilter}
              className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded"
            >
              <FaFilter /> Filters
            </button>
            
            <select 
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="border border-gray-300 rounded px-4 py-2 bg-white text-dark"
            >
              <option value="default">Default Sorting</option>
              <option value="price-low-high">Price: Low to High</option>
              <option value="price-high-low">Price: High to Low</option>
              <option value="name-a-z">Name: A to Z</option>
              <option value="name-z-a">Name: Z to A</option>
            </select>
          </div>
          
          {/* Filter sidebar - Mobile */}
          <div className={`fixed inset-0 bg-white z-50 lg:hidden transform transition-transform duration-300 ${isFilterOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-xl font-bold">Filters</h2>
              <button onClick={toggleFilter} className="text-dark">
                <FaTimes size={24} />
              </button>
            </div>
            
            <div className="p-4 overflow-y-auto h-[calc(100vh-70px)]">
              <div className="mb-6">
                <h3 className="font-semibold mb-3">Categories</h3>
                <ul className="space-y-2">
                  <li>
                    <button 
                      onClick={() => handleCategoryChange('')}
                      className={`text-left w-full ${selectedCategory === '' ? 'text-primary font-medium' : 'text-dark'}`}
                    >
                      All Products
                    </button>
                  </li>
                  {categories.map(category => (
                    <li key={category}>
                      <button 
                        onClick={() => handleCategoryChange(category)}
                        className={`text-left w-full capitalize ${selectedCategory === category ? 'text-primary font-medium' : 'text-dark'}`}
                      >
                        {category}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="mb-6">
                <h3 className="font-semibold mb-3">Price Range</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Min Price: ${priceRange.min}</label>
                    <input 
                      type="range" 
                      min="0" 
                      max="1000" 
                      step="10" 
                      value={priceRange.min}
                      onChange={(e) => handlePriceChange(e, 'min')}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Max Price: ${priceRange.max}</label>
                    <input 
                      type="range" 
                      min="0" 
                      max="1000" 
                      step="10" 
                      value={priceRange.max}
                      onChange={(e) => handlePriceChange(e, 'max')}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
              
              <button 
                onClick={resetFilters}
                className="w-full bg-gray-200 hover:bg-gray-300 py-2 px-4 rounded transition-colors"
              >
                Reset Filters
              </button>
            </div>
          </div>
          
          {/* Filters - Desktop */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <div className="mb-6">
                <h3 className="font-semibold mb-3">Categories</h3>
                <ul className="space-y-2">
                  <li>
                    <button 
                      onClick={() => handleCategoryChange('')}
                      className={`text-left w-full ${selectedCategory === '' ? 'text-primary font-medium' : 'text-dark'}`}
                    >
                      All Products
                    </button>
                  </li>
                  {categories.map(category => (
                    <li key={category}>
                      <button 
                        onClick={() => handleCategoryChange(category)}
                        className={`text-left w-full capitalize ${selectedCategory === category ? 'text-primary font-medium' : 'text-dark'}`}
                      >
                        {category}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="mb-6">
                <h3 className="font-semibold mb-3">Price Range</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Min Price: ${priceRange.min}</label>
                    <input 
                      type="range" 
                      min="0" 
                      max="1000" 
                      step="10" 
                      value={priceRange.min}
                      onChange={(e) => handlePriceChange(e, 'min')}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Max Price: ${priceRange.max}</label>
                    <input 
                      type="range" 
                      min="0" 
                      max="1000" 
                      step="10" 
                      value={priceRange.max}
                      onChange={(e) => handlePriceChange(e, 'max')}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
              
              <button 
                onClick={resetFilters}
                className="w-full bg-gray-200 hover:bg-gray-300 py-2 px-4 rounded transition-colors"
              >
                Reset Filters
              </button>
            </div>
          </div>
          
          {/* Product Grid */}
          <div className="flex-1">
            {/* Sorting - Desktop */}
            <div className="hidden lg:flex justify-between items-center mb-6">
              <p className="text-gray-600">
                Showing {filteredProducts.length} products
              </p>
              <div className="flex items-center gap-2">
                <FaSort className="text-gray-400" />
                <select 
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="border border-gray-300 rounded px-4 py-2 bg-white text-dark"
                >
                  <option value="default">Default Sorting</option>
                  <option value="price-low-high">Price: Low to High</option>
                  <option value="price-high-low">Price: High to Low</option>
                  <option value="name-a-z">Name: A to Z</option>
                  <option value="name-z-a">Name: Z to A</option>
                </select>
              </div>
            </div>
            
            {/* Products */}
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
              </div>
            ) : error ? (
              <div className="text-center text-red-500 py-8">{error}</div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-lg text-gray-600">No products found matching your criteria.</p>
                <button 
                  onClick={resetFilters}
                  className="mt-4 bg-primary text-white px-6 py-2 rounded hover:bg-primary-dark transition-colors"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products; 