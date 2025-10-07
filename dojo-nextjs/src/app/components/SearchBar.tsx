"use client";

import { useState, useTransition } from "react";
import { searchProductsAction } from "@/actions/product.actions";
import { Product } from "@/types/interfaces";
import ProductCard from "./ProductCard";


export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();


  const handleSearch = async (term: string) => {
    setSearchTerm(term);
    setError(null);

    if (!term || term.trim().length === 0) {
      setResults([]);
      return;
    }

    startTransition(async () => {
      try {

        const result = await searchProductsAction(term);

        if (result.success) {
          setResults(result.data);
        } else {
          setError(result.error);
        }
      } catch (err) {
        setError("Erro ao buscar produtos");
        console.error(err);
      }
    });
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Campo de Busca */}
      <div className="relative mb-8">
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Buscar produtos..."
            className="w-full px-6 py-4 text-lg rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-indigo-500 dark:focus:border-indigo-400 focus:outline-none transition-colors"
            disabled={isPending}
          />
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
            {isPending ? (
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-indigo-600" />
            ) : (
              <span className="text-2xl text-gray-400">🔍</span>
            )}
          </div>
        </div>

        {/* Indicador de status */}
        {searchTerm && (
          <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            {isPending ? (
              <span>Buscando...</span>
            ) : (
              <span>
                {results.length > 0
                  ? `${results.length} produtos encontrados`
                  : "Nenhum produto encontrado"}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Mensagem de erro */}
      {error && (
        <div className="mb-8 p-4 bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 rounded-lg">
          <p className="text-red-700 dark:text-red-200">{error}</p>
        </div>
      )}

      {/* Resultados da busca */}
      {results.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Resultados da Busca
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {results.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
