// Exemplo de uso do Prisma em uma API Route do Next.js

import { prisma } from "@/app/_lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Buscar todas as barbearias
    const barbershops = await prisma.barbershop.findMany({});

    return NextResponse.json(barbershops);
  } catch (error) {
    console.error("Erro ao buscar barbearias:", error);
    return NextResponse.json(
      { error: "Erro ao buscar barbearias" },
      { status: 500 }
    );
  }
}
