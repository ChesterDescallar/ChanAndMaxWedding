import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Botanical } from './components/Botanical';
import { Countdown } from './components/Countdown';
import { EnvelopeIntro } from './components/EnvelopeIntro';
import { ParallaxLayer } from './components/ParallaxLayer';
import { Reveal } from './components/Reveal';
import './App.css';

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const fgY = useTransform(scrollYProgress, [0, 1], ['0%', '55%']);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  return (
    <section className="hero" ref={ref}>
      <motion.div className="hero__bg" style={{ y: bgY, scale }} />
      <div className="hero__vignette" />

      <motion.div className="hero__corner hero__corner--tl" style={{ y: fgY }}>
        <Botanical variant="corner" className="botanical" />
      </motion.div>
      <motion.div className="hero__corner hero__corner--br" style={{ y: fgY }}>
        <Botanical variant="corner" className="botanical" />
      </motion.div>

      <motion.div className="hero__content" style={{ opacity: fade }}>
        <Reveal delay={0.05}>
          <Botanical variant="bloom" className="botanical hero__crest" />
        </Reveal>
        <Reveal delay={0.15}>
          <p className="eyebrow eyebrow--center">Save the date 🤍</p>
        </Reveal>
        <Reveal delay={0.25}>
          <p className="hero__lede">together with their families, warmly announce the wedding of</p>
        </Reveal>

        <div className="hero__names">
          <Reveal delay={0.4} y={40}>
            <h1 className="hero__name">Chantily</h1>
          </Reveal>
          <Reveal delay={0.55}>
            <span className="hero__and">and</span>
          </Reveal>
          <Reveal delay={0.7} y={40}>
            <h1 className="hero__name">Maksim</h1>
          </Reveal>
        </div>

        <Reveal delay={0.9}>
          <p className="hero__tagline">Two hearts &nbsp;·&nbsp; One journey &nbsp;·&nbsp; Forever</p>
        </Reveal>

        <Reveal delay={1.05}>
          <div className="hero__date-pill">
            <span>28 May 2028</span>
            <span className="hero__date-pill-dot" />
            <span>Bohol, Philippines 🇵🇭</span>
          </div>
        </Reveal>
      </motion.div>

      <motion.div className="hero__scroll-cue" style={{ opacity: fade }}>
        <span>Scroll</span>
        <motion.span
          className="hero__scroll-line"
          animate={{ scaleY: [0.2, 1, 0.2], opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  );
}

function StorySection() {
  return (
    <section className="story" id="main-content">
      <ParallaxLayer speed={0.14} className="story__bloom story__bloom--left">
        <Botanical variant="bloom" className="botanical" />
      </ParallaxLayer>

      <div className="story__grid">
        <div className="story__lead">
          <Reveal>
            <p className="eyebrow">Our story</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="story__heading">
              After years of building a life together, we're ready to make it official.
            </h2>
          </Reveal>
        </div>

        <div className="story__copy">
          <Reveal delay={0.15}>
            <ParallaxLayer speed={0.08} className="story__rule-wrap">
              <Botanical variant="frame" className="botanical story__divider" />
            </ParallaxLayer>
          </Reveal>
          <Reveal delay={0.25}>
            <p className="story__body">
              We can't wait to celebrate with you on the shores of Bohol, with island air,
              good food, and the ones who mean the most to us.
            </p>
          </Reveal>
          <Reveal delay={0.35}>
            <p className="story__body story__body--soft">
              Expect an evening of warm breezes, long tables, and dancing until the tide
              comes in. Come as you are, and stay as long as the stories last.
            </p>
          </Reveal>
        </div>
      </div>

      <ParallaxLayer speed={0.2} className="story__sprig story__sprig--right">
        <Botanical variant="sprig" className="botanical botanical--tall" />
      </ParallaxLayer>
    </section>
  );
}

function DetailsSection() {
  return (
    <section className="details">
      <ParallaxLayer speed={0.1} className="details__garland">
        <Botanical variant="garland" className="botanical" />
      </ParallaxLayer>

      <div className="details__grid">
        <Reveal>
          <div className="details__col details__col--date">
            <p className="eyebrow">The details</p>
            <div className="details__date">
              <span className="details__weekday">Saturday</span>
              <div className="details__daymonth">
                <span className="details__month">May</span>
                <span className="details__day">28</span>
                <span className="details__year">2028</span>
              </div>
              <span className="details__time">Ceremony at 4:00 PM</span>
              <span className="details__subject-note">(subject to change, we'll let you know!)</span>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="details__col details__col--venue">
            <div className="details__venue">
              <svg viewBox="0 0 24 24" className="pin" aria-hidden="true">
                <path
                  fill="currentColor"
                  d="M12 2C7.86 2 4.5 5.36 4.5 9.5c0 5.53 6.53 11.7 6.8 11.96a1 1 0 0 0 1.4 0c.27-.26 6.8-6.43 6.8-11.96C19.5 5.36 16.14 2 12 2Zm0 10.25a2.75 2.75 0 1 1 0-5.5 2.75 2.75 0 0 1 0 5.5Z"
                />
              </svg>
              <p className="details__venue-name">Bohol, Philippines</p>
            </div>

            <div className="details__invite-note">
              <p className="details__invite-title">Formal invitation to follow</p>
              <p className="details__invite-sub">
                with all the details you'll need
                <br />
                <em>for now, just pencil us in</em>
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="details__col details__col--countdown">
            <p className="details__countdown-label">Counting down to forever</p>
            <Countdown />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function TravelSection() {
  return (
    <section className="travel" id="travel-info">
      <ParallaxLayer speed={0.15} className="travel__sprig">
        <Botanical variant="sprig" className="botanical botanical--tall" />
      </ParallaxLayer>

      <div className="travel__inner">
        <Reveal>
          <p className="eyebrow eyebrow--center">Until then</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="travel__heading">A formal invitation with RSVP details will follow</h2>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="travel__reassurance">
            We know it's a long way to travel, and we completely understand that joining us
            may not be possible for everyone. There is absolutely no pressure. Your love and
            support mean just as much to us from wherever you are.
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="travel__note">
            <Botanical variant="frame" className="botanical" />
            <h3>For our guests travelling from afar</h3>
            <p className="travel__note-intro">
              We understand that many of you will be travelling from far away to celebrate
              with us. Please read these basics before you start planning.
            </p>
            <ul className="travel__list">
              <li>
                <strong>Lodging dates:</strong> accommodation is covered for four nights,
                May 26 to 30, 2028. Book any extra nights on either side yourself.
              </li>
              <li>
                <strong>Airport:</strong> fly into Bohol–Panglao International Airport (TAG).
              </li>
              <li>
                <strong>Passport validity:</strong> international guests should have at least
                6 months' validity remaining beyond your travel dates to enter the Philippines.
              </li>
              <li>
                <strong>Booking guide:</strong> a hotel block and step-by-step booking guide
                will be posted here closer to the date.
              </li>
            </ul>
          </div>
        </Reveal>

        <Reveal delay={0.3}>
          <p className="travel__closing">
            For those who can make the journey, we can't wait to celebrate together! 🌴🥂
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function ImportantJumpButton() {
  const [canHover, setCanHover] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(hover: hover) and (pointer: fine)');
    setCanHover(query.matches);
    const listener = (e: MediaQueryListEvent) => setCanHover(e.matches);
    query.addEventListener('change', listener);
    return () => query.removeEventListener('change', listener);
  }, []);

  return (
    <motion.a
      href="#travel-info"
      className="jump-btn"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
      whileHover={canHover ? { y: -2 } : undefined}
      whileTap={{ scale: 0.96 }}
    >
      <span className="jump-btn__dot" aria-hidden="true" />
      Important travel info
    </motion.a>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <Reveal>
        <Botanical variant="wreath" className="botanical footer__wreath" />
      </Reveal>
      <Reveal delay={0.1}>
        <p className="footer__names">Chantily &amp; Maksim</p>
      </Reveal>
      <Reveal delay={0.15}>
        <p className="footer__date">05 · 28 · 2028</p>
      </Reveal>
    </footer>
  );
}

function App() {
  const [showIntro, setShowIntro] = useState(() => {
    if (typeof window === 'undefined') return true;
    return !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  return (
    <>
      {showIntro && <EnvelopeIntro onFinish={() => setShowIntro(false)} />}
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <Hero />
      <StorySection />
      <DetailsSection />
      <TravelSection />
      <Footer />
      <ImportantJumpButton />
    </>
  );
}

export default App;
