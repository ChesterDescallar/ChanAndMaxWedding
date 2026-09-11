import { useRef, type ReactNode } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';

type ParallaxLayerProps = {
  children: ReactNode;
  speed?: number;
  className?: string;
};

/**
 * Wraps children in a layer that drifts vertically as the page scrolls,
 * relative to its own position in the viewport (not the whole document) —
 * so it works no matter where the section sits on the page.
 */
export function ParallaxLayer({ children, speed = 0.2, className }: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const rawY = useTransform(scrollYProgress, [0, 1], [`${speed * 100}%`, `${speed * -100}%`]);
  const y = useSpring(rawY, { stiffness: 120, damping: 30, mass: 0.3 });

  return (
    <div ref={ref} className={className} style={{ position: 'relative' }}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
}
