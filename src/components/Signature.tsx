import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';

/**
 * "Maksim & Chantily" written as if signed by hand. Uses the site's display
 * face rather than hand-plotted SVG paths (those produced malformed letters),
 * and wipes in left to right so it reads as being written.
 */
export function Signature({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLParagraphElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { threshold: 0.01 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [reduce]);

  // The observed wrapper must never be clipped, or it would report zero
  // intersection area and the reveal could never trigger itself. So the
  // clip-path animates on an inner span instead.
  return (
    <p ref={ref} className={`signature ${className ?? ''}`.trim()}>
      {reduce ? (
        <span>Maksim &amp; Chantily</span>
      ) : (
        <motion.span
          className="signature__ink"
          initial={{ clipPath: 'inset(0 100% 0 0)', opacity: 0 }}
          animate={shown ? { clipPath: 'inset(0 0% 0 0)', opacity: 1 } : undefined}
          transition={{
            clipPath: { duration: 2.1, ease: [0.33, 0.9, 0.4, 1] },
            opacity: { duration: 0.3 },
          }}
        >
          Maksim &amp; Chantily
        </motion.span>
      )}
    </p>
  );
}
