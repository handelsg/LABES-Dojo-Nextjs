import { apiClient } from "@/lib/api-client";
import { Product, ProductFilters } from "@/types/interfaces";


const CACHE_OPTIONS = {
  revalidate: 60,
} as const;


export class ProductService {

  static async getAllProducts(filters?: ProductFilters): Promise<Product[]> {
    try {
      const products = await apiClient.get<Product[]>("/products", {
        next: CACHE_OPTIONS,
      } as RequestInit);

      if (filters) {
        return this.applyFilters(products, filters);
      }

      return products;
    } catch (error) {
      console.error("❌ Erro ao buscar produtos:", error);
      throw new Error("Não foi possível carregar os produtos. Tente novamente mais tarde.");
    }
  }

  static async getProductById(id: string): Promise<Product> {
    try {
      const product = await apiClient.get<Product>(`/products/${id}`, {
        next: CACHE_OPTIONS,
      } as RequestInit);

      if (!product) {
        throw new Error(`Produto com ID ${id} não encontrado`);
      }

      return product;
    } catch (error) {
      console.error(`❌ Erro ao buscar produto ${id}:`, error);
      throw new Error(`Não foi possível carregar o produto ${id}.`);
    }
  }

  static async getCategories(): Promise<string[]> {
    try {
      return await apiClient.get<string[]>("/products/categories", {
        next: CACHE_OPTIONS,
      } as RequestInit);
    } catch (error) {
      console.error("❌ Erro ao buscar categorias:", error);
      return [];
    }
  }

  static async getProductsByCategory(category: string): Promise<Product[]> {
    try {
      return await apiClient.get<Product[]>(`/products/category/${category}`, {
        next: CACHE_OPTIONS,
      } as RequestInit);
    } catch (error) {
      console.error(`❌ Erro ao buscar produtos da categoria ${category}:`, error);
      return [];
    }
  }

  static async getFeaturedProducts(limit: number = 4): Promise<Product[]> {
    try {
      const products = await this.getAllProducts();
      
      return products
        .toSorted((a, b) => b.rating.rate - a.rating.rate)
        .slice(0, limit);
    } catch (error) {
      console.error("❌ Erro ao buscar produtos em destaque:", error);
      return [];
    }
  }

  static async getStaticParams(): Promise<{ id: string }[]> {
    try {
      const products = await this.getAllProducts();
      return products.map((product) => ({
        id: product.id.toString(),
      }));
    } catch (error) {
      console.error("❌ Erro ao gerar parâmetros estáticos:", error);
      return [];
    }
  }


  private static applyFilters(products: Product[], filters: ProductFilters): Product[] {
    let filtered = [...products];

    // Filtro por categoria
    if (filters.category) {
      filtered = filtered.filter(
        (p) => p.category.toLowerCase() === filters.category?.toLowerCase()
      );
    }

    // Filtro por preço mínimo
    if (filters.minPrice !== undefined) {
      filtered = filtered.filter((p) => p.price >= filters.minPrice!);
    }

    // Filtro por preço máximo
    if (filters.maxPrice !== undefined) {
      filtered = filtered.filter((p) => p.price <= filters.maxPrice!);
    }

    // Filtro por busca textual
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(searchLower) ||
          p.description.toLowerCase().includes(searchLower) ||
          p.category.toLowerCase().includes(searchLower)
      );
    }

    // Ordenação
    if (filters.sortBy) {
      filtered = this.sortProducts(filtered, filters.sortBy, filters.sortOrder);
    }

    return filtered;
  }

  private static sortProducts(
    products: Product[],
    sortBy: "price" | "rating" | "name",
    order: "asc" | "desc" = "asc"
  ): Product[] {
    const sorted = [...products];
    const multiplier = order === "asc" ? 1 : -1;

    sorted.sort((a, b) => {
      switch (sortBy) {
        case "price":
          return (a.price - b.price) * multiplier;
        case "rating":
          return (a.rating.rate - b.rating.rate) * multiplier;
        case "name":
          return a.title.localeCompare(b.title) * multiplier;
        default:
          return 0;
      }
    });

    return sorted;
  }
}
