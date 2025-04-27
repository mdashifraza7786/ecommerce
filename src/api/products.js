import axios from 'axios';

// Base URL for the Fake Store API
const API_URL = 'https://fakestoreapi.com';

// Get all products
export const getProducts = async (limit = null) => {
  try {
    const endpoint = limit ? `/products?limit=${limit}` : '/products';
    const response = await axios.get(`${API_URL}${endpoint}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

// Get a single product by ID
export const getProductById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/products/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching product with ID ${id}:`, error);
    return null;
  }
};

// Get products by category
export const getProductsByCategory = async (category) => {
  try {
    const response = await axios.get(`${API_URL}/products/category/${category}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching products in category ${category}:`, error);
    return [];
  }
};

// Get all product categories
export const getCategories = async () => {
  try {
    const response = await axios.get(`${API_URL}/products/categories`);
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
};

// Search products (client-side implementation since the API doesn't support search)
export const searchProducts = async (query) => {
  try {
    const response = await axios.get(`${API_URL}/products`);
    const products = response.data;
    
    // Filter products based on the search query
    const lowercaseQuery = query.toLowerCase();
    return products.filter(product => 
      product.title.toLowerCase().includes(lowercaseQuery) || 
      product.description.toLowerCase().includes(lowercaseQuery) ||
      product.category.toLowerCase().includes(lowercaseQuery)
    );
  } catch (error) {
    console.error('Error searching products:', error);
    return [];
  }
}; 