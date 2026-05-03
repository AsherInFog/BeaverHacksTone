import { useCallback, useEffect, useState } from 'react';
import Header from './components/Header.jsx';
import InputPanel from './components/InputPanel.jsx';
import ResultsGrid from './components/ResultsGrid.jsx';
import Sidebar from './components/Sidebar.jsx';
import CollectionModal from './components/CollectionModal.jsx';
import Toast from './components/Toast.jsx';
import { translate } from './lib/api.js';
import { lsGet, lsSet } from './lib/storage.js';

export default function App() {
  const [inputText, setInputText] = useState("");
  const [targetLanguage, setTargetLanguage] = useState('ja'); 
  const [context, setContext] = useState('');
  const [keepContext, setKeepContext] = useState(true);
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasTranslated, setHasTranslated] = useState(false);

  const [history, setHistory] = useState(() => lsGet('tone_history', []));
  const [collections, setCollections] = useState(() => lsGet('tone_collections', []));
  const [sidebarSection, setSidebarSection] = useState('History');
  const [openCollection, setOpenCollection] = useState(null);
  const [toast, setToast] = useState('');

  useEffect(() => lsSet('tone_history', history), [history]);
  useEffect(() => lsSet('tone_collections', collections), [collections]);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2200);
  };

  const handleTranslate = useCallback(
    async (overrideLang) => {
      if (!inputText.trim()) return;
      const lang = overrideLang || targetLanguage;
      setIsLoading(true);
      setError(null);
      setResults(null);
      setHasTranslated(true);
      try {
        const data = await translate({ text: inputText, language: lang, context });
        setResults(data);
        const entry = {
          id: Date.now() + Math.random(),
          inputText,
          language: lang,
          context,
          results: data,
          timestamp: Date.now(),
        };
        setHistory((prev) => [entry, ...prev].slice(0, 40));
        if (!keepContext) setContext('');
      } catch (e) {
        setError(e.message || 'Translation failed. Please try again.');
      } finally {
        setIsLoading(false);
      }
    },
    [inputText, targetLanguage, context, keepContext]
  );

  const handleLanguageChange = (lang) => {
    if (lang === targetLanguage) return;
    setTargetLanguage(lang);
    setInputText('');
    setContext('');
    setResults(null);
    setError(null);
    setHasTranslated(false);
  };

  const handleRestoreHistory = (entry) => {
    setInputText(entry.inputText);
    setTargetLanguage(entry.language);
    setContext(entry.context || '');
    setResults(entry.results);
    setHasTranslated(true);
  };

  const handleDeleteHistory = (id) => {
    setHistory((prev) => prev.filter((e) => e.id !== id));
  };

  const handleSaveToCollection = (colId, newName, register, data) => {
    const item = {
      id: Date.now() + Math.random(),
      sourceText: inputText,
      language: targetLanguage,
      registerKey: register.key,
      data,
      timestamp: Date.now(),
    };
    if (colId) {
      setCollections((prev) =>
        prev.map((c) => (c.id === colId ? { ...c, items: [item, ...c.items] } : c))
      );
      const col = collections.find((c) => c.id === colId);
      showToast(`Saved to "${col?.name}"`);
    } else if (newName) {
      const newCol = { id: Date.now(), name: newName, items: [item] };
      setCollections((prev) => [newCol, ...prev]);
      showToast(`Saved to new folder "${newName}"`);
    }
    setSidebarSection('Saved');
  };

  const handleOpenCollection = (colId) => {
    setOpenCollection(collections.find((c) => c.id === colId));
  };

  const handleDeleteCollection = (colId) => {
    setCollections((prev) => prev.filter((c) => c.id !== colId));
    setOpenCollection(null);
  };

  const handleDeleteCollectionItem = (colId, itemId) => {
    setCollections((prev) =>
      prev.map((c) =>
        c.id === colId ? { ...c, items: c.items.filter((i) => i.id !== itemId) } : c
      )
    );
    setOpenCollection((prev) =>
      prev ? { ...prev, items: prev.items.filter((i) => i.id !== itemId) } : null
    );
  };

  // Keep the open collection synced when its parent list updates
  useEffect(() => {
    if (!openCollection) return;
    const fresh = collections.find((c) => c.id === openCollection.id);
    if (fresh && fresh !== openCollection) setOpenCollection(fresh);
  }, [collections]);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header targetLanguage={targetLanguage} setTargetLanguage={handleLanguageChange} />

      <div style={{ flex: 1, display: 'flex', overflow: 'hidden', minHeight: 0 }}>
        <Sidebar
          history={history}
          collections={collections}
          onRestoreHistory={handleRestoreHistory}
          onDeleteHistory={handleDeleteHistory}
          onOpenCollection={handleOpenCollection}
          activeSection={sidebarSection}
          setActiveSection={setSidebarSection}
        />

        <main
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '36px 40px',
            display: 'flex',
            flexDirection: 'column',
            gap: '32px',
          }}
        >
          <InputPanel
            inputText={inputText}
            setInputText={setInputText}
            context={context}
            setContext={setContext}
            keepContext={keepContext}
            setKeepContext={setKeepContext}
            onTranslate={() => handleTranslate()}
            isLoading={isLoading}
          />

          {error && (
            <div
              style={{
                padding: '13px 16px',
                background: 'oklch(96% 0.04 26)',
                border: '1px solid oklch(85% 0.08 26)',
                borderRadius: 'var(--radius)',
                fontFamily: 'var(--sans)',
                fontSize: '13px',
                color: 'var(--vermillion)',
              }}
            >
              {error}
            </div>
          )}

          {(isLoading || results) && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '6px',
                }}
              >
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
                  {targetLanguage === 'ja' ? '日本語' : '한국어'} — 4 registers
                </label>
              </div>
              <ResultsGrid
                results={results}
                language={targetLanguage}
                isLoading={isLoading}
                collections={collections}
                onSaveToCollection={handleSaveToCollection}
              />
            </div>
          )}

          {!hasTranslated && !isLoading && (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '12px',
                padding: '48px 24px',
                opacity: 0.4,
              }}
            >
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  background: 'var(--parchment-mid)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '18px',
                  fontFamily: 'var(--serif)',
                }}
              >
                四
              </div>
              <p
                style={{
                  fontFamily: 'var(--sans)',
                  fontSize: '13px',
                  color: 'var(--ink-light)',
                  textAlign: 'center',
                  maxWidth: '260px',
                  lineHeight: 1.6,
                }}
              >
                Enter a phrase and pick a language to see four ways to say it — each one for a
                different relationship.
              </p>
            </div>
          )}
        </main>
      </div>

      <footer
        style={{
          padding: '12px 36px',
          borderTop: '1px solid var(--parchment-mid)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '6px',
        }}
      >
        <p style={{ fontFamily: 'var(--sans)', fontSize: '11px', color: 'var(--ink-light)', opacity: 0.55 }}>
          BeaverHacks 2026 · Tone Translator
        </p>
        <p style={{ fontFamily: 'var(--serif)', fontSize: '12px', color: 'var(--ink-light)', opacity: 0.45 }}>
          日本語 · 한국어
        </p>
      </footer>

      <CollectionModal
        collection={openCollection}
        onClose={() => setOpenCollection(null)}
        onDelete={handleDeleteCollection}
        onDeleteItem={handleDeleteCollectionItem}
      />

      <Toast message={toast} />
    </div>
  );
}
