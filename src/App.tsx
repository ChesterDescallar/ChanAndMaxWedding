import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Botanical } from './components/Botanical';
import { Countdown } from './components/Countdown';
import { ParallaxLayer } from './components/ParallaxLayer';
import { Reveal } from './components/Reveal';
import './App.css';

const RSVP_EMAIL = 'chantilyandmax.rsvp@gmail.com';
const RSVP_DEADLINE = 'November 28, 2027';

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
        <Reveal delay={0.1}>
          <p className="eyebrow">Together with their families</p>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="hero__lede">you are warmly invited to the wedding of</p>
        </Reveal>

        <div className="hero__names">
          <Reveal delay={0.35} y={40}>
            <h1 className="hero__name">Chantily</h1>
          </Reveal>
          <Reveal delay={0.5}>
            <span className="hero__and">and</span>
          </Reveal>
          <Reveal delay={0.65} y={40}>
            <h1 className="hero__name">Maksim</h1>
          </Reveal>
        </div>

        <Reveal delay={0.85}>
          <p className="hero__tagline">Two hearts &nbsp;·&nbsp; One journey &nbsp;·&nbsp; Forever</p>
        </Reveal>

        <Reveal delay={1}>
          <div className="hero__date-pill">
            <span>Saturday, May 28, 2028</span>
            <span className="hero__date-pill-dot" />
            <span>Bohol, Philippines</span>
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
    <section className="story">
      <ParallaxLayer speed={0.12} className="story__sprig story__sprig--left">
        <Botanical variant="sprig" className="botanical botanical--tall" />
      </ParallaxLayer>
      <ParallaxLayer speed={0.18} className="story__sprig story__sprig--right">
        <Botanical variant="sprig" className="botanical botanical--tall" />
      </ParallaxLayer>

      <div className="story__inner">
        <Reveal>
          <p className="eyebrow eyebrow--center">Save the date</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="story__heading">
            After years of building a life together, we're ready to make it official —
            surrounded by the people we love most.
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <Botanical variant="frame" className="botanical story__divider" />
        </Reveal>
        <Reveal delay={0.25}>
          <p className="story__body">
            We can't wait to celebrate with you on the shores of Bohol — with island air,
            good food, and the ones who mean the most to us.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function DetailsSection() {
  return (
    <section className="details">
      <div className="details__panel">
        <Reveal>
          <p className="eyebrow eyebrow--center">The details</p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="details__date">
            <span className="details__weekday">Saturday</span>
            <div className="details__daymonth">
              <span className="details__month">May</span>
              <span className="details__day">28</span>
              <span className="details__year">2028</span>
            </div>
            <span className="details__time">at 4:00 PM</span>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="details__venue">
            <svg viewBox="0 0 24 24" className="pin" aria-hidden="true">
              <path
                fill="currentColor"
                d="M12 2C7.86 2 4.5 5.36 4.5 9.5c0 5.53 6.53 11.7 6.8 11.96a1 1 0 0 0 1.4 0c.27-.26 6.8-6.43 6.8-11.96C19.5 5.36 16.14 2 12 2Zm0 10.25a2.75 2.75 0 1 1 0-5.5 2.75 2.75 0 0 1 0 5.5Z"
              />
            </svg>
            <p className="details__venue-name">Bellevue Pangalao</p>
            <p className="details__venue-loc">Bohol, Philippines</p>
          </div>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="details__rsvp-note">
            <p className="details__rsvp-title">Kindly RSVP</p>
            <p className="details__rsvp-sub">
              by {RSVP_DEADLINE}
              <br />
              <em>(6 months before the wedding)</em>
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.4}>
          <Countdown />
        </Reveal>
      </div>
    </section>
  );
}

function RsvpSection() {
  const [choice, setChoice] = useState<'yes' | 'no' | null>(null);

  const mailHref = (response: 'Yes' | 'No') =>
    `mailto:${RSVP_EMAIL}?subject=${encodeURIComponent(
      `RSVP — Chantily & Maksim's Wedding`
    )}&body=${encodeURIComponent(`${response}, I'll be there!\n\nGuest name(s): `)}`;

  return (
    <section className="rsvp">
      <ParallaxLayer speed={0.15} className="rsvp__sprig">
        <Botanical variant="sprig" className="botanical botanical--tall" />
      </ParallaxLayer>

      <div className="rsvp__inner">
        <Reveal>
          <p className="eyebrow eyebrow--center">Will you join us?</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="rsvp__heading">We can't wait to celebrate with you</h2>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="rsvp__buttons">
            <motion.a
              href={mailHref('Yes')}
              className="rsvp__btn rsvp__btn--yes"
              onClick={() => setChoice('yes')}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.2, ease: [0.25, 1, 0.5, 1] }}
            >
              <EnvelopeIcon />
              <span>
                Yes <em>I'll be there</em>
              </span>
            </motion.a>
            <motion.a
              href={mailHref('No')}
              className="rsvp__btn rsvp__btn--no"
              onClick={() => setChoice('no')}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.2, ease: [0.25, 1, 0.5, 1] }}
            >
              <EnvelopeIcon />
              <span>
                No <em>sorry</em>
              </span>
            </motion.a>
          </div>
        </Reveal>

        {choice && (
          <motion.p
            className="rsvp__ack"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
          >
            Your email app should be opening now — thank you for letting us know!
          </motion.p>
        )}

        <Reveal delay={0.3}>
          <p className="rsvp__via">
            Your response will be sent via email to
            <br />
            <a href={`mailto:${RSVP_EMAIL}`} className="rsvp__email">
              {RSVP_EMAIL}
            </a>
          </p>
        </Reveal>

        <Reveal delay={0.4}>
          <div className="rsvp__travel">
            <Botanical variant="frame" className="botanical" />
            <h3>For our guests travelling from afar</h3>
            <p>
              We understand that many of you will be travelling from far away to celebrate
              with us. As a small gesture of our appreciation, accommodation will be provided
              for our guests.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function EnvelopeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="envelope" aria-hidden="true">
      <path
        fill="currentColor"
        d="M3 6.5A1.5 1.5 0 0 1 4.5 5h15A1.5 1.5 0 0 1 21 6.5v11A1.5 1.5 0 0 1 19.5 19h-15A1.5 1.5 0 0 1 3 17.5v-11Zm1.7.2 6.77 5.42a.8.8 0 0 0 1.06 0L19.3 6.7a.5.5 0 0 0-.3-.9H5a.5.5 0 0 0-.3.9Z"
      />
    </svg>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <Reveal>
        <Botanical variant="frame" className="botanical" />
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
  return (
    <>
      <Hero />
      <StorySection />
      <DetailsSection />
      <RsvpSection />
      <Footer />
    </>
  );
}

export default App;
