import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useReducedMotion, type MotionValue } from 'motion/react';

type ScrubTextProps = {
  children: string;
  className?: string;
  as?: 'p' | 'h2';
};

function Word({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return (
    <motion.span className="scrub__word" style={{ opacity }}>
      {children}
    </motion.span>
  );
}

/**
 * Reveals copy word by word as the section scrolls through the viewport.
 * Each word interpolates its own slice of scroll progress, so the sentence
 * lights up left to right rather than fading in as one block.
 */
export function ScrubText({ children, className, as = 'p' }: ScrubTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [settled, setSettled] = useState(false);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.85', 'start 0.35'],
  });

  // Once the copy has been read past, stop tracking scroll and hold it fully
  // visible. Without this, jumping back (or deep-linking to an anchor below it)
  // can leave the paragraph stuck part-faded and hard to read.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Arriving via anchor jump can drop us past the scrub range entirely, so
    // settle immediately if the copy is already sitting in the read zone.
    const box = el.getBoundingClientRect();
    if (box.top < window.innerHeight * 0.4 && box.bottom > 0) {
      setSettled(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.boundingClientRect.top < window.innerHeight * 0.4) {
          setSettled(true);
        }
      },
      { threshold: 0.6 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const words = children.split(' ');
  const Tag = as;

  if (reduce || settled) {
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <div ref={ref}>
      <Tag className={`${className ?? ''} scrub`.trim()}>
        {words.map((word, i) => {
          const start = i / words.length;
          const end = start + 1 / words.length;
          return (
            <Word key={`${word}-${i}`} progress={scrollYProgress} range={[start, end]}>
              {word}
            </Word>
          );
        })}
      </Tag>
    </div>
  );
}
