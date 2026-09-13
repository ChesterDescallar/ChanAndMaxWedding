import { useMemo } from 'react';
import { motion, useReducedMotion } from 'motion/react';

type Petal = {
  id: number;
  left: number;
  size: number;
  delay: number;
  duration: number;
  drift: number;
  spin: number;
  opacity: number;
};

// Fixed arrangement rather than random, so the drift reads as choreographed
// instead of noisy, and never reshuffles between renders.
const PETALS: Petal[] = [
  { id: 0, left: 8, size: 26, delay: 0.2, duration: 13, drift: 40, spin: 160, opacity: 0.5 },
  { id: 1, left: 22, size: 18, delay: 2.6, duration: 16, drift: -30, spin: -140, opacity: 0.38 },
  { id: 2, left: 37, size: 22, delay: 1.1, duration: 14.5, drift: 52, spin: 200, opacity: 0.44 },
  { id: 3, left: 54, size: 15, delay: 4.2, duration: 17.5, drift: -44, spin: -120, opacity: 0.32 },
  { id: 4, left: 68, size: 24, delay: 0.8, duration: 12.5, drift: 34, spin: 180, opacity: 0.47 },
  { id: 5, left: 82, size: 19, delay: 3.4, duration: 15.5, drift: -38, spin: -170, opacity: 0.36 },
  { id: 6, left: 93, size: 16, delay: 5.5, duration: 18, drift: 28, spin: 150, opacity: 0.3 },
];

function PetalShape({ size, opacity }: { size: number; opacity: number }) {
  const r = size / 2;
  return (
    <svg width={size} height={size} viewBox="-12 -12 24 24" fill="none" aria-hidden="true">
      <path
        d={`M0 ${r * 0.9} C ${r * 0.75} ${r * 0.2}, ${r * 0.7} -${r * 0.65}, 0 -${r * 0.95} C -${r * 0.7} -${r * 0.65}, -${r * 0.75} ${r * 0.2}, 0 ${r * 0.9} Z`}
        fill="currentColor"
        fillOpacity={opacity}
        stroke="currentColor"
        strokeOpacity={opacity + 0.15}
        strokeWidth="0.6"
      />
    </svg>
  );
}

/**
 * Plumeria petals drifting down over the hero. Decorative only, so it sits
 * behind content and ignores pointer events; disabled entirely under
 * reduced-motion rather than just slowed.
 */
export function PetalFall() {
  const reduce = useReducedMotion();
  const petals = useMemo(() => PETALS, []);

  if (reduce) return null;

  return (
    <div className="petals" aria-hidden="true">
      {petals.map((p) => (
        <motion.span
          key={p.id}
          className="petals__item"
          style={{ left: `${p.left}%`, color: 'var(--gold-600)' }}
          initial={{ y: '-12vh', x: 0, rotate: 0, opacity: 0 }}
          animate={{
            y: '112vh',
            x: [0, p.drift, p.drift * 0.3, p.drift * 0.85],
            rotate: p.spin,
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'linear',
            opacity: { times: [0, 0.12, 0.8, 1], duration: p.duration, delay: p.delay, repeat: Infinity },
            x: { duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'easeInOut' },
          }}
        >
          <PetalShape size={p.size} opacity={p.opacity} />
        </motion.span>
      ))}
    </div>
  );
}
