import React, { useEffect, useRef } from 'react';

// Light-mode pastel colors for the HR corporate UI theme glows
const themeGlows = {
  red: { primary: '#ff3366', secondary: '#ff758c', bg: '#f8fafc' }, // Crimson Rose
  blue: { primary: '#2563eb', secondary: '#3b82f6', bg: '#f0f4f8' }, // Executive Blue
  gold: { primary: '#d97706', secondary: '#f59e0b', bg: '#faf8f5' }, // Champagne Gold
  green: { primary: '#059669', secondary: '#10b981', bg: '#f0fdf4' } // Emerald Green
};

export default function StarfieldBackground({ speedMultiplier = 1, activeTheme = 'red' }) {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Grid size for the clean designer grid overlay
    const gridSize = 45;

    // Drifting background orbs for soft gradients
    const orbs = [
      { x: width * 0.3, y: height * 0.4, vx: 0.25, vy: 0.15, radius: Math.max(width, height) * 0.4 },
      { x: width * 0.7, y: height * 0.6, vx: -0.2, vy: -0.25, radius: Math.max(width, height) * 0.35 }
    ];

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      orbs[0].radius = Math.max(width, height) * 0.4;
      orbs[1].radius = Math.max(width, height) * 0.35;
    };
    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e) => {
      mouseRef.current.targetX = e.clientX;
      mouseRef.current.targetY = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Initial mouse center position
    mouseRef.current.x = width / 2;
    mouseRef.current.y = height / 2;
    mouseRef.current.targetX = width / 2;
    mouseRef.current.targetY = height / 2;

    const render = () => {
      const colors = themeGlows[activeTheme] || themeGlows.red;

      // Lerp mouse coordinates
      const m = mouseRef.current;
      m.x += (m.targetX - m.x) * 0.05;
      m.y += (m.targetY - m.y) * 0.05;

      // 1. Light Solid base background
      ctx.fillStyle = colors.bg;
      ctx.fillRect(0, 0, width, height);

      // 2. Render drifting radial mesh glow orbs (Soft and pastel in light mode)
      orbs.forEach((orb, idx) => {
        orb.x += orb.vx * speedMultiplier * 0.8;
        orb.y += orb.vy * speedMultiplier * 0.8;

        if (orb.x < 0 || orb.x > width) orb.vx *= -1;
        if (orb.y < 0 || orb.y > height) orb.vy *= -1;

        const radialGrad = ctx.createRadialGradient(
          orb.x, orb.y, 0,
          orb.x, orb.y, orb.radius
        );
        
        const glowColor = idx === 0 ? colors.primary : colors.secondary;
        radialGrad.addColorStop(0, `${glowColor}10`); // Subtle 10% opacity
        radialGrad.addColorStop(0.5, `${glowColor}04`); // 4% opacity
        radialGrad.addColorStop(1, 'transparent');

        ctx.fillStyle = radialGrad;
        ctx.fillRect(0, 0, width, height);
      });

      // 3. Render mouse-following hover spotlight
      const mouseGrad = ctx.createRadialGradient(
        m.x, m.y, 0,
        m.x, m.y, Math.max(width, height) * 0.28
      );
      mouseGrad.addColorStop(0, `${colors.primary}08`); // Very faint hover glow
      mouseGrad.addColorStop(0.5, `${colors.secondary}02`);
      mouseGrad.addColorStop(1, 'transparent');

      ctx.fillStyle = mouseGrad;
      ctx.fillRect(0, 0, width, height);

      // 4. Render sleek light-gray designer grid lines
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.03)'; // Faint gray grid
      ctx.lineWidth = 1.0;

      // Vertical lines
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      // Horizontal lines
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [speedMultiplier, activeTheme]);

  return <canvas ref={canvasRef} style={{ position: 'fixed', inset: 0, zIndex: -1, pointerEvents: 'none' }} />;
}
