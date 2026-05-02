const OPTIONS = [
  { code: 'ja', label: '日本語' },
  { code: 'ko', label: '한국어' },
];

export default function LanguageToggle({ value, onChange }) {
  return (
    <div
      style={{
        display: 'flex',
        background: 'var(--parchment-mid)',
        borderRadius: 'var(--radius)',
        padding: '3px',
        gap: '2px',
      }}
    >
      {OPTIONS.map((l) => {
        const active = value === l.code;
        return (
          <button
            key={l.code}
            onClick={() => onChange(l.code)}
            style={{
              background: active ? 'white' : 'transparent',
              border: 'none',
              borderRadius: '4px',
              padding: '6px 16px',
              cursor: 'pointer',
              fontFamily: 'var(--serif)',
              fontSize: '14px',
              fontWeight: active ? 600 : 400,
              color: active ? 'var(--ink)' : 'var(--ink-light)',
              boxShadow: active ? 'var(--shadow-sm)' : 'none',
              transition: 'all 0.15s ease',
            }}
          >
            {l.label}
          </button>
        );
      })}
    </div>
  );
}
