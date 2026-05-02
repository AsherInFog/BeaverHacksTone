export default function SkeletonCard() {
  return (
    <div
      style={{
        background: 'white',
        borderRadius: 'var(--radius-lg)',
        padding: '24px',
        boxShadow: 'var(--shadow-card)',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
      }}
    >
      {[80, 120, 60, 100].map((w, i) => (
        <div
          key={i}
          style={{
            height: i === 1 ? 22 : 14,
            width: `${w}%`,
            maxWidth: `${w * 2.8}px`,
            borderRadius: 4,
            background: 'var(--parchment-mid)',
            animation: 'shimmer 1.4s ease-in-out infinite',
            animationDelay: `${i * 0.1}s`,
          }}
        />
      ))}
    </div>
  );
}
