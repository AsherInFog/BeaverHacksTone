export default function Toast({ message }) {
  if (!message) return null;
  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        left: '50%',
        transform: 'translateX(-50%)',
        background: 'var(--ink)',
        color: 'white',
        padding: '10px 18px',
        borderRadius: '20px',
        fontFamily: 'var(--sans)',
        fontSize: '13px',
        boxShadow: 'var(--shadow-md)',
        zIndex: 300,
        pointerEvents: 'none',
        animation: 'toastIn 0.2s ease',
      }}
    >
      {message}
    </div>
  );
}
