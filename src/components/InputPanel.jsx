import { useState } from 'react';

const EXAMPLES = ["I'm gonna be a little late to work.", 'Thanks for the meal!', 'Want to go grab some food together?'];
const placeholderOptions = [
  "Get started on translating here...",
  "Translate your deepest desires now...",
  "JUST TRANSLATE ALREADY!!!",
  "Translate the world...",
  "The world is yours to translate...",
  "Talking to the boss, best friends, or maybe even your crush? TONE can translate it all... ",
  "Trying to make friends with the international students without sounding awkard? You can trust TONE for quality and native translation...",
  "Want to sound like a native speaker? Yeah me too...",
  "Japanese or Korean? Pick your poison...",
  "Translate, translate, TRANSLATE!",
  "What will it be today?",
  "Oh, its you again...",
  "Hurry up and translate!",
];

export default function InputPanel({
  inputText,
  setInputText,
  context,
  setContext,
  keepContext,
  setKeepContext,
  onTranslate,
  isLoading,
}) {

  const [randomPlaceholder] = useState(() => {
    const randomIndex = Math.floor(Math.random() * placeholderOptions.length);
    return placeholderOptions[randomIndex];
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <label
        style={{
          fontFamily: 'var(--sans)',
          fontSize: '11px',
          fontWeight: 600,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: 'var(--ink-light)',
        }}
      >
        English phrase
      </label>

      <textarea
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) onTranslate();
        }}
        placeholder={randomPlaceholder}
        rows={3}
        style={{
          width: '100%',
          padding: '14px 16px',
          fontFamily: 'var(--serif)',
          fontSize: '17px',
          fontWeight: 400,
          color: 'var(--ink)',
          background: 'white',
          border: '1.5px solid var(--parchment-deep)',
          borderRadius: 'var(--radius-lg)',
          resize: 'vertical',
          outline: 'none',
          transition: 'border-color 0.15s, box-shadow 0.15s',
          boxShadow: 'var(--shadow-sm)',
          lineHeight: 1.6,
        }}
        onFocus={(e) => {
          e.target.style.borderColor = 'var(--vermillion-soft)';
          e.target.style.boxShadow =
            '0 0 0 3px var(--vermillion-pale), var(--shadow-sm)';
        }}
        onBlur={(e) => {
          e.target.style.borderColor = 'var(--parchment-deep)';
          e.target.style.boxShadow = 'var(--shadow-sm)';
        }}
      />

      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', alignItems: 'center' }}>
        <span style={{ fontFamily: 'var(--sans)', fontSize: '11.5px', color: 'var(--ink-light)' }}>
          Try:
        </span>
        {EXAMPLES.map((phrase) => (
          <button
            key={phrase}
            onClick={() => setInputText(phrase)}
            style={{
              background: 'transparent',
              border: '1px solid var(--parchment-deep)',
              borderRadius: '20px',
              padding: '3px 11px',
              fontFamily: 'var(--sans)',
              fontSize: '12px',
              color: 'var(--ink-mid)',
              cursor: 'pointer',
              transition: 'all 0.15s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--vermillion-soft)';
              e.currentTarget.style.color = 'var(--vermillion)';
              e.currentTarget.style.background = 'var(--vermillion-pale)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--parchment-deep)';
              e.currentTarget.style.color = 'var(--ink-mid)';
              e.currentTarget.style.background = 'transparent';
            }}
          >
            {phrase}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-end', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: '180px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <label
              style={{
                fontFamily: 'var(--sans)',
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--ink-light)',
              }}
            >
              Situation
            </label>
            <button
              onClick={() => setKeepContext(!keepContext)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'var(--sans)',
                fontSize: '11px',
                color: keepContext ? 'var(--vermillion)' : 'var(--ink-light)',
                padding: '2px 0',
              }}
            >
              <span
                style={{
                  display: 'inline-block',
                  width: '24px',
                  height: '13px',
                  borderRadius: '7px',
                  background: keepContext ? 'var(--vermillion)' : 'var(--parchment-deep)',
                  position: 'relative',
                  transition: 'background 0.2s',
                  flexShrink: 0,
                }}
              >
                <span
                  style={{
                    position: 'absolute',
                    top: '2px',
                    left: keepContext ? '13px' : '2px',
                    width: '9px',
                    height: '9px',
                    borderRadius: '50%',
                    background: 'white',
                    transition: 'left 0.2s',
                  }}
                />
              </span>
              Keep after translate
            </button>
          </div>
          <input
            value={context}
            onChange={(e) => setContext(e.target.value)}
            placeholder="e.g. texting my girlfriend, emailing my professor…"
            style={{
              padding: '10px 13px',
              fontFamily: 'var(--sans)',
              fontSize: '13.5px',
              color: 'var(--ink)',
              background: 'white',
              border: '1.5px solid var(--parchment-deep)',
              borderRadius: 'var(--radius)',
              outline: 'none',
              transition: 'border-color 0.15s, box-shadow 0.15s',
              boxShadow: 'var(--shadow-sm)',
            }}
            onFocus={(e) => {
              e.target.style.borderColor = 'var(--vermillion-soft)';
              e.target.style.boxShadow = '0 0 0 3px var(--vermillion-pale)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = 'var(--parchment-deep)';
              e.target.style.boxShadow = 'var(--shadow-sm)';
            }}
          />
        </div>

        <button
          onClick={onTranslate}
          disabled={!inputText.trim() || isLoading}
          style={{
            padding: '10px 26px',
            background: !inputText.trim() || isLoading ? 'var(--parchment-deep)' : 'var(--vermillion)',
            color: !inputText.trim() || isLoading ? 'var(--ink-light)' : 'white',
            border: 'none',
            borderRadius: 'var(--radius)',
            fontFamily: 'var(--sans)',
            fontSize: '14px',
            fontWeight: 600,
            cursor: !inputText.trim() || isLoading ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s',
            letterSpacing: '0.02em',
            whiteSpace: 'nowrap',
            boxShadow: !inputText.trim() || isLoading ? 'none' : 'var(--shadow-md)',
          }}
          onMouseEnter={(e) => {
            if (inputText.trim() && !isLoading) {
              e.currentTarget.style.background = 'oklch(46% 0.19 26)';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background =
              !inputText.trim() || isLoading ? 'var(--parchment-deep)' : 'var(--vermillion)';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          {isLoading ? 'Translating…' : 'Translate →'}
        </button>
      </div>

      <p style={{ fontFamily: 'var(--sans)', fontSize: '11px', color: 'var(--ink-light)', opacity: 0.6 }}>
      </p>
    </div>
  );
}
