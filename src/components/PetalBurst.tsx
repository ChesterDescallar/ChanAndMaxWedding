import { motion, useReducedMotion } from 'motion/react';
import { PetalShape } from './PetalFall';

const COUNT = 9;

// Fixed arrangement, like PetalFall: an even ring with varied reach and size.
const PETALS = Array.from({ length: COUNT }, (_, i) => {
  const angle = (i / COUNT) * Math.PI * 2 - Math.PI / 2;
  const reach = 64 + (i % 3) * 20;
  return {
    id: i,
    x: Math.cos(angle) * reach,
    // Drifts slightly downward as it settles, so it reads as falling petals.
    y: Math.sin(angle) * reach + 14,
    size: 13 + (i % 3) * 4,
    spin: i % 2 === 0 ? 150 : -150,
  };
});

/** One short burst of plumeria petals, confirming a date was saved. */
export function PetalBurst() {
  const reduce = useReducedMotion();
  if (reduce) return null;

  return (
    <span className="petal-burst" aria-hidden="true">
      {PETALS.map((p) => (
        <motion.span
          key={p.id}
          className="petal-burst__item"
          initial={{ x: 0, y: 0, scale: 0.4, rotate: 0, opacity: 0 }}
          animate={{ x: p.x, y: p.y, scale: 1, rotate: p.spin, opacity: [0, 1, 0] }}
          transition={{
            duration: 0.7,
            ease: [0.16, 1, 0.3, 1],
            opacity: { duration: 0.7, times: [0, 0.15, 1], ease: 'linear' },
          }}
        >
          <PetalShape size={p.size} opacity={0.75} />
        </motion.span>
      ))}
    </span>
  );
}
