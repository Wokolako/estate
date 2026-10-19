import React from 'react';
import { Property } from '../types';
import { Bed, Bath, Maximize, Heart } from 'lucide-react';

interface ListingCardProps {
  property: Property;
  onClick: (property: Property) => void;
}

const ListingCard: React.FC<ListingCardProps> = ({ property, onClick }) => {
  return (
    <div 
      className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-xl transition duration-300 cursor-pointer flex flex-col h-full"
      onClick={() => onClick(property)}
    >
      <div className="relative h-60 overflow-hidden">
        <img
          src={property.imageUrl}
          alt={property.title}
          className="w-full h-full object-cover transform group-hover:scale-105 transition duration-500"
        />
        {property.isSponsored && (
            <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-xs font-bold px-2 py-1 rounded text-gray-900 uppercase tracking-wide">
                Sponsored
            </span>
        )}
        <button className="absolute top-3 right-3 p-2 rounded-full bg-black/20 hover:bg-black/40 text-white transition backdrop-blur-sm">
            <Heart className="h-5 w-5" />
        </button>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
             <span className="text-white font-bold text-xl drop-shadow-md">{property.price}</span>
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-2">
             <h3 className="text-lg font-bold text-gray-900 line-clamp-1 group-hover:text-blue-600 transition">{property.title}</h3>
        </div>
        <p className="text-gray-500 text-sm mb-4 line-clamp-1">{property.location}</p>
        
        <div className="flex items-center gap-4 text-gray-600 text-sm mt-auto">
          <div className="flex items-center gap-1">
            <Bed className="h-4 w-4" />
            <span>{property.beds}</span>
          </div>
          <div className="flex items-center gap-1">
            <Bath className="h-4 w-4" />
            <span>{property.baths}</span>
          </div>
          <div className="flex items-center gap-1">
            <Maximize className="h-4 w-4" />
            <span>{property.sqft} sqft</span>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
            <span className="text-xs font-medium px-2 py-1 bg-gray-100 text-gray-600 rounded-md">
                {property.type}
            </span>
            <span className="text-blue-600 text-sm font-medium group-hover:underline">View Details</span>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
