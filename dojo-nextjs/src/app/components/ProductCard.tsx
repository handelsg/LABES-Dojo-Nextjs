/**
 * COMPONENTE: ProductCard
 * 
 * Card reutilizável que exibe informações de um produto.
 * 
 * Conceitos demonstrados:
 * - Componente reutilizável (recebe props)
 * - TypeScript com interfaces para type safety
 * - Next/Image para otimização de imagens
 * - Hover effects com Tailwind CSS
 * - Navegação com Next/Link
 * - Layout flexbox para alinhamento
 * 
 * Uso:
 * <ProductCard product={productObject} />
 */

import Link from "next/link";   // Navegação SPA (Single Page Application)
import Image from "next/image";  // Otimização automática de imagens

/**
 * Interface que define a estrutura mínima de um produto.
 * Note que só incluímos os campos que este componente precisa usar.
 */
interface Product {
  id: number;        // Para criar a URL e a key
  title: string;     // Nome do produto
  price: number;     // Preço em dólares
  image: string;     // URL da imagem
  category: string;  // Categoria do produto
}

/**
 * Props do componente ProductCard.
 * readonly: indica que não devemos modificar o objeto product
 * (boa prática em React - props são imutáveis)
 */
interface ProductCardProps {
  readonly product: Product;
}

/**
 * Componente funcional que renderiza um card de produto.
 * 
 * Recebe um produto como prop e exibe:
 * - Imagem do produto
 * - Badge da categoria
 * - Título (limitado a 2 linhas)
 * - Preço formatado
 * - Botão "Ver detalhes"
 * 
 * O card inteiro é clicável e leva para a página de detalhes.
 */
export default function ProductCard({ product }: ProductCardProps) {
  return (
    // Link do Next.js: navegação sem recarregar a página
    // href dinâmico: cada produto tem sua própria URL (/produto/1, /produto/2, etc)
    <Link href={`/produto/${product.id}`}>
      {/* 
        Container principal do card:
        - group: permite aplicar hover em elementos filhos usando group-hover:
        - cursor-pointer: mostra cursor de mão ao passar o mouse
        - h-full: altura 100% para cards uniformes no grid
        - flex flex-col: layout vertical
        - transition-all: anima mudanças de propriedades
        - hover:shadow-xl: sombra maior no hover
      */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer h-full flex flex-col">
        
        {/* ========== ÁREA DA IMAGEM ========== */}
        {/* 
          relative: permite posicionar o badge de forma absoluta
          h-64: altura fixa de 16rem para todas as imagens
        */}
        <div className="relative w-full h-64 bg-gray-100 dark:bg-gray-700 flex items-center justify-center p-4">
          {/* 
            Componente Image do Next.js:
            - Otimiza automaticamente as imagens
            - Lazy loading (carrega só quando visível)
            - Converte para WebP quando possível
            - Redimensiona conforme necessário
            
            object-contain: mantém proporção sem cortar
            group-hover:scale-110: aumenta 10% no hover do card
          */}
          <Image
            src={product.image}
            alt={product.title}
            width={200}
            height={200}
            className="object-contain max-h-full group-hover:scale-110 transition-transform duration-300"
          />
          
          {/* ========== BADGE DE CATEGORIA ========== */}
          {/* 
            absolute top-2 left-2: posiciona no canto superior esquerdo
            rounded-full: bordas totalmente arredondadas (pílula)
          */}
          <div className="absolute top-2 left-2">
            <span className="bg-indigo-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
              {product.category}
            </span>
          </div>
        </div>

        {/* ========== INFORMAÇÕES DO PRODUTO ========== */}
        {/* 
          flex-1: ocupa espaço disponível (empurra preço para baixo)
          justify-between: espaça conteúdo entre topo e fundo
        */}
        <div className="p-4 flex-1 flex flex-col justify-between">
          
          {/* ========== TÍTULO DO PRODUTO ========== */}
          <div>
            {/* 
              line-clamp-2: limita texto a 2 linhas, resto fica com "..."
              group-hover:text-indigo-600: muda cor quando hover no card pai
              transition-colors: anima mudança de cor
            */}
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
              {product.title}
            </h3>
          </div>
          
          {/* ========== PREÇO E BOTÃO ========== */}
          {/* 
            Área inferior do card com preço e botão lado a lado
            mt-4: margem top para separar do título
          */}
          <div className="flex items-center justify-between mt-4">
            {/* 
              Preço formatado:
              toFixed(2): garante 2 casas decimais (ex: 19.99)
            */}
            <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
              ${product.price.toFixed(2)}
            </span>
            
            {/* 
              Botão estilizado:
              - Tecnicamente é só visual (o Link em volta é quem navega)
              - group-hover:bg-indigo-700: fica mais escuro no hover do card
            */}
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors group-hover:bg-indigo-700">
              Ver detalhes →
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
