import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const heroLines = [
  "A talented developer exists somewhere in this digital universe.",
  "Your mission is to discover who he is."
]

export default function HeroPortal() {
  const [loading, setLoading] = useState(true)
  const [showPortal, setShowPortal] = useState(false)
  const [entered, setEntered] = useState(false)
  const [progress, setProgress] = useState(0)
  const canvasRef = useRef(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
      setShowPortal(true)
    }, 2500)
    const progTimer = setInterval(() => {
      setProgress(p => Math.min(p + 2, 100))
    }, 40)
    return () => { clearTimeout(timer); clearInterval(progTimer) }
  }, [])

  // Portal canvas animation
  useEffect(() => {
    if (!showPortal || !canvasRef.current) return
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    
    let frame = 0
    const particles = Array.from({ length: 200 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2 + 0.5,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.5,
      hue: Math.random() * 60 + 180,
    }))

    const animate = () => {
      ctx.fillStyle = 'rgba(3,0,20,0.1)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      // Portal ring
      const cx = canvas.width / 2
      const cy = canvas.height / 2
      const radius = 150 + Math.sin(frame * 0.02) * 20
      
      for (let i = 0; i < 3; i++) {
        ctx.beginPath()
        ctx.arc(cx, cy, radius + i * 30, 0, Math.PI * 2)
        ctx.strokeStyle = `hsla(${190 + i * 30}, 100%, 60%, ${0.3 - i * 0.08})`
        ctx.lineWidth = 2
        ctx.stroke()
      }

      // Particles flowing toward portal
      particles.forEach(p => {
        const dx = cx - p.x
        const dy = cy - p.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        
        if (entered && dist > 5) {
          p.x += dx * 0.02
          p.y += dy * 0.02
        } else {
          p.x += p.speedX
          p.y += p.speedY
        }
        
        if (p.x < 0 || p.x > canvas.width) p.speedX *= -1
        if (p.y < 0 || p.y > canvas.height) p.speedY *= -1

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${p.hue}, 100%, 70%, 0.8)`
        ctx.fill()
      })

      frame++
      requestAnimationFrame(animate)
    }
    const id = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(id)
  }, [showPortal, entered])

  const handleEnter = () => {
    setEntered(true)
    setTimeout(() => {
      document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
    }, 1500)
  }

  return (
    <>
      {/* Loading Screen */}
      <div className={`loading-screen ${!loading ? 'hidden' : ''}`}>
        <div className="loader-ring" />
        <p className="loading-text">INITIALIZING UNIVERSE</p>
        <div className="loading-progress">
          <div className="loading-progress-bar" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {/* Hero Section */}
      <section id="hero" style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <canvas ref={canvasRef} style={{
          position: 'absolute', inset: 0, zIndex: 0
        }} />
        
        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '0 20px' }}>
          <AnimatePresence>
            {showPortal && !entered && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
              >
                <motion.div 
                  style={{
                    width: 80, height: 80, borderRadius: '50%',
                    background: 'linear-gradient(135deg, #00d4ff, #a855f7)',
                    margin: '0 auto 40px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '2rem',
                    boxShadow: '0 0 60px rgba(0,212,255,0.4)',
                  }}
                  animate={{ scale: [1, 1.1, 1], boxShadow: ['0 0 60px rgba(0,212,255,0.4)', '0 0 80px rgba(0,212,255,0.6)', '0 0 60px rgba(0,212,255,0.4)'] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  🌀
                </motion.div>

                {heroLines.map((line, i) => (
                  <motion.p key={i} style={{
                    fontFamily: "'Rajdhani', sans-serif",
                    fontSize: 'clamp(1rem, 2.5vw, 1.4rem)',
                    color: 'rgba(255,255,255,0.7)',
                    marginBottom: 12,
                    letterSpacing: '2px',
                  }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + i * 0.5, duration: 0.8 }}
                  >
                    {line}
                  </motion.p>
                ))}

                <motion.h1 style={{
                  fontFamily: "'Orbitron', sans-serif",
                  fontSize: 'clamp(2.5rem, 7vw, 5rem)',
                  fontWeight: 900,
                  background: 'linear-gradient(135deg, #00d4ff, #a855f7, #ec4899)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  marginBottom: 15,
                  lineHeight: 1.1,
                }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 2, duration: 1, type: 'spring' }}
                >
                  CHANDRU P
                </motion.h1>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2.5 }}
                >
                  {['MERN Stack Developer', 'Freelancer', 'Building Future-Ready Apps'].map((tag, i) => (
                    <motion.span key={tag} style={{
                      display: 'inline-block',
                      padding: '6px 18px',
                      margin: '5px',
                      background: 'rgba(0,212,255,0.1)',
                      border: '1px solid rgba(0,212,255,0.3)',
                      borderRadius: '30px',
                      fontFamily: "'Orbitron', sans-serif",
                      fontSize: '0.7rem',
                      color: '#00d4ff',
                      letterSpacing: '2px',
                    }}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 2.8 + i * 0.2 }}
                    >
                      {tag}
                    </motion.span>
                  ))}
                </motion.div>

                <motion.button
                  className="btn-primary"
                  onClick={handleEnter}
                  style={{ marginTop: 40 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 3.5 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>⚡ START JOURNEY</span>
                </motion.button>
              </motion.div>
            )}

            {entered && (
              <motion.div
                initial={{ opacity: 1, scale: 1 }}
                animate={{ opacity: 0, scale: 3 }}
                transition={{ duration: 1.5 }}
                style={{
                  fontFamily: "'Orbitron', sans-serif",
                  fontSize: '2rem',
                  color: '#00d4ff',
                }}
              >
                ENTERING DIGITAL UNIVERSE...
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </>
  )
}
