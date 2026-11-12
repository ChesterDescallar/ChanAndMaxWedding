// Drawn rather than the 🇵🇭 emoji: Windows ships no flag emoji and renders
// the two letters "PH" instead.
const RAYS = Array.from({ length: 8 }, (_, i) => i * 45);

export function PhFlag({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 180 90"
      className={className}
      role="img"
      aria-label="Philippine flag"
    >
      <rect width="180" height="45" fill="#0038a8" />
      <rect y="45" width="180" height="45" fill="#ce1126" />
      <path d="M0 0 L78 45 L0 90 Z" fill="#fff" />
      <g fill="#fcd116">
        <g transform="translate(26 45)">
          <circle r="9" />
          {RAYS.map((angle) => (
            <rect key={angle} x="-1.6" y="-17" width="3.2" height="7" transform={`rotate(${angle})`} />
          ))}
        </g>
        <circle cx="8" cy="9" r="3.6" />
        <circle cx="8" cy="81" r="3.6" />
        <circle cx="64" cy="45" r="3.6" />
      </g>
    </svg>
  );
}
