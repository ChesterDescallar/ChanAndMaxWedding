import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

const WEDDING_DATE = new Date('2028-05-28T16:00:00+08:00');

function getTimeLeft() {
  const diff = Math.max(0, WEDDING_DATE.getTime() - Date.now());
  const day = 1000 * 60 * 60 * 24;
  return {
    days: Math.floor(diff / day),
    hours: Math.floor((diff % day) / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000),
  };
}

const units: { key: keyof ReturnType<typeof getTimeLeft>; label: string }[] = [
  { key: 'days', label: 'Days' },
  { key: 'hours', label: 'Hours' },
  { key: 'minutes', label: 'Minutes' },
  { key: 'seconds', label: 'Seconds' },
];

/** Swaps the label as the date draws closer, so repeat visits feel alive. */
export function milestoneLabel(days: number) {
  if (days <= 0) return 'Today is the day';
  if (days === 1) return 'Tomorrow';
  if (days <= 7) return 'Just days away now';
  if (days <= 30) return 'Less than a month to go';
  if (days <= 100) return `${days} days to go`;
  if (days <= 365) return 'Less than a year to go';
  return 'Counting down to forever';
}

/** Current wall-clock time in Bohol, for guests planning from other zones. */
export function BoholClock() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(id);
  }, []);

  const time = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Manila',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(now);

  return (
    <p className="bohol-clock">
      It's <strong>{time}</strong> in Bohol right now
    </p>
  );
}

export function Countdown({ onDaysChange }: { onDaysChange?: (days: number) => void } = {}) {
  const [time, setTime] = useState(getTimeLeft);

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    onDaysChange?.(time.days);
  }, [time.days, onDaysChange]);

  return (
    <div className="countdown">
      {units.map((unit, i) => {
        const isSeconds = unit.key === 'seconds';
        return (
          <div className="countdown__unit" key={unit.key}>
            <motion.span
              key={`${unit.key}-${time[unit.key]}`}
              className="countdown__value"
              initial={isSeconds ? { opacity: 0.4 } : { opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={
                isSeconds
                  ? { duration: 0.15, ease: 'linear' }
                  : { duration: 0.35, ease: [0.25, 1, 0.5, 1] }
              }
            >
              {String(time[unit.key]).padStart(2, '0')}
            </motion.span>
            <span className="countdown__label">{unit.label}</span>
            {i < units.length - 1 && <span className="countdown__sep" aria-hidden="true">·</span>}
          </div>
        );
      })}
    </div>
  );
}
