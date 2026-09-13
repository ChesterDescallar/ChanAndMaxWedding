import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';

const BRUSH = 26;
// Fraction of foil removed before we auto-clear the rest.
const CLEAR_AT = 0.35;

export function ScratchCard() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const drawing = useRef(false);
  const moveCount = useRef(0);
  const lastPoint = useRef<{ x: number; y: number } | null>(null);
  const [revealed, setRevealed] = useState(false);
  const reduce = useReducedMotion();

  const paintFoil = useCallback(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    const rect = wrap.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(rect.width * dpr);
    canvas.height = Math.round(rect.height * dpr);
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.scale(dpr, dpr);

    const grad = ctx.createLinearGradient(0, 0, rect.width, rect.height);
    grad.addColorStop(0, '#c9a24a');
    grad.addColorStop(0.35, '#e3c882');
    grad.addColorStop(0.55, '#b8923f');
    grad.addColorStop(1, '#d9b968');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, rect.width, rect.height);

    // Fleck the foil so it reads as textured leaf rather than flat gold.
    ctx.globalAlpha = 0.16;
    for (let i = 0; i < Math.round(rect.width * 1.4); i++) {
      const x = Math.random() * rect.width;
      const y = Math.random() * rect.height;
      ctx.fillStyle = Math.random() > 0.5 ? '#fff3d0' : '#8f6f28';
      ctx.fillRect(x, y, 1.6, 1.6);
    }
    ctx.globalAlpha = 1;
  }, []);

  useEffect(() => {
    if (reduce) return;
    paintFoil();

    // Only repaint on a real width change. Mobile browsers fire `resize`
    // constantly as the URL bar hides and shows, and repainting there would
    // erase whatever the guest had already scratched off.
    let lastWidth = wrapRef.current?.getBoundingClientRect().width ?? 0;
    const onResize = () => {
      const width = wrapRef.current?.getBoundingClientRect().width ?? 0;
      if (revealed || Math.abs(width - lastWidth) < 2) return;
      lastWidth = width;
      paintFoil();
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [paintFoil, reduce, revealed]);

  const scratchedFraction = () => {
    const canvas = canvasRef.current;
    if (!canvas) return 0;
    const ctx = canvas.getContext('2d');
    if (!ctx) return 0;
    const { width, height } = canvas;
    const data = ctx.getImageData(0, 0, width, height).data;
    let clear = 0;
    // Sample every 32nd pixel; exact precision is unnecessary here.
    const step = 32;
    let counted = 0;
    for (let i = 3; i < data.length; i += 4 * step) {
      if (data[i] === 0) clear++;
      counted++;
    }
    return counted ? clear / counted : 0;
  };

  const scratchAt = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas || revealed) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.lineWidth = BRUSH;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    const prev = lastPoint.current;
    if (prev) {
      ctx.beginPath();
      ctx.moveTo(prev.x, prev.y);
      ctx.lineTo(x, y);
      ctx.stroke();
    }
    ctx.beginPath();
    ctx.arc(x, y, BRUSH / 2, 0, Math.PI * 2);
    ctx.fill();
    lastPoint.current = { x, y };
  };

  const start = (x: number, y: number) => {
    drawing.current = true;
    lastPoint.current = null;
    scratchAt(x, y);
  };

  const end = () => {
    if (!drawing.current) return;
    drawing.current = false;
    lastPoint.current = null;
    if (!revealed && scratchedFraction() > CLEAR_AT) setRevealed(true);
  };

  if (reduce) {
    return (
      <div className="scratch scratch--plain">
        <ScratchMessage />
      </div>
    );
  }

  return (
    <div className="scratch">
      <p className="scratch__hint">{revealed ? 'A note from us' : 'Scratch to reveal'}</p>

      <div className="scratch__card" ref={wrapRef}>
        <div className="scratch__under">
          <ScratchMessage />
        </div>

        <motion.canvas
          ref={canvasRef}
          className="scratch__foil"
          animate={{ opacity: revealed ? 0 : 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ pointerEvents: revealed ? 'none' : 'auto' }}
          onPointerDown={(e) => {
            e.currentTarget.setPointerCapture(e.pointerId);
            start(e.clientX, e.clientY);
          }}
          onPointerMove={(e) => {
            if (!drawing.current) return;
            scratchAt(e.clientX, e.clientY);
            // Sampling every move is wasteful, so check periodically instead.
            moveCount.current += 1;
            if (moveCount.current % 14 === 0 && scratchedFraction() > CLEAR_AT) {
              setRevealed(true);
            }
          }}
          onPointerUp={end}
          onPointerCancel={end}
          onPointerLeave={end}
        />
      </div>

      {/* Keyboard and screen-reader users get a plain button; dragging is not
          an accessible interaction on its own. */}
      {!revealed && (
        <button type="button" className="scratch__reveal" onClick={() => setRevealed(true)}>
          Reveal the note
        </button>
      )}
    </div>
  );
}

function ScratchMessage() {
  return (
    <p className="scratch__message">
      Whether you can make the journey or not, thank you for being part of our story. We
      can't wait to share this with you.
    </p>
  );
}
