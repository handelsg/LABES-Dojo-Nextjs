
"use client";

import { useState, useEffect } from "react";
import { getCategoriesAction, getProductsByCategoryAction } from "@/actions/product.actions";
import { Product } from "@/types/interfaces";
import ProductCard from "./ProductCard";

export default function CategoryFilter() {
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCategories = async () => {
      const result = await getCategoriesAction();
      
      if (result.success) {
        setCategories(result.data);
      } else {
        setError(result.error);
      }
    };

    loadCategories();
  }, []);


  const handleCategorySelect = async (category: string) => {
    setSelectedCategory(category);
    setLoading(true);
    setError(null);

    try {
      const result = await getProductsByCategoryAction(category);

      if (result.success) {
        setProducts(result.data);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError("Erro ao carregar produtos");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleClearFilter = () => {
    setSelectedCategory(null);
    setProducts([]);
    setError(null);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Filtros de Categoria */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Filtrar por Categoria
        </h2>
        
        <div className="flex flex-wrap gap-3">
          {/* Botão "Todas" */}
          <button
            onClick={handleClearFilter}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              !selectedCategory
                ? "bg-indigo-600 text-white shadow-lg"
                : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600"
            }`}
          >
            Todas
          </button>

          {/* Botões de Categorias */}
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategorySelect(category)}
              disabled={loading}
              className={`px-6 py-3 rounded-lg font-medium transition-all capitalize ${
                selectedCategory === category
                  ? "bg-indigo-600 text-white shadow-lg"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600" />
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            Carregando produtos...
          </p>
        </div>
      )}

      {/* Erro */}
      {error && (
        <div className="mb-8 p-4 bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 rounded-lg">
          <p className="text-red-700 dark:text-red-200">{error}</p>
        </div>
      )}

      {/* Resultados */}
      {!loading && selectedCategory && products.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            {products.length} produtos em &ldquo;{selectedCategory}&rdquo;
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
