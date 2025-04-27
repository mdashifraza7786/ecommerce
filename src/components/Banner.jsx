import { Link } from 'react-router-dom';

const Banner = () => {
  return (
    <section className="bg-gradient-to-r from-primary to-accent py-16 md:py-24">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 text-white mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Summer Sale is On!
            </h1>
            <p className="text-lg md:text-xl mb-8">
              Get up to 50% off on all products. Limited time offer.
            </p>
            <Link
              to="/products"
              className="bg-white text-primary hover:bg-gray-100 transition-colors font-medium px-6 py-3 rounded-md inline-block"
            >
              Shop Now
            </Link>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <img 
              src="https://images.unsplash.com/photo-1607082349566-187342175e2f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
              alt="Shopping bags" 
              className="max-w-full h-auto rounded-lg shadow-lg max-h-80 object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner; 