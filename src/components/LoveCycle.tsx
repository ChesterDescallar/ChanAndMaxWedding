import { Fragment } from 'react';

// "Love" in the languages that belong to this couple and their families:
// Bisaya, Filipino, English, Greek, Russian.
const WORDS = [
  { text: 'Gugma', lang: 'ceb' },
  { text: 'Pag-ibig', lang: 'fil' },
  { text: 'Love', lang: 'en' },
  { text: 'Αγάπη', lang: 'el' },
  { text: 'Любовь', lang: 'ru' },
];

// On phones the row splits here, so no single language is left alone on a line.
const BREAK_AFTER = 2;

export function LoveCycle() {
  return (
    <p className="hero__tagline love-row">
      {WORDS.map((w, i) => (
        <Fragment key={w.lang}>
          <span className="love-row__item">
            <span lang={w.lang}>{w.text}</span>
            {i < WORDS.length - 1 && (
              <span
                className={`love-row__sep ${i === BREAK_AFTER ? 'love-row__sep--break' : ''}`.trim()}
                aria-hidden="true"
              >
                ·
              </span>
            )}
          </span>
          {i === BREAK_AFTER && <span className="love-row__break" aria-hidden="true" />}
        </Fragment>
      ))}
    </p>
  );
}
