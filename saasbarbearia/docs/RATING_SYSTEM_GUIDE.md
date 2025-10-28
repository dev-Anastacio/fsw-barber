# 🌟 Sistema de Avaliação (Rating) - Guia Completo

## 📋 Arquitetura Implementada

### 1. **Modelo de Dados (Prisma Schema)**

Foi criado um modelo `Review` para armazenar avaliações:

```prisma
model Review {
  id           String     @id @default(uuid())
  rating       Int        // 1 a 5 estrelas
  comment      String?    // Comentário opcional
  userId       String
  barbershopId String
  createdAt    DateTime   @default(now())
  updatedAt    DateTime   @updatedAt
  user         User       @relation(fields: [userId], references: [id])
  barbershop   Barbershop @relation(fields: [barbershopId], references: [id])
}
```

**Relacionamentos:**

- `User` → `reviews[]` (um usuário pode fazer várias avaliações)
- `Barbershop` → `reviews[]` (uma barbearia pode ter várias avaliações)

---

## 🔧 Como Funciona

### **Cálculo de Rating**

O rating é calculado dinamicamente:

1. Busca todas as avaliações de uma barbearia
2. Soma todos os valores de `rating` (1-5)
3. Divide pelo total de avaliações
4. Retorna média arredondada (ex: 4.5)

**Exemplo:**

- Avaliação 1: 5 estrelas
- Avaliação 2: 4 estrelas
- Avaliação 3: 5 estrelas
- **Média: (5+4+5)/3 = 4.7 ⭐**

---

## 🚀 Próximos Passos para Implementar

### **Etapa 1: Aplicar Migração do Prisma**

```bash
npx prisma migrate dev --name add_review_model
npx prisma generate
```

### **Etapa 2: Criar API para Avaliações**

Crie `app/api/reviews/route.ts`:

```typescript
import { NextResponse } from "next/server";
import { prisma } from "@/app/_lib/prisma";

// POST - Criar nova avaliação
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { rating, comment, userId, barbershopId } = body;

    // Validação
    if (!rating || rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: "Rating deve ser entre 1 e 5" },
        { status: 400 }
      );
    }

    // Verificar se usuário já avaliou essa barbearia
    const existingReview = await prisma.review.findFirst({
      where: {
        userId,
        barbershopId,
      },
    });

    if (existingReview) {
      // Atualizar avaliação existente
      const updated = await prisma.review.update({
        where: { id: existingReview.id },
        data: { rating, comment },
      });
      return NextResponse.json(updated);
    }

    // Criar nova avaliação
    const review = await prisma.review.create({
      data: {
        rating,
        comment,
        userId,
        barbershopId,
      },
    });

    return NextResponse.json(review, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar avaliação:", error);
    return NextResponse.json(
      { error: "Erro ao criar avaliação" },
      { status: 500 }
    );
  }
}
```

### **Etapa 3: Criar Componente de Formulário de Avaliação**

Crie `app/_components/review-form.tsx`:

```typescript
"use client";

import { useState } from "react";
import { StarIcon } from "lucide-react";
import { Button } from "./ui/Button";
import { cn } from "@/app/_lib/utils";

interface ReviewFormProps {
  barbershopId: string;
  userId: string;
  onSuccess?: () => void;
}

export function ReviewForm({ barbershopId, userId, onSuccess }: ReviewFormProps) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (rating === 0) {
      alert("Selecione uma nota de 1 a 5 estrelas");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          rating,
          comment,
          userId,
          barbershopId,
        }),
      });

      if (response.ok) {
        alert("Avaliação enviada com sucesso!");
        setRating(0);
        setComment("");
        onSuccess?.();
      } else {
        alert("Erro ao enviar avaliação");
      }
    } catch (error) {
      console.error(error);
      alert("Erro ao enviar avaliação");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="mb-2 block text-sm font-semibold">
          Avalie esta barbearia:
        </label>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoveredRating(star)}
              onMouseLeave={() => setHoveredRating(0)}
              className="transition-transform hover:scale-110"
            >
              <StarIcon
                size={32}
                className={cn(
                  star <= (hoveredRating || rating)
                    ? "fill-primary text-primary"
                    : "fill-muted text-muted"
                )}
              />
            </button>
          ))}
        </div>
        {rating > 0 && (
          <p className="mt-2 text-sm text-muted-foreground">
            Você selecionou {rating} {rating === 1 ? "estrela" : "estrelas"}
          </p>
        )}
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold">
          Comentário (opcional):
        </label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Conte sua experiência..."
          className="w-full rounded-md border p-3"
          rows={4}
        />
      </div>

      <Button type="submit" disabled={loading || rating === 0}>
        {loading ? "Enviando..." : "Enviar Avaliação"}
      </Button>
    </form>
  );
}
```

### **Etapa 4: Exibir Avaliações**

Adicione na página `app/barbershops/[id]/page.tsx`:

```typescript
<div className="p-5">
  <h2 className="mb-4 text-lg font-bold">Avaliações</h2>

  {barbershop.reviews.length === 0 ? (
    <p className="text-sm text-gray-400">Nenhuma avaliação ainda.</p>
  ) : (
    <div className="space-y-4">
      {barbershop.reviews.map((review) => (
        <div key={review.id} className="rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <p className="font-semibold">{review.user.name}</p>
            <RatingStars rating={review.rating} size={14} showNumber={false} />
          </div>
          {review.comment && (
            <p className="mt-2 text-sm text-gray-600">{review.comment}</p>
          )}
          <p className="mt-2 text-xs text-gray-400">
            {new Date(review.createdAt).toLocaleDateString("pt-BR")}
          </p>
        </div>
      ))}
    </div>
  )}
</div>
```

---

## 📊 Atualizar Componente BarbershopItem

No arquivo `app/_components/barbershop-item.tsx`, você pode calcular o rating em tempo real:

```typescript
import { getBarbershopRating } from "@/app/_lib/rating";
import { RatingStars } from "./ui/rating-stars";

// Na renderização:
const rating = await getBarbershopRating(barbershop.id);

<RatingStars
  rating={rating.average}
  size={12}
  className="mt-2"
/>
```

---

## 🎯 Resumo

**Fluxo Completo:**

1. Cliente faz um agendamento
2. Após o serviço, pode avaliar (1-5 estrelas + comentário)
3. Sistema salva no banco de dados (model `Review`)
4. Rating é calculado dinamicamente (média de todas as avaliações)
5. Exibido nas listagens e página da barbearia

**Benefícios:**

- ✅ Sistema dinâmico baseado em avaliações reais
- ✅ Permite comentários dos clientes
- ✅ Atualização automática da média
- ✅ Histórico completo de avaliações
