import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Esta API agora busca os TÍTULOS, não as ideias.
export async function GET() {
  try {
    const titles = await prisma.titleCandidate.findMany({
      orderBy: {
        createdAt: 'desc', // Ordena para mostrar os mais recentes primeiro
      },
    });
    return NextResponse.json(titles);
  } catch (error) {
    console.error("Erro ao buscar títulos:", error);
    return new NextResponse(
      JSON.stringify({ error: 'Falha ao buscar os títulos.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}