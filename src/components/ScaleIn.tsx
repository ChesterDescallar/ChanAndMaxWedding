import { useRef, type ReactNode } from 'react';
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'motion/react';

type ScaleInProps = {
  children: ReactNode;
  className?: string;
  from?: number;
};

/**
 * Grows an element from `from` to full size as it travels into view, then
 * holds. Spring-smoothed so the scale tracks scroll without feeling twitchy.
 */
export function ScaleIn({ children, className, from = 0.85 }: ScaleInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'center 0.65'],
  });

  const rawScale = useTransform(scrollYProgress, [0, 1], [from, 1]);
  const scale = useSpring(rawScale, { stiffness: 120, damping: 28, mass: 0.4 });

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ scale, transformOrigin: 'center' }}>{children}</motion.div>
    </div>
  );
}
