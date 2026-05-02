import { REGISTERS } from '../lib/registers.js';

export default function CollectionModal({ collection, onClose, onDelete, onDeleteItem }) {
  if (!collection) return null;
  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'oklch(0% 0 0 / 0.35)',
        zIndex: 200,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'var(--parchment)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: '0 20px 60px oklch(0% 0 0 / 0.2)',
          width: '100%',
          maxWidth: '680px',
          maxHeight: '80vh',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            padding: '20px 24px',
            borderBottom: '1px solid var(--parchment-mid)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '18px' }}>📁</span>
            <h2
              style={{
                fontFamily: 'var(--serif)',
                fontSize: '20px',
                fontWeight: 400,
                color: 'var(--ink)',
              }}
            >
              {collection.name}
            </h2>
            <span
              style={{
                fontFamily: 'var(--sans)',
                fontSize: '12px',
                color: 'var(--ink-light)',
                background: 'var(--parchment-mid)',
                padding: '2px 8px',
                borderRadius: '20px',
              }}
            >
              {collection.items.length} saved
            </span>
          </div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <button
              onClick={() => onDelete(collection.id)}
              style={{
                background: 'transparent',
                border: '1px solid oklch(85% 0.08 26)',
                borderRadius: 'var(--radius)',
                padding: '5px 12px',
                cursor: 'pointer',
                fontFamily: 'var(--sans)',
                fontSize: '12px',
                color: 'var(--vermillion)',
              }}
            >
              Delete folder
            </button>
            <button
              onClick={onClose}
              style={{
                background: 'var(--parchment-mid)',
                border: 'none',
                borderRadius: 'var(--radius)',
                padding: '6px 14px',
                cursor: 'pointer',
                fontFamily: 'var(--sans)',
                fontSize: '13px',
                color: 'var(--ink)',
              }}
            >
              Done
            </button>
          </div>
        </div>

        <div
          style={{
            overflowY: 'auto',
            padding: '16px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          {collection.items.length === 0 ? (
            <p
              style={{
                fontFamily: 'var(--sans)',
                fontSize: '13px',
                color: 'var(--ink-light)',
                textAlign: 'center',
                padding: '24px',
                opacity: 0.7,
              }}
            >
              No saved translations yet
            </p>
          ) : (
            collection.items.map((item) => {
              const reg = REGISTERS[item.language]?.find((r) => r.key === item.registerKey);
              return (
                <div
                  key={item.id}
                  style={{
                    background: 'white',
                    borderRadius: 'var(--radius-lg)',
                    boxShadow: 'var(--shadow-card)',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      padding: '10px 16px',
                      background: 'var(--parchment)',
                      borderBottom: '1px solid var(--parchment-mid)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'baseline' }}>
                      <span
                        style={{
                          fontFamily: 'var(--sans)',
                          fontSize: '11px',
                          fontWeight: 600,
                          letterSpacing: '0.08em',
                          textTransform: 'uppercase',
                          color: reg?.color || 'var(--ink-mid)',
                        }}
                      >
                        {reg?.label}
                      </span>
                      <span
                        style={{
                          fontFamily: 'var(--serif)',
                          fontSize: '13px',
                          color: 'var(--ink-light)',
                        }}
                      >
                        {reg?.sublabel}
                      </span>
                      <span
                        style={{
                          fontFamily: 'var(--sans)',
                          fontSize: '11px',
                          color: 'var(--ink-light)',
                          background: 'var(--parchment-mid)',
                          padding: '1px 6px',
                          borderRadius: '10px',
                        }}
                      >
                        {item.language === 'ja' ? '日本語' : '한국어'}
                      </span>
                    </div>
                    <button
                      onClick={() => onDeleteItem(collection.id, item.id)}
                      onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
                      onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.5')}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '13px',
                        color: 'var(--ink-light)',
                        opacity: 0.5,
                        padding: '0 2px',
                      }}
                    >
                      ×
                    </button>
                  </div>
                  <div
                    style={{
                      padding: '14px 16px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '6px',
                    }}
                  >
                    <p
                      style={{
                        fontFamily: 'var(--sans)',
                        fontSize: '11px',
                        color: 'var(--ink-light)',
                      }}
                    >
                      "{item.sourceText}"
                    </p>
                    <p
                      style={{
                        fontFamily: 'var(--serif)',
                        fontSize: '18px',
                        fontWeight: 400,
                        color: 'var(--ink)',
                        lineHeight: 1.5,
                      }}
                    >
                      {item.data.translation}
                    </p>
                    {item.data.romanization && (
                      <p
                        style={{
                          fontFamily: 'var(--sans)',
                          fontSize: '12px',
                          color: 'var(--ink-mid)',
                          fontStyle: 'italic',
                        }}
                      >
                        {item.data.romanization}
                      </p>
                    )}
                    <p
                      style={{
                        fontFamily: 'var(--sans)',
                        fontSize: '12px',
                        color: 'var(--ink-light)',
                        lineHeight: 1.5,
                      }}
                    >
                      <span style={{ color: reg?.color, fontWeight: 600, marginRight: '4px' }}>↳</span>
                      {item.data.note}
                    </p>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
