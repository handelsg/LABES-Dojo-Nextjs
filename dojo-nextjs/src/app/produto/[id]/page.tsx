import Link from "next/link";
import Image from "next/image";

// Interface para tipar o produto
interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

// Função para buscar um produto específico
async function getProduct(id: string): Promise<Product> {
  const res = await fetch(`https://fakestoreapi.com/products/${id}`, {
    next: { revalidate: 60 }
  });

  if (!res.ok) {
    throw new Error("Produto não encontrado");
  }

  return res.json();
}

// Gera os parâmetros estáticos para as páginas (opcional, mas melhora performance)
export async function generateStaticParams() {
  const res = await fetch("https://fakestoreapi.com/products");
  const products: Product[] = await res.json();

  return products.map((product) => ({
    id: product.id.toString(),
  }));
}

interface PageProps {
  readonly params: {
    readonly id: string;
  };
}

export default async function ProductPage(props: PageProps) {
  // Suporte para Next.js 15+ (params pode ser Promise)
  const params = await Promise.resolve(props.params);
  const product = await getProduct(params.id);

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
            <Link
              href="/"
              className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              <span>←</span>
              <span>Voltar</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8 flex items-center space-x-2 text-sm">
          <Link
            href="/"
            className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400"
          >
            Home
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-900 dark:text-white font-medium">
            {product.category}
          </span>
        </nav>

        {/* Product Details */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            {/* Imagem do Produto */}
            <div className="flex items-center justify-center bg-gray-50 dark:bg-gray-700 rounded-lg p-8">
              <Image
                src={product.image}
                alt={product.title}
                width={400}
                height={400}
                className="object-contain max-h-96"
                priority
              />
            </div>

            {/* Informações do Produto */}
            <div className="flex flex-col justify-between">
              <div>
                {/* Categoria */}
                <div className="mb-4">
                  <span className="bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 text-sm font-semibold px-3 py-1 rounded-full">
                    {product.category}
                  </span>
                </div>

                {/* Título */}
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  {product.title}
                </h1>

                {/* Rating */}
                <div className="flex items-center space-x-2 mb-6">
                  <div className="flex items-center">
                    {Array.from({ length: 5 }, (_, i) => (
                      <span
                        key={`star-${product.id}-${i}`}
                        className={`text-xl ${
                          i < Math.round(product.rating.rate)
                            ? "text-yellow-400"
                            : "text-gray-300 dark:text-gray-600"
                        }`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="text-gray-600 dark:text-gray-400 text-sm">
                    {product.rating.rate} ({product.rating.count} avaliações)
                  </span>
                </div>

                {/* Preço */}
                <div className="mb-6">
                  <p className="text-4xl font-bold text-indigo-600 dark:text-indigo-400">
                    ${product.price.toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Frete grátis para todo o Brasil
                  </p>
                </div>

                {/* Descrição */}
                <div className="mb-8">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    Descrição
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {product.description}
                  </p>
                </div>
              </div>

              {/* Botões de Ação */}
              <div className="space-y-3">
                <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-4 rounded-lg transition-colors shadow-lg hover:shadow-xl">
                  Adicionar ao Carrinho
                </button>
                <button className="w-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-semibold py-4 rounded-lg transition-colors">
                  Adicionar aos Favoritos ♡
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Informações Adicionais */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center">
            <div className="text-4xl mb-3">🚚</div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              Frete Grátis
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Entrega em todo o Brasil
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center">
            <div className="text-4xl mb-3">🔄</div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              Devolução Grátis
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              30 dias para trocar ou devolver
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center">
            <div className="text-4xl mb-3">🔒</div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              Compra Segura
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Seus dados estão protegidos
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
