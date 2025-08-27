'use client';

import { useEffect, useState } from 'react';

export default function CanaryPage() {
  const [timestamp, setTimestamp] = useState('');

  useEffect(() => {
    setTimestamp(new Date().toISOString());
  }, []);

  return (
    <div className="container-page space-y-4">
      <h1 className="text-xl font-semibold">Canary OK</h1>
      <p className="text-sm">{timestamp}</p>
      <span className="inline-block rounded bg-green-600 px-2 py-1 text-xs font-medium">
        Demo Mode: ON
      </span>
    </div>
  );
}
