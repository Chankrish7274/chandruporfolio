import React, { useRef, useState, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Html, Line } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';

// Theme configuration colors for 3D elements
const themeColorsMap = {
  red: { accent: '#ff3366', secondary: '#ff758c', mountainWire: '#e11d48', mountainBase: '#1f030a', cyclistFrame: '#be123c', treeGreen: '#2e1218' },
  blue: { accent: '#3b82f6', secondary: '#60a5fa', mountainWire: '#2563eb', mountainBase: '#081024', cyclistFrame: '#1d4ed8', treeGreen: '#0f172a' },
  gold: { accent: '#d4af37', secondary: '#ffd700', mountainWire: '#b59228', mountainBase: '#1a1405', cyclistFrame: '#8c6d17', treeGreen: '#1c1917' },
  green: { accent: '#10b981', secondary: '#34d399', mountainWire: '#059669', mountainBase: '#051c14', cyclistFrame: '#065f46', treeGreen: '#062e21' }
};

// Height function to generate realistic rolling hills (matching Joshua's World)
function getTerrainHeight(x, z) {
  // Smooth sine-cosine waves for rolling terrain
  return Math.sin(x * 0.4) * Math.cos(z * 0.4) * 0.75 + Math.sin(x * 1.1) * Math.cos(z * 1.1) * 0.18;
}

// Pathway definition: returns 3D coordinates along the winding road
function getPathPosition(angle) {
  // A slightly waving circle around the center of the hills
  const r = 2.4 + Math.sin(angle * 3) * 0.28;
  const x = Math.sin(angle) * r;
  const z = Math.cos(angle) * r;
  const y = getTerrainHeight(x, z) - 0.38; // Align slightly above the ground
  return new THREE.Vector3(x, y, z);
}

// 3D Pine Tree component
function PineTree({ x, z, colors }) {
  const y = getTerrainHeight(x, z) - 0.45; // Align to terrain surface
  const scale = useRef(0.6 + Math.random() * 0.5);

  return (
    <group position={[x, y, z]} scale={[scale.current, scale.current, scale.current]}>
      {/* Trunk */}
      <mesh position={[0, 0.15, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 0.3, 8]} />
        <meshBasicMaterial color="#3e2723" />
      </mesh>
      
      {/* Leaves Layers */}
      <mesh position={[0, 0.4, 0]}>
        <coneGeometry args={[0.26, 0.4, 8]} />
        <meshBasicMaterial color={colors.treeGreen} />
      </mesh>
      <mesh position={[0, 0.62, 0]}>
        <coneGeometry args={[0.2, 0.35, 8]} />
        <meshBasicMaterial color={colors.accent} wireframe />
      </mesh>
      <mesh position={[0, 0.8, 0]}>
        <coneGeometry args={[0.14, 0.3, 8]} />
        <meshBasicMaterial color={colors.secondary} />
      </mesh>
    </group>
  );
}

// Realistic 3D Cyclist Character & Bike (matching Joshua's World)
function Cyclist({ speed = 1, colors, cyclistAngle }) {
  const cyclistRef = useRef(null);
  const leftLegRef = useRef(null);
  const rightLegRef = useRef(null);
  const leftShinRef = useRef(null);
  const rightShinRef = useRef(null);
  const wheelsRef = useRef([]);

  // Calculate current cyclist position and direction (tangent of winding path)
  useFrame((state) => {
    if (!cyclistRef.current) return;

    const angle = cyclistAngle.current;
    const currentPos = getPathPosition(angle);
    const forwardPos = getPathPosition(angle + 0.05); // slightly ahead

    // Position cyclist on winding path
    cyclistRef.current.position.copy(currentPos);
    
    // Look at next position to face forward realistically
    cyclistRef.current.lookAt(forwardPos);

    // Dynamic pedaling joints animation
    const time = state.clock.getElapsedTime() * speed * 5;
    
    // Pedal circular coordinates
    const leftPedalPhase = time;
    const rightPedalPhase = time + Math.PI;

    // Spin wheels
    wheelsRef.current.forEach(w => {
      if (w) w.rotation.y = time * 1.5;
    });

    // Animate thighs (up and down)
    if (leftLegRef.current) {
      leftLegRef.current.rotation.x = -0.5 + Math.sin(leftPedalPhase) * 0.38;
    }
    if (rightLegRef.current) {
      rightLegRef.current.rotation.x = -0.5 + Math.sin(rightPedalPhase) * 0.38;
    }

    // Animate shins (bending at knees)
    if (leftShinRef.current) {
      leftShinRef.current.rotation.x = 0.5 + Math.cos(leftPedalPhase) * 0.25;
    }
    if (rightShinRef.current) {
      rightShinRef.current.rotation.x = 0.5 + Math.cos(rightPedalPhase) * 0.25;
    }
  });

  return (
    <group ref={cyclistRef} scale={[0.26, 0.26, 0.26]}>
      
      {/* 1. BICYCLE FRAME */}
      <group position={[0, 0.45, 0]} rotation={[0, Math.PI / 2, 0]}>
        
        {/* Front Wheel */}
        <group position={[0.7, -0.45, 0]}>
          <mesh ref={el => wheelsRef.current[0] = el}>
            <torusGeometry args={[0.3, 0.02, 6, 24]} />
            <meshBasicMaterial color={colors.accent} wireframe />
          </mesh>
          {/* Wheel Spokes */}
          <Line points={[[-0.3, 0, 0], [0.3, 0, 0]]} color={colors.accent} lineWidth={1} />
          <Line points={[[0, -0.3, 0], [0, 0.3, 0]]} color={colors.accent} lineWidth={1} />
        </group>

        {/* Rear Wheel */}
        <group position={[-0.7, -0.45, 0]}>
          <mesh ref={el => wheelsRef.current[1] = el}>
            <torusGeometry args={[0.3, 0.02, 6, 24]} />
            <meshBasicMaterial color={colors.accent} wireframe />
          </mesh>
          <Line points={[[-0.3, 0, 0], [0.3, 0, 0]]} color={colors.accent} lineWidth={1} />
          <Line points={[[0, -0.3, 0], [0, 0.3, 0]]} color={colors.accent} lineWidth={1} />
        </group>

        {/* Metal Frame Tubes */}
        <Line points={[[-0.7, -0.45, 0], [0, -0.45, 0], [-0.15, 0.1, 0], [-0.7, -0.45, 0]]} color="#ffffff" lineWidth={3} />
        <Line points={[[0, -0.45, 0], [0.55, 0.22, 0], [-0.15, 0.1, 0]]} color="#ffffff" lineWidth={3} />
        <Line points={[[0.55, 0.22, 0], [0.7, -0.45, 0]]} color={colors.cyclistFrame} lineWidth={3} />

        {/* Handlebars */}
        <Line points={[[0.55, 0.22, 0], [0.5, 0.42, 0]]} color={colors.cyclistFrame} lineWidth={3} />
        <mesh position={[0.5, 0.42, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.015, 0.015, 0.4, 8]} />
          <meshBasicMaterial color={colors.accent} />
        </mesh>

        {/* Seat */}
        <mesh position={[-0.15, 0.15, 0]} rotation={[0, 0, 0.2]}>
          <boxGeometry args={[0.15, 0.03, 0.08]} />
          <meshBasicMaterial color="#111" />
        </mesh>

        {/* Pedals Bracket */}
        <mesh position={[0, -0.45, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.03, 0.03, 0.2, 8]} />
          <meshBasicMaterial color="#333" />
        </mesh>
      </group>

      {/* 2. RIDER CHARACTER */}
      <group position={[0, 0.45, 0]} rotation={[0, Math.PI / 2, 0]}>
        
        {/* Torso */}
        <mesh position={[-0.2, 0.42, 0]} rotation={[0, 0, -0.4]}>
          <cylinderGeometry args={[0.1, 0.06, 0.52, 8]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>

        {/* Head */}
        <mesh position={[0.0, 0.72, 0]}>
          <sphereGeometry args={[0.09, 10, 10]} />
          <meshBasicMaterial color="#fcd34d" />
        </mesh>
        {/* Helmet */}
        <mesh position={[0.02, 0.78, 0]} scale={[1.1, 0.7, 1.1]}>
          <sphereGeometry args={[0.09, 10, 10]} />
          <meshBasicMaterial color={colors.accent} />
        </mesh>

        {/* Arms (holding handlebars) */}
        <Line points={[[-0.12, 0.58, 0.08], [0.48, 0.42, 0.15]]} color="#ffffff" lineWidth={2} />
        <Line points={[[-0.12, 0.58, -0.08], [0.48, 0.42, -0.15]]} color="#ffffff" lineWidth={2} />

        {/* Left Leg & Shin (Pedaling joint nodes) */}
        <group position={[-0.16, 0.28, 0.08]} ref={leftLegRef}>
          {/* Thigh */}
          <mesh position={[0, -0.16, 0]} rotation={[0, 0, 0.2]}>
            <cylinderGeometry args={[0.04, 0.03, 0.32, 8]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
          {/* Shin */}
          <group position={[0, -0.32, 0]} ref={leftShinRef}>
            <mesh position={[0, -0.16, 0]} rotation={[0, 0, -0.3]}>
              <cylinderGeometry args={[0.03, 0.02, 0.32, 8]} />
              <meshBasicMaterial color={colors.cyclistFrame} />
            </mesh>
          </group>
        </group>

        {/* Right Leg & Shin (Pedaling joint nodes) */}
        <group position={[-0.16, 0.28, -0.08]} ref={rightLegRef}>
          {/* Thigh */}
          <mesh position={[0, -0.16, 0]} rotation={[0, 0, 0.2]}>
            <cylinderGeometry args={[0.04, 0.03, 0.32, 8]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
          {/* Shin */}
          <group position={[0, -0.32, 0]} ref={rightShinRef}>
            <mesh position={[0, -0.16, 0]} rotation={[0, 0, -0.3]}>
              <cylinderGeometry args={[0.03, 0.02, 0.32, 8]} />
              <meshBasicMaterial color={colors.cyclistFrame} />
            </mesh>
          </group>
        </group>

      </group>
    </group>
  );
}

export default function GlobeScene({ 
  pins, 
  activePinIndex, 
  setActivePinIndex, 
  exploreStarted,
  activeTheme
}) {
  const { camera } = useThree();
  const terrainRef = useRef(null);
  
  // Keep path angle in ref
  const cyclistAngle = useRef(0);
  const targetCameraAngle = useRef(0);

  // Initialize pine tree coordinates once
  const [trees] = useState(() => {
    const coords = [];
    // Place trees around the landscape but away from the path
    for (let i = 0; i < 28; i++) {
      const angle = Math.random() * Math.PI * 2;
      // Winding road radius is around 2.4. Put trees inside or outside path
      const r = Math.random() > 0.4 ? 1.0 + Math.random() * 0.9 : 2.8 + Math.random() * 1.8;
      coords.push({
        x: Math.sin(angle) * r,
        z: Math.cos(angle) * r
      });
    }
    return coords;
  });

  const colors = themeColorsMap[activeTheme || 'red'];

  // Apply terrain heightmap displacement on mount
  useEffect(() => {
    if (terrainRef.current) {
      const pos = terrainRef.current.geometry.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        const x = pos.getX(i);
        const y = pos.getY(i);
        const zHeight = getTerrainHeight(x, y);
        pos.setZ(i, zHeight);
      }
      terrainRef.current.geometry.computeVertexNormals();
      terrainRef.current.geometry.attributes.position.needsUpdate = true;
    }
  }, []);

  // Animate camera and cyclist angles based on active milestones
  useEffect(() => {
    if (!exploreStarted) return;

    if (activePinIndex !== null) {
      // Find angle for active checkpoint
      const targetAngle = (activePinIndex / pins.length) * Math.PI * 2;
      
      // Animate cyclist to match the checkpoint position
      gsap.to(cyclistAngle, {
        current: targetAngle,
        duration: 1.5,
        ease: 'power2.out'
      });

      // Position camera slightly behind/above the cyclist at the checkpoint
      const camAngle = targetAngle - 0.75;
      const camPos = getPathPosition(camAngle);

      gsap.to(camera.position, {
        x: camPos.x * 1.5,
        y: camPos.y + 1.25,
        z: camPos.z * 1.5,
        duration: 1.8,
        ease: 'power3.out'
      });

      // Target camera lookAt point
      const lookAtPos = getPathPosition(targetAngle);
      setTimeout(() => {
        camera.lookAt(lookAtPos);
      }, 50);

    } else {
      // Default idle camera view showing the whole rolling island
      gsap.to(camera.position, {
        x: 0,
        y: 3.5,
        z: 6.0,
        duration: 2.0,
        ease: 'power2.out'
      });
      camera.lookAt(new THREE.Vector3(0, 0, 0));
    }
  }, [activePinIndex, exploreStarted, pins, camera]);

  useFrame((state) => {
    // If not selected, cyclist cycles continuously
    if (activePinIndex === null && exploreStarted) {
      cyclistAngle.current += 0.006;
      
      // Camera slowly orbits the scene showing the rolling hills
      targetCameraAngle.current += 0.002;
      camera.position.x = Math.sin(targetCameraAngle.current) * 6.2;
      camera.position.z = Math.cos(targetCameraAngle.current) * 6.2;
      camera.position.y = 3.6 + Math.sin(state.clock.getElapsedTime() * 0.5) * 0.4;
      camera.lookAt(new THREE.Vector3(0, -0.4, 0));
    }
  });

  return (
    <group>
      <ambientLight intensity={1.8} />
      <directionalLight position={[2, 6, 4]} intensity={1.6} />
      <pointLight position={[0, 1.2, 0]} intensity={1.4} color={colors.accent} />

      {/* 1. HEIGHT-MAPPED ROLLING HILLS (Joshua's World) */}
      <group position={[0, -0.45, 0]}>
        <mesh ref={terrainRef} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[10, 10, 45, 45]} />
          <meshStandardMaterial 
            color={colors.mountainBase} 
            roughness={0.9} 
            flatShading={true} // High-end faceted rolling hills shading
          />
        </mesh>
        
        {/* Wireframe overlay to emphasize the grid architecture */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.002, 0]}>
          <planeGeometry args={[10, 10, 45, 45]} />
          <meshBasicMaterial color={colors.mountainWire} wireframe transparent opacity={0.18} />
        </mesh>
      </group>

      {/* 2. WINDING ROADWAY PATH GRID */}
      <group>
        {/* Draw road pathway using multiple connected line points */}
        <Line
          points={Array.from({ length: 120 }, (_, i) => {
            const angle = (i / 120) * Math.PI * 2;
            const pos = getPathPosition(angle);
            pos.y += 0.005; // slightly above ground
            return pos;
          })}
          color={colors.accent}
          lineWidth={2.5}
          transparent
          opacity={0.7}
        />
      </group>

      {/* 3. PINE TREES SCATTERED */}
      {trees.map((t, idx) => (
        <PineTree key={idx} x={t.x} z={t.z} colors={colors} />
      ))}

      {/* 4. CHECKPOINT INTERACTIVE GATE TERMINALS */}
      {pins.map((pin, index) => {
        const angle = (index / pins.length) * Math.PI * 2;
        const gatePos = getPathPosition(angle);

        return (
          <group key={pin.label} position={[gatePos.x, gatePos.y, gatePos.z]} rotation={[0, angle, 0]}>
            {/* Gate Trigger Box */}
            <mesh 
              position={[0, 0.35, 0]}
              onClick={(e) => { e.stopPropagation(); setActivePinIndex(index); }}
            >
              <boxGeometry args={[0.5, 0.7, 0.3]} />
              <meshBasicMaterial transparent opacity={0} />
            </mesh>

            {/* Glowing vertical checkpoint beacon */}
            <Line
              points={[[0, 0, 0], [0, 0.65, 0]]}
              color={activePinIndex === index ? colors.accent : 'rgba(255,255,255,0.1)'}
              lineWidth={activePinIndex === index ? 3.5 : 1}
            />

            {/* Floating label */}
            <Html distanceFactor={8} position={[0, 0.8, 0]} center>
              <div 
                onClick={() => setActivePinIndex(index)}
                style={{
                  background: 'rgba(6, 9, 19, 0.95)',
                  border: `1.5px solid ${activePinIndex === index ? colors.accent : 'rgba(255,255,255,0.12)'}`,
                  padding: '4px 10px',
                  borderRadius: '4px',
                  color: '#fff',
                  fontFamily: "'Orbitron', sans-serif",
                  fontSize: '9px',
                  letterSpacing: '1.5px',
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                  boxShadow: activePinIndex === index ? `0 0 12px ${colors.accent}50` : '0 4px 8px rgba(0,0,0,0.6)',
                  transition: 'all 0.25s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <span>{pin.icon}</span>
                <span style={{ fontWeight: 600 }}>{pin.label.toUpperCase()}</span>
              </div>
            </Html>
          </group>
        );
      })}

      {/* 5. DETAILED BICYCLE AND CHARACTER */}
      <Cyclist 
        colors={colors}
        speed={activePinIndex !== null ? 0 : 0.8}
        cyclistAngle={cyclistAngle}
      />
    </group>
  );
}
