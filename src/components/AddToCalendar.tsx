import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const TITLE = 'Maksim & Chantily - Wedding';
const LOCATION = 'Bohol, Philippines';
const DETAILS =
  'Save the date! Maksim and Chantily are getting married in Bohol, Philippines. A formal invitation with RSVP details will follow.';

// 4:00 PM Philippine time (UTC+8) on 28 May 2028, as UTC stamps.
const START_UTC = '20280528T080000Z';
const END_UTC = '20280528T160000Z';

const GOOGLE_URL =
  'https://calendar.google.com/calendar/render?action=TEMPLATE' +
  `&text=${encodeURIComponent(TITLE)}` +
  `&dates=${START_UTC}/${END_UTC}` +
  `&details=${encodeURIComponent(DETAILS)}` +
  `&location=${encodeURIComponent(LOCATION)}`;

function buildIcs() {
  // Escape per RFC 5545: backslashes, semicolons, commas, then newlines.
  const esc = (s: string) => s.replace(/([\\;,])/g, '\\$1').replace(/\n/g, '\\n');

  // RFC 5545 caps lines at 75 octets; longer ones must be folded onto
  // continuation lines beginning with a space, or strict parsers reject them.
  const fold = (line: string) => {
    if (line.length <= 75) return line;
    const parts = [line.slice(0, 75)];
    let rest = line.slice(75);
    while (rest.length > 74) {
      parts.push(' ' + rest.slice(0, 74));
      rest = rest.slice(74);
    }
    if (rest.length) parts.push(' ' + rest);
    return parts.join('\r\n');
  };

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Maksim and Chantily//Save the Date//EN',
    'CALSCALE:GREGORIAN',
    'BEGIN:VEVENT',
    `UID:wedding-2028-05-28@maksimandchantily`,
    `DTSTAMP:${START_UTC}`,
    `DTSTART:${START_UTC}`,
    `DTEND:${END_UTC}`,
    `SUMMARY:${esc(TITLE)}`,
    `DESCRIPTION:${esc(DETAILS)}`,
    `LOCATION:${esc(LOCATION)}`,
    'BEGIN:VALARM',
    'TRIGGER:-P7D',
    'ACTION:DISPLAY',
    `DESCRIPTION:${esc(TITLE)}`,
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ]
    .map(fold)
    .join('\r\n');
}

const FILENAME = 'maksim-and-chantily-save-the-date.ics';

function isIos() {
  if (typeof navigator === 'undefined') return false;
  return (
    /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    // iPadOS 13+ reports as a Mac, so check for a touch-capable "Mac".
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
  );
}

function downloadIcs() {
  const ics = buildIcs();

  // iOS Safari ignores the `download` attribute on blob: URLs, so the file
  // never reaches Calendar. Navigating to a data: URL hands the payload to
  // the system, which opens it in Calendar instead.
  if (isIos()) {
    window.location.href = `data:text/calendar;charset=utf-8,${encodeURIComponent(ics)}`;
    return;
  }

  const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = FILENAME;
  link.rel = 'noopener';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  // Revoking immediately can cancel the download before the browser reads
  // the blob, so let the current task finish first.
  setTimeout(() => URL.revokeObjectURL(url), 10_000);
}

export function AddToCalendar() {
  const [open, setOpen] = useState(false);

  return (
    <div className="cal">
      <motion.button
        type="button"
        className="cal__trigger"
        onClick={() => setOpen((v) => !v)}
        whileTap={{ scale: 0.97 }}
        transition={{ duration: 0.2, ease: [0.25, 1, 0.5, 1] }}
        aria-expanded={open}
      >
        <CalendarIcon />
        Add to your calendar
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="cal__options"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          >
            <a
              className="cal__option"
              href={GOOGLE_URL}
              target="_blank"
              rel="noreferrer noopener"
              onClick={() => setOpen(false)}
            >
              Google Calendar
            </a>
            <button
              type="button"
              className="cal__option"
              onClick={() => {
                downloadIcs();
                setOpen(false);
              }}
            >
              Apple / Outlook
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" className="cal__icon" aria-hidden="true">
      <path
        fill="currentColor"
        d="M7 2a1 1 0 0 1 1 1v1h8V3a1 1 0 1 1 2 0v1h1.5A1.5 1.5 0 0 1 21 5.5v14a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 19.5v-14A1.5 1.5 0 0 1 4.5 4H6V3a1 1 0 0 1 1-1Zm12 8H5v9h14v-9Z"
      />
    </svg>
  );
}
