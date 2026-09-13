// "Love" in the languages that belong to this couple and their families:
// Bisaya, Filipino, English, Greek, Russian.
const WORDS = [
  { text: 'Gugma', lang: 'ceb' },
  { text: 'Pag-ibig', lang: 'fil' },
  { text: 'Love', lang: 'en' },
  { text: 'Αγάπη', lang: 'el' },
  { text: 'Любовь', lang: 'ru' },
];

export function LoveCycle() {
  return (
    <p className="hero__tagline love-row">
      {WORDS.map((w, i) => (
        <span className="love-row__item" key={w.lang}>
          <span lang={w.lang}>{w.text}</span>
          {i < WORDS.length - 1 && (
            <span className="love-row__sep" aria-hidden="true">
              ·
            </span>
          )}
        </span>
      ))}
    </p>
  );
}
