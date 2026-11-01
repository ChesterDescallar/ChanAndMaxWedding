import { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Botanical } from './Botanical';

type Stage = 'gate' | 'loading' | 'playing' | 'done';

// On a poor connection, give up waiting and go straight to the site.
const LOAD_TIMEOUT_MS = 8000;

type EnvelopeIntroProps = {
  /** Fires as the intro starts fading, so the page can animate in beneath it. */
  onReveal: () => void;
  onFinish: () => void;
};

export function EnvelopeIntro({ onReveal, onFinish }: EnvelopeIntroProps) {
  const [stage, setStage] = useState<Stage>('gate');
  const videoRef = useRef<HTMLVideoElement>(null);
  const loadTimer = useRef<number | undefined>(undefined);

  function close() {
    window.clearTimeout(loadTimer.current);
    setStage('done');
    onReveal();
  }

  function handleEnter() {
    if (stage !== 'gate') return;
    const video = videoRef.current;
    if (!video) {
      close();
      return;
    }
    setStage('loading');
    loadTimer.current = window.setTimeout(close, LOAD_TIMEOUT_MS);
    video.play().catch(close);
  }

  function handlePlaying() {
    window.clearTimeout(loadTimer.current);
    setStage((current) => (current === 'loading' ? 'playing' : current));
  }

  return (
    <AnimatePresence onExitComplete={onFinish}>
      {stage !== 'done' && (
        <motion.div
          className="intro"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <video
            ref={videoRef}
            className="intro__video"
            src="/opening.mp4"
            preload="auto"
            playsInline
            muted
            onPlaying={handlePlaying}
            onEnded={() => {
              // Hold on the final frame so the card stays readable before handing off.
              window.setTimeout(close, 900);
            }}
            onError={close}
            data-visible={stage === 'playing'}
          />

          <AnimatePresence>
            {(stage === 'gate' || stage === 'loading') && (
              <motion.div
                className="intro__gate"
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <Botanical variant="bloom" className="botanical intro__crest" />
                <p className="intro__eyebrow">Save the date</p>
                <p className="intro__names">Maksim &amp; Chantily</p>

                <motion.button
                  type="button"
                  className="intro__enter"
                  onClick={handleEnter}
                  aria-busy={stage === 'loading'}
                  animate={stage === 'loading' ? { opacity: [1, 0.55, 1] } : { opacity: 1 }}
                  whileTap={{ scale: 0.97 }}
                  transition={
                    stage === 'loading'
                      ? { duration: 1.2, repeat: Infinity, ease: 'easeInOut' }
                      : { duration: 0.2, ease: [0.25, 1, 0.5, 1] }
                  }
                >
                  Open
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>

          {stage === 'playing' && (
            <button type="button" className="intro__skip" onClick={close}>
              Skip
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
