
export interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
  description: string;
  rating: {
    rate: number;
    count: number;
  };
}

export interface ProductFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  sortBy?: "price" | "rating" | "name";
  sortOrder?: "asc" | "desc";
}

export interface PaginatedProducts {
  products: Product[];
  total: number;
  page: number;
  totalPages: number;
}

export interface ApiError {
  message: string;
  status?: number;
  details?: unknown;
}

export interface FetchOptions extends RequestInit {
  timeout?: number;
  retries?: number;
}

export type ActionResult<T> = 
  | { success: true; data: T }
  | { success: false; error: string };

export interface ProductCardProps {
  readonly product: Product;
}

export interface PageProps {
  readonly params: {
    readonly id: string;
  };
}
