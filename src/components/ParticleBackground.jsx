import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function Particles({ count = 2000 }) {
  const mesh = useRef()
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 50
      pos[i * 3 + 1] = (Math.random() - 0.5) * 50
      pos[i * 3 + 2] = (Math.random() - 0.5) * 50
    }
    return pos
  }, [count])

  const colors = useMemo(() => {
    const cols = new Float32Array(count * 3)
    const palette = [
      [0, 0.83, 1], [0.66, 0.33, 0.97], [0.13, 0.83, 0.93],
      [0.93, 0.29, 0.60], [0.06, 0.73, 0.51]
    ]
    for (let i = 0; i < count; i++) {
      const c = palette[Math.floor(Math.random() * palette.length)]
      cols[i * 3] = c[0]
      cols[i * 3 + 1] = c[1]
      cols[i * 3 + 2] = c[2]
    }
    return cols
  }, [count])

  const sizes = useMemo(() => {
    const s = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      s[i] = Math.random() * 3 + 0.5
    }
    return s
  }, [count])

  useFrame((state) => {
    if (!mesh.current) return
    mesh.current.rotation.x = state.clock.elapsedTime * 0.02
    mesh.current.rotation.y = state.clock.elapsedTime * 0.03
    mesh.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3
  })

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}

function FloatingOrbs() {
  const group = useRef()
  
  useFrame((state) => {
    if (!group.current) return
    group.current.rotation.y = state.clock.elapsedTime * 0.05
  })

  return (
    <group ref={group}>
      {[...Array(5)].map((_, i) => (
        <mesh key={i} position={[
          Math.cos(i * 1.25) * 8,
          Math.sin(i * 0.8) * 3,
          Math.sin(i * 1.25) * 8
        ]}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshBasicMaterial color={['#00d4ff', '#a855f7', '#22d3ee', '#ec4899', '#10b981'][i]} />
        </mesh>
      ))}
    </group>
  )
}

export default function ParticleBackground() {
  return (
    <div className="particles-bg">
      <Canvas camera={{ position: [0, 0, 10], fov: 60 }} dpr={[1, 1.5]}>
        <ambientLight intensity={0.1} />
        <Particles />
        <FloatingOrbs />
      </Canvas>
    </div>
  )
}
