import { useCallback, useState } from 'react';
import RegisterCard from './RegisterCard.jsx';
import SkeletonCard from './SkeletonCard.jsx';
import { REGISTERS } from '../lib/registers.js';

function useClipboard() {
  const [copied, setCopied] = useState(null);
  const copy = useCallback((text, id) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(id);
      setTimeout(() => setCopied(null), 2000);
    });
  }, []);
  return { copied, copy };
}

export default function ResultsGrid({
  results,
  language,
  isLoading,
  collections,
  onSaveToCollection,
}) {
  const { copied, copy } = useClipboard();
  const registers = REGISTERS[language];

  if (isLoading) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {[0, 1, 2, 3].map((i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (!results) return null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {registers.map((reg) => (
        <RegisterCard
          key={reg.key}
          register={reg}
          data={results[reg.key]}
          copied={copied}
          onCopy={copy}
          collections={collections}
          onSaveToCollection={onSaveToCollection}
        />
      ))}
    </div>
  );
}
