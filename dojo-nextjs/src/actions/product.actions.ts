

"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { ProductService } from "@/services/product.service";
import { Product, ProductFilters, ActionResult } from "@/types/interfaces";


export async function getProductsAction(
  filters?: ProductFilters
): Promise<ActionResult<Product[]>> {
  try {
    const products = await ProductService.getAllProducts(filters);
    
    return {
      success: true,
      data: products,
    };
  } catch (error) {
    console.error("❌ Erro na action getProducts:", error);
    
    return {
      success: false,
      error: error instanceof Error ? error.message : "Erro ao buscar produtos",
    };
  }
}


export async function getProductByIdAction(
  id: string
): Promise<ActionResult<Product>> {
  try {
    const product = await ProductService.getProductById(id);
    
    return {
      success: true,
      data: product,
    };
  } catch (error) {
    console.error(`❌ Erro na action getProductById(${id}):`, error);
    
    return {
      success: false,
      error: error instanceof Error ? error.message : `Erro ao buscar produto ${id}`,
    };
  }
}


export async function getCategoriesAction(): Promise<ActionResult<string[]>> {
  try {
    const categories = await ProductService.getCategories();
    
    return {
      success: true,
      data: categories,
    };
  } catch (error) {
    console.error("❌ Erro na action getCategories:", error);
    
    return {
      success: false,
      error: "Erro ao buscar categorias",
    };
  }
}


export async function getProductsByCategoryAction(
  category: string
): Promise<ActionResult<Product[]>> {
  try {
    const products = await ProductService.getProductsByCategory(category);
    
    return {
      success: true,
      data: products,
    };
  } catch (error) {
    console.error(`❌ Erro na action getProductsByCategory(${category}):`, error);
    
    return {
      success: false,
      error: `Erro ao buscar produtos da categoria ${category}`,
    };
  }
}

export async function getFeaturedProductsAction(
  limit: number = 4
): Promise<ActionResult<Product[]>> {
  try {
    const products = await ProductService.getFeaturedProducts(limit);
    
    return {
      success: true,
      data: products,
    };
  } catch (error) {
    console.error("❌ Erro na action getFeaturedProducts:", error);
    
    return {
      success: false,
      error: "Erro ao buscar produtos em destaque",
    };
  }
}


export async function revalidateProductsAction(path?: string): Promise<void> {
  try {
    if (path) {
      
      revalidatePath(path);
    } else {
      
      revalidatePath("/");
      revalidatePath("/produto/[id]", "page");
    }
    
    revalidateTag("products");
    
    console.log("✅ Cache de produtos revalidado");
  } catch (error) {
    console.error("❌ Erro ao revalidar cache:", error);
    throw error;
  }
}

export async function searchProductsAction(
  searchTerm: string
): Promise<ActionResult<Product[]>> {
  try {
    if (!searchTerm || searchTerm.trim().length === 0) {
      return {
        success: true,
        data: [],
      };
    }

    const products = await ProductService.getAllProducts({
      search: searchTerm.trim(),
    });
    
    return {
      success: true,
      data: products,
    };
  } catch (error) {
    console.error(`❌ Erro na action searchProducts("${searchTerm}"):`, error);
    
    return {
      success: false,
      error: "Erro ao buscar produtos",
    };
  }
}
