import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ListingCard from './components/ListingCard';
import AuthModal from './components/AuthModal';
import PropertyDetailsModal from './components/PropertyDetailsModal';
import { generateProperties } from './services/geminiService';
import { Property, User, PropertyType } from './types';
import { Loader2 } from 'lucide-react';

const App: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [activeFilter, setActiveFilter] = useState<PropertyType | 'All'>('All');

  // Load initial data
  useEffect(() => {
    const loadProperties = async () => {
      setIsLoading(true);
      const data = await generateProperties();
      setProperties(data);
      setFilteredProperties(data);
      setIsLoading(false);
    };
    loadProperties();
  }, []);

  // Filter handlers
  useEffect(() => {
    if (activeFilter === 'All') {
      setFilteredProperties(properties);
    } else {
      setFilteredProperties(properties.filter(p => p.type === activeFilter));
    }
  }, [activeFilter, properties]);

  const handleSearch = (query: string) => {
    const lowerQuery = query.toLowerCase();
    const results = properties.filter(p => 
      p.location.toLowerCase().includes(lowerQuery) || 
      p.title.toLowerCase().includes(lowerQuery) ||
      p.description.toLowerCase().includes(lowerQuery)
    );
    setFilteredProperties(results);
    setActiveFilter('All'); // Reset category filter on search
  };

  const handleLogin = (newUser: User) => {
    setUser(newUser);
  };

  const handleLogout = () => {
    setUser(null);
  };

  const refreshProperties = async () => {
      setFilteredProperties([]);
      setIsLoading(true);
      const data = await generateProperties();
      setProperties(data);
      setFilteredProperties(data);
      setActiveFilter('All');
      setIsLoading(false);
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar 
        user={user} 
        onOpenAuth={() => setIsAuthModalOpen(true)} 
        onLogout={handleLogout}
        onRefresh={refreshProperties}
      />
      
      <Hero 
        onSearch={handleSearch} 
        featuredProperties={properties.slice(0, 5)}
        onViewDetails={setSelectedProperty}
      />

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        
        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center md:justify-start">
          {['All', ...Object.values(PropertyType)].map((type) => (
            <button
              key={type}
              onClick={() => setActiveFilter(type as PropertyType | 'All')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition duration-200 border ${
                activeFilter === type
                  ? 'bg-gray-900 text-white border-gray-900 shadow-md'
                  : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50 hover:border-gray-300'
              }`}
            >
              {type === 'All' ? 'All Properties' : type}
            </button>
          ))}
        </div>

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
                {activeFilter === 'All' ? 'Latest Listings' : `${activeFilter}s for Rent & Sale`}
            </h2>
            <span className="text-gray-500 text-sm">
                Showing {filteredProperties.length} results
            </span>
        </div>

        {/* Listings Grid */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-64">
            <Loader2 className="h-10 w-10 text-blue-600 animate-spin mb-4" />
            <p className="text-gray-500 animate-pulse">Finding the best properties for you...</p>
          </div>
        ) : filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProperties.map((property) => (
              <ListingCard 
                key={property.id} 
                property={property} 
                onClick={setSelectedProperty}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
            <p className="text-gray-500 text-lg">No properties found matching your criteria.</p>
            <button 
                onClick={() => { setActiveFilter('All'); handleSearch(''); }}
                className="mt-4 text-blue-600 hover:underline font-medium"
            >
                Clear Filters
            </button>
          </div>
        )}
      </main>

      <footer className="bg-white border-t border-gray-200 py-12 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-500">
            <p>&copy; {new Date().getFullYear()} EstateMarket AI. All rights reserved.</p>
        </div>
      </footer>

      {/* Modals */}
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        onLogin={handleLogin} 
      />
      
      <PropertyDetailsModal 
        property={selectedProperty} 
        onClose={() => setSelectedProperty(null)} 
      />
    </div>
  );
};

export default App;