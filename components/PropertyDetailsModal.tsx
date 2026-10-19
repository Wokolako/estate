import React from 'react';
import { Property } from '../types';
import { X, MapPin, Bed, Bath, Maximize, Share2, Heart, CheckCircle } from 'lucide-react';

interface PropertyDetailsModalProps {
  property: Property | null;
  onClose: () => void;
}

const PropertyDetailsModal: React.FC<PropertyDetailsModalProps> = ({ property, onClose }) => {
  if (!property) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-gray-900/80 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      ></div>

      <div className="relative bg-white rounded-2xl w-full max-w-4xl h-[90vh] overflow-y-auto shadow-2xl flex flex-col md:flex-row">
        
        {/* Close Button */}
        <button 
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition"
        >
            <X className="h-5 w-5" />
        </button>

        {/* Image Section */}
        <div className="w-full md:w-1/2 h-64 md:h-auto relative">
             <img 
                src={property.imageUrl} 
                alt={property.title} 
                className="w-full h-full object-cover"
            />
             <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur px-4 py-2 rounded-lg shadow-lg">
                <p className="text-xl font-bold text-gray-900">{property.price}</p>
             </div>
        </div>

        {/* Info Section */}
        <div className="w-full md:w-1/2 p-8 flex flex-col">
            <div className="mb-6">
                <span className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider mb-3">
                    {property.type}
                </span>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">{property.title}</h2>
                <div className="flex items-center text-gray-500">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{property.location}</span>
                </div>
            </div>

            <div className="flex items-center gap-6 mb-8 py-4 border-y border-gray-100">
                 <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-gray-900 font-bold text-lg">
                        <Bed className="h-5 w-5 text-blue-600" /> {property.beds}
                    </div>
                    <span className="text-xs text-gray-500 uppercase">Beds</span>
                 </div>
                 <div className="w-px h-8 bg-gray-200"></div>
                 <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-gray-900 font-bold text-lg">
                        <Bath className="h-5 w-5 text-blue-600" /> {property.baths}
                    </div>
                    <span className="text-xs text-gray-500 uppercase">Baths</span>
                 </div>
                 <div className="w-px h-8 bg-gray-200"></div>
                 <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-gray-900 font-bold text-lg">
                        <Maximize className="h-5 w-5 text-blue-600" /> {property.sqft}
                    </div>
                    <span className="text-xs text-gray-500 uppercase">Sq Ft</span>
                 </div>
            </div>

            <div className="mb-8">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Description</h3>
                <p className="text-gray-600 leading-relaxed">
                    {property.description}
                </p>
                <div className="mt-4 flex gap-2">
                    <div className="flex items-center gap-2 text-sm text-green-600 bg-green-50 px-3 py-1 rounded-full">
                        <CheckCircle className="h-4 w-4" /> Available Now
                    </div>
                </div>
            </div>

            <div className="mt-auto flex gap-3">
                <button className="flex-1 bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition shadow-lg shadow-blue-600/20">
                    Contact Agent
                </button>
                <button className="p-3 border border-gray-200 rounded-xl hover:bg-gray-50 text-gray-600 transition">
                    <Heart className="h-6 w-6" />
                </button>
                <button className="p-3 border border-gray-200 rounded-xl hover:bg-gray-50 text-gray-600 transition">
                    <Share2 className="h-6 w-6" />
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailsModal;
