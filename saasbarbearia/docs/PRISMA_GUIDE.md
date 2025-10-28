# 🚀 Configuração do Prisma Accelerate

## 📁 Estrutura de Arquivos

```
saasbarbearia/
├── lib/
│   └── prisma.ts          # ✅ Instância do Prisma com Accelerate
├── app/
│   ├── api/
│   │   └── barbershops/
│   │       └── route.ts   # Exemplo: API Route
│   └── barbershops/
│       └── page.tsx       # Exemplo: Server Component
```

## 🔌 Como Usar

### 1. Importar o Prisma

Em qualquer lugar da aplicação (API Routes, Server Components, Server Actions):

```typescript
import { prisma } from "@/lib/prisma";
```

### 2. Usar em API Routes

```typescript
// app/api/users/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const users = await prisma.user.findMany();
  return NextResponse.json(users);
}
```

### 3. Usar em Server Components

```typescript
// app/page.tsx
import { prisma } from "@/lib/prisma";

export default async function Home() {
  const barbershops = await prisma.barbershop.findMany();

  return <div>{/* Renderizar barbearias */}</div>;
}
```

### 4. Usar em Server Actions

```typescript
// app/actions.ts
"use server";

import { prisma } from "@/lib/prisma";

export async function createUser(data: { name: string; email: string }) {
  return await prisma.user.create({ data });
}
```

## 🚀 Cache do Accelerate

O Prisma Accelerate permite adicionar cache nas queries:

```typescript
const barbershops = await prisma.barbershop.findMany({
  cacheStrategy: {
    ttl: 60, // Cache por 60 segundos
    swr: 120, // Stale-while-revalidate por 120 segundos
  },
});
```

### Estratégias de Cache:

- **`ttl`** (Time To Live): Tempo em segundos que o cache permanece válido
- **`swr`** (Stale While Revalidate): Tempo em segundos para retornar cache antigo enquanto busca novo

## ⚠️ Importante

### ❌ NÃO usar no Client Components

```typescript
// ❌ ERRADO - Client Component
"use client";

import { prisma } from "@/lib/prisma"; // NUNCA faça isso!

export default function MyComponent() {
  // Prisma não funciona no cliente
}
```

### ✅ Usar apenas no Servidor

- ✅ Server Components (padrão no Next.js App Router)
- ✅ API Routes (`app/api/**/route.ts`)
- ✅ Server Actions (funções com `'use server'`)

## 🔐 Variáveis de Ambiente

Certifique-se que o `.env` tem:

```env
DATABASE_URL="prisma+postgres://accelerate.prisma-data.net/?api_key=SEU_API_KEY"
```

## 📦 Dependências Necessárias

```bash
npm install @prisma/client @prisma/extension-accelerate
npm install -D prisma
```

## 🏃 Próximos Passos

1. Execute as migrações:

   ```bash
   npx prisma migrate dev
   ```

2. Gere o cliente Prisma:

   ```bash
   npx prisma generate --no-engine
   ```

3. Execute o seed (opcional):

   ```bash
   npx prisma db seed
   ```

4. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

## 🎯 Benefícios do Accelerate

- ⚡ Cache global de queries
- 🌍 Connection pooling otimizado
- 🚀 Melhor performance em Edge Functions
- 📈 Escalabilidade automática
- 🔒 Conexões seguras

---

Agora você pode usar `import { prisma } from '@/lib/prisma'` em qualquer Server Component ou API Route! 🎉
