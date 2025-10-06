import Link from "next/link";
import ProductCard from "./components/ProductCard";

// Interface para tipar os produtos
interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
  description: string;
}

// Função para buscar produtos da API
async function getProducts(): Promise<Product[]> {
  const res = await fetch("https://fakestoreapi.com/products", {
    // Revalida a cada 60 segundos (para demonstrar cache no Next.js)
    next: { revalidate: 60 }
  });
  
  if (!res.ok) {
    throw new Error("Falha ao buscar produtos");
  }
  
  return res.json();
}

export default async function Home() {
  const products = await getProducts();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl">🛍️</span>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Fake Store
              </h1>
            </Link>
            <nav className="flex items-center space-x-4">
              <Link
                href="/"
                className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              >
                Produtos
              </Link>
              <a
                href="https://fakestoreapi.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              >
                API
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Catálogo de Produtos
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Explore nossa coleção de produtos incríveis
          </p>
          <div className="mt-4 inline-flex items-center space-x-2 bg-indigo-100 dark:bg-indigo-900 px-4 py-2 rounded-full">
            <span className="text-sm font-medium text-indigo-800 dark:text-indigo-200">
              {products.length} produtos disponíveis
            </span>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 mt-16 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            Code Dojo - Next.js com Fake Store API
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
            Dados fornecidos por{" "}
            <a
              href="https://fakestoreapi.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              FakeStoreAPI
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
