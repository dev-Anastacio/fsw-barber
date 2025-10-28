import { prisma } from "./prisma";

/**
 * Calcula a média de avaliações de uma barbearia
 * @param barbershopId - ID da barbearia
 * @returns Objeto com a média e o total de avaliações
 */
export async function getBarbershopRating(barbershopId: string) {
  const reviews = await prisma.review.findMany({
    where: { barbershopId },
    select: { rating: true },
  });

  if (reviews.length === 0) {
    return {
      average: 0,
      total: 0,
    };
  }

  const sum = reviews.reduce((acc: number, review) => acc + review.rating, 0);
  const average = sum / reviews.length;

  return {
    average: Number(average.toFixed(1)), // Ex: 4.5
    total: reviews.length,
  };
}

/**
 * Busca barbearia com média de avaliações calculada
 */
export async function getBarbershopWithRating(barbershopId: string) {
  const barbershop = await prisma.barbershop.findUnique({
    where: { id: barbershopId },
    include: {
      services: true,
      reviews: {
        include: {
          user: {
            select: {
              name: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  if (!barbershop) return null;

  const rating = await getBarbershopRating(barbershopId);

  return {
    ...barbershop,
    rating,
  };
}

/**
 * Busca todas as barbearias com rating calculado (otimizado para listagens)
 */
export async function getBarbershopsWithRating() {
  const barbershops = await prisma.barbershop.findMany({
    include: {
      reviews: {
        select: {
          rating: true,
        },
      },
    },
  });

  return barbershops.map((barbershop) => {
    const reviews = barbershop.reviews;
    const total = reviews.length;
    const average =
      total > 0
        ? Number(
            (
              reviews.reduce((acc, review) => acc + review.rating, 0) / total
            ).toFixed(1)
          )
        : 0;

    return {
      ...barbershop,
      rating: {
        average,
        total,
      },
    };
  });
}
