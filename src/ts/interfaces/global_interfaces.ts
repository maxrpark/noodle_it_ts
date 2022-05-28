export interface Brand {
  name: string;
  slug: string;
}

export interface NoodleDetails {
  id: string;
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
  rating: number;
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

export interface NoodleGroup {
  description: string;
  id: number;
  image: string;
  name: string;
  slug: string;
}

export interface OrderDetailsInterface {
  first_name: string;
  last_name: string;
  address: string;
  country: string;
  zipcode: string;
  email: string;
}

export interface OrderInterface {
  id: string;
  created_at: string;
  paid_amount: string;
}

export interface DateOptions {
  weekday: 'long' | 'short' | 'narrow' | undefined;
  year: 'numeric' | '2-digit' | undefined;
  month: 'long' | 'short' | 'narrow' | 'numeric' | '2-digit' | undefined;
  day: 'numeric' | '2-digit' | undefined;
}
