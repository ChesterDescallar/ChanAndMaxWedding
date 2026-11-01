import type { ReactNode } from 'react';
import { motion, type Variants } from 'motion/react';

type RevealProps = {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: 'div' | 'span';
  /** Plays on this flag instead of on scroll, for content held behind the intro. */
  ready?: boolean;
};

const variants: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: (custom: { delay: number; y: number }) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay: custom.delay,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

export function Reveal({ children, delay = 0, y = 28, className, as = 'div', ready }: RevealProps) {
  const MotionTag = as === 'span' ? motion.span : motion.div;
  // Triggers on a fixed distance into the viewport, not a fraction of the
  // element: a block taller than the screen can never reach a fractional
  // threshold on a small phone, and would stay invisible for good.
  const trigger =
    ready === undefined
      ? { whileInView: 'show', viewport: { once: true, margin: '0px 0px -12% 0px' } }
      : { animate: ready ? 'show' : 'hidden' };

  return (
    <MotionTag
      className={className}
      custom={{ delay, y }}
      variants={variants}
      initial="hidden"
      {...trigger}
    >
      {children}
    </MotionTag>
  );
}
