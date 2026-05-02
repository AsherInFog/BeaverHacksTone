import { useState } from 'react';
import SaveMenu from './SaveMenu.jsx';

export default function RegisterCard({
  register,
  data,
  copied,
  onCopy,
  collections,
  onSaveToCollection,
}) {
  const [showSaveMenu, setShowSaveMenu] = useState(false);
  const cardId = register.key;
  const isCopied = copied === cardId;
  const accentColor = register.color;

  return (
    <div
      style={{
        background: 'white',
        borderRadius: 'var(--radius-lg)',
        boxShadow: 'var(--shadow-card)',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'stretch',
        transition: 'box-shadow 0.2s ease',
        position: 'relative',
        overflow: 'visible',
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.boxShadow =
          '0 4px 16px oklch(18% 0.02 55 / 0.11), 0 0 0 1px oklch(18% 0.02 55 / 0.08)')
      }
      onMouseLeave={(e) => (e.currentTarget.style.boxShadow = 'var(--shadow-card)')}
    >
      {/* Left label column */}
      <div
        style={{
          width: '120px',
          flexShrink: 0,
          borderRight: '1px solid var(--parchment-mid)',
          background: 'var(--parchment)',
          borderRadius: 'var(--radius-lg) 0 0 var(--radius-lg)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '16px 18px',
          gap: '4px',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--sans)',
            fontWeight: 600,
            fontSize: '12px',
            letterSpacing: '0.07em',
            textTransform: 'uppercase',
            color: accentColor,
          }}
        >
          {register.label}
        </span>
        <span
          style={{
            fontFamily: 'var(--serif)',
            fontSize: '15px',
            color: 'var(--ink-light)',
            fontWeight: 400,
          }}
        >
          {register.sublabel}
        </span>
      </div>

      {/* Middle: translation + romanization */}
      <div
        style={{
          flex: 1,
          padding: '16px 20px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: '4px',
          minWidth: 0,
        }}
      >
        <p
          style={{
            fontFamily: 'var(--serif)',
            fontSize: '20px',
            fontWeight: 400,
            lineHeight: 1.45,
            color: 'var(--ink)',
            letterSpacing: '0.01em',
            textWrap: 'pretty',
          }}
        >
          {data.translation}
        </p>
        {data.romanization && (
          <p
            style={{
              fontFamily: 'var(--sans)',
              fontSize: '12.5px',
              color: 'var(--ink-mid)',
              fontStyle: 'italic',
            }}
          >
            {data.romanization}
          </p>
        )}
      </div>

      {/* Right: note + actions */}
      <div
        style={{
          width: '260px',
          flexShrink: 0,
          borderLeft: '1px solid var(--parchment-mid)',
          padding: '16px 18px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: '10px',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--sans)',
            fontSize: '12px',
            color: 'var(--ink-light)',
            lineHeight: 1.55,
            textWrap: 'pretty',
            flex: 1,
          }}
        >
          <span style={{ color: accentColor, fontWeight: 600, marginRight: '4px' }}>↳</span>
          {data.note}
        </p>
        <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end' }}>
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setShowSaveMenu((v) => !v)}
              style={{
                background: 'transparent',
                border: '1px solid var(--parchment-deep)',
                borderRadius: 'var(--radius)',
                padding: '4px 9px',
                cursor: 'pointer',
                fontSize: '11px',
                fontFamily: 'var(--sans)',
                fontWeight: 500,
                color: 'var(--ink-light)',
                transition: 'all 0.15s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--gold)';
                e.currentTarget.style.color = 'var(--gold)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--parchment-deep)';
                e.currentTarget.style.color = 'var(--ink-light)';
              }}
            >
              Save
            </button>
            {showSaveMenu && (
              <SaveMenu
                collections={collections}
                onSave={(colId, newName) => {
                  onSaveToCollection(colId, newName, register, data);
                  setShowSaveMenu(false);
                }}
                onClose={() => setShowSaveMenu(false)}
              />
            )}
          </div>
          <button
            onClick={() => onCopy(data.translation, cardId)}
            style={{
              background: isCopied ? 'var(--vermillion-pale)' : 'transparent',
              border: `1px solid ${isCopied ? 'var(--vermillion-soft)' : 'var(--parchment-deep)'}`,
              borderRadius: 'var(--radius)',
              padding: '4px 10px',
              cursor: 'pointer',
              fontSize: '11px',
              fontFamily: 'var(--sans)',
              fontWeight: 500,
              color: isCopied ? 'var(--vermillion)' : 'var(--ink-light)',
              transition: 'all 0.15s',
            }}
          >
            {isCopied ? '✓ Copied' : 'Copy'}
          </button>
        </div>
      </div>
    </div>
  );
}
