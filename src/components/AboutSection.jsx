import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'

export default function AboutSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [npcText, setNpcText] = useState(0)

  const npcDialogues = [
    "Chandru started as a curious student who wanted to understand how websites work...",
    "He mastered the MERN stack and became a full-stack developer...",
    "Now he builds scalable web applications and helps clients worldwide!"
  ]

  useEffect(() => {
    if (!isInView) return
    const timer = setInterval(() => {
      setNpcText(p => (p + 1) % npcDialogues.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [isInView])

  return (
    <section id="about" ref={ref} className="section-wrapper" style={{ padding: '120px 5%' }}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 1 }}
      >
        <div className="level-badge" style={{ display: 'flex', justifyContent: 'center' }}>
          <span>⚔️</span> LEVEL 1 — THE ORIGIN VILLAGE
        </div>
        <h2 className="section-title neon-text">About Me</h2>
        <p className="section-subtitle">Discover the origin story of a passionate developer</p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '40px',
          maxWidth: '1200px',
          margin: '0 auto',
        }}>
          {/* Avatar Card */}
          <motion.div
            className="glass-card"
            style={{ padding: '40px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}
            initial={{ x: -60, opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {/* Scan line effect */}
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(transparent, rgba(0,212,255,0.03), transparent)',
              animation: 'scan-line 4s linear infinite',
              pointerEvents: 'none',
            }} />
            
            <div style={{
              width: 180, height: 180, borderRadius: '50%',
              margin: '0 auto 25px',
              background: 'linear-gradient(135deg, #00d4ff, #a855f7)',
              padding: 3,
              position: 'relative',
            }}>
              <img
                src="/images/chandru-avatar.png"
                alt="Chandru P"
                style={{
                  width: '100%', height: '100%', borderRadius: '50%',
                  objectFit: 'cover',
                  background: '#0a0a2e',
                }}
              />
              {/* Pulse ring */}
              <div style={{
                position: 'absolute', inset: -10,
                border: '2px solid rgba(0,212,255,0.3)',
                borderRadius: '50%',
                animation: 'pulse-glow 2s ease-in-out infinite',
              }} />
            </div>

            <h3 style={{
              fontFamily: "'Orbitron', sans-serif",
              fontSize: '1.6rem',
              marginBottom: 8,
              background: 'linear-gradient(135deg, #00d4ff, #a855f7)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>CHANDRU P</h3>
            
            <p style={{
              color: 'rgba(255,255,255,0.6)',
              fontFamily: "'Orbitron', sans-serif",
              fontSize: '0.75rem',
              letterSpacing: '3px',
              marginBottom: 20,
            }}>MERN STACK DEVELOPER</p>

            <div style={{
              display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap',
            }}>
              {['Full Stack', 'Prompt Engineer', 'Idea Builder', 'AI Analytics'].map(tag => (
                <span key={tag} style={{
                  padding: '5px 14px',
                  background: 'rgba(0,212,255,0.1)',
                  border: '1px solid rgba(0,212,255,0.2)',
                  borderRadius: '20px',
                  fontSize: '0.75rem',
                  color: '#00d4ff',
                  fontFamily: "'Inter', sans-serif",
                }}>{tag}</span>
              ))}
            </div>

            {/* NPC Dialogue */}
            <motion.div
              key={npcText}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                marginTop: 25, padding: '15px 20px',
                background: 'rgba(0,212,255,0.05)',
                border: '1px solid rgba(0,212,255,0.15)',
                borderRadius: '15px',
                position: 'relative',
              }}
            >
              <span style={{
                position: 'absolute', top: -8, left: 20,
                background: '#0a0a2e', padding: '0 8px',
                fontSize: '0.65rem', color: '#a855f7',
                fontFamily: "'Orbitron', sans-serif",
                letterSpacing: '2px',
              }}>NPC GUIDE</span>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', fontStyle: 'italic', lineHeight: 1.6 }}>
                "{npcDialogues[npcText]}"
              </p>
            </motion.div>
          </motion.div>

          {/* Info Card */}
          <motion.div
            className="glass-card"
            style={{ padding: '40px' }}
            initial={{ x: 60, opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <h3 style={{
              fontFamily: "'Orbitron', sans-serif",
              fontSize: '1.2rem',
              color: '#00d4ff',
              marginBottom: 20,
              letterSpacing: '2px',
            }}>📜 MY STORY</h3>

            <p style={{
              color: 'rgba(255,255,255,0.7)',
              fontSize: '1.05rem',
              lineHeight: 1.8,
              marginBottom: 25,
            }}>
              Passionate Full Stack Developer specializing in <span style={{ color: '#00d4ff' }}>MongoDB</span>,{' '}
              <span style={{ color: '#a855f7' }}>Express.js</span>,{' '}
              <span style={{ color: '#22d3ee' }}>React.js</span>, and{' '}
              <span style={{ color: '#ec4899' }}>Node.js</span>. I am an active <span style={{ color: '#00d4ff' }}>Prompt Engineer</span> and a <span style={{ color: '#a855f7' }}>creative idea builder</span>, specializing in analyzing and integrating AI usage to build modern, future-ready applications.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              {[
                { icon: '🎯', label: 'Focus', value: 'MERN Stack', color: '#00d4ff' },
                { icon: '🤖', label: 'AI Skills', value: 'Prompting & Analytics', color: '#a855f7' },
                { icon: '⚡', label: 'Idea Builder', value: 'Creative Builder', color: '#ec4899' },
                { icon: '🚀', label: 'Projects', value: '10+', color: '#10b981' },
              ].map(stat => (
                <motion.div
                  key={stat.label}
                  whileHover={{
                    scale: 1.05,
                    borderColor: stat.color,
                    boxShadow: `0 0 20px ${stat.color}33`,
                  }}
                  style={{
                    padding: '15px',
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(255,255,255,0.05)',
                    borderRadius: '12px',
                    textAlign: 'center',
                    cursor: 'pointer',
                    transition: 'border-color 0.3s, box-shadow 0.3s',
                  }}
                >
                  <div style={{ fontSize: '1.5rem', marginBottom: 5 }}>{stat.icon}</div>
                  <div style={{
                    fontFamily: "'Orbitron', sans-serif",
                    fontSize: '0.6rem',
                    color: 'rgba(255,255,255,0.4)',
                    letterSpacing: '2px',
                    marginBottom: 3,
                  }}>{stat.label}</div>
                  <div style={{
                    fontFamily: "'Rajdhani', sans-serif",
                    fontSize: '1rem',
                    color: stat.color,
                    fontWeight: 600,
                  }}>{stat.value}</div>
                </motion.div>
              ))}
            </div>

            {/* Resume Download */}
            <motion.button
              className="btn-primary"
              style={{ width: '100%', marginTop: 25 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>📄 DOWNLOAD RESUME</span>
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
