// Script para verificar tabelas no banco Neon
import { config } from "dotenv";
import { PrismaClient } from "@prisma/client";

// Carregar variáveis de ambiente
config();

const prisma = new PrismaClient({
  datasourceUrl: process.env.DIRECT_URL, // Usa conexão direta
});

async function checkTables() {
  try {
    console.log("🔍 Verificando tabelas no banco...\n");

    // Contar registros em cada tabela
    const userCount = await prisma.user.count();
    const barbershopCount = await prisma.barbershop.count();
    const servicesCount = await prisma.barbershopServices.count();
    const bookingCount = await prisma.booking.count();

    console.log("📊 Resultado:");
    console.log(`✓ User: ${userCount} registros`);
    console.log(`✓ Barbershop: ${barbershopCount} registros`);
    console.log(`✓ BarbershopServices: ${servicesCount} registros`);
    console.log(`✓ Booking: ${bookingCount} registros`);
    console.log("\n✅ Todas as tabelas estão acessíveis!");
  } catch (error) {
    console.error("❌ Erro ao verificar tabelas:", error);
  } finally {
    await prisma.$disconnect();
  }
}

checkTables();
