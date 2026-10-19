import React, { useState, useEffect } from 'react';
import { Search, MapPin, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { Property } from '../types';

interface HeroProps {
  onSearch: (query: string) => void;
  featuredProperties: Property[];
  onViewDetails: (property: Property) => void;
}

const Hero: React.FC<HeroProps> = ({ onSearch, featuredProperties, onViewDetails }) => {
  const [query, setQuery] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-rotate slides
  useEffect(() => {
    if (featuredProperties.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredProperties.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [featuredProperties.length]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  const nextSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (featuredProperties.length > 0) {
        setCurrentIndex((prev) => (prev + 1) % featuredProperties.length);
    }
  };

  const prevSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (featuredProperties.length > 0) {
        setCurrentIndex((prev) => (prev - 1 + featuredProperties.length) % featuredProperties.length);
    }
  };

  const currentProperty = featuredProperties.length > 0 ? featuredProperties[currentIndex] : null;

  return (
    <div className="relative h-[600px] bg-gray-900 text-white overflow-hidden group">
      {/* Background Image */}
      <div className="absolute inset-0 transition-all duration-700 ease-in-out">
        <img
          src={currentProperty ? currentProperty.imageUrl : "https://images.unsplash.com/photo-1600596542815-2a4d9fbea40d?q=80&w=2069&auto=format&fit=crop"}
          alt="Real Estate Background"
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent"></div>
      </div>

      {/* Main Content (Search & Title) */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center items-center text-center pb-20">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4 drop-shadow-lg">
          {currentProperty ? 'Discover Your Dream Home' : 'Find your perfect place.'}
        </h1>
        <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl drop-shadow-md">
          Browse thousands of houses, hotels, and apartments available today.
        </p>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="w-full max-w-3xl flex flex-col md:flex-row bg-white rounded-xl p-2 shadow-2xl gap-2 transform transition-all hover:scale-[1.01]">
            <div className="flex-1 flex items-center px-4 py-3 bg-gray-50 rounded-lg">
                <MapPin className="h-5 w-5 text-gray-400 mr-3" />
                <input 
                    type="text" 
                    placeholder="Search by location, property type..." 
                    className="w-full bg-transparent outline-none text-gray-900 placeholder-gray-500"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
            </div>
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition duration-200 flex items-center justify-center gap-2 shadow-lg">
                <Search className="h-5 w-5" />
                <span>Search</span>
            </button>
        </form>

        {/* Quick Tags */}
        <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm font-medium text-gray-300">
            <span>Popular:</span>
            <button onClick={() => onSearch("Miami")} className="hover:text-white hover:underline decoration-blue-500 decoration-2 underline-offset-4 transition">Miami</button>
            <button onClick={() => onSearch("Apartment")} className="hover:text-white hover:underline decoration-blue-500 decoration-2 underline-offset-4 transition">Apartments</button>
            <button onClick={() => onSearch("Villa")} className="hover:text-white hover:underline decoration-blue-500 decoration-2 underline-offset-4 transition">Villas</button>
        </div>
      </div>

      {/* Featured Property Info (Bottom Left) */}
      {currentProperty && (
        <div className="absolute bottom-8 left-4 md:left-8 z-20 max-w-md hidden md:block animate-in fade-in slide-in-from-bottom-4 duration-700">
             <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl shadow-xl hover:bg-white/20 transition cursor-pointer" onClick={() => onViewDetails(currentProperty)}>
                <div className="flex items-center gap-2 mb-2">
                    <span className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full uppercase tracking-wider">Featured</span>
                    <span className="text-gray-200 text-sm">{currentProperty.type}</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-1 truncate">{currentProperty.title}</h3>
                <p className="text-gray-200 text-sm mb-3 flex items-center gap-1">
                    <MapPin className="h-4 w-4" /> {currentProperty.location}
                </p>
                <div className="flex items-center justify-between mt-4">
                    <span className="text-xl font-bold text-white">{currentProperty.price}</span>
                    <button className="flex items-center gap-2 text-sm font-bold text-white hover:text-blue-400 transition">
                        View Details <ArrowRight className="h-4 w-4" />
                    </button>
                </div>
             </div>
        </div>
      )}

      {/* Navigation Arrows */}
      {featuredProperties.length > 1 && (
        <>
            <button 
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/30 hover:bg-black/50 text-white backdrop-blur-sm transition opacity-0 group-hover:opacity-100"
            >
                <ChevronLeft className="h-6 w-6" />
            </button>
            <button 
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/30 hover:bg-black/50 text-white backdrop-blur-sm transition opacity-0 group-hover:opacity-100"
            >
                <ChevronRight className="h-6 w-6" />
            </button>
            
            {/* Dots */}
            <div className="absolute bottom-6 right-0 left-0 flex justify-center gap-2 md:hidden">
                {featuredProperties.map((_, idx) => (
                    <div 
                        key={idx} 
                        className={`h-2 w-2 rounded-full transition-all ${idx === currentIndex ? 'bg-white w-4' : 'bg-white/50'}`} 
                    />
                ))}
            </div>
        </>
      )}
    </div>
  );
};

export default Hero;