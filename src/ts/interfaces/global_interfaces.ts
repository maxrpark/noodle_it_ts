export interface Brand {
  name: string;
  slug: string;
}

export interface NoodleDetails {
  id: number;
  name: string;
  images: string[];
  rating: number;
  slug: string;
  brand: Brand;
  category: string;
  price_per_package: string;
  price_per_unite: string;
  amount_per_package: number;
  description: string;
  ingredients: string[];
  tags: string[];
  instructions: string;
  spicy_level: string;
  spicy_level_number: number;
}

export interface CartContent {
  id: string;
  image: string;
  name: string;
  price: string;
  brand: string;
  category: string;
  rating: string;
  amount: number;
  slug: string;
}

export interface userDetails {
  email: string;
  first_name: string;
  id: number;
  user_id: number;
  last_login: string;
  user_name: string;
  favorites: NoodleDetails[];
}
