type BotanicalProps = {
  className?: string;
  variant?: 'corner' | 'sprig' | 'frame';
};

/**
 * Line-art botanical flourishes (plumeria + eucalyptus sprigs) drawn as
 * scalable vector paths so they stay crisp at any size and can be tinted
 * with currentColor for light/dark parity.
 */
export function Botanical({ className, variant = 'sprig' }: BotanicalProps) {
  if (variant === 'corner') {
    return (
      <svg
        viewBox="0 0 220 220"
        className={className}
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M4 12c40 4 78 18 104 44s40 64 44 104"
          stroke="currentColor"
          strokeWidth="1.1"
          strokeLinecap="round"
          opacity="0.55"
        />
        <path
          d="M18 8c34 10 62 26 82 50"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          opacity="0.4"
        />
        {[
          [30, 22, 16],
          [58, 44, 12],
          [88, 74, 15],
          [116, 108, 10],
        ].map(([cx, cy, r], i) => (
          <g key={i} transform={`translate(${cx} ${cy})`} opacity={0.85 - i * 0.12}>
            <circle r={r} fill="currentColor" opacity="0.08" />
            <path
              d={`M0 -${r} C ${r * 0.6} -${r * 0.6}, ${r * 0.6} ${r * 0.6}, 0 ${r} C -${r * 0.6} ${r * 0.6}, -${r * 0.6} -${r * 0.6}, 0 -${r}`}
              stroke="currentColor"
              strokeWidth="0.8"
            />
          </g>
        ))}
      </svg>
    );
  }

  if (variant === 'frame') {
    return (
      <svg
        viewBox="0 0 400 120"
        className={className}
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M20 60 C 90 20, 160 20, 200 60 C 240 20, 310 20, 380 60"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.5"
        />
        <circle cx="200" cy="60" r="4" fill="currentColor" opacity="0.6" />
        <circle cx="140" cy="40" r="2.4" fill="currentColor" opacity="0.4" />
        <circle cx="260" cy="40" r="2.4" fill="currentColor" opacity="0.4" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 80 220" className={className} fill="none" aria-hidden="true">
      <path
        d="M40 210 C 40 160, 40 120, 40 60"
        stroke="currentColor"
        strokeWidth="1.2"
        opacity="0.6"
      />
      {[
        [40, 60, -1],
        [40, 90, 1],
        [40, 120, -1],
        [40, 150, 1],
      ].map(([x, y, dir], i) => (
        <path
          key={i}
          d={`M${x} ${y} C ${x + dir * 22} ${y - 6}, ${x + dir * 34} ${y - 20}, ${x + dir * 20} ${y - 34}`}
          stroke="currentColor"
          strokeWidth="1"
          opacity={0.55}
        />
      ))}
      <g transform="translate(40 40)">
        <circle r="9" fill="currentColor" opacity="0.1" />
        {[0, 72, 144, 216, 288].map((angle) => (
          <path
            key={angle}
            d="M0 0 C 3 -6, 3 -14, 0 -18 C -3 -14, -3 -6, 0 0 Z"
            stroke="currentColor"
            strokeWidth="0.7"
            transform={`rotate(${angle})`}
          />
        ))}
      </g>
    </svg>
  );
}
