import Link from "next/link";
import Image from "next/image";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
}

interface ProductCardProps {
  readonly product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/produto/${product.id}`}>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer h-full flex flex-col">
        {/* Imagem do Produto */}
        <div className="relative w-full h-64 bg-gray-100 dark:bg-gray-700 flex items-center justify-center p-4">
          <Image
            src={product.image}
            alt={product.title}
            width={200}
            height={200}
            className="object-contain max-h-full group-hover:scale-110 transition-transform duration-300"
          />
          {/* Badge de Categoria */}
          <div className="absolute top-2 left-2">
            <span className="bg-indigo-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
              {product.category}
            </span>
          </div>
        </div>

        {/* Informações do Produto */}
        <div className="p-4 flex-1 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
              {product.title}
            </h3>
          </div>
          
          <div className="flex items-center justify-between mt-4">
            <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
              ${product.price.toFixed(2)}
            </span>
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors group-hover:bg-indigo-700">
              Ver detalhes →
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
