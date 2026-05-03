import LanguageToggle from './LanguageToggle.jsx';

export default function Header({ targetLanguage, setTargetLanguage }) {
  return (
    <header
      style={{
        padding: '24px 36px',
        borderBottom: '1px solid var(--parchment-mid)',
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        background: 'var(--parchment)',
        flexWrap: 'wrap',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', flex: 1 }}>
        <h1
          style={{
            fontFamily: 'var(--serif)',
            fontWeight: 400,
            fontSize: '26px',
            letterSpacing: '-0.01em',
            color: 'var(--ink)',
          }}
        >
          Tone
        </h1>
        <div
          style={{
            width: '1px',
            height: '17px',
            background: 'var(--parchment-deep)',
            alignSelf: 'center',
          }}
        />
        <p
          style={{
            fontFamily: 'var(--sans)',
            fontSize: '13px',
            color: 'var(--ink-light)',
            fontWeight: 400,
            letterSpacing: '0.01em',
          }}
        >
          Translation Output Native Exchange
        </p>
      </div>
      <LanguageToggle value={targetLanguage} onChange={setTargetLanguage} />
    </header>
  );
}
