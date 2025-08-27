'use client';

import { TitleIdea } from '@/app/page'; // Importa o novo tipo 'TitleIdea'

interface IdeasTableProps {
  ideas: TitleIdea[]; // A tabela agora recebe uma lista de TitleIdea
}

export function IdeasTable({ ideas }: IdeasTableProps) {
  if (ideas.length === 0) {
    return (
      <div className="flex items-center justify-center rounded-md border border-dashed p-8 text-center">
        <div className="flex flex-col items-center gap-1 text-center">
          <h3 className="text-2xl font-bold tracking-tight">
            Você ainda não tem nenhum título.
          </h3>
          <p className="text-sm text-muted-foreground">
            Clique no botão para gerar novos títulos com a IA.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <table className="min-w-full divide-y divide-border">
        <thead className="bg-muted/50">
          <tr>
            <th scope="col" className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
              Título
            </th>
            <th scope="col" className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
              Status
            </th>
            <th scope="col" className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
              Data de Criação
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border bg-background">
          {ideas.map((idea) => (
            <tr key={idea.id}>
              <td className="px-4 py-3 text-sm font-medium">{idea.title}</td>
              <td className="px-4 py-3 text-sm text-muted-foreground">{idea.status}</td>
              <td className="px-4 py-3 text-sm text-muted-foreground">
                {new Date(idea.createdAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}