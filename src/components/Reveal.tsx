import type { ReactNode } from 'react';
import { motion, type Variants } from 'motion/react';

type RevealProps = {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: 'div' | 'span';
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

export function Reveal({ children, delay = 0, y = 28, className, as = 'div' }: RevealProps) {
  const MotionTag = as === 'span' ? motion.span : motion.div;
  return (
    <MotionTag
      className={className}
      custom={{ delay, y }}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
    >
      {children}
    </MotionTag>
  );
}
