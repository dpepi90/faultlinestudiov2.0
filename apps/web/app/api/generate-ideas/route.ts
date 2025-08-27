import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const DEFAULT_CHANNEL_ID = '1'; // Usaremos um ID fixo para o canal padrão

export async function POST() {
  try {
    // LANCE 1: VERIFICAR E CRIAR O CANAL (A TORRE)
    // O 'upsert' é um comando inteligente: ele tenta encontrar um canal com o id '1'.
    // Se encontrar, não faz nada. Se não encontrar, ele cria um.
    await prisma.channel.upsert({
      where: { id: DEFAULT_CHANNEL_ID },
      update: {}, // Não queremos atualizar nada se ele já existir
      create: {
        id: DEFAULT_CHANNEL_ID,
        name: 'Faultline Economics Main',
        locale: 'en',
      },
    });

    // LANCE 2: CRIAR A IDEIA-MÃE (O PEÃO)
    const parentIdea = await prisma.idea.create({
      data: {
        channelId: DEFAULT_CHANNEL_ID, // Agora garantimos que este ID existe
        topic: 'Novas Ideias de Geopolítica Geradas por IA',
        status: 'Ideia',
      },
    });

    // LANCE 3: CRIAR OS CANDIDATOS A TÍTULO (OS OUTROS PEÕES)
    const generatedTitles = [
      { title: 'A Geopolítica dos Cabos Submarinos' },
      { title: 'Por que a Demografia da China é uma Bomba-Relógio' },
      { title: 'O Estreito de Malaca: O Ponto Mais Importante do Mundo' },
      { title: 'A Batalha pelos Semicondutores: EUA vs China' },
      { title: 'Rússia: Uma Potência em Declínio Irreversível?' },
    ];

    const titlesToCreate = generatedTitles.map(t => ({
      ...t,
      ideaId: parentIdea.id,
    }));

    await prisma.titleCandidate.createMany({
      data: titlesToCreate,
    });

    return NextResponse.json({ success: true, message: 'Canal verificado, 1 ideia e 5 títulos gerados!' });

  } catch (error) {
    console.error("Erro no fluxo de geração:", error);
    return new NextResponse(
      JSON.stringify({ success: false, error: 'Falha no fluxo de geração.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}