import { GoogleGenAI, Type } from "@google/genai";
import { Property, PropertyType } from "../types";

// Curated list of real estate images that fit a Malawian/African aesthetic (lush greenery, brick, lake views)
const REAL_ESTATE_IMAGES = [
  'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=1200&auto=format&fit=crop', // Luxury Villa with pool (Blantyre/Lilongwe style)
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop', // Modern home with view
  'https://images.unsplash.com/photo-1580587771525-78b9dba3b91d?q=80&w=1200&auto=format&fit=crop', // Suburban home
  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop', // Resort style (Senga Bay)
  'https://images.unsplash.com/photo-1600596542815-2a4d9fbea40d?q=80&w=1200&auto=format&fit=crop', // Large family home
  'https://images.unsplash.com/photo-1572120360610-d971b9d7767c?q=80&w=1200&auto=format&fit=crop', // Nature focused
  'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1200&auto=format&fit=crop', // Hotel/Lodge style
  'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200&auto=format&fit=crop',
];

// Fallback data with specific Malawian locations
const FALLBACK_PROPERTIES: Property[] = [
  {
    id: '1',
    title: 'Modern Mandala Executive House',
    description: 'A spacious 4-bedroom house located in the prestigious Mandala area of Blantyre. Features a large garden and servants quarters.',
    price: 'MK 150,000,000',
    location: 'Mandala, Blantyre',
    beds: 4,
    baths: 3,
    sqft: 3500,
    type: PropertyType.HOUSE,
    imageUrl: REAL_ESTATE_IMAGES[0],
    isSponsored: true,
  },
  {
    id: '2',
    title: 'City Centre Luxury Apartment',
    description: 'Fully furnished apartment within walking distance to the Gateway Mall and Government offices.',
    price: 'MK 850,000/mo',
    location: 'Area 19, Lilongwe City',
    beds: 2,
    baths: 2,
    sqft: 1200,
    type: PropertyType.APARTMENT,
    imageUrl: REAL_ESTATE_IMAGES[1],
  },
  {
    id: '3',
    title: 'Lakeside Resort Villa',
    description: 'Beautiful holiday home right on the shores of Lake Malawi. Perfect for tourism investment.',
    price: 'MK 200,000/night',
    location: 'Senga Bay, Salima',
    beds: 3,
    baths: 3,
    sqft: 2200,
    type: PropertyType.VILLA,
    imageUrl: REAL_ESTATE_IMAGES[3],
  },
   {
    id: '4',
    title: 'Zomba Plateau Guest House',
    description: 'Serene guest house at the foot of Zomba Mountain with stunning views.',
    price: 'MK 45,000/night',
    location: 'Matawale, Zomba',
    beds: 6,
    baths: 6,
    sqft: 4000,
    type: PropertyType.HOTEL,
    imageUrl: REAL_ESTATE_IMAGES[6],
  },
  {
    id: '5',
    title: 'Affordable Family Starter',
    description: 'Newly built brick house in a developing neighborhood.',
    price: 'MK 35,000,000',
    location: 'Lunzu, Blantyre',
    beds: 3,
    baths: 1,
    sqft: 1500,
    type: PropertyType.HOUSE,
    imageUrl: REAL_ESTATE_IMAGES[2],
  },
];

export const generateProperties = async (): Promise<Property[]> => {
  try {
    if (!process.env.API_KEY || process.env.API_KEY === 'PLACEHOLDER_API_KEY') {
      console.warn("API Key not configured, using fallback property listings.");
      return FALLBACK_PROPERTIES;
    }

    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    // Updated prompt with specific Malawian locations
    const prompt = `
      Generate 8 realistic real estate listings for Malawi. 
      Use the following locations specifically:
      - Blantyre (Limbe, Ndirande, Bangwe, Machinjiri, Chirimba, Chileka, Soche, Chinyonga, Kanjedza, Mandala)
      - Zomba (Zomba City, Thondwe, Jali, Matawale, Songani, Domasi)
      - Salima (Senga Bay, Chipoka, Lifuwu)
      - Lilongwe (Area 10, Area 43, City Centre, Old Town)
      - Mzuzu City
      
      Currency should be in MK (Malawi Kwacha) or USD.
      Include a mix of Houses, Apartments, Hotels, and Villas.
      Make the descriptions sound local and inviting.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              description: { type: Type.STRING },
              price: { type: Type.STRING },
              location: { type: Type.STRING },
              beds: { type: Type.NUMBER },
              baths: { type: Type.NUMBER },
              sqft: { type: Type.NUMBER },
              type: { type: Type.STRING, enum: [PropertyType.HOUSE, PropertyType.APARTMENT, PropertyType.HOTEL, PropertyType.VILLA] },
            },
            required: ["title", "description", "price", "location", "beds", "baths", "sqft", "type"]
          },
        },
      },
    });

    const data = JSON.parse(response.text || "[]");
    
    // Augment with IDs and Images
    return data.map((item: any, index: number) => ({
      ...item,
      id: `gen-${index}-${Date.now()}`,
      // Cycle through the real estate images
      imageUrl: REAL_ESTATE_IMAGES[index % REAL_ESTATE_IMAGES.length],
      isSponsored: index === 0,
    }));

  } catch (error) {
    console.error("Failed to generate properties with Gemini:", error);
    return FALLBACK_PROPERTIES;
  }
};
