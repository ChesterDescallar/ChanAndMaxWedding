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

// Served as a real file (public/save-the-date.ics) rather than built
// client-side. iOS Safari's handling of script-triggered downloads and
// `data:` navigations to Calendar is unreliable across versions - a plain
// link the guest taps directly is the one approach that works consistently
// on Apple Calendar, Outlook, and everything else that reads .ics.
const ICS_URL = '/save-the-date.ics';

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
            <a
              className="cal__option"
              href={ICS_URL}
              download="maksim-and-chantily-save-the-date.ics"
              onClick={() => setOpen(false)}
            >
              Apple Calendar
            </a>
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
