import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

const projects = [
  {
    title: 'Bench Allocation Management System',
    desc: 'Enterprise-level system for managing bench allocation, employee tracking, and project assignment with role-based access control.',
    tech: ['React.js', 'Node.js', 'MongoDB', 'Express.js'],
    icon: '🏢',
    color: '#00d4ff',
    github: 'https://github.com/Chankrish7274/Bench-Allocation-System',
    demo: 'https://chandruporfolio.netlify.app/',
  },
  {
    title: 'Food Ordering System',
    desc: 'Full-stack food ordering platform with real-time order tracking, payment integration, and restaurant management dashboard.',
    tech: ['React.js', 'Node.js', 'MongoDB', 'Express.js'],
    icon: '🍕',
    color: '#f97316',
    github: 'https://github.com/Chankrish7274/Food-Ordering-System',
  },
  {
    title: 'Resume Analyzer',
    desc: 'AI-powered resume analysis tool that evaluates resumes against job descriptions and provides improvement suggestions.',
    tech: ['React.js', 'Node.js', 'Python', 'NLP'],
    icon: '📄',
    color: '#a855f7',
    github: 'https://github.com/Chankrish7274/Resume-Analyzer',
  },
  {
    title: 'Secure Login System',
    desc: 'Advanced authentication system with JWT, OAuth, two-factor authentication, and encrypted session management.',
    tech: ['React.js', 'Node.js', 'JWT', 'bcrypt'],
    icon: '🔐',
    color: '#10b981',
    github: 'https://github.com/Chankrish7274/Secure-Login-System',
  },
  {
    title: 'Video Chat Application',
    desc: 'Real-time video conferencing application using WebRTC with screen sharing, chat, and room management.',
    tech: ['React.js', 'WebRTC', 'Socket.io', 'Node.js'],
    icon: '📹',
    color: '#ec4899',
    github: 'https://github.com/Chankrish7274/Video-Chat-App',
  },
  {
    title: 'Movie Ticket Booking App',
    desc: 'Complete movie ticket booking platform with seat selection, showtime management, and booking history.',
    tech: ['React Native', 'Node.js', 'MongoDB', 'Stripe'],
    icon: '🎬',
    color: '#22d3ee',
    github: 'https://github.com/Chankrish7274/Movie-Ticket-Booking',
  },
]

export default function ProjectKingdom() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [expanded, setExpanded] = useState(null)

  return (
    <section id="projects" ref={ref} className="section-wrapper" style={{ padding: '120px 5%' }}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 1 }}
      >
        <div className="level-badge" style={{ display: 'flex', justifyContent: 'center' }}>
          <span>🏰</span> LEVEL 4 — PROJECT KINGDOM
        </div>
        <h2 className="section-title neon-text">My Projects</h2>
        <p className="section-subtitle">Each building holds a creation — enter to explore</p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '25px',
          maxWidth: '1200px',
          margin: '0 auto',
        }}>
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              className="glass-card"
              style={{
                padding: '30px',
                position: 'relative',
                overflow: 'hidden',
                cursor: 'none',
              }}
              initial={{ y: 60, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              whileHover={{
                scale: 1.03,
                y: -8,
                borderColor: project.color,
                boxShadow: `0 0 30px ${project.color}33, inset 0 0 30px ${project.color}05`,
              }}
              onClick={() => setExpanded(expanded === i ? null : i)}
            >
              {/* Building glow */}
              <div style={{
                position: 'absolute', bottom: 0, left: '50%',
                transform: 'translateX(-50%)',
                width: '80%', height: 3,
                background: `linear-gradient(90deg, transparent, ${project.color}, transparent)`,
                borderRadius: 2,
              }} />

              {/* Icon */}
              <div style={{
                width: 60, height: 60, borderRadius: '15px',
                background: `${project.color}15`,
                border: `1px solid ${project.color}30`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.8rem', marginBottom: 20,
              }}>{project.icon}</div>

              <h3 style={{
                fontFamily: "'Orbitron', sans-serif",
                fontSize: '0.95rem',
                color: project.color,
                letterSpacing: '1px',
                marginBottom: 12,
              }}>{project.title}</h3>

              <p style={{
                color: 'rgba(255,255,255,0.6)',
                fontSize: '0.9rem',
                lineHeight: 1.7,
                marginBottom: 18,
              }}>{project.desc}</p>

              {/* Tech stack */}
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 15 }}>
                {project.tech.map(t => (
                  <span key={t} style={{
                    padding: '4px 12px',
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '20px',
                    fontSize: '0.72rem',
                    color: 'rgba(255,255,255,0.5)',
                    fontFamily: "'Inter', sans-serif",
                  }}>{t}</span>
                ))}
              </div>

              {/* Links */}
              <div style={{ display: 'flex', gap: 12, position: 'relative', zIndex: 10, pointerEvents: 'all' }}>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={e => e.stopPropagation()}
                  style={{
                    padding: '8px 20px',
                    background: `${project.color}15`,
                    border: `1px solid ${project.color}30`,
                    borderRadius: '25px',
                    color: project.color,
                    textDecoration: 'none',
                    fontSize: '0.75rem',
                    fontFamily: "'Orbitron', sans-serif",
                    letterSpacing: '1px',
                    transition: 'all 0.3s',
                    cursor: 'pointer',
                  }}
                >
                  GitHub →
                </a>
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={e => e.stopPropagation()}
                    style={{
                      padding: '8px 20px',
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.15)',
                      borderRadius: '25px',
                      color: '#fff',
                      textDecoration: 'none',
                      fontSize: '0.75rem',
                      fontFamily: "'Orbitron', sans-serif",
                      letterSpacing: '1px',
                      transition: 'all 0.3s',
                      cursor: 'pointer',
                    }}
                  >
                    Live Demo ⚡
                  </a>
                )}
              </div>

              {/* Expanded details */}
              <AnimatePresence>
                {expanded === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    style={{
                      marginTop: 15, paddingTop: 15,
                      borderTop: '1px solid rgba(255,255,255,0.05)',
                    }}
                  >
                    <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', lineHeight: 1.7 }}>
                      🔍 Click to view the full project architecture, screenshots, and live demo.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
