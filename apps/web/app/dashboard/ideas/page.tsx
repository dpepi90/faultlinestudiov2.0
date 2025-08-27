'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

type Idea = {
  id: string;
  title: string;
  createdAt: string;
};

const STORAGE_KEY = 'fe:ideas';

export default function Ideas() {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [toasts, setToasts] = useState<
    { id: number; message: string; variant: 'success' | 'error' }[]
  >([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        setIdeas(JSON.parse(raw));
      }
    } catch (e) {
      showToast('Failed to load ideas', 'error');
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(ideas));
    } catch {
      /* ignore */
    }
  }, [ideas]);

  function showToast(message: string, variant: 'success' | 'error') {
    const id = Date.now();
    setToasts((t) => [...t, { id, message, variant }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3000);
  }

  function generateIdeas() {
    try {
      const now = Date.now();
      const newIdeas: Idea[] = Array.from({ length: 10 }, (_, i) => ({
        id: crypto.randomUUID(),
        title: `Idea ${ideas.length + i + 1}`,
        createdAt: new Date(now + i).toISOString(),
      }));
      setIdeas((prev) =>
        [...newIdeas, ...prev].sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        ),
      );
      showToast('Generated 10 ideas', 'success');
    } catch (e) {
      showToast('Error generating ideas', 'error');
    }
  }

  return (
    <section className="card relative grid gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-[color:#d4af37] text-xl font-bold">Ideas Hub</h2>
        <span className="rounded bg-yellow-500 px-2 py-1 text-xs font-semibold text-black">
          Demo Mode
        </span>
      </div>

      <Button onClick={generateIdeas}>Generate Ideas</Button>

      {ideas.length === 0 ? (
        <div className="rounded-md border border-dashed p-8 text-center text-sm text-muted-foreground">
          No ideas yet. Click “Generate Ideas” to create some.
        </div>
      ) : (
        <ul className="divide-y divide-neutral-800">
          {ideas.map((i) => (
            <li key={i.id} className="py-3">
              <div className="font-semibold">{i.title}</div>
              <div className="text-xs opacity-70">
                {new Date(i.createdAt).toLocaleString()}
              </div>
            </li>
          ))}
        </ul>
      )}

      <div className="fixed bottom-4 right-4 space-y-2">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`rounded px-4 py-2 text-sm text-white ${
              t.variant === 'success' ? 'bg-green-600' : 'bg-red-600'
            }`}
          >
            {t.message}
          </div>
        ))}
      </div>
    </section>
  );
}

