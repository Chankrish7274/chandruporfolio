import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const timeline = [
  {
    year: '2021',
    title: 'The Awakening',
    desc: 'Started learning web development. First steps with HTML, CSS, and JavaScript.',
    icon: '🌱', color: '#10b981',
  },
  {
    year: '2022',
    title: 'Skill Mastery',
    desc: 'Mastered React.js and discovered the power of modern frontend development.',
    icon: '⚡', color: '#00d4ff',
  },
  {
    year: '2023',
    title: 'Full Stack Evolution',
    desc: 'Learned Node.js, Express.js, MongoDB. Became a complete MERN stack developer.',
    icon: '🔥', color: '#a855f7',
  },
  {
    year: '2024',
    title: 'Project Builder',
    desc: 'Built multiple production-ready applications. Started taking on complex challenges.',
    icon: '🏗️', color: '#f97316',
  },
  {
    year: '2025',
    title: 'Freelance Launch',
    desc: 'Launched freelance career. Started building solutions for clients worldwide.',
    icon: '🚀', color: '#ec4899',
  },
  {
    year: '2026',
    title: 'Future Goals',
    desc: 'Learning AI/ML, DevOps, and cloud technologies. Building the future of web.',
    icon: '🌟', color: '#22d3ee',
  },
]

export default function TimelineSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="timeline" ref={ref} className="section-wrapper" style={{ padding: '120px 5%' }}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 1 }}
      >
        <div className="level-badge" style={{ display: 'flex', justifyContent: 'center' }}>
          <span>⏳</span> EXPERIENCE TIMELINE
        </div>
        <h2 className="section-title neon-text">Journey Timeline</h2>
        <p className="section-subtitle">A developer's evolution through time</p>

        <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative' }}>
          {/* Central line */}
          <div style={{
            position: 'absolute', left: '50%', top: 0, bottom: 0,
            width: 2, transform: 'translateX(-50%)',
            background: 'linear-gradient(to bottom, transparent, rgba(0,212,255,0.3), rgba(168,85,247,0.3), transparent)',
          }} />

          {timeline.map((item, i) => (
            <motion.div
              key={item.year}
              style={{
                display: 'flex',
                justifyContent: i % 2 === 0 ? 'flex-start' : 'flex-end',
                position: 'relative',
                marginBottom: 50,
              }}
              initial={{ opacity: 0, x: i % 2 === 0 ? -60 : 60 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
            >
              {/* Node dot */}
              <div style={{
                position: 'absolute', left: '50%', top: 20,
                transform: 'translateX(-50%)',
                width: 16, height: 16, borderRadius: '50%',
                background: item.color,
                boxShadow: `0 0 20px ${item.color}`,
                zIndex: 2,
              }} />

              <div className="glass-card" style={{
                width: '42%', padding: '25px',
                position: 'relative',
              }}>
                {/* Year badge */}
                <span style={{
                  fontFamily: "'Orbitron', sans-serif",
                  fontSize: '0.7rem',
                  color: item.color,
                  letterSpacing: '3px',
                  display: 'block',
                  marginBottom: 8,
                }}>{item.year}</span>

                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                  <span style={{ fontSize: '1.4rem' }}>{item.icon}</span>
                  <h3 style={{
                    fontFamily: "'Orbitron', sans-serif",
                    fontSize: '0.9rem',
                    color: '#fff',
                    letterSpacing: '1px',
                  }}>{item.title}</h3>
                </div>

                <p style={{
                  color: 'rgba(255,255,255,0.6)',
                  fontSize: '0.88rem',
                  lineHeight: 1.7,
                }}>{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
