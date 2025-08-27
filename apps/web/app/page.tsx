'use client';

import { useState, useEffect } from 'react';
import { Shell } from '@/components/shell';
import { PageHeader, PageHeaderHeading, PageHeaderDescription } from '@/components/page-header';
import { IdeasTable } from '@/components/ideas-table';
import { Button } from '@/components/ui/button';

// ATENÇÃO: Este agora é o tipo para TitleCandidate
export type TitleIdea = {
  id: string;
  title: string;
  status: string | null;
  notes: string | null;
  createdAt: string;
};

export default function DashboardPage() {
  const [titleIdeas, setTitleIdeas] = useState<TitleIdea[]>([]); // Estado agora para Títulos
  const [loading, setLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);

  // A função agora busca os títulos da API
  const fetchTitles = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/ideas'); // A URL continua a mesma, mas o conteúdo é diferente
      if (!response.ok) throw new Error('Falha na resposta da rede');
      const data = await response.json();
      setTitleIdeas(data);
    } catch (error) {
      console.error("Erro ao carregar títulos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTitles();
  }, []);

  const handleGenerateIdeas = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch('/api/generate-ideas', { method: 'POST' });
      if (!response.ok) throw new Error('Falha ao gerar ideias');
      await fetchTitles(); // Atualiza a lista de títulos
    } catch (error) {
      console.error("Erro no processo de geração:", error);
      alert('Ocorreu um erro ao gerar as ideias.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Shell>
      <PageHeader>
        <div className="flex items-center justify-between">
          <div>
            <PageHeaderHeading>Candidatos a Título</PageHeaderHeading>
            <PageHeaderDescription>
              Aqui você pode gerenciar e desenvolver suas ideias de vídeo.
            </PageHeaderDescription>
          </div>
          <Button onClick={handleGenerateIdeas} disabled={isGenerating || loading}>
            {isGenerating ? 'Gerando...' : 'Gerar 5 Novos Títulos com IA'}
          </Button>
        </div>
      </PageHeader>
      <div className="space-y-8">
        {loading ? (
          <p>Carregando títulos do banco de dados...</p>
        ) : (
          <IdeasTable ideas={titleIdeas} />
        )}
      </div>
    </Shell>
  );
}