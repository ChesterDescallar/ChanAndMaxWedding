type BotanicalProps = {
  className?: string;
  variant?: 'corner' | 'sprig' | 'frame' | 'bloom' | 'garland' | 'wreath';
};

/**
 * Filled + line-art botanical illustrations (plumeria, eucalyptus, palm) —
 * layered shapes rather than single-stroke paths, so they read as full
 * floral art rather than thin decoration. Tinted via currentColor plus a
 * couple of soft fills for depth, so callers can theme with one color.
 */

function PlumeriaBloom({ cx, cy, r, rotate = 0, opacity = 1 }: { cx: number; cy: number; r: number; rotate?: number; opacity?: number }) {
  const petal = `M0 0 C ${r * 0.42} -${r * 0.18}, ${r * 0.62} -${r * 0.7}, 0 -${r} C -${r * 0.62} -${r * 0.7}, -${r * 0.42} -${r * 0.18}, 0 0 Z`;
  return (
    <g transform={`translate(${cx} ${cy}) rotate(${rotate})`} opacity={opacity}>
      {[0, 72, 144, 216, 288].map((angle) => (
        <path
          key={angle}
          d={petal}
          transform={`rotate(${angle})`}
          fill="currentColor"
          fillOpacity="0.14"
          stroke="currentColor"
          strokeWidth="0.9"
        />
      ))}
      <circle r={r * 0.16} fill="currentColor" fillOpacity="0.5" />
    </g>
  );
}

function EucalyptusSprig({
  x,
  y,
  rotate = 0,
  scale = 1,
  opacity = 0.65,
}: {
  x: number;
  y: number;
  rotate?: number;
  scale?: number;
  opacity?: number;
}) {
  const leaves: [number, number, number][] = [
    [0, 0, -1],
    [0, 22, 1],
    [0, 44, -1],
    [0, 64, 1],
    [0, 82, -1],
  ];
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate}) scale(${scale})`} opacity={opacity}>
      <path d="M0 100 C 0 70, 0 40, 0 -6" stroke="currentColor" strokeWidth="1.1" fill="none" />
      {leaves.map(([lx, ly, dir], i) => (
        <path
          key={i}
          d={`M${lx} ${ly} C ${dir * 9} ${ly - 3}, ${dir * 15} ${ly - 12}, ${dir * 7} ${ly - 20} C ${dir * 3} ${ly - 15}, ${dir * 2} ${ly - 6}, ${lx} ${ly}`}
          fill="currentColor"
          fillOpacity={0.16 + i * 0.02}
          stroke="currentColor"
          strokeWidth="0.6"
          transform={`rotate(${dir * 34} ${lx} ${ly})`}
        />
      ))}
    </g>
  );
}

export function Botanical({ className, variant = 'sprig' }: BotanicalProps) {
  if (variant === 'bloom') {
    return (
      <svg viewBox="0 0 160 160" className={className} fill="none" aria-hidden="true">
        <PlumeriaBloom cx={80} cy={80} r={46} />
        <PlumeriaBloom cx={26} cy={122} r={20} rotate={30} opacity={0.7} />
        <PlumeriaBloom cx={132} cy={40} r={16} rotate={-18} opacity={0.6} />
      </svg>
    );
  }

  if (variant === 'garland') {
    return (
      <svg viewBox="0 0 900 140" className={className} fill="none" aria-hidden="true">
        <path
          d="M0 70 C 90 30, 160 100, 250 60 C 340 20, 410 100, 500 65 C 590 30, 660 100, 750 60 C 810 34, 850 50, 900 70"
          stroke="currentColor"
          strokeWidth="1.1"
          opacity="0.45"
        />
        {[90, 250, 410, 570, 730].map((x, i) => (
          <PlumeriaBloom key={x} cx={x} cy={i % 2 === 0 ? 48 : 88} r={17} rotate={(i - 2) * 10} opacity={0.85} />
        ))}
        {[30, 170, 330, 490, 650, 820].map((x, i) => (
          <EucalyptusSprig key={x} x={x} y={i % 2 === 0 ? 10 : 96} rotate={i % 2 === 0 ? 200 : 20} scale={0.42} opacity={0.5} />
        ))}
      </svg>
    );
  }

  if (variant === 'wreath') {
    return (
      <svg viewBox="0 0 260 260" className={className} fill="none" aria-hidden="true">
        <circle cx="130" cy="130" r="98" stroke="currentColor" strokeWidth="0.6" opacity="0.25" />
        {Array.from({ length: 14 }).map((_, i) => {
          const angle = (i / 14) * Math.PI * 2;
          const rx = 130 + Math.cos(angle) * 98;
          const ry = 130 + Math.sin(angle) * 98;
          return (
            <EucalyptusSprig
              key={i}
              x={rx}
              y={ry}
              rotate={(angle * 180) / Math.PI + 90}
              scale={0.5}
              opacity={0.55}
            />
          );
        })}
        {[
          [130, 22, 20, 0],
          [232, 130, 18, 90],
          [130, 238, 20, 180],
          [28, 130, 18, 270],
        ].map(([cx, cy, r, rot], i) => (
          <PlumeriaBloom key={i} cx={cx} cy={cy} r={r} rotate={rot} opacity={0.9} />
        ))}
      </svg>
    );
  }

  if (variant === 'corner') {
    return (
      <svg viewBox="0 0 220 220" className={className} fill="none" aria-hidden="true">
        <path
          d="M4 12c40 4 78 18 104 44s40 64 44 104"
          stroke="currentColor"
          strokeWidth="1.1"
          strokeLinecap="round"
          opacity="0.5"
        />
        <path d="M18 8c34 10 62 26 82 50" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.35" />
        <EucalyptusSprig x={26} y={18} rotate={128} scale={0.55} opacity={0.5} />
        <EucalyptusSprig x={70} y={54} rotate={112} scale={0.4} opacity={0.45} />
        <PlumeriaBloom cx={30} cy={22} r={18} rotate={-10} opacity={0.95} />
        <PlumeriaBloom cx={64} cy={48} r={13} rotate={20} opacity={0.85} />
        <PlumeriaBloom cx={94} cy={78} r={15} rotate={-25} opacity={0.8} />
        <PlumeriaBloom cx={122} cy={112} r={10} rotate={12} opacity={0.7} />
      </svg>
    );
  }

  if (variant === 'frame') {
    return (
      <svg viewBox="0 0 400 120" className={className} fill="none" aria-hidden="true">
        <path
          d="M20 60 C 90 20, 160 20, 200 60 C 240 20, 310 20, 380 60"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.5"
        />
        <PlumeriaBloom cx={200} cy={60} r={14} opacity={0.9} />
        <PlumeriaBloom cx={140} cy={40} r={8} rotate={-15} opacity={0.7} />
        <PlumeriaBloom cx={260} cy={40} r={8} rotate={15} opacity={0.7} />
        <EucalyptusSprig x={90} y={65} rotate={150} scale={0.3} opacity={0.4} />
        <EucalyptusSprig x={310} y={65} rotate={30} scale={0.3} opacity={0.4} />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 80 220" className={className} fill="none" aria-hidden="true">
      <path d="M40 210 C 40 160, 40 120, 40 60" stroke="currentColor" strokeWidth="1.2" opacity="0.55" />
      {[
        [40, 60, -1],
        [40, 90, 1],
        [40, 120, -1],
        [40, 150, 1],
      ].map(([x, y, dir], i) => (
        <path
          key={i}
          d={`M${x} ${y} C ${x + dir * 22} ${y - 6}, ${x + dir * 34} ${y - 20}, ${x + dir * 20} ${y - 34}`}
          fill="currentColor"
          fillOpacity="0.14"
          stroke="currentColor"
          strokeWidth="0.9"
          opacity={0.7}
        />
      ))}
      <PlumeriaBloom cx={40} cy={40} r={17} />
    </svg>
  );
}
