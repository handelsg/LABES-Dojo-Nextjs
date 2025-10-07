# 🎨 Diagrama Visual da Arquitetura

## 📐 Visão Completa do Sistema

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              🌐 NAVEGADOR                                   │
│                                                                             │
│  ┌───────────────────────────────────────────────────────────────────────┐ │
│  │                        👤 INTERFACE DO USUÁRIO                        │ │
│  │                                                                       │ │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐                 │ │
│  │  │   Header    │  │    Grid     │  │   Footer    │                 │ │
│  │  │   ─────     │  │   ─────     │  │   ─────     │                 │ │
│  │  │  🛍️ Logo   │  │  📦 Cards   │  │  📄 Info    │                 │ │
│  │  └─────────────┘  └─────────────┘  └─────────────┘                 │ │
│  │                                                                       │ │
│  │  ┌─────────────────────────────────────────────────────────────────┐ │ │
│  │  │           🔍 CLIENT COMPONENTS (use client)                     │ │ │
│  │  │                                                                 │ │ │
│  │  │  • SearchBar.tsx         → Busca interativa                    │ │ │
│  │  │  • CategoryFilter.tsx    → Filtro por categoria                │ │ │
│  │  │  • RefreshButton.tsx     → Botão de atualização                │ │ │
│  │  │                                                                 │ │ │
│  │  │  Estado: useState, useTransition, useEffect                    │ │ │
│  │  │  Eventos: onClick, onChange, onSubmit                          │ │ │
│  │  └─────────────────────────────────────────────────────────────────┘ │ │
│  └───────────────────────────────────────────────────────────────────────┘ │
└──────────────────────────────┬──────────────────────────────────────────────┘
                               │
                               │ 📡 HTTP Request / Server Actions
                               │
┌──────────────────────────────▼──────────────────────────────────────────────┐
│                        🖥️  NEXT.JS SERVER                                   │
│                                                                             │
│  ┌───────────────────────────────────────────────────────────────────────┐ │
│  │                     📄 SERVER COMPONENTS                              │ │
│  │                                                                       │ │
│  │  src/app/page.tsx                 → Homepage (SSR)                   │ │
│  │  src/app/produto/[id]/page.tsx    → Detalhes (SSG)                   │ │
│  │                                                                       │ │
│  │  • Renderizam HTML no servidor                                       │ │
│  │  • Fazem fetch de dados direto                                       │ │
│  │  • Não aumentam bundle JS do cliente                                 │ │
│  └───────────────────────────┬───────────────────────────────────────────┘ │
│                              │                                             │
│                              │ Usa                                         │
│                              ▼                                             │
│  ┌───────────────────────────────────────────────────────────────────────┐ │
│  │                     ⚡ SERVER ACTIONS (use server)                    │ │
│  │                                                                       │ │
│  │  src/actions/product.actions.ts                                      │ │
│  │                                                                       │ │
│  │  • getProductsAction()          → Busca todos produtos               │ │
│  │  • getProductByIdAction()       → Busca produto específico           │ │
│  │  • searchProductsAction()       → Busca com termo                    │ │
│  │  • getCategoriesAction()        → Busca categorias                   │ │
│  │  • getProductsByCategoryAction() → Filtra por categoria              │ │
│  │  • revalidateProductsAction()   → Invalida cache                     │ │
│  │                                                                       │ │
│  │  Retorno: ActionResult<T> = { success, data } | { success, error }  │ │
│  └───────────────────────────┬───────────────────────────────────────────┘ │
│                              │                                             │
│                              │ Usa                                         │
│                              ▼                                             │
│  ┌───────────────────────────────────────────────────────────────────────┐ │
│  │                     🏢 SERVICES (Lógica de Negócio)                   │ │
│  │                                                                       │ │
│  │  src/services/product.service.ts                                     │ │
│  │                                                                       │ │
│  │  ProductService.getAllProducts(filters?)                             │ │
│  │       ├─► Aplica filtros (categoria, preço, busca)                   │ │
│  │       ├─► Aplica ordenação (preço, rating, nome)                     │ │
│  │       └─► Retorna Product[]                                          │ │
│  │                                                                       │ │
│  │  ProductService.getProductById(id)                                   │ │
│  │       ├─► Valida ID                                                  │ │
│  │       ├─► Busca produto                                              │ │
│  │       └─► Retorna Product                                            │ │
│  │                                                                       │ │
│  │  ProductService.getFeaturedProducts(limit)                           │ │
│  │       ├─► Busca todos produtos                                       │ │
│  │       ├─► Ordena por rating.rate                                     │ │
│  │       └─► Retorna top N produtos                                     │ │
│  │                                                                       │ │
│  │  ProductService.getCategories()                                      │ │
│  │       └─► Retorna string[]                                           │ │
│  │                                                                       │ │
│  │  ProductService.getStaticParams()                                    │ │
│  │       └─► Retorna { id: string }[] para SSG                          │ │
│  └───────────────────────────┬───────────────────────────────────────────┘ │
│                              │                                             │
│                              │ Usa                                         │
│                              ▼                                             │
│  ┌───────────────────────────────────────────────────────────────────────┐ │
│  │                     🔌 API CLIENT (HTTP Client)                       │ │
│  │                                                                       │ │
│  │  src/lib/api-client.ts                                               │ │
│  │                                                                       │ │
│  │  apiClient.get<T>(endpoint, options)                                 │ │
│  │       ├─► Adiciona headers padrão                                    │ │
│  │       ├─► Configura timeout (10s)                                    │ │
│  │       ├─► Retry automático (3x)                                      │ │
│  │       ├─► Backoff exponencial                                        │ │
│  │       ├─► Tratamento de erros                                        │ │
│  │       └─► Logging (dev only)                                         │ │
│  │                                                                       │ │
│  │  apiClient.post<T>(endpoint, data, options)                          │ │
│  │  apiClient.put<T>(endpoint, data, options)                           │ │
│  │  apiClient.delete<T>(endpoint, options)                              │ │
│  │                                                                       │ │
│  │  Features:                                                           │ │
│  │  • AbortController para timeout                                      │ │
│  │  • Retry com delay incremental                                       │ │
│  │  • Tipos genéricos <T> para type-safety                             │ │
│  │  • Error handling consistente                                        │ │
│  └───────────────────────────┬───────────────────────────────────────────┘ │
│                              │                                             │
│  ┌───────────────────────────┴───────────────────────────────────────────┐ │
│  │                     💾 NEXT.JS CACHE LAYER                            │ │
│  │                                                                       │ │
│  │  Cache de Dados (Data Cache)                                         │ │
│  │  ├─► next: { revalidate: 60 }     → Revalida a cada 60s             │ │
│  │  ├─► next: { tags: ['products'] }  → Revalidação por tags            │ │
│  │  └─► Cache automático entre requests                                 │ │
│  │                                                                       │ │
│  │  Cache de Rotas (Router Cache)                                       │ │
│  │  ├─► Páginas já visitadas                                            │ │
│  │  └─► Navegação instantânea (SPA)                                     │ │
│  │                                                                       │ │
│  │  Cache de Renderização (Full Route Cache)                            │ │
│  │  ├─► Páginas estáticas (SSG)                                         │ │
│  │  └─► generateStaticParams()                                          │ │
│  └───────────────────────────────────────────────────────────────────────┘ │
└──────────────────────────────┬──────────────────────────────────────────────┘
                               │
                               │ 🌍 HTTP GET Request
                               │
┌──────────────────────────────▼──────────────────────────────────────────────┐
│                        🔗 API EXTERNA                                       │
│                   https://fakestoreapi.com                                  │
│                                                                             │
│  GET /products              → Lista todos produtos (20 itens)               │
│  GET /products/:id          → Busca produto específico                      │
│  GET /products/categories   → Lista categorias                              │
│  GET /products/category/:c  → Produtos de uma categoria                     │
│                                                                             │
│  Retorno JSON: Product[]                                                    │
└─────────────────────────────────────────────────────────────────────────────┘


┌─────────────────────────────────────────────────────────────────────────────┐
│                        📦 TIPOS (TypeScript)                                │
│                                                                             │
│  src/types/product.ts                                                       │
│                                                                             │
│  interface Product {                                                        │
│    id: number;                                                              │
│    title: string;                                                           │
│    price: number;                                                           │
│    image: string;                                                           │
│    category: string;                                                        │
│    description: string;                                                     │
│    rating: { rate: number; count: number };                                 │
│  }                                                                          │
│                                                                             │
│  interface ProductFilters {                                                 │
│    category?: string;                                                       │
│    minPrice?: number;                                                       │
│    maxPrice?: number;                                                       │
│    search?: string;                                                         │
│    sortBy?: "price" | "rating" | "name";                                   │
│    sortOrder?: "asc" | "desc";                                              │
│  }                                                                          │
│                                                                             │
│  type ActionResult<T> =                                                     │
│    | { success: true; data: T }                                             │
│    | { success: false; error: string };                                     │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 🔄 Fluxo de Dados Completo

### Cenário 1: Usuário Acessa Homepage

```
1. Navegador
   └─► GET / (http://localhost:3000)

2. Next.js Server
   └─► Identifica rota: src/app/page.tsx (Server Component)

3. Executa Home()
   └─► const products = await ProductService.getAllProducts()

4. ProductService.getAllProducts()
   └─► return apiClient.get<Product[]>("/products")

5. apiClient.get()
   ├─► Verifica cache (60s TTL)
   │   ├─ Cache válido? → Retorna do cache ⚡
   │   └─ Cache expirado? → Continua...
   │
   ├─► fetch("https://fakestoreapi.com/products")
   ├─► Retry automático se falhar (3x)
   ├─► Valida resposta (response.ok)
   └─► return await response.json()

6. Retorna dados
   API → apiClient → ProductService → Home()

7. Home() renderiza HTML
   └─► <div><ProductCard />...</div>

8. Next.js envia resposta
   ├─► HTML: ~150KB (renderizado)
   ├─► CSS: ~50KB (Tailwind purged)
   └─► JS: ~200KB (React + Next.js)

9. Navegador renderiza
   ├─► Parse HTML (20ms)
   ├─► Aplica CSS (10ms)
   ├─► Carrega imagens (lazy)
   └─► React hidrata (100ms)

10. Página interativa! 🎉

⏱️ Tempo total: ~200-300ms (com cache: ~50ms)
```

---

### Cenário 2: Usuário Digita na Busca

```
1. SearchBar (Client Component)
   └─► onChange={(e) => handleSearch(e.target.value)}

2. handleSearch("shirt")
   └─► startTransition(async () => {
         const result = await searchProductsAction("shirt");
       })

3. searchProductsAction() [Server Action]
   └─► Executa NO SERVIDOR (not client!)
   └─► const products = await ProductService.getAllProducts({ search: "shirt" })

4. ProductService.getAllProducts({ search: "shirt" })
   ├─► Busca todos produtos (cache ou API)
   └─► Aplica filtro de busca:
       products.filter(p =>
         p.title.includes("shirt") ||
         p.description.includes("shirt") ||
         p.category.includes("shirt")
       )

5. Retorna resultado
   Service → Action → Client
   └─► { success: true, data: [...] }

6. SearchBar atualiza estado
   └─► setResults(result.data)

7. React re-renderiza
   └─► Mostra produtos filtrados

⏱️ Tempo: ~100-200ms
```

---

### Cenário 3: Usuário Clica em Produto

```
1. ProductCard
   └─► <Link href="/produto/5">

2. Next.js Router (Client-side)
   └─► Intercepta click (SPA navigation)
   └─► Muda URL: / → /produto/5

3. Verifica se página foi pré-gerada (SSG)
   ├─► SIM (generateStaticParams)
   │   └─► Carrega HTML estático (< 50ms) ⚡⚡⚡
   │
   └─► NÃO (fallback)
       └─► Renderiza sob demanda (SSR)

4. Se SSG (pré-gerado):
   └─► HTML já existe no build
   └─► Apenas hidrata

5. Se SSR (sob demanda):
   ├─► Executa ProductPage({ params: { id: "5" } })
   ├─► await ProductService.getProductById("5")
   ├─► apiClient.get("/products/5")
   ├─► Renderiza HTML
   └─► Retorna ao cliente

6. Transição suave
   └─► Sem reload completo
   └─► Sem flash branco
   └─► Navegação fluida

⏱️ Tempo SSG: ~50ms ⚡⚡⚡
⏱️ Tempo SSR: ~300ms ⚡
```

---

## 📊 Comparação de Performance

```
┌──────────────────────────────────────────────────────────────┐
│                  MÉTRICAS DE PERFORMANCE                     │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  Homepage (Server Component + Cache)                         │
│  ├─► TTFB (Time to First Byte): ~50ms                       │
│  ├─► FCP (First Contentful Paint): ~150ms                   │
│  ├─► LCP (Largest Contentful Paint): ~200ms                 │
│  └─► TTI (Time to Interactive): ~300ms                      │
│                                                              │
│  Página de Detalhes (SSG)                                    │
│  ├─► TTFB: ~20ms                                            │
│  ├─► FCP: ~80ms                                             │
│  ├─► LCP: ~120ms                                            │
│  └─► TTI: ~200ms                                            │
│                                                              │
│  Busca (Client Component + Server Action)                   │
│  ├─► Tempo de resposta: ~100-200ms                         │
│  ├─► Mantém UI responsiva (useTransition)                  │
│  └─► Sem flash de loading                                  │
│                                                              │
│  Bundle Size                                                 │
│  ├─► Total: ~200KB (gzipped: ~70KB)                        │
│  ├─► React: ~40KB                                           │
│  ├─► Next.js: ~40KB                                         │
│  ├─► App Code: ~20KB                                        │
│  ├─► Tailwind: ~40KB (purged)                              │
│  └─► Other: ~20KB                                           │
│                                                              │
│  Core Web Vitals (Lighthouse)                               │
│  ├─► Performance: 95-100                                    │
│  ├─► Accessibility: 100                                     │
│  ├─► Best Practices: 100                                    │
│  └─► SEO: 100                                               │
└──────────────────────────────────────────────────────────────┘
```

---

## 🎯 Decisões de Arquitetura

### Por que Services?
```
✅ Separação de concerns (UI vs lógica)
✅ Reutilização de código
✅ Testabilidade
✅ Manutenibilidade
✅ Refatoração mais fácil
```

### Por que Server Actions?
```
✅ Lógica no servidor (não exposta ao cliente)
✅ Bundle size menor
✅ Type-safe end-to-end
✅ Progressive Enhancement
✅ Simplicidade (sem API routes)
```

### Por que API Client?
```
✅ Retry automático
✅ Error handling consistente
✅ Timeout configurável
✅ Logging centralizado
✅ Fácil de testar e mockar
```

### Por que TypeScript?
```
✅ Type-safety em toda aplicação
✅ Autocomplete no IDE
✅ Refatoração segura
✅ Documentação inline
✅ Menos bugs em produção
```

---

**Última atualização:** 06/10/2025
