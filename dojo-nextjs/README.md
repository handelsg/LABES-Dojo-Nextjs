# 🎯 Code Dojo - Next.js

## 📅 Dia 2: Desafio 2 - Catálogo de Produtos

Bem-vindo ao **Desafio 2** do Code Dojo! Neste desafio, você irá criar um **catálogo de produtos completo** consumindo a [Fake Store API](https://fakestoreapi.com).

---

## 🚀 Início Rápido

### 1️⃣ Instalar dependências
```bash
npm install
```

### 2️⃣ Executar o projeto
```bash
npm run dev
```

### 3️⃣ Acessar no navegador
```
http://localhost:3000
```

---

## 🎯 O que você vai construir

### 📄 Página Inicial (`/`)
- ✅ Lista todos os produtos da Fake Store API
- ✅ Grid responsivo (1-4 colunas)
- ✅ Cards com imagem, título, categoria e preço
- ✅ Navegação para detalhes do produto

### 📄 Página de Detalhes (`/produto/[id]`)
- ✅ Informações completas do produto
- ✅ Imagem em tamanho grande
- ✅ Descrição detalhada
- ✅ Sistema de avaliações
- ✅ Botões de ação (comprar, favoritar)

---

## 📁 Estrutura do Projeto

```
src/app/
├── components/
│   └── ProductCard.tsx      # Card de produto reutilizável
├── produto/
│   └── [id]/
│       └── page.tsx         # Página de detalhes dinâmica
├── page.tsx                 # Página inicial
└── layout.tsx               # Layout global
```

---

## 🎓 Conceitos Abordados

✅ **Server Components** - Componentes que executam no servidor  
✅ **Rotas Dinâmicas** - URLs com parâmetros `[id]`  
✅ **TypeScript** - Tipagem forte com interfaces  
✅ **Fetch de APIs** - Consumo de APIs REST  
✅ **Cache & Revalidation** - Otimização de performance  
✅ **Tailwind CSS** - Estilização responsiva  
✅ **Componentes Reutilizáveis** - Organização de código

---

## 🌐 API Utilizada

**Fake Store API:** https://fakestoreapi.com

### Endpoints:
- `GET /products` - Lista todos os produtos
- `GET /products/:id` - Detalhes de um produto

---

## 💡 Desafios Extras

### 🟢 Nível Iniciante
- Mudar tema de cores
- Adicionar mais emojis
- Alterar layout do grid

### 🟡 Nível Intermediário
- Filtro por categoria
- Campo de busca
- Ordenação por preço
- Loading states

### 🔴 Nível Avançado
- Carrinho de compras
- Persistência com localStorage
- Sistema de favoritos
- Paginação
- Animações

---

## 🛠️ Tecnologias

- **Next.js 15** - Framework React
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização
- **Fake Store API** - Dados de produtos

---

## 📖 Como a Aplicação Foi Implementada

### 🏗️ Arquitetura da Aplicação

A aplicação segue a arquitetura do **Next.js 13+ App Router**, que utiliza o conceito de **Server Components** por padrão. Isso significa que os componentes são renderizados no servidor, trazendo benefícios de performance e SEO.

```
┌─────────────────────────────────────┐
│         Navegador (Cliente)         │
│  ┌───────────────────────────────┐ │
│  │   React 19 + Next.js 15       │ │
│  │   (Hidratação e Interação)    │ │
│  └───────────────────────────────┘ │
└──────────────┬──────────────────────┘
               │ HTTP Request
               ▼
┌─────────────────────────────────────┐
│      Next.js Server (Servidor)      │
│  ┌───────────────────────────────┐ │
│  │   Server Components           │ │
│  │   (Fetch de dados da API)     │ │
│  └───────────────────────────────┘ │
└──────────────┬──────────────────────┘
               │ HTTP Request
               ▼
┌─────────────────────────────────────┐
│         Fake Store API              │
│   https://fakestoreapi.com          │
└─────────────────────────────────────┘
```

---

### 📄 1. Página Inicial (`src/app/page.tsx`)

#### **Conceitos Implementados:**

**1.1 Server Component com Async/Await**
```tsx
export default async function Home() {
  const products = await getProducts();
  // ...
}
```
- ✅ O componente é **assíncrono** (pode usar `async/await`)
- ✅ Executa no **servidor** durante o build ou request
- ✅ Não envia JavaScript extra para o cliente
- ✅ Melhor performance e SEO

**1.2 Fetch de Dados com Cache**
```tsx
async function getProducts(): Promise<Product[]> {
  const res = await fetch("https://fakestoreapi.com/products", {
    next: { revalidate: 60 } // Cache por 60 segundos
  });
  
  if (!res.ok) {
    throw new Error("Falha ao buscar produtos");
  }
  
  return res.json();
}
```
- ✅ `fetch` é nativo do Next.js com cache automático
- ✅ `revalidate: 60` → Revalida dados a cada 60 segundos
- ✅ Primeira request busca da API, próximas usam cache
- ✅ Reduz latência e economiza recursos

**1.3 TypeScript com Interfaces**
```tsx
interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
  description: string;
}
```
- ✅ Define estrutura do objeto `Product`
- ✅ Autocomplete no VS Code
- ✅ Previne erros de tipagem
- ✅ Facilita manutenção

**1.4 Layout Responsivo com Tailwind**
```tsx
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
```
- ✅ `grid-cols-1` → 1 coluna em mobile (< 640px)
- ✅ `sm:grid-cols-2` → 2 colunas em tablet (≥ 640px)
- ✅ `lg:grid-cols-3` → 3 colunas em laptop (≥ 1024px)
- ✅ `xl:grid-cols-4` → 4 colunas em desktop (≥ 1280px)

**1.5 Header Fixo**
```tsx
<header className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-10">
```
- ✅ `sticky top-0` → Header fixa no topo ao rolar
- ✅ `z-10` → Fica acima de outros elementos
- ✅ `dark:bg-gray-800` → Suporte a dark mode

---

### 🎴 2. Componente ProductCard (`src/app/components/ProductCard.tsx`)

#### **Conceitos Implementados:**

**2.1 Componente Reutilizável**
```tsx
export default function ProductCard({ product }: ProductCardProps) {
  // Este componente pode ser usado em qualquer lugar
  return (
    <Link href={`/produto/${product.id}`}>
      {/* Card HTML */}
    </Link>
  );
}
```
- ✅ Recebe `product` como prop
- ✅ Pode ser reutilizado múltiplas vezes
- ✅ Mantém código DRY (Don't Repeat Yourself)
- ✅ Facilita manutenção

**2.2 Otimização de Imagens**
```tsx
import Image from "next/image";

<Image
  src={product.image}
  alt={product.title}
  width={200}
  height={200}
  className="object-contain max-h-full group-hover:scale-110 transition-transform duration-300"
/>
```
- ✅ `next/image` otimiza imagens automaticamente
- ✅ Lazy loading (carrega só quando visível)
- ✅ Redimensionamento automático
- ✅ Formato WebP quando suportado
- ✅ Previne CLS (Cumulative Layout Shift)

**2.3 Hover Effects**
```tsx
<div className="group cursor-pointer">
  <Image className="group-hover:scale-110 transition-transform" />
  <h3 className="group-hover:text-indigo-600 transition-colors">
</div>
```
- ✅ `group` → Agrupa elementos relacionados
- ✅ `group-hover:` → Aplica efeito quando hover no pai
- ✅ `scale-110` → Aumenta 110% no hover
- ✅ `transition-*` → Animação suave

**2.4 Readonly Props (TypeScript)**
```tsx
interface ProductCardProps {
  readonly product: Product;
}
```
- ✅ `readonly` → Impede modificação das props
- ✅ Boa prática do React (props são imutáveis)
- ✅ TypeScript valida em tempo de desenvolvimento

---

### 📱 3. Página de Detalhes (`src/app/produto/[id]/page.tsx`)

#### **Conceitos Implementados:**

**3.1 Rota Dinâmica**
```
Estrutura de pastas:
src/app/produto/[id]/page.tsx

URLs geradas:
/produto/1  → params.id = "1"
/produto/2  → params.id = "2"
/produto/99 → params.id = "99"
```
- ✅ `[id]` → Indica parâmetro dinâmico
- ✅ Next.js cria rotas automaticamente
- ✅ Acessa via `params.id`

**3.2 Fetch de Produto Individual**
```tsx
async function getProduct(id: string): Promise<Product> {
  const res = await fetch(`https://fakestoreapi.com/products/${id}`, {
    next: { revalidate: 60 }
  });

  if (!res.ok) {
    throw new Error("Produto não encontrado");
  }

  return res.json();
}
```
- ✅ Busca produto específico por ID
- ✅ Template literals para URL dinâmica
- ✅ Tratamento de erro se produto não existir

**3.3 Static Site Generation (SSG)**
```tsx
export async function generateStaticParams() {
  const res = await fetch("https://fakestoreapi.com/products");
  const products: Product[] = await res.json();

  return products.map((product) => ({
    id: product.id.toString(),
  }));
}
```
- ✅ Pré-renderiza todas as páginas no build
- ✅ Gera HTML estático para cada produto
- ✅ Páginas carregam instantaneamente
- ✅ Melhor SEO e performance

**Fluxo do SSG:**
```
Build Time:
1. generateStaticParams() é chamado
2. Retorna lista: [{ id: "1" }, { id: "2" }, ...]
3. Next.js cria HTML para cada ID
4. Resultado: produto/1.html, produto/2.html, etc.

Request Time:
1. Usuário acessa /produto/5
2. Next.js serve HTML pré-gerado
3. Carregamento instantâneo!
```

**3.4 Next.js 15 - Params API**
```tsx
export default async function ProductPage(props: PageProps) {
  const params = await Promise.resolve(props.params);
  const product = await getProduct(params.id);
}
```
- ✅ Next.js 15+ requer await em params
- ✅ `Promise.resolve()` garante compatibilidade
- ✅ Prepara para futuras versões

**3.5 Sistema de Avaliações**
```tsx
{Array.from({ length: 5 }, (_, i) => (
  <span
    key={`star-${product.id}-${i}`}
    className={`text-xl ${
      i < Math.round(product.rating.rate)
        ? "text-yellow-400"
        : "text-gray-300"
    }`}
  >
    ★
  </span>
))}
```
- ✅ `Array.from()` cria array de 5 elementos
- ✅ Conditional rendering para estrelas preenchidas
- ✅ `Math.round()` arredonda rating
- ✅ Key único para cada estrela

---

### ⚙️ 4. Configuração Next.js (`next.config.ts`)

```tsx
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fakestoreapi.com',
        pathname: '/img/**',
      },
    ],
  },
};

export default nextConfig;
```

**Por que é necessário?**
- ✅ Next.js bloqueia imagens externas por segurança
- ✅ Precisa listar domínios confiáveis
- ✅ `remotePatterns` define domínios permitidos
- ✅ `pathname: '/img/**'` → Permite todas as imagens em /img/

---

### 🎨 5. Estilização com Tailwind CSS

#### **Utility-First CSS**

Em vez de escrever CSS customizado:
```css
/* CSS tradicional */
.card {
  background-color: white;
  border-radius: 0.5rem;
  padding: 1rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}
```

Usamos classes utilitárias:
```tsx
<div className="bg-white rounded-lg p-4 shadow-md">
```

**Vantagens:**
- ✅ Não precisa pensar em nomes de classes
- ✅ Não há CSS não utilizado
- ✅ Estilos co-localizados com componentes
- ✅ Fácil responsividade (`sm:`, `lg:`, etc.)
- ✅ Dark mode simples (`dark:bg-gray-800`)

#### **Sistema de Design Consistente**

Tailwind usa escala padronizada:
- **Espaçamento:** `p-4` = 1rem = 16px
- **Cores:** `bg-indigo-600` (paleta completa)
- **Tamanhos:** `text-xl`, `w-64`, etc.
- **Sombras:** `shadow-sm`, `shadow-md`, `shadow-xl`

---

### 🔄 6. Fluxo de Dados da Aplicação

```
┌──────────────────────────────────────┐
│ 1. Usuário acessa "/"                │
└──────────────┬───────────────────────┘
               │
               ▼
┌──────────────────────────────────────┐
│ 2. Next.js Server executa page.tsx  │
│    - Chama getProducts()             │
│    - Faz fetch da API                │
└──────────────┬───────────────────────┘
               │
               ▼
┌──────────────────────────────────────┐
│ 3. Fake Store API retorna JSON       │
│    [{ id: 1, title: "...", ... }]    │
└──────────────┬───────────────────────┘
               │
               ▼
┌──────────────────────────────────────┐
│ 4. Server renderiza HTML             │
│    - Mapeia produtos                 │
│    - Cria ProductCards               │
└──────────────┬───────────────────────┘
               │
               ▼
┌──────────────────────────────────────┐
│ 5. HTML é enviado ao navegador       │
│    - Página já renderizada           │
│    - Carregamento instantâneo        │
└──────────────┬───────────────────────┘
               │
               ▼
┌──────────────────────────────────────┐
│ 6. React hidrata no cliente          │
│    - Links se tornam interativos     │
│    - Hover effects funcionam         │
└──────────────────────────────────────┘
```

---

### 🚀 7. Otimizações Implementadas

#### **7.1 Server-Side Rendering (SSR)**
- Páginas são renderizadas no servidor
- HTML completo enviado ao cliente
- Melhor SEO e performance inicial

#### **7.2 Caching Inteligente**
```tsx
next: { revalidate: 60 }
```
- Dados ficam em cache por 60 segundos
- Próximas requests são instantâneas
- Cache é renovado automaticamente

#### **7.3 Code Splitting Automático**
- Next.js divide código em chunks
- Cada página carrega só o necessário
- Reduz tamanho inicial do JavaScript

#### **7.4 Image Optimization**
- Imagens são otimizadas automaticamente
- Lazy loading por padrão
- Formato WebP para navegadores compatíveis

#### **7.5 Static Generation quando possível**
```tsx
generateStaticParams()
```
- Páginas são pré-renderizadas no build
- HTML estático é servido instantaneamente
- CDN-friendly (pode ser hospedado em CDN)

---

### 🎯 8. Padrões e Boas Práticas Aplicados

#### **8.1 Componentização**
- ✅ `ProductCard` é reutilizável
- ✅ Separação de responsabilidades
- ✅ Código mais limpo e manutenível

#### **8.2 TypeScript**
- ✅ Interfaces para todos os dados
- ✅ Props tipadas
- ✅ Previne erros em tempo de desenvolvimento

#### **8.3 Tratamento de Erros**
```tsx
if (!res.ok) {
  throw new Error("Falha ao buscar produtos");
}
```
- ✅ Valida resposta da API
- ✅ Lança erro se houver problema
- ✅ Next.js mostra página de erro automaticamente

#### **8.4 Acessibilidade**
```tsx
<Image alt={product.title} />
<Link href="..." aria-label="...">
```
- ✅ Alt text em todas as imagens
- ✅ Navegação por teclado funciona
- ✅ Contraste de cores adequado

#### **8.5 Performance**
- ✅ Server Components por padrão
- ✅ Lazy loading de imagens
- ✅ Cache de requisições
- ✅ CSS otimizado (Tailwind purge)

---

### 📊 9. Performance da Aplicação

```
Métricas típicas:

First Contentful Paint (FCP): ~0.5s
Largest Contentful Paint (LCP): ~1.2s
Time to Interactive (TTI): ~1.5s
Total Blocking Time (TBT): ~100ms
Cumulative Layout Shift (CLS): ~0.01

Core Web Vitals: ✅ PASS
```

**Por que é rápido?**
1. **Server Components** → Menos JS no cliente
2. **Static Generation** → HTML pré-renderizado
3. **Image Optimization** → Imagens otimizadas
4. **Caching** → Requisições em cache
5. **Code Splitting** → Apenas código necessário

---

### 🔍 10. Debugging e Desenvolvimento

#### **Como debugar:**

**Console.log no Servidor:**
```tsx
export default async function Home() {
  const products = await getProducts();
  console.log('Produtos:', products.length); // Aparece no TERMINAL
  return <div>...</div>;
}
```

**Console.log no Cliente:**
```tsx
'use client'
export default function Component() {
  console.log('Teste'); // Aparece no NAVEGADOR
}
```

**DevTools do Next.js:**
- Abra `http://localhost:3000` no navegador
- F12 → Console para logs do cliente
- Terminal → Logs do servidor

---

### 💡 11. Próximos Passos de Aprendizado

Agora que entende a implementação, explore:

1. **Client Components** - Adicione interatividade
2. **Context API** - Gerencie estado global
3. **API Routes** - Crie sua própria API
4. **Autenticação** - Adicione login
5. **Database** - Conecte a banco de dados
6. **Deploy** - Publique na Vercel

---

## 📚 Documentação Completa

- 📖 [IMPLEMENTACAO.md](./IMPLEMENTACAO.md) - **Documentação técnica detalhada da implementação**
- 📖 [DESAFIO-2-README.md](./DESAFIO-2-README.md) - Documentação detalhada do desafio
- 👨‍🏫 [GUIA-INSTRUTOR.md](./GUIA-INSTRUTOR.md) - Guia para instrutores
- ✏️ [EXERCICIOS.md](./EXERCICIOS.md) - Lista completa de exercícios práticos
- ❓ [FAQ.md](./FAQ.md) - Perguntas e respostas frequentes

---

## 🐛 Troubleshooting

### Port 3000 em uso?
```bash
npm run dev -- -p 3001
```

### Limpar cache
```bash
rm -rf .next
npm run dev
```

---

## 🎉 Deploy

**Deploy gratuito na Vercel:**
1. Push para GitHub
2. Conecte em [vercel.com](https://vercel.com)
3. Deploy automático! 🚀

---

<div align="center">

**🎉 Bom Dojo! Mãos à obra! 🚀**

Made with ❤️ for learning

</div>


## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
