import { useState, useRef, useEffect, useCallback } from 'react'
import GameWorld from './components/GameWorld'
import GameHUD from './components/GameHUD'

/* ── Recruiter Mode (scroll portfolio) ── */
import Navbar from './components/Navbar'
import AboutSection from './components/AboutSection'
import SkillsForest from './components/SkillsForest'
import ProjectKingdom from './components/ProjectKingdom'
import FreelanceStation from './components/FreelanceStation'
import TimelineSection from './components/TimelineSection'
import GlobeSection from './components/GlobeSection'
import GithubStats from './components/GithubStats'
import ContactSection from './components/ContactSection'
import ParticleBackground from './components/ParticleBackground'
import CustomCursor from './components/CustomCursor'

export default function App() {
  const [mode, setMode] = useState('game') // 'game' | 'recruiter'
  const [phase, setPhase] = useState('menu') // 'menu' | 'playing' | 'zone-info' | 'complete'
  const [currentZone, setCurrentZone] = useState('gateway')
  const [collected, setCollected] = useState([])
  const [speed, setSpeed] = useState(8)
  const [achievements, setAchievements] = useState([])
  const [gameKey, setGameKey] = useState(0)

  // Game ref for 3D scene (performance-critical data)
  const gameRef = useRef({
    playerZ: 0,
    playerX: 0,
    targetLane: 1,
    speed: 8,
    running: false,
    paused: false,
    currentZone: 'gateway',
    onZoneChange: null,
    onCollect: null,
    onComplete: null,
  })

  // Wire up callbacks
  useEffect(() => {
    gameRef.current.onZoneChange = (zone) => {
      setCurrentZone(zone.id)
      // Pause and show zone info (except gateway)
      if (zone.id !== 'gateway') {
        gameRef.current.running = false
        gameRef.current.paused = true
        setPhase('zone-info')
      }
      // Achievement checks
      if (zone.id === 'frontend' && !achievements.includes('explorer')) {
        setAchievements(prev => [...prev, 'explorer'])
      }
      if (zone.id === 'projects' && !achievements.includes('master')) {
        setAchievements(prev => [...prev, 'master'])
      }
      if (zone.id === 'temple' && !achievements.includes('innovator')) {
        setAchievements(prev => [...prev, 'innovator'])
      }
    }

    gameRef.current.onCollect = (skillId) => {
      setCollected(prev => [...prev, skillId])
    }

    gameRef.current.onComplete = () => {
      setPhase('complete')
    }
  }, [achievements])

  // Keyboard controls
  useEffect(() => {
    if (mode !== 'game') return

    const onKeyDown = (e) => {
      const g = gameRef.current
      if (!g.running) return

      switch (e.key) {
        case 'ArrowLeft': case 'a': case 'A':
          g.targetLane = Math.max(0, g.targetLane - 1)
          break
        case 'ArrowRight': case 'd': case 'D':
          g.targetLane = Math.min(2, g.targetLane + 1)
          break
        case 'ArrowUp': case 'w': case 'W':
          g.speed = Math.min(20, g.speed + 1)
          setSpeed(g.speed)
          break
        case 'ArrowDown': case 's': case 'S':
          g.speed = Math.max(3, g.speed - 1)
          setSpeed(g.speed)
          break
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [mode])

  // Touch controls for mobile
  useEffect(() => {
    if (mode !== 'game') return
    let startX = 0

    const onTouchStart = (e) => { startX = e.touches[0].clientX }
    const onTouchEnd = (e) => {
      const g = gameRef.current
      if (!g.running) return
      const dx = e.changedTouches[0].clientX - startX
      if (dx > 50) g.targetLane = Math.min(2, g.targetLane + 1)
      else if (dx < -50) g.targetLane = Math.max(0, g.targetLane - 1)
    }

    window.addEventListener('touchstart', onTouchStart)
    window.addEventListener('touchend', onTouchEnd)
    return () => {
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchend', onTouchEnd)
    }
  }, [mode])

  const handleStart = useCallback(() => {
    setPhase('playing')
    setCollected([])
    setSpeed(8)
    setCurrentZone('gateway')
    setGameKey(prev => prev + 1)
    
    // Reset ref
    gameRef.current.playerZ = 0
    gameRef.current.playerX = 0
    gameRef.current.targetLane = 1
    gameRef.current.speed = 8
    gameRef.current.running = true
    gameRef.current.paused = false
    gameRef.current.currentZone = 'gateway'
  }, [])

  const handleContinue = useCallback(() => {
    setPhase('playing')
    gameRef.current.running = true
    gameRef.current.paused = false
  }, [])

  const handleRecruiterMode = useCallback(() => {
    setMode('recruiter')
  }, [])

  // ── RECRUITER MODE (classic scroll portfolio) ──
  if (mode === 'recruiter') {
    return (
      <>
        <CustomCursor />
        <ParticleBackground />
        <Navbar />
        <button onClick={() => setMode('game')} style={{
          position:'fixed', top:20, right:20, zIndex:1000,
          padding:'8px 20px', background:'rgba(0,212,255,0.1)',
          border:'1px solid rgba(0,212,255,0.3)', borderRadius:30,
          color:'#00d4ff', fontFamily:"'Orbitron',sans-serif", fontSize:'0.65rem',
          letterSpacing:2, cursor:'pointer', backdropFilter:'blur(10px)',
        }}>🎮 GAME MODE</button>
        <main>
          <section id="hero" style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', position: 'relative' }}>
            <div style={{ textAlign:'center' }}>
              <h1 style={{ fontFamily:"'Orbitron',sans-serif", fontSize:'clamp(2.5rem,7vw,5rem)',
                fontWeight:900, background:'linear-gradient(135deg,#00d4ff,#a855f7,#ec4899)',
                WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>CHANDRU P</h1>
              <p style={{ fontFamily:"'Orbitron',sans-serif", fontSize:'0.85rem', color:'#00d4ff',
                letterSpacing:4, marginTop:15 }}>MERN STACK DEVELOPER · FREELANCER · PROMPT ENGINEER · IDEA BUILDER</p>
            </div>
            {/* Scroll Indicator */}
            <div className="scroll-indicator">
              <div className="mouse-icon">
                <div className="scroll-wheel"></div>
              </div>
              <div className="scroll-arrows">
                <div className="scroll-arrow"></div>
                <div className="scroll-arrow"></div>
                <div className="scroll-arrow"></div>
              </div>
            </div>
          </section>
          <AboutSection />
          <SkillsForest />
          <ProjectKingdom />
          <FreelanceStation />
          <TimelineSection />
          <GlobeSection />
          <GithubStats />
          <ContactSection />
        </main>
        <footer style={{ textAlign:'center', padding:'40px 20px', borderTop:'1px solid rgba(255,255,255,0.05)' }}>
          <p style={{ fontFamily:"'Orbitron',sans-serif", fontSize:'0.7rem',
            color:'rgba(255,255,255,0.3)', letterSpacing:3 }}>© 2026 CHANDRU P</p>
        </footer>
      </>
    )
  }

  // ── GAME MODE ──
  return (
    <>
      <CustomCursor />
      <GameWorld key={gameKey} gameRef={gameRef} />
      <GameHUD
        gameState={{ phase, currentZone, collected, speed, achievements }}
        onStart={handleStart}
        onContinue={handleContinue}
        onRecruiterMode={handleRecruiterMode}
      />
    </>
  )
}
