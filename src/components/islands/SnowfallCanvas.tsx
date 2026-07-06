import { useEffect, useRef } from "react";

type SnowParticle = {
  x: number;
  y: number;
  radius: number;
  alpha: number;
  speed: number;
  drift: number;
  wobble: number;
  phase: number;
};

type CanvasSize = {
  width: number;
  height: number;
};

const MAX_DPR = 2;

function randomBetween(min: number, max: number) {
  return min + Math.random() * (max - min);
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function getParticleCount({ width, height }: CanvasSize) {
  const isMobile = width < 720;
  const density = isMobile ? 22000 : 15000;
  const count = Math.round((width * height) / density);

  return clamp(count, isMobile ? 28 : 52, isMobile ? 72 : 138);
}

function createParticle(size: CanvasSize, startInView = false): SnowParticle {
  const isMobile = size.width < 720;
  const radiusMax = isMobile ? 2.1 : 2.8;

  return {
    x: randomBetween(-24, size.width + 24),
    y: startInView ? randomBetween(0, size.height) : randomBetween(-90, -8),
    radius: randomBetween(0.7, radiusMax),
    alpha: randomBetween(0.28, 0.72),
    speed: randomBetween(0.18, isMobile ? 0.48 : 0.62),
    drift: randomBetween(-0.16, 0.2),
    wobble: randomBetween(0.8, 1.8),
    phase: randomBetween(0, Math.PI * 2),
  };
}

export default function SnowfallCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const particles: SnowParticle[] = [];
    const size: CanvasSize = { width: 0, height: 0 };
    let animationFrame = 0;
    let resizeFrame = 0;
    let lastTime = performance.now();
    let isRunning = false;

    const resetParticle = (particle: SnowParticle) => {
      Object.assign(particle, createParticle(size));
    };

    const resize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);

      size.width = width;
      size.height = height;

      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      context.setTransform(dpr, 0, 0, dpr, 0, 0);

      const targetCount = getParticleCount(size);
      if (particles.length > targetCount) {
        particles.length = targetCount;
      }

      while (particles.length < targetCount) {
        particles.push(createParticle(size, true));
      }
    };

    const draw = (time: number) => {
      if (!isRunning) return;

      const delta = clamp((time - lastTime) / 16.67, 0.5, 2.4);
      lastTime = time;

      context.clearRect(0, 0, size.width, size.height);

      for (const particle of particles) {
        const wobble = Math.sin(time * 0.001 * particle.wobble + particle.phase) * 0.18;
        particle.x += (particle.drift + wobble) * delta;
        particle.y += particle.speed * delta;

        if (particle.y > size.height + 10 || particle.x < -40 || particle.x > size.width + 40) {
          resetParticle(particle);
        }

        context.beginPath();
        context.fillStyle = `rgba(255, 255, 255, ${particle.alpha})`;
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        context.fill();
      }

      animationFrame = window.requestAnimationFrame(draw);
    };

    const stop = () => {
      isRunning = false;
      window.cancelAnimationFrame(animationFrame);
      context.clearRect(0, 0, size.width, size.height);
    };

    const start = () => {
      if (isRunning || motionQuery.matches || document.hidden) return;

      isRunning = true;
      lastTime = performance.now();
      animationFrame = window.requestAnimationFrame(draw);
    };

    const syncMotion = () => {
      if (motionQuery.matches) {
        stop();
        return;
      }

      resize();
      start();
    };

    const handleResize = () => {
      window.cancelAnimationFrame(resizeFrame);
      resizeFrame = window.requestAnimationFrame(() => {
        resize();
        if (!motionQuery.matches && !document.hidden) {
          start();
        }
      });
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        stop();
        return;
      }

      start();
    };

    resize();
    start();

    window.addEventListener("resize", handleResize, { passive: true });
    document.addEventListener("visibilitychange", handleVisibilityChange);
    motionQuery.addEventListener("change", syncMotion);

    return () => {
      stop();
      window.cancelAnimationFrame(resizeFrame);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      motionQuery.removeEventListener("change", syncMotion);
    };
  }, []);

  return <canvas className="snowfall-canvas" aria-hidden="true" ref={canvasRef} />;
}
