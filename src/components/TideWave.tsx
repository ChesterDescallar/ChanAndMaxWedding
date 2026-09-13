import { motion, useReducedMotion } from 'motion/react';

type TideWaveProps = {
  className?: string;
  /** Flip vertically when the wave sits at the top of a section. */
  flip?: boolean;
};

// One full wave period, repeated twice, so translating by exactly -50%
// loops seamlessly.
const WAVE =
  'M0 60 C 60 30, 120 30, 180 60 C 240 90, 300 90, 360 60 C 420 30, 480 30, 540 60 C 600 90, 660 90, 720 60 L720 140 L0 140 Z';

export function TideWave({ className, flip = false }: TideWaveProps) {
  const reduce = useReducedMotion();

  return (
    <div className={`tide ${className ?? ''}`.trim()} data-flip={flip} aria-hidden="true">
      <svg viewBox="0 0 720 140" preserveAspectRatio="none" className="tide__svg">
        {[
          { opacity: 0.18, duration: 19, offset: 0 },
          { opacity: 0.26, duration: 13, offset: -120 },
        ].map((layer, i) => (
          <motion.g
            key={i}
            animate={reduce ? undefined : { x: [layer.offset, layer.offset - 720] }}
            transition={
              reduce ? undefined : { duration: layer.duration, repeat: Infinity, ease: 'linear' }
            }
          >
            <path d={WAVE} fill="currentColor" fillOpacity={layer.opacity} />
            <path d={WAVE} fill="currentColor" fillOpacity={layer.opacity} transform="translate(720 0)" />
          </motion.g>
        ))}
      </svg>
    </div>
  );
}
