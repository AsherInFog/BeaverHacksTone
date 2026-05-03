import { useState } from 'react';
import SaveMenu from './SaveMenu.jsx';
import { explain } from '../lib/api.js';
import { speak, ttsSupported } from '../lib/tts.js';

export default function RegisterCard({
  register,
  data,
  language,
  sourceText,
  context,
  copied,
  onCopy,
  collections,
  onSaveToCollection,
}) {
  const [showSaveMenu, setShowSaveMenu] = useState(false);
  const [explanation, setExplanation] = useState('');
  const [isExplaining, setIsExplaining] = useState(false);
  const [explainError, setExplainError] = useState('');

  const cardId = register.key;
  const isCopied = copied === cardId;
  const accentColor = register.color;
  const canSpeak = ttsSupported();

  const handleExplain = async () => {
    if (explanation) {
      setExplanation('');
      return;
    }
    setIsExplaining(true);
    setExplainError('');
    try {
      const text = await explain({
        text: sourceText,
        language,
        context,
        register: register.key,
        translation: data.translation,
      });
      setExplanation(text);
    } catch (e) {
      setExplainError(e.message || 'Failed to fetch explanation.');
    } finally {
      setIsExplaining(false);
    }
  };

  const buttonBase = {
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
  };

  return (
    <div
      style={{
        background: 'white',
        borderRadius: 'var(--radius-lg)',
        boxShadow: 'var(--shadow-card)',
        display: 'flex',
        flexDirection: 'column',
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
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'stretch' }}>
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
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
            <p
              style={{
                fontFamily: 'var(--serif)',
                fontSize: '20px',
                fontWeight: 400,
                lineHeight: 1.45,
                color: 'var(--ink)',
                letterSpacing: '0.01em',
                textWrap: 'pretty',
                flex: 1,
              }}
            >
              {data.translation}
            </p>
            {canSpeak && (
              <button
                onClick={() => speak(data.translation, language)}
                title="Speak"
                style={{
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '16px',
                  padding: '2px 4px',
                  opacity: 0.55,
                  transition: 'opacity 0.15s',
                  flexShrink: 0,
                  lineHeight: 1,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.55')}
              >
                🔊
              </button>
            )}
          </div>
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
          <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
            <button
              onClick={handleExplain}
              disabled={isExplaining || !sourceText}
              style={{
                ...buttonBase,
                color: explanation ? 'var(--vermillion)' : 'var(--ink-light)',
                borderColor: explanation ? 'var(--vermillion-soft)' : 'var(--parchment-deep)',
                opacity: !sourceText ? 0.4 : 1,
                cursor: !sourceText ? 'not-allowed' : 'pointer',
              }}
              title={sourceText ? 'Explain why this register fits' : 'Translate first'}
            >
              {isExplaining ? '…' : explanation ? 'Hide' : 'Why?'}
            </button>
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setShowSaveMenu((v) => !v)}
                style={buttonBase}
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
                ...buttonBase,
                background: isCopied ? 'var(--vermillion-pale)' : 'transparent',
                borderColor: isCopied ? 'var(--vermillion-soft)' : 'var(--parchment-deep)',
                color: isCopied ? 'var(--vermillion)' : 'var(--ink-light)',
                padding: '4px 10px',
              }}
            >
              {isCopied ? '✓ Copied' : 'Copy'}
            </button>
          </div>
        </div>
      </div>

      {(explanation || explainError) && (
        <div
          style={{
            borderTop: '1px solid var(--parchment-mid)',
            padding: '14px 20px',
            background: 'var(--parchment)',
            borderRadius: '0 0 var(--radius-lg) var(--radius-lg)',
            fontFamily: 'var(--sans)',
            fontSize: '13px',
            color: explainError ? 'var(--vermillion)' : 'var(--ink-mid)',
            lineHeight: 1.6,
          }}
        >
          <span style={{ color: accentColor, fontWeight: 600, marginRight: '6px' }}>?</span>
          {explainError || explanation}
        </div>
      )}
    </div>
  );
}
