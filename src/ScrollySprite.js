import { useEffect, useRef } from 'react';

/**
 * Animated sprite that follows scroll, snakes left/right, and leaves a fading trail.
 * Renders into the fixed `.sprite-overlay` container using a canvas for performance.
 */
export default function ScrollySprite() {
  const canvasRef = useRef(null);
  const rafRef = useRef(0);
  const pointsRef = useRef([]);
  const dotsRef = useRef([]);
  const dimsRef = useRef({ w: 0, h: 0, dpr: 1 });

  useEffect(() => {
    const container = document.getElementById('sprite-overlay');
    if (!container) return;

    const canvas = document.createElement('canvas');
    canvas.className = 'sprite-canvas';
    container.appendChild(canvas);
    canvasRef.current = canvas;

    const ctx = canvas.getContext('2d');

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = container.clientWidth;
      const h = container.clientHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      dimsRef.current = { w, h, dpr };
    };

    const getSpritePosition = (t) => {
      const { w, h } = dimsRef.current;
      const xCenter = w * 0.5;
      const amplitude = Math.min(220, w * 0.25);
      const x = xCenter + Math.sin(t * 0.0015) * amplitude;
      const y = (t * 0.12) % (h + 200) - 100; // flow downward, wrap slightly offscreen
      return { x, y };
    };

    const maxTrail = 220; // number of points to smooth the path
    const dotSpacing = 26; // px between dotted marks
    let lastDotY = -Infinity;
    const draw = (now) => {
      rafRef.current = requestAnimationFrame(draw);
      if (!ctx) return;
      const { w, h, dpr } = dimsRef.current;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      // Time derived from scroll position for coupling with scroll
      const t = (window.scrollY || window.pageYOffset || 0) + now * 0.2;
      const pos = getSpritePosition(t);
      pointsRef.current.push(pos);
      if (pointsRef.current.length > maxTrail) pointsRef.current.shift();

      // Persist dotted markers along the path
      if (Math.abs(pos.y - lastDotY) >= dotSpacing) {
        dotsRef.current.push({ x: pos.x, y: pos.y });
        lastDotY = pos.y;
      }

      // Draw dotted, persistent trail
      for (let i = 0; i < dotsRef.current.length; i++) {
        const d = dotsRef.current[i];
        const fade = Math.min(1, Math.max(0.2, (i + 1) / dotsRef.current.length));
        ctx.beginPath();
        ctx.fillStyle = `rgba(91, 140, 255, ${0.55 * fade})`;
        ctx.arc(d.x, d.y, 3.2, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw sprite (circle)
      ctx.beginPath();
      ctx.fillStyle = '#5b8cff';
      ctx.shadowColor = '#5b8cff88';
      ctx.shadowBlur = 16;
      ctx.arc(pos.x, pos.y, 10, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    };

    const onScroll = () => {
      // keep dotted trail persistent; only smooth the recent path points
      if (pointsRef.current.length > 0) {
        pointsRef.current.splice(0, Math.floor(pointsRef.current.length * 0.05));
      }
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('scroll', onScroll, { passive: true });
    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', onScroll);
      container.removeChild(canvas);
    };
  }, []);

  return null;
}


