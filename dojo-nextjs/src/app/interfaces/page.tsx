import Link from "next/link";

export const metadata = {
    title: "Interfaces - Documentação",
    description: "Documentação de todas as interfaces e tipos do projeto",
};

export default function InterfacesPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
            {/* Header */}
            <header className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <Link href="/" className="flex items-center space-x-2">
                            <span className="text-2xl">📚</span>
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                                Documentação de Interfaces
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
                {/* Intro */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                        📋 Interfaces Centralizadas
                    </h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        Todas as interfaces do projeto estão organizadas no arquivo{" "}
                        <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-sm">
                            src/types/interfaces.ts
                        </code>
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">
                        Esta centralização facilita a manutenção, evita duplicação de código e garante
                        consistência em todo o projeto.
                    </p>
                </div>

                {/* Seção de Interfaces de Produto */}
                <section className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
                    <h3 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mb-4 flex items-center">
                        🛍️ Interfaces de Produto
                    </h3>

                    {/* Product */}
                    <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                            Product
                        </h4>
                        <p className="text-gray-600 dark:text-gray-400 mb-3">
                            Interface principal que representa um produto da Fake Store API
                        </p>
                        <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">

                        </pre>
                    </div>

                    {/* ProductFilters */}
                    <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                            ProductFilters
                        </h4>
                        <p className="text-gray-600 dark:text-gray-400 mb-3">
                            Filtros opcionais para busca e filtragem de produtos
                        </p>
                        <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                        </pre>
                    </div>

                    {/* PaginatedProducts */}
                    <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                            PaginatedProducts
                        </h4>
                        <p className="text-gray-600 dark:text-gray-400 mb-3">
                            Resposta paginada contendo produtos e metadados de paginação
                        </p>
                        <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">

                        </pre>
                    </div>
                </section>

                {/* Seção de Interfaces de API */}
                <section className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
                    <h3 className="text-2xl font-bold text-green-600 dark:text-green-400 mb-4 flex items-center">
                        🌐 Interfaces de API
                    </h3>

                    {/* ApiError */}
                    <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                            ApiError
                        </h4>
                        <p className="text-gray-600 dark:text-gray-400 mb-3">
                            Estrutura de erro retornado pela API
                        </p>
                        <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                        </pre>
                    </div>

                    {/* FetchOptions */}
                    <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                            FetchOptions
                        </h4>
                        <p className="text-gray-600 dark:text-gray-400 mb-3">
                            Opções de requisição fetch com suporte a retry e timeout
                        </p>
                        <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                        </pre>
                    </div>
                </section>

                {/* Seção de Interfaces de Actions */}
                <section className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
                    <h3 className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-4 flex items-center">
                        ⚡ Interfaces de Actions
                    </h3>

                    {/* ActionResult */}
                    <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                            ActionResult&lt;T&gt;
                        </h4>
                        <p className="text-gray-600 dark:text-gray-400 mb-3">
                            Tipo genérico para resultado de Server Actions (sucesso ou erro)
                        </p>
                        <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                        </pre>
                    </div>
                </section>

                {/* Seção de Interfaces de Componentes */}
                <section className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
                    <h3 className="text-2xl font-bold text-orange-600 dark:text-orange-400 mb-4 flex items-center">
                        🧩 Interfaces de Componentes
                    </h3>

                    {/* ProductCardProps */}
                    <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                            ProductCardProps
                        </h4>
                        <p className="text-gray-600 dark:text-gray-400 mb-3">
                            Props do componente ProductCard
                        </p>
                        <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                        </pre>
                    </div>

                    {/* PageProps */}
                    <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                            PageProps
                        </h4>
                        <p className="text-gray-600 dark:text-gray-400 mb-3">
                            Props padrão para páginas com parâmetros dinâmicos de ID
                        </p>
                        <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">

                        </pre>
                    </div>
                </section>

                {/* Como Usar */}
                <section className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900 dark:to-purple-900 rounded-lg shadow-md p-6">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                        💡 Como Usar
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                                1. Importar interfaces
                            </h4>
                            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                                {`import { Product, ProductFilters, ActionResult } from "@/types/interfaces";`}
                            </pre>
                        </div>

                        <div>
                            <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                                2. Usar em funções
                            </h4>
                            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                            </pre>
                        </div>

                        <div>
                            <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                                3. Usar em componentes
                            </h4>
                            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                            </pre>
                        </div>
                    </div>
                </section>

                {/* Links Úteis */}
                <section className="mt-8 text-center">
                    <div className="inline-flex items-center space-x-4">
                        <Link
                            href="/"
                            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6 py-3 rounded-lg transition-colors"
                        >
                            Ver Produtos
                        </Link>
                        <a
                            href="https://github.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-gray-600 hover:bg-gray-700 text-white font-medium px-6 py-3 rounded-lg transition-colors"
                        >
                            Ver no GitHub
                        </a>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="bg-white dark:bg-gray-800 mt-16 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <p className="text-gray-600 dark:text-gray-400">
                        Documentação gerada automaticamente
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
                        Todas as interfaces em{" "}
                        <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-xs">
                            src/types/interfaces.ts
                        </code>
                    </p>
                </div>
            </footer>
        </div>
    );
}
