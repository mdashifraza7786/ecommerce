import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight, FaArrowRight } from 'react-icons/fa';

const bannerData = [
  {
    id: 1,
    title: "Summer Sale is On!",
    description: "Get up to 50% off on all products. Limited time offer.",
    buttonText: "Shop Now",
    link: "/products?category=electronics",
    image: "https://images.unsplash.com/photo-1607082349566-187342175e2f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    bgColor: "from-pink-500 to-rose-400",
    tagline: "LIMITED TIME"
  },
  {
    id: 2,
    title: "New Electronics Collection",
    description: "Discover the latest gadgets and tech accessories for your lifestyle.",
    buttonText: "Explore Electronics",
    link: "/products?category=electronics",
    image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2532&q=80",
    bgColor: "from-violet-600 to-fuchsia-400",
    tagline: "NEW ARRIVALS"
  },
  {
    id: 3,
    title: "Fashion Forward",
    description: "Upgrade your wardrobe with the latest fashion trends and styles.",
    buttonText: "Shop Fashion",
    link: "/products?category=men's clothing",
    image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    bgColor: "from-fuchsia-500 to-pink-500",
    tagline: "TRENDY STYLES"
  }
];

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Auto slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === bannerData.length - 1 ? 0 : prev + 1));
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === bannerData.length - 1 ? 0 : prev + 1));
  };
  
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? bannerData.length - 1 : prev - 1));
  };
  
  const goToSlide = (index) => {
    setCurrentSlide(index);
  };
  
  const currentBanner = bannerData[currentSlide];

  return (
    <section className={`relative bg-gradient-to-r ${currentBanner.bgColor} py-16 md:py-20 overflow-hidden transition-colors duration-700`}>
      {/* Abstract background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-white opacity-10 rounded-full"></div>
        <div className="absolute top-1/4 right-1/3 w-32 h-32 bg-white opacity-10 rounded-full"></div>
        <div className="absolute bottom-20 left-1/3 w-48 h-48 bg-white opacity-10 rounded-full"></div>
        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-white opacity-10 rounded-full"></div>
      </div>
      
      <div className="container relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 text-white mb-10 md:mb-0 z-10">
            {/* Sale tag */}
            <div className="inline-block bg-white text-pink-600 font-bold px-4 py-1 rounded-full text-xs tracking-wider mb-4">
              {currentBanner.tagline}
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
              {currentBanner.title}
            </h1>
            <p className="text-lg md:text-xl mb-8 text-white/90 max-w-md">
              {currentBanner.description}
            </p>
            <Link
              to={currentBanner.link}
              className="bg-white text-pink-600 hover:bg-pink-100 transition-colors font-medium px-6 py-3 rounded-full inline-flex items-center group"
            >
              {currentBanner.buttonText}
              <FaArrowRight className="ml-2 transform transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          
          <div className="md:w-1/2 flex justify-center z-10">
            <div className="relative">
              {/* Decorative circle behind image */}
              <div className="absolute inset-0 rounded-full bg-white/10 transform scale-90"></div>
              <img 
                src={currentBanner.image} 
                alt={currentBanner.title} 
                className="max-w-full h-auto rounded-2xl shadow-2xl border-4 border-white/20 max-h-80 object-cover transform transition-transform duration-700"
              />
              
              {/* Floating decorative elements */}
              <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-gradient-to-br from-pink-300 to-pink-500 rounded-lg opacity-80 transform rotate-12 shadow-lg"></div>
              <div className="absolute -left-6 -top-6 w-16 h-16 bg-gradient-to-tr from-pink-400 to-purple-500 rounded-lg opacity-80 transform -rotate-12 shadow-lg"></div>
            </div>
          </div>
        </div>
        
        {/* Navigation controls */}
        <div className="absolute top-1/2 left-4 -translate-y-1/2 z-10">
          <button 
            onClick={prevSlide}
            className="bg-white/10 hover:bg-white/20 text-white rounded-full p-3 backdrop-blur-sm transition-colors border border-white/20"
            aria-label="Previous slide"
          >
            <FaChevronLeft size={16} />
          </button>
        </div>
        
        <div className="absolute top-1/2 right-4 -translate-y-1/2 z-10">
          <button 
            onClick={nextSlide}
            className="bg-white/10 hover:bg-white/20 text-white rounded-full p-3 backdrop-blur-sm transition-colors border border-white/20"
            aria-label="Next slide"
          >
            <FaChevronRight size={16} />
          </button>
        </div>
        
        {/* Dots indicators */}
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex space-x-3 z-10">
          {bannerData.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-white w-8' 
                  : 'bg-white/40 hover:bg-white/60'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Banner; 