import { useEffect, useRef, useState } from 'react';

export default function SaveMenu({ collections, onSave, onClose }) {
  const [newName, setNewName] = useState('');
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) onClose();
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [onClose]);

  return (
    <div
      ref={ref}
      style={{
        position: 'absolute',
        top: '100%',
        right: 0,
        marginTop: '4px',
        background: 'white',
        borderRadius: 'var(--radius-lg)',
        boxShadow:
          '0 8px 24px oklch(0% 0 0 / 0.12), 0 0 0 1px oklch(18% 0.02 55 / 0.08)',
        zIndex: 100,
        minWidth: '200px',
        overflow: 'hidden',
      }}
    >
      {collections.length > 0 && (
        <div style={{ padding: '8px 0', borderBottom: '1px solid var(--parchment-mid)' }}>
          <p
            style={{
              padding: '4px 14px 6px',
              fontFamily: 'var(--sans)',
              fontSize: '10px',
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--ink-light)',
            }}
          >
            Save to folder
          </p>
          {collections.map((c) => (
            <button
              key={c.id}
              onClick={() => onSave(c.id)}
              style={{
                display: 'block',
                width: '100%',
                textAlign: 'left',
                padding: '8px 14px',
                border: 'none',
                background: 'transparent',
                fontFamily: 'var(--sans)',
                fontSize: '13px',
                color: 'var(--ink)',
                cursor: 'pointer',
                transition: 'background 0.1s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--parchment)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
            >
              <span style={{ marginRight: '6px', opacity: 0.6 }}>📁</span>
              {c.name}
            </button>
          ))}
        </div>
      )}
      <div style={{ padding: '10px 12px', display: 'flex', gap: '6px' }}>
        <input
          autoFocus
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && newName.trim()) {
              onSave(null, newName.trim());
              setNewName('');
            }
          }}
          placeholder="New folder name…"
          style={{
            flex: 1,
            padding: '6px 10px',
            fontSize: '12px',
            fontFamily: 'var(--sans)',
            border: '1px solid var(--parchment-deep)',
            borderRadius: 'var(--radius)',
            outline: 'none',
            color: 'var(--ink)',
            background: 'var(--parchment)',
          }}
        />
        <button
          onClick={() => {
            if (newName.trim()) {
              onSave(null, newName.trim());
              setNewName('');
            }
          }}
          style={{
            padding: '6px 10px',
            background: 'var(--vermillion)',
            color: 'white',
            border: 'none',
            borderRadius: 'var(--radius)',
            fontSize: '12px',
            fontWeight: 600,
            cursor: 'pointer',
            fontFamily: 'var(--sans)',
          }}
        >
          + New
        </button>
      </div>
    </div>
  );
}
