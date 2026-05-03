import { useState } from 'react';

export default function Sidebar({
  history,
  collections,
  onRestoreHistory,
  onDeleteHistory,
  onOpenCollection,
  onCreateCollection,
  activeSection,
  setActiveSection,
}) {
  const [showNewFolder, setShowNewFolder] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');

  const submitNewFolder = () => {
    if (!newFolderName.trim()) return;
    onCreateCollection(newFolderName);
    setNewFolderName('');
    setShowNewFolder(false);
  };

  return (
    <aside
      className="tone-sidebar"
      style={{
        width: 'var(--sidebar-w)',
        borderRight: '1px solid var(--parchment-mid)',
        background: 'var(--parchment)',
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0,
        overflowY: 'auto',
      }}
    >
      <div style={{ display: 'flex', borderBottom: '1px solid var(--parchment-mid)', padding: '0 4px' }}>
        {['History', 'Saved'].map((tab) => {
          const active = activeSection === tab;
          return (
            <button
              key={tab}
              onClick={() => setActiveSection(tab)}
              style={{
                flex: 1,
                padding: '13px 4px',
                border: 'none',
                borderBottom: active ? '2px solid var(--vermillion)' : '2px solid transparent',
                background: 'transparent',
                cursor: 'pointer',
                fontFamily: 'var(--sans)',
                fontSize: '12px',
                fontWeight: active ? 600 : 400,
                color: active ? 'var(--ink)' : 'var(--ink-light)',
                transition: 'all 0.15s',
              }}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {activeSection === 'History' && (
        <div style={{ flex: 1, overflowY: 'auto', padding: '8px 0' }}>
          {history.length === 0 ? (
            <p
              style={{
                padding: '20px 16px',
                fontFamily: 'var(--sans)',
                fontSize: '12px',
                color: 'var(--ink-light)',
                textAlign: 'center',
                lineHeight: 1.6,
                opacity: 0.7,
              }}
            >
              Past translations will appear here
            </p>
          ) : (
            history.map((entry) => (
              <div
                key={entry.id}
                onClick={() => onRestoreHistory(entry)}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'white')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                style={{
                  padding: '10px 14px',
                  borderBottom: '1px solid var(--parchment-mid)',
                  cursor: 'pointer',
                  transition: 'background 0.1s',
                  position: 'relative',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '4px' }}>
                  <p
                    style={{
                      fontFamily: 'var(--sans)',
                      fontSize: '12.5px',
                      fontWeight: 500,
                      color: 'var(--ink)',
                      lineHeight: 1.4,
                      flex: 1,
                      textWrap: 'pretty',
                    }}
                  >
                    {entry.inputText.length > 50 ? entry.inputText.slice(0, 50) + '…' : entry.inputText}
                  </p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteHistory(entry.id);
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
                    onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.4')}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '13px',
                      color: 'var(--ink-light)',
                      opacity: 0.4,
                      padding: '0 2px',
                      flexShrink: 0,
                      lineHeight: 1,
                    }}
                  >
                    ×
                  </button>
                </div>
                <div style={{ display: 'flex', gap: '6px', marginTop: '4px', alignItems: 'center' }}>
                  <span
                    style={{
                      fontFamily: 'var(--sans)',
                      fontSize: '10.5px',
                      color: 'var(--ink-light)',
                      background: 'var(--parchment-mid)',
                      padding: '2px 6px',
                      borderRadius: '20px',
                    }}
                  >
                    {entry.language === 'ja' ? '日本語' : '한국어'}
                  </span>
                  {entry.context && (
                    <span
                      style={{
                        fontFamily: 'var(--sans)',
                        fontSize: '10.5px',
                        color: 'var(--ink-light)',
                        fontStyle: 'italic',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        maxWidth: '120px',
                      }}
                    >
                      {entry.context}
                    </span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {activeSection === 'Saved' && (
        <div style={{ flex: 1, overflowY: 'auto', padding: '8px 0' }}>
          <div style={{ padding: '8px 14px 10px', borderBottom: '1px solid var(--parchment-mid)' }}>
            {showNewFolder ? (
              <div style={{ display: 'flex', gap: '6px' }}>
                <input
                  autoFocus
                  value={newFolderName}
                  onChange={(e) => setNewFolderName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') submitNewFolder();
                    if (e.key === 'Escape') {
                      setShowNewFolder(false);
                      setNewFolderName('');
                    }
                  }}
                  placeholder="Folder name…"
                  style={{
                    flex: 1,
                    padding: '6px 10px',
                    fontSize: '12px',
                    fontFamily: 'var(--sans)',
                    border: '1px solid var(--parchment-deep)',
                    borderRadius: 'var(--radius)',
                    outline: 'none',
                    color: 'var(--ink)',
                    background: 'white',
                  }}
                />
                <button
                  onClick={submitNewFolder}
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
                  Add
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowNewFolder(true)}
                style={{
                  width: '100%',
                  padding: '6px 10px',
                  background: 'transparent',
                  color: 'var(--ink-light)',
                  border: '1px dashed var(--parchment-deep)',
                  borderRadius: 'var(--radius)',
                  fontSize: '12px',
                  fontWeight: 500,
                  cursor: 'pointer',
                  fontFamily: 'var(--sans)',
                  transition: 'all 0.15s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--vermillion-soft)';
                  e.currentTarget.style.color = 'var(--vermillion)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--parchment-deep)';
                  e.currentTarget.style.color = 'var(--ink-light)';
                }}
              >
                + New folder
              </button>
            )}
          </div>
          {collections.length === 0 ? (
            <p
              style={{
                padding: '20px 16px',
                fontFamily: 'var(--sans)',
                fontSize: '12px',
                color: 'var(--ink-light)',
                textAlign: 'center',
                lineHeight: 1.6,
                opacity: 0.7,
              }}
            >
              Save translations to folders using the Save button on each card
            </p>
          ) : (
            collections.map((col) => (
              <button
                key={col.id}
                onClick={() => onOpenCollection(col.id)}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'white')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                  padding: '10px 14px',
                  border: 'none',
                  borderBottom: '1px solid var(--parchment-mid)',
                  background: 'transparent',
                  cursor: 'pointer',
                  transition: 'background 0.1s',
                  textAlign: 'left',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '14px', opacity: 0.7 }}>📁</span>
                  <span
                    style={{
                      fontFamily: 'var(--sans)',
                      fontSize: '13px',
                      fontWeight: 500,
                      color: 'var(--ink)',
                    }}
                  >
                    {col.name}
                  </span>
                </div>
                <span
                  style={{
                    fontFamily: 'var(--sans)',
                    fontSize: '11px',
                    color: 'var(--ink-light)',
                    background: 'var(--parchment-mid)',
                    padding: '2px 7px',
                    borderRadius: '20px',
                  }}
                >
                  {col.items.length}
                </span>
              </button>
            ))
          )}
        </div>
      )}
    </aside>
  );
}
