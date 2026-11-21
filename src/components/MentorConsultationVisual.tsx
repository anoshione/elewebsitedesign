import React, { useEffect, useRef, useState, useCallback } from 'react';

interface MentorConsultationVisualProps {
  className?: string;
  isMobile?: boolean;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  maxLife: number;
  life: number;
  type: 'orb' | 'star' | 'ember';
  rotation: number;
  rotSpeed: number;
}

export const MentorConsultationVisual: React.FC<MentorConsultationVisualProps> = ({
  className = '',
  isMobile = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isTouching, setIsTouching] = useState(false);
  const [shockwaveKey, setShockwaveKey] = useState(0);
  const [contactCoords, setContactCoords] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const particlesRef = useRef<Particle[]>([]);
  const animFrameRef = useRef<number | null>(null);
  const cycleTimerRef = useRef<number | null>(null);

  // Calculate current contact point pixel coordinates based on object-cover scaling
  const updateContactPosition = useCallback(() => {
    if (!containerRef.current) return { x: 0, y: 0 };
    const rect = containerRef.current.getBoundingClientRect();
    const W = rect.width;
    const H = rect.height;

    // Original image dimensions
    const imgW = 1200;
    const imgH = 896;

    // Contact point normalized in original image (fingertip on champagne rim)
    const normX = 675 / imgW; // ~56.25%
    const normY = 372 / imgH; // ~41.52%

    if (isMobile) {
      const x = W * normX;
      const y = H * normY;
      setContactCoords({ x, y });
      return { x, y };
    }

    // Desktop object-cover object-left
    const scale = Math.max(W / imgW, H / imgH);
    const scaledW = imgW * scale;
    const scaledH = imgH * scale;

    // object-left means X offset is 0
    const offsetX = 0;
    // vertical center offset
    const offsetY = (H - scaledH) / 2;

    const x = offsetX + scaledW * normX;
    const y = offsetY + scaledH * normY;

    setContactCoords({ x, y });
    return { x, y };
  }, [isMobile]);

  // Spawn particle explosion when finger touches the glass
  const spawnParticleBurst = useCallback((count = 42) => {
    const coords = updateContactPosition();
    if (!coords || coords.x <= 0) return;

    const colors = [
      '#FFE57F', // bright gold
      '#FCD34D', // amber yellow
      '#10B981', // vibrant emerald
      '#34D399', // bright mint
      '#06B6D4', // radiant cyan
      '#FFFFFF', // pure sparkle white
      '#A7F3D0', // soft glass green
    ];

    const newParticles: Particle[] = [];

    for (let i = 0; i < count; i++) {
      // Direct angle towards left/upwards onto the glass face (angles from 110 deg to 260 deg)
      // plus some 360-degree ambient scatter
      const isDirected = Math.random() < 0.75;
      const angle = isDirected
        ? Math.PI * (0.6 + Math.random() * 0.9) // 108 deg to 270 deg (towards badge)
        : Math.random() * Math.PI * 2; // full scatter

      const speed = 1.2 + Math.random() * 4.8;
      const size = 1.8 + Math.random() * 4.2;
      const maxLife = 50 + Math.floor(Math.random() * 45);

      const typeRoll = Math.random();
      const type: 'orb' | 'star' | 'ember' =
        typeRoll < 0.35 ? 'star' : typeRoll < 0.75 ? 'orb' : 'ember';

      newParticles.push({
        x: coords.x + (Math.random() - 0.5) * 6,
        y: coords.y + (Math.random() - 0.5) * 6,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 0.9 + Math.random() * 0.1,
        maxLife,
        life: 0,
        type,
        rotation: Math.random() * Math.PI,
        rotSpeed: (Math.random() - 0.5) * 0.12,
      });
    }

    particlesRef.current.push(...newParticles);
    setIsTouching(true);
    setShockwaveKey((prev) => prev + 1);

    // After touch duration, release touch state
    setTimeout(() => {
      setIsTouching(false);
    }, 1200);
  }, [updateContactPosition]);

  // Main Canvas Particle Render Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let isRunning = true;

    const render = () => {
      if (!isRunning) return;

      const dpr = window.devicePixelRatio || 1;
      const W = canvas.width / dpr;
      const H = canvas.height / dpr;

      ctx.clearRect(0, 0, W, H);

      const particles = particlesRef.current;
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life += 1;

        if (p.life >= p.maxLife) {
          particles.splice(i, 1);
          continue;
        }

        // Physics
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.96; // drag
        p.vy *= 0.96;
        p.vy -= 0.035; // gentle upward buoyancy
        p.rotation += p.rotSpeed;

        const progress = p.life / p.maxLife;
        // Fade in rapidly, then ease out
        const currentAlpha = progress < 0.15
          ? (progress / 0.15) * p.alpha
          : (1 - (progress - 0.15) / 0.85) * p.alpha;

        ctx.save();
        ctx.globalAlpha = Math.max(0, Math.min(1, currentAlpha));

        if (p.type === 'star') {
          // 4-pointed cross twinkle star
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rotation);
          ctx.fillStyle = p.color;
          ctx.shadowColor = p.color;
          ctx.shadowBlur = 8;

          const s = p.size * (1 - progress * 0.4);
          ctx.beginPath();
          // Draw diamond 4-pointed star
          ctx.moveTo(0, -s * 2);
          ctx.quadraticCurveTo(0, 0, s * 2, 0);
          ctx.quadraticCurveTo(0, 0, 0, s * 2);
          ctx.quadraticCurveTo(0, 0, -s * 2, 0);
          ctx.quadraticCurveTo(0, 0, 0, -s * 2);
          ctx.fill();

          // Bright center
          ctx.beginPath();
          ctx.arc(0, 0, s * 0.4, 0, Math.PI * 2);
          ctx.fillStyle = '#FFFFFF';
          ctx.fill();
        } else if (p.type === 'orb') {
          // Soft glowing orb with radial halo
          ctx.shadowColor = p.color;
          ctx.shadowBlur = 10;
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * (1 - progress * 0.3), 0, Math.PI * 2);
          ctx.fill();

          // Tiny specular core
          ctx.beginPath();
          ctx.arc(p.x - p.size * 0.2, p.y - p.size * 0.2, p.size * 0.25, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
          ctx.fill();
        } else {
          // Micro ember dot with sparkle
          ctx.fillStyle = p.color;
          ctx.shadowColor = p.color;
          ctx.shadowBlur = 6;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 0.8, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      isRunning = false;
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, []);

  // Resize observer to keep canvas sharp and matched to container DPR
  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current || !canvasRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;

      canvasRef.current.width = rect.width * dpr;
      canvasRef.current.height = rect.height * dpr;

      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        ctx.scale(dpr, dpr);
      }

      updateContactPosition();
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [updateContactPosition]);

  // Touch & Particle Animation Cycle Loop:
  // Cycle duration: 3.8s
  // Contact happens at 32% (1.216s into cycle)
  useEffect(() => {
    const cycleDurationMs = 3800;
    const contactDelayMs = 1216;

    let isMounted = true;

    const triggerCycle = () => {
      if (!isMounted) return;

      // Contact trigger at exactly 1.216s
      setTimeout(() => {
        if (!isMounted) return;
        spawnParticleBurst(45);
      }, contactDelayMs);
    };

    // First cycle immediate
    triggerCycle();

    // Repeating loop
    cycleTimerRef.current = window.setInterval(triggerCycle, cycleDurationMs);

    return () => {
      isMounted = false;
      if (cycleTimerRef.current) {
        clearInterval(cycleTimerRef.current);
      }
    };
  }, [spawnParticleBurst]);

  // Interactive tap on hover or click
  const handleInteractiveTap = () => {
    spawnParticleBurst(55);
  };

  return (
    <div
      ref={containerRef}
      onClick={handleInteractiveTap}
      className={`relative overflow-hidden select-none cursor-pointer group ${className}`}
      title="Click or tap to interact"
    >
      {/* Layer 1: Pristine 3D Glass Hexagon Badge Plate (No static sparkles, no hand) */}
      <img
        src="/assets/cta/cta_badge_plate.jpg"
        alt="3D Lead Mentor Consultation Badge"
        className="w-full h-full object-cover object-left select-none pointer-events-none"
        loading="eager"
      />

      {/* Layer 2: Subtle Energy Glow on Inner 3D Arrow when touched */}
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${
          isTouching ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          background:
            'radial-gradient(circle at 45% 55%, rgba(16, 185, 129, 0.22) 0%, rgba(52, 211, 153, 0.08) 45%, transparent 70%)',
        }}
      />

      {/* Layer 3: Dynamic Particle Canvas (Physics-driven sparkles, stars, and embers) */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
      />

      {/* Layer 4: Shockwave Ripples and Flare Bloom at Contact Point */}
      {contactCoords.x > 0 && (
        <div
          className="absolute pointer-events-none z-20"
          style={{
            left: `${contactCoords.x}px`,
            top: `${contactCoords.y}px`,
            transform: 'translate(-50%, -50%)',
          }}
        >
          {/* Expanding Luminous Ripple */}
          <div
            key={`ripple-${shockwaveKey}`}
            className="absolute -inset-10 rounded-full border border-emerald-400/80 animate-cta-ripple pointer-events-none"
          />

          {/* Radial Bloom Flare Flash */}
          <div
            className={`w-14 h-14 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none transition-all duration-300 ${
              isTouching ? 'scale-125 opacity-100' : 'scale-75 opacity-0'
            }`}
            style={{
              background:
                'radial-gradient(circle, rgba(255,255,255,0.95) 0%, rgba(252,211,77,0.75) 30%, rgba(16,185,129,0.4) 65%, transparent 100%)',
              filter: 'blur(2px)',
            }}
          />
        </div>
      )}

      {/* Layer 5: Animated 3D Hand Layer (Reaching, touching glass, and releasing) */}
      <img
        src="/assets/cta/cta_hand_layer.png"
        alt="Hand touching 3D glass badge"
        className="absolute inset-0 w-full h-full object-cover object-left select-none pointer-events-none z-30 animate-cta-hand-touch"
      />

      {/* Inline Styles for Hardware-Accelerated Touch Animation & Shockwave Ripple */}
      <style>{`
        @keyframes ctaHandTouch {
          0% {
            transform: translate3d(14px, 10px, 0) scale(0.985);
          }
          26% {
            transform: translate3d(8px, 6px, 0) scale(0.992);
          }
          32% {
            /* Touch point contact */
            transform: translate3d(0, 0, 0) scale(1);
          }
          35% {
            /* Micro compression press */
            transform: translate3d(-1px, -0.8px, 0) scale(1.002);
          }
          64% {
            /* Holding contact */
            transform: translate3d(0, 0, 0) scale(1);
          }
          76% {
            /* Smoothly release */
            transform: translate3d(10px, 7px, 0) scale(0.988);
          }
          88%, 100% {
            /* Hover rest position */
            transform: translate3d(14px, 10px, 0) scale(0.985);
          }
        }

        @keyframes ctaRipple {
          0% {
            transform: scale(0.15);
            opacity: 0.95;
            box-shadow: 0 0 10px rgba(52, 211, 153, 0.8), inset 0 0 10px rgba(252, 211, 77, 0.6);
          }
          50% {
            opacity: 0.6;
            box-shadow: 0 0 25px rgba(16, 185, 129, 0.5), inset 0 0 15px rgba(52, 211, 153, 0.4);
          }
          100% {
            transform: scale(2.4);
            opacity: 0;
            box-shadow: 0 0 40px rgba(16, 185, 129, 0);
          }
        }

        .animate-cta-hand-touch {
          animation: ctaHandTouch 3.8s cubic-bezier(0.25, 1, 0.5, 1) infinite;
          will-change: transform;
        }

        .animate-cta-ripple {
          animation: ctaRipple 1.2s cubic-bezier(0.1, 0.8, 0.3, 1) forwards;
          will-change: transform, opacity;
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-cta-hand-touch {
            animation: none;
            transform: translate3d(0, 0, 0);
          }
          .animate-cta-ripple {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
};

export default MentorConsultationVisual;
