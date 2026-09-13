import { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Botanical } from './Botanical';

type Stage = 'gate' | 'playing' | 'done';

export function EnvelopeIntro({ onFinish }: { onFinish: () => void }) {
  const [stage, setStage] = useState<Stage>('gate');
  const videoRef = useRef<HTMLVideoElement>(null);

  function handleEnter() {
    if (stage !== 'gate') return;
    setStage('playing');
    const video = videoRef.current;
    if (!video) {
      setStage('done');
      return;
    }
    video.play().catch(() => setStage('done'));
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
            onEnded={() => setStage('done')}
            onError={() => setStage('done')}
            data-visible={stage === 'playing'}
          />

          <AnimatePresence>
            {stage === 'gate' && (
              <motion.div
                className="intro__gate"
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <Botanical variant="bloom" className="botanical intro__crest" />
                <p className="intro__eyebrow">Save the date</p>
                <p className="intro__names">Chantily &amp; Maksim</p>

                <motion.button
                  type="button"
                  className="intro__enter"
                  onClick={handleEnter}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.2, ease: [0.25, 1, 0.5, 1] }}
                >
                  Open invitation
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>

          {stage === 'playing' && (
            <button type="button" className="intro__skip" onClick={() => setStage('done')}>
              Skip
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
