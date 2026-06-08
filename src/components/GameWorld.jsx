import { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

/* ── Zone Data ── */
const LANES = [-3, 0, 3]
const ZONES = [
  { id:'gateway',  name:'CYBER GATEWAY',      zS:0,    zE:-25,  floor:'#0a0a0a', glow:'#ff1a1a', decor:'#ff1a1a' },
  { id:'academy',  name:'CODING ACADEMY',      zS:-25,  zE:-90,  floor:'#0d0d0d', glow:'#ff3333', decor:'#ff3333' },
  { id:'frontend', name:'FRONTEND HIGHWAY',    zS:-90,  zE:-165, floor:'#0a0a0a', glow:'#ffffff', decor:'#ffffff' },
  { id:'backend',  name:'BACKEND FACTORY',     zS:-165, zE:-240, floor:'#0d0d0d', glow:'#ff1a1a', decor:'#cc0000' },
  { id:'database', name:'DATABASE CITY',       zS:-240, zE:-310, floor:'#0a0a0a', glow:'#ff4444', decor:'#ff4444' },
  { id:'projects', name:'PROJECT GALAXY',      zS:-310, zE:-410, floor:'#0d0d0d', glow:'#ffffff', decor:'#ffffff' },
  { id:'freelance',name:'FREELANCER STATION',  zS:-410, zE:-470, floor:'#0a0a0a', glow:'#ff1a1a', decor:'#ff3333' },
  { id:'temple',   name:'AI DEVELOPER TEMPLE', zS:-470, zE:-530, floor:'#0d0d0d', glow:'#ffffff', decor:'#ffd700' },
]
const TRACK_END = -530

/* ── Camera Rig ── */
function CameraRig({ target }) {
  const { camera } = useThree()
  const smoothPos = useRef(new THREE.Vector3(0, 5, 8))

  useFrame(() => {
    const t = target.current
    const ideal = new THREE.Vector3(t.x * 0.4, 4.5, t.z + 9)
    smoothPos.current.lerp(ideal, 0.05)
    camera.position.copy(smoothPos.current)
    camera.lookAt(t.x * 0.3, 1.2, t.z - 6)
  })
  return null
}

/* ── Humanoid Runner ── */
function HumanRunner({ gameRef }) {
  const groupRef = useRef()
  const leftLegRef = useRef()
  const rightLegRef = useRef()
  const leftArmRef = useRef()
  const rightArmRef = useRef()

  useFrame((_, delta) => {
    const g = gameRef.current
    if (!g.running || g.paused) {
      if (groupRef.current) {
        groupRef.current.position.set(g.playerX, 0, g.playerZ)
      }
      return
    }

    // Forward movement
    g.playerZ -= g.speed * delta

    // Lane switching (smooth)
    const targetX = LANES[g.targetLane]
    g.playerX += (targetX - g.playerX) * 0.12

    if (groupRef.current) {
      groupRef.current.position.set(g.playerX, 0, g.playerZ)
    }

    // Running animation — swing legs and arms
    const runCycle = Date.now() * 0.012
    const swing = Math.sin(runCycle) * 0.8

    if (leftLegRef.current) leftLegRef.current.rotation.x = swing
    if (rightLegRef.current) rightLegRef.current.rotation.x = -swing
    if (leftArmRef.current) leftArmRef.current.rotation.x = -swing * 0.7
    if (rightArmRef.current) rightArmRef.current.rotation.x = swing * 0.7

    // Zone detection
    const z = g.playerZ
    const zone = ZONES.find(zn => z <= zn.zS && z > zn.zE)
    if (zone && zone.id !== g.currentZone) {
      g.currentZone = zone.id
      g.onZoneChange?.(zone)
    }

    if (z <= TRACK_END) {
      g.running = false
      g.onComplete?.()
    }
  })

  const bodyMat = <meshStandardMaterial color="#111111" />
  const skinMat = <meshStandardMaterial color="#d4a574" />
  const redMat = <meshStandardMaterial color="#ff1a1a" emissive="#ff1a1a" emissiveIntensity={0.3} />
  const whiteMat = <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.1} />
  const shoeMat = <meshStandardMaterial color="#ff1a1a" emissive="#ff0000" emissiveIntensity={0.5} />

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Head */}
      <mesh position={[0, 2.4, 0]}>
        <sphereGeometry args={[0.22, 12, 12]} />
        {skinMat}
      </mesh>
      {/* Hair */}
      <mesh position={[0, 2.55, -0.02]}>
        <sphereGeometry args={[0.2, 12, 8]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>

      {/* Torso — red jersey */}
      <mesh position={[0, 1.85, 0]}>
        <boxGeometry args={[0.5, 0.6, 0.28]} />
        {redMat}
      </mesh>
      {/* White stripe on torso */}
      <mesh position={[0, 1.85, 0.145]}>
        <boxGeometry args={[0.12, 0.55, 0.01]} />
        {whiteMat}
      </mesh>

      {/* Left Arm */}
      <group ref={leftArmRef} position={[-0.35, 2.0, 0]}>
        <mesh position={[0, -0.22, 0]}>
          <capsuleGeometry args={[0.07, 0.35, 6, 8]} />
          {skinMat}
        </mesh>
      </group>
      {/* Right Arm */}
      <group ref={rightArmRef} position={[0.35, 2.0, 0]}>
        <mesh position={[0, -0.22, 0]}>
          <capsuleGeometry args={[0.07, 0.35, 6, 8]} />
          {skinMat}
        </mesh>
      </group>

      {/* Left Leg */}
      <group ref={leftLegRef} position={[-0.13, 1.5, 0]}>
        <mesh position={[0, -0.32, 0]}>
          <capsuleGeometry args={[0.09, 0.4, 6, 8]} />
          {bodyMat}
        </mesh>
        {/* Left Shoe */}
        <mesh position={[0, -0.58, 0.06]}>
          <boxGeometry args={[0.14, 0.08, 0.22]} />
          {shoeMat}
        </mesh>
      </group>
      {/* Right Leg */}
      <group ref={rightLegRef} position={[0.13, 1.5, 0]}>
        <mesh position={[0, -0.32, 0]}>
          <capsuleGeometry args={[0.09, 0.4, 6, 8]} />
          {bodyMat}
        </mesh>
        {/* Right Shoe */}
        <mesh position={[0, -0.58, 0.06]}>
          <boxGeometry args={[0.14, 0.08, 0.22]} />
          {shoeMat}
        </mesh>
      </group>

      {/* Runner glow */}
      <pointLight color="#ff1a1a" intensity={6} distance={10} position={[0, 1.5, 0]} />
      <pointLight color="#ffffff" intensity={3} distance={6} position={[0, 2.5, 1]} />
    </group>
  )
}

/* ── Track Floor ── */
function Track() {
  return (
    <group>
      {ZONES.map(zone => {
        const len = Math.abs(zone.zE - zone.zS)
        const midZ = (zone.zS + zone.zE) / 2
        return (
          <group key={zone.id}>
            {/* Main road */}
            <mesh position={[0, -0.01, midZ]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
              <planeGeometry args={[10, len]} />
              <meshStandardMaterial color={zone.floor} emissive={zone.glow} emissiveIntensity={0.03} />
            </mesh>
            {/* Center line */}
            <mesh position={[0, 0.01, midZ]} rotation={[-Math.PI / 2, 0, 0]}>
              <planeGeometry args={[0.1, len]} />
              <meshBasicMaterial color={zone.glow} transparent opacity={0.5} />
            </mesh>
            {/* Lane markers */}
            {[-4.5, -1.5, 1.5, 4.5].map((x, i) => (
              <mesh key={i} position={[x, 0.01, midZ]} rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[0.04, len]} />
                <meshBasicMaterial color={zone.glow} transparent opacity={0.15} />
              </mesh>
            ))}
            {/* Side walls (neon rails) */}
            {[-5.2, 5.2].map((x, i) => (
              <mesh key={`w${i}`} position={[x, 0.5, midZ]}>
                <boxGeometry args={[0.08, 1, len]} />
                <meshStandardMaterial
                  color={zone.glow}
                  emissive={zone.glow}
                  emissiveIntensity={2}
                  toneMapped={false}
                  transparent
                  opacity={0.7}
                />
              </mesh>
            ))}
          </group>
        )
      })}
    </group>
  )
}

/* ── Zone Gates ── */
function ZoneGates() {
  const refs = useRef([])

  useFrame((state) => {
    refs.current.forEach((ref) => {
      if (ref) ref.rotation.z = state.clock.elapsedTime * 0.5
    })
  })

  return (
    <group>
      {ZONES.slice(1).map((zone, idx) => (
        <group key={zone.id} position={[0, 0, zone.zS]}>
          {/* Rotating ring */}
          <mesh ref={el => refs.current[idx] = el} position={[0, 3.5, 0]}>
            <torusGeometry args={[4.5, 0.12, 8, 48]} />
            <meshStandardMaterial color={zone.glow} emissive={zone.glow} emissiveIntensity={4} toneMapped={false} />
          </mesh>
          {/* Second ring */}
          <mesh position={[0, 3.5, 0]} rotation={[Math.PI / 4, 0, 0]}>
            <torusGeometry args={[4, 0.06, 8, 48]} />
            <meshStandardMaterial color={zone.glow} emissive={zone.glow} emissiveIntensity={3} toneMapped={false} transparent opacity={0.4} />
          </mesh>
          {/* Pillars */}
          {[-5, 5].map((x, i) => (
            <group key={i}>
              <mesh position={[x, 2, 0]}>
                <cylinderGeometry args={[0.15, 0.15, 4, 8]} />
                <meshStandardMaterial color={zone.glow} emissive={zone.glow} emissiveIntensity={2.5} toneMapped={false} />
              </mesh>
            </group>
          ))}
        </group>
      ))}
    </group>
  )
}

/* ── Cyberpunk Buildings ── */
function Buildings() {
  const buildings = useMemo(() => {
    const items = []
    ZONES.forEach(zone => {
      const count = Math.floor(Math.abs(zone.zE - zone.zS) / 6)
      for (let i = 0; i < count; i++) {
        const side = i % 2 === 0 ? 1 : -1
        const x = side * (8 + Math.random() * 12)
        const z = zone.zS - (i / count) * Math.abs(zone.zE - zone.zS)
        const h = 3 + Math.random() * 12
        const w = 1 + Math.random() * 3
        items.push({ x, z, h, w, glow: zone.glow })
      }
    })
    return items
  }, [])

  return (
    <group>
      {buildings.map((b, i) => (
        <group key={i} position={[b.x, b.h / 2, b.z]}>
          <mesh>
            <boxGeometry args={[b.w, b.h, b.w]} />
            <meshStandardMaterial color="#0a0a0a" emissive={b.glow} emissiveIntensity={0.8} toneMapped={false} />
          </mesh>
        </group>
      ))}
    </group>
  )
}

/* ── Collectible Orbs (white glowing) ── */
function Collectibles({ gameRef }) {
  const orbs = useMemo(() => {
    const skills = [
      'HTML5','CSS3','JavaScript','React.js','Tailwind','Node.js','Express.js',
      'MongoDB','MySQL','Git','GitHub','VS Code','Postman','REST API','JWT','WebRTC'
    ]
    return skills.map((skill, i) => {
      const zoneIdx = 1 + Math.floor(i / 4)
      const zone = ZONES[Math.min(zoneIdx, ZONES.length - 1)]
      const z = zone.zS - 10 - (i % 4) * 15
      const lane = LANES[i % 3]
      return { id: skill, x: lane, z, collected: false }
    })
  }, [])

  const refs = useRef([])

  useFrame(() => {
    const pz = gameRef.current.playerZ
    const px = gameRef.current.playerX
    orbs.forEach((orb, i) => {
      if (orb.collected) return
      const ref = refs.current[i]
      if (!ref) return
      ref.rotation.y += 0.04
      ref.rotation.z += 0.02
      ref.position.y = 1.5 + Math.sin(Date.now() * 0.003 + i) * 0.3
      const dist = Math.sqrt((px - orb.x) ** 2 + (pz - orb.z) ** 2)
      if (dist < 2.5) {
        orb.collected = true
        ref.visible = false
        gameRef.current.onCollect?.(orb.id)
      }
    })
  })

  return (
    <group>
      {orbs.map((orb, i) => (
        <group key={orb.id} ref={el => refs.current[i] = el} position={[orb.x, 1.5, orb.z]}>
          <mesh>
            <dodecahedronGeometry args={[0.3, 0]} />
            <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={4} toneMapped={false} />
          </mesh>
          <mesh>
            <sphereGeometry args={[0.5, 8, 8]} />
            <meshBasicMaterial color="#ff1a1a" transparent opacity={0.08} />
          </mesh>
        </group>
      ))}
    </group>
  )
}

/* ── Floating Particles (red & white) ── */
function FloatingParticles() {
  const ref = useRef()
  const positions = useMemo(() => {
    const arr = new Float32Array(4500)
    for (let i = 0; i < 4500; i += 3) {
      arr[i] = (Math.random() - 0.5) * 40
      arr[i + 1] = 0.5 + Math.random() * 12
      arr[i + 2] = -Math.random() * 550
    }
    return arr
  }, [])

  const colors = useMemo(() => {
    const arr = new Float32Array(4500)
    const palette = [[1,0.1,0.1],[1,1,1],[1,0.2,0.2],[0.9,0.9,0.9]]
    for (let i = 0; i < 4500; i += 3) {
      const c = palette[Math.floor(Math.random() * palette.length)]
      arr[i] = c[0]; arr[i+1] = c[1]; arr[i+2] = c[2]
    }
    return arr
  }, [])

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.015
      ref.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.05) * 0.05
    }
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.1} vertexColors transparent opacity={0.7}
        sizeAttenuation blending={THREE.AdditiveBlending} depthWrite={false} />
    </points>
  )
}

/* ── Main Scene ── */
function Scene({ gameRef }) {
  const posRef = useRef({ x: 0, z: 0 })

  useFrame(() => {
    posRef.current.x = gameRef.current.playerX
    posRef.current.z = gameRef.current.playerZ
  })

  return (
    <>
      <fog attach="fog" args={['#000000', 8, 55]} />
      <ambientLight intensity={0.25} />
      <directionalLight position={[10, 20, 5]} intensity={0.4} color="#ffffff" />
      <hemisphereLight groundColor="#000000" color="#1a0000" intensity={0.3} />

      <CameraRig target={posRef} />
      <HumanRunner gameRef={gameRef} />
      <Track />
      <ZoneGates />
      <Buildings />
      <Collectibles gameRef={gameRef} />
      <FloatingParticles />

      {/* Ground grid — red tint */}
      <gridHelper args={[600, 300, '#ff1a1a', '#111111']} position={[0, 0.02, -265]} />

      {/* Skybox — pure black */}
      <mesh>
        <sphereGeometry args={[180, 32, 32]} />
        <meshBasicMaterial color="#000000" side={THREE.BackSide} />
      </mesh>
    </>
  )
}

/* ── Exported Component ── */
export default function GameWorld({ gameRef }) {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 1 }}>
      <Canvas
        camera={{ position: [0, 5, 8], fov: 65, near: 0.1, far: 200 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: false }}
        onCreated={({ gl }) => {
          gl.setClearColor('#000000')
          gl.toneMapping = THREE.ACESFilmicToneMapping
          gl.toneMappingExposure = 1.5
        }}
      >
        <Scene gameRef={gameRef} />
      </Canvas>
    </div>
  )
}
