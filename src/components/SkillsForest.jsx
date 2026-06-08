import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const skillCategories = [
  {
    title: 'Frontend',
    icon: '🌳',
    color: '#00d4ff',
    skills: [
      { name: 'HTML5', level: 95 },
      { name: 'CSS3', level: 90 },
      { name: 'JavaScript', level: 88 },
      { name: 'React.js', level: 92 },
      { name: 'Tailwind CSS', level: 85 },
    ],
  },
  {
    title: 'Backend',
    icon: '🌲',
    color: '#a855f7',
    skills: [
      { name: 'Node.js', level: 90 },
      { name: 'Express.js', level: 88 },
    ],
  },
  {
    title: 'Database',
    icon: '🍄',
    color: '#ec4899',
    skills: [
      { name: 'MongoDB', level: 85 },
      { name: 'MySQL', level: 78 },
    ],
  },
  {
    title: 'Tools',
    icon: '⚒️',
    color: '#10b981',
    skills: [
      { name: 'Git', level: 88 },
      { name: 'GitHub', level: 90 },
      { name: 'VS Code', level: 95 },
      { name: 'Postman', level: 82 },
    ],
  },
]

export default function SkillsForest() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="skills" ref={ref} className="section-wrapper" style={{ padding: '120px 5%' }}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 1 }}
      >
        <div className="level-badge" style={{ display: 'flex', justifyContent: 'center' }}>
          <span>🌲</span> LEVEL 2 — FOREST OF SKILLS
        </div>
        <h2 className="section-title neon-text">Skills & Abilities</h2>
        <p className="section-subtitle">Touch each tree to discover my powers</p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '25px',
          maxWidth: '1200px',
          margin: '0 auto',
        }}>
          {skillCategories.map((cat, ci) => (
            <motion.div
              key={cat.title}
              className="glass-card"
              style={{
                padding: '30px',
                position: 'relative',
                overflow: 'hidden',
              }}
              initial={{ y: 50, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: ci * 0.15 }}
              whileHover={{ scale: 1.03 }}
            >
              {/* Glow effect */}
              <div style={{
                position: 'absolute', top: -50, right: -50,
                width: 120, height: 120,
                borderRadius: '50%',
                background: `radial-gradient(circle, ${cat.color}15, transparent)`,
                pointerEvents: 'none',
              }} />

              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 25 }}>
                <span style={{ fontSize: '2rem' }}>{cat.icon}</span>
                <h3 style={{
                  fontFamily: "'Orbitron', sans-serif",
                  fontSize: '1rem',
                  color: cat.color,
                  letterSpacing: '3px',
                }}>{cat.title.toUpperCase()}</h3>
              </div>

              {cat.skills.map((skill, si) => (
                <div key={skill.name} style={{ marginBottom: 18 }}>
                  <div style={{
                    display: 'flex', justifyContent: 'space-between',
                    marginBottom: 6,
                  }}>
                    <span style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '0.85rem',
                      color: 'rgba(255,255,255,0.8)',
                    }}>{skill.name}</span>
                    <span style={{
                      fontFamily: "'Orbitron', sans-serif",
                      fontSize: '0.7rem',
                      color: cat.color,
                    }}>{skill.level}%</span>
                  </div>
                  <div className="neon-progress">
                    <motion.div
                      className="neon-progress-bar"
                      initial={{ width: '0%' }}
                      animate={isInView ? { width: `${skill.level}%` } : { width: '0%' }}
                      transition={{ duration: 1.5, delay: ci * 0.15 + si * 0.1 }}
                      style={{
                        background: `linear-gradient(90deg, ${cat.color}80, ${cat.color})`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
