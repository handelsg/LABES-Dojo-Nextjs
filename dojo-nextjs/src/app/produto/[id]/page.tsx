/**
 * PÁGINA DE DETALHES DO PRODUTO - Rota Dinâmica [id]
 * 
 * Este arquivo está na pasta /produto/[id]/, o que cria uma rota dinâmica.
 * O [id] entre colchetes significa que este valor vem da URL.
 * 
 * Exemplos de URLs que esta página atende:
 * - /produto/1 → mostra produto com id=1
 * - /produto/2 → mostra produto com id=2
 * - /produto/99 → mostra produto com id=99
 * 
 * Conceitos demonstrados:
 * - Rotas dinâmicas ([id])
 * - generateStaticParams para SSG (Static Site Generation)
 * - Server Component assíncrono
 * - Grid responsivo (2 colunas em desktop)
 * - Sistema de avaliações (estrelas)
 * - Props readonly
 */

import Link from "next/link";   // Navegação interna (SPA)
import Image from "next/image";  // Otimização de imagens

/**
 * Interface completa de um produto com todos os campos.
 * Note que aqui incluímos rating.rate e rating.count que não
 * estavam na página inicial, pois só precisamos deles aqui.
 */
interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;    // Nota média (ex: 3.9)
    count: number;   // Número de avaliações (ex: 120)
  };
}

/**
 * Função assíncrona que busca UM produto específico da API.
 * 
 * @param id - ID do produto (string porque vem da URL)
 * @returns Promise que resolve para um objeto Product
 * 
 * Usa template string para criar a URL: `/products/${id}`
 * Se id=5, a URL fica: https://fakestoreapi.com/products/5
 */
async function getProduct(id: string): Promise<Product> {
  const res = await fetch(`https://fakestoreapi.com/products/${id}`, {
    next: { revalidate: 60 }  // Cache com revalidação a cada 60 segundos
  });

  if (!res.ok) {
    throw new Error("Produto não encontrado");
  }

  return res.json();
}

/**
 * generateStaticParams - IMPORTANTE!
 * 
 * Esta função é opcional mas MUITO IMPORTANTE para performance.
 * 
 * O que faz:
 * - Roda no momento do build (npm run build)
 * - Busca todos os produtos da API
 * - Gera páginas HTML estáticas para CADA produto
 * - Resultado: páginas SUPER rápidas (já estão prontas!)
 * 
 * Sem isso: páginas são geradas sob demanda (mais lento)
 * Com isso: páginas já existem (velocidade máxima!)
 * 
 * Este é um dos superpoderes do Next.js: SSG (Static Site Generation)
 */
export async function generateStaticParams() {
  // Busca TODOS os produtos
  const res = await fetch("https://fakestoreapi.com/products");
  const products: Product[] = await res.json();

  // Retorna array de objetos com o parâmetro "id"
  // O nome "id" deve corresponder ao nome da pasta [id]
  return products.map((product) => ({
    id: product.id.toString(),  // Converte número para string
  }));
  
  // Resultado: Next.js gera /produto/1.html, /produto/2.html, etc.
}

/**
 * Props da página.
 * readonly: indica que não devemos modificar estas props
 * 
 * params: objeto que contém os parâmetros dinâmicos da URL
 * params.id: o valor capturado da URL (ex: "5" se URL for /produto/5)
 */
interface PageProps {
  readonly params: {
    readonly id: string;
  };
}

/**
 * Componente principal da página de detalhes.
 * 
 * Server Component assíncrono que:
 * 1. Recebe o ID da URL via props.params
 * 2. Busca os dados do produto
 * 3. Renderiza a página completa
 * 
 * Note o await Promise.resolve() - necessário para Next.js 15+
 * onde params pode ser uma Promise.
 */
export default async function ProductPage(props: PageProps) {
  // Suporte para Next.js 15+ (params pode ser Promise)
  const params = await Promise.resolve(props.params);
  const product = await getProduct(params.id);

  return (
    // Container principal com gradiente de fundo
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      
      {/* ========== HEADER (Cabeçalho) ========== */}
      {/* Header fixo no topo com logo e botão voltar */}
      <header className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          {/* Flexbox: logo à esquerda, botão voltar à direita */}
          <div className="flex items-center justify-between">
            
            {/* Logo/Marca - clicável para voltar à home */}
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl">🛍️</span>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Fake Store
              </h1>
            </Link>
            
            {/* Botão Voltar - navegação para a página anterior */}
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

      {/* ========== CONTEÚDO PRINCIPAL ========== */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* ========== BREADCRUMB (Trilha de navegação) ========== */}
        {/* 
          Breadcrumb ajuda o usuário a saber onde está:
          Home / electronics / Product
          
          Melhora UX e SEO
        */}
        <nav className="mb-8 flex items-center space-x-2 text-sm">
          <Link
            href="/"
            className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400"
          >
            Home
          </Link>
          <span className="text-gray-400">/</span>
          {/* Mostra dinamicamente a categoria do produto */}
          <span className="text-gray-900 dark:text-white font-medium">
            {product.category}
          </span>
        </nav>

        {/* ========== DETALHES DO PRODUTO ========== */}
        {/* Card principal com informações completas do produto */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden">
          {/* 
            Grid responsivo:
            - Mobile (padrão): 1 coluna (imagem acima, info abaixo)
            - Desktop (lg+): 2 colunas (imagem à esquerda, info à direita)
            
            gap-8: espaço de 2rem entre colunas
          */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            
            {/* ========== COLUNA 1: IMAGEM ========== */}
            {/* 
              Área quadrada com fundo cinza para a imagem
              flex + items-center + justify-center: centraliza a imagem
            */}
            <div className="flex items-center justify-center bg-gray-50 dark:bg-gray-700 rounded-lg p-8">
              {/* 
                Image com priority:
                - priority: carrega imediatamente (sem lazy loading)
                - Ütil para imagens "above the fold" (visíveis sem scroll)
                - max-h-96: altura máxima de 24rem
              */}
              <Image
                src={product.image}
                alt={product.title}
                width={400}
                height={400}
                className="object-contain max-h-96"
                priority
              />
            </div>

            {/* ========== COLUNA 2: INFORMAÇÕES ========== */}
            {/* 
              flex-col justify-between:
              - Layout vertical
              - Informações no topo, botões no final
            */}
            <div className="flex flex-col justify-between">
              <div>
                
                {/* Badge de Categoria */}
                <div className="mb-4">
                  <span className="bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 text-sm font-semibold px-3 py-1 rounded-full">
                    {product.category}
                  </span>
                </div>

                {/* Título do Produto */}
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  {product.title}
                </h1>

                {/* ========== SISTEMA DE AVALIAÇÕES (Estrelas) ========== */}
                {/* 
                  Mostra até 5 estrelas baseado na nota do produto.
                  
                  Array.from({ length: 5 }, (_, i) => ...):
                  - Cria array com 5 elementos [0, 1, 2, 3, 4]
                  - Para cada índice i, renderiza uma estrela
                  
                  Lógica de cor:
                  - Se i < nota arredondada: estrela amarela (preenchida)
                  - Senão: estrela cinza (vazia)
                  
                  Exemplo: nota 3.7 → Math.round(3.7) = 4
                  - Estrelas 0,1,2,3: amarelas
                  - Estrela 4: cinza
                */}
                <div className="flex items-center space-x-2 mb-6">
                  <div className="flex items-center">
                    {/* Loop de 5 iterações para criar 5 estrelas */}
                    {Array.from({ length: 5 }, (_, i) => (
                      <span
                        key={`star-${product.id}-${i}`}
                        className={`text-xl ${
                          i < Math.round(product.rating.rate)
                            ? "text-yellow-400"      // Estrela preenchida
                            : "text-gray-300 dark:text-gray-600"  // Estrela vazia
                        }`}
                      >
                        ★  {/* Caractere Unicode de estrela */}
                      </span>
                    ))}
                  </div>
                  {/* Texto com nota numérica e quantidade de avaliações */}
                  <span className="text-gray-600 dark:text-gray-400 text-sm">
                    {product.rating.rate} ({product.rating.count} avaliações)
                  </span>
                </div>

                {/* ========== PREÇO ========== */}
                <div className="mb-6">
                  {/* 
                    Preço em destaque:
                    - text-4xl: tamanho grande para destacar
                    - toFixed(2): formata com 2 casas decimais (19.99, 109.95, etc)
                  */}
                  <p className="text-4xl font-bold text-indigo-600 dark:text-indigo-400">
                    ${product.price.toFixed(2)}
                  </p>
                  {/* Informação adicional sobre frete */}
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Frete grátis para todo o Brasil
                  </p>
                </div>

                {/* ========== DESCRIÇÃO DO PRODUTO ========== */}
                <div className="mb-8">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    Descrição
                  </h2>
                  {/* 
                    leading-relaxed: aumenta espaçamento entre linhas
                    Melhora legibilidade de textos longos
                  */}
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {product.description}
                  </p>
                </div>
              </div>

              {/* ========== BOTÕES DE AÇÃO ========== */}
              {/* 
                Botões principais da página:
                - Adicionar ao carrinho (ação primária)
                - Adicionar aos favoritos (ação secundária)
                
                space-y-3: espaço vertical de 0.75rem entre botões
                
                NOTA: Estes botões são apenas visuais neste demo.
                Em um projeto real, você conectaria com Context API
                para gerenciar carrinho e favoritos.
              */}
              <div className="space-y-3">
                {/* 
                  Botão Primário - Adicionar ao Carrinho:
                  - w-full: largura 100%
                  - py-4: padding vertical generoso (botão grande)
                  - shadow-lg hover:shadow-xl: sombra aumenta no hover
                */}
                <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-4 rounded-lg transition-colors shadow-lg hover:shadow-xl">
                  Adicionar ao Carrinho
                </button>
                
                {/* 
                  Botão Secundário - Favoritos:
                  - Estilo mais suave (cinza em vez de indigo)
                  - ♡ : coração vazio (pode virar ♥ quando favoritado)
                */}
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
