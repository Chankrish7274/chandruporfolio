import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

// Coordinates path defining the winding road layout overlaid on the image background
// Normalized to coordinates within a viewBox [0 to 1000, 0 to 400]
const roadPoints = [
  { x: 0, y: 310, label: 'Origin', name: 'Origin' },
  { x: 180, y: 260, label: 'Education', name: "St. Joseph's College" },
  { x: 360, y: 300, label: 'Internship', name: 'Astonish Infotech' },
  { x: 550, y: 220, label: 'Projects', name: 'Project Kingdom' },
  { x: 740, y: 280, label: 'Services', name: 'Freelance Workspace' },
  { x: 1000, y: 230, label: 'Future', name: 'Future Horizon' }
];

// Helper to calculate coordinates along a multi-point polyline segment
function getPositionOnPath(ratio) {
  const segmentCount = roadPoints.length - 1;
  const rawIndex = ratio * segmentCount;
  const index = Math.min(segmentCount - 1, Math.floor(rawIndex));
  const segmentRatio = rawIndex - index;

  const startPoint = roadPoints[index];
  const endPoint = roadPoints[index + 1];

  const x = startPoint.x + (endPoint.x - startPoint.x) * segmentRatio;
  const y = startPoint.y + (endPoint.y - startPoint.y) * segmentRatio;

  // Compute tangent/angle facing direction
  const dx = endPoint.x - startPoint.x;
  const dy = endPoint.y - startPoint.y;
  const angle = Math.atan2(dy, dx) * (180 / Math.PI);

  return { x, y, angle };
}

export default function RealisticHillsJourney({ 
  pins, 
  activePinIndex, 
  setActivePinIndex, 
  exploreStarted,
  activeTheme 
}) {
  const cyclistRef = useRef(null);
  
  // Theme color maps for UI accent details
  const themeColors = {
    red: '#ff3366',
    blue: '#3b82f6',
    gold: '#d4af37',
    green: '#10b981'
  };

  const currentAccent = themeColors[activeTheme] || themeColors.red;

  // Animate the 2D cyclist along the winding hills path based on the selected checkpoint
  useEffect(() => {
    if (activePinIndex !== null && cyclistRef.current) {
      const targetRatio = activePinIndex / (pins.length - 1);
      
      const animObj = { progress: activePinIndex === 0 ? 0 : (activePinIndex - 1) / (pins.length - 1) };
      
      gsap.to(animObj, {
        progress: targetRatio,
        duration: 1.8,
        ease: 'power2.inOut',
        onUpdate: () => {
          const { x, y, angle } = getPositionOnPath(animObj.progress);
          
          // Position and rotate the cyclist group relative to road slope
          gsap.set(cyclistRef.current, {
            x: x,
            y: y,
            rotation: angle
          });
        }
      });
    } else if (cyclistRef.current) {
      // Return to origin on reset
      gsap.set(cyclistRef.current, {
        x: roadPoints[0].x,
        y: roadPoints[0].y,
        rotation: -15
      });
    }
  }, [activePinIndex, pins]);

  // Construct SVG points string
  const svgPathPoints = roadPoints.map(p => `${p.x},${p.y}`).join(' ');

  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'rgba(0, 0, 0, 0.4)',
      overflow: 'hidden',
      zIndex: 2
    }}>
      
      {/* Container holding the background and SVG coordinates overlay */}
      <div style={{
        position: 'relative',
        width: '100%',
        maxWidth: '1200px',
        height: '480px',
        margin: '0 20px',
        borderRadius: '12px',
        border: `1px solid rgba(255,255,255,0.05)`,
        boxShadow: '0 20px 50px rgba(0,0,0,0.8)',
        background: `url('/images/realistic-hills.png') no-repeat center center`,
        backgroundSize: 'cover',
        overflow: 'hidden'
      }}>
        
        {/* Ambient Dark Overlay to match tactical dashboard */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(10,4,6,0.3) 0%, rgba(10,4,6,0.8) 100%)',
          pointerEvents: 'none'
        }} />

        {/* 2D SVG Winding Road and Cyclist Character Layer */}
        <svg 
          viewBox="0 0 1000 400" 
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'auto'
          }}
        >
          {/* 1. ROAD PATH */}
          <polyline
            points={svgPathPoints}
            fill="none"
            stroke={currentAccent}
            strokeWidth="3.5"
            strokeDasharray="6,6"
            style={{ filter: `drop-shadow(0 0 5px ${currentAccent})`, opacity: 0.8 }}
          />

          {/* 2. ROAD BASE SHADOW */}
          <polyline
            points={svgPathPoints}
            fill="none"
            stroke="#000"
            strokeWidth="8"
            style={{ opacity: 0.25, transform: 'translateY(3px)' }}
          />

          {/* 3. CHECKPOINT GLOWING PORTS */}
          {roadPoints.map((pt, idx) => {
            const isActive = activePinIndex === idx;
            return (
              <g 
                key={pt.label} 
                onClick={() => setActivePinIndex(idx)}
                style={{ cursor: 'pointer' }}
              >
                {/* Outer Glow Ring */}
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r={isActive ? 12 : 8}
                  fill="none"
                  stroke={currentAccent}
                  strokeWidth="2.5"
                  style={{
                    filter: `drop-shadow(0 0 6px ${currentAccent})`,
                    transition: 'all 0.3s ease'
                  }}
                />
                
                {/* Inner Core */}
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r={isActive ? 6 : 4}
                  fill="#ffffff"
                  style={{ transition: 'all 0.3s ease' }}
                />

                {/* Floating Checkpoint Details (Label & Name) */}
                <foreignObject
                  x={pt.x - 70}
                  y={pt.y - 48}
                  width="140"
                  height="40"
                >
                  <div style={{
                    textAlign: 'center',
                    fontFamily: "'Orbitron', sans-serif",
                    fontSize: '8px',
                    color: '#fff',
                    background: 'rgba(6, 9, 19, 0.9)',
                    border: `1px solid ${isActive ? currentAccent : 'rgba(255,255,255,0.1)'}`,
                    borderRadius: '4px',
                    padding: '3px 6px',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.5)',
                    textShadow: isActive ? `0 0 4px ${currentAccent}` : 'none',
                    transform: isActive ? 'scale(1.05)' : 'scale(1)',
                    transition: 'all 0.25s'
                  }}>
                    {pins[idx]?.icon} {pt.label.toUpperCase()}
                  </div>
                </foreignObject>
              </g>
            );
          })}

          {/* 4. REALISTIC BICYCLE & PEDALING CHARACTER */}
          <g ref={cyclistRef} id="svg-cyclist" transform="translate(0, 310) rotate(-15)">
            {/* Translate to center the cyclist on path coordinates */}
            <g transform="translate(-25, -45) scale(0.6)">
              
              {/* Back Wheel */}
              <circle cx="20" cy="65" r="14" fill="none" stroke={currentAccent} strokeWidth="2.5" />
              <circle cx="20" cy="65" r="14" fill="none" stroke="#ffffff" strokeWidth="1" strokeDasharray="2,2" className="cyclist-wheel" />

              {/* Front Wheel */}
              <circle cx="70" cy="65" r="14" fill="none" stroke={currentAccent} strokeWidth="2.5" />
              <circle cx="70" cy="65" r="14" fill="none" stroke="#ffffff" strokeWidth="1" strokeDasharray="2,2" className="cyclist-wheel" />

              {/* Bicycle Metal Frame */}
              <path d="M 20 65 L 42 65 L 58 46 L 34 46 L 20 65 M 42 65 L 34 46 M 70 65 L 58 46" fill="none" stroke="#ffffff" strokeWidth="2" />
              
              {/* Seat Stem & Seat */}
              <line x1="34" y1="46" x2="32" y2="40" stroke="#ffffff" strokeWidth="2" />
              <path d="M 27 40 L 37 40" stroke="#111" strokeWidth="3" strokeLinecap="round" />

              {/* Handlebar Stem & Handlebars */}
              <line x1="58" y1="46" x2="62" y2="34" stroke="#ffffff" strokeWidth="2" />
              <path d="M 58 34 L 66 34" stroke="#111" strokeWidth="3" strokeLinecap="round" />

              {/* Rider Torso */}
              <path d="M 32 40 L 46 22 L 58 35" fill="none" stroke="#ffffff" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />

              {/* Rider Head & Helmet */}
              <circle cx="48" cy="14" r="5.5" fill="#fcd34d" />
              <path d="M 44 11 Q 48 6 52 11 Z" fill={currentAccent} />

              {/* Pedaling Legs (Using CSS Animations on path coordinates) */}
              <path d="M 45 48 L 38 60 L 40 73" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" className="cyclist-left-leg" />
              <path d="M 45 48 L 52 56 L 50 64" fill="none" stroke={currentAccent} strokeWidth="3" strokeLinecap="round" className="cyclist-right-leg" />

            </g>
          </g>
        </svg>

      </div>
    </div>
  );
}
