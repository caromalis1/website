import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

const ScrollStar = ({ 
  triggerSelector = '.star-track',
  starSize = 28,
  strokeWidth = 3,
  strokeColor = "white",
  persistentTrail = true,
  starImageSrc = "/Star1.png",
  hideStarOnReducedMotion = true,
  className = ""
}) => {
  const canvasRef = useRef(null);
  const starRef = useRef(null);
  const animationRef = useRef(null);
  const trailRef = useRef([]);
  const lastPositionRef = useRef({ x: 0, y: 0 });
  const velocityRef = useRef({ x: 0, y: 0 });
  const sectionProgressRef = useRef(0);
  const currentSectionRef = useRef(0);
  const [isInitialized, setIsInitialized] = useState(false);

  // Advanced path generation with organic curves and section-specific behaviors
  const generateOrganicPath = useCallback(() => {
    const sections = document.querySelectorAll('.takeover');
    if (sections.length === 0) return [];

    const viewportWidth = window.innerWidth;
    const isMobile = viewportWidth <= 768;
    const pathPoints = [];

    sections.forEach((section, index) => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const focusElement = section.querySelector('h1, h2, h3, .lead, p') || section;
      const rect = focusElement.getBoundingClientRect();
      const pageTop = rect.top + scrollTop;
      const pageBottom = rect.bottom + scrollTop;
      const pageLeft = rect.left;
      const pageRight = rect.right;
      const height = rect.height;

      // Create multiple waypoints per section for organic movement
      const waypoints = [];
      const numWaypoints = Math.max(3, Math.floor(height / 200));
      
      for (let i = 0; i < numWaypoints; i++) {
        const progress = i / (numWaypoints - 1);
        const y = pageTop + (height * progress);
        
        // Add organic variation based on section type and position
        let x, behavior;
        
        if (index % 3 === 0) {
          // S-curve pattern
          const baseX = pageLeft - (isMobile ? 20 : 30);
          const curveOffset = Math.sin(progress * Math.PI) * (isMobile ? 40 : 60);
          x = baseX + curveOffset;
          behavior = 'curve';
        } else if (index % 3 === 1) {
          // Zigzag pattern
          const baseX = pageLeft - (isMobile ? 15 : 25);
          const zigzagOffset = Math.sin(progress * Math.PI * 2) * (isMobile ? 30 : 45);
          x = baseX + zigzagOffset;
          behavior = 'zigzag';
        } else {
          // Loop pattern
          const baseX = pageLeft - (isMobile ? 25 : 35);
          const loopRadius = isMobile ? 25 : 35;
          const angle = progress * Math.PI * 2;
          x = baseX + Math.cos(angle) * loopRadius;
          behavior = 'loop';
        }

        // Add random organic variation
        const randomOffset = (Math.random() - 0.5) * (isMobile ? 10 : 15);
        x += randomOffset;

        waypoints.push({
          x: Math.max(10, Math.min(viewportWidth - 10, x)),
          y,
          behavior,
          sectionIndex: index,
          progress,
          pause: Math.random() < 0.3, // 30% chance of pause
          loopIntensity: Math.random() * 0.5 + 0.5
        });
      }

      pathPoints.push(...waypoints);
    });

    return pathPoints;
  }, []);

  // Canvas-based trail rendering
  const renderTrail = useCallback((ctx, trail, alpha = 1) => {
    if (trail.length < 2) return;

    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = strokeWidth;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.shadowColor = strokeColor;
    ctx.shadowBlur = 4;

    ctx.beginPath();
    ctx.moveTo(trail[0].x, trail[0].y);

    for (let i = 1; i < trail.length; i++) {
      const point = trail[i];
      const prevPoint = trail[i - 1];
      
      // Create smooth curves between points
      const cp1x = prevPoint.x + (point.x - prevPoint.x) * 0.3;
      const cp1y = prevPoint.y + (point.y - prevPoint.y) * 0.3;
      const cp2x = prevPoint.x + (point.x - prevPoint.x) * 0.7;
      const cp2y = prevPoint.y + (point.y - prevPoint.y) * 0.7;
      
      ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, point.x, point.y);
    }

    ctx.stroke();
    ctx.restore();
  }, [strokeColor, strokeWidth]);

  // Advanced easing function for organic movement
  const organicEase = useCallback((t, behavior = 'curve') => {
    switch (behavior) {
      case 'curve':
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      case 'zigzag':
        return t + 0.1 * Math.sin(t * Math.PI * 4);
      case 'loop':
        return t + 0.2 * Math.sin(t * Math.PI * 6);
      default:
        return t * t * (3 - 2 * t); // Smoothstep
    }
  }, []);

  // Calculate star position with momentum and easing
  const calculateStarPosition = useCallback((progress, pathPoints) => {
    if (pathPoints.length === 0) return { x: 0, y: 0 };

    const totalPoints = pathPoints.length;
    const rawIndex = progress * (totalPoints - 1);
    const index = Math.floor(rawIndex);
    const t = rawIndex - index;

    if (index >= totalPoints - 1) {
      return pathPoints[totalPoints - 1];
    }

    const currentPoint = pathPoints[index];
    const nextPoint = pathPoints[index + 1];
    
    // Apply organic easing
    const easedT = organicEase(t, currentPoint.behavior);
    
    // Add momentum-based variation
    const momentumX = velocityRef.current.x * 0.1;
    const momentumY = velocityRef.current.y * 0.1;
    
    // Calculate position with organic variation
    const x = currentPoint.x + (nextPoint.x - currentPoint.x) * easedT + momentumX;
    const y = currentPoint.y + (nextPoint.y - currentPoint.y) * easedT + momentumY;
    
    // Add section-specific behaviors
    if (currentPoint.pause && t < 0.1) {
      // Pause effect - slow down movement
      return { x: currentPoint.x, y: currentPoint.y };
    }
    
    if (currentPoint.behavior === 'loop') {
      // Add circular motion
      const loopRadius = 20 * currentPoint.loopIntensity;
      const angle = t * Math.PI * 2;
      const loopX = Math.cos(angle) * loopRadius;
      const loopY = Math.sin(angle) * loopRadius;
      return { x: x + loopX, y: y + loopY };
    }

    return { x, y };
  }, [organicEase]);

  // Update velocity for momentum
  const updateVelocity = useCallback((newPos) => {
    const lastPos = lastPositionRef.current;
    velocityRef.current = {
      x: (newPos.x - lastPos.x) * 0.3 + velocityRef.current.x * 0.7,
      y: (newPos.y - lastPos.y) * 0.3 + velocityRef.current.y * 0.7
    };
    lastPositionRef.current = newPos;
  }, []);

  // Performance optimization: throttle path generation
  const throttledPathGeneration = useCallback(() => {
    let timeoutId;
    return () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        generateOrganicPath();
      }, 100);
    };
  }, [generateOrganicPath]);

  // Cached path points for performance
  const cachedPathPointsRef = useRef([]);
  const lastPathUpdateRef = useRef(0);

  // Main animation loop with performance optimizations
  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    const star = starRef.current;
    if (!canvas || !star) return;

    const ctx = canvas.getContext('2d');
    const now = Date.now();
    
    // Only regenerate path if needed (every 500ms or on resize)
    if (now - lastPathUpdateRef.current > 500 || cachedPathPointsRef.current.length === 0) {
      cachedPathPointsRef.current = generateOrganicPath();
      lastPathUpdateRef.current = now;
    }
    
    const pathPoints = cachedPathPointsRef.current;
    if (pathPoints.length === 0) {
      requestAnimationFrame(animate);
      return;
    }

    // Clear canvas efficiently
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Get scroll progress
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollProgress = Math.min(1, Math.max(0, scrollTop / scrollHeight));

    // Calculate star position
    const starPos = calculateStarPosition(scrollProgress, pathPoints);
    
    // Update velocity
    updateVelocity(starPos);

    // Add trail point with throttling
    if (trailRef.current.length === 0 || 
        Math.abs(starPos.x - lastPositionRef.current.x) > 2 || 
        Math.abs(starPos.y - lastPositionRef.current.y) > 2) {
      trailRef.current.push({
        x: starPos.x,
        y: starPos.y,
        timestamp: now
      });
    }

    // Remove old trail points (fade out over 2 seconds)
    trailRef.current = trailRef.current.filter(point => 
      now - point.timestamp < 2000
    );

    // Render trail with fading effect (only if we have enough points)
    if (persistentTrail && trailRef.current.length > 2) {
      // Batch trail rendering for better performance
      ctx.save();
      ctx.globalCompositeOperation = 'source-over';
      
      // Render trail in segments for better performance
      const segmentSize = 10;
      for (let i = 0; i < trailRef.current.length - 1; i += segmentSize) {
        const segment = trailRef.current.slice(i, i + segmentSize + 1);
        if (segment.length < 2) continue;
        
        const age = now - segment[0].timestamp;
        const alpha = Math.max(0, 1 - (age / 2000));
        
        if (alpha > 0.01) { // Only render if visible
          renderTrail(ctx, segment, alpha);
        }
      }
      
      ctx.restore();
    }

    // Position star with GSAP for smooth animation
    gsap.set(star, {
      x: starPos.x - starSize / 2,
      y: starPos.y - starSize / 2,
      rotation: Math.atan2(velocityRef.current.y, velocityRef.current.x) * (180 / Math.PI),
      force3D: true // Enable hardware acceleration
    });

    // Add subtle breathing animation
    const breathingScale = 1 + Math.sin(now * 0.002) * 0.03;
    gsap.set(star, { 
      scale: breathingScale,
      force3D: true
    });

    // Continue animation loop
    animationRef.current = requestAnimationFrame(animate);
  }, [generateOrganicPath, calculateStarPosition, updateVelocity, renderTrail, persistentTrail, starSize]);

  // Initialize canvas and start animation
  useEffect(() => {
    const canvas = canvasRef.current;
    const star = starRef.current;
    
    if (!canvas || !star) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();

    // Check for reduced motion preference
    const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReduced && hideStarOnReducedMotion) {
      star.style.display = 'none';
      return;
    }

    // Start animation loop
    setIsInitialized(true);
    animate();

    // Handle resize
    const handleResize = () => {
      resizeCanvas();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
      // Clear trail data
      trailRef.current = [];
    };
  }, [animate, hideStarOnReducedMotion]);

  return (
    <div className={`star-overlay ${className}`} style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 50 }}>
      {/* Canvas for trail rendering */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none'
        }}
      />
      
      {/* The star that moves along the path */}
      <div
        ref={starRef}
        style={{
          position: 'absolute',
          width: starSize,
          height: starSize,
          pointerEvents: 'none',
          willChange: 'transform',
          transformOrigin: 'center'
        }}
      >
        <img
          src={starImageSrc}
          alt=""
          style={{
            width: '100%',
            height: '100%',
            filter: 'drop-shadow(0 0 4px rgba(255,255,255,0.8)) drop-shadow(0 0 12px rgba(255,255,255,0.4))',
            willChange: 'transform'
          }}
        />
      </div>
    </div>
  );
};

export default ScrollStar;
