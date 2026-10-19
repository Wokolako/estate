export enum UserRole {
  CLIENT = 'CLIENT',
  LANDLORD = 'LANDLORD',
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export enum PropertyType {
  HOUSE = 'House',
  APARTMENT = 'Apartment',
  HOTEL = 'Hotel',
  VILLA = 'Villa',
}

export interface Property {
  id: string;
  title: string;
  description: string;
  price: string;
  location: string;
  beds: number;
  baths: number;
  sqft: number;
  type: PropertyType;
  imageUrl: string;
  isSponsored?: boolean;
}
